import { Badge } from '@/components/ui/badge'
import type { ApplicationStatus } from '@/types/application.types'
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_STYLES,
  normalizeApplicationStatus,
} from './application-status'

interface ApplicationStatusBadgeProps {
  /** Missing statuses fall back to "applied". */
  status?: ApplicationStatus | null
}

/** Colored status pill for an application. */
export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const value = normalizeApplicationStatus(status)

  return (
    <Badge
      className={`rounded-full border-transparent capitalize ${APPLICATION_STATUS_STYLES[value]}`}
    >
      {APPLICATION_STATUS_LABELS[value]}
    </Badge>
  )
}
