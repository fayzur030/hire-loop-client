'use client'

import { Button } from '@/components/ui/button'

/** The shared "Continue with Google" button shown under every auth form. */
export function GoogleButton() {
  return (
    <Button
      type='button'
      variant='outline'
      className='h-11 w-full border-border bg-transparent text-sm text-foreground hover:border-muted-foreground/50 hover:bg-foreground/[0.03] hover:text-foreground'
    >
      <svg aria-hidden='true' viewBox='0 0 24 24' className='size-4'>
        <path
          fill='#4285F4'
          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z'
        />
        <path
          fill='#34A853'
          d='M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z'
        />
        <path
          fill='#FBBC05'
          d='M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z'
        />
        <path
          fill='#EA4335'
          d='M12 4.36c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 1.09 14.97 0 12 0A11 11 0 0 0 2.15 7.05l3.69 2.84C6.71 7.29 9.14 4.36 12 4.36Z'
        />
      </svg>
      Continue with Google
    </Button>
  )
}
