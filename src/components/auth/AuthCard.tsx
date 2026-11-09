'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import Logo from '@/images/logo.png'
import { GoogleButton } from './GoogleButton'

interface AuthCardProps {
  title: string
  subtitle: string
  maxWidth: string
  children: ReactNode
  footerText: string
  footerLinkHref: string
  footerLinkText: string
}

/**
 * Shared shell for the sign-in and sign-up pages: the logo, the card with
 * heading and form, the "OR" divider, the Google button, and the footer link.
 */
export function AuthCard({
  title,
  subtitle,
  maxWidth,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthCardProps) {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground sm:px-6'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_45%)]' />

      <main className={`relative w-full ${maxWidth}`}>
        <div className='mb-6 flex justify-center'>
          <Link href='/' aria-label='HireLoop home'>
            <Image src={Logo} alt='HireLoop' priority className='h-9 w-auto' />
          </Link>
        </div>

        <section className='rounded-2xl border border-border bg-card/95 p-5 shadow-2xl shadow-black/45 sm:p-8'>
          <header className='mb-7 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-[28px]'>
              {title}
            </h1>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              {subtitle}
            </p>
          </header>

          {children}

          <div className='my-5 flex items-center gap-3' aria-hidden='true'>
            <div className='h-px flex-1 bg-border' />
            <span className='text-[10px] font-medium tracking-[0.12em] text-muted-foreground'>
              OR
            </span>
            <div className='h-px flex-1 bg-border' />
          </div>

          <GoogleButton />

          <p className='mt-6 text-center text-sm text-muted-foreground'>
            {footerText}{' '}
            <Link
              href={footerLinkHref}
              className='font-medium text-primary transition-colors hover:text-primary/80'
            >
              {footerLinkText}
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}
