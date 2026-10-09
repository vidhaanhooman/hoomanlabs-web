import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { OutlineToggle } from "@/components/draft/outline-toggle"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { productSections, sections } from "@/content/sections"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "HoomanLabs (draft)",
  description: "Draft marketing site. Not final copy.",
  robots: { index: false, follow: false },
}

// The outline control stays available until every section is locked.
const drafting = [...sections, ...productSections].some((s) => s.status === "draft")

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {drafting ? <OutlineToggle /> : null}
      </body>
    </html>
  )
}
