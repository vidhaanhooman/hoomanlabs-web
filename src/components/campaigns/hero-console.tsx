"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowClockwiseIcon, CheckIcon, ClockIcon } from "@phosphor-icons/react"

import { FROSTED, HERO_CARD, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/campaigns hero visual: big numbers and a stream, floating
 * directly on the landscape backdrop. Top, four see-through stat tiles
 * (called, connected, promise to pay, callbacks booked) and a thin progress
 * line for the March payment reminders run. Below, one dark card streams the
 * calls as they finish: each lands at the top and the older ones step down
 * and fade, ending on a call that is still talking. On view the numbers count
 * up, the calls land one by one (adding to the numbers), then it holds.
 * Reduced motion: the final state. Sample data (Halden Energy, Ria).
 */

const DESIGN_W = 1100
const DESIGN_H = 584
const BEAT_MS = 1100
const COUNT_MS = 1400
const ROW_H = 50

type Kind = "paid" | "promise" | "callback" | "voicemail" | "retry" | "talking"

/** Calls in the order they land in the stream. */
type Call = { name: string; detail: string; said: string; dur: string; kind: Kind; outcome?: string; connected: boolean }

const CALLS: Call[] = [
  { name: "Maya Patel", detail: "Due $86.40", said: "Paid on the call with the card on file", dur: "2:14", kind: "paid", outcome: "Paid $86.40", connected: true },
  { name: "Arjun Rao", detail: "Due $142.00", said: "“I'll pay after payday, on the 4th.”", dur: "3:02", kind: "promise", outcome: "Promise to pay · 4 Mar", connected: true },
  { name: "Priya Shah", detail: "Due $64.10", said: "“Can someone call me back on Thursday?”", dur: "1:48", kind: "callback", outcome: "Callback Thu", connected: true },
  { name: "Lena Fischer", detail: "Due $210.75", said: "No answer, trying again within quiet hours", dur: "0:00", kind: "retry", outcome: "Retry 4pm", connected: false },
  { name: "Ravi Menon", detail: "Due $98.20", said: "Left a short voicemail with the payment link", dur: "0:41", kind: "voicemail", outcome: "Voicemail", connected: false },
  { name: "Sam Okafor", detail: "Due $57.30", said: "Asking about a payment plan", dur: "0:52", kind: "talking", connected: true },
]
const LAST = CALLS.length - 1

const ELIGIBLE = 12_186

/** Counter bases; the calls above add the last few as they land. */
const COUNTERS = [
  { label: "Called", base: 7_406, add: () => true },
  { label: "Connected", base: 4_856, add: (c: Call) => c.connected },
  { label: "Promise to pay", base: 1_284, add: (c: Call) => c.kind === "promise" },
  { label: "Callbacks booked", base: 356, add: (c: Call) => c.kind === "callback" },
]

const fmt = (n: number) => n.toLocaleString("en-US")
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

function Outcome({ call }: { call: Call }) {
  if (call.kind === "talking")
    return (
      <span className="flex items-center gap-2 text-(--ui-text)">
        <Wave />
        Talking
      </span>
    )
  const good = call.kind === "paid" || call.kind === "promise"
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px]",
        good ? "border-(--ui-live)/40 bg-(--ui-live)/12 text-(--ui-text)" : "border-(--ui-line) text-(--ui-muted)",
        call.kind === "callback" && "text-(--ui-text)"
      )}
    >
      {good && <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />}
      {call.kind === "callback" && <ClockIcon className="size-3" />}
      {call.kind === "retry" && <ArrowClockwiseIcon className="size-3" />}
      {call.outcome}
    </span>
  )
}

