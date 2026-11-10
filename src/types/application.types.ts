export type ApplicationStatus =
  | 'applied'
  | 'review'
  | 'shortlisted'
  | 'rejected'
  | 'offered'

/** Data sent when a seeker applies to a job (POST /apply-job) — matches JobDetailsHeaderCard. */
export interface ApplyJobPayload {
  jobId: string
  jobTitle: string
  companyName: string
  userId: string
  email: string
}

/** A stored application as returned by the API. */
export interface JobApplication extends ApplyJobPayload {
  _id: string
  status: ApplicationStatus
  /** ISO date string of when the seeker applied. */
  appliedAt: string
  isArchived?: boolean
  /** Extra fields shown in the "My Applications" table. */
  jobType?: string
  workMode?: string
}
