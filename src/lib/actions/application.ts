import type { ApplyJobPayload } from '@/types/application.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

/** Shape of the response after a successful insert (checked with `res.insertedId`). */
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
