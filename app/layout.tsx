import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Late Culture Bangkok', template: '%s | Late Culture Bangkok' },
  description: 'The insider guide to Bangkok — Stay, Eat, Drink, Party.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
