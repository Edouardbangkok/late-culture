import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/auth/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Late Culture Bangkok', template: '%s | Late Culture Bangkok' },
  description: 'The insider guide to Bangkok — Stay, Eat, Drink, Party.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K0YNWJ9Q7G"></script>
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K0YNWJ9Q7G');" }} />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
