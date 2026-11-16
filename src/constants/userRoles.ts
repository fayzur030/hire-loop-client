import type { UserRole } from '@/types/user.types'

/**
 * Single source of truth for the user roles.
 * The table, the badges and the role pickers all read from here so a role is
 * labelled and coloured the same way everywhere.
 */

/** Every role a user can have, listed from the most to the least powerful. */
export const USER_ROLES: UserRole[] = ['admin', 'recruiter', 'seeker']

/** Human readable label for each role. */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  recruiter: 'Recruiter',
  seeker: 'Seeker',
}

/** Tailwind classes for the role pill. */
export const USER_ROLE_STYLES: Record<UserRole, string> = {
  admin: 'bg-amber-500/15 text-amber-400',
  recruiter: 'bg-blue-500/15 text-blue-400',
  seeker: 'bg-zinc-500/15 text-zinc-300',
}

/** Options for role dropdowns and selects. */
export const USER_ROLE_OPTIONS = USER_ROLES.map((value) => ({
  value,
  label: USER_ROLE_LABELS[value],
}))

/** Role used when the API has not stored one yet. */
export const DEFAULT_USER_ROLE: UserRole = 'seeker'

/** Falls back to `seeker` for missing or unknown roles. */
export const normalizeUserRole = (role?: string | null): UserRole =>
  role && role in USER_ROLE_LABELS ? (role as UserRole) : DEFAULT_USER_ROLE
