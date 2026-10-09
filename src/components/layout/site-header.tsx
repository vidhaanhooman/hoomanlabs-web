import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Wordmark } from "@/components/layout/wordmark"
import { ctas, nav } from "@/content/draft"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 supports-[backdrop-filter]:bg-background/85 supports-[backdrop-filter]:backdrop-blur-sm">
      <Container className="flex h-16 items-center gap-8">
        <Link href="/" aria-label="HoomanLabs home" className="shrink-0 rounded-sm">
          <Wordmark />
        </Link>

        <MainNav />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <Link href={nav.signIn.href} className={buttonVariants({ variant: "ghost" })}>
              {nav.signIn.label}
            </Link>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
