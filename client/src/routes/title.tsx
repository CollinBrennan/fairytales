import { api } from '@/lib/api'
import { Title } from '@server/db/schema/title'
import { Suspense, use } from 'react'
import { useParams } from 'react-router'
import ImageNotFound from '../assets/not-found.png'
import LikeButton from '@/components/like-button'
import PageContainer from '@/components/page-container'

async function fetchTitle(titleId: string) {
  const res = await api.titles[':titleId'].$get({ param: { titleId: titleId } })
  const json = await res.json()
  return json
}

export default function TitlePage() {
  const params = useParams()
  const titleId = params.id

  if (!titleId) return <h1>Title not found!</h1>

  const titlePromise = fetchTitle(titleId)

  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <TitleInfo titlePromise={titlePromise} />
    </Suspense>
  )
}

function TitleInfo({ titlePromise }: { titlePromise: Promise<Title> }) {
  const title = use(titlePromise)

  return title.id ? (
    <PageContainer name={title.name}>
      <div className="flex flex-col">
        <div className="flex w-full gap-1">
          <div className="flex-[3]">
            <img
              className="aspect-[2/3] object-cover"
              src={title.imageUrl || ImageNotFound}
              alt={title.name}
            />
          </div>
          <div className="flex-[8]">
            <video
              src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4"
              muted
              autoPlay
              controls
              className="aspect-video size-full"
            />
          </div>
        </div>
        <div>
          <LikeButton titleId={title.id} />
        </div>
      </div>
    </PageContainer>
  ) : (
    <h1>Title not found!</h1>
  )
}
