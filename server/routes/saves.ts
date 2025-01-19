import { Hono } from 'hono'
import { getAuthUser, verifyAuth } from '@hono/auth-js'
import { createSave, deleteSave, hasUserSavedTitle } from '@db/queries/save'

export const saveRoute = new Hono()
  .get('/:titleId', async (c) => {
    const authUser = await getAuthUser(c)
    const user = authUser?.user
    const { titleId } = c.req.param()

    let userSavedTitle = false
    if (user) userSavedTitle = await hasUserSavedTitle(user.id, titleId)

    return c.json({ userSavedTitle })
  })
  .post('/', verifyAuth(), async (c) => {
    const auth = c.get('authUser')
    const user = auth.user
    const { titleId } = await c.req.json()

    if (user) createSave(user.id, titleId)

    return c.body(null, 204)
  })
  .delete('/', verifyAuth(), async (c) => {
    const auth = c.get('authUser')
    const user = auth.user
    const { titleId } = await c.req.json()

    if (user) deleteSave(user.id, titleId)

    return c.body(null, 204)
  })
