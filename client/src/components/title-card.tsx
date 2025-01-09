import { Link } from 'react-router'
import ImageNotFound from '../assets/not-found.png'
import { Title } from '@server/db/schema/title'

type Props = {
  title: Title
}

export default function TitleCard({ title }: Props) {
  return (
    <Link to={`/title/${title.id}`}>
      <img
        className="aspect-[2/3] object-cover"
        src={title.imageUrl || ImageNotFound}
        alt={title.name}
      />
      <div>{title.name}</div>
    </Link>
  )
}
