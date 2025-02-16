import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from "@/components/ui/sonner"

const inter = localFont({
  src: '../public/fonts/Inter-Regular.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kawaii Café - Cute & Delicious',
  description: 'Experience the magic of kawaii culture with our delightful treats and beverages.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
