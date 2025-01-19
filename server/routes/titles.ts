import { Hono } from 'hono'
import { getAuthUser } from '@hono/auth-js'
import { verifyAdmin } from 'server/auth'
import { validator } from 'hono/validator'
import { UTApi } from 'uploadthing/server'

import { insertTitleSchema, type TitleWithType } from '@db/schema/title'
import {
  createTitle,
  fetchSavedTitles,
  fetchTitleById,
  fetchTitlesByQuery,
} from '@db/queries/title'

export const titleRoute = new Hono()
  .get('/', async (c) => {
    const { q: titleName, type: typeName, tag: tagName } = c.req.query()
    const titles = await fetchTitlesByQuery(titleName, typeName, tagName)

    return c.json({ titles })
  })
  .get('/saved', async (c) => {
    const authUser = await getAuthUser(c)
    const user = authUser?.user

    let titles: TitleWithType[] = []
    if (user) titles = await fetchSavedTitles(user.id)

    return c.json({ titles })
  })
  .get('/:titleId', async (c) => {
    const { titleId } = c.req.param()
    const title = await fetchTitleById(titleId)

    return c.json({ title })
  })
  .post(
    '/',
    verifyAdmin(),
    validator('form', async (value, c) => {
      // FormData coerces undefined to 'undefined'
      if (value.image === 'undefined') delete value.image

      const { data, error, success } = insertTitleSchema.safeParse(value)
      if (!success) {
        console.log('Form parse error: ' + error.message)
        return c.text('Invalid form', 400)
      }

      return data
    }),
    async (c) => {
      const formData = c.req.valid('form')

      let coverUrl: string | null = null
      if (formData.image) {
        const utapi = new UTApi()
        const uploadFileResults = await utapi.uploadFiles([formData.image])
        const { data, error } = uploadFileResults[0]
        if (data) coverUrl = data?.url
        if (error) console.log('Uploadthing error: ' + error.message)
      }

      const title = await createTitle({
        name: formData.name,
        typeId: formData.typeId,
        description: formData.description,
        releaseDate: formData.releaseDate,
        coverUrl,
      })

      return c.json({ titleId: title.id })
    }
  )
