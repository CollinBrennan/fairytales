import { fetchTypes } from '@db/queries/type'
import { Hono } from 'hono'

export const typeRoute = new Hono().get('/', async (c) => {
  const types = await fetchTypes()
  return c.json({ types })
})
