'use client'

import { useState } from 'react'

import {
  ArrowLeftIcon,
  CircleHelpIcon,
  CreditCardIcon,
  Link2Icon,
  LockIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { CheckoutCountry, CheckoutCurrency } from '@/types/checkout.types'

import { Flag } from './Flag'

const FIELD_CLASS =
  'h-11 rounded-lg border-[#2A2A2E] bg-[#18181B] text-sm text-white placeholder:text-zinc-600 transition-colors focus-visible:border-[#0A6FF5] focus-visible:ring-[#0A6FF5]/25 dark:bg-[#18181B]'

const SELECT_CLASS =
  'h-11 w-full rounded-lg border-[#2A2A2E] bg-[#18181B] px-3 text-sm text-white transition-colors focus-visible:border-[#0A6FF5] focus-visible:ring-[#0A6FF5]/25 data-[size=default]:h-11 dark:bg-[#18181B]'

interface CheckoutFormProps {
  planName: string
  planDescription: string
  exchangeRate: string
  currencies: CheckoutCurrency[]
  countries: CheckoutCountry[]
}

/** Tiny card-brand marks shown inside the card number field. */
function CardBrands() {
  return (
    <div className='flex items-center gap-1'>
      <span className='flex h-5 items-center rounded-[3px] bg-[#1A1F71] px-1 text-[8px] font-bold italic tracking-tight text-white'>
        VISA
      </span>

      <span className='flex h-5 items-center justify-center rounded-[3px] bg-[#161616]'>
        <svg viewBox='0 0 24 24' className='h-3.5 w-5' aria-hidden='true'>
          <circle cx='9' cy='12' r='6' fill='#EB001B' />
          <circle cx='15' cy='12' r='6' fill='#F79E1B' fillOpacity='0.85' />
        </svg>
      </span>

      <span className='flex h-5 items-center rounded-[3px] bg-[#016FD0] px-1 text-[8px] font-bold tracking-tight text-white'>
        AMEX
      </span>
    </div>
  )
}

/**
 * The interactive half of the checkout page.
 *
 * This is a Client Component because it owns the currency and country
 * selections. The page itself stays an async Server Component and passes the
 * plan data down as props.
 */
export function CheckoutForm({
  planName,
  planDescription,
  exchangeRate,
  currencies,
  countries,
}: CheckoutFormProps) {
  const [currency, setCurrency] = useState(currencies[0]?.code ?? '')
  const [country, setCountry] = useState(countries[0]?.code ?? '')

  const selectedCurrency = currencies.find((item) => item.code === currency)

  return (
    <div className='min-h-screen bg-[#0A0A0B] text-zinc-100'>
      <div className='mx-auto w-full max-w-[1080px] px-5 py-6 sm:px-8 lg:py-8'>
        {/* ── Header ─────────────────────────────────────────── */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              aria-label='Go back'
              className='text-zinc-400 hover:bg-white/5 hover:text-white'
            >
              <ArrowLeftIcon />
            </Button>

            <LockIcon className='size-3.5 text-zinc-600' />
          </div>

          <span className='flex h-6 items-center rounded-md border border-[#2A2A2E] bg-[#18181B] px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500'>
            Sandbox
          </span>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className='mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14'>
          {/* ── Left: currency + order summary ──────────────── */}
          <section>
            <h2 className='text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500'>
              Choose a currency:
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
                        ? 'border-white bg-[#141416] text-white'
                        : 'border-[#2A2A2E] bg-[#0E0E10] text-zinc-400 hover:border-zinc-600 hover:text-white'
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

            <div className='mt-8 h-px w-full bg-[#2A2A2E]' />

            <div className='mt-6 flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold text-white'>{planName}</p>
                <p className='mt-1 text-xs text-zinc-500'>{planDescription}</p>
              </div>

              <p className='text-sm font-semibold text-white'>
                {selectedCurrency?.price ?? ''}
              </p>
            </div>
          </section>

          {/* ── Right: checkout form ─────────────────────────── */}
          <section>
            {/* Link wallet option */}
            <button
              type='button'
              className='flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#00C853] transition-colors hover:bg-[#0AD566]'
            >
              <Link2Icon className='size-4 text-[#08110B]' />

              <span className='text-sm font-bold tracking-tight text-[#08110B]'>
                link
              </span>

              <span className='ml-1 rounded bg-white px-1.5 py-0.5 text-[9px] font-bold italic text-[#1A1F71]'>
                VISA
              </span>

              <span className='text-sm font-semibold text-white/90'>4242</span>
            </button>

            {/* OR divider */}
            <div className='my-6 flex items-center gap-4'>
              <span className='h-px flex-1 bg-[#2A2A2E]' />

              <span className='text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600'>
                or
              </span>

              <span className='h-px flex-1 bg-[#2A2A2E]' />
            </div>

            <form onSubmit={(event) => event.preventDefault()}>
              {/* Contact information */}
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
                  autoComplete='email'
                  placeholder='email@example.com'
                  className={`${FIELD_CLASS} mt-2`}
                />
              </div>

              {/* Payment method */}
              <h2 className='mt-7 text-sm font-semibold text-white'>
                Payment method
              </h2>

              <div className='mt-3 rounded-xl border border-[#2A2A2E] bg-[#1A1A1D] p-1.5'>
                <div className='flex items-center gap-2.5 px-2.5 py-2'>
                  <CreditCardIcon className='size-4 text-zinc-300' />

                  <span className='text-sm font-medium text-white'>Card</span>
                </div>

                <div className='space-y-4 rounded-lg border border-[#2A2A2E] bg-[#131316] p-4'>
                  {/* Card information */}
                  <Label className='text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500'>
                    Card information
                  </Label>

                  <InputGroup className='h-11 rounded-lg border-[#2A2A2E] bg-[#18181B] dark:bg-[#18181B]'>
                    <InputGroupInput
                      name='cardNumber'
                      autoComplete='cc-number'
                      placeholder='1234 1234 1234 1234'
                      className='h-auto rounded-none border-0 bg-transparent text-sm text-white placeholder:text-zinc-600 focus-visible:ring-0'
                    />

                    <InputGroupAddon align='inline-end'>
                      <CardBrands />
                    </InputGroupAddon>
                  </InputGroup>

                  <div className='grid grid-cols-[1fr_1fr_auto] items-center gap-3'>
                    <Input
                      name='cardExpiry'
                      autoComplete='cc-exp'
                      placeholder='MM / YY'
                      className={FIELD_CLASS}
                    />

                    <Input
                      name='cardCvc'
                      autoComplete='cc-csc'
                      placeholder='CVC'
                      className={FIELD_CLASS}
                    />

                    <CircleHelpIcon className='size-4 text-zinc-600' />
                  </div>

                  {/* Cardholder name */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='cardholder'
                      className='text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500'
                    >
                      Cardholder name
                    </Label>

                    <Input
                      id='cardholder'
                      name='cardholder'
                      autoComplete='cc-name'
                      placeholder='Full name on card'
                      className={FIELD_CLASS}
                    />
                  </div>

                  {/* Country or region */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='country'
                      className='text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500'
                    >
                      Country or region
                    </Label>

                    <Select
                      value={country}
                      onValueChange={(value) => setCountry(String(value))}
                    >
                      <SelectTrigger id='country' className={SELECT_CLASS}>
                        <SelectValue>
                          {(value: string) => {
                            const item = countries.find(
                              (entry) => entry.code === value
                            )

                            if (!item) return value

                            return (
                              <span className='flex items-center gap-2'>
                                <Flag code={item.flag} />
                                {item.label}
                              </span>
                            )
                          }}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {countries.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            <span className='flex items-center gap-2'>
                              <Flag code={item.flag} />
                              {item.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Save information */}
              <div className='mt-4 rounded-xl border border-[#2A2A2E] bg-[#141416] p-3.5'>
                <div className='flex items-start gap-3'>
                  <Checkbox
                    id='save-info'
                    defaultChecked={false}
                    className='mt-0.5 size-4 rounded-[4px] border-[#3A3A3F]'
                  />

                  <div>
                    <Label
                      htmlFor='save-info'
                      className='text-sm font-medium text-white'
                    >
                      Save my information for faster checkout
                    </Label>

                    <p className='mt-1 text-xs text-zinc-500'>
                      Pay securely on this site and your payment link is
                      accepted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pay */}
              <Button
                type='button'
                className='mt-4 h-12 w-full rounded-xl bg-[#0A6FF5] text-sm font-semibold text-white transition-colors hover:bg-[#0960D8]'
              >
                Pay
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
