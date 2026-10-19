"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowRightIcon, BrainIcon, CheckIcon, LightningIcon, PhoneIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { workflowsPage as c } from "@/content/pages/workflows"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Workflows as tools" on the charcoal canvas, in three columns that read
 * left to right: the live call (a small, fast model talking), the tool
 * workflow it calls (three lookups in parallel, a larger reasoning model,
 * then an action), and the short summary handed back, which the main model
 * answers from. Plays once on view, then holds; reduced motion shows the
 * end. Columns stack below lg. Sample data and timings.
 */

const BEAT_MS = 1150
const LAST = 7

const LOOKUPS = [
  { name: "Billing API", result: "Two charges of $86.40 on 2 March" },
  { name: "CRM", result: "Customer since 2021 · no past refunds" },
  { name: "Refund policy", result: "Duplicate charges are refunded in full" },
]

const CANVAS = "rounded-xl border border-black/10 dark:border-(--ui-line) bg-(--ui-panel) bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] p-4 text-(--ui-text) shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)] sm:p-6"
const CARD = "flex flex-col rounded-xl border border-(--ui-line) bg-(--ui-raised)"
const HEAD = "flex items-center justify-between gap-3 border-b border-(--ui-line) px-4 py-3 text-[12px]"
const show = (on: boolean) => cn("transition-[opacity,translate] duration-500", on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")

export function ToolsStory() {
  const { label, title, line, notes } = c.tools
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const t = setTimeout(() => setBeat((b) => b + 1), beat < 0 ? 400 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, beat])

  const b = reduce ? LAST : beat
  const running = b >= 2 && b < 3
  const looked = b >= 3

  return (
    <Section id="workflows-tools" className="ui-scope scroll-mt-20">
      <Container>
        <div className="flex max-w-[48rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} aria-hidden className={cn(CANVAS, "mt-10 grid gap-3 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr] lg:items-stretch")}>
          {/* 1. The live call */}
          <div className={CARD}>
            <div className={HEAD}>
              <span className="flex items-center gap-2">
                <PhoneIcon className="size-3.5 text-(--ui-muted)" />
                Live call · Maya Patel
              </span>
              <span className="rounded-full bg-(--ui-raised) px-2 py-0.5 text-[11px] text-(--ui-muted)">Main model · small, fast</span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-4 text-[12.5px] leading-snug">
              <span className={cn(show(b >= 0), "max-w-[88%] self-end rounded-2xl rounded-br-sm bg-white px-3 py-2 text-black")}>I was charged twice this month. Can I get a refund?</span>
              <span className={cn(show(b >= 1), "max-w-[88%] self-start rounded-2xl rounded-bl-sm bg-(--ui-raised) px-3 py-2")}>Let me check that for you.</span>
              <span className={cn(show(b >= 1), "flex items-center gap-1.5 self-start rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-(--ui-text)")}>
                <LightningIcon weight="fill" className="size-3 text-(--warn-fg)" />
                calls refund_check
              </span>
              <span className={cn(show(b >= 7), "mt-auto max-w-[92%] self-start rounded-2xl rounded-bl-sm bg-(--ui-raised) px-3 py-2")}>
                You were charged twice. I&apos;ve refunded $86.40, and it&apos;ll show in 3 to 5 days.
              </span>
            </div>
          </div>

          <Arrow on={b >= 2} />

          {/* 2. The tool workflow */}
          <div className={CARD}>
            <div className={HEAD}>
              <span className="font-mono">refund_check</span>
              <span className="flex items-center gap-1.5 text-[11px] text-(--ui-muted)">
                <span className={cn("size-1.5 rounded-full", b >= 6 ? "bg-white/50" : b >= 2 ? "bg-(--ok) motion-safe:animate-pulse" : "bg-white/30")} />
                {b >= 6 ? "Done · 1.4 s" : b >= 2 ? "Running" : "Waiting"}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-4 text-[12px]">
              <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">In parallel</span>
              <ul className="flex flex-col gap-1.5">
                {LOOKUPS.map((l) => (
                  <li key={l.name} className={cn(show(b >= 2), "flex items-start gap-2.5 rounded-lg border px-3 py-2", running ? "border-white/40" : "border-(--ui-line)")}>
                    <span className={cn("mt-0.5 grid size-4 shrink-0 place-items-center rounded-full", looked ? "bg-(--ok)/18" : "bg-(--ui-raised)")}>
                      {looked ? <CheckIcon weight="bold" className="size-2.5 text-(--ok-fg)" /> : <span className="size-1 rounded-full bg-white/60 motion-safe:animate-pulse" />}
                    </span>
                    <span className="flex flex-col leading-snug">
                      <span>{l.name}</span>
                      <span className={cn("text-[11.5px] text-(--ui-muted) transition-opacity duration-500", looked ? "opacity-100" : "opacity-0")}>{l.result}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className={cn(show(b >= 4), "flex items-start gap-2.5 rounded-lg border border-(--var)/40 bg-(--var)/10 px-3 py-2.5")}>
                <BrainIcon weight="fill" className="mt-0.5 size-4 shrink-0 text-(--var-fg)" />
                <span className="flex flex-col leading-snug">
                  <span>Reasoning model · larger</span>
                  <span className="text-[11.5px] text-(--ui-muted)">Duplicate charge confirmed, within policy. Refund in full.</span>
                </span>
              </div>
              <div className={cn(show(b >= 5), "flex items-center gap-2.5 rounded-lg border border-(--ui-line) px-3 py-2")}>
                <CheckIcon weight="bold" className="size-3.5 text-(--ok-fg)" />
                Refund issued · $86.40 · billing API
              </div>
            </div>
          </div>

          <Arrow on={b >= 6} />

          {/* 3. What comes back */}
          <div className={CARD}>
            <div className={HEAD}>
              <span>Returned to the call</span>
              <span className="text-[11px] text-(--ui-muted)">A short summary</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <pre className={cn(show(b >= 6), "overflow-x-auto rounded-lg bg-black/25 p-3 font-mono text-[11.5px] leading-relaxed text-(--ui-text)")}>
                {`{
  "eligible": true,
  "refunded": 86.40,
  "arrives": "3–5 days",
  "say": "Duplicate charge, refunded"
}`}
              </pre>
              <p className={cn(show(b >= 7), "text-[12px] leading-snug text-(--ui-muted)")}>The main model reads this and answers in one sentence. It never had to wait on the lookups or the reasoning.</p>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map((n) => (
            <li key={n.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="text-body">{n.title}</span>
              <span className="text-small text-ink-secondary">{n.body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function Arrow({ on }: { on: boolean }) {
  return (
    <span className="hidden items-center justify-center lg:flex">
      <ArrowRightIcon className={cn("size-4 transition-colors duration-500", on ? "text-(--ui-text)" : "text-(--ui-muted)/60")} />
    </span>
  )
}
