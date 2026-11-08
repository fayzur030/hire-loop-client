import { JobFormData } from '@/types/jobForm.type'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

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
  const data = await res.json()
  return data.data
}
