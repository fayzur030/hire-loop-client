'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { BriefcaseBusiness, Globe2, Wallet } from 'lucide-react'
import { JobFormData } from '@/types/jobForm.type'
import { createJob } from '@/lib/actions/jobs'
import { toast } from 'sonner'

type JobType = 'full-time' | 'part-time' | 'contract' | 'internship'

/** Single source of truth — extend this object when adding a new field. */
const INITIAL_FORM: JobFormData = {
  title: '',
  companyName: '',
  category: '',
  jobType: 'full-time',
  isRemote: false,
  location: '',
  deadline: '',
  minSalary: '',
  maxSalary: '',
  salaryFrequency: 'per hour',
  responsibilities: '',
  requirements: '',
}

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
]

const JOB_TYPES: JobType[] = [
  'full-time',
  'part-time',
  'contract',
  'internship',
]

const SALARY_FREQUENCIES = [
  'per hour',
  'per day',
  'per week',
  'per month',
  'per year',
]

const inputClass =
  'w-full h-11 rounded-xl border-[#27272A] bg-[#18181B] px-3.5 text-sm text-white placeholder:text-zinc-600 shadow-none transition-colors focus-visible:border-[#6366F1] focus-visible:ring-2 focus-visible:ring-[#6366F1]/20'

const selectClass =
  'h-11 w-full rounded-xl border-[#27272A] bg-[#18181B] px-3 text-sm text-white shadow-none transition-colors data-[size=default]:h-11 data-[size=default]:rounded-xl data-[size=default]:py-0 focus-visible:border-[#6366F1] focus-visible:ring-2 focus-visible:ring-[#6366F1]/20'

const labelClass = 'text-sm font-medium text-zinc-300'

