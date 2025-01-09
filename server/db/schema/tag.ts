import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { titleTag } from './title-tag'

export const tag = sqliteTable('tag', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
})

export const tagRelations = relations(tag, ({ many }) => ({
  titleTag: many(titleTag),
}))
