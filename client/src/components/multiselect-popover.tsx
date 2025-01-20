import { UseFormReturn } from 'react-hook-form'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { FormField, FormItem, FormControl, FormMessage } from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { FormSchema } from '@/routes/browse'

type Props = {
  label: string
  form: UseFormReturn<FormSchema>
  fieldName: 'type' | 'tag'
  formName: string
  options: { name: string; value: string }[]
}

export default function MultiselectPopover({
  label,
  fieldName,
  form,
  formName,
  options,
}: Props) {
  const selected = form.watch(fieldName)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {label}
          {selected.length > 0 && (
            <span className="bg-muted text-muted-foreground text-xs px-1 rounded">
              {selected.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <FormField
          control={form.control}
          name={fieldName}
          render={() => (
            <FormItem>
              <div className="flex flex-wrap gap-2 pb-4">
                {options.map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => {
                      const isChecked = field.value?.includes(option.value)
                      return (
                        <FormItem
                          key={option.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Badge
                              role="checkbox"
                              aria-checked={isChecked}
                              variant={isChecked ? 'default' : 'secondary'}
                              onClick={() =>
                                field.onChange(
                                  isChecked
                                    ? field.value?.filter(
                                        (value) => value !== option.value
                                      )
                                    : [...field.value, option.value]
                                )
                              }
                              className="cursor-pointer px-2 py-1"
                            >
                              {option.name}
                            </Badge>
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button form={formName} type="submit">
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  )
}
