'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SheetClose } from '@/components/ui/sheet'
import { authClient } from '@/lib/auth-client'

type NavAuthProps = {
  mobile?: boolean
}

type UserProfile = {
  name: string
  email: string
  image?: string | null
}

// Profile Avatar
function ProfileAvatar({
  user,
  size = 'default',
}: {
  user: UserProfile
  size?: 'default' | 'sm' | 'lg'
}) {
  const initial = user.name.trim().charAt(0).toUpperCase() || '?'

  return (
    <Avatar size={size} className='ring-2 ring-indigo-400/30'>
      {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}

      <AvatarFallback className='bg-linear-to-br from-indigo-400 via-violet-500 to-fuchsia-500 font-semibold text-white'>
        {initial}
      </AvatarFallback>
    </Avatar>
  )
}

const NavAuth = ({ mobile = false }: NavAuthProps) => {
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  if (isPending) return null

  const user = session?.user

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/')
          },
        },
      })

      if (error) {
        toast.error(error.message || 'Failed to sign out. Please try again.')
        return
      }

      toast.success('You have been signed out successfully.')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  // Guest User
  if (!user) {
    // Mobile Guest
    if (mobile) {
      return (
        <div className='flex w-full flex-col gap-3'>
          <SheetClose
            render={
              <button
                type='button'
                onClick={() => router.push('/sign-in')}
                className='h-11 w-full rounded-lg px-5 text-base font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
              >
                Sign In
              </button>
            }
          />

          <SheetClose
            render={
              <button
                type='button'
                onClick={() => router.push('/sign-up')}
                className='h-11 w-full rounded-lg bg-indigo-500 px-6 text-base font-semibold text-white transition-colors hover:bg-indigo-500/90'
              >
                Get Started
              </button>
            }
          />
        </div>
      )
    }

    // Desktop Guest
    return (
      <div className='flex items-center gap-2'>
        <Button
          nativeButton={false}
          variant='ghost'
          className='h-11 rounded-lg px-5 text-base font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white'
          render={<Link href='/sign-in' />}
        >
          Sign In
        </Button>

        <Button
          nativeButton={false}
          className='h-11 rounded-lg bg-indigo-500 px-6 text-base font-semibold text-white hover:bg-indigo-500/90'
          render={<Link href='/sign-up' />}
        >
          Get Started
        </Button>
      </div>
    )
  }

  // Mobile Authenticated User
  if (mobile) {
    return (
      <div className='w-full'>
        {/* User Profile */}
        <div className='mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-900/70 p-4 shadow-lg shadow-black/10'>
          <ProfileAvatar user={user} size='lg' />

          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold text-white'>
              {user.name}
            </p>

            <p className='truncate text-xs text-zinc-400'>{user.email}</p>

            <div className='mt-2 flex items-center gap-2 text-[11px] text-zinc-500'>
              <span className='size-1.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/10' />
              Signed in
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='flex flex-col gap-1'>
          <SheetClose
            render={
              <button
                type='button'
                className='flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/70 hover:text-white'
              >
                <BadgeCheckIcon className='size-4 text-zinc-400' />
                Account
              </button>
            }
          />

          <SheetClose
            render={
              <button
                type='button'
                className='flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/70 hover:text-white'
              >
                <CreditCardIcon className='size-4 text-zinc-400' />
                Billing
              </button>
            }
          />

          <SheetClose
            render={
              <button
                type='button'
                className='flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/70 hover:text-white'
              >
                <BellIcon className='size-4 text-zinc-400' />
                Notifications
              </button>
            }
          />
        </div>

        {/* Sign Out */}
        <div className='mt-4 border-t border-zinc-800 pt-4'>
          <SheetClose
            render={
              <button
                type='button'
                onClick={handleSignOut}
                className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20 hover:text-white'
              >
                <LogOutIcon className='size-4' />
                Sign Out
              </button>
            }
          />
        </div>
      </div>
    )
  }

  // Desktop Authenticated User
  return (
    <div className='group relative'>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type='button'
              aria-label={`Open profile menu for ${user.name}`}
              className='flex size-9 items-center justify-center rounded-full outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-400'
            >
              <ProfileAvatar user={user} />
            </button>
          }
        />

        <DropdownMenuContent
          align='end'
          className='w-48 border-zinc-800 bg-zinc-950 text-zinc-200'
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className='cursor-pointer'>
              <BadgeCheckIcon />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem className='cursor-pointer'>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>

            <DropdownMenuItem className='cursor-pointer'>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className='bg-zinc-800' />

          <DropdownMenuItem
            onClick={handleSignOut}
            className='cursor-pointer text-red-300 focus:text-red-200'
          >
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Hover Card */}
      <div className='invisible absolute right-0 top-full z-[60] w-72 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'>
        <div className='flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl'>
          <ProfileAvatar user={user} size='lg' />

          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold text-white'>
              {user.name}
            </p>

            <p className='truncate text-xs text-zinc-400'>{user.email}</p>

            <div className='mt-2 flex items-center gap-2 text-[11px] text-zinc-500'>
              <span className='size-1.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/10' />
              Signed in
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavAuth
