import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  insertTitleSchema,
  InsertTitleSchema,
  VALID_FILE_TYPES,
} from '@db/schema/title'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Type } from '@db/schema/type'

async function fetchTypes() {
  const res = await api.types.$get()
  const json = await res.json()
  return json.types
}

async function insertTitle(formData: InsertTitleSchema) {
  const res = await api.titles.$post({ form: formData })
  const json = await res.json()
  return json.titleId
}

export default function TitleForm() {
  const [typeOptions, setTypeOptions] = useState<Type[]>([])

  const form = useForm<InsertTitleSchema>({
    resolver: zodResolver(insertTitleSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(formData: InsertTitleSchema) {
    const titleId = await insertTitle(formData)
    console.log(titleId)
  }

  useEffect(() => {
    async function setOptions() {
      const types = await fetchTypes()
      setTypeOptions(types)
    }

    setOptions()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => await onSubmit(data))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  accept={VALID_FILE_TYPES}
                  type="file"
                  placeholder="shadcn"
                  // set target to files instead of string
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
