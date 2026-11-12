'use client'

import { useState } from 'react'
import Link from 'next/link'

import {
  ArrowLeftIcon,
  BriefcaseBusinessIcon,
  CheckIcon,
  LockIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import type { CheckoutCountry, CheckoutCurrency } from '@/types/checkout.types'

import { Flag } from './Flag'

const FIELD_CLASS =
  'h-11 rounded-lg border-zinc-800 bg-zinc-900 text-sm text-white placeholder:text-zinc-600 transition-colors focus-visible:border-indigo-500 focus-visible:ring-indigo-500/25 dark:bg-zinc-900'

const PLAN_FEATURES = [
  'Unlimited job applications',
  'Priority listing for your profile',
  'Advanced search filters',
  'Instant job alerts',
]

interface CheckoutFormProps {
  planName: string
  planDescription: string
  exchangeRate: string
  currencies: CheckoutCurrency[]
  countries?: CheckoutCountry[]
}

export function CheckoutForm({
  planName,
  planDescription,
  exchangeRate,
  currencies,
}: CheckoutFormProps) {
  const [currency, setCurrency] = useState<string>(currencies[0]?.code ?? '')

  const selectedCurrency = currencies.find((item) => item.code === currency)

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100'>
      <div className='mx-auto w-full max-w-[1080px] px-5 py-6 sm:px-8 lg:py-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Link
              href='/'
              aria-label='Back to HireLoop'
              className='flex size-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white'
            >
              <ArrowLeftIcon className='size-4' />
            </Link>

            <Link href='/' className='flex items-center gap-2'>
              <span className='flex size-7 items-center justify-center rounded-lg bg-indigo-600'>
                <BriefcaseBusinessIcon className='size-4 text-white' />
              </span>
              <span className='text-sm font-semibold tracking-tight text-white'>
                HireLoop
              </span>
            </Link>
          </div>

          <span className='flex h-6 items-center rounded-md border border-zinc-800 bg-zinc-900 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500'>
            Test mode
          </span>
        </div>

        {/* Body */}
        <div className='mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14'>
          {/* Left: currency + order summary */}
          <section>
            <h2 className='text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500'>
              Choose a currency
            </h2>

            <RadioGroup
              value={currency}
              onValueChange={(value) => setCurrency(String(value))}
              className='mt-4 grid grid-cols-2 gap-3'
            >
              {currencies.map((item) => {
                const active = currency === item.code

                return (
                  <Label
                    key={item.code}
                    htmlFor={`currency-${item.code}`}
                    className={`flex h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm transition-colors ${
                      active
                        ? 'border-indigo-500 bg-indigo-500/10 text-white'
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    <RadioGroupItem
                      value={item.code}
                      id={`currency-${item.code}`}
                      className='sr-only'
                    />

                    <Flag code={item.flag} />

                    <span className='font-medium'>{item.price}</span>
                  </Label>
                )
              })}
            </RadioGroup>

            <p className='mt-3 text-[11px] text-zinc-600'>{exchangeRate}</p>

            <div className='mt-8 h-px w-full bg-zinc-800' />

            <div className='mt-6 flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold text-white'>{planName}</p>
                <p className='mt-1 text-xs text-zinc-500'>{planDescription}</p>
              </div>

              <p className='text-sm font-semibold text-white'>
                {selectedCurrency?.price ?? ''}
              </p>
            </div>

            <ul className='mt-6 space-y-2.5'>
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className='flex items-center gap-2.5 text-sm text-zinc-400'
                >
                  <span className='flex size-4 items-center justify-center rounded-full bg-indigo-500/15'>
                    <CheckIcon className='size-3 text-indigo-400' />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Right: email + checkout */}
          <section>
            <form action='/api/checkout_sessions' method='POST'>
              <input type='hidden' name='currency' value={currency} />

              <h2 className='text-sm font-semibold text-white'>
                Contact information
              </h2>

              <div className='mt-3'>
                <Label htmlFor='email' className='text-xs text-zinc-500'>
                  Email
                </Label>

                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  placeholder='you@example.com'
                  className={`${FIELD_CLASS} mt-2`}
                />
              </div>

              <Button
                type='submit'
                className='mt-5 h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-500'
              >
                Continue to payment
              </Button>

              <p className='mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500'>
                <LockIcon className='size-3' />
                You&apos;ll enter your card details on Stripe&apos;s secure
                page.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
