'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import FilterCheckboxGroup, { type FilterOption } from './FilterCheckboxGroup'

interface FilterSidebarProps {
  /** One entry per filter field, e.g. Job Type, Work Type, Category. */
  groups: {
    name: string
    title: string
    options: FilterOption[]
  }[]
}

/** Left sidebar holding one checkbox group per filter field. */
const FilterSidebar = ({ groups }: FilterSidebarProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const handleFilterChange = (name: string, value: string) => {
    console.log(name, value)

    const params = new URLSearchParams(window.location.search)
    params.set(name, value)
    router.push(`browse-jobs?/${params.toString()}`)
  }

  return (
    <aside className='h-fit w-full shrink-0 rounded-2xl border border-border bg-card p-4 lg:w-60'>
      <h2 className='px-1 font-heading text-base font-semibold'>Filters</h2>

      <div className='mt-4 space-y-5 px-1'>
        {groups.map((group) => (
          <FilterCheckboxGroup
            key={group.title}
            title={group.title}
            options={group.options}
            selectedValue={searchParams.get(group.name)}
            onSelect={(value) => handleFilterChange(group.name, value)}
          />
        ))}
      </div>
    </aside>
  )
}

export default FilterSidebar
