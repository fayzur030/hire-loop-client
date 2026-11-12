import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import type { JobApplication } from '@/types/application.types'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getApplications } from '@/lib/actions/application'
import ApplicationsTable from '../_Components/ApplicationsTable'
import StatCard from '../_Components/StatCard'

/* ── Sample data — TODO: replace with real API data ────────────────── */

// const APPLICATIONS: JobApplication[] = [
//   {
//     _id: '1',
//     jobId: '1',
//     userId: '1',
//     email: 'seeker@example.com',
//     jobTitle: 'Senior Frontend Engineer',
//     companyName: 'Stark Industries',
//     status: 'applied',
//     appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
//     jobType: 'Full-time',
//     workMode: 'Remote',
//   },
//   {
//     _id: '2',
//     jobId: '2',
//     userId: '1',
//     email: 'seeker@example.com',
//     jobTitle: 'Product Designer',
//     companyName: 'Cyberdyne Systems',
//     status: 'review',
//     appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
//     jobType: 'Contract',
//     workMode: 'Hybrid',
//   },
//   {
//     _id: '3',
//     jobId: '3',
//     userId: '1',
//     email: 'seeker@example.com',
//     jobTitle: 'Lead Data Scientist',
//     companyName: 'Wayne Enterprises',
//     status: 'shortlisted',
//     appliedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
//     jobType: 'Full-time',
//     workMode: 'On-site',
//   },
//   {
//     _id: '4',
//     jobId: '4',
//     userId: '1',
//     email: 'seeker@example.com',
//     jobTitle: 'Cloud Architect',
//     companyName: 'Oscorp Tech',
//     status: 'rejected',
//     appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
//     jobType: 'Full-time',
//     workMode: 'Remote',
//   },
//   {
//     _id: '5',
//     jobId: '5',
//     userId: '1',
//     email: 'seeker@example.com',
//     jobTitle: 'AI Research Engineer',
//     companyName: 'Hooli Corp',
//     status: 'offered',
//     appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
//     jobType: 'Full-time',
//     workMode: 'Hybrid',
//   },
// ]

/* ── Page ──────────────────────────────────────────────────────────── */

const ApplicationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const APPLICATIONS = await getApplications(`applicantId=${session?.user?.id}`) // data from api
  // console.log(APPLICATIONS.length, 'application from api')
  const activeApplications = APPLICATIONS.filter((a) => !a.isArchived)
  const archivedApplications = APPLICATIONS.filter((a) => a.isArchived)

  // Simple counts derived from the applications list
  const totalApplied = activeApplications.length
  const shortlisted = activeApplications.filter(
    (a) => a.status === 'shortlisted'
  ).length
  const interviews = activeApplications.filter((a) =>
    ['review', 'shortlisted', 'offered'].includes(a.status)
  ).length
  const successRate = totalApplied
    ? Math.round(
        (activeApplications.filter((a) => a.status === 'offered').length /
          totalApplied) *
          100
      )
    : 0

  return (
    <div className='min-w-0 px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
      <Tabs defaultValue='active'>
        {/* Page header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='min-w-0'>
            <h1 className='font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl'>
              My Applications
            </h1>
            <p className='mt-1.5 text-sm text-zinc-400'>
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <TabsList className='h-10 gap-0.5 p-1'>
              <TabsTrigger
                value='active'
                className='h-8 flex-0 rounded-md px-3 text-sm'
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value='archived'
                className='h-8 flex-0 rounded-md px-3 text-sm'
              >
                Archived
              </TabsTrigger>
            </TabsList>

            {/* TODO: export is not wired up yet */}
            <Button
              variant='outline'
              className='h-10 gap-2 rounded-xl border-[#27272A] bg-[#18181B] px-4 text-zinc-200 hover:bg-[#27272A] hover:text-white'
            >
              <DownloadIcon className='size-4' />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 '>
          <StatCard label='Total Applied' value={totalApplied} />
          <StatCard label='Shortlisted' value={shortlisted} />
          <StatCard
            label='Interviews'
            value={interviews}
            valueClassName='text-yellow-600'
          />
          <StatCard
            label='Success Rate'
            value={`${successRate}%`}
            valueClassName='text-emerald-400'
          />
        </div>

        {/* Tables */}
        <TabsContent value='active' className='mt-6'>
          <ApplicationsTable applications={activeApplications} />
        </TabsContent>

        <TabsContent value='archived' className='mt-6'>
          {archivedApplications.length > 0 ? (
            <ApplicationsTable applications={archivedApplications} />
          ) : (
            <p className='rounded-2xl border border-[#27272A] bg-[#111113] p-10 text-center text-sm text-zinc-500'>
              No archived applications.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ApplicationPage
