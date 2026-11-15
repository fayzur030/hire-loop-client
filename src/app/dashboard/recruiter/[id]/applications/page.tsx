import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { BriefcaseBusinessIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { getAllJobs } from '@/lib/api/jobs'
import { getApplicationsByJob } from '@/lib/actions/application'
import { getSession } from '@/lib/core/sessionFromServer'
import { formatDate } from '@/lib/format'
import type { JobApplication } from '@/types/application.types'
import { JobApplicationsView } from '../../_components/JobApplicationsView'

interface JobApplicationsPageProps {
  params: Promise<{ id: string }>
}

/**
 * Applications for a single job.
 * The `[id]` segment is the job id, the recruiter only ever sees the jobs
 * they own — the job is resolved through the recruiter's own job list.
 */
const JobApplicationsPage = async ({ params }: JobApplicationsPageProps) => {
  const { id } = await params
  const session = await getSession()

  if (!session?.user) {
    redirect(`/sign-in?redirectTo=/dashboard/recruiter/${id}/applications`)
  }

  const jobs = await getAllJobs(`reciterId=${session.user.id}`)
  const job = jobs.find((item) => item._id === id)

  if (!job) {
    notFound()
  }

  let applications: JobApplication[] = []
  let hasError = false

  try {
    applications = await getApplicationsByJob(job._id)
  } catch (error) {
    console.error('Failed to load applications for job:', error)
    hasError = true
  }

  return (
    <div className='min-w-0 px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
      {/* Breadcrumb */}
      <nav className='mb-4 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500'>
        <Link
          href='/dashboard/recruiter/manage-jobs'
          className='transition-colors hover:text-zinc-300'
        >
          Manage Jobs
        </Link>
        <ChevronRightIcon className='size-3 text-zinc-700' />
        <span className='truncate'>{job.title}</span>
        <ChevronRightIcon className='size-3 text-zinc-700' />
        <span className='text-zinc-500'>Applications</span>
      </nav>

      {/* Page header */}
      <header className='mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between'>
        <div className='min-w-0 space-y-2'>
          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl'>
              Applicants
            </h1>

            <Badge className='border-[#6366F1]/20 bg-[#6366F1]/10 text-[#A5B4FC]'>
              {applications.length} applicant{applications.length === 1 ? '' : 's'}
            </Badge>
          </div>

          <div className='flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400'>
            <span className='flex min-w-0 items-center gap-1.5 font-medium text-zinc-200'>
              <BriefcaseBusinessIcon className='size-3.5 shrink-0 text-zinc-500' />
              <span className='truncate'>{job.title}</span>
            </span>

            <span className='text-zinc-600'>•</span>

            <span className='truncate'>{job.companyName}</span>

            <span className='text-zinc-600'>•</span>

            <span className='flex items-center gap-1.5'>
              <MapPinIcon className='size-3.5 shrink-0 text-zinc-500' />
              {job.isRemote ? 'Remote' : job.location || '—'}
            </span>

            <span className='text-zinc-600'>•</span>

            <span>Deadline {formatDate(job.deadline)}</span>
          </div>
        </div>
      </header>

      <JobApplicationsView applications={applications} hasError={hasError} />
    </div>
  )
}

export default JobApplicationsPage
