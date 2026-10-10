import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-6 py-20 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- animated SVG (Humi blinks) */}
      <img src="/art/humi/humi.svg" alt="Humi, the HoomanLabs agent" className="h-56 w-auto" />
      <div className="flex flex-col gap-2">
        <p className="font-mono text-label text-ink-muted">404</p>
        <h1 className="text-h2 font-normal">Humi looked everywhere. This page isn&apos;t here.</h1>
        <p className="text-body text-ink-secondary">It may have moved, or the link has a typo.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/" className={buttonVariants()}>
          Back to home
        </Link>
        <Link href="/platform" className={buttonVariants({ variant: "secondary" })}>
          See the platform
        </Link>
      </div>
    </Container>
  )
}
