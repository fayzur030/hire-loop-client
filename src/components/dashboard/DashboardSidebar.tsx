'use client'

import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { authClient } from '@/lib/auth-client'
import type { UserRole } from '@/types/user.types'
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CirclePlus,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  UserCog,
  Users,
} from 'lucide-react'

type MenuItem = {
  name: string
  icon: LucideIcon
  url: string
}

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    { name: 'Dashboard', icon: LayoutDashboard, url: '/dashboard/seeker' },
    { name: 'Jobs', icon: BriefcaseBusiness, url: '/jobs' },
    { name: 'Saved Jobs', icon: Bookmark, url: '/saved-jobs' },
    {
      name: 'Applications',
      icon: FileText,
      url: '/dashboard/seeker/applications',
    },
    { name: 'Billing', icon: CreditCard, url: '/billing' },
    { name: 'Settings', icon: Settings, url: '/settings' },
  ],

  recruiter: [
    { name: 'Dashboard', icon: LayoutDashboard, url: '/dashboard/recruiter' },
    { name: 'My Jobs', icon: BriefcaseBusiness, url: '/jobs' },
    {
      name: 'Manage Jobs',
      icon: ClipboardList,
      url: '/dashboard/recruiter/manage-jobs',
    },
    {
      name: 'Add Jobs',
      icon: CirclePlus,
      url: '/dashboard/recruiter/add-jobs',
    },
    { name: 'Applications', icon: FileText, url: '/applications' },
    { name: 'Settings', icon: Settings, url: '/settings' },
  ],
  admin: [
    { name: 'Dashboard', icon: LayoutDashboard, url: '/dashboard/admin' },
    { name: 'Users', icon: Users, url: '/users' },
    { name: 'Companies', icon: Building2, url: '/companies' },
    { name: 'Jobs', icon: BriefcaseBusiness, url: '/jobs' },
    { name: 'Payments', icon: CreditCard, url: '/payments' },
    { name: 'User Management', icon: UserCog, url: '/users' },
    { name: 'Settings', icon: Settings, url: '/settings' },
  ],
}

/** Falls back to the seeker menu when the role is unknown (e.g. signed out). */
const resolveRole = (role?: string): UserRole =>
  role === 'seeker' || role === 'recruiter' || role === 'admin'
    ? role
    : 'seeker'

export function DashboardSidebar() {
  const { data: session } = authClient.useSession()

  const menuItems = menuItemsByRole[resolveRole(session?.user?.role)]

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className='px-2 text-lg font-bold'>Dashboard</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton render={<Link href={item.url} />}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
