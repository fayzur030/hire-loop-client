'use client'

import { useCallback, useState } from 'react'

type FieldErrors<T> = Partial<Record<keyof T, string>>

/**
 * Shared state for simple string field forms: the field values plus a
 * validation error per field.
 *
 * - `updateField` writes the new value and clears that field's error.
 * - `setFieldErrors` replaces all errors (e.g. after validating on submit).
 */
export function useFormFields<T extends Record<string, string>>(
  initialValues: T
) {
  const [fields, setFields] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FieldErrors<T>>({})

  const updateField = useCallback((field: keyof T, value: string) => {
    setFields((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }, [])

  const setFieldErrors = useCallback(
    (nextErrors: FieldErrors<T>) => setErrors(nextErrors),
    []
  )

  return { fields, errors, updateField, setFieldErrors }
}
