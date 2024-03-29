import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { HandleOnComplete } from '@/lib/router-events'
import { Toaster } from "@/components/ui/sonner"


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <body >
        <ThemeProvider attribute="class" defaultTheme="system"  enableSystem disableTransitionOnChange>
        {children}
        <HandleOnComplete />
        <Toaster />
        </ThemeProvider>
        </body>
    </html>
  )
}
