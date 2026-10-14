import Link from "next/link"
import { ArrowRightIcon, ArrowsLeftRightIcon, CheckIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroCallCard } from "@/components/lab/hero-call-card"
import { AgentBuilderScreen } from "@/components/sections/how-it-works-v3"
import { ctas } from "@/content/draft"
import { agentsPage as c } from "@/content/pages/agents"
import { menuHref, platformMenu, type MenuPageId } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * Sections of /platform/agents, built from the homepage's recipes so the
 * two read as one site: the painted hero stage, grey panels holding light
 * inset tables (as in "Tested, scored and connected"), and the same section
 * header. Sample Halden Energy data throughout.
 */

export const pageHref = (id: MenuPageId) => menuHref(platformMenu.flatMap((g) => g.pages).find((p) => p.id === id)!)

/** The homepage's section header: heading and line. */
function Header({ title, body }: { title: string; body?: string }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-3">
      <h2 className="text-h2 font-normal">{title}</h2>
      {body && <p className="text-body text-ink-secondary">{body}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ hero */

export function AgentsHero() {
  return (
    <Section id="agents-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <p className="reveal text-small text-ink-muted">
          <Link href="/platform" className="hover:text-foreground">
            Platform
          </Link>{" "}
          / {c.crumb}
        </p>
        <h1 className="reveal mt-3 max-w-[20ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
          {c.title}
        </h1>
        <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
          {c.line}
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--i": 3 } as React.CSSProperties}>
          <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
            {ctas.demo.label}
          </Link>
          <TextLink href="#agents-listen">Hear a call</TextLink>
        </div>
      </Container>

      {/* The builder floating on the page, with three moments from a call around it (desktop). */}
      <Container className="mt-10 md:mt-14">
        <div className="reveal relative lg:px-[9%] lg:py-10" style={{ "--i": 4 } as React.CSSProperties}>
          <AgentBuilderScreen
            focus="all"
            className="h-[24rem] rounded-xl border border-black/10 shadow-[0_1px_2px_oklch(0.2_0_0/0.08),0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)] sm:h-[30rem] lg:h-[34rem]"
          />
          <FloatCard className="top-[4%] right-0 w-64" i={5}>
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-[oklch(0.95_0.05_85)]">
                <LightningIcon weight="fill" className="size-3.5 text-[oklch(0.62_0.14_70)]" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-label">take_payment</span>
                <span className="text-label text-ink-muted">£86.40 · card on file</span>
              </span>
              <span className="ml-auto flex items-center gap-1 text-label text-[oklch(0.5_0.13_150)]">
                <CheckIcon weight="bold" className="size-3" />
                1.2s
              </span>
            </div>
          </FloatCard>
          <FloatCard className="bottom-[8%] left-0 w-72" i={6}>
            <div className="flex items-center justify-between text-label text-ink-muted">
              <span>Live call · Maya Patel</span>
              <span className="flex items-center gap-1.5 text-foreground">
                <span className="size-1.5 rounded-full bg-[oklch(0.6_0.15_150)]" />
                00:42
              </span>
            </div>
            <p className="text-ink-secondary">Can I just pay the balance now?</p>
            <p>Done. £86.40 is paid and your receipt is on its way.</p>
          </FloatCard>
          <FloatCard className="right-[3%] bottom-0 w-60" i={7}>
            <span className="text-label text-ink-muted">Caller switched language</span>
            <span className="flex items-center gap-2">
              <span className="rounded-full border border-line px-2 py-0.5 text-label">Hindi</span>
              <ArrowsLeftRightIcon className="size-3.5 text-ink-muted" />
              <span className="rounded-full bg-foreground px-2 py-0.5 text-label text-background">English</span>
            </span>
          </FloatCard>
        </div>
      </Container>
    </Section>
  )
}

/** A small light card floating over the hero builder's edge (desktop only). */
function FloatCard({ className, i, children }: { className: string; i: number; children: React.ReactNode }) {
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

/* ------------------------------------------------- everything around the call */

/* ------------------------------------------------------ definition and proof */

export function Definition() {
  return (
    <Section id="agents-definition" spacing="tight">
      <Container className="grid gap-8 border-y border-line py-10 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-16">
        <p className="text-h3 font-normal">{c.definition}</p>
        <figure className="flex flex-col gap-2 lg:border-l lg:border-line lg:pl-10">
          <blockquote className="text-h4 font-normal">&ldquo;{c.proof.quote}&rdquo;</blockquote>
          <figcaption className="text-small text-ink-muted">{c.proof.by}</figcaption>
        </figure>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------- next step */

export function NextStep() {
  const pages = platformMenu.flatMap((g) => g.pages)
  return (
    <Section id="agents-next" spacing="tight">
      <Container>
        <ul className="grid gap-3 md:grid-cols-2">
          {c.related.map((id, i) => {
            const p = pages.find((x) => x.id === id)!
            return (
              <li key={id} className="flex">
                <Link href={menuHref(p)} className="group flex w-full items-center justify-between gap-6 rounded-md bg-surface p-6 transition-colors hover:bg-placeholder sm:p-7">
                  <span className="flex flex-col gap-1">
                    <span className="text-small text-ink-muted">{i === 0 ? "Next step" : "Also see"}</span>
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

/* ------------------------------------------------------------------ talk */

export function Talk() {
  return (
    <Section id="agents-listen">
      <Container>
        <Header title={c.talk.title} body={c.talk.line} />
        <div className="mt-10">
          <HeroCallCard plain />
        </div>
      </Container>
    </Section>
  )
}
