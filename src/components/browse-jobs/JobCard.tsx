import Link from 'next/link'
import {
  BanknoteIcon,
  BookmarkIcon,
  BuildingIcon,
  ClockIcon,
  MapPinIcon,
} from 'lucide-react'
import type { Job } from '@/types/job.types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface JobCardProps {
  job: Job
}

/** Single job listing card shown in the browse-jobs results. */
const JobCard = ({ job }: JobCardProps) => {
  const salary =
    job.minSalary && job.maxSalary
      ? `$${job.minSalary} - $${job.maxSalary}`
      : null

  return (
    <article className='rounded-2xl border border-border bg-card p-5 transition-colors hover:border-white/10'>
      <div className='flex items-start gap-4'>
        {/* Company logo placeholder */}
        <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground'>
          <BuildingIcon className='size-5' />
        </div>

        <div className='min-w-0 flex-1'>
          <h3 className='font-heading text-lg font-semibold text-foreground'>
            <Link
              href={`/jobs/${job._id}`}
              className='transition-colors hover:text-primary'
            >
              {job.title}
            </Link>
          </h3>

          <p className='mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground'>
            <span>{job.companyName}</span>
            <span aria-hidden>•</span>
            <span className='inline-flex items-center gap-1'>
              <MapPinIcon className='size-3.5' />
              {job.location}
            </span>
            {job.isRemote && <span>(Remote)</span>}
          </p>

          <div className='mt-3 flex flex-wrap items-center gap-2'>
            {salary && (
              <Badge
                variant='secondary'
                className='border-border text-zinc-300 [&_svg]:text-muted-foreground'
              >
                <BanknoteIcon /> {salary}
              </Badge>
            )}

            <Badge
              variant='secondary'
              className='border-border text-zinc-300 [&_svg]:text-muted-foreground'
            >
              <ClockIcon /> {job.jobType}
            </Badge>

            {job.category && (
              <Badge variant='outline' className='border-border text-zinc-300'>
                {job.category}
              </Badge>
            )}
          </div>
        </div>

        <Button
          variant='ghost'
          size='icon'
          aria-label={`Save ${job.title}`}
          className='text-muted-foreground hover:text-foreground'
        >
          <BookmarkIcon />
        </Button>
      </div>
    </article>
  )
}

export default JobCard
