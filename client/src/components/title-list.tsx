import { Link } from 'react-router'
import ImageNotFound from '../assets/not-found.png'
import { use } from 'react'
import { Title } from '@server/db/schema/title'

type Props = {
  titlesPromise: Promise<Title[]>
}

export default function TitleList({ titlesPromise }: Props) {
  const titles = use(titlesPromise)

  if (titles.length === 0) {
    console.log('Thing fired.')
    return <div>No titles found.</div>
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="text-sm text-muted-foreground">Results</div>
      {titles.map((title) => (
        <Link key={title.id} to={`/title/${title.id}`} className="group">
          <div className="flex items-center  gap-4">
            <img
              className="aspect-[2/3] h-24 object-cover"
              src={title.imageUrl || ImageNotFound}
              alt={title.name}
            />
            <div>
              <div className="font-semibold group-hover:underline">
                {title.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {title.description || 'No description.'}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
