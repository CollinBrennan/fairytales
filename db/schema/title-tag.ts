import { relations } from 'drizzle-orm'
import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { tag } from './tag'
import { title } from './title'

export const titleTag = sqliteTable(
  'title_tag',
  {
    titleId: text('title_id')
      .notNull()
      .references(() => title.id),
    tagId: text('tag_id')
      .notNull()
      .references(() => tag.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.titleId, table.tagId] }) })
)

export const titleTagRelations = relations(titleTag, ({ one }) => ({
  title: one(title, {
    fields: [titleTag.titleId],
    references: [title.id],
  }),
  tag: one(tag, {
    fields: [titleTag.tagId],
    references: [tag.id],
  }),
}))
