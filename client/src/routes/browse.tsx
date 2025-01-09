import PageContainer from '@/components/page-container'
import TitleGrid from '@/components/title-grid'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/api'
import { Title } from '@server/db/schema/title'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

async function fetchTypes() {
  const res = await api.types.$get()
  const json = await res.json()
  return json.types
}

async function fetchTags() {
  const res = await api.tags.$get()
  const json = await res.json()
  return json.tags
}

async function fetchTitles(params: URLSearchParams) {
  const query: Record<string, string> = Object.fromEntries(params.entries())
  const res = await api.titles.$get({ query })
  const json = await res.json()
  return json.titles
}

export default function BrowsePage() {
  // radix doesn't let you use empty string values for Select components (WHY???)
  // so use this instead
  const EMPTY_VALUE = 'any'

  const [titlesPromise, setTitlesPromise] = useState<Promise<Title[]>>(
    new Promise(() => [])
  )
  const [typeOptions, setTypeOptions] = useState([
    { id: EMPTY_VALUE, name: EMPTY_VALUE },
  ])
  const [tagOptions, setTagOptions] = useState([
    { id: EMPTY_VALUE, name: EMPTY_VALUE },
  ])
  const [searchParams, setSearchParams] = useSearchParams()

  function onSearch(params: Record<string, string>) {
    setSearchParams((prev) => {
      Object.entries(params).forEach(([name, value]) => {
        if (value === EMPTY_VALUE) prev.delete(name)
        else prev.set(name, value)
      })

      return prev
    })
  }

  useEffect(() => {
    async function initializeSelectOptions() {
      const types = await fetchTypes()
      const tags = await fetchTags()
      setTypeOptions((prev) => [...prev, ...types])
      setTagOptions((prev) => [...prev, ...tags])
    }

    initializeSelectOptions()
  }, [])

  useEffect(() => {
    setTitlesPromise(() => fetchTitles(searchParams))
  }, [searchParams])

  return (
    <PageContainer name="Browse">
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2">
          <Label>Type</Label>
          <Select
            defaultValue={searchParams.get('type') || EMPTY_VALUE}
            onValueChange={(value) => onSearch({ type: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={searchParams.get('type') || EMPTY_VALUE}
              />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label>Tag</Label>
          <Select
            defaultValue={searchParams.get('tag') || EMPTY_VALUE}
            onValueChange={(value) => onSearch({ tag: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={searchParams.get('tag') || EMPTY_VALUE}
              />
            </SelectTrigger>
            <SelectContent>
              {tagOptions.map((tag) => (
                <SelectItem key={tag.id} value={tag.name}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="py-4">
        <Suspense fallback={<div>Loading titles...</div>}>
          <TitleGrid titlesPromise={titlesPromise} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
