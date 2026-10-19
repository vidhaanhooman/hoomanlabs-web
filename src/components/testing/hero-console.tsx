"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, PhoneTransferIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react"

import { FROSTED, HERO_CARD, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/testing hero visual: big numbers and a stream, floating
 * directly on the landscape backdrop, as on Campaigns. Top, four see-through
 * stat tiles (scenarios run, passed, failed, pass rate) and a thin progress
 * line for Ria's v13 test run. Below, one dark card streams the scenarios as
 * they finish: each lands at the top and the older ones step down and fade,
 * ending on one still running, which then passes. The run holds on its
 * result: two scenarios to fix before publishing. On view the numbers count
 * up and the scenarios land one by one (adding to the numbers), then it
 * holds. Reduced motion: the final state. Sample data (Halden Energy, Ria).
 */

const DESIGN_W = 1100
const DESIGN_H = 584
const BEAT_MS = 1100
const COUNT_MS = 1400
const ROW_H = 50
const TOTAL = 120

type Result = "passed" | "transferred" | "failed"

/** Scenarios in the order they land in the stream; the last one runs, then passes. */
type Scenario = { name: string; persona: string; checked: string; turns: number; result: Result; note?: string }

const SCENARIOS: Scenario[] = [
  { name: "Angry caller wants a refund", persona: "Angry", checked: "Stayed calm, refunded the double charge of $86.40", turns: 9, result: "passed" },
  { name: "Switches to Hindi mid-call", persona: "Switches language", checked: "Replied in Hindi and kept the account details", turns: 7, result: "passed" },
  { name: "Reads card number slowly", persona: "Reads numbers slowly", checked: "Waited for every digit before replying", turns: 8, result: "failed", note: "Interrupted at turn 5" },
  { name: "Asks for a human", persona: "Rushed", checked: "Handed over to the billing team with a summary", turns: 4, result: "transferred" },
  { name: "Disputes the amount", persona: "Calm", checked: "Read the correct amount, $142.00, and the due date", turns: 11, result: "passed" },
  { name: "Elderly caller, asks to repeat", persona: "Elderly", checked: "Repeated clearly, at a slower pace", turns: 12, result: "passed" },
]
const LAST_ROW = SCENARIOS.length - 1
/** One more beat after the last row lands: it finishes. */
const LAST_BEAT = SCENARIOS.length

/** Counter bases; the scenarios above add the last few as they finish. */
const BASE = { run: 114, passed: 113, failed: 1 }

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

function Wave() {
  return (
    <span className="ui-wave inline-flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="block h-full w-[2.5px] rounded-full bg-(--ui-live)" />
      ))}
    </span>
  )
}

function ResultChip({ s, running }: { s: Scenario; running: boolean }) {
  if (running)
    return (
      <span className="flex items-center gap-2 text-(--ui-text)">
        <Wave />
        Running
      </span>
    )
  if (s.result === "failed")
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-(--fail)/40 bg-(--fail)/10 px-2.5 py-0.5 text-[12px] text-(--ui-text)">
        <XIcon weight="bold" className="size-3 text-(--fail-fg)" />
        Failed · {s.note}
      </span>
    )
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-(--ui-live)/40 bg-(--ui-live)/12 px-2.5 py-0.5 text-[12px] text-(--ui-text)">
      {s.result === "transferred" ? <PhoneTransferIcon className="size-3 text-(--ui-live)" /> : <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />}
      {s.result === "transferred" ? "Passed · transferred" : "Passed"}
    </span>
  )
}

