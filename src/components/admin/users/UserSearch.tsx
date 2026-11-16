'use client'

import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface UserSearchProps {
  /** Current text of the search box. */
  value: string
  /** Called whenever the search box changes. */
  onChange: (value: string) => void
}

/** Search box that filters the users by email or name. */
export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className='relative w-full max-w-md'>
      <SearchIcon className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500' />
      <Input
        type='search'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Search by email or name...'
        aria-label='Search users'
        className='h-10 border-[#27272A] bg-[#18181B] pl-9 text-white placeholder:text-zinc-500'
      />
    </div>
  )
}
