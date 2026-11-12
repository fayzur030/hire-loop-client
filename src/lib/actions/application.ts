import { ApplyJobPayload, JobApplication } from '@/types/application.types'

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
