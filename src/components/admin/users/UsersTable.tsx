'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/format'
import type { ManagedUser, UserRole } from '@/types/user.types'

import { UserRoleBadge } from './UserRoleBadge'
import { UserRoleMenu } from './UserRoleMenu'
import { UserSortHeader } from './UserSortHeader'
import { UserStatusBadge } from './UserStatusBadge'
import type { UserSort, UserSortKey } from './user-list'

const thClass =
  'h-11 whitespace-nowrap px-4 text-left text-[11px] font-semibold tracking-[0.14em] text-zinc-500 uppercase sm:px-5'

const tdClass = 'px-4 py-4 align-middle text-sm sm:px-5'

interface UsersTableProps {
  /** Rows to show, already filtered and sorted. */
  users: ManagedUser[]
  /** The sort that is currently applied to the table. */
  sort: UserSort
  /** Called with the column the admin clicked. */
  onSortChange: (sortKey: UserSortKey) => void
  /** Called with the user id and the role the admin picked. */
  onRoleChange: (userId: string, role: UserRole) => void
  /** Called with the user id when the account is suspended or activated. */
  onToggleStatus: (userId: string) => void
}

/** Table of every platform user with the role and status actions. */
export function UsersTable({
  users,
  sort,
  onSortChange,
  onRoleChange,
  onToggleStatus,
}: UsersTableProps) {
  return (
    <section className='overflow-hidden rounded-2xl border border-[#27272A] bg-[#111113] shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-0 border-collapse text-sm lg:min-w-220'>
          <thead>
            <tr className='border-b border-[#27272A] bg-[#18181B]/60'>
              {/* Order — the position of the row in the current sort */}
              <th className={`${thClass} w-16`}>Order</th>

              <UserSortHeader
                label='User name'
                sortKey='name'
                sort={sort}
                onSortChange={onSortChange}
                className={thClass}
              />

              <th className={thClass}>Email address</th>

              <UserSortHeader
                label='Role'
                sortKey='role'
                sort={sort}
                onSortChange={onSortChange}
                className={thClass}
              />

              <UserSortHeader
                label='Join date'
                sortKey='joined'
                sort={sort}
                onSortChange={onSortChange}
                className={thClass}
              />

              <th className={thClass}>Status</th>

              <th className={`${thClass} pr-6 text-right`}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className='px-4 py-12 text-center text-sm text-zinc-500 sm:px-5'
                >
                  No users match your filters.
                </td>
              </tr>
            ) : null}

            {users.map((user, index) => (
              <tr
                key={user.id}
                className='border-b border-[#27272A]/60 transition-colors last:border-b-0 hover:bg-[#18181B]/60'
              >
                {/* Order */}
                <td className={tdClass}>
                  <span className='text-xs font-medium text-zinc-500'>
                    {index + 1}
                  </span>
                </td>

                {/* User name */}
                <td className={tdClass}>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-9'>
                      {user.image ? (
                        <AvatarImage src={user.image} alt={user.name} />
                      ) : null}
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className='font-medium text-white'>{user.name}</span>
                  </div>
                </td>

                {/* Email address */}
                <td className={tdClass}>
                  <span className='text-zinc-300'>{user.email}</span>
                </td>

                {/* Role */}
                <td className={tdClass}>
                  <UserRoleBadge role={user.role} />
                </td>

                {/* Join date */}
                <td className={tdClass}>
                  <span className='text-zinc-300'>
                    {formatDate(user.joinedAt)}
                  </span>
                </td>

                {/* Status */}
                <td className={tdClass}>
                  <UserStatusBadge status={user.status} />
                </td>

                {/* Actions */}
                <td className={`${tdClass} pr-6`}>
                  <div className='flex items-center justify-end gap-2'>
                    <UserRoleMenu
                      userId={user.id}
                      role={user.role}
                      onRoleChange={onRoleChange}
                    />

                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => onToggleStatus(user.id)}
                      className={
                        user.status === 'active'
                          ? 'h-8 rounded-lg px-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300'
                          : 'h-8 rounded-lg px-2.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
                      }
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary strip */}
      <div className='border-t border-[#27272A] bg-[#18181B]/60 px-4 py-3 text-xs text-zinc-500 sm:px-5'>
        Showing <span className='font-medium text-zinc-300'>{users.length}</span>{' '}
        user{users.length === 1 ? '' : 's'}
      </div>
    </section>
  )
}
