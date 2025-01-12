import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Bookster',
  description: 'A web app to store, organize, and manage your bookmarks',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
