'use client'
import { Button } from '@/components/ui/button'
import { applyAJob, getApplicationsCount } from '@/lib/actions/application'
import { authClient } from '@/lib/auth-client'
import { JobFormData } from '@/types/job.types'
import { BookmarkIcon, BuildingIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
interface JobProps {
  job: JobFormData
}

const JobDetailsHeaderCard = ({ job }: JobProps) => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user
  const handleApplyJob = async () => {
    if (!user) {
      toast.info('Please sign in')
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }

    if (user.role !== 'seeker') {
      toast.error('Only job seekers can apply for jobs')
      return
    }

    const jobId = job._id
    if (!jobId) {
      toast.error('Unable to apply: job details are unavailable')
      return
    }

    const countResult = await getApplicationsCount(`applicantId=${user.id}`)
    //less more than 10 and not premium user
    if (countResult.count >= 5) {
      // Redirect to the payment page
      router.push('/checkout')
      return
    }
    try {
      const application = {
        jobId,
        jobTitle: job.title,
        companyName: job.companyName,
        applicantId: user.id,
        email: user.email,
      }

      const res = await applyAJob(application)

      if (res.insertedId) {
        toast.success('Application submitted successfully')
        router.push('/browse-jobs')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Application error:', error)
      toast.error('Failed to submit application')
    }
  }

  return (
    <div>
      <header className='flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5'>
        {/* Company logo placeholder */}
        <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <BuildingIcon className='size-5' />
        </div>

        <div className='min-w-0 flex-1'>
          <h1 className='font-heading text-xl font-semibold sm:text-2xl'>
            {job.title}
          </h1>
          <p className='mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
            {job.companyName}
            {job.isVerified && (
              <span className='inline-flex items-center gap-1.5 text-xs text-emerald-500'>
                <span className='size-1.5 rounded-full bg-emerald-500' />
                Verified Employer
              </span>
            )}
          </p>
        </div>

        {/* TODO: save + apply are not wired up yet */}
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon-lg'
            aria-label={`Save ${job.title}`}
            className={`cursor-pointer`}
          >
            <BookmarkIcon />
          </Button>
          <Button
            size={'lg'}
            className={`py-5 px-5 cursor-pointer`}
            onClick={handleApplyJob}
          >
            Apply Now
          </Button>
        </div>
      </header>
    </div>
  )
}

export default JobDetailsHeaderCard
