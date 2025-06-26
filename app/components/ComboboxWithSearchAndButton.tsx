'use client'

import { useEffect, useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { secureApi as api } from './utils/routes'

interface ComboboxProps {
  options: { value: string; label: string }[]
  value: string
  setValue: (value: string) => void
  label: string
  onAdd?: () => void
  url?: string // Optional URL for fetching options
}

const ComboboxWithSearchAndButton = ({ options, value, setValue, label, onAdd, url }: ComboboxProps) => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
    const [fetchedOptions, setOptions] = useState<{ value: string; label: string }[]>(options)

    useEffect(() => {
      if (url) {
        api.get(url)
          .then(response => response.json())
          .then(data => {
            const fetchedOptions = data.map((item: any) => ({
              value: item.value,
              label: item.label
            }))
            setOptions(fetchedOptions)
          })
          .catch(error => console.error('Error fetching options:', error))
      }
    }, [url])

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]'
          >
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value ? (
                options.find(option => option.value === value)?.label
              ) : (
                <span className='text-muted-foreground'>Select {label}</span>
              )}
            </span>
            <ChevronsUpDownIcon size={16} className='text-muted-foreground/80 shrink-0' aria-hidden='true' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0' align='start'>
          <Command>
            <CommandInput placeholder={`Find ${label}`} />
            <CommandList>
              <CommandEmpty>No {label} found.</CommandEmpty>
              <CommandGroup>
                {fetchedOptions.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    {value === option.value && <CheckIcon size={16} className='ml-auto' />}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              {onAdd && (
                <CommandGroup>
                  <Button variant='ghost' className='w-full justify-start font-normal' onClick={onAdd}>
                    <PlusIcon size={16} className='-ms-2 opacity-60' aria-hidden='true' />
                    New {label}
                  </Button>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default ComboboxWithSearchAndButton