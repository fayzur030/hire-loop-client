'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/images/logo.png'

type SignInFields = {
  email: string
  password: string
}

type SignInErrors = Partial<Record<keyof SignInFields, string>>

export default function SignInPage() {
  const [fields, setFields] = useState<SignInFields>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<SignInErrors>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  function updateField(field: keyof SignInFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatusMessage('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: SignInErrors = {}
    if (!fields.email.trim()) {
      nextErrors.email = 'Enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!fields.password) {
      nextErrors.password = 'Enter your password.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setStatusMessage(
        'Sign-in is not connected yet. Your account details were not sent.',
      )
    }, 650)
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground sm:px-6'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_45%)]' />

      <main className='relative w-full max-w-md'>
        <div className='mb-6 flex justify-center'>
          <Link href='/' aria-label='HireLoop home'>
            <Image src={Logo} alt='HireLoop' priority className='h-9 w-auto' />
          </Link>
        </div>

        <section className='rounded-2xl border border-border bg-card/95 p-5 shadow-2xl shadow-black/45 sm:p-8'>
          <header className='mb-7 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-[28px]'>
              Welcome Back
            </h1>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              Sign in to your HireLoop account and continue your journey.
            </p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <div className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-xs text-foreground'>
                  Email Address
                </Label>
                <div className='relative'>
                  <Mail
                    aria-hidden='true'
                    className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground'
                  />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='you@example.com'
                    value={fields.email}
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className='h-11 border-input bg-background/60 pr-3 pl-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
                  />
                </div>
                {errors.email && (
                  <p id='email-error' className='text-xs text-destructive'>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-xs text-foreground'>
                  Password
                </Label>
                <div className='relative'>
                  <LockKeyhole
                    aria-hidden='true'
                    className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground'
                  />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder='Enter your password'
                    value={fields.password}
                    onChange={(event) =>
                      updateField('password', event.target.value)
                    }
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    className='h-11 border-input bg-background/60 py-2 pr-11 pl-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
                  />
                  <button
                    type='button'
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden='true' className='size-4' />
                    ) : (
                      <Eye aria-hidden='true' className='size-4' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id='password-error' className='text-xs text-destructive'>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className='mt-5 flex items-center justify-between gap-3'>
              <label
                htmlFor='rememberMe'
                className='flex cursor-pointer items-center gap-2 text-sm text-muted-foreground'
              >
                <input
                  id='rememberMe'
                  name='rememberMe'
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className='size-4 cursor-pointer rounded border-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card'
                />
                Remember me
              </label>
              <Link
                href='/forgot-password'
                className='text-sm font-medium text-primary transition-colors hover:text-primary/80'
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='mt-6 h-11 w-full bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-70'
            >
              {isLoading ? (
                <>
                  <LoaderCircle
                    aria-hidden='true'
                    className='size-4 animate-spin'
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight aria-hidden='true' className='size-4' />
                </>
              )}
            </Button>

            {statusMessage && (
              <p
                role='status'
                className='mt-3 text-center text-xs text-muted-foreground'
              >
                {statusMessage}
              </p>
            )}
          </form>

          <div className='my-5 flex items-center gap-3' aria-hidden='true'>
            <div className='h-px flex-1 bg-border' />
            <span className='text-[10px] font-medium tracking-[0.12em] text-muted-foreground'>
              OR
            </span>
            <div className='h-px flex-1 bg-border' />
          </div>

          <Button
            type='button'
            variant='outline'
            className='h-11 w-full border-border bg-transparent text-sm text-foreground hover:border-muted-foreground/50 hover:bg-foreground/[0.03] hover:text-foreground'
          >
            <svg aria-hidden='true' viewBox='0 0 24 24' className='size-4'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z'
              />
              <path
                fill='#EA4335'
                d='M12 4.36c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 1.09 14.97 0 12 0A11 11 0 0 0 2.15 7.05l3.69 2.84C6.71 7.29 9.14 4.36 12 4.36Z'
              />
            </svg>
            Continue with Google
          </Button>

          <p className='mt-6 text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='font-medium text-primary transition-colors hover:text-primary/80'
            >
              Create Account
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}
