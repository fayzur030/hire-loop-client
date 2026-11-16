'use client'

import { cn } from 'cn'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { USER_ROLE_OPTIONS } from '@/constants/userRoles'
import type { UserRole } from '@/types/user.types'

interface UserRoleMenuProps {
  /** Id of the user whose role is being changed. */
  userId: string
  /** The role the user currently has. */
  role: UserRole
  /** Called with the new role once the admin picks one. */
  onRoleChange: (userId: string, role: UserRole) => void
  /** Shows a spinner and blocks interaction while the update is in flight. */
  pending?: boolean
  className?: string
}

/**
 * "Change role" action for a single user.
 * The menu only picks the role - saving it is left to the parent component.
 */
export function UserRoleMenu({
  userId,
  role,
  onRoleChange,
  pending = false,
  className,
}: UserRoleMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={pending}
            className={cn(
              'h-8 gap-1.5 rounded-lg border-[#27272A] bg-[#18181B] px-3 text-xs font-medium text-zinc-300 transition-colors hover:bg-[#27272A] hover:text-white',
              className
            )}
          />
        }
      >
        {pending ? (
          <Spinner className='size-3.5' />
        ) : (
          <ChevronDownIcon className='size-3.5' />
        )}
        Change role
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-44 border-[#27272A] bg-[#18181B] text-zinc-200'
      >
        {USER_ROLE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            disabled={pending || option.value === role}
            onClick={() => onRoleChange(userId, option.value)}
            className='cursor-pointer justify-between'
          >
            Make {option.label}
            {option.value === role ? (
              <CheckIcon className='size-3.5 text-emerald-400' />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
