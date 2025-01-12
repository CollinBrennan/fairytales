import { SearchIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { api } from '@/lib/api'
import { Suspense, useState } from 'react'
import { TitleWithType } from '@db/schema/title'
import { useDebouncedCallback } from 'use-debounce'

import TitleList from './title-list'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'

async function fetchTitles(titleName: string) {
  const res = await api.titles.$get({ query: { q: titleName } })
  const json = await res.json()
  return json.titles
}

export default function SearchDialog() {
  const [titlesPromise, setTitlesPromise] = useState<Promise<
    TitleWithType[]
  > | null>(null)
  const onSearchDebounced = useDebouncedCallback(onSearch, 500)

  function onSearch(titleName: string) {
    setTitlesPromise(() => (titleName ? fetchTitles(titleName) : null))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title search</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search..."
          onChange={(e) => onSearchDebounced(e.target.value)}
        />
        {titlesPromise && (
          <>
            <div className="text-sm text-muted-foreground pt-4">Results</div>
            <ScrollArea className="max-h-[50vh] pr-4">
              <Suspense fallback={<div>Loading titles...</div>}>
                <TitleList titlesPromise={titlesPromise} />
              </Suspense>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
