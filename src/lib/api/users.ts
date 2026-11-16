import { headers } from 'next/headers'
import { auth } from '../auth'
import { MOCK_USERS } from '@/constants/mockUsers'
import { normalizeUserRole } from '@/constants/userRoles'
import type { ManagedUser } from '@/types/user.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: 'name', // The field to sort by.
      sortDirection: 'desc', // The direction to sort by.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })
  return users
}

// user update role
export const updateUserRole = async (
  userId: string,
  role: 'seeker' | 'require' | 'admin'
) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role }),
  })
  if (!res.ok) {
    throw new Error('Failed to update role')
  }
  return res.json()
}

/**
 * Users for the admin "User management" table.
 * Falls back to the sample rows when the admin API is not reachable.
 */
export const getManagedUsers = async (): Promise<ManagedUser[]> => {
  try {
    const { users } = await getUsers()

    return users.map((user) => ({
      id: user.id,
      name: user.name || user.email.split('@')[0],
      email: user.email,
      image: user.image ?? null,
      role: normalizeUserRole(user.role),
      status: user.banned ? 'suspended' : 'active',
      joinedAt: new Date(user.createdAt).toISOString(),
    }))
  } catch (error) {
    console.error(
      'Could not load the users, showing sample data instead.',
      error
    )
    return MOCK_USERS
  }
}

export const getUserPremiumById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  if (!res.ok) {
    throw new Error('Failed to fetch premium user')
  }
  return res.json()
}
