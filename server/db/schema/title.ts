import { relations, type InferSelectModel } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { type, type Type } from './type'
import { titleTag } from './title-tag'
import { like } from './like'

export const title = sqliteTable('title', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid(11)),
  name: text('name').notNull(),
  typeId: text('type_id')
    .notNull()
    .references(() => type.id),
  description: text('description'),
  coverUrl: text('cover_url'),
  trailerUrl: text('trailer_url'),
  releaseDate: text('release_date')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

export type Title = InferSelectModel<typeof title>
export type TitleWithType = Title & { typeName: Type['name'] }

export const titleRelations = relations(title, ({ many }) => ({
  titleTag: many(titleTag),
  like: many(like),
}))
