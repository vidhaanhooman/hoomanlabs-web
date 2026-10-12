import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ctas, finalCta } from "@/content/draft"
import { startPaths } from "@/content/landing"
import { resources } from "@/content/structure"

/**
 * Closing ask (/lab/v3), two ways: build it yourself (self-serve, with the
 * developer resources as small links) or build it with our team (demo).
 */
export function TwoWayCta() {
  const self = startPaths.paths[0]
  const links = resources.links.filter((r) => r.label !== "Changelog")
  return (
    <Section id="cta" spacing="none" className="pt-(--section-pad) pb-(--section-gap)">
      <Container id="book-demo" className="flex scroll-mt-24 flex-col gap-10">
        <h2 className="max-w-[44rem] text-h2 font-normal">{finalCta.title}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label text-ink-muted">Self-serve</span>
              <h3 className="text-h3 font-normal">Build it yourself</h3>
              <p className="max-w-[40ch] text-body text-ink-secondary">Sign up, build an agent, test it against simulated callers and go live, often the same day.</p>
            </div>
            <div className="mt-auto flex flex-col gap-5">
              <Link href={self.cta.href} className={buttonVariants({ variant: "secondary", className: "w-fit" })}>
                {self.cta.label}
              </Link>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-small">
                {links.map((r) => (
                  <li key={r.label}>
                    <Link href={r.href} className="group flex items-center gap-1 text-ink-secondary transition-colors hover:text-foreground">
                      {r.label}
                      <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dark graphite flex flex-col gap-6 rounded-xl border border-line bg-background p-6 text-foreground sm:p-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label text-ink-muted">Enterprise</span>
              <h3 className="text-h3 font-normal">Build it with our team</h3>
              <p className="max-w-[40ch] text-body text-ink-secondary">Our engineers build your first flow with you, test it on your systems and hand it over, in 4 to 8 weeks.</p>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href={ctas.demo.href} className={buttonVariants({ className: "w-fit" })}>
                {ctas.demo.label}
              </Link>
              <Link href="/enterprise" className="text-small text-ink-secondary transition-colors hover:text-foreground">
                How an enterprise build runs →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
