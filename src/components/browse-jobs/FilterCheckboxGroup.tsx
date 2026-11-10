'use client'

import { useId } from 'react'
import { CheckIcon } from 'lucide-react'
import { cn } from 'cn'

export interface FilterOption {
  /** Value sent to the API as the filter query param. */
  value: string
  label: string
  /** Optional amount of jobs matching this option, shown next to the label. */
  count?: number
}

interface FilterCheckboxGroupProps {
  title: string
  options: FilterOption[]
  selectedValue?: string | null
  /** Called when an option is selected. Wire the URL query update here. */
  onSelect?: (value: string) => void
}

/** Formats a count like `1024` as `1k` and keeps smaller counts as-is. */
const formatCount = (count: number) =>
  count >= 1000 ? `${Math.round(count / 100) / 10}k` : `${count}`

/**
 * A titled group of options used as a single filter field.
 * Only one option can be selected at a time.
 */
const FilterCheckboxGroup = ({
  title,
  options,
  selectedValue,
  onSelect,
}: FilterCheckboxGroupProps) => {
  // Local selection state — the query itself is not updated yet.

  const name = useId()

  return (
    <fieldset className='border-0 p-0'>
      <legend className='text-sm font-semibold text-foreground'>{title}</legend>

      <ul className='mt-3 space-y-2'>
        {options.map((option) => {
          const isSelected = selectedValue === option.value

          return (
            <li key={option.value}>
              <label className='flex cursor-pointer items-center gap-2.5'>
                <input
                  type='radio'
                  name={name}
                  className='sr-only peer'
                  checked={isSelected}
                  onChange={() => onSelect?.(option.value)}
                />

                {/* Custom checkbox square */}
                <span
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-sm border transition-colors',
                    'peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
                    isSelected
                      ? 'border-primary bg-primary'
                      : 'border-border bg-input/50'
                  )}
                >
                  <CheckIcon
                    className={cn(
                      'size-3 text-primary-foreground',
                      isSelected ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </span>

                <span
                  className={cn(
                    'flex-1 text-sm transition-colors',
                    isSelected ? 'text-foreground' : 'text-zinc-300'
                  )}
                >
                  {option.label}
                </span>

                {option.count !== undefined && (
                  <span className='text-xs text-muted-foreground'>
                    {formatCount(option.count)}
                  </span>
                )}
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default FilterCheckboxGroup
