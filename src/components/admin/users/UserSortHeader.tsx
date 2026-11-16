'use client'

import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'

import type { UserSort, UserSortKey } from './user-list'

interface UserSortHeaderProps {
  /** Column title. */
  label: string
  /** Column this header sorts by. */
  sortKey: UserSortKey
  /** The sort that is currently applied to the table. */
  sort: UserSort
  /** Called with the column the admin clicked. */
  onSortChange: (sortKey: UserSortKey) => void
  className?: string
}

/** Table header that sorts the rows when it is clicked. */
export function UserSortHeader({
  label,
  sortKey,
  sort,
  onSortChange,
  className,
}: UserSortHeaderProps) {
  const isActive = sort.key === sortKey

  const Icon = !isActive
    ? ChevronsUpDownIcon
    : sort.direction === 'asc'
      ? ArrowUpIcon
      : ArrowDownIcon

  return (
    <th className={className}>
      <button
        type='button'
        onClick={() => onSortChange(sortKey)}
        className='inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300'
      >
        {label}
        <Icon className={`size-3 ${isActive ? 'text-zinc-300' : 'text-zinc-700'}`} />
      </button>
    </th>
  )
}
