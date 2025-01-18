import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '@/lib/api'
import { Type } from '@db/schema/type'
import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
} from '@/components/ui/select'
import { ToastAction } from '@/components/ui/toast'

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

const defaultValues: InsertTitleSchema = {
  name: '',
  typeId: '',
  description: '',
  releaseDate: '',
}

export default function TitleForm() {
  const [typeOptions, setTypeOptions] = useState<Type[]>([])
  const { toast } = useToast()

  const form = useForm<InsertTitleSchema>({
    resolver: zodResolver(insertTitleSchema),
    defaultValues,
  })

  async function onSubmit(formData: InsertTitleSchema) {
    const titleId = await insertTitle(formData)
    toast({
      title: 'Title created!',
      action: (
        <ToastAction altText="View title" asChild>
          <Link to={`/title/${titleId}`}>View title</Link>
        </ToastAction>
      ),
    })
    form.reset(defaultValues)
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
              <FormLabel>Title Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter title name" {...field} />
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
                    <SelectValue placeholder="Select title type" />
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
                <Textarea placeholder="Enter title description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Enter title release date"
                  {...field}
                />
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
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  accept={VALID_FILE_TYPES}
                  type="file"
                  placeholder="Upload title cover image"
                  // set value to uploaded file instead of string
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormDescription>.png, .jpg, .jpeg</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
