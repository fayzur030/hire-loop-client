import Navbar from '@/components/shared/Navbar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-screen flex-col bg-zinc-950'>
      <main className='flex-1'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
