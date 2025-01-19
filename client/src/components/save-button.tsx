import { useEffect, useState, useTransition } from 'react'
import { signIn, useSession } from '@hono/auth-js/react'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router'
import { Bookmark } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'

async function insertSave(titleId: string) {
  await api.saves.$post({ json: { titleId } })
}

async function deleteSave(titleId: string) {
  await api.saves.$delete({ json: { titleId } })
}

async function hasUserSavedTitle(titleId: string) {
  const data = await api.saves[':titleId'].$get({ param: { titleId } })
  const json = await data.json()
  return json.userSavedTitle
}

type Props = {
  titleId: string
}

export default function SaveButton({ titleId }: Props) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [userSavedTitle, setUserSavedTitle] = useState(false)
  const [isPending, startTransition] = useTransition()
  const user = session?.user

  useEffect(() => {
    startTransition(async () => {
      setUserSavedTitle(await hasUserSavedTitle(titleId))
    })
  }, [])

  async function onSaveButtonClick() {
    if (user) {
      if (userSavedTitle) {
        startTransition(async () => {
          await deleteSave(titleId)
          setUserSavedTitle(false)
        })
      } else {
        startTransition(async () => {
          await insertSave(titleId)
          setUserSavedTitle(true)
          toast({
            title: 'Title saved!',
            action: (
              <ToastAction altText="View saved titles" asChild>
                <Link to={`/saved`}>View saved titles</Link>
              </ToastAction>
            ),
          })
        })
      }
    } else signIn('google')
  }

  return (
    <Button
      variant="secondary"
      disabled={isPending}
      onClick={onSaveButtonClick}
    >
      <Bookmark fill={userSavedTitle ? 'currentColor' : 'none'} />
    </Button>
  )
}
