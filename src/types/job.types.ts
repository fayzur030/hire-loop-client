export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship'

/** The job data collected by the "Add job" form and sent to the API. */
export interface JobFormData {
  _id?: string
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

  /** Extra fields shown on the job details page (optional until the backend sends them). */
  description?: string
  skills?: string[]
  benefits?: string[]
  isVerified?: boolean
  experience?: string
  companyImageUrl?: string
  companySize?: string
  companyIndustry?: string
  companyWebsite?: string
}

/** A stored job as returned by the API — always has an `_id`. */
export interface Job extends JobFormData {
  _id: string
}

/** Fields sent when updating an existing job (the `_id` goes in the URL). */
export type UpdateJobPayload = Omit<JobFormData, '_id'>
