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
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CirclePlus,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
} from 'lucide-react'

const menuItemsByRole = {
  seeker: [
    { name: 'Dashboard', icon: LayoutDashboard, url: '/dashboard/seeker' },
    { name: 'Jobs', icon: BriefcaseBusiness, url: '/jobs' },
    { name: 'Saved Jobs', icon: Bookmark, url: '/saved-jobs' },
    { name: 'Applications', icon: FileText, url: '/applications' },
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

type UserRole = keyof typeof menuItemsByRole

export function DashboardSidebar() {
  const { data: session } = authClient.useSession()

  const userRole = session?.user?.role

  const role: UserRole =
    userRole === 'seeker' || userRole === 'recruiter' || userRole === 'admin'
      ? userRole
      : 'seeker'

  const menuItems = menuItemsByRole[role]

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
