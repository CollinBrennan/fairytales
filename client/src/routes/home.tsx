import { api } from '../lib/api'
import TitleCarousel from '@/components/title-carousel'

async function fetchTitles() {
  const res = await api.titles.$get()
  const json = await res.json()
  return json.titles
}

const titlesPromise = fetchTitles()

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-screen-xl px-4 py-2">
      <TitleCarousel name="Top Picks" titlesPromise={titlesPromise} />
    </main>
  )
}
