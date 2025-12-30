import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pastebin Lite',
  description: 'A simple pastebin application for sharing text snippets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f8fafc'
      }}>
        {children}
      </body>
    </html>
  )
}