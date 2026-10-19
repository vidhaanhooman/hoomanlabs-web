import Image from "next/image"
import Link from "next/link"

import { Wordmark } from "@/components/layout/wordmark"

/**
 * The bare layout for sign in and onboarding (no site header or footer):
 * an earthy film photo on the left in a rounded card, and the form on the
 * right with the logo above it. The photo hides below lg.
 * Placeholder photo until a dedicated one is made.
 */
export function AuthShell({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="relative hidden p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-2xl border border-line">
          <Image src="/art/product/agents-backdrop.webp" alt="" fill priority sizes="50vw" className="object-cover dark:brightness-[0.82]" />
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="HoomanLabs home" className="rounded-sm">
            <Wordmark />
          </Link>
          {aside}
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-[24rem]">{children}</div>
        </div>
      </div>
    </div>
  )
}
