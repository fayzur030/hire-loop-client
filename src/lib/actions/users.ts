import type { UserRole } from '@/types/user.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Changes the role of a user.
 *
 * The admin picks the new role in the user table, this call saves it.
 */
export const updateUserRole = async (userId: string, role: UserRole) => {
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
