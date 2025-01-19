import { relations, type InferSelectModel } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type, type Type } from './type'
import { type Tag } from './tag'
import { titleTag } from './title-tag'
import { save } from './save'

export const title = sqliteTable('title', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid(11)),
  name: text('name').notNull(),
  typeId: text('type_id')
    .notNull()
    .references(() => type.id),
  description: text('description').notNull(),
  releaseDate: text('release_date').notNull(),
  coverUrl: text('cover_url'),
  trailerUrl: text('trailer_url'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

export type Title = InferSelectModel<typeof title>
export type TitleWithType = Title & { typeName: Type['name'] }
export type TitleWithTypeAndTags = TitleWithType & { tagNames: Tag['name'][] }

const MAX_FILE_SIZE_IN_BYTES = 4_000_000
export const VALID_FILE_TYPES = 'image/png, image/jpeg'

export const insertTitleSchema = createInsertSchema(title, {
  name: (schema) => schema.trim().nonempty(),
  typeId: (schema) => schema.trim().nonempty(),
  description: (schema) => schema.trim().nonempty(),
  releaseDate: (schema) => schema.date().nonempty(),
})
  .omit({
    id: true,
    createdAt: true,
    coverUrl: true,
    trailerUrl: true,
  })
  .extend({
    image: z
      .instanceof(File)
      .refine((file) => file && file.size <= MAX_FILE_SIZE_IN_BYTES, {
        message: 'File must be 4MB or less.',
      })
      .refine((file) => file && VALID_FILE_TYPES.includes(file.type), {
        message: 'Image must be .png, .jpg, or .jpeg',
      })
      .optional(),
  })

export type InsertTitleSchema = z.infer<typeof insertTitleSchema>

export const titleRelations = relations(title, ({ one, many }) => ({
  type: one(type, {
    fields: [title.typeId],
    references: [type.id],
  }),
  titleTag: many(titleTag),
  save: many(save),
}))
