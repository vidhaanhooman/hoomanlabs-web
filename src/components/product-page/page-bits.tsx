import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { ctas } from "@/content/draft"
import { menuHref, platformFeatured, platformMenu, type MenuPageId } from "@/content/platform"
import type { SectionId } from "@/content/sections"
import { cn } from "@/lib/utils"

/**
 * Pieces shared by the Platform pages built in the homepage's language
 * (Agents, Workflows): the hero copy, the light card that floats over a
 * hero screen, the definition-and-proof strip and the next-step cards.
 */

const allPages = () => [...platformMenu.flatMap((g) => g.pages), platformFeatured]
export const pageHref = (id: MenuPageId) => menuHref(allPages().find((p) => p.id === id)!)

/**
 * Breadcrumb, H1, line, the demo button and an optional text link. The
 * crumb's parent defaults to Platform; pass `parent` for another section
 * (Solutions), or null for a section's own top page.
 */
export function HeroCopy({
  crumb,
  title,
  line,
  link,
  parent = { label: "Platform", href: "/platform" },
}: {
  crumb: string
  title: string
  line: string
  link?: { label: string; href: string }
  parent?: { label: string; href: string } | null
}) {
  return (
    <>
      <p className="reveal text-small text-ink-muted">
        {parent && (
          <>
            <Link href={parent.href} className="hover:text-foreground">
              {parent.label}
            </Link>{" "}
            /{" "}
          </>
        )}
        {crumb}
      </p>
      <h1 className="reveal mt-3 max-w-[20ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
        {title}
      </h1>
      <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
        {line}
      </p>
      <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--i": 3 } as React.CSSProperties}>
        <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
          {ctas.demo.label}
        </Link>
        {link && <TextLink href={link.href}>{link.label}</TextLink>}
      </div>
    </>
  )
}

/** A small light card floating over a hero screen's edge (desktop only). */
export function FloatCard({ className, i, children }: { className: string; i: number; children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className={cn(
        "reveal absolute z-10 hidden flex-col gap-2 rounded-lg border border-line bg-background p-3.5 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)] lg:flex",
        className
      )}
      style={{ "--i": i } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

/** The sheet's "What is it?" definition, with the proof beside it. */
export function Definition({
  id,
  text,
  proof,
  placeholder = false,
}: {
  id: SectionId
  text: string
  /** Optional: without it the definition runs the full width. */
  proof?: { quote: string; by: string }
  placeholder?: boolean
}) {
  return (
    <Section id={id} spacing="tight">
      <Container className={cn("grid gap-8 border-y border-line py-10 lg:items-center lg:gap-16", proof && "lg:grid-cols-[1.6fr_1fr]")}>
        <p className={cn("text-h3 font-normal", !proof && "max-w-[48rem]")}>{text}</p>
        {proof && (
          <figure className="flex flex-col gap-2 lg:border-l lg:border-line lg:pl-10">
            <blockquote className="text-h4 font-normal">{proof.quote}</blockquote>
            <figcaption className="text-small text-ink-muted">{proof.by}</figcaption>
            {placeholder && <span className="font-mono text-label text-ink-muted">Placeholder: replace with a real, approved result</span>}
          </figure>
        )}
      </Container>
    </Section>
  )
}

/** The sheet's next step (the first related page), as one link card. */
export function NextStep({ id, related }: { id: SectionId; related: MenuPageId[] }) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <ul className="grid gap-3">
          {related.slice(0, 1).map((pid) => {
            const p = allPages().find((x) => x.id === pid)!
            return (
              <li key={pid} className="flex">
                <Link href={menuHref(p)} className="group flex w-full items-center justify-between gap-6 rounded-md bg-surface p-6 transition-colors hover:bg-placeholder sm:p-7">
                  <span className="flex flex-col gap-1">
                    <span className="text-small text-ink-muted">Next step</span>
                    <span className="text-h4 font-normal">{p.name}</span>
                    <span className="text-small text-ink-secondary">{p.blurb}</span>
                  </span>
                  <ArrowRightIcon className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
