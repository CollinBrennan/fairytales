import db from '@db/drizzle'
import { type, type Type } from '@db/schema/type'

export async function fetchTypes(): Promise<Type[]> {
  const types = await db.select().from(type)
  return types
}
