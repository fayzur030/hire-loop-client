const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export const applyAJob = async (jobsApplicationData) => {
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
  const data = await res.json()
  return data.data
}
