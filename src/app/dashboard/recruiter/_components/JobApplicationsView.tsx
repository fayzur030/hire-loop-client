'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AlertCircleIcon, BriefcaseBusinessIcon } from 'lucide-react'

import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUSES,
  normalizeApplicationStatus,
} from '@/components/applications/application-status'
import { StatCard } from '@/components/dashboard/StatCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateApplicationStatus } from '@/lib/actions/application'
import type {
  ApplicationStatus,
  JobApplication,
} from '@/types/application.types'
import { ApplicantsTable } from './ApplicantsTable'

/** Bucket shown on a tab — "all" keeps every application visible. */
type ApplicationFilter = ApplicationStatus | 'all'

/** Tab order mirrors the pipeline order. */
const FILTERS: { value: ApplicationFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...APPLICATION_STATUSES.map((status) => ({
    value: status as ApplicationFilter,
    label: APPLICATION_STATUS_LABELS[status],
  })),
]

interface JobApplicationsViewProps {
  applications: JobApplication[]
  /** Set when the applications could not be loaded from the API. */
  hasError?: boolean
}

/**
 * Interactive part of the recruiter "applications for a job" screen:
 * pipeline filters, pipeline stats and the status update action.
 */
export function JobApplicationsView({
  applications,
  hasError = false,
}: JobApplicationsViewProps) {
  const router = useRouter()
  const [filter, setFilter] = useState<ApplicationFilter>('all')
  const [pendingApplicationId, setPendingApplicationId] = useState<
    string | null
  >(null)
  /**
   * Locally applied statuses. They keep the table responsive while the API
   * call is in flight and are dropped again if the update fails.
   */
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, ApplicationStatus>
  >({})

  const rows = useMemo(
    () =>
      applications.map((application) => ({
        ...application,
        status:
          statusOverrides[application._id] ??
          normalizeApplicationStatus(application.status),
      })),
    [applications, statusOverrides]
  )

  const counts = useMemo(() => {
    const byStatus = Object.fromEntries(
      APPLICATION_STATUSES.map((status) => [status, 0])
    ) as Record<ApplicationStatus, number>

    for (const row of rows) {
      byStatus[row.status] += 1
    }

    return { all: rows.length, ...byStatus }
  }, [rows])

  const visibleRows = useMemo(
    () =>
      filter === 'all' ? rows : rows.filter((row) => row.status === filter),
    [rows, filter]
  )

  // const handleStatusChange = async (
  //   applicationId: string,
  //   status: ApplicationStatus
  // ) => {
  //   const previousStatus = rows.find((row) => row._id === applicationId)?.status

  //   setStatusOverrides((current) => ({
  //     ...current,
  //     [applicationId]: status,
  //   }))
  //   setPendingApplicationId(applicationId)

  //   //todo: update status
  //   try {
  //     await updateApplicationStatus()

  //     toast.success(`Application moved to ${APPLICATION_STATUS_LABELS[status]}`)
  //     router.refresh()
  //   } catch (error) {
  //     console.error('Failed to update application status:', error)

  //     // Roll the row back to the status it had before the failed update.
  //     setStatusOverrides((current) => {
  //       const next = { ...current }

  //       if (previousStatus) {
  //         next[applicationId] = previousStatus
  //       } else {
  //         delete next[applicationId]
  //       }

  //       return next
  //     })

  //     toast.error(
  //       error instanceof Error
  //         ? error.message
  //         : 'Failed to update application status'
  //     )
  //   } finally {
  //     setPendingApplicationId(null)
  //   }
  // }

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    const previousStatus = rows.find((row) => row._id === id)?.status

    // Immediately update the UI
    setStatusOverrides((current) => ({
      ...current,
      [id]: status,
    }))

    setPendingApplicationId(id)

    try {
      const result = await updateApplicationStatus(id, { status })

      if (!result.success) {
        throw new Error('Failed to update application status')
      }

      toast.success(`Application moved to ${APPLICATION_STATUS_LABELS[status]}`)

      router.refresh()
    } catch (error) {
      console.error('Failed to update application status:', error)

      // Restore previous status
      setStatusOverrides((current) => {
        const next = { ...current }

        if (previousStatus) {
          next[id] = previousStatus
        } else {
          delete next[id]
        }

        return next
      })

      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update application status'
      )
    } finally {
      setPendingApplicationId(null)
    }
  }
  if (hasError) {
    return (
      <div className='mt-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300'>
        <AlertCircleIcon className='mt-0.5 size-4 shrink-0' />
        <p>
          The applicants could not be loaded right now. Please refresh the page
          and try again.
        </p>
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className='mt-6 flex flex-col items-center gap-4 rounded-2xl border border-[#27272A] bg-[#111113] p-12 text-center'>
        <div className='flex size-12 items-center justify-center rounded-xl bg-[#6366F1]/10 text-[#A5B4FC]'>
          <BriefcaseBusinessIcon className='size-6' />
        </div>

        <div className='space-y-1'>
          <p className='font-heading text-base font-semibold text-white'>
            No applicants yet
          </p>
          <p className='max-w-md text-sm text-zinc-500'>
            Applications for this job will appear here as soon as candidates
            start applying.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link href='/dashboard/recruiter/manage-jobs' />}
          className='h-9 rounded-xl border-[#27272A] bg-[#18181B] px-4 text-xs font-semibold text-zinc-200 hover:bg-[#27272A] hover:text-white'
        >
          Back to Manage Jobs
        </Button>
      </div>
    )
  }

  return (
    <div className='mt-6'>
      {/* Pipeline stats */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6'>
        <StatCard label='Total Applicants' value={counts.all} />
        <StatCard label='Applied' value={counts.applied} />
        <StatCard
          label='Review'
          value={counts.review}
          valueClassName='text-amber-400'
        />
        <StatCard
          label='Shortlisted'
          value={counts.shortlisted}
          valueClassName='text-blue-400'
        />
        <StatCard
          label='Offered'
          value={counts.offered}
          valueClassName='text-emerald-400'
        />
        <StatCard
          label='Rejected'
          value={counts.rejected}
          valueClassName='text-red-400'
        />
      </div>

      {/* Pipeline filters + table */}
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as ApplicationFilter)}
        className='mt-6'
      >
        <div className='overflow-x-auto no-scrollbar'>
          <TabsList className='h-10 w-max min-w-full gap-0.5 p-1'>
            {FILTERS.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className='h-8 gap-1.5 rounded-md px-3 text-sm'
              >
                {option.label}
                <span className='rounded-full bg-[#27272A] px-1.5 text-[10px] text-zinc-400'>
                  {counts[option.value]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={filter} className='mt-4'>
          <ApplicantsTable
            applications={visibleRows}
            onStatusChange={handleStatusChange}
            pendingApplicationId={pendingApplicationId}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
