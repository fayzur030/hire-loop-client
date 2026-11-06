import Image from 'next/image'
import Link from 'next/link'

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
  { label: 'Browse Jobs', href: '#' },
  { label: 'Company', href: '#' },
  { label: 'Pricing', href: '#' },
]

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50'>
      <header className='absolute  inset-x-0 top-0 z-30 p-3 sm:p-6'>
        <div className='mx-auto flex h-16 max-w-330 items-center justify-between rounded-2xl border border-white/5 bg-[#1E1E20] pl-6 pr-3 shadow-sm sm:h-18.5'>
          <Link
            href='/'
            aria-label='HireLoop home'
            className='flex items-center'
          >
            <Image src={Logo} alt='HireLoop' className='h-8 w-auto' priority />
          </Link>

          {/* Desktop nav */}
          <div className='ml-auto hidden items-center gap-5 md:flex'>
            <nav className='flex items-center gap-7' aria-label='Main'>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className='text-sm font-medium text-zinc-300 transition-colors hover:text-white'
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Separator orientation='vertical' className='bg-zinc-700' />
            <Link
              href='#'
              className='text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300'
            >
              Sign In
            </Link>
            <Button className='h-11 rounded-lg bg-indigo-500 px-6 text-base font-semibold text-white hover:bg-indigo-500/90'>
              Get Started
            </Button>
          </div>

          {/* Mobile nav (shadcn Sheet) */}
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
                <nav className='flex flex-col gap-1 px-4' aria-label='Mobile'>
                  {NAV_LINKS.map((link) => (
                    <SheetClose
                      key={link.label}
                      render={
                        <Link
                          href={link.href}
                          className='rounded-md px-2 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white'
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </nav>
                <SheetFooter>
                  <Button
                    variant='outline'
                    className='w-full border-zinc-700 bg-transparent font-medium text-indigo-400 hover:bg-zinc-800 hover:text-indigo-300'
                  >
                    Sign In
                  </Button>
                  <Button className='w-full bg-indigo-500 font-semibold text-white hover:bg-indigo-500/90'>
                    Get Started
                  </Button>
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
