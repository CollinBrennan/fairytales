import { Hono, type MiddlewareHandler } from 'hono'
import { logger } from 'hono/logger'
import { titleRoute } from './routes/titles'
import { serveStatic } from 'hono/bun'
import {
  authHandler,
  getAuthUser,
  initAuthConfig,
  verifyAuth,
  type AuthUser,
} from '@hono/auth-js'
import Google, { type GoogleProfile } from '@auth/core/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@db/drizzle'
import { typeRoute } from './routes/types'
import { tagRoute } from './routes/tags'
import { likeRoute } from './routes/likes'
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from '@db/schema/users'
import { HTTPException } from 'hono/http-exception'
import { adminTitleRoute } from './routes/admin/admin-titles'

const app = new Hono()

function verifyAdmin(): MiddlewareHandler {
  return async (c, next) => {
    const authUser = await getAuthUser(c)
    const isAdmin = authUser?.session.user?.role === 'admin'

    if (!isAdmin) {
      const res = new Response('Unauthorized', {
        status: 401,
      })
      throw new HTTPException(401, { res })
    }

    c.set('authUser', authUser)
    await next()
  }
}

// middleware
app.use('*', logger())
app.use(
  '*',
  initAuthConfig(() => ({
    secret: process.env.AUTH_SECRET,
    strategy: 'database',
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
      authenticatorsTable: authenticators,
    }),
    providers: [
      Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            emailVerified: profile.email_verified,
            image: profile.picture,
            role: 'user',
          }
        },
      }),
    ],
    callbacks: {
      session({ session, user }) {
        session.user.role = user.role
        return session
      },
    },
  }))
)
app.use('/api/auth/*', authHandler())

app.use('/api/admin/*', verifyAdmin())

// api
const adminRoutes = app.route('/titles', adminTitleRoute)
const apiRoutes = app
  .basePath('/api')
  .route('/admin', adminRoutes)
  .route('/titles', titleRoute)
  .route('/types', typeRoute)
  .route('/tags', tagRoute)
  .route('/likes', likeRoute)
app.get('/api/*', (c) => c.notFound())

// user client
app.get('*', serveStatic({ root: './client/dist' }))

export default app
export type ApiRoutes = typeof apiRoutes