export default function NewJobPage() {
  const [form, setForm] = useState<JobFormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)

  /** The only handler you need: update('title', value) */
  const update = <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  /** For plain <Input>/<Textarea>: onChange={bind('title')} */
  const bind =
    <K extends keyof JobFormData>(key: K) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, event.target.value as JobFormData[K])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const addJob = await createJob(form)
      if (addJob) {
        toast.success('Job posted successfully!')
        setForm(INITIAL_FORM)
      } else {
        toast.error('Failed to post job. Please try again.')
      }
    } catch (error) {
      console.error('Create job error:', error)
      toast.error('An error occurred while posting the job. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const charCount = (key: 'responsibilities' | 'requirements') =>
    `${form[key].length}/2000`

  return (
    <div className='flex justify-center items-center px-4 py-8 sm:px-6 lg:py-12'>
      <div className='w-full max-w-4xl lg:w-7xl'>
        {/* Header — centered */}
        <header className='mb-8 items-center text-start sm:mb-10'>
          <h1 className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>
            Post a New Job
          </h1>

          <p className='mt-3 max-w-md text-sm leading-6 text-zinc-400 sm:text-base'>
            Share the details of your opportunity and connect with qualified
            candidates.
          </p>
        </header>

        {/* Form — one centered card */}
        <form
          id='new-job-form'
          onSubmit={handleSubmit}
          className='rounded-2xl border border-[#27272A] bg-[#111113] p-5 shadow-sm sm:p-8'
        >
          <div className='space-y-8'>
            {/* ── 1. Basic Information ─────────────────────────── */}
            <fieldset className='space-y-5'>
              <legend className='flex items-center gap-2.5 pb-1 text-sm font-semibold tracking-tight text-white'>
                <span className='flex size-5 items-center justify-center rounded-md bg-[#6366F1]/15 text-[10px] font-bold text-[#818CF8]'>
                  1
                </span>
                Basic Information
              </legend>

              <div className='space-y-2'>
                <Label htmlFor='title' className={labelClass}>
                  Job title <span className='text-rose-400'>*</span>
                </Label>

                <Input
                  id='title'
                  name='title'
                  required
                  minLength={3}
                  maxLength={80}
                  value={form.title}
                  onChange={bind('title')}
                  placeholder='e.g. Senior Product Designer'
                  className={inputClass}
                />
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='companyName' className={labelClass}>
                    Company name <span className='text-rose-400'>*</span>
                  </Label>

                  <Input
                    id='companyName'
                    name='companyName'
                    required
                    value={form.companyName}
                    onChange={bind('companyName')}
                    placeholder='e.g. Acme Inc.'
                    className={`${inputClass} pl-9`}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='category' className={labelClass}>
                    Job category
                  </Label>

                  <Select
                    value={form.category}
                    onValueChange={(value) => update('category', value ?? '')}
                  >
                    <SelectTrigger id='category' className={selectClass}>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>

                    <SelectContent>
                      {JOB_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-3'>
                <Label className={labelClass}>Employment type</Label>

                <RadioGroup
                  value={form.jobType}
                  onValueChange={(value) => update('jobType', value as JobType)}
                  className='grid grid-cols-2 gap-2.5 sm:grid-cols-4'
                >
                  {JOB_TYPES.map((type) => {
                    const selected = form.jobType === type

                    return (
                      <Label
                        key={type}
                        htmlFor={`job-type-${type}`}
                        className={`flex h-10 cursor-pointer items-center justify-center rounded-lg border px-2 text-center text-xs font-medium transition-colors first-letter:uppercase ${
                          selected
                            ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#A5B4FC]'
                            : 'border-[#27272A] bg-[#18181B] text-zinc-400 hover:border-zinc-600 hover:text-white'
                        }`}
                      >
                        <RadioGroupItem
                          value={type}
                          id={`job-type-${type}`}
                          className='sr-only'
                        />

                        {type.replace('-', ' ')}
                      </Label>
                    )
                  })}
                </RadioGroup>
              </div>
            </fieldset>

            <hr className='border-[#27272A]' />

            {/* ── 2. Location & Compensation ───────────────────── */}
            <fieldset className='space-y-5'>
              <legend className='flex items-center gap-2.5 pb-1 text-sm font-semibold tracking-tight text-white'>
                <span className='flex size-5 items-center justify-center rounded-md bg-[#6366F1]/15 text-[10px] font-bold text-[#818CF8]'>
                  2
                </span>
                Location &amp; Compensation
              </legend>

              {/* Remote toggle */}
              <div className='flex items-center justify-between gap-4 rounded-xl border border-[#27272A] bg-[#18181B] px-4 py-3.5'>
                <div className='flex items-center gap-3'>
                  <Globe2 className='size-4.5 shrink-0 text-emerald-400' />

                  <div>
                    <Label
                      htmlFor='isRemote'
                      className='cursor-pointer text-sm font-medium text-white'
                    >
                      Remote work available
                    </Label>

                    <p className='text-xs text-zinc-500'>
                      Candidates can work from anywhere
                    </p>
                  </div>
                </div>

                <Switch
                  id='isRemote'
                  checked={form.isRemote}
                  onCheckedChange={(checked) => update('isRemote', checked)}
                />
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='location' className={labelClass}>
                    Job location
                    {!form.isRemote && (
                      <span className='text-rose-400'> *</span>
                    )}
                  </Label>

                  <Input
                    id='location'
                    name='location'
                    required={!form.isRemote}
                    value={form.location}
                    onChange={bind('location')}
                    placeholder='e.g. Dhaka, Bangladesh'
                    className={`${inputClass} ${form.isRemote ? 'pl-3.5' : 'pl-9'}`}
                  />

                  <p className='text-xs text-zinc-600'>
                    {form.isRemote
                      ? 'Optional for remote positions'
                      : 'Required for on-site positions'}
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='deadline' className={labelClass}>
                    Application deadline
                  </Label>

                  <Input
                    id='deadline'
                    name='deadline'
                    type='date'
                    value={form.deadline}
                    onChange={bind('deadline')}
                    className={`${inputClass} pr-3.5 text-zinc-400`}
                  />
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='minSalary' className={labelClass}>
                    Min salary
                  </Label>

                  <Input
                    id='minSalary'
                    name='minSalary'
                    type='number'
                    min={0}
                    required
                    placeholder='e.g. 25000'
                    value={form.minSalary}
                    onChange={bind('minSalary')}
                    className={inputClass}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='maxSalary' className={labelClass}>
                    Max salary
                  </Label>

                  <Input
                    id='maxSalary'
                    name='maxSalary'
                    type='number'
                    min={0}
                    required
                    placeholder='e.g. 50000'
                    value={form.maxSalary}
                    onChange={bind('maxSalary')}
                    className={inputClass}
                  />
                </div>

                <div className='space-y-2 sm:col-span-2'>
                  <Label htmlFor='salaryFrequency' className={labelClass}>
                    Frequency
                  </Label>

                  <Select
                    value={form.salaryFrequency}
                    onValueChange={(value) =>
                      update('salaryFrequency', value ?? '')
                    }
                  >
                    <SelectTrigger id='salaryFrequency' className={selectClass}>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {SALARY_FREQUENCIES.map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                          <span className='inline-flex items-center gap-2'>
                            <Wallet className='size-3.5 text-[#818CF8]' />
                            {frequency}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </fieldset>

            <hr className='border-[#27272A]' />

            {/* ── 3. Job Description ───────────────────────────── */}
            <fieldset className='space-y-5'>
              <legend className='flex items-center gap-2.5 pb-1 text-sm font-semibold tracking-tight text-white'>
                <span className='flex size-5 items-center justify-center rounded-md bg-[#6366F1]/15 text-[10px] font-bold text-[#818CF8]'>
                  3
                </span>
                Job Description
              </legend>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='responsibilities' className={labelClass}>
                    Key responsibilities{' '}
                    <span className='text-rose-400'>*</span>
                  </Label>

                  <span className='text-xs tabular-nums text-zinc-600'>
                    {charCount('responsibilities')}
                  </span>
                </div>

                <Textarea
                  id='responsibilities'
                  name='responsibilities'
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder='Describe the main responsibilities of this position...'
                  value={form.responsibilities}
                  onChange={bind('responsibilities')}
                  className='min-h-[120px] w-full resize-y rounded-xl border-[#27272A] bg-[#18181B] px-3.5 py-3 text-sm text-white placeholder:text-zinc-600 shadow-none transition-colors focus-visible:border-[#6366F1] focus-visible:ring-2 focus-visible:ring-[#6366F1]/20'
                />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='requirements' className={labelClass}>
                    Qualifications &amp; requirements{' '}
                    <span className='text-rose-400'>*</span>
                  </Label>

                  <span className='text-xs tabular-nums text-zinc-600'>
                    {charCount('requirements')}
                  </span>
                </div>

                <Textarea
                  id='requirements'
                  name='requirements'
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder={'• Required skills\n• Experience\n• Education'}
                  value={form.requirements}
                  onChange={bind('requirements')}
                  className='min-h-[120px] w-full resize-y rounded-xl border-[#27272A] bg-[#18181B] px-3.5 py-3 text-sm text-white placeholder:text-zinc-600 shadow-none transition-colors focus-visible:border-[#6366F1] focus-visible:ring-2 focus-visible:ring-[#6366F1]/20'
                />
              </div>
            </fieldset>

            {/* ── Actions ──────────────────────────────────────── */}
            <div className='flex flex-col gap-3 border-t border-[#27272A] pt-6 sm:flex-row-reverse sm:items-center'>
              <Button
                type='submit'
                disabled={submitting}
                className='h-11 flex-1 gap-2 rounded-xl bg-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6366F1]/10 transition-colors hover:bg-[#5558E8] sm:flex-none sm:px-8'
              >
                {submitting ? 'Publishing…' : 'Publish Job'}
              </Button>

              <Button
                type='button'
                variant='ghost'
                disabled={submitting}
                onClick={() => setForm(INITIAL_FORM)}
                className='h-11 flex-1 rounded-xl px-6 text-sm font-medium text-zinc-400 transition-colors hover:bg-[#18181B] hover:text-white sm:flex-none sm:px-6'
              >
                Clear form
              </Button>

              <p className='hidden flex-1 text-right text-xs text-zinc-600 sm:block'>
                Review before publishing
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
