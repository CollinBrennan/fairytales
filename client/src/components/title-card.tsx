import { Link } from 'react-router'
import ImageNotFound from '../assets/not-found.png'
import { TitleWithType } from '@server/db/schema/title'
import { getYear } from 'date-fns'

type Props = {
  title: TitleWithType
}

export default function TitleCard({ title }: Props) {
  return (
    <Link to={`/title/${title.id}`}>
      <div className="bg-muted rounded p-2 hover:brightness-125">
        <img
          className="aspect-[2/3] object-cover rounded"
          src={title.coverUrl || ImageNotFound}
          alt={title.name}
          onError={(e) => {
            e.currentTarget.src = ImageNotFound
            e.currentTarget.onerror = null
          }}
        />
        <div className="py-1 text-center">
          <div className="line-clamp-1 font-semibold">{title.name}</div>
          <div className="capitalize text-sm font-semibold text-muted-foreground line-clamp-1">
            {getYear(title.releaseDate)} {title.typeName}
          </div>
        </div>
      </div>
    </Link>
  )
}
