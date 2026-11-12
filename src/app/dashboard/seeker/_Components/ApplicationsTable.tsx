import { Button } from '@/components/ui/button'
import { JobApplication } from '@/types/application.types'
import StatusBadge from './StatusBadge'

/* ── Helpers ───────────────────────────────────────────────────────── */

/** Formats a date as "2 hours ago". */
const timeAgo = (date: string) => {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date

  const minutes = Math.floor((Date.now() - parsed.getTime()) / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`

  return `${Math.floor(days / 7)} week${days >= 14 ? 's' : ''} ago`
}

/** Icon colors for the job-title avatar, cycled per row. */
const AVATAR_COLORS = [
  'bg-zinc-800 text-zinc-200',
  'bg-indigo-500/20 text-indigo-300',
  'bg-violet-500/20 text-violet-300',
  'bg-red-500/20 text-red-400',
  'bg-amber-500/20 text-amber-300',
]

/* ── Table cell classes (desktop table / mobile stacked cards) ─────── */

const thClass =
  'hidden h-11 whitespace-nowrap px-4 text-left text-[11px] font-semibold tracking-[0.14em] text-zinc-500 uppercase sm:px-5 lg:table-cell'

const tdClass =
  'grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-3 px-4 py-3 sm:px-5 lg:table-cell lg:py-4'

const mobileLabelClass =
  'pt-0.5 text-[10px] font-semibold tracking-wide text-zinc-500 uppercase lg:hidden'

/* ── Component ─────────────────────────────────────────────────────── */

interface ApplicationsTableProps {
  applications: JobApplication[]
}

/** Responsive table of the seeker's job applications. */
const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  return (
    <section className='overflow-hidden rounded-2xl border border-[#27272A] bg-[#111113] shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-0 border-collapse text-sm'>
          <thead>
            <tr className='hidden border-b border-[#27272A] bg-[#18181B]/60 lg:table-row'>
              <th className={thClass}>Job Title</th>
              <th className={thClass}>Company</th>
              <th className={thClass}>Applied</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} pr-6 text-right`}>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application, index) => {
              const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length]

              return (
                <tr
                  key={application._id}
                  className='mb-3 block rounded-xl border border-[#27272A] bg-[#18181B]/40 transition-colors last:mb-0 hover:bg-[#18181B] lg:mb-0 lg:table-row lg:rounded-none lg:border-x-0 lg:border-t-0 lg:bg-transparent lg:hover:bg-[#18181B]'
                >
                  {/* Job title + type • work mode */}
                  <td className={tdClass}>
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-semibold ${avatarColor}`}
                    >
                      {application.jobTitle.charAt(0).toUpperCase()}
                    </div>

                    <div className='min-w-0'>
                      <p className='font-semibold break-words text-white'>
                        {application.jobTitle}
                      </p>
                      {(application.jobType || application.workMode) && (
                        <p className='mt-0.5 text-xs text-zinc-500'>
                          {[application.jobType, application.workMode]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Company */}
                  <td className={tdClass}>
                    <span className={mobileLabelClass}>Company</span>
                    <span className='min-w-0 break-words text-zinc-200'>
                      {application.companyName}
                    </span>
                  </td>

                  {/* Applied */}
                  <td className={tdClass}>
                    <span className={mobileLabelClass}>Applied</span>
                    <span className='min-w-0 whitespace-nowrap text-zinc-400'>
                      {timeAgo(application.appliedAt)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className={tdClass}>
                    <span className={mobileLabelClass}>Status</span>
                    <StatusBadge status={application.status} />
                  </td>

                  {/* Action */}
                  <td className={`${tdClass} lg:pr-6 lg:text-right`}>
                    <span className={mobileLabelClass}>Action</span>
                    {/* TODO: link to the application details page */}
                    <Button
                      variant='ghost'
                      className='h-8 px-2 text-zinc-400 hover:text-white'
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Summary strip (pagination comes later) */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-t border-[#27272A] bg-[#18181B]/60 px-4 py-3 text-xs text-zinc-500 sm:px-5'>
        <span>
          Showing{' '}
          <span className='font-medium text-zinc-300'>
            {applications.length}
          </span>{' '}
          of{' '}
          <span className='font-medium text-zinc-300'>
            {applications.length}
          </span>{' '}
          applications
        </span>
      </div>
    </section>
  )
}

export default ApplicationsTable
