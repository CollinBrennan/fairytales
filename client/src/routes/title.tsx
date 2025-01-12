import { api } from '@/lib/api'
import { TitleWithTypeAndTags } from '@db/schema/title'
import { Suspense, use } from 'react'
import { Link, useParams } from 'react-router'
import ImageNotFound from '../assets/not-found.png'
import LikeButton from '@/components/like-button'
import PageContainer from '@/components/page-container'
import { Badge } from '@/components/ui/badge'
import { getYear } from 'date-fns'

async function fetchTitle(titleId: string) {
  const res = await api.titles[':titleId'].$get({ param: { titleId: titleId } })
  const json = await res.json()
  return json.title
}

export default function TitlePage() {
  const params = useParams()
  const titleId = params.id

  if (!titleId) return <h1>Title not found!</h1>

  const titlePromise = fetchTitle(titleId)

  return (
    <PageContainer>
      <Suspense fallback={<h1>Loading....</h1>}>
        <TitleInfo titlePromise={titlePromise} />
      </Suspense>
    </PageContainer>
  )
}

function TitleInfo({
  titlePromise,
}: {
  titlePromise: Promise<TitleWithTypeAndTags | null>
}) {
  const title = use(titlePromise)

  return title ? (
    <div>
      <div className="flex gap-4 pt-4">
        <div className="basis-1/4">
          <img
            className="aspect-[2/3] object-cover rounded"
            src={title.coverUrl || ImageNotFound}
            alt={title.name}
          />
        </div>
        <div className="basis-3/4">
          <h1 className="text-4xl font-bold">{title.name}</h1>
          <div className="text-muted-foreground capitalize font-semibold">
            {getYear(title.releaseDate)} {title.typeName}
          </div>

          <LikeButton titleId={title.id} />

          <p className="pt-4">{title.description || 'No description.'}</p>

          <div className="flex gap-1 pt-4">
            {title.tagNames.map((tagName) => (
              <Link key={tagName} to={`/browse?tag=${tagName}`}>
                <Badge variant="secondary">{tagName}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Title not found!</h1>
  )
}
