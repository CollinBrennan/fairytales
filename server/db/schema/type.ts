import { relations, type InferSelectModel } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { title } from './title'

export const type = sqliteTable('type', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
})

export const typeRelations = relations(type, ({ many }) => ({
  title: many(title),
}))

export type Type = InferSelectModel<typeof type>
