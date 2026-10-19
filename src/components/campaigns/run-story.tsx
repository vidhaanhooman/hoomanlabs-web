"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowClockwiseIcon, CheckIcon, PhoneIcon, ProhibitIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { campaignsPage as c } from "@/content/pages/campaigns"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "A campaign, running", on the console's charcoal canvas, as live call
 * lanes: three lines dial in parallel, each from its own rotating caller
 * ID. A contact enters a lane, rings, talks (or doesn't), lands on an
 * outcome and drops into one of three trays below: Done, Retry later, or
 * Skipped (DND and already-contacted numbers never reach a lane). Near the
 * end a retry comes back round and gets through. Plays once when on
 * screen, then holds; reduced motion shows the finished run. Responsive,
 * not scaled. Sample data.
 */

type Kind = "done" | "retry" | "skip"
type Call = {
  name: string
  lane: number
  start: number
  /** Ticks spent ringing, then talking. */
  ring: number
  talk: number
  outcome: string
  kind: Kind
  /** For retries: when it's tried again. */
  next?: string
  /** A retry of someone earlier (moves them from Retry later to Done). */
  retryOf?: string
}

const LANES = ["+1 555 0100", "+1 555 0101", "+1 555 0102"]

const CALLS: Call[] = [
  { name: "Maya Patel", lane: 0, start: 1, ring: 1, talk: 2, outcome: "Promise to pay · 4 Mar", kind: "done" },
  { name: "Daniel Brooks", lane: 1, start: 1, ring: 3, talk: 0, outcome: "No answer", kind: "retry", next: "in 2 hours" },
  { name: "Ravi Shah", lane: 2, start: 1, ring: 1, talk: 0, outcome: "Busy", kind: "retry", next: "in 30 min" },
  { name: "Priya Shah", lane: 2, start: 3, ring: 1, talk: 2, outcome: "Paid on the call", kind: "done" },
  { name: "Omar Haddad", lane: 0, start: 5, ring: 2, talk: 0, outcome: "Voicemail", kind: "retry", next: "tomorrow 10:00" },
  { name: "Sara Kim", lane: 1, start: 5, ring: 1, talk: 3, outcome: "Callback booked · Thu", kind: "done" },
  { name: "Ravi Shah", lane: 2, start: 7, ring: 1, talk: 2, outcome: "Paid on the call", kind: "done", retryOf: "Ravi Shah" },
  { name: "Emma Stone", lane: 0, start: 8, ring: 1, talk: 2, outcome: "Promise to pay · 6 Mar", kind: "done" },
]
const SKIPS = [
  { name: "Leo Grant", at: 2, reason: "On the DND list" },
  { name: "Nina Park", at: 4, reason: "Already contacted" },
]

const end = (x: Call) => x.start + x.ring + x.talk
const LAST = Math.max(...CALLS.map(end)) + 2
const TICK_MS = 950

const CANVAS =
  "rounded-xl border border-black/10 dark:border-(--ui-line) bg-(--ui-panel) bg-[radial-gradient(circle,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:18px_18px] p-4 text-(--ui-text) shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)] sm:p-6"

export function RunStory() {
  const { label, title, line } = c.run
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [tick, setTick] = useState(0)
  const t = reduce ? LAST : tick

  useEffect(() => {
    if (!seen || reduce || tick >= LAST) return
    const id = setTimeout(() => setTick((v) => v + 1), TICK_MS)
    return () => clearTimeout(id)
  }, [seen, reduce, tick])

  // Finished calls (shown for one tick in the lane, then in a tray).
  const finished = CALLS.filter((x) => t > end(x))
  const retried = new Set(finished.filter((x) => x.retryOf).map((x) => x.retryOf))
  const done = finished.filter((x) => x.kind === "done")
  const retry = finished.filter((x) => x.kind === "retry" && !retried.has(x.name))
  const skipped = SKIPS.filter((x) => t >= x.at)
  const live = CALLS.filter((x) => t >= x.start && t <= end(x)).length

  return (
    <Section id="campaigns-run" className="ui-scope">
      <Container>
        <div className="flex max-w-[48rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} aria-hidden className={cn(CANVAS, "mt-10 flex flex-col gap-4")}>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[13px]">
            <span className="flex items-center gap-2.5">
              March payment reminders
              <span className="rounded-full bg-(--ui-raised) px-2 py-0.5 text-[11px] text-(--ui-muted)">Outreach · Batch</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[11.5px] text-(--ui-text)">
              <span className={cn("size-1.5 rounded-full", t >= LAST ? "bg-white/40" : "bg-(--ok) motion-safe:animate-pulse")} />
              {t >= LAST ? "Pass complete" : `${live} of 3 lines calling`}
            </span>
          </div>

          {/* Lanes */}
          <ol className="flex flex-col gap-2">
            {LANES.map((num, lane) => {
              const cur = CALLS.find((x) => x.lane === lane && t >= x.start && t <= end(x))
              return (
                <li key={num} className="grid items-center gap-x-4 gap-y-2 rounded-xl border border-(--ui-line) bg-white/[0.03] p-3 sm:grid-cols-[9.5rem_1fr]">
                  <span className="flex items-center gap-2 text-[11.5px] text-(--ui-muted) sm:flex-col sm:items-start sm:gap-0.5">
                    <span>Line {lane + 1}</span>
                    <span className="font-mono text-(--ui-text)">{num}</span>
                  </span>
                  <div className="relative flex h-14 items-center">
                    <span aria-hidden className="absolute inset-x-0 top-1/2 border-t border-dashed border-(--ui-line)" />
                    {cur ? <CallCard key={`${cur.name}-${cur.start}`} call={cur} t={t} /> : <span className="relative rounded-full bg-(--ui-panel) px-2 text-[11.5px] text-(--ui-muted)/60">{t >= LAST ? "Line free" : "Next contact…"}</span>}
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Trays */}
          <div className="grid gap-2 md:grid-cols-3">
            <Tray icon={CheckIcon} title="Done" tone="text-(--ok-fg)" items={done.map((x) => [x.name + (x.retryOf ? " (retry)" : ""), x.outcome])} />
            <Tray icon={ArrowClockwiseIcon} title="Retry later" tone="text-(--warn-fg)" items={retry.map((x) => [x.name, `${x.outcome} · ${x.next}`])} />
            <Tray icon={ProhibitIcon} title="Skipped before dialling" tone="text-(--ui-muted)" items={skipped.map((x) => [x.name, x.reason])} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** The contact on a line right now: ringing, talking, or its outcome. */
function CallCard({ call, t }: { call: Call; t: number }) {
  const ringing = t < call.start + call.ring
  const talking = !ringing && t < end(call)
  const outcome = t >= end(call)
  return (
    <div className="relative flex min-w-0 items-center gap-3 rounded-full border border-(--ui-line) bg-(--ui-raised) py-1.5 pr-4 pl-1.5 shadow-[0_8px_20px_-10px_oklch(0_0_0/0.6)] motion-safe:animate-[lang-in_350ms_ease-out]">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--ui-raised) text-[12px]">{call.name.split(" ").map((p) => p[0]).join("")}</span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-[13px]">
          {call.name}
          {call.retryOf && <span className="ml-1.5 text-[11px] text-(--ui-muted)">retry</span>}
        </span>
        <span className="flex items-center gap-1.5 text-[11.5px] text-(--ui-muted)">
          {ringing && (
            <>
              <PhoneIcon weight="fill" className="size-3 motion-safe:animate-pulse" />
              Ringing…
            </>
          )}
          {talking && (
            <>
              <Wave />
              Talking to Ria
            </>
          )}
          {outcome && (
            <span className={cn("rounded-full px-2 py-px text-[11px]", call.kind === "done" ? "bg-(--ok)/18 text-(--ok-fg)" : "bg-(--warn)/18 text-(--warn-fg)")}>
              {call.outcome}
              {call.next && ` · retry ${call.next}`}
            </span>
          )}
        </span>
      </span>
    </div>
  )
}

function Wave() {
  return (
    <span className="ui-wave flex h-3 items-center gap-[2px]">
      {[5, 9, 12, 7, 10].map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-current" style={{ height: h, animationDelay: `${i * 90}ms` }} />
      ))}
    </span>
  )
}

function Tray({ icon: Icon, title, tone, items }: { icon: React.ElementType; title: string; tone: string; items: [string, string][] }) {
  return (
    <div className="flex min-h-[8.5rem] flex-col rounded-xl border border-(--ui-line) bg-white/[0.03] p-3">
      <span className="flex items-center justify-between px-1 pb-2 text-[12px]">
        <span className={cn("flex items-center gap-1.5", tone)}>
          <Icon weight="bold" className="size-3.5" />
          {title}
        </span>
        <span className="font-mono text-(--ui-muted) tabular-nums">{items.length}</span>
      </span>
      <ul className="flex flex-col gap-1">
        {items.map(([name, note]) => (
          <li key={name} className="flex items-baseline justify-between gap-3 rounded-md bg-white/[0.04] px-2.5 py-1.5 text-[12px] motion-safe:animate-[lang-in_350ms_ease-out]">
            <span className="truncate">{name}</span>
            <span className="shrink-0 text-[11px] text-(--ui-muted)">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
