import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '@/utils/constants'
import { Metadata } from 'next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  manifest: '/manifest.json',
  title: [APP_NAME, APP_SLOGAN].join(' — '),
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='flex min-h-screen flex-col items-center p-6 pb-32'>
          {children}
        </main>
      </body>
    </html>
  )
}
