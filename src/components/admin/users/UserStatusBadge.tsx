import { Badge } from '@/components/ui/badge'
import type { UserStatus } from '@/types/user.types'

/** Label and colors for each account status. */
const STATUS_STYLES: Record<
  UserStatus,
  { label: string; className: string; dot: string }
> = {
  active: {
    label: 'Active',
    className: 'bg-emerald-500/15 text-emerald-400',
    dot: 'bg-emerald-400',
  },
  suspended: {
    label: 'Suspended',
    className: 'bg-red-500/15 text-red-400',
    dot: 'bg-red-400',
  },
}

interface UserStatusBadgeProps {
  status: UserStatus
  className?: string
}

/** Colored pill showing whether an account is active or suspended. */
export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const style = STATUS_STYLES[status]

  return (
    <Badge
      className={`gap-1.5 rounded-full border-transparent ${style.className} ${className ?? ''}`}
    >
      <span className={`size-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </Badge>
  )
}
