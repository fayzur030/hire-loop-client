import type { JobType } from '@/types/job.types'

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

/** Employment types as stored on a job. */
export const JOB_TYPES: JobType[] = [
  'full-time',
  'part-time',
  'contract',
  'internship',
]

/** Job types shaped for select-style pickers (label shown to the user). */
export const JOB_TYPE_OPTIONS = JOB_TYPES.map((value) => ({
  label: capitalize(value),
  value,
}))

/** Categories match the exact strings stored on a job. */
export const JOB_CATEGORIES = [
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

/** Salary frequencies written by the "Add job" form. */
export const SALARY_FREQUENCIES = [
  'per hour',
  'per day',
  'per week',
  'per month',
  'per year',
]
