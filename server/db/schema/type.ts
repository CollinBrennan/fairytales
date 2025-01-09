import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const type = sqliteTable('type', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
})
