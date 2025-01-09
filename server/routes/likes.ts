import { Hono } from 'hono'
import db from '../db/drizzle'
import { like } from '../db/schema/like'
import { and, eq } from 'drizzle-orm'
import { getAuthUser, verifyAuth } from '@hono/auth-js'

export const likeRoute = new Hono()
  .get('/:titleId', async (c) => {
    const authUser = await getAuthUser(c)
    const user = authUser?.user
    const { titleId } = c.req.param()

    if (user) {
      const titleLike = await db.query.like.findFirst({
        where: and(eq(like.userId, user.id), eq(like.titleId, titleId)),
      })
      return c.json({ likeExists: titleLike !== undefined })
    }

    return c.json({ likeExists: false })
  })

  .post('/', verifyAuth(), async (c) => {
    const auth = c.get('authUser')
    const user = auth.user
    const { titleId } = await c.req.json()

    if (user) {
      try {
        await db.insert(like).values({ userId: user.id, titleId })
        return c.body(null, 204)
      } catch (error) {
        return c.json({ error: 'Resource exists' }, 409)
      }
    }

    return c.json({ error: 'Unauthorized' }, 401)
  })
  .delete('/', verifyAuth(), async (c) => {
    const auth = c.get('authUser')
    const user = auth.user
    const { titleId } = await c.req.json()

    if (user) {
      await db
        .delete(like)
        .where(and(eq(like.userId, user.id), eq(like.titleId, titleId)))
      return c.body(null, 204)
    }

    return c.json({ error: 'Unauthorized' }, 401)
  })
