import type { Job } from '@/types/job.types'
import type { FilterOption } from './FilterCheckboxGroup'

/** Filter options based on common fields of the `JobFormData` type. */
export const JOB_TYPE_OPTIONS: FilterOption[] = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
]

export const WORK_TYPE_OPTIONS: FilterOption[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'on-site', label: 'On-site' },
]

/** Unique categories found in the given jobs, each with its job count. */
export const buildCategoryOptions = (jobs: Job[]): FilterOption[] => {
  const counts = new Map<string, number>()

  for (const job of jobs) {
    if (!job.category) continue
    counts.set(job.category, (counts.get(job.category) ?? 0) + 1)
  }

  return [...counts].map(([category, count]) => ({
    value: category,
    label: category,
    count,
  }))
}
