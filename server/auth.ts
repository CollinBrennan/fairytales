import Google, { type GoogleProfile } from '@auth/core/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@db/drizzle'
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from '@db/schema/users'
import { getAuthUser, initAuthConfig } from '@hono/auth-js'
import type { MiddlewareHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const authConfig = initAuthConfig(() => ({
  secret: process.env.AUTH_SECRET,
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

export function verifyAdmin(): MiddlewareHandler {
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
