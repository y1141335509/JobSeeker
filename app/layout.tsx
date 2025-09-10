import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from '../lib/components/auth/AuthProvider'

export const metadata: Metadata = {
  title: 'JobSeer - Find Your Perfect Career Path with Guidance',
  description: 'Discover job opportunities while receiving emotional support through astrology and tarot guidance. Build resumes, track progress, and find hope in your career journey.',
  keywords: ['job search', 'career guidance', 'resume builder', 'astrology', 'tarot', 'job matching', 'career support'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://resource.trickle.so/vendor_lib/unpkg/lucide-static@0.516.0/font/lucide.css" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}