import PageContainer from '@/components/page-container'
import TitleGrid from '@/components/title-grid'
import { api } from '@/lib/api'
import { useSession } from '@hono/auth-js/react'
import { TitleWithType } from '@db/schema/title'
import { Suspense, useEffect, useState } from 'react'

async function fetchTitles() {
  const res = await api.titles.liked.$get()
  const json = await res.json()
  return json.titles
}

export default function LikesPage() {
  const [titlesPromise, setTitlesPromise] = useState<Promise<TitleWithType[]>>(
    new Promise(() => [])
  )

  const { data: session } = useSession()
  const user = session?.user

  useEffect(() => {
    setTitlesPromise(() => fetchTitles())
  }, [])

  return (
    <PageContainer name="Liked Titles">
      {user ? (
        <Suspense fallback={<div>Loading titles...</div>}>
          <TitleGrid titlesPromise={titlesPromise} />
        </Suspense>
      ) : (
        <div>Please sign in to see your liked titles.</div>
      )}
    </PageContainer>
  )
}
