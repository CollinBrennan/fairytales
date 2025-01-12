import { Hono } from 'hono'
import db from '@db/drizzle'
import {
  title,
  type TitleWithType,
  type TitleWithTypeAndTags,
} from '@db/schema/title'
import { and, eq, getTableColumns, like, SQL } from 'drizzle-orm'
import { type } from '@db/schema/type'
import { titleTag } from '@db/schema/title-tag'
import { tag } from '@db/schema/tag'
import { getAuthUser } from '@hono/auth-js'
import { like as likes } from '@db/schema/like'

const titleWithTypeColumns = { ...getTableColumns(title), typeName: type.name }

export const titleRoute = new Hono()
  .get('/', async (c) => {
    const { q: titleName, type: typeName, tag: tagName } = c.req.query()
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

    return c.json({ titles: (await query) as TitleWithType[] })
  })
  .get('/liked', async (c) => {
    const authUser = await getAuthUser(c)
    const user = authUser?.user

    if (user) {
      const titles = await db
        .select(titleWithTypeColumns)
        .from(title)
        .innerJoin(type, eq(title.typeId, type.id))
        .innerJoin(
          likes,
          and(eq(likes.userId, user.id), eq(title.id, likes.titleId))
        )

      return c.json({ titles: titles as TitleWithType[] })
    }

    return c.json({ titles: [] })
  })
  .get('/:titleId', async (c) => {
    const { titleId } = c.req.param()
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

    if (!query) return c.json({ title: null })

    const { titleTag: tags, type, ...things } = query
    const titleWithTypeAndTags = {
      ...things,
      typeName: type.name,
      tagNames: tags.map((tag) => tag.tag.name),
    }

    return c.json({
      title: titleWithTypeAndTags,
    })
  })
