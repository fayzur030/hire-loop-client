import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HireLoop | Find Jobs & Hire Top Talent',
  description:
    'HireLoop connects talented job seekers with trusted recruiters. Discover opportunities, find the right candidates, and build your career.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`dark ${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <Toaster position='top-right' richColors={true} />
        {children}
      </body>
    </html>
  )
}
