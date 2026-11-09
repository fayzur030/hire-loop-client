import type { Job, JobFormData, UpdateJobPayload } from '@/types/job.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

/** Shape of every API response body used by the job endpoints. */
interface ApiResponse<T> {
  data: T
  message?: string
}

export const getAllJobs = async (query = ''): Promise<Job[]> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    if (!res.ok) {
      throw new Error('Failed to fetch jobs')
    }
    const data: ApiResponse<Job[]> = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw error
  }
}

export const createJob = async (form: JobFormData) => {
  const res = await fetch(`${BASE_URL}/add-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
  if (!res.ok) {
    throw new Error('Failed to create job')
  }
  const data: ApiResponse<Job> = await res.json()
  return data.data
}

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: 'DELETE',
  })

  // The body is parsed before the ok-check to preserve the original behavior.
  const data: ApiResponse<unknown> = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete job')
  }

  return data.data
}

export const updateJob = async (jobId: string, jobData: UpdateJobPayload) => {
  try {
    const res = await fetch(`${BASE_URL}/update-jobs/${jobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    })

    if (!res.ok) {
      throw new Error('Failed to update job')
    }

    const data: ApiResponse<Job> = await res.json()
    return data.data
  } catch (error) {
    console.error('Update job error:', error)
    throw error
  }
}
