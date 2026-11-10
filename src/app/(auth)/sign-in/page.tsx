'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { ArrowRight, LoaderCircle, LockKeyhole, Mail } from 'lucide-react'
import { toast } from 'sonner'

import { AuthCard } from '@/components/auth/AuthCard'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormFields } from '@/hooks/use-form-fields'
import { authClient } from '@/lib/auth-client'
import { isValidEmail } from '@/lib/validation'

type SignInFields = {
  email: string
  password: string
}

type SignInErrors = Partial<Record<keyof SignInFields, string>>

export default function SignInPage() {
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirectTo') ?? '/'
  console.log(redirectPath, '<= redirect')
  const { fields, errors, updateField, setFieldErrors } =
    useFormFields<SignInFields>({ email: '', password: '' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: SignInErrors = {}
    if (!fields.email.trim()) {
      nextErrors.email = 'Enter your email address.'
    } else if (!isValidEmail(fields.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!fields.password) {
      nextErrors.password = 'Enter your password.'
    }

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setIsLoading(true)
      const { data, error } = await authClient.signIn.email({
        email: fields.email,
        password: fields.password,
        callbackURL: redirectPath,
      })
      if (error) {
        toast.error(error.message || 'Invalid email or password.')
        return
      }

      toast.success(`Welcome back ${data.user.name}!`)
      // router.push(redirectPath)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title='Welcome Back'
      subtitle='Sign in to your HireLoop account and continue your journey.'
      maxWidth='max-w-md'
      footerText="Don't have an account?"
      footerLinkHref='/sign-up'
      footerLinkText='Create Account'
    >
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
                onChange={(event) => updateField('email', event.target.value)}
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
            <PasswordInput
              id='password'
              name='password'
              autoComplete='current-password'
              placeholder='Enter your password'
              value={fields.password}
              onChange={(event) => updateField('password', event.target.value)}
              isInvalid={Boolean(errors.password)}
              describedById={errors.password ? 'password-error' : undefined}
              leadingIcon={
                <LockKeyhole
                  aria-hidden='true'
                  className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground'
                />
              }
              className='h-11 border-input bg-background/60 py-2 pr-11 pl-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
              toggleClassName='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            />
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
      </form>
    </AuthCard>
  )
}
