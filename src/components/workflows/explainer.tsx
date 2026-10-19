"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowRightIcon, CheckIcon, LightningIcon, SparkleIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { workflowsPage as c } from "@/content/pages/workflows"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "How a workflow works", for people new to the idea: a plain-language intro
 * and an everyday comparison, then the four parts of every workflow as cards
 * (something happens, it decides, it does the work, it reports back), each
 * with a sentence, a real example and a small visual. A line joins the cards
 * and draws across once when the row comes into view, lighting each part in
 * turn; then everything holds. Reduced motion: shown complete. Sample data
 * (Maya Patel, Halden Energy).
 */

const STEP_MS = 650
const INSET = "flex h-32 flex-col justify-center gap-2 rounded-md border border-line bg-background px-3.5 text-small"

function Ok() {
  return <CheckIcon weight="bold" className="size-3.5 shrink-0 text-success" />
}

const VISUALS: Record<string, () => React.ReactNode> = {
  trigger: () => (
    <div aria-hidden className={INSET}>
      {["call.ended", "form.submitted", "payment.missed"].map((e, i) => (
        <span key={e} className={cn("flex items-center gap-2 font-mono text-label", i === 0 ? "text-foreground" : "text-ink-muted")}>
          <LightningIcon weight="fill" className={cn("size-3.5", i === 0 ? "text-(--warn)" : "text-ink-muted")} />
          {e}
        </span>
      ))}
    </div>
  ),
  decide: () => (
    <div aria-hidden className={INSET}>
      <span className="text-label text-ink-secondary">&ldquo;I&apos;ll clear it on the 4th.&rdquo;</span>
      <span className="flex items-center gap-1.5 text-label text-ink-muted">
        <SparkleIcon weight="fill" className="size-3 text-ai" />
        AI step
        <ArrowRightIcon className="size-3" />
      </span>
      <span className="w-fit rounded-md bg-surface px-2 py-1 font-mono text-[11px]">outcome: promise_to_pay</span>
    </div>
  ),
  act: () => (
    <div aria-hidden className={INSET}>
      {["CRM updated", "Reminder set for the 3rd", "SMS sent"].map((t) => (
        <span key={t} className="flex items-center gap-2">
          <Ok />
          {t}
        </span>
      ))}
    </div>
  ),
  report: () => (
    <div aria-hidden className={INSET}>
      <span className="flex justify-between font-mono text-label">
        <span className="text-ink-muted">10:06:02</span>run complete
      </span>
      <span className="flex justify-between font-mono text-label">
        <span className="text-ink-muted">duration</span>1.2s
      </span>
      <span className="flex items-center gap-2 text-label text-ink-secondary">
        <Ok />
        Logged for the team
      </span>
    </div>
  ),
}

export function Explainer() {
  const { title, intro, analogy, steps } = c.explainer
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [lit, setLit] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || lit >= steps.length - 1) return
    const t = setTimeout(() => setLit((l) => l + 1), lit < 0 ? 200 : STEP_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, lit, steps.length])

  const shown = reduce ? steps.length - 1 : lit

  return (
    <Section id="workflows-explainer">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body-lg text-ink-secondary">{intro}</p>
          <p className="text-body text-ink-muted">{analogy}</p>
        </div>

        <div ref={ref} className="relative mt-14">
          {/* The line joining the four parts (desktop), drawn across once */}
          <div aria-hidden className="absolute top-0 right-[calc(25%-3.1875rem)] left-[2.625rem] z-10 hidden h-px bg-line-strong lg:block">
            <span
              className="absolute inset-y-0 left-0 bg-foreground transition-[width] ease-linear"
              style={{ width: `${(Math.max(0, shown) / (steps.length - 1)) * 100}%`, transitionDuration: reduce ? "0ms" : `${STEP_MS}ms` }}
            />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {steps.map((s, i) => {
              const on = i <= shown
              const Visual = VISUALS[s.id]
              return (
                <li key={s.id} className="flex">
                  <Panel
                    className={cn(
                      "relative flex w-full flex-col gap-4 p-6 pt-9 transition-[opacity,translate] duration-500 ease-(--ease-out) sm:p-7 sm:pt-10",
                      on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0 left-6 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border font-mono text-label transition-colors duration-300 sm:left-7",
                        on ? "border-foreground bg-foreground text-background" : "border-line-strong bg-background text-ink-muted"
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-h4 font-normal">{s.name}</h3>
                      <p className="min-h-[4.5em] text-small text-ink-secondary">{s.body}</p>
                    </div>
                    <Visual />
                    <p className="border-t border-line pt-3 text-small">
                      <span className="text-ink-muted">Example: </span>
                      {s.example}
                    </p>
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
