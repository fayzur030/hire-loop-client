'use client'

import { FormEvent, useState } from 'react'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  MapPin,
  PencilLine,
} from 'lucide-react'
import { cn } from 'cn'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { JobFormData } from '@/types/jobForm.type'
import { updateJob } from '@/lib/actions/jobs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type JobType = JobFormData['jobType']

interface JobProps {
  job: JobFormData
}

export type TformData = {
  title: string
  companyName: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

const JOB_TYPES: ReadonlyArray<{ label: string; value: JobType }> = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
]

// Values intentionally match the stored category strings so job.category works as defaultValue
const JOB_CATEGORIES = [
  'Engineering & Tech',
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile App Development',
  'UI/UX Design',
  'Graphic Design',
  'Product Management',
  'Project Management',
  'Marketing',
  'Digital Marketing',
  'Sales & Business Development',
  'Human Resources',
  'Finance & Accounting',
  'Customer Support',
  'Data Science & Analytics',
  'DevOps & Infrastructure',
  'Cybersecurity',
  'Quality Assurance',
  'Content Writing',
  'Education & Training',
  'Other',
].map((label) => ({ label, value: label }))

// Values intentionally match the stored frequency strings so job.salaryFrequency works as defaultValue
const SALARY_FREQUENCIES = [
  'per Hour',
  'per Day',
  'per Week',
  'per Month',
  'per Year',
].map((label) => ({ label, value: label }))

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className='flex items-center gap-2'>
      <span
        aria-hidden
        className='size-1.5 shrink-0 rounded-full bg-[#6366F1]'
      />
      <h3 className='font-heading text-sm font-medium'>
        {index}. {title}
      </h3>
    </div>
  )
}

function RequiredMark() {
  return (
    <span aria-hidden className='font-normal text-muted-foreground'>
      *
    </span>
  )
}

