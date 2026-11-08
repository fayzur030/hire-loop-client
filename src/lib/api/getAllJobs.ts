import { JobFormData } from '@/types/jobForm.type'

export const getAllJobs = async (): Promise<JobFormData[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`)
    if (!res.ok) {
      throw new Error('Failed to fetch jobs')
    }
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw error
  }
  return []
}
