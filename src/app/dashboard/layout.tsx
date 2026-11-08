import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        <div className='pl-4'>{children}</div>
      </main>
    </SidebarProvider>
  )
}
