import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { AppStateProvider } from '@/lib/state'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sportscanner - Your Ultimate Sports Hub',
  description: 'Discover, Compare, and Book Sports Facilities Across London',
  icons: {
    icon: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sportscanner-v2-purple-transparent%20bg-PfekjV0cIdNycje0NDyZF84cwZRijN.png',
        href: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sportscanner-v2-purple-transparent%20bg-PfekjV0cIdNycje0NDyZF84cwZRijN.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateProvider>
          <Header />
          <main>{children}</main>
        </AppStateProvider>
      </body>
    </html>
  )
}

