import Navbar from '@/components/shared/Navbar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex-1'>
      <Navbar />
      {children}
    </main>
  )
}
