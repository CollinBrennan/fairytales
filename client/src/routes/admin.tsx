import PageContainer from '@/components/page-container'
import TitleForm from '@/components/title-form'
import { useSession } from '@hono/auth-js/react'
import UnauthorizedPage from './unauthorized'
import { isAdmin } from '@/lib/auth'
import PleaseSignIn from './please-sign-in'

export default function Admin() {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return <PleaseSignIn />
  if (!isAdmin(user)) return <UnauthorizedPage />

  return (
    <PageContainer name="Admin">
      <TitleForm />
    </PageContainer>
  )
}

// Typescript wont accept the root type file so I guess I'm redeclaring these modules
// ＼（〇_ｏ）／

declare module '@auth/core/types' {
  export interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }

  export interface Session {
    user?: User
    expires: string
  }
}
