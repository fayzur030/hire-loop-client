'use client'
import { Button } from '@/components/ui/button'
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
  const handleApplyJob = () => {
    if (!user) {
      toast.info('Please sign in')
      // router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
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
