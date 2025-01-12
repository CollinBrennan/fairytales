import { use } from 'react'
import TitleCard from './title-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel'
import { TitleWithType } from '@db/schema/title'

type Props = {
  name: string
  titlesPromise: Promise<TitleWithType[]>
}

export default function TitleCarousel({ name, titlesPromise }: Props) {
  const titles = use(titlesPromise)

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <Carousel
        opts={{ skipSnaps: true, slidesToScroll: 'auto' }}
        className="pt-4"
      >
        <CarouselContent>
          {titles.map((title) => (
            <CarouselItem key={title.id} className="basis-[calc(100%/6.5)]">
              <TitleCard title={title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-top-4 bottom-0 left-auto right-10" />
        <CarouselNext className="-top-4 right-0" />
      </Carousel>
    </div>
  )
}
