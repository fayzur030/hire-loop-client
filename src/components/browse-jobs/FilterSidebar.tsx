'use client'

import FilterCheckboxGroup, { type FilterOption } from './FilterCheckboxGroup'

interface FilterSidebarProps {
  /** One entry per filter field, e.g. Job Type, Work Type, Category. */
  groups: {
    title: string
    options: FilterOption[]
  }[]
}

/** Left sidebar holding one checkbox group per filter field. */
const FilterSidebar = ({ groups }: FilterSidebarProps) => {
  return (
    <aside className='h-fit w-full shrink-0 rounded-2xl border border-border bg-card p-4 lg:w-60'>
      <h2 className='px-1 font-heading text-base font-semibold'>Filters</h2>

      <div className='mt-4 space-y-5 px-1'>
        {groups.map((group) => (
          <FilterCheckboxGroup
            key={group.title}
            title={group.title}
            options={group.options}
            onSelect={() => {
              // TODO: update the URL query with the selected filter value.
            }}
          />
        ))}
      </div>
    </aside>
  )
}

export default FilterSidebar
