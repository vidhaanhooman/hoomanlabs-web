"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ChatTextIcon, CheckIcon, DatabaseIcon, PlayIcon, UserIcon, type Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { integrationsPage as c } from "@/content/pages/integrations"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Every call, turned into data", full width on the console's charcoal
 * canvas: a call ends and its record fills in (summary, outcome, fields,
 * checklist, transcript and recording), a call.ended event fires, and the
 * data lands in three places: the CRM, a database and the team's channel.
 * The event payload and the call-event log float over the canvas edge, as
 * in the hero. Laid out at a design size and scaled to fit. Plays once when
 * on screen, then holds. Below lg: a list. Reduced motion: finished.
 * Sample data (Maya Patel, Halden Energy); payload illustrative.
 */

const RECORD: { k: string; v: React.ReactNode }[] = [
  { k: "Summary", v: "Agreed to pay after payday; link sent by SMS." },
  { k: "Outcome", v: <span className="rounded-full bg-[oklch(0.74_0.16_150/0.2)] px-2 py-0.5 text-[10.5px] text-[oklch(0.85_0.12_150)]">Promise to pay</span> },
  { k: "Fields", v: <span className="font-mono text-[11px]">pay_by 2026-03-04 · amount 86.40</span> },
  { k: "Checklist", v: "Identity verified ✓ · Disclosure read ✓" },
  {
    k: "Record",
    v: (
      <span className="flex items-center gap-1.5">
        <PlayIcon weight="fill" className="size-3" />
        Recording 3:42 · transcript
      </span>
    ),
  },
]
const DESTS: { icon: Icon; name: string; detail: string }[] = [
  { icon: UserIcon, name: "Zoho CRM", detail: "Record updated · outcome, pay-by date" },
  { icon: DatabaseIcon, name: "Your database", detail: "Row added to calls table" },
  { icon: ChatTextIcon, name: "#billing", detail: "Summary posted for the team" },
]
const FIRE = RECORD.length // beat when the event fires
const LAST = FIRE + DESTS.length
const BEAT_MS = 750

// Design geometry (canvas units: 1000 × 460).
const VW = 1000
const VH = 460
const REC = { x: 30, y: 40, w: 330, h: 285 }
const HUB = { x: 520, y: 190 }
const DX = 650
const DW = 320
const DH = 62
const dy = (i: number) => 70 + i * 92
const DESIGN_W = 1100
const DESIGN_H = 520

const FLOAT = "absolute z-10 flex flex-col gap-2.5 rounded-lg border border-line bg-background p-4 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)]"

