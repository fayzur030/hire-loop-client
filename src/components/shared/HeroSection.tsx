import Image from 'next/image'
import Link from 'next/link'

import {
  Building2,
  Briefcase,
  MapPin,
  Search,
  Sparkles,
  UserSearch,
} from 'lucide-react'
import GlobeImg from '@/images/globe.png'

import { Badge } from '@/components/ui/badge'

const TRENDING_POSITIONS = [
  { label: 'Product Designer', href: '#' },
  { label: 'AI Engineering', href: '#' },
  { label: 'Dev-ops Engineer', href: '#' },
]

const STATS = [
  { icon: Briefcase, value: '50K', label: 'Active Jobs' },
  { icon: Building2, value: '12K', label: 'Companies' },
  { icon: UserSearch, value: '2M', label: 'Job Seekers' },
  { icon: Sparkles, value: '97%', label: 'Satisfaction Rate' },
]

const HeroSection = () => {
  return (
    <section className='relative flex min-h-204 flex-1 flex-col overflow-hidden bg-black text-white sm:min-h-214 lg:min-h-284'>
      {/* Globe artwork: wrapper is pushed down, section is taller by the same amount */}

      <div className='absolute inset-x-0 top-24 bottom-0 mask-[linear-gradient(to_bottom,transparent_0%,black_45%)] lg:top-64'>
        <Image
          src={GlobeImg}
          alt=''
          aria-hidden
          fill
          priority
          sizes='100vw'
          className='object-cover object-[50%_32%]'
        />

        {/* Hide the red/purple glow in the top corners of the artwork */}
        <div className='pointer-events-none absolute top-0 left-0 h-130 w-1/3 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,1)_0%,rgba(0,0,0,0.9)_40%,transparent_75%)]' />
        <div className='pointer-events-none absolute top-0 right-0 h-130 w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.9)_40%,transparent_75%)]' />
      </div>

      {/* Gray to black fade at the top (sits behind the navbar), hides the purple corner glow */}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-105 bg-linear-to-b from-[#2A2A2C] via-black via-45% to-transparent' />

      {/* Hero content */}
      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-32 text-center sm:pt-48 lg:pt-60'>
        {/* Badge with side lines */}
        <div className='flex w-full items-center justify-center'>
          <span className='hidden h-px w-24 bg-linear-to-r from-transparent to-indigo-500/40 md:block' />
          <Badge
            variant='outline'
            className='h-11 gap-2.5 rounded-full border-zinc-800 bg-zinc-950/80 px-6 font-mono text-sm text-zinc-500 backdrop-blur-xs sm:text-base'
          >
            <span aria-hidden>💼</span>
            <span className='font-bold text-white'>50,000+</span>
            <span className='uppercase'>New jobs this month</span>
          </Badge>
          <span className='hidden h-px w-24 bg-linear-to-l from-transparent to-indigo-500/40 md:block' />
        </div>

        <h1 className='font-heading mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl'>
          Find Your Dream Job Today
        </h1>

        <p className='mt-5 max-w-2xl text-base text-zinc-400 sm:text-lg'>
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role &mdash;
          faster.
        </p>

        {/* Search bar */}
        <form
          role='search'
          className='mt-10 flex h-14 w-full max-w-196 items-center rounded-xl border border-white/15 bg-[#111113]/90 p-1.5 sm:h-16'
        >
          <label className='flex min-w-0 flex-1 items-center gap-3 px-3'>
            <Search className='size-5 shrink-0 text-zinc-300' />
            <span className='sr-only'>Job title, skill or company</span>
            <input
              type='search'
              placeholder='Job title, skill or company'
              className='w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-400 sm:text-base'
            />
          </label>
          <div className='h-6 w-px bg-white/15' />
          <label className='flex min-w-0 flex-1 items-center gap-3 px-4'>
            <MapPin className='size-5 shrink-0 text-zinc-300' />
            <span className='sr-only'>Location</span>
            <input
              type='text'
              placeholder='Location or Remote'
              className='w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-400 sm:text-base'
            />
          </label>
          <button
            type='submit'
            aria-label='Search jobs'
            className='flex size-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500 transition-colors hover:bg-indigo-400 sm:size-12'
          >
            <Search className='size-5 text-white' />
          </button>
        </form>

        {/* Trending positions */}
        <div className='mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm text-zinc-400'>
          <span>Trending Position</span>
          {TRENDING_POSITIONS.map((position) => (
            <Badge
              key={position.label}
              variant='outline'
              render={<Link href={position.href} />}
              className='h-8 rounded-full border-zinc-800 bg-zinc-900/60 px-4 text-sm font-medium text-zinc-200 backdrop-blur-xs hover:border-zinc-700 hover:bg-zinc-800/60'
            >
              {position.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bottom: text over globe + stats cards */}
      <div className='relative z-10 mx-auto mt-auto w-full max-w-7xl px-4 pt-16 pb-6 sm:px-6'>
        <p className='mx-auto max-w-md text-center font-heading text-xl font-medium text-zinc-300 sm:text-2xl'>
          Assisting over{' '}
          <span className='font-semibold text-white'>15,000 job seekers</span>{' '}
          find their dream positions.
        </p>

        <div className='mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4'>
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className='flex min-h-36 flex-col justify-between rounded-xl border border-white/10 bg-linear-to-b from-zinc-900/80 to-black/90 p-5 backdrop-blur-sm'
            >
              <Icon className='size-4 text-zinc-300' aria-hidden />
              <div>
                <p className='text-4xl font-semibold tracking-tight text-white'>
                  {value}
                </p>
                <p className='mt-1 text-sm text-zinc-300'>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
