import { headers } from 'next/headers'
import { auth } from '../auth'
import { redirect } from 'next/navigation'

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export const requiredRole = async (role: string) => {
  const session = await getSession()
  if (!role || session?.user.role !== role) {
    redirect('/unauthorized')
  }
  return session
}
