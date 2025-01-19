import { useSession } from '@hono/auth-js/react'
import { isAdmin } from '@/lib/auth'

import PageContainer from '@/components/page-container'
import TitleForm from '@/components/title-form'
import PleaseSignIn from './please-sign-in'
import Unauthorized from './unauthorized'

export default function Admin() {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return <PleaseSignIn />
  if (!isAdmin(user)) return <Unauthorized />

  return (
    <PageContainer name="Admin">
      <TitleForm />
    </PageContainer>
  )
}
