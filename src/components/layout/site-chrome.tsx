"use client"

import { usePathname } from "next/navigation"

/** Routes that render without the site header and footer (login, sign in, onboarding). */
const BARE = ["/login", "/sign-in", "/onboarding"]

/** Hides the site chrome on the bare routes; renders it everywhere else. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  if (BARE.some((p) => path === p || path.startsWith(`${p}/`))) return null
  return children
}
