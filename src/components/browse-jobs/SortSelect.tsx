'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SORT_OPTIONS = [
  { value: 'most-recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'salary-high', label: 'Salary: High to Low' },
  { value: 'salary-low', label: 'Salary: Low to High' },
]

/** "Sort by" dropdown for the browse-jobs results. */
const SortSelect = () => {
  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      <span>Sort by:</span>

      <Select
        items={SORT_OPTIONS}
        defaultValue='most-recent'
        onValueChange={() => {
          // TODO: update the URL query with the selected sort order.
        }}
      >
        <SelectTrigger aria-label='Sort jobs by' className='w-40'>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortSelect
