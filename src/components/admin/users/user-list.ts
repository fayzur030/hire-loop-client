import { USER_ROLE_LABELS } from '@/constants/userRoles'
import type { ManagedUser, UserRole } from '@/types/user.types'

/** Columns the user table can be sorted by. */
export type UserSortKey = 'name' | 'role' | 'joined'

/** Direction the rows are sorted in. */
export type SortDirection = 'asc' | 'desc'

/** The sort that is currently applied to the user table. */
export interface UserSort {
  key: UserSortKey
  direction: SortDirection
}

/** Keeps the rows matching the search box and the role filter. */
export const filterUsers = (
  users: ManagedUser[],
  query: string,
  role: UserRole | 'all'
): ManagedUser[] => {
  const search = query.trim().toLowerCase()

  return users.filter((user) => {
    const matchesRole = role === 'all' || user.role === role
    const matchesSearch =
      !search ||
      user.email.toLowerCase().includes(search) ||
      user.name.toLowerCase().includes(search)

    return matchesRole && matchesSearch
  })
}

/** Sorts the rows by the selected column. */
export const sortUsers = (users: ManagedUser[], sort: UserSort): ManagedUser[] => {
  const sorted = [...users]

  sorted.sort((first, second) => {
    if (sort.key === 'name') {
      return first.name.localeCompare(second.name)
    }

    if (sort.key === 'role') {
      return USER_ROLE_LABELS[first.role].localeCompare(
        USER_ROLE_LABELS[second.role]
      )
    }

    return (
      new Date(first.joinedAt).getTime() - new Date(second.joinedAt).getTime()
    )
  })

  return sort.direction === 'desc' ? sorted.reverse() : sorted
}

/** Clicking a column sorts by it, clicking the same column flips the order. */
export const nextSort = (sort: UserSort, key: UserSortKey): UserSort => {
  if (sort.key === key) {
    return { key, direction: sort.direction === 'asc' ? 'desc' : 'asc' }
  }

  return { key, direction: 'asc' }
}
