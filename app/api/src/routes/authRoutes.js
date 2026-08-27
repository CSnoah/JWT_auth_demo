import { Hono } from "hono";
import Controller from "../controllers/authController.js";

const authRoutes = new Hono();

authRoutes.post(
    "/auth/login",
    Controller.login
);

authRoutes.post(
    "/auth/signup",
    Controller.signUp
);

authRoutes.get(
    "/auth/authRoute",
    Controller.authRoute
);

authRoutes.post(
    "/auth/set/guest",
    Controller.guestTracker
);

authRoutes.get(
    "/auth/view/analytics",
    Controller.analyticView
);

export default authRoutes;