export function CampaignConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)
  const [t, setT] = useState(0)

  // Calls land one beat at a time, then hold.
  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const id = setTimeout(() => setBeat((x) => x + 1), beat < 0 ? 600 : BEAT_MS)
    return () => clearTimeout(id)
  }, [seen, reduce, beat])

  // Numbers count up once, on view.
  useEffect(() => {
    if (!seen || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_MS)
      setT(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, reduce])

  const b = reduce ? LAST : beat
  const k = reduce ? 1 : ease(t)
  const landed = CALLS.slice(0, b + 1)
  const values = COUNTERS.map((c) => Math.round(c.base * k) + landed.filter(c.add).length)
  const pct = (values[0] / ELIGIBLE) * 100

  return (
    <HeroConsole image="/art/product/campaigns-backdrop.webp" designW={DESIGN_W} designH={DESIGN_H}>
      {/* Transparent stage: ui-dark only for its tokens, so the backdrop shows through. */}
      <div ref={box} aria-hidden className="ui-dark relative size-full" style={{ background: "transparent" }}>
        {/* Big numbers */}
        <div className="absolute top-0 left-10 grid w-[1020px] grid-cols-4 gap-4">
          {COUNTERS.map((c, i) => (
            <span key={c.label} className={cn(FROSTED, "flex flex-col gap-3 px-5 pt-4 pb-5")}>
              <span className="text-[13px] text-white/70">{c.label}</span>
              <span className="text-[44px] leading-none font-normal tracking-tight tabular-nums">{fmt(values[i])}</span>
            </span>
          ))}
        </div>

        {/* Progress line */}
        <div className={cn(FROSTED, "absolute top-[136px] left-10 flex w-[1020px] flex-col gap-2 rounded-full px-5 py-2.5")}>
          <span className="flex items-center gap-2 text-[12.5px] text-white/70">
            <span>
              <span className="text-white tabular-nums">{fmt(values[0])}</span> of {fmt(ELIGIBLE)} eligible
            </span>
            <span className="text-white/35">·</span>
            <span>March payment reminders</span>
            <span className="text-white/35">·</span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="size-1.5 rounded-full bg-(--ui-live)" />
              Running
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
            <span>Latest calls</span>
            <span className="text-[12px] text-(--ui-muted)">Agent · Ria, Billing</span>
          </div>
          <div className="grid grid-cols-[230px_1fr_70px_210px] items-center gap-4 border-b border-(--ui-line) px-4 py-2 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">
            <span>Customer</span>
            <span>What happened</span>
            <span className="text-right">Length</span>
            <span className="text-right">Outcome</span>
          </div>
          {/* Grows a row per landed call, so the card never sits half empty. */}
          <div
            className={cn("relative overflow-hidden", !reduce && "transition-[height] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]")}
            style={{ height: Math.max(1, landed.length) * ROW_H }}
          >
            {CALLS.map((c, i) => {
              const on = i <= b
              const pos = b - i
              return (
                <div
                  key={c.name}
                  className={cn(
                    "absolute inset-x-0 top-0 grid grid-cols-[230px_1fr_70px_210px] items-center gap-4 px-4",
                    !reduce && "transition-[translate,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    pos > 0 && "border-t border-(--ui-line)"
                  )}
                  style={{
                    height: ROW_H,
                    translate: `0 ${on ? pos * ROW_H : -ROW_H * 0.6}px`,
                    opacity: on ? 1 - pos * 0.14 : 0,
                  }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-(--ui-raised) text-[11px] text-(--ui-muted)">
                      {c.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span>{c.name}</span>
                      <span className="text-[11.5px] text-(--ui-muted) tabular-nums">{c.detail}</span>
                    </span>
                  </span>
                  <span className={cn("truncate text-[12.5px]", c.said.startsWith("“") ? "text-(--ui-text)" : "text-(--ui-muted)")}>{c.said}</span>
                  <span className="text-right font-mono text-[11.5px] text-(--ui-muted) tabular-nums">{c.kind === "retry" ? "–" : c.dur}</span>
                  <span className="flex justify-end text-[12px]">
                    <Outcome call={c} />
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
