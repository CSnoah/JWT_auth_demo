import { Hono } from "hono";
import authMiddleware from '../controllers/authController.js'

const app = new Hono()

app.get('/hello', (c) => {
  return c.text('Hello Hono!')
})

app.get("/protected", authMiddleware.authRoute, (c) => {
    return c.json({ message: "You are authenticated" });
}); 

app.get("/login", authMiddleware.login, (c) => {
    return c.json({ message: "You are logged in" });
}); 

app.get("/testdb", async (c) => {
  const result = await c.env.D1.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
  `).all();

  return c.json(result);
});

export default app
