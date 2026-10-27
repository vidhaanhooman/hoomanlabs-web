import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { getStarted } from "@/content/landing"
import { resources } from "@/content/structure"
import { cn } from "@/lib/utils"

/**
 * The homepage's closing ask, just above the footer: the two ways to start,
 * side by side. Self-serve on the page's light surface (start building
 * today), enterprise in the product's dark (built and run with our
 * engineers, Book a demo). Each has a small label, a title and one line,
 * then its actions; self-serve also links the developer docs.
 */
export function GetStarted() {
  return (
    <Section id="v3-start" spacing="none" className="pt-(--section-pad) pb-(--section-gap)">
      <Container id="book-demo" className="scroll-mt-24">
        <h2 className="max-w-[44rem] text-h2 font-normal">{getStarted.headline}</h2>
        <div className="mt-(--heading-gap,2.5rem) grid gap-(--card-gap,0.75rem) md:grid-cols-2">
          {getStarted.paths.map((p, i) => {
            const dark = i === 1
            return (
              <div key={p.title} className={cn("flex flex-col gap-6 rounded-xl p-6 sm:p-8", dark ? "ui-dark bg-(--ui-bg) text-(--ui-text)" : "border border-line bg-surface")}>
                <div className="flex flex-col gap-2">
                  <span className={cn("font-mono text-label", dark ? "text-(--ui-muted)" : "text-ink-muted")}>{p.label}</span>
                  <h3 className="text-h3 font-normal">{p.title}</h3>
                  <p className={cn("text-body", dark ? "text-(--ui-muted)" : "text-ink-secondary")}>{p.body}</p>
                </div>
                <div className="mt-auto flex flex-col gap-6">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
                  {p.docs && (
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-small">
                      {resources.links
                        .filter((r) => r.label !== "Changelog")
                        .map((r) => (
                          <li key={r.label}>
                            <Link href={r.href} className="group inline-flex items-center gap-1 underline-offset-4 hover:underline">
                              {r.label}
                              <ArrowUpRightIcon className="size-3.5 text-ink-muted" />
                            </Link>
                          </li>
                        ))}
                    </ul>
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
