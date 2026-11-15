'use client'

import { cn } from 'cn'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import type { ApplicationStatus } from '@/types/application.types'
import {
  APPLICATION_STATUS_OPTIONS,
  normalizeApplicationStatus,
} from './application-status'

interface ApplicationStatusMenuProps {
  /** Id of the application whose status is being changed. */
  applicationId: string
  /** The status the application currently has. */
  status?: ApplicationStatus | null
  /** Called with the new status once the user picks one. */
  onStatusChange: (applicationId: string, status: ApplicationStatus) => void
  /** Shows a spinner and blocks interaction while the update is in flight. */
  pending?: boolean
  className?: string
}

/**
 * "Update status" action for a single application.
 * Kept generic so recruiters, admins and any future pipeline screen can reuse it.
 */
export function ApplicationStatusMenu({
  applicationId,
  status,
  onStatusChange,
  pending = false,
  className,
}: ApplicationStatusMenuProps) {
  const currentStatus = normalizeApplicationStatus(status)

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
        Update status
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-44 border-[#27272A] bg-[#18181B] text-zinc-200'
      >
        {APPLICATION_STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            disabled={pending || option.value === currentStatus}
            onClick={() => onStatusChange(applicationId, option.value)}
            className='cursor-pointer'
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
