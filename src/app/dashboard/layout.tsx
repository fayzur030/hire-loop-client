import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className='flex h-12 items-center px-4'>
          <SidebarTrigger />
        </header>
        <main className='flex-1 min-w-0 w-full px-4'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
