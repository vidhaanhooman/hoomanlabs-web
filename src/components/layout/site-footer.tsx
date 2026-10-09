import Link from "next/link"

import { Container } from "@/components/layout/container"
import { FooterWordmark } from "@/components/layout/footer-wordmark"
import { Wordmark } from "@/components/layout/wordmark"
import { footer } from "@/content/draft"
import { componentHref, components } from "@/content/platform"

const LINK = "text-small text-ink-muted transition-colors duration-150 hover:text-foreground"

/**
 * Dark footer: the one deliberate theme switch on the page (class="dark"
 * swaps the grey scale). Link columns, then a giant spotlight wordmark that
 * bleeds off the bottom edge.
 */
export function SiteFooter() {
  const columns = [
    {
      title: "Platform",
      links: components.map((c) => ({ label: c.name, href: componentHref(c.id) })),
    },
    ...footer.columns,
  ]

  return (
    <footer className="dark overflow-hidden bg-background text-foreground">
      <Container className="pt-20 pb-10 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="HoomanLabs home" className="self-start rounded-sm">
              <Wordmark />
            </Link>
            <p className="max-w-[30ch] text-small text-ink-muted">{footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-4 lg:gap-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <p className="text-small font-medium">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={LINK}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-small text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HoomanLabs</p>
          <ul className="flex gap-6">
            {footer.social.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className={LINK}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="pt-6">
        <FooterWordmark />
      </Container>
    </footer>
  )
}
