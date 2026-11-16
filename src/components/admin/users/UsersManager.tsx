'use client'

import { useMemo, useState } from 'react'
import { DownloadIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { updateUserRole } from '@/lib/actions/users'
import type { ManagedUser, UserRole } from '@/types/user.types'

import { UserRoleFilter } from './UserRoleFilter'
import { UserSearch } from './UserSearch'
import { UserStatsCards } from './UserStatsCards'
import { UsersTable } from './UsersTable'
import {
  filterUsers,
  nextSort,
  sortUsers,
  type UserSort,
  type UserSortKey,
} from './user-list'

interface UsersManagerProps {
  /** Users loaded on the server. */
  initialUsers: ManagedUser[]
}

/**
 * Admin screen to review the platform users.
 * It owns the search box, the role filter and the sort order of the table.
 */
export function UsersManager({ initialUsers }: UsersManagerProps) {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
  const [sort, setSort] = useState<UserSort>({
    key: 'joined',
    direction: 'desc',
  })
  /** Id of the user whose role is being saved, if any. */
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)

  /** Rows after the search box, the role filter and the sort are applied. */
  const visibleUsers = useMemo(
    () => sortUsers(filterUsers(users, query, roleFilter), sort),
    [users, query, roleFilter, sort]
  )

  /**
   * Changes the role of a user and saves it with the API.
   * The row only updates once the API confirmed the new role.
   */
  const handleRoleChange = async (userId: string, role: UserRole) => {
    setPendingUserId(userId)

    try {
      await updateUserRole(userId, role)

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, role } : user
        )
      )

      toast.success('Role updated')
    } catch (error) {
      console.error('Failed to update the role:', error)
      toast.error('Failed to update the role')
    } finally {
      setPendingUserId(null)
    }
  }

  /**
   * Suspends or activates an account.
   * TODO: save the new status with the admin API once it is ready.
   */
  const handleToggleStatus = (userId: string) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'suspended' : 'active',
            }
          : user
      )
    )
  }

  /** Clicking a column header sorts the rows by that column. */
  const handleSortChange = (sortKey: UserSortKey) => {
    setSort((currentSort) => nextSort(currentSort, sortKey))
  }

  return (
    <div className='min-w-0 px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
      {/* Page header */}
      <header className='mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between'>
        <div className='min-w-0 space-y-1'>
          <h1 className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>
            User management
          </h1>
          <p className='text-sm text-zinc-400'>
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <UserRoleFilter value={roleFilter} onChange={setRoleFilter} />

          <Button
            type='button'
            variant='outline'
            className='h-10 gap-2 border-[#27272A] bg-[#18181B] px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-[#27272A] hover:text-white'
            // TODO: build the CSV file here when the export is implemented.
            onClick={() => {}}
          >
            <DownloadIcon className='size-4' />
            Export list
          </Button>
        </div>
      </header>

      {/* Summary tiles */}
      <div className='mb-6'>
        <UserStatsCards users={users} />
      </div>

      {/* Search */}
      <div className='mb-4'>
        <UserSearch value={query} onChange={setQuery} />
      </div>

      {/* Table */}
      <UsersTable
        users={visibleUsers}
        sort={sort}
        onSortChange={handleSortChange}
        onRoleChange={handleRoleChange}
        onToggleStatus={handleToggleStatus}
        pendingUserId={pendingUserId}
      />
    </div>
  )
}
