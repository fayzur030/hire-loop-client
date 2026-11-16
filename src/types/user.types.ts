/** The kinds of accounts a user can create on HireLoop. */
export type UserRole = 'seeker' | 'recruiter' | 'admin'

/** Whether an account can currently be used on the platform. */
export type UserStatus = 'active' | 'suspended'

/** A user as shown in the admin "User management" table. */
export interface ManagedUser {
  id: string
  name: string
  email: string
  /** Profile picture, when the user uploaded one. */
  image: string | null
  role: UserRole
  status: UserStatus
  /** ISO date the account was created. */
  joinedAt: string
}
