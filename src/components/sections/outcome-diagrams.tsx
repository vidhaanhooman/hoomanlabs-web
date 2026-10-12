"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Outcomes in the site's own language: three panels, each with a small live
 * scene from the work itself (calls picked up instantly, leads called back,
 * tasks closing on their own), a number that counts up, and the outcome.
 * Scenes loop while visible; reduced motion shows the finished state.
 * Figures are placeholders to confirm.
 */

const ITEMS = [
  {
    key: "cx",
    tag: "Customer experience",
    value: 0.8,
    format: (v: number) => `${v.toFixed(1)}s`,
    label: "average time to answer",
    body: "No queue, no hold music. Every caller is greeted in their own language and most leave with the problem solved.",
    Scene: CallsScene,
  },
  {
    key: "growth",
    tag: "Growth",
    value: 3,
    format: (v: number) => `${v.toFixed(1)}×`,
    label: "more leads reached in the first hour",
    body: "New leads get a call within minutes, missed calls get a callback, and lapsed customers hear from you again.",
    Scene: LeadsScene,
  },
  {
    key: "ops",
    tag: "Efficiency",
    value: 71,
    format: (v: number) => `${Math.round(v)}%`,
    label: "of conversations closed without a person",
    body: "Payments moved, slots booked and records updated during the call, so your team only picks up what needs judgment.",
    Scene: TasksScene,
  },
]

/** Counts from 0 to `to` once, when first visible. */
function CountUp({ to, format, start }: { to: number; format: (v: number) => string; start: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, to])
  return <>{format(v)}</>
}

export function OutcomeDiagrams() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const seen = useInView(ref, { amount: 0.4, once: true })
  const reduce = usePrefersReducedMotion()
  const live = inView && !reduce
  return (
    <Section id="sl-outcomes">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What changes when agents take the calls.</h2>
          <p className="text-body text-ink-secondary">Three things teams measure in the first month.</p>
        </div>
        <div ref={ref} className="mt-10 grid gap-3 md:grid-cols-3">
          {ITEMS.map(({ key, tag, value, format, label, body, Scene }) => (
            <Panel key={key} className="flex flex-col gap-6 p-6">
              <div aria-hidden className="relative h-40 overflow-hidden rounded-md border border-line bg-background">
                <Scene live={live} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-label text-ink-muted">{tag}</span>
                <span className="text-display font-normal tabular-nums">
                  {reduce ? format(value) : <CountUp to={value} format={format} start={seen} />}
                </span>
                <span className="text-small text-ink-secondary">{label}</span>
              </div>
              <p className="border-t border-line pt-4 text-small text-ink-secondary">{body}</p>
            </Panel>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ scenes */

function useTick(live: boolean, ms: number, count: number) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setN((x) => (x + 1) % count), ms)
    return () => clearInterval(t)
  }, [live, ms, count])
  return live ? n : count - 1
}

/** Calls arrive and are picked up the moment they land: no queue forms. */
function CallsScene({ live }: { live: boolean }) {
  const n = useTick(live, 900, 6)
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-5">
      {[0, 1, 2].map((r) => {
        const answered = (n + r) % 3 !== 0
        return (
          <div key={r} className="flex items-center gap-3">
            <span className="w-14 font-mono text-[11px] text-ink-muted">+91 ••{r}4</span>
            <span className="relative h-px flex-1 bg-line-strong">
              <span
                className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-foreground transition-[left] duration-700 ease-(--ease-out)"
                style={{ left: answered ? "calc(100% - 8px)" : "0%" }}
              />
            </span>
            <span
              className={cn(
                "flex w-24 items-center justify-end gap-1.5 text-[11px] transition-opacity duration-300",
                answered ? "opacity-100" : "opacity-40"
              )}
            >
              <span className={cn("size-1.5 rounded-full", answered ? "bg-[oklch(0.62_0.15_150)]" : "bg-ink-muted")} />
              {answered ? "Answered 0.8s" : "Ringing"}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/** Leads drop in and get a call within minutes; the week's bars fill up. */
function LeadsScene({ live }: { live: boolean }) {
  const n = useTick(live, 700, 9)
  const bars = [3, 5, 4, 7, 6, 9, 8, 11]
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center justify-between text-[11px] text-ink-muted">
        <span>Leads called within 5 min</span>
        <span className="font-mono text-foreground tabular-nums">{Math.min(n + 1, 8) * 12}</span>
      </div>
      <div className="flex h-20 items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-sm transition-[height,background-color] duration-500 ease-(--ease-out)",
              i < n ? "bg-foreground" : "bg-line"
            )}
            style={{ height: i < n ? `${h * 9}%` : "8%" }}
          />
        ))}
      </div>
    </div>
  )
}

/** A to-do list that closes itself, one task at a time. */
function TasksScene({ live }: { live: boolean }) {
  const n = useTick(live, 900, 6)
  const tasks = ["Payment moved to Friday", "Slot booked Thu 10:00", "CRM record updated", "Summary sent to team"]
  return (
    <ul className="flex h-full flex-col justify-center gap-2 px-5 text-[12px]">
      {tasks.map((t, i) => {
        const done = i < n
        return (
          <li key={t} className="flex items-center gap-2.5">
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                done ? "border-foreground bg-foreground text-background" : "border-line-strong"
              )}
            >
              {done && (
                <svg viewBox="0 0 10 10" className="size-2.5">
                  <path d="M2,5 L4.2,7 L8,3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className={cn("transition-colors duration-300", done ? "text-foreground" : "text-ink-muted")}>{t}</span>
          </li>
        )
      })}
    </ul>
  )
}
