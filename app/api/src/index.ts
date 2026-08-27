import { Hono } from 'hono'
import authRoutes from './routes/authRoutes.js'
import greetingRoutes from './routes/greetingRoutes.js'

const app = new Hono()

app.route("/api", authRoutes)
app.route("/api", greetingRoutes)

// app.get('/api/hello', (c) => {
//   return c.text('Hello Hono!')
// })

export default app
