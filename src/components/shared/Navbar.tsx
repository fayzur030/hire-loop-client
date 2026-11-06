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
    <header className='p-2 sm:p-3'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl border border-black/40 bg-linear-to-b from-zinc-900 to-zinc-950 pl-6 pr-3 shadow-sm'>
        <Link href='/' aria-label='HireLoop home' className='flex items-center'>
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
          <Button className='bg-indigo-500 px-5 font-semibold text-white hover:bg-indigo-500/90'>
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
  )
}

export default Navbar