export function TestingConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)
  const [t, setT] = useState(0)

  // Scenarios land one beat at a time, the last one finishes, then it holds.
  useEffect(() => {
    if (!seen || reduce || beat >= LAST_BEAT) return
    const id = setTimeout(() => setBeat((x) => x + 1), beat < 0 ? 600 : BEAT_MS)
    return () => clearTimeout(id)
  }, [seen, reduce, beat])

  // Numbers count up once, on view.
  useEffect(() => {
    if (!seen || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      // rAF can report a time just before `start`, so clamp at 0 (else counts go negative).
      const p = Math.min(1, Math.max(0, (now - start) / COUNT_MS))
      setT(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, reduce])

  const b = reduce ? LAST_BEAT : beat
  const k = reduce ? 1 : ease(t)
  const top = Math.min(b, LAST_ROW)
  const finished = b >= LAST_BEAT
  const done = SCENARIOS.filter((_, i) => i <= top && (i < LAST_ROW || finished))
  const run = Math.round(BASE.run * k) + done.length
  const passed = Math.round(BASE.passed * k) + done.filter((s) => s.result !== "failed").length
  const failed = Math.round(BASE.failed * k) + done.filter((s) => s.result === "failed").length
  const rate = run > 0 ? Math.round((passed / run) * 100) : 0
  const pct = (run / TOTAL) * 100

  const counters = [
    { label: "Scenarios run", value: String(run) },
    { label: "Passed", value: String(passed) },
    { label: "Failed", value: String(failed) },
    { label: "Pass rate", value: `${rate}%` },
  ]

  return (
    <HeroConsole image="/art/product/testing-backdrop.webp" designW={DESIGN_W} designH={DESIGN_H}>
      {/* Transparent stage: ui-dark only for its tokens, so the backdrop shows through. */}
      <div ref={box} aria-hidden className="ui-dark relative size-full" style={{ background: "transparent" }}>
        {/* Big numbers */}
        <div className="absolute top-0 left-10 grid w-[1020px] grid-cols-4 gap-4">
          {counters.map((c) => (
            <span key={c.label} className={cn(FROSTED, "flex flex-col gap-3 px-5 pt-4 pb-5")}>
              <span className="text-[13px] text-white/70">{c.label}</span>
              <span className="text-[44px] leading-none font-normal tracking-tight tabular-nums">{c.value}</span>
            </span>
          ))}
        </div>

        {/* Progress line */}
        <div className={cn(FROSTED, "absolute top-[136px] left-10 flex w-[1020px] flex-col gap-2 rounded-full px-5 py-2.5")}>
          <span className="flex items-center gap-2 text-[12.5px] text-white/70">
            <span className="text-white">Ria · Billing</span>
            <span className="text-white/35">·</span>
            <span>v13 draft</span>
            <span className="text-white/35">·</span>
            <span>Test run</span>
            <span className="text-white/35">·</span>
            <span>
              <span className="text-white tabular-nums">{passed}</span> of {TOTAL} passed
            </span>
            <span className="text-white/35">·</span>
            <span className="flex items-center gap-1.5 text-white">
              <span className={cn("size-1.5 rounded-full", finished ? "bg-white/50" : "bg-(--ui-live)")} />
              {finished ? "Finished" : "Running"}
            </span>
            <span className="ml-auto tabular-nums">{Math.round(pct)}%</span>
          </span>
          <span className="h-[3px] overflow-hidden rounded-full bg-white/15">
            <span className="block h-full rounded-full bg-(--ui-live)" style={{ width: `${pct}%` }} />
          </span>
        </div>

        {/* The stream */}
        <div className={cn(HERO_CARD, "absolute top-[204px] left-10 flex w-[1020px] flex-col")}>
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--ui-line) px-4">
            <span>Test run · v13</span>
            {finished ? (
              <span className="flex items-center gap-1.5 text-[12px] text-(--ui-text)">
                <WarningCircleIcon className="size-3.5 text-(--fail-fg)" />
                {failed} to fix before publishing
              </span>
            ) : (
              <span className="text-[12px] text-(--ui-muted)">Halden Energy · Billing suite</span>
            )}
          </div>
          <div className="grid grid-cols-[270px_1fr_56px_230px] items-center gap-4 border-b border-(--ui-line) px-4 py-2 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">
            <span>Scenario</span>
            <span>What it checked</span>
            <span className="text-right">Turns</span>
            <span className="text-right">Result</span>
          </div>
          {/* Grows a row per landed scenario, so the card never sits half empty. */}
          <div
            className={cn("relative overflow-hidden", !reduce && "transition-[height] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]")}
            style={{ height: Math.max(1, top + 1) * ROW_H }}
          >
            {SCENARIOS.map((s, i) => {
              const on = i <= top
              const pos = top - i
              const running = i === LAST_ROW && !finished
              return (
                <div
                  key={s.name}
                  className={cn(
                    "absolute inset-x-0 top-0 grid grid-cols-[270px_1fr_56px_230px] items-center gap-4 px-4",
                    !reduce && "transition-[translate,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    pos > 0 && "border-t border-(--ui-line)"
                  )}
                  style={{
                    height: ROW_H,
                    translate: `0 ${on ? pos * ROW_H : -ROW_H * 0.6}px`,
                    opacity: on ? 1 - pos * 0.12 : 0,
                  }}
                >
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate">{s.name}</span>
                    <span className="text-[11.5px] text-(--ui-muted)">Persona · {s.persona}</span>
                  </span>
                  <span className="truncate text-[12.5px] text-(--ui-muted)">{s.checked}</span>
                  <span className="text-right font-mono text-[11.5px] text-(--ui-muted) tabular-nums">{running ? "–" : s.turns}</span>
                  <span className="flex justify-end text-[12px]">
                    <ResultChip s={s} running={running} />
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
