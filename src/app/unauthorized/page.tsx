import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Logo from '@/images/logo.png'
import { ArrowLeftIcon, ArrowRightIcon, LockKeyholeIcon } from 'lucide-react'

import { SignOutButton } from './_components/SignOutButton'

const UnauthorizedPage = () => {
  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-10 text-zinc-100'>
      {/* Soft glow behind the card */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)]' />

      <div className='relative w-full max-w-md'>
        {/* Logo */}
        <div className='flex justify-center'>
          <Link href='/' aria-label='HireLoop home' className='flex items-center'>
            <Image src={Logo} alt='HireLoop' className='h-9 w-auto' priority />
          </Link>
        </div>

        {/* Card */}
        <section className='mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-8 text-center shadow-2xl shadow-black/40 sm:px-8'>
          {/* Icon */}
          <div className='flex justify-center'>
            <span className='flex size-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10'>
              <LockKeyholeIcon className='size-7 text-red-400' />
            </span>
          </div>

          {/* Badge */}
          <span className='mt-6 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-red-400 uppercase'>
            403 · Access denied
          </span>

          {/* Heading */}
          <h1 className='mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl'>
            This page is not for your role
          </h1>

          {/* Description */}
          <p className='mt-4 text-sm leading-6 text-zinc-400'>
            Your account doesn&apos;t have the permission needed to open this
            area. Switch to an account with access, or ask an admin to update
            your role.
          </p>

          {/* Actions */}
          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <Button
              nativeButton={false}
              variant='outline'
              render={<Link href='/' />}
              className='h-11 flex-1 gap-2 rounded-xl border-zinc-800 bg-zinc-800/40 px-5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white'
            >
              <ArrowLeftIcon className='size-4' />
              Back to home
            </Button>

            <Button
              nativeButton={false}
              render={<Link href='/dashboard' />}
              className='h-11 flex-1 gap-2 rounded-xl bg-indigo-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500/90'
            >
              Go to dashboard
              <ArrowRightIcon className='size-4' />
            </Button>
          </div>

          {/* Sign out hint */}
          <div className='mt-8 border-t border-zinc-800 pt-6'>
            <p className='text-xs text-zinc-500'>
              Signed in with the wrong account? <SignOutButton />
            </p>
          </div>
        </section>

        {/* Footer note */}
        <p className='mt-6 text-center text-xs text-zinc-600'>
          Error 403 · Unauthorized access
        </p>
      </div>
    </main>
  )
}

export default UnauthorizedPage
