'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import {
  Building2,
  Check,
  LoaderCircle,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { AuthCard } from '@/components/auth/AuthCard'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormFields } from '@/hooks/use-form-fields'
import { authClient } from '@/lib/auth-client'
import { isValidEmail } from '@/lib/validation'
import type { UserRole } from '@/types/user.types'

type SignUpFields = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  profileImageUrl: string
}

type SignUpErrors = Partial<Record<keyof SignUpFields, string>>

const INITIAL_FIELDS: SignUpFields = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profileImageUrl: '',
}

const ROLES: {
  value: UserRole
  title: string
  description: string
  Icon: LucideIcon
}[] = [
  {
    value: 'seeker',
    title: 'Job Seeker',
    description: 'Discover opportunities and find your dream job.',
    Icon: UserRound,
  },
  {
    value: 'recruiter',
    title: 'Recruiter',
    description: 'Find talented people and hire the right candidates.',
    Icon: Building2,
  },
  {
    value: 'admin',
    title: 'Admin',
    description: 'Manage users, monitor activities, and maintain the platform.',
    Icon: ShieldCheck,
  },
]

export default function SignUpPage() {
  const [role, setRole] = useState<UserRole>('seeker')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { fields, errors, updateField, setFieldErrors } =
    useFormFields<SignUpFields>(INITIAL_FIELDS)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: SignUpErrors = {}
    if (!fields.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
    if (!fields.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!isValidEmail(fields.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!fields.password) nextErrors.password = 'Create a password.'
    if (!fields.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (fields.confirmPassword !== fields.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }
    if (fields.profileImageUrl) {
      try {
        new URL(fields.profileImageUrl)
      } catch {
        nextErrors.profileImageUrl = 'Enter a valid image URL.'
      }
    }

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setIsLoading(true)
      const { error } = await authClient.signUp.email({
        name: fields.fullName,
        email: fields.email.trim(),
        password: fields.password,
        image: fields.profileImageUrl,
        role: role,
      })
      if (error) {
        toast.error(error.message || 'Failed to create account.')
        return
      }
      toast.success('Account created successfully! Please sign in.')
      router.push('/sign-in')
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
      title='Create Your Account'
      subtitle='Join HireLoop and take the next step in your career.'
      maxWidth='max-w-125'
      footerText='Already have an account?'
      footerLinkHref='/sign-in'
      footerLinkText='Sign In'
    >
      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className='mb-3 text-sm font-medium'>
            Choose Your Account Type
          </legend>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {ROLES.map(({ value, title, description, Icon }) => {
              const selected = role === value

              return (
                <button
                  key={value}
                  type='button'
                  aria-pressed={selected}
                  onClick={() => setRole(value)}
                  className={`group relative flex min-h-28 items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    selected
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                      : 'border-border bg-background/40 hover:border-muted-foreground/50 hover:bg-foreground/3'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      selected
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className='size-4.5' />
                  </span>
                  <span className='min-w-0'>
                    <span className='block text-sm font-medium'>
                      {title}
                    </span>
                    <span className='mt-1 block text-xs leading-[1.55] text-muted-foreground'>
                      {description}
                    </span>
                  </span>
                  {selected && (
                    <span className='absolute top-3 right-3 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                      <Check className='size-2.5' />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className='mt-5 grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='fullName' className='text-xs text-foreground'>
              Full Name
            </Label>
            <Input
              id='fullName'
              name='fullName'
              autoComplete='name'
              placeholder='Your name'
              value={fields.fullName}
              onChange={(event) =>
                updateField('fullName', event.target.value)
              }
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? 'fullName-error' : undefined
              }
              className='h-10 border-input bg-background/60 px-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
            />
            {errors.fullName && (
              <p id='fullName-error' className='text-xs text-destructive'>
                {errors.fullName}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email' className='text-xs text-foreground'>
              Email Address
            </Label>
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
              className='h-10 border-input bg-background/60 px-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
            />
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
              autoComplete='new-password'
              placeholder='Create a password'
              value={fields.password}
              onChange={(event) =>
                updateField('password', event.target.value)
              }
              isInvalid={Boolean(errors.password)}
              describedById={
                errors.password ? 'password-error' : undefined
              }
              className='h-10 border-input bg-background/60 px-3 pr-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
              toggleClassName='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground'
            />
            {errors.password && (
              <p id='password-error' className='text-xs text-destructive'>
                {errors.password}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='confirmPassword'
              className='text-xs text-foreground'
            >
              Confirm Password
            </Label>
            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              autoComplete='new-password'
              placeholder='Re-enter your password'
              value={fields.confirmPassword}
              onChange={(event) =>
                updateField('confirmPassword', event.target.value)
              }
              isInvalid={Boolean(errors.confirmPassword)}
              describedById={
                errors.confirmPassword
                  ? 'confirmPassword-error'
                  : undefined
              }
              className='h-10 border-input bg-background/60 px-3 pr-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
              toggleClassName='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground'
            />
            {errors.confirmPassword && (
              <p
                id='confirmPassword-error'
                className='text-xs text-destructive'
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className='space-y-2 sm:col-span-2'>
            <Label
              htmlFor='profileImageUrl'
              className='text-xs text-foreground'
            >
              Profile Image URL{' '}
              <span className='font-normal text-muted-foreground'>
                (Optional)
              </span>
            </Label>
            <Input
              id='profileImageUrl'
              name='profileImageUrl'
              type='url'
              autoComplete='url'
              placeholder='https://example.com/photo.jpg'
              value={fields.profileImageUrl}
              onChange={(event) =>
                updateField('profileImageUrl', event.target.value)
              }
              aria-invalid={Boolean(errors.profileImageUrl)}
              aria-describedby={
                errors.profileImageUrl ? 'profileImageUrl-error' : undefined
              }
              className='h-10 border-input bg-background/60 px-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
            />
            {errors.profileImageUrl && (
              <p
                id='profileImageUrl-error'
                className='text-xs text-destructive'
              >
                {errors.profileImageUrl}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          className='mt-5 h-11 w-full bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-70'
        >
          {isLoading ? (
            <>
              <LoaderCircle className='size-4 animate-spin' />
              Preparing your account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </AuthCard>
  )
}
