import { Link } from 'react-router'
import { TitleWithType } from '@server/db/schema/title'
import { getYear } from 'date-fns'
import TitleCover from './title-cover'

type Props = {
  title: TitleWithType
}

export default function TitleCard({ title }: Props) {
  return (
    <Link to={`/title/${title.id}`}>
      <div className="border rounded-md hover:bg-muted p-2">
        <TitleCover title={title} />
        <div className="py-2 text-center">
          <div className="line-clamp-1 font-semibold">{title.name}</div>
          <div className="capitalize text-sm font-semibold text-muted-foreground line-clamp-1">
            {getYear(title.releaseDate)} {title.typeName}
          </div>
        </div>
      </div>
    </Link>
  )
}
