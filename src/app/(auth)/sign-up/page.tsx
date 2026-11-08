'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import {
  Building2,
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/images/logo.png'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type AccountRole = 'seeker' | 'recruiter' | 'admin'
type FormFields = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  profileImageUrl: string
  role: string
}
type FormErrors = Partial<Record<keyof FormFields, string>>

const INITIAL_FIELDS: FormFields = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profileImageUrl: '',
  role: '',
}

const ROLES: {
  value: AccountRole
  title: string
  description: string
  Icon: typeof UserRound
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
  const [role, setRole] = useState<AccountRole>('seeker')
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const router = useRouter()
  function updateField(field: keyof FormFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatusMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (!fields.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
    if (!fields.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
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

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setIsLoading(true)
      const { data, error } = await authClient.signUp.email({
        name: fields.fullName,
        email: fields.email.trim(),
        password: fields.password,
        image: fields.profileImageUrl,
        role: role,
      })
      console.log(data)
      if (error) {
        toast.error(error.message || 'Failed to create account.')
        return
      }
      toast.success('Account created successfully! Please sign in.')
      router.push('/sign-in')
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground sm:px-6'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_45%)]' />

      <main className='relative w-full max-w-125'>
        <div className='mb-6 flex justify-center'>
          <Link href='/' aria-label='HireLoop home'>
            <Image src={Logo} alt='HireLoop' priority className='h-9 w-auto' />
          </Link>
        </div>

        <section className='rounded-2xl border border-border bg-card/95 p-5 shadow-2xl shadow-black/45 sm:p-8'>
          <header className='mb-7 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-[28px]'>
              Create Your Account
            </h1>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              Join HireLoop and take the next step in your career.
            </p>
          </header>

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
                <div className='relative'>
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Create a password'
                    value={fields.password}
                    onChange={(event) =>
                      updateField('password', event.target.value)
                    }
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    className='h-10 border-input bg-background/60 px-3 pr-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
                  />
                  <button
                    type='button'
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='size-4' />
                    ) : (
                      <Eye className='size-4' />
                    )}
                  </button>
                </div>
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
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Re-enter your password'
                    value={fields.confirmPassword}
                    onChange={(event) =>
                      updateField('confirmPassword', event.target.value)
                    }
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                      errors.confirmPassword
                        ? 'confirmPassword-error'
                        : undefined
                    }
                    className='h-10 border-input bg-background/60 px-3 pr-10 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20'
                  />
                  <button
                    type='button'
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                    aria-pressed={showConfirmPassword}
                    onClick={() =>
                      setShowConfirmPassword((visible) => !visible)
                    }
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='size-4' />
                    ) : (
                      <Eye className='size-4' />
                    )}
                  </button>
                </div>
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
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='font-medium text-primary transition-colors hover:text-primary/80'
            >
              Sign In
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}
