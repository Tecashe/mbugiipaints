import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "mbugiipaints - Professional Artist & Art Classes",
  description:
    "Discover vibrant paintings, commission custom artwork, and join art classes with mbugiipaints. Professional artist portfolio featuring original paintings, art education, and creative services.",
  generator: "v0.app",
  keywords: ["artist", "paintings", "art classes", "custom artwork", "mbugiipaints", "portfolio", "art education"],
  authors: [{ name: "mbugiipaints" }],
  openGraph: {
    title: "mbugiipaints - Professional Artist & Art Classes",
    description:
      "Professional artist portfolio featuring original paintings, art classes, and custom artwork services.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
