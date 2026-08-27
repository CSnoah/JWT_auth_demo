import { SignJWT, jwtVerify } from "jose";
import { setCookie, getCookie } from "hono/cookie";
import bcrypt from 'bcryptjs'
import userModel from "../models/userModel.js";
import pageViewModel from "../models/pageViewModel.js";

const setGuestAuth = async (c) => {
   // check if client already has a cookie
  let guestId = getCookie(c, "guest_id");
  
  if (!guestId) {
    guestId = crypto.randomUUID();

    // setCookie(c, "guest_id", guestId, {
    //   maxAge: 60 * 60 * 24 * 365,
    // });

    const secret = new TextEncoder().encode(
      c.env.JWT_SECRET
    );

    // create the JWT token
    const token = await new SignJWT({
      // userId: user.id,
      // email: user.email,
      guestId
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // set the cookie on the response
    setCookie(c, "guest_id", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return token
  }

  return guest_Id 
}

const analyticView = async (c) => {
  const response = await pageViewModel.countPageViews(c)
  return c.json(response)
}

const guestTracker = async (c) => {
  const { path } = await c.req.json()
  let token = getCookie(c, "guest_id")

  if (!token) {
    token = await setGuestAuth(c)
  }

  const secret = new TextEncoder().encode(
    c.env.JWT_SECRET
  );

  try {
    // Verify JWT
    const { payload } = await jwtVerify(
      token,
      secret
    );
    const visited = await pageViewModel.pageViewExists(c, payload.guestId, path)

    // only count path if the guest is visiting the page for the first time 
    if (!visited) {
      await pageViewModel.setPageView(c, payload.guestId, path)
    }
    return c.json(payload)
  } catch (error) {
    // JWT is invalid or expired
    return c.json(
      { error: "Invalid or expired session" },
      401
    );
  }
}

const authRoute = async (c, next) => {
  const token = getCookie(c, "session")

  if (!token) {
    return c.json(
      { error: "Not authenticated" },
      401
    );
  }

  const secret = new TextEncoder().encode(
    c.env.JWT_SECRET
  );

  try {
    // Verify JWT
    const { payload } = await jwtVerify(
      token,
      secret
    );

    // JWT is valid
    // c.set("user", payload);

    await next();

  } catch (error) {
    // JWT is invalid or expired
    return c.json(
      { error: "Invalid or expired session" },
      401
    );
  }
}

const signUp = async (c) => {
  const { email, password } = await c.req.json()

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await userModel.createUser(c, email, passwordHash)
  
  const secret = new TextEncoder().encode(
    c.env.JWT_SECRET
  );

  // create the JWT token
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
  })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  // set the cookie on the response
  setCookie(c, "session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return c.json({
    success: true,
  });

  // await next()
}

const login = async (c) => {
    const { email, password } = await c.req.json();

    // const user = await userModel.getUser(
    //     c.env.DB,
    //     email
    // );

    const user = await userModel.findUser(c, email);

    if (!user) {
        return c.json(
            { error: "Invalid credentials" },
            401
        );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    )
  
    // const validPassword = await userModel.verifyPassword(
    //     password,
    //     user.password_hash
    // );

    // STOP -> dont send cookie unless logged in
    if (!validPassword) {
        return c.json(
            { error: "Invalid credentials" },
            401
        );
    }

    const secret = new TextEncoder().encode(
        c.env.JWT_SECRET
    );

    // create the JWT token
    const token = await new SignJWT({
        userId: user.id,
        email: user.email,
        // userId: 123,
        // email: "test-email",
    })
        .setProtectedHeader({
            alg: "HS256",
            typ: "JWT",
        })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);


    // set the cookie on the response
    setCookie(c, "session", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    // await next()

    return c.json({
        success: true,
    });
};

export default {
  signUp,
  login,
  authRoute,
  setGuestAuth, 
  analyticView, 
  guestTracker 
}
