import {
  AppliedJobsCountResponse,
  ApplyJobPayload,
  ApplicationStatus,
  JobApplication,
  UpdateApplicationStatusPayload,
} from '@/types/application.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface ApplyJobResponse {
  insertedId?: string
}

export const applyAJob = async (
  jobsApplicationData: ApplyJobPayload
): Promise<ApplyJobResponse> => {
  const res = await fetch(`${BASE_URL}/apply-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobsApplicationData),
  })
  if (!res.ok) {
    throw new Error('Failed to create job')
  }
  const data: { data: ApplyJobResponse } = await res.json()
  return data.data
}

// Get all job applications
export const getApplications = async (
  query = ''
): Promise<JobApplication[]> => {
  try {
    const res = await fetch(`${BASE_URL}/applications?${query}`)

    if (!res.ok) {
      throw new Error('Failed to fetch applications')
    }

    const data: { data: JobApplication[] } = await res.json()

    return data.data
  } catch (error) {
    console.error('Error fetching applications:', error)
    throw error
  }
}

/**
 * Get every application submitted for a single job.
 * Used by the recruiter "view applications" screen.
 */
export const getApplicationsByJob = async (
  jobId: string
): Promise<JobApplication[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/applications?jobId=${encodeURIComponent(jobId)}`
    )

    if (!res.ok) {
      throw new Error('Failed to fetch applications for this job')
    }

    const data: { data: JobApplication[] } = await res.json()

    return data.data ?? []
  } catch (error) {
    console.error('Error fetching applications for job:', error)
    throw error
  }
}

export const getApplicationsCount = async (
  query = ''
): Promise<AppliedJobsCountResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/applications/count?${query}`)

    if (!res.ok) {
      throw new Error('Failed to fetch applications count')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching applications count:', error)
    throw error
  }
}

/**
 * Move an application to a new pipeline status.
 *
 * NOTE: the persistence endpoint is not implemented on the API yet. The call
 * below targets `PATCH /applications/:id/status` with a `{ status }` body —
 * update the URL (or the method) here once the backend route lands, no other
 * file has to change.
 */
export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<JobApplication | null> => {
  const payload: UpdateApplicationStatusPayload = { status }

  const res = await fetch(
    `${BASE_URL}/applications/${encodeURIComponent(applicationId)}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  const data: { success?: boolean; message?: string; data?: JobApplication } =
    await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Failed to update application status')
  }

  return data.data ?? null
}
