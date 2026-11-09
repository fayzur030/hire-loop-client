'use client'

import { useState, type ChangeEvent, type ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface PasswordInputProps {
  id: string
  name: string
  autoComplete: string
  placeholder: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isInvalid: boolean
  /** Id of the element that describes this input (the error message). */
  describedById?: string
  /** Optional icon rendered inside the field's left edge. */
  leadingIcon?: ReactNode
  /** Input styling — differs slightly between pages, so it comes from the caller. */
  className?: string
  toggleClassName?: string
}

/** Password field with a show/hide visibility toggle. */
export function PasswordInput({
  id,
  name,
  autoComplete,
  placeholder,
  value,
  onChange,
  isInvalid,
  describedById,
  leadingIcon,
  className,
  toggleClassName,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='relative'>
      {leadingIcon}
      <Input
        id={id}
        name={name}
        type={isVisible ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={isInvalid}
        aria-describedby={describedById}
        className={className}
      />
      <button
        type='button'
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        onClick={() => setIsVisible((visible) => !visible)}
        className={toggleClassName}
      >
        {isVisible ? (
          <EyeOff aria-hidden='true' className='size-4' />
        ) : (
          <Eye aria-hidden='true' className='size-4' />
        )}
      </button>
    </div>
  )
}
