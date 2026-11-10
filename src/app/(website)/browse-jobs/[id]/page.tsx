import {
  BanknoteIcon,
  BriefcaseBusinessIcon,
  BuildingIcon,
  ClockIcon,
  HeartPulseIcon,
  LaptopIcon,
  MapPinIcon,
  PiggyBankIcon,
  PlaneIcon,
} from 'lucide-react'
import Image from 'next/image'
import { getJobById } from '@/lib/api/jobs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import JobDetailsHeaderCard from '../_components/JobDetailsHeaderCard'

interface JobDetailsPageProps {
  params: Promise<{ id: string }>
}

/** Icons shown next to each benefit — one per benefit, looping if there are more. */
const BENEFIT_ICONS = [HeartPulseIcon, PiggyBankIcon, LaptopIcon, PlaneIcon]

/** Turns a multi-line string ("line1\nline2") into a bullet list. */
const BulletList = ({ text }: { text: string }) => (
  <ul className='mt-3 space-y-2'>
    {text
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => (
        <li key={line} className='flex gap-2 text-sm text-muted-foreground'>
          <span className='mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50' />
          {line}
        </li>
      ))}
  </ul>
)

/** One of the four small stat cards under the header. */
const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinIcon
  label: string
  value: string
}) => (
  <div className='rounded-2xl border border-border bg-card p-4'>
    <p className='flex items-center gap-1.5 text-xs uppercase text-muted-foreground'>
      <Icon className='size-3.5' />
      {label}
    </p>
    <p className='mt-1.5 font-medium'>{value}</p>
  </div>
)

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    return <div className='p-10 text-center'>Job not found</div>
  }

  const salary =
    job.minSalary && job.maxSalary
      ? `$${job.minSalary} - $${job.maxSalary}`
      : '—'

  return (
    <main className='mx-auto mt-22 w-full max-w-330 px-3 py-6 sm:px-6'>
      {/* Header */}
      <JobDetailsHeaderCard job={job} jobId={id} />
      <div className='mt-6 flex flex-col gap-6 lg:flex-row'>
        {/* Left column */}
        <div className='min-w-0 flex-1 space-y-6'>
          {/* Stat cards */}
          <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
            <InfoCard
              icon={BanknoteIcon}
              label='Salary Range'
              value={`${salary} / ${job.salaryFrequency}`}
            />
            <InfoCard
              icon={MapPinIcon}
              label='Location'
              value={job.isRemote ? `${job.location} (Remote)` : job.location}
            />
            <InfoCard icon={ClockIcon} label='Job Type' value={job.jobType} />
            <InfoCard
              icon={BriefcaseBusinessIcon}
              label='Experience'
              value={job.experience ?? 'Null'}
            />
          </div>

          {job.description && (
            <section className='rounded-2xl border border-border bg-card p-6'>
              <h2 className='font-heading text-lg font-semibold'>
                Job Description
              </h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                {job.description}
              </p>
            </section>
          )}

          {job.responsibilities && (
            <section className='rounded-2xl border border-border bg-card p-6'>
              <h2 className='font-heading text-lg font-semibold'>
                Responsibilities
              </h2>
              <BulletList text={job.responsibilities} />
            </section>
          )}

          {job.requirements && (
            <section className='rounded-2xl border border-border bg-card p-6'>
              <h2 className='font-heading text-lg font-semibold'>
                Requirements
              </h2>

              {job.skills && job.skills.length > 0 && (
                <div className='mt-3 flex flex-wrap gap-2'>
                  {job.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant='outline'
                      className='border-border text-zinc-300'
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              <BulletList text={job.requirements} />
            </section>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <section className='rounded-2xl border border-border bg-card p-6'>
              <h2 className='font-heading text-lg font-semibold'>Benefits</h2>
              <ul className='mt-3 grid gap-3 sm:grid-cols-2'>
                {job.benefits.map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length]
                  return (
                    <li
                      key={benefit}
                      className='flex items-center gap-2 text-sm text-muted-foreground'
                    >
                      <Icon className='size-4 shrink-0' />
                      {benefit}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <aside className='w-full lg:w-80 shrink-0'>
          <div className='rounded-2xl border border-border bg-card p-4'>
            <h2 className='px-1 font-heading text-lg font-semibold'>
              Company Overview
            </h2>

            <div className='mt-3 overflow-hidden rounded-xl border border-border bg-muted'>
              {job.companyImageUrl ? (
                <Image
                  src={job.companyImageUrl}
                  alt={job.companyName}
                  width={640}
                  height={360}
                  unoptimized
                  className='h-40 w-full object-cover'
                />
              ) : (
                <div className='flex h-40 items-center justify-center text-muted-foreground'>
                  <BuildingIcon className='size-8' />
                </div>
              )}
            </div>

            <dl className='mt-4 space-y-3 px-1 text-sm'>
              {job.companySize && (
                <div>
                  <dt className='text-xs uppercase text-muted-foreground'>
                    Size
                  </dt>
                  <dd className='mt-0.5 font-medium'>{job.companySize}</dd>
                </div>
              )}
              {job.companyIndustry && (
                <div>
                  <dt className='text-xs uppercase text-muted-foreground'>
                    Industry
                  </dt>
                  <dd className='mt-0.5 font-medium'>{job.companyIndustry}</dd>
                </div>
              )}
            </dl>

            {job.companyWebsite && (
              <Button
                variant='outline'
                className='mt-4 w-full'
                render={
                  <a
                    href={job.companyWebsite}
                    target='_blank'
                    rel='noreferrer'
                  />
                }
              >
                Visit Website
              </Button>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default JobDetailsPage
