import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  ChevronRight,
  MapPin,
  MoreVertical,
  PencilLine,
  Plus,
} from 'lucide-react'

import { getAllJobs } from '@/lib/api/getAllJobs'
import type { JobFormData } from '@/types/jobForm.type'
import { DeleteJobDialog } from '../_Components/DeleteJobDilalog'

/* ── Design tokens (matches Add New Job form) ─────────────────────── */

const cardClass =
  'overflow-hidden rounded-2xl border border-[#27272A] bg-[#111113] shadow-sm'

const thClass =
  'h-11 whitespace-nowrap px-4 text-left text-[11px] font-semibold tracking-[0.14em] text-zinc-500 uppercase sm:px-5'

const tdClass = 'px-4 py-4 align-middle sm:px-5'

/* ── Helpers ───────────────────────────────────────────────────────── */

type JobStatus = 'active' | 'closed'

const STATUS_STYLES: Record<JobStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-emerald-500/10 text-emerald-400 border-transparent',
  },
  closed: {
    label: 'Closed',
    className:
      'bg-zinc-500/10 text-zinc-500 border-transparent hover:bg-zinc-500/10',
  },
}

const statusDotClass: Record<JobStatus, string> = {
  active: 'bg-emerald-400',
  closed: 'bg-zinc-500',
}

/** Status is derived from the application deadline (no status field in the API). */
const getJobStatus = (deadline: string): JobStatus => {
  if (!deadline) return 'closed'
  const deadlineDate = new Date(deadline)
  if (Number.isNaN(deadlineDate.getTime())) return 'closed'
  return deadlineDate.getTime() >= Date.now() ? 'active' : 'closed'
}

const formatDate = (date: string) => {
  if (!date) return '—'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatSalary = (job: JobFormData) => {
  if (!job.minSalary && !job.maxSalary) return 'Not specified'
  if (!job.maxSalary) return `${job.minSalary} ${job.salaryFrequency}`
  return `${job.minSalary} - ${job.maxSalary} ${job.salaryFrequency}`
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default async function ManageJobsPage() {
  const JOBS = await getAllJobs()
  return (
    <div className='min-w-0 px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
      {/* Breadcrumb */}
      <nav className='mb-4 flex items-center gap-1.5 text-xs text-zinc-500'>
        <span>Manage Jobs</span>
        <ChevronRight className='size-3 text-zinc-700' />
        <span className='text-zinc-500'>Job Listings &amp; Postings</span>
      </nav>

      {/* Page header */}
      <header className='mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between'>
        <div className='min-w-0 space-y-2'>
          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl'>
              Manage Job Posts
            </h1>

            <Badge className='border-[#6366F1]/20 bg-[#6366F1]/10 text-[#A5B4FC]'>
              {JOBS.length} total jobs
            </Badge>
          </div>

          <p className='max-w-xl text-sm leading-6 text-zinc-400 sm:text-base'>
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          render={<Link href='/dashboard/recruiter/add-jobs' />}
          className='h-11 shrink-0 gap-2 rounded-xl bg-[#6366F1] px-5 text-sm font-semibold text-white shadow-lg shadow-[#6366F1]/10 transition-colors hover:bg-[#5558E8]'
        >
          <Plus className='size-4' />
          New Job Post
        </Button>
      </header>

      {/* Table card */}
      <section className={cardClass}>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-240 border-collapse text-sm'>
            <thead>
              <tr className='border-b border-[#27272A] bg-[#18181B]/60'>
                <th className={thClass}>Job Title</th>
                <th className={thClass}>Company</th>
                <th className={thClass}>Category</th>
                <th className={thClass}>Job Type</th>
                <th className={thClass}>Salary</th>
                <th className={thClass}>Status</th>
                <th className={`${thClass} pr-6 text-right`}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {JOBS.map((job) => {
                const status = getJobStatus(job.deadline)

                return (
                  <tr
                    key={job._id}
                    className='border-b border-[#27272A] transition-colors last:border-0 hover:bg-[#18181B]'
                  >
                    {/* Title — prominent */}
                    <td className={tdClass}>
                      <div className='flex items-center gap-3'>
                        <span className='font-semibold text-white'>
                          {job.title}
                        </span>
                      </div>
                    </td>

                    {/* Company & location */}
                    <td className={tdClass}>
                      <span className='font-medium text-zinc-200'>
                        {job.companyName}
                      </span>

                      <span className='mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500'>
                        <MapPin className='size-3' />
                        {job.isRemote ? 'Remote' : job.location || '—'}
                      </span>
                    </td>

                    {/* Category */}
                    <td className={tdClass}>
                      <span className='text-xs font-medium text-zinc-400'>
                        {job.category}
                      </span>
                    </td>

                    {/* Job type */}
                    <td className={tdClass}>
                      <Badge className='border-[#27272A] bg-[#18181B] font-medium text-zinc-300 capitalize hover:bg-[#18181B]'>
                        {job.jobType}
                      </Badge>
                    </td>

                    {/* Salary */}
                    <td className={`${tdClass} whitespace-nowrap`}>
                      <span className='font-medium text-zinc-200'>
                        {formatSalary(job)}
                      </span>
                    </td>

                    {/* Status & deadline */}
                    <td className={tdClass}>
                      <Badge
                        className={`rounded-full py-1 pl-2.5 ${STATUS_STYLES[status].className}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${statusDotClass[status]}`}
                        />
                        {STATUS_STYLES[status].label}
                      </Badge>

                      <span className='mt-1 block text-[11px] text-zinc-500'>
                        Deadline {formatDate(job.deadline)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className={`${tdClass} pr-6`}>
                      <div className='flex items-center justify-end gap-1.5'>
                        {/* Update */}
                        <Button
                          type='button'
                          size='sm'
                          className='h-8 gap-1.5 rounded-lg bg-[#6366F1]/10 px-3 text-xs font-medium text-[#A5B4FC] transition-colors hover:bg-[#6366F1]/20 hover:text-indigo-300'
                        >
                          <PencilLine className='size-3.5' />
                          Update
                        </Button>

                        {/* Delete */}
                        <DeleteJobDialog job={job} />

                        {/* More */}
                        {/* <Button
                          type='button'
                          variant='ghost'
                          size='icon-sm'
                          aria-label={`More actions for ${job.title}`}
                          className='rounded-lg text-zinc-500 transition-colors hover:bg-[#27272A] hover:text-white'
                        >
                          <MoreVertical className='size-4' />
                        </Button> */}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary strip */}
        <div className='border-t border-[#27272A] bg-[#18181B]/60 px-4 py-3 text-xs text-zinc-500 sm:px-5'>
          Showing{' '}
          <span className='font-medium text-zinc-300'>{JOBS.length}</span> of{' '}
          <span className='font-medium text-zinc-300'>{JOBS.length}</span> jobs
        </div>
      </section>
    </div>
  )
}
