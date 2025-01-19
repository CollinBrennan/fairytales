import PageContainer from '@/components/page-container'
import TitleGrid from '@/components/title-grid'
import { api } from '@/lib/api'
import { useSession } from '@hono/auth-js/react'
import { TitleWithType } from '@db/schema/title'
import { Suspense, useEffect, useState } from 'react'
import PleaseSignInPage from './please-sign-in'

async function fetchTitles() {
  const res = await api.titles.saved.$get()
  const json = await res.json()
  return json.titles
}

export default function Saved() {
  const { data: session } = useSession()
  const user = session?.user

  const [titlesPromise, setTitlesPromise] = useState<Promise<TitleWithType[]>>(
    new Promise(() => [])
  )

  useEffect(() => {
    setTitlesPromise(() => fetchTitles())
  }, [])

  if (!user) return <PleaseSignInPage />

  return (
    <PageContainer name="Your saved titles">
      <Suspense fallback={<div>Loading titles...</div>}>
        <TitleGrid titlesPromise={titlesPromise} />
      </Suspense>
    </PageContainer>
  )
}
