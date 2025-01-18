import db from '@db/drizzle'
import { like } from '@db/schema/like'
import { and, eq } from 'drizzle-orm'

export async function hasUserLikedTitle(
  userId: string,
  titleId: string
): Promise<boolean> {
  const titleLike = await db.query.like.findFirst({
    where: and(eq(like.userId, userId), eq(like.titleId, titleId)),
  })

  const userLikesTitle = titleLike !== undefined
  return userLikesTitle
}

export async function createLike(userId: string, titleId: string) {
  await db.insert(like).values({ userId, titleId })
}

export async function deleteLike(userId: string, titleId: string) {
  await db
    .delete(like)
    .where(and(eq(like.userId, userId), eq(like.titleId, titleId)))
}
