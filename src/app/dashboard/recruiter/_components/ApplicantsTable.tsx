'use client'

import { Mail } from 'lucide-react'

import { ApplicationStatusBadge } from '@/components/applications/ApplicationStatusBadge'
import { ApplicationStatusMenu } from '@/components/applications/ApplicationStatusMenu'
import { normalizeApplicationStatus } from '@/components/applications/application-status'
import { formatDate, formatRelativeTime } from '@/lib/format'
import type { ApplicationStatus, JobApplication } from '@/types/application.types'

/* ── Helpers ───────────────────────────────────────────────────────── */

/** Avatar colors, cycled per row. */
const AVATAR_COLORS = [
  'bg-zinc-800 text-zinc-200',
  'bg-indigo-500/20 text-indigo-300',
  'bg-violet-500/20 text-violet-300',
  'bg-red-500/20 text-red-400',
  'bg-amber-500/20 text-amber-300',
]

/** The applicant name falls back to the mailbox name when the API has no name. */
const getApplicantName = (application: JobApplication) =>
  application.applicantName?.trim() ||
  application.email.split('@')[0] ||
  'Applicant'

/* ── Table cell classes (desktop table / mobile stacked cards) ─────── */

const thClass =
  'hidden h-11 whitespace-nowrap px-4 text-left text-[11px] font-semibold tracking-[0.14em] text-zinc-500 uppercase sm:px-5 lg:table-cell'

const tdClass =
  'grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-3 px-4 py-3 sm:px-5 lg:table-cell lg:py-4'

const mobileLabelClass =
  'pt-0.5 text-[10px] font-semibold tracking-wide text-zinc-500 uppercase lg:hidden'

/* ── Component ─────────────────────────────────────────────────────── */

interface ApplicantsTableProps {
  applications: JobApplication[]
  /** Called when a recruiter moves an applicant to another status. */
  onStatusChange: (applicationId: string, status: ApplicationStatus) => void
  /** Id of the application currently being saved, if any. */
  pendingApplicationId?: string | null
}

/** Responsive table listing the applicants of a single job. */
export function ApplicantsTable({
  applications,
  onStatusChange,
  pendingApplicationId = null,
}: ApplicantsTableProps) {
  return (
    <section className='overflow-hidden rounded-2xl border border-[#27272A] bg-[#111113] shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-0 border-collapse text-sm lg:min-w-200'>
          <thead>
            <tr className='hidden border-b border-[#27272A] bg-[#18181B]/60 lg:table-row'>
              <th className={thClass}>Applicant</th>
              <th className={thClass}>Contact</th>
              <th className={thClass}>Applied</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} pr-6 text-right`}>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application, index) => {
              const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length]
              const applicantName = getApplicantName(application)
              const status = normalizeApplicationStatus(application.status)
              const isPending = pendingApplicationId === application._id

              return (
                <tr
                  key={application._id}
                  className='mb-3 block rounded-xl border border-[#27272A] bg-[#18181B]/40 transition-colors last:mb-0 hover:bg-[#18181B] lg:mb-0 lg:table-row lg:rounded-none lg:border-x-0 lg:border-t-0 lg:bg-transparent lg:hover:bg-[#18181B] lg:last:border-b-0'
                >
                  {/* Applicant */}
                  <td className={tdClass}>
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-semibold ${avatarColor}`}
                    >
                      {applicantName.charAt(0).toUpperCase()}
                    </div>

                    <div className='mt-3 min-w-0'>
                      <p className='font-semibold break-words text-white'>
                        {applicantName}
                      </p>
                      <p className='mt-0.5 truncate text-xs text-zinc-500'>
                        ID {application.applicantId}
                      </p>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className={tdClass}>
                    <span className={mobileLabelClass}>Contact</span>
                    <span className='flex min-w-0 items-center gap-1.5 text-zinc-300'>
                      <Mail className='size-3.5 shrink-0 text-zinc-500' />
                      <span className='min-w-0 break-words'>
                        {application.email}
                      </span>
                    </span>
                  </td>

                  {/* Applied */}
                  <td className={tdClass}>
                    <span className={mobileLabelClass}>Applied</span>
                    <div className='min-w-0'>
                      <span className='block whitespace-nowrap text-zinc-300'>
                        {formatRelativeTime(application.appliedAt)}
                      </span>
                      <span className='mt-0.5 block text-[11px] text-zinc-500'>
                        {formatDate(application.appliedAt)}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className={tdClass}>
                    <span className={mobileLabelClass}>Status</span>
                    <ApplicationStatusBadge status={status} />
                  </td>

                  {/* Action */}
                  <td className={`${tdClass} lg:pr-6 lg:text-right`}>
                    <span className={mobileLabelClass}>Action</span>
                    <div className='flex justify-start lg:justify-end'>
                      <ApplicationStatusMenu
                        applicationId={application._id}
                        status={status}
                        pending={isPending}
                        onStatusChange={onStatusChange}
                      />
                    </div>
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
          applicant{applications.length === 1 ? '' : 's'}
        </span>
      </div>
    </section>
  )
}
