import { Title } from '@db/schema/title'
import ImageNotFound from '../assets/not-found.png'

type Props = {
  title: Title
  className?: string
}

export default function TitleCover({ title, className }: Props) {
  return (
    <img
      className={`aspect-[2/3] object-cover rounded-md ${className || ''}`}
      src={title.coverUrl || ImageNotFound}
      alt={title.name}
      onError={(e) => {
        e.currentTarget.src = ImageNotFound
        e.currentTarget.onerror = null
      }}
    />
  )
}
