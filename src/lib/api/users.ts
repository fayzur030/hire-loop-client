const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export const getUserPremiumById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  if (!res.ok) {
    throw new Error('Failed to fetch premium user')
  }
  return res.json()
}
