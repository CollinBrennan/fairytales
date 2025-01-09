import { Heart } from 'lucide-react'
import { Button } from './ui/button'
import { signIn, useSession } from '@hono/auth-js/react'
import { api } from '@/lib/api'
import { useEffect, useState, useTransition } from 'react'

async function insertLike(titleId: string) {
  await api.likes.$post({ json: { titleId } })
}

async function deleteLike(titleId: string) {
  await api.likes.$delete({ json: { titleId } })
}

async function doesUserLikeTitle(titleId: string) {
  const data = await api.likes[':titleId'].$get({ param: { titleId } })
  const json = await data.json()
  return json.likeExists
}

type Props = {
  titleId: string
}

export default function LikeButton({ titleId }: Props) {
  const { data: session } = useSession()
  const user = session?.user
  const [userLikesTitle, setUserLikesTitle] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const userLikes = await doesUserLikeTitle(titleId)
      setUserLikesTitle(userLikes)
    })
  }, [])

  async function onLikeButtonClick() {
    if (user) {
      if (userLikesTitle) {
        startTransition(async () => {
          await deleteLike(titleId)
          setUserLikesTitle(false)
        })
      } else {
        startTransition(async () => {
          await insertLike(titleId)
          setUserLikesTitle(true)
        })
      }
    } else signIn('google')
  }

  return (
    <Button disabled={isPending} onClick={onLikeButtonClick}>
      <Heart fill={userLikesTitle ? 'black' : 'transparent'} />
    </Button>
  )
}
