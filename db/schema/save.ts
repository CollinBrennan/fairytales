import { relations } from 'drizzle-orm'
import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { title } from './title'
import { users } from './users'

export const save = sqliteTable(
  'save',
  {
    titleId: text('title_id')
      .notNull()
      .references(() => title.id),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.titleId, table.userId] }) })
)

export const saveRelations = relations(save, ({ one }) => ({
  title: one(title, {
    fields: [save.titleId],
    references: [title.id],
  }),
  user: one(users, {
    fields: [save.userId],
    references: [users.id],
  }),
}))
