import { Hono } from 'hono'
import { getAuthUser, verifyAuth } from '@hono/auth-js'
import { createLike, deleteLike, hasUserLikedTitle } from '@db/queries/like'

export const likeRoute = new Hono()
  .get('/:titleId', async (c) => {
    const authUser = await getAuthUser(c)
    const user = authUser?.user
    const { titleId } = c.req.param()

    let userLikesTitle = false
    if (user) userLikesTitle = await hasUserLikedTitle(user.id, titleId)

    return c.json({ userLikesTitle })
  })
  .post('/', verifyAuth(), async (c) => {
    const auth = c.get('authUser')
    const user = auth.user
    const { titleId } = await c.req.json()

    if (user) createLike(user.id, titleId)

    return c.body(null, 204)
  })
  .delete('/', verifyAuth(), async (c) => {
    const auth = c.get('authUser')
    const user = auth.user
    const { titleId } = await c.req.json()

    if (user) deleteLike(user.id, titleId)

    return c.body(null, 204)
  })
