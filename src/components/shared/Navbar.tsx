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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import NavAuth from './NavAuth'
import { authClient } from '@/lib/auth-client'

const Navbar = () => {
  const { data: session } = authClient.useSession()
  const NAV_LINKS = [
    { label: 'Browse Jobs', href: '/browse-jobs' },
    { label: 'Company', href: '/companies' },
    { label: 'Pricing', href: '/pricing' },
    {
      label: 'Dashboard',
      href: `/dashboard/${session?.user?.role || 'seeker'}`,
    },
  ]
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

            <NavAuth />
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

                  {/* Auth Buttons */}
                  <div className='mt-4 flex flex-col gap-3 border-t border-zinc-800 pt-4'>
                    <NavAuth mobile />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
