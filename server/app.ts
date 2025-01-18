import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { authHandler } from '@hono/auth-js'
import { authConfig } from './auth.ts'

import { titleRoute } from './routes/titles'
import { typeRoute } from './routes/types'
import { tagRoute } from './routes/tags'
import { likeRoute } from './routes/likes'

const app = new Hono()

// middleware
app.use('*', logger())
app.use('*', authConfig)
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
