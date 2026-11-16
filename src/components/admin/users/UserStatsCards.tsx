import { StatCard } from '@/components/dashboard/StatCard'
import type { ManagedUser } from '@/types/user.types'

/** One day in milliseconds, used for the "new signups" tile. */
const ONE_DAY = 24 * 60 * 60 * 1000

/** True when the account was created within the last 24 hours. */
const joinedToday = (joinedAt: string) => {
  const time = new Date(joinedAt).getTime()

  if (Number.isNaN(time)) return false
  return Date.now() - time <= ONE_DAY
}

/** Share of the total, rounded to one decimal, e.g. "12.5%". */
const toPercent = (value: number, total: number) => {
  if (!total) return '0%'
  return `${((value / total) * 100).toFixed(1)}%`
}

interface UserStatsCardsProps {
  /** Every user of the platform. */
  users: ManagedUser[]
}

/** Summary tiles shown above the user table. */
export function UserStatsCards({ users }: UserStatsCardsProps) {
  const total = users.length
  const active = users.filter((user) => user.status === 'active').length
  const suspended = total - active
  const recruiters = users.filter((user) => user.role === 'recruiter').length
  const newSignups = users.filter((user) => joinedToday(user.joinedAt)).length

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        label='Total active users'
        value={active}
        hint={`${total} total accounts`}
      />

      <StatCard
        label='Recruiters'
        value={recruiters}
        hint={`${toPercent(recruiters, total)} of all users`}
        hintClassName='text-emerald-400'
      />

      <StatCard
        label='Suspended accounts'
        value={suspended}
        hint={`${toPercent(suspended, total)} of total`}
      />

      <StatCard
        label='New signups (24h)'
        value={newSignups}
        hint={newSignups ? 'Steady activity' : 'No new signups yet'}
        hintClassName='text-amber-400'
      />
    </div>
  )
}
