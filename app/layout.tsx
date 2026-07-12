import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StreamFlow - Premium IPTV Streaming Platform',
  description: 'Experience unlimited streaming with StreamFlow. Premium IPTV service with 1000+ channels, movies, and on-demand content.',
  generator: 'v0.app',
  keywords: ['IPTV', 'streaming', 'TV', 'movies', 'entertainment', 'subscription'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0e27',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className={`${_geistSans.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
