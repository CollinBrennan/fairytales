import { fetchTags } from '@db/queries/tag'
import { Hono } from 'hono'

export const tagRoute = new Hono().get('/', async (c) => {
  const tags = await fetchTags()
  return c.json({ tags })
})
