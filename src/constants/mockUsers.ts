import type { ManagedUser } from '@/types/user.types'

/**
 * Sample rows for the admin user table.
 * They are used when the admin API cannot be reached, so the screen still shows
 * the layout while the backend is being wired up.
 */
export const MOCK_USERS: ManagedUser[] = [
  {
    id: 'mock-1',
    name: 'Jordan Davis',
    email: 'jordan.davis@example.com',
    image: null,
    role: 'seeker',
    status: 'active',
    joinedAt: '2023-10-12T00:00:00.000Z',
  },
  {
    id: 'mock-2',
    name: 'Elena Rodriguez',
    email: 'elena.r@tenantflow.io',
    image: null,
    role: 'recruiter',
    status: 'active',
    joinedAt: '2023-09-28T00:00:00.000Z',
  },
  {
    id: 'mock-3',
    name: 'Marcus Webb',
    email: 'm.webb@outlook.com',
    image: null,
    role: 'seeker',
    status: 'suspended',
    joinedAt: '2023-08-05T00:00:00.000Z',
  },
  {
    id: 'mock-4',
    name: 'Tom Hiddleston',
    email: 't.hiddles@olki-tech.com',
    image: null,
    role: 'recruiter',
    status: 'active',
    joinedAt: '2023-11-01T00:00:00.000Z',
  },
]
