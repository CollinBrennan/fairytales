import db from '@db/drizzle'
import { tag, type Tag } from '@db/schema/tag'

export async function fetchTags(): Promise<Tag[]> {
  const tags = await db.select().from(tag)
  return tags
}
