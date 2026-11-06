'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { MenuIcon } from 'lucide-react'
import Logo from '@/images/logo.png'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const NAV_LINKS = [
  { label: 'Browse Jobs', href: '/jobs' },
  { label: 'Company', href: '/companies' },
  { label: 'Pricing', href: '/pricing' },
]

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='sticky top-0 z-50'>
      <header className='absolute inset-x-0 top-0 z-30 p-3 sm:p-6'>
        <div className='mx-auto flex h-16 max-w-330 items-center justify-between rounded-2xl border border-white/5 bg-[#1E1E20] pl-6 pr-3 shadow-sm sm:h-18.5'>
          {/* Logo */}
          <Link
            href='/'
            aria-label='HireLoop home'
            className='flex items-center'
          >
            <Image src={Logo} alt='HireLoop' className='h-8 w-auto' priority />
          </Link>

          {/* Desktop Navigation */}
          <div className='ml-auto hidden items-center gap-5 md:flex'>
            <nav className='flex items-center gap-7' aria-label='Main'>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-400'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <Separator orientation='vertical' className='bg-zinc-700' />

            <Link href='/sign-in'>
              <Button
                variant='ghost'
                className={`h-11 rounded-lg px-5 text-base font-semibold ${
                  pathname === '/sign-in'
                    ? 'text-indigo-400'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                Sign In
              </Button>
            </Link>

            <Link href='/sign-up'>
              <Button
                className={`h-11 rounded-lg px-6 text-base font-semibold text-white ${
                  pathname === '/sign-up'
                    ? 'bg-indigo-600'
                    : 'bg-indigo-500 hover:bg-indigo-500/90'
                }`}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className='flex items-center md:hidden'>
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant='ghost'
                    size='icon-sm'
                    className='text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  />
                }
              >
                <MenuIcon />
                <span className='sr-only'>Open menu</span>
              </SheetTrigger>

              <SheetContent
                side='right'
                className='w-72 border-zinc-800 bg-zinc-950 text-zinc-300'
              >
                <SheetHeader>
                  <SheetTitle render={<span className='flex items-center' />}>
                    <Image src={Logo} alt='HireLoop' className='h-8 w-auto' />
                  </SheetTitle>

                  <SheetDescription className='sr-only'>
                    Site navigation
                  </SheetDescription>
                </SheetHeader>

                {/* Mobile Links */}
                <nav className='flex flex-col gap-1 px-4' aria-label='Mobile'>
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href

                    return (
                      <SheetClose
                        key={link.label}
                        render={
                          <button
                            type='button'
                            onClick={() => router.push(link.href)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`w-full rounded-md px-3 py-3 text-left text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-indigo-500/10 text-indigo-400'
                                : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                            }`}
                          >
                            {link.label}
                          </button>
                        }
                      />
                    )
                  })}
                </nav>

                {/* Mobile Buttons */}
                <SheetFooter className='flex flex-col gap-3'>
                  <SheetClose
                    render={
                      <button
                        type='button'
                        onClick={() => router.push('/sign-in')}
                        className={`h-11 w-full rounded-lg border border-zinc-700 bg-transparent text-sm font-medium transition-colors hover:bg-zinc-800 ${
                          pathname === '/sign-in'
                            ? 'border-indigo-500 text-indigo-400'
                            : 'text-zinc-300 hover:text-white'
                        }`}
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
                        className={`h-11 w-full rounded-lg text-sm font-semibold text-white transition-colors ${
                          pathname === '/sign-up'
                            ? 'bg-indigo-600'
                            : 'bg-indigo-500 hover:bg-indigo-500/90'
                        }`}
                      >
                        Get Started
                      </button>
                    }
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
