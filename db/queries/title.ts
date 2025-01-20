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
  inArray,
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
        with: { tag: true },
      },
    },
  })

  if (!query) return undefined

  const { titleTag, type, ...things } = query
  const titleWithTypeAndTags = {
    ...things,
    typeName: type.name,
    tags: titleTag.map((titleTag) => titleTag.tag),
  }

  return titleWithTypeAndTags
}

export async function fetchTitlesByQuery(
  titleName?: string,
  typeIds?: string[],
  tagIds?: string[]
): Promise<TitleWithType[]> {
  const filters: SQL<unknown>[] = []

  if (titleName) filters.push(like(title.name, `%${titleName}%`))
  if (typeIds) filters.push(inArray(title.typeId, typeIds))
  if (tagIds) filters.push(inArray(titleTag.tagId, tagIds))

  let query = db
    .selectDistinct(titleWithTypeColumns)
    .from(title)
    .where(and(...filters))
    .innerJoin(type, eq(title.typeId, type.id))

  if (tagIds) query = query.innerJoin(titleTag, eq(titleTag.titleId, title.id))

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