const UpdateJobDialog = ({ job }: JobProps) => {
  const [jobType, setJobType] = useState<JobType>(job.jobType)
  const [remoteAllowed, setRemoteAllowed] = useState(job.isRemote)
  const deadline = job.deadline ? String(job.deadline).slice(0, 10) : ''
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleUpdateJob = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const jobData: TformData = {
      title: String(formData.get('title')),
      companyName: String(formData.get('companyName')),
      category: String(formData.get('category')),
      jobType,
      isRemote: remoteAllowed,
      location: String(formData.get('location')),
      deadline: String(formData.get('deadline')),
      minSalary: String(formData.get('minSalary')),
      maxSalary: String(formData.get('maxSalary')),
      salaryFrequency: String(formData.get('salaryFrequency')),
      responsibilities: String(formData.get('responsibilities')),
      requirements: String(formData.get('requirements')),
    }

    try {
      setLoading(true)

      const res = await updateJob(job._id!, jobData)
      console.log(res)
      if (res) {
        toast.success('Job updated successfully!')
      }
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Failed to update job!')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              variant='outline'
              type='button'
              size='sm'
              className='h-8 gap-1.5 rounded-lg bg-[#6366F1]/10 px-3 text-xs font-medium text-[#A5B4FC] transition-colors hover:bg-[#6366F1]/20 hover:text-indigo-300'
            >
              <PencilLine className='size-3.5' />
              Update
            </Button>
          }
        />
        <DialogContent className='max-h-[90dvh] gap-0 overflow-y-auto sm:max-w-xl md:max-w-2xl'>
          <form onSubmit={handleUpdateJob} className='flex min-h-0 flex-col'>
            {/* Scrollable body */}
            <div className='flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto no-scrollbar p-4 sm:p-5'>
              <DialogHeader className='items-start gap-1.5 text-left'>
                <p className='flex items-center gap-1 text-[10px] font-normal text-muted-foreground'>
                  Manage Jobs
                  <ChevronRight aria-hidden className='size-2.5' />
                  Job Listings &amp; Postings
                  <ChevronRight aria-hidden className='size-2.5' />
                  <span className='text-[#A5B4FC]'>Update Job Post</span>
                </p>
                <DialogTitle className='font-heading text-xl font-semibold'>
                  Update Job Post
                </DialogTitle>
                <DialogDescription>
                  Modify position specifications, compensation range, and
                  candidate requirements for this listing.
                </DialogDescription>
              </DialogHeader>

              {/* 1. Basic Information */}
              <section className='flex flex-col gap-4 rounded-xl border p-4 sm:p-5'>
                <SectionHeading index={1} title='Basic Information' />

                <FieldGroup className='gap-4'>
                  <Field>
                    <Label htmlFor='job-title'>
                      Job Title <RequiredMark />
                    </Label>
                    <Input
                      id='job-title'
                      name='title'
                      placeholder='e.g. Senior Frontend Developer'
                      defaultValue={job.title}
                      required
                    />
                  </Field>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <Field>
                      <Label htmlFor='company-name'>
                        Company Name <RequiredMark />
                      </Label>
                      <InputGroup>
                        <InputGroupAddon align='inline-start'>
                          <Building2 className='size-4 text-muted-foreground' />
                        </InputGroupAddon>
                        <InputGroupInput
                          id='company-name'
                          name='companyName'
                          defaultValue={job.companyName}
                          required
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <Label htmlFor='job-category'>
                        Job Category <RequiredMark />
                      </Label>
                      <Select
                        items={JOB_CATEGORIES}
                        name='category'
                        defaultValue={job.category}
                      >
                        <SelectTrigger id='job-category' className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {JOB_CATEGORIES.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Field>
                    <Label>
                      Job Type <RequiredMark />
                    </Label>
                    <div
                      role='radiogroup'
                      aria-label='Job Type'
                      className='grid grid-cols-2 gap-2 sm:grid-cols-4'
                    >
                      {JOB_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type='button'
                          role='radio'
                          aria-checked={jobType === type.value}
                          onClick={() => setJobType(type.value)}
                          className={cn(
                            'flex h-8 items-center justify-center rounded-lg border px-2 text-xs font-medium whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                            jobType === type.value
                              ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#A5B4FC]'
                              : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                </FieldGroup>
              </section>

              {/* 2. Location, Compensation & Timeline */}
              <section className='flex flex-col gap-4 rounded-xl border p-4 sm:p-5'>
                <SectionHeading
                  index={2}
                  title='Location, Compensation &amp; Timeline'
                />

                <FieldGroup className='gap-4'>
                  <div className='flex items-center justify-between gap-4 rounded-lg border p-3'>
                    <div className='flex items-start gap-2.5'>
                      <CircleCheck
                        aria-hidden
                        className='mt-0.5 size-4 shrink-0 text-[#818CF8]'
                      />
                      <div>
                        <p className='text-sm font-medium'>
                          Remote Work Allowed{' '}
                          <span className='font-normal text-muted-foreground'>
                            (US onsite)
                          </span>
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Enable if candidates can work remote.
                        </p>
                      </div>
                    </div>
                    <Switch
                      aria-label='Remote work allowed'
                      checked={remoteAllowed}
                      onCheckedChange={setRemoteAllowed}
                    />
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <Field>
                      <div className='flex items-center justify-between gap-2'>
                        <Label htmlFor='job-location'>
                          Job Location{' '}
                          <span className='font-normal text-muted-foreground'>
                            (location)
                          </span>
                        </Label>
                        <Badge
                          variant='outline'
                          className='h-4 border-[#6366F1]/40 bg-[#6366F1]/10 px-1.5 text-[10px] font-medium text-[#A5B4FC]'
                        >
                          Required
                        </Badge>
                      </div>
                      <InputGroup>
                        <InputGroupAddon align='inline-start'>
                          <MapPin className='size-4 text-muted-foreground' />
                        </InputGroupAddon>
                        <InputGroupInput
                          id='job-location'
                          name='location'
                          defaultValue={job.location}
                          required
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <Label htmlFor='application-deadline'>
                        Application Deadline{' '}
                        <span className='font-normal text-muted-foreground'>
                          (deadline)
                        </span>
                      </Label>
                      <InputGroup>
                        <InputGroupInput
                          id='application-deadline'
                          name='deadline'
                          type='date'
                          defaultValue={deadline}
                          className='[&::-webkit-calendar-picker-indicator]:hidden'
                        />
                        <InputGroupAddon align='inline-end'>
                          <CalendarDays className='pointer-events-none size-4 text-muted-foreground' />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  </div>

                  <div className='grid gap-4 sm:grid-cols-3'>
                    <Field>
                      <Label htmlFor='min-salary'>Min Salary / Rate</Label>
                      <InputGroup>
                        <InputGroupAddon align='inline-start'>
                          <InputGroupText>€</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          id='min-salary'
                          name='minSalary'
                          inputMode='numeric'
                          defaultValue={job.minSalary}
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <Label htmlFor='max-salary'>Max Salary / Rate</Label>
                      <InputGroup>
                        <InputGroupAddon align='inline-start'>
                          <InputGroupText>€</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          id='max-salary'
                          name='maxSalary'
                          inputMode='numeric'
                          defaultValue={job.maxSalary}
                        />
                      </InputGroup>
                    </Field>

                    <Field>
                      <Label htmlFor='salary-frequency'>Frequency</Label>
                      <Select
                        items={SALARY_FREQUENCIES}
                        name='salaryFrequency'
                        defaultValue={job.salaryFrequency}
                      >
                        <SelectTrigger id='salary-frequency' className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SALARY_FREQUENCIES.map((frequency) => (
                            <SelectItem
                              key={frequency.value}
                              value={frequency.value}
                            >
                              {frequency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </FieldGroup>
              </section>

              {/* 3. Responsibilities & Requirements */}
              <section className='flex flex-col gap-4 rounded-xl border p-4 sm:p-5'>
                <SectionHeading
                  index={3}
                  title='Responsibilities &amp; Requirements'
                />

                <FieldGroup className='gap-4'>
                  <Field>
                    <Label htmlFor='key-responsibilities'>
                      Key Responsibilities <RequiredMark />
                    </Label>
                    <Textarea
                      id='key-responsibilities'
                      name='responsibilities'
                      placeholder='Describe the core responsibilities...'
                      defaultValue={job.responsibilities}
                      className='min-h-24'
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor='qualifications'>
                      Qualifications &amp; Requirements <RequiredMark />
                    </Label>
                    <Textarea
                      id='qualifications'
                      name='requirements'
                      placeholder='List the qualifications and requirements...'
                      defaultValue={job.requirements}
                      className='min-h-28'
                      required
                    />
                  </Field>
                </FieldGroup>
              </section>
            </div>

            <DialogFooter className='sm:justify-start'>
              <Button
                type='submit'
                disabled={loading}
                data-icon='inline-end'
                className='gap-1.5 bg-[#6366F1] text-white hover:bg-[#5457E5] data-[icon=inline-end]:pr-2'
              >
                Update Job
                <ArrowRight data-icon='inline-end' className='size-3.5' />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateJobDialog
