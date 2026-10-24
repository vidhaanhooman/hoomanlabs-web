import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { startPaths } from "@/content/landing"
import { cn } from "@/lib/utils"

/**
 * The homepage's closing ask, just above the footer: the two ways to start,
 * side by side. Self-serve on the page's light surface (start building
 * today), enterprise in the product's dark (built and run with our
 * engineers, Book a demo). Each has who it's for, how it runs, time to
 * live and support, then its one action.
 */
export function GetStarted() {
  return (
    <Section id="v3-start" spacing="none" className="pt-(--section-pad) pb-(--section-gap)">
      <Container id="book-demo" className="scroll-mt-24">
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{startPaths.headline}</h2>
          <p className="text-body text-ink-secondary">{startPaths.body}</p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {startPaths.paths.map((p, i) => {
            const dark = i === 1
            return (
              <div
                key={p.name}
                className={cn("flex flex-col gap-8 rounded-xl p-6 sm:p-8", dark ? "ui-dark bg-(--ui-bg) text-(--ui-text)" : "border border-line bg-surface")}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3 font-normal">{p.name}</h3>
                  <p className={cn("text-small", dark ? "text-(--ui-muted)" : "text-ink-secondary")}>{p.for}</p>
                </div>
                <dl className="flex flex-col">
                  {p.rows.map((r) => (
                    <div key={r.k} className={cn("flex gap-4 border-t py-3", dark ? "border-(--ui-line)" : "border-line")}>
                      <dt className={cn("w-28 shrink-0 text-small", dark ? "text-(--ui-muted)" : "text-ink-muted")}>{r.k}</dt>
                      <dd className="text-small">{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    data-demo={p.cta.label === "Book a demo" ? "" : undefined}
                    href={p.cta.href}
                    className={buttonVariants({ className: cn("group", dark && "bg-white text-black hover:bg-white/90") })}
                  >
                    {p.cta.label}
                    <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {p.more && (
                    <TextLink href={p.more.href} className={dark ? "text-(--ui-text)" : undefined}>
                      {p.more.label}
                    </TextLink>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
