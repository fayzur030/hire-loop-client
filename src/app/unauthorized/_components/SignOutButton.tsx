'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'

/**
 * Signs the current user out and sends them back to the sign in page.
 * Used by the unauthorized screen when the wrong account is signed in.
 */
export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push('/sign-in'),
        },
      })

      if (error) {
        toast.error(error.message || 'Failed to sign out. Please try again.')
      }
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <button
      type='button'
      onClick={handleSignOut}
      className='font-medium text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline'
    >
      Sign out
    </button>
  )
}
