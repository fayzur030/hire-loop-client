import type { ApplicationStatus } from '@/types/application.types'

/**
 * Single source of truth for the application pipeline.
 * The seeker table, the recruiter table and the status pickers all read from
 * here so a status is labelled and coloured the same way everywhere.
 */

/** Every status an application can be in, listed in pipeline order. */
export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'applied',
  'review',
  'shortlisted',
  'offered',
  'rejected',
]

/** Status used when the API has not stored one yet. */
export const DEFAULT_APPLICATION_STATUS: ApplicationStatus = 'applied'

/** Human readable label for each status. */
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: 'Applied',
  review: 'Review',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  offered: 'Offered',
}

/** Tailwind classes for the status pill. */
export const APPLICATION_STATUS_STYLES: Record<ApplicationStatus, string> = {
  applied: 'bg-zinc-500/15 text-zinc-300',
  review: 'bg-amber-500/15 text-amber-400',
  shortlisted: 'bg-blue-500/15 text-blue-400',
  rejected: 'bg-red-500/15 text-red-400',
  offered: 'bg-emerald-500/15 text-emerald-400',
}

/** Options for status dropdowns and selects. */
export const APPLICATION_STATUS_OPTIONS = APPLICATION_STATUSES.map((status) => ({
  value: status,
  label: APPLICATION_STATUS_LABELS[status],
}))

/** Falls back to `applied` for missing or unknown statuses. */
export const normalizeApplicationStatus = (
  status?: ApplicationStatus | null
): ApplicationStatus =>
  status && status in APPLICATION_STATUS_LABELS
    ? status
    : DEFAULT_APPLICATION_STATUS
