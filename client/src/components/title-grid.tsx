import { use } from 'react'
import TitleCard from './title-card'
import { Title } from '@server/db/schema/title'

type Props = {
  titlesPromise: Promise<Title[]>
}

export default function TitleGrid({ titlesPromise }: Props) {
  const titles = use(titlesPromise)

  if (titles.length === 0) return <div>No titles found.</div>

  return (
    <div className="grid grid-cols-5 gap-4">
      {titles.map((title) => (
        <TitleCard key={title.id} title={title} />
      ))}
    </div>
  )
}
