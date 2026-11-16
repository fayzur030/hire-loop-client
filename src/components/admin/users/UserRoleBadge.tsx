import { Badge } from '@/components/ui/badge'
import { USER_ROLE_LABELS, USER_ROLE_STYLES } from '@/constants/userRoles'
import type { UserRole } from '@/types/user.types'
import { BriefcaseIcon, ShieldCheckIcon, UserIcon } from 'lucide-react'

/** Small icon that shows which kind of account a role belongs to. */
const ROLE_ICONS: Record<UserRole, typeof UserIcon> = {
  admin: ShieldCheckIcon,
  recruiter: BriefcaseIcon,
  seeker: UserIcon,
}

interface UserRoleBadgeProps {
  role: UserRole
  className?: string
}

/** Colored pill showing the role of a user. */
export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  const Icon = ROLE_ICONS[role]

  return (
    <Badge
      className={`gap-1.5 rounded-full border-transparent ${USER_ROLE_STYLES[role]} ${className ?? ''}`}
    >
      <Icon className='size-3' />
      {USER_ROLE_LABELS[role]}
    </Badge>
  )
}
