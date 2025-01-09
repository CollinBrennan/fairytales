import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { titleRoute } from './routes/titles'
import { serveStatic } from 'hono/bun'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import Google from '@auth/core/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from './db/drizzle'
import { typeRoute } from './routes/types'
import { tagRoute } from './routes/tags'
import { likeRoute } from './routes/likes'

const app = new Hono({ strict: false }).basePath('/')

// middleware
app.use('*', logger())
app.use(
  '*',
  initAuthConfig(() => ({
    secret: process.env.AUTH_SECRET,
    providers: [
      Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    adapter: DrizzleAdapter(db),
  }))
)
app.use('/api/auth/*', authHandler())

// api
const apiRoutes = app
  .basePath('/api')
  .route('/titles', titleRoute)
  .route('/types', typeRoute)
  .route('/tags', tagRoute)
  .route('/likes', likeRoute)
app.get('/api/*', (c) => c.notFound())

// user client
app.get('*', serveStatic({ root: './client/dist' }))

export default app
export type ApiRoutes = typeof apiRoutes
