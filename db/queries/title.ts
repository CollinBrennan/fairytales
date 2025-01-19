import db from '@db/drizzle'
import { tag } from '@db/schema/tag'
import {
  title,
  type TitleWithType,
  type TitleWithTypeAndTags,
} from '@db/schema/title'
import { titleTag } from '@db/schema/title-tag'
import { type } from '@db/schema/type'
import {
  eq,
  getTableColumns,
  like,
  and,
  SQL,
  type InferInsertModel,
} from 'drizzle-orm'
import { save } from '@db/schema/save'

const titleWithTypeColumns = { ...getTableColumns(title), typeName: type.name }

export async function fetchTitleById(
  titleId: string
): Promise<TitleWithTypeAndTags | undefined> {
  const query = await db.query.title.findFirst({
    where: eq(title.id, titleId),
    with: {
      type: { columns: { name: true } },
      titleTag: {
        columns: {},
        with: { tag: { columns: { name: true } } },
      },
    },
  })

  if (!query) return undefined

  const { titleTag: tags, type, ...things } = query
  const titleWithTypeAndTags = {
    ...things,
    typeName: type.name,
    tagNames: tags.map((tag) => tag.tag.name),
  }

  return titleWithTypeAndTags
}

export async function fetchTitlesByQuery(
  titleName?: string,
  typeName?: string,
  tagName?: string
): Promise<TitleWithType[]> {
  const filters: SQL<unknown>[] = []

  if (titleName) filters.push(like(title.name, `%${titleName}%`))
  if (typeName) filters.push(eq(type.name, typeName))
  if (tagName) filters.push(eq(tag.name, tagName))

  let query = db
    .select(titleWithTypeColumns)
    .from(title)
    .where(and(...filters))
    .innerJoin(type, eq(title.typeId, type.id))

  if (tagName)
    query = query
      .innerJoin(titleTag, eq(title.id, titleTag.titleId))
      .innerJoin(tag, eq(tag.id, titleTag.tagId))

  const titles = await query
  return titles
}

export async function fetchSavedTitles(
  userId: string
): Promise<TitleWithType[]> {
  const titles = await db
    .select(titleWithTypeColumns)
    .from(title)
    .innerJoin(type, eq(title.typeId, type.id))
    .innerJoin(save, and(eq(save.userId, userId), eq(title.id, save.titleId)))

  return titles
}

export async function createTitle(
  values: InferInsertModel<typeof title>
): Promise<{ id: string }> {
  const insertedTitle = await db.insert(title).values(values).returning()

  return insertedTitle[0]
}
