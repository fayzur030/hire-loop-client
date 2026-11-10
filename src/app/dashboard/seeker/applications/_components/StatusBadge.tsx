import { Badge } from '@/components/ui/badge'
import type { ApplicationStatus } from '@/types/application.types'

/** Colors per status, matching the "My Applications" design. */
const STATUS_STYLES: Record<ApplicationStatus, string> = {
  applied: 'bg-zinc-500/15 text-zinc-300',
  review: 'bg-amber-500/15 text-amber-400',
  shortlisted: 'bg-blue-500/15 text-blue-400',
  rejected: 'bg-red-500/15 text-red-400',
  offered: 'bg-emerald-500/15 text-emerald-400',
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: 'Applied',
  review: 'Review',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  offered: 'Offered',
}

/** Colored status pill for an application. */
const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
  return (
    <Badge
      className={`rounded-full border-transparent capitalize ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </Badge>
  )
}

export default StatusBadge
