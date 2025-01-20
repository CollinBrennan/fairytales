import PageContainer from '@/components/page-container'
import { Form } from '@/components/ui/form'
import { api } from '@/lib/api'
import { Type } from '@db/schema/type'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import MultiselectPopover from '@/components/multiselect-popover'
import { Tag } from '@db/schema/tag'
import TitleGrid from '@/components/title-grid'
import { TitleWithType } from '@db/schema/title'

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

const formSchema = z.object({
  type: z.array(z.string()),
  tag: z.array(z.string()),
})

export type FormSchema = z.infer<typeof formSchema>

const defaultValues: FormSchema = {
  type: [],
  tag: [],
}

export default function Browse() {
  const [titlesPromise, setTitlesPromise] = useState<Promise<TitleWithType[]>>(
    new Promise(() => [])
  )
  const [typeOptions, setTypeOptions] = useState<Type[]>([])
  const [tagOptions, setTagOptions] = useState<Tag[]>([])
  const [params, setParams] = useSearchParams()
  const formName = 'browse-form'

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(formData: FormSchema) {
    setParams(() => {
      const newParams = new URLSearchParams()

      if (formData.type.length > 0)
        newParams.set('type', formData.type.join(','))
      if (formData.tag.length > 0) newParams.set('tag', formData.tag.join(','))

      return newParams
    })
  }

  useEffect(() => {
    async function setOptions() {
      const types = await fetchTypes()
      const tags = await fetchTags()
      setTypeOptions(types)
      setTagOptions(tags)
    }
    setOptions()

    const typeParam = params.get('type')
    const tagParam = params.get('tag')

    if (typeParam) form.setValue('type', typeParam.split(','))
    if (tagParam) form.setValue('tag', tagParam.split(','))
  }, [])

  useEffect(() => {
    setTitlesPromise(() => fetchTitles(params))
  }, [params])

  return (
    <PageContainer name="Browse">
      <Form {...form}>
        <form
          id={formName}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex gap-4">
            <MultiselectPopover
              label="Type"
              fieldName="type"
              form={form}
              formName={formName}
              options={typeOptions.map((option) => ({
                name: option.name,
                value: option.id,
              }))}
            />

            <MultiselectPopover
              label="Tag"
              fieldName="tag"
              form={form}
              formName={formName}
              options={tagOptions.map((option) => ({
                name: option.name,
                value: option.id,
              }))}
            />
          </div>
        </form>
      </Form>

      <div className="py-8">
        <Suspense fallback={'Loading...'}>
          <TitleGrid titlesPromise={titlesPromise} />
        </Suspense>
      </div>
    </PageContainer>
  )
}
