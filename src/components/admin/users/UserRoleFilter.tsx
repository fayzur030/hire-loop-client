'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { USER_ROLE_OPTIONS } from '@/constants/userRoles'
import type { UserRole } from '@/types/user.types'

/** Every role plus the option that shows all of them. */
const ROLE_FILTER_OPTIONS = [
  { value: 'all', label: 'All roles' },
  ...USER_ROLE_OPTIONS,
]

interface UserRoleFilterProps {
  /** Role the list is filtered by, or "all" for every role. */
  value: UserRole | 'all'
  /** Called with the role the admin picked. */
  onChange: (role: UserRole | 'all') => void
}

/** "All roles" dropdown that filters the user table by role. */
export function UserRoleFilter({ value, onChange }: UserRoleFilterProps) {
  return (
    <Select
      items={ROLE_FILTER_OPTIONS}
      value={value}
      onValueChange={(nextRole) => onChange(nextRole as UserRole | 'all')}
    >
      <SelectTrigger
        aria-label='Filter users by role'
        className='h-10 w-full border-[#27272A] bg-[#18181B] px-3 text-sm font-medium text-white sm:w-44'
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className='border-[#27272A] bg-[#18181B] text-zinc-200'>
        {ROLE_FILTER_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
