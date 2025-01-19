import db from '@db/drizzle'
import { save } from '@db/schema/save'
import { and, eq } from 'drizzle-orm'

export async function hasUserSavedTitle(
  userId: string,
  titleId: string
): Promise<boolean> {
  const titleSave = await db.query.save.findFirst({
    where: and(eq(save.userId, userId), eq(save.titleId, titleId)),
  })

  const userSavedTitle = titleSave !== undefined
  return userSavedTitle
}

export async function createSave(userId: string, titleId: string) {
  await db.insert(save).values({ userId, titleId })
}

export async function deleteSave(userId: string, titleId: string) {
  await db
    .delete(save)
    .where(and(eq(save.userId, userId), eq(save.titleId, titleId)))
}
