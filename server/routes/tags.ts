import { Hono } from 'hono'
import db from '../db/drizzle'
import { tag } from '../db/schema/tag'

export const tagRoute = new Hono().get('/', async (c) => {
  const tags = await db.select().from(tag)
  return c.json({ tags: tags })
})
