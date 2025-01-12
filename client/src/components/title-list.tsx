import { Link } from 'react-router'
import { use } from 'react'
import { TitleWithType } from '@db/schema/title'
import TitleCover from './title-cover'
import { getYear } from 'date-fns'

type Props = {
  titlesPromise: Promise<TitleWithType[]>
}

export default function TitleList({ titlesPromise }: Props) {
  const titles = use(titlesPromise)

  if (titles.length === 0) {
    console.log('Thing fired.')
    return <div>No titles found.</div>
  }

  return (
    <ul className="flex flex-col">
      {titles.map((title) => (
        <li>
          <Link
            key={title.id}
            to={`/title/${title.id}`}
            className="flex items-center gap-4 hover:bg-accent rounded-md p-2"
          >
            <TitleCover title={title} className="h-28" />
            <div>
              <div className="font-semibold line-clamp-1">{title.name}</div>
              <div className="capitalize text-sm font-semibold text-muted-foreground line-clamp-1">
                {getYear(title.releaseDate)} {title.typeName}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 py-1">
                {title.description || 'No description.'}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
