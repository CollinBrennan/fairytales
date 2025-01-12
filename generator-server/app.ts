import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { titleRoute } from './routes/titles'

const app = new Hono({ strict: false }).basePath('/')

// middleware
app.use('*', logger())

// api
const apiRoutes = app.basePath('/api').route('/titlestest', titleRoute)
app.get('/api/*', (c) => c.notFound())

// user client
app.get('*', serveStatic({ root: './client/dist' }))

export default app
export type ApiRoutes = typeof apiRoutes
