"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import { CheckIcon, PhoneCallIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { agentsPage as c } from "@/content/pages/agents"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Everything around the conversation": three equal cards in the homepage's
 * style (grey panel, light inset), Before, During and After the call. A thin
 * rail runs through the tops of the cards with each stage's number on it;
 * it draws across once when the row comes into view. Each card: stage, title,
 * one line, and one focused visual at a shared height. Sample data (Maya
 * Patel, Ria, Halden Energy).
 */

const INSET = "flex h-60 flex-col overflow-hidden rounded-md border border-line bg-background text-small"

function Check() {
  return <CheckIcon weight="bold" className="size-3.5 shrink-0 text-[oklch(0.55_0.13_150)]" />
}
function LiveDot() {
  return <span className="size-1.5 rounded-full bg-[oklch(0.6_0.15_150)]" />
}
function Row({ k, v, first = false }: { k: string; v: React.ReactNode; first?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 px-4 py-2.5", !first && "border-t border-line")}>
      <span className="text-ink-muted">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  )
}

/** Before: who's calling, before hello. */
function Before() {
  return (
    <div aria-hidden className={INSET}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-label text-background">MP</span>
        <span className="flex min-w-0 flex-col">
          <span>Maya Patel</span>
          <span className="text-label text-ink-muted">HLD-482913</span>
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-label">
          <Check />
          Briefed
        </span>
      </div>
      <Row first k="Balance" v="£86.40 · due 4 March" />
      <Row k="Plan" v="Green Fixed 12m" />
      <Row k="Last call" v="Promised to pay by 28 Feb" />
      <div className="mt-auto flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-label text-ink-secondary">
        Customer profiles
        <span className="rounded-full border border-line-strong px-2 py-px text-[11px] text-ink-muted">Coming soon</span>
      </div>
    </div>
  )
}

/** During: a person picks up with the full story. */
function During() {
  return (
    <div aria-hidden className={INSET}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex flex-col">
          <span>Transfer to Billing</span>
          <span className="text-label text-ink-muted">Priya picks up</span>
        </span>
        <span className="flex items-center gap-1.5 text-label">
          <LiveDot />
          Ringing
        </span>
      </div>
      <div className="flex flex-col gap-2.5 px-4 py-3">
        <span className="text-label text-ink-muted">Summary for Priya</span>
        {["Disputes a £40 estimated reading", "Meter photo received", "Identity verified"].map((t) => (
          <span key={t} className="flex items-center gap-2.5">
            <Check />
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-label text-ink-secondary">
        <span>Office hours · 9:00–18:00</span>
        <span>After: callback</span>
      </div>
    </div>
  )
}

/** After: change it safely, test it, publish. */
function After() {
  return (
    <div aria-hidden className={INSET}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex flex-col">
          <span>Ria · Billing</span>
          <span className="text-label text-ink-muted">v12 live since 2 March</span>
        </span>
        <span className="flex items-center gap-1.5 text-label">
          <LiveDot />
          Live
        </span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <span className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="font-mono text-label text-ink-muted">v13</span>
            Shorter disclosure
          </span>
          <span className="rounded-full border border-line px-2 py-0.5 text-label text-ink-secondary">Draft</span>
        </span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full bg-[oklch(0.62_0.14_150)]" />
          ))}
        </span>
        <span className="flex justify-between text-label text-ink-muted">
          Test calls <span className="text-foreground">3 of 3 passed</span>
        </span>
      </div>
      <div className="mt-auto flex gap-2 border-t border-line px-4 py-3 whitespace-nowrap">
        <span className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5">
          <PhoneCallIcon weight="fill" className="size-3.5" />
          Call me
        </span>
        <span className="ml-auto rounded-md bg-foreground px-3 py-1.5 text-background">Publish</span>
      </div>
    </div>
  )
}

const VISUALS = [Before, During, After]

export function Moments() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const on = reduce || seen
  const { title, line, moments } = c.around

  return (
    <Section id="agents-around">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} className="relative mt-14">
          {/* The rail through the cards' tops (desktop), drawn once. */}
          <div aria-hidden className="absolute top-0 right-[calc(33.333%-3.125rem)] left-[2.625rem] z-10 hidden h-px bg-line-strong lg:block">
            <span className={cn("absolute inset-y-0 left-0 bg-foreground transition-[width] duration-[1400ms] ease-(--ease-out)", on ? "w-full" : "w-0")} />
          </div>

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-3">
            {moments.map((m, i) => {
              const Visual = VISUALS[i]
              return (
                <li key={m.stage} className="flex">
                  <Panel className="relative flex w-full flex-col gap-5 p-6 pt-9 sm:p-7 sm:pt-10">
                    {/* Stage number, sitting on the rail */}
                    <span
                      className={cn(
                        "absolute top-0 left-6 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border font-mono text-label transition-colors duration-500 sm:left-7",
                        on ? "border-foreground bg-foreground text-background" : "border-line-strong bg-background text-ink-muted"
                      )}
                      style={{ transitionDelay: reduce ? "0ms" : `${200 + i * 450}ms` }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-label text-ink-muted">{m.stage}</span>
                      <h3 className="text-h4 font-normal">{m.title}</h3>
                      <p className="min-h-[2.8em] text-small text-ink-secondary">{m.body}</p>
                    </div>
                    <Visual />
                  </Panel>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
