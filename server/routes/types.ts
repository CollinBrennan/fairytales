import { Hono } from 'hono'
import db from '@db/drizzle'
import { type } from '@db/schema/type'

export const typeRoute = new Hono().get('/', async (c) => {
  const types = await db.select().from(type)
  return c.json({ types: types })
})
