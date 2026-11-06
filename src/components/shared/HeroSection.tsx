import Image from 'next/image'
import Link from 'next/link'

import { MapPin, Search } from 'lucide-react'
import GlobeImg from '@/images/globe.png'

import { Badge } from '@/components/ui/badge'

const TRENDING_POSITIONS = [
  { label: 'Product Designer', href: '#' },
  { label: 'AI Engineering', href: '#' },
  { label: 'Dev-ops Engineer', href: '#' },
]

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden bg-zinc-950 text-white'>
      {/* Hero content */}
      <div className='relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-12 text-center sm:pt-16'>
        <Badge
          variant='outline'
          className='h-8 gap-2 rounded-full border-zinc-800 bg-zinc-900 px-4 text-xs text-zinc-400'
        >
          <span aria-hidden>🔥</span>
          <span className='font-semibold text-orange-500'>50,000+</span>
          <span className='tracking-wider uppercase'>New jobs this month</span>
        </Badge>

        <h1 className='font-heading mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
          Find Your Dream Job Today
        </h1>

        <p className='mt-4 max-w-md text-sm text-zinc-400 sm:text-base'>
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role &mdash;
          faster!
        </p>

        {/* Search bar */}
        {/* <div
          role='search'
          className='mt-8 flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-2 shadow-xl sm:flex-row sm:items-center sm:gap-1'
        >
          <div className='relative flex-1'>
            <SearchIcon className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500' />
            <Input
              type='search'
              aria-label='Job title, skills or company'
              placeholder='Job title, skills or company'
              className='h-10 rounded-xl border-0 bg-transparent pl-9 sm:h-11'
            />
          </div>
          <div className='relative flex-1 sm:max-w-[200px]'>
            <MapPinIcon className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500' />
            <Input
              type='text'
              aria-label='Location or Remote'
              placeholder='Location or Remote'
              className='h-10 rounded-xl border-0 bg-transparent pl-9 sm:h-11'
            />
          </div>
          <Button
            aria-label='Search jobs'
            className='h-10 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 sm:h-11 sm:w-11 sm:shrink-0'
          >
            <SearchIcon />
          </Button>
        </div> */}
        <form
          role='search'
          className='mt-4 flex h-6.75 w-[min(540px,calc(100vw-40px))] items-center rounded-lg border border-white/15 bg-[#111113]/90 p-0.75 shadow-[0_0_22px_rgba(0,0,0,0.3)] sm:h-12 sm:w-[54vw] sm:max-w-135 sm:p-1'
        >
          <label className='flex min-w-0 flex-1 items-center gap-1.5 px-1.5 sm:gap-2.5 sm:px-2.5'>
            <Search className='size-2.5 shrink-0 text-zinc-400 sm:size-4' />
            <span className='sr-only'>Job title, skill or company</span>
            <input
              type='search'
              placeholder='Job title, skill or company'
              className='w-full min-w-0 bg-transparent text-[7px] text-white outline-none placeholder:text-zinc-400 sm:text-xs'
            />
          </label>
          <div className='h-3.5 w-px bg-white/15 sm:h-6' />
          <label className='flex min-w-0 flex-1 items-center gap-1 px-2 sm:gap-2 sm:px-3'>
            <MapPin className='size-2.5 shrink-0 text-zinc-400 sm:size-4' />
            <span className='sr-only'>Location</span>
            <input
              type='text'
              placeholder='Location or Remote'
              className='w-full min-w-0 bg-transparent text-[7px] text-white outline-none placeholder:text-zinc-400 sm:text-xs'
            />
          </label>
          <button
            type='submit'
            aria-label='Search jobs'
            className='flex size-5 shrink-0 items-center justify-center rounded-md bg-indigo-500 transition-colors hover:bg-indigo-400 sm:size-9'
          >
            <Search className='size-3 text-white sm:size-4' />
          </button>
        </form>

        {/* Trending positions */}
        <div className='mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500'>
          <span>Trending Position:</span>
          {TRENDING_POSITIONS.map((position) => (
            <Badge
              key={position.label}
              variant='outline'
              render={<Link href={position.href} />}
              className='rounded-lg border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60'
            >
              {position.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Globe artwork */}
      <div className='relative '>
        <Image
          src={GlobeImg}
          alt=''
          aria-hidden
          className='h-72 w-full object-cover  sm:h-115 lg:h-140'
        />
        {/* Blends the artwork's white background into the dark section */}
        {/* <div className='pointer-events-none absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950/60 to-transparent to-60%' /> */}

        <p className='absolute inset-x-0 top-[56%] mx-auto max-w-md px-4 text-center font-heading text-xl font-medium text-white sm:text-2xl'>
          Assisting over 15,000 job seekers find their dream positions.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