export function DataFlow() {
  const { label, title, line, rows } = c.data
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(Math.min(1.12, el.clientWidth / DESIGN_W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const t = setTimeout(() => setBeat((b) => b + 1), beat < 0 ? 300 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, beat])

  const b = reduce ? LAST : beat
  const fired = b >= FIRE
  const trunk = `M${REC.x + REC.w},${HUB.y} H${HUB.x}`
  const branch = (i: number) => `M${HUB.x},${HUB.y} C${HUB.x + 70},${HUB.y} ${DX - 70},${dy(i) + DH / 2} ${DX},${dy(i) + DH / 2}`

  return (
    <Section id="integrations-data">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} className="relative mt-10 hidden lg:block" style={{ height: DESIGN_H * scale }}>
          <div className="absolute top-0 left-0 px-[55px] py-8" style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
            <div className="relative aspect-[1000/460] overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.23_0.005_260)] bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] text-[oklch(0.95_0_0)] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)]">
              <svg aria-hidden viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
                {[trunk, ...DESTS.map((_, i) => branch(i))].map((d, i) => {
                  const on = i === 0 ? fired : b >= FIRE + i
                  return (
                    <g key={d}>
                      <path d={d} fill="none" stroke="oklch(1 0 0 / 0.22)" strokeWidth={1.3} />
                      <path
                        d={d}
                        fill="none"
                        stroke="oklch(0.95 0 0)"
                        strokeWidth={1.5}
                        pathLength={1}
                        strokeDasharray="1 1"
                        style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 700ms var(--ease-out)" }}
                      />
                    </g>
                  )
                })}
                <circle cx={HUB.x} cy={HUB.y} r={5} fill={fired ? "oklch(0.95 0 0)" : "oklch(0.4 0 0)"} style={{ transition: "fill 300ms" }} />
              </svg>

              {/* The event, on the wire */}
              <span
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 font-mono text-[11px] transition-[opacity,background-color,color] duration-500",
                  fired ? "border-white bg-white text-black" : "border-white/20 bg-[oklch(0.28_0.005_260)] text-white/45"
                )}
                style={{ left: `${(((REC.x + REC.w + HUB.x) / 2) / VW) * 100}%`, top: `${((HUB.y - 26) / VH) * 100}%` }}
              >
                call.ended
              </span>

              {/* The call record, filling in */}
              <div
                className="absolute flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[oklch(0.28_0.005_260)] text-[12px]"
                style={{ left: `${(REC.x / VW) * 100}%`, top: `${(REC.y / VH) * 100}%`, width: `${(REC.w / VW) * 100}%`, height: `${(REC.h / VH) * 100}%` }}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <span>Call · Maya Patel</span>
                  <span className="font-mono text-[10.5px] text-white/50">3:42 · ended</span>
                </div>
                {RECORD.map((r, i) => (
                  <div
                    key={r.k}
                    className={cn("grid grid-cols-[4.5rem_1fr] items-center gap-3 border-b border-white/8 px-4 py-2.5 transition-[opacity,translate] duration-500 last:border-0", i <= b ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
                  >
                    <span className="text-[11px] text-white/50">{r.k}</span>
                    <span className="text-white/85">{r.v}</span>
                  </div>
                ))}
              </div>

              {/* Where it lands */}
              {DESTS.map((d, i) => {
                const on = b >= FIRE + 1 + i
                return (
                  <div
                    key={d.name}
                    className={cn(
                      "absolute flex items-center gap-3 rounded-xl border bg-[oklch(0.28_0.005_260)] px-4 text-[12px] transition-[opacity,border-color,box-shadow] duration-500",
                      on ? "border-white/70 shadow-[0_0_30px_-8px_oklch(1_0_0/0.25)]" : "border-white/15 opacity-50"
                    )}
                    style={{ left: `${(DX / VW) * 100}%`, top: `${(dy(i) / VH) * 100}%`, width: `${(DW / VW) * 100}%`, height: `${(DH / VH) * 100}%` }}
                  >
                    <d.icon className="size-4 shrink-0 text-[oklch(0.75_0.12_245)]" />
                    <span className="flex min-w-0 flex-col gap-1">
                      <span>{d.name}</span>
                      <span className="truncate text-[11px] text-white/55">{d.detail}</span>
                    </span>
                    {on && <CheckIcon weight="bold" className="ml-auto size-3.5 shrink-0 text-[oklch(0.78_0.15_150)]" />}
                  </div>
                )
              })}
            </div>

            {/* The call-event log, bottom left */}
            <div className={cn(FLOAT, "bottom-0 left-[30px] w-[19rem]")}>
              <span className="text-label text-ink-muted">Call events · to your URL</span>
              {[
                ["10:02:11", "call.started", true],
                ["10:02:14", "call.connected", true],
                ["10:05:53", "call.ended", fired],
              ].map(([t, e, on]) => (
                <span key={e as string} className={cn("flex items-center gap-3 font-mono text-[11.5px] transition-opacity", on ? "opacity-100" : "opacity-35")}>
                  <span className="text-ink-muted">{t}</span>
                  {e}
                  <span className="ml-auto text-[oklch(0.5_0.13_150)]">{on ? "200" : ""}</span>
                </span>
              ))}
            </div>

            {/* The payload, bottom right */}
            <div className={cn(FLOAT, "right-0 bottom-0 w-[22rem] transition-[opacity,translate] duration-500", fired ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}>
              <span className="text-label text-ink-muted">Payload · call.ended</span>
              <pre className="font-mono text-[11px] leading-relaxed text-ink-secondary">
                {`{ "call_id": "call_7Q2",
  "outcome": "promise_to_pay",
  "fields": { "pay_by": "2026-03-04", "amount": 86.40 },
  "summary": "Agreed to pay after payday…" }`}
              </pre>
            </div>
          </div>
        </div>

        {/* Below lg: the record and destinations as a list */}
        <div className="mt-8 flex flex-col gap-3 lg:hidden">
          <div className="flex flex-col gap-2 rounded-xl bg-[oklch(0.23_0.005_260)] p-4 text-small text-[oklch(0.95_0_0)]">
            <span className="font-mono text-label text-white/55">Call · Maya Patel · ended</span>
            {RECORD.map((r) => (
              <span key={r.k} className="flex gap-3">
                <span className="w-20 shrink-0 text-white/55">{r.k}</span>
                <span>{r.v}</span>
              </span>
            ))}
          </div>
          {DESTS.map((d) => (
            <div key={d.name} className="flex items-center gap-3 rounded-xl bg-[oklch(0.23_0.005_260)] p-4 text-small text-[oklch(0.95_0_0)]">
              <d.icon className="size-4" />
              {d.name}
              <span className="text-white/55">{d.detail}</span>
            </div>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="text-body">{r.title}</span>
              <span className="text-small text-ink-secondary">{r.body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
