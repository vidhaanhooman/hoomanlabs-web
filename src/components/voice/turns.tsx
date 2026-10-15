"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { voicePage as c } from "@/content/pages/voice"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Turn-taking, full width: one stretch of a call as two waveform lanes
 * (caller and Hooman) on the console's charcoal canvas, with a playhead
 * crossing once. Four moments light up as it passes: a pause mid-number
 * (TurnSense waits), the caller cutting in (barge-in, the Hooman stops),
 * what the Hooman planned but never said (Heard vs said), and a silence
 * followed by a nudge. Light cards float over the canvas edge: the
 * transcript so far, and heard vs said. Laid out at a design size and scaled
 * to fit. Reduced motion: shown complete. Sample conversation.
 */

const VW = 1000
const VH = 440
const X0 = 130
const X1 = 970
const px = (p: number) => X0 + (p / 100) * (X1 - X0)
const CALLER_Y = 150
const HOOMAN_Y = 270
const DESIGN_W = 1100
const DESIGN_H = 500
const RUN_MS = 9000

const CALLER: [number, number][] = [
  [0, 14],
  [19, 28],
  [45, 52],
]
const HOOMAN_SAID: [number, number][] = [
  [31, 47],
  [55, 66],
  [84, 92],
]
/** What the Hooman would have said, had the caller not cut in. */
const HOOMAN_UNSAID: [number, number] = [47, 60]

const MOMENTS = [
  { at: 16.5, label: "Pause mid-number · waits", feature: "TurnSense" },
  { at: 46, label: "Caller cuts in · stops", feature: "Natural barge-in" },
  { at: 75, label: "Silence · gentle nudge", feature: "Nudge" },
]

const LINES = [
  { at: 0, who: "Caller", text: "My account number is 4 8 2…" },
  { at: 19, who: "Caller", text: "…9 1 3." },
  { at: 31, who: "Ria", text: "Thanks. I can set up the full payment for you today…" },
  { at: 45, who: "Caller", text: "Wait, can I pay half now?" },
  { at: 55, who: "Ria", text: "Yes, half is fine. I'll send the link." },
  { at: 84, who: "Ria", text: "Are you still there, Maya?" },
]

const inside = (p: number, spans: [number, number][]) => spans.some(([a, b]) => p >= a && p <= b)

function bars(spans: [number, number][], seed: number) {
  const out: { x: number; h: number; p: number; on: boolean }[] = []
  for (let x = X0; x <= X1; x += 4) {
    const p = ((x - X0) / (X1 - X0)) * 100
    const i = (x - X0) / 4
    const on = inside(p, spans)
    out.push({ x, p, on, h: on ? 6 + Math.round(34 * Math.abs(Math.sin(i * 0.7 + seed) * Math.cos(i * 0.23 + seed))) : 1.5 })
  }
  return out
}
const CALLER_BARS = bars(CALLER, 0.4)
const HOOMAN_BARS = bars(HOOMAN_SAID, 1.7)
const UNSAID_BARS = bars([HOOMAN_UNSAID], 2.6).filter((b) => b.on)

const FLOAT = "absolute z-10 flex flex-col gap-2.5 rounded-lg border border-line bg-background p-4 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)]"

export function Turns() {
  const { label, title, line, rows } = c.turns
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.4, once: true })
  const reduce = usePrefersReducedMotion()
  const [p, setP] = useState(0)
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

  // The playhead crosses once.
  useEffect(() => {
    if (!seen || reduce) return
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const v = Math.min(100, ((now - t0) / RUN_MS) * 100)
      setP(v)
      if (v < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, reduce])

  const at = reduce ? 100 : p
  const said = LINES.filter((l) => l.at <= at)
  const heard = at >= 47

  return (
    <Section id="voice-turns">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} className="relative mt-10 hidden lg:block" style={{ height: DESIGN_H * scale }}>
          <div className="absolute top-0 left-0 px-[55px] py-8" style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
            <div className="relative aspect-[1000/440] overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.23_0.005_260)] bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)]">
              <svg aria-hidden viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
                {/* Lane labels */}
                <text x={40} y={CALLER_Y + 4} fontSize={13} fill="oklch(1 0 0 / 0.6)" fontFamily="var(--font-mono)">
                  Caller
                </text>
                <text x={40} y={HOOMAN_Y + 4} fontSize={13} fill="oklch(0.8 0.1 245)" fontFamily="var(--font-mono)">
                  Hooman
                </text>

                {/* Moments: a dashed line through both lanes, labelled above */}
                {MOMENTS.map((m) => {
                  const lit = at >= m.at
                  return (
                    <g key={m.label} opacity={lit ? 1 : 0.25} style={{ transition: "opacity 400ms" }}>
                      <line x1={px(m.at)} y1={72} x2={px(m.at)} y2={HOOMAN_Y + 46} stroke="oklch(1 0 0 / 0.45)" strokeDasharray="3 4" />
                      <g transform={`translate(${px(m.at)},${48})`}>
                        <rect x={-92} y={-16} width={184} height={34} rx={7} fill={lit ? "oklch(0.95 0 0)" : "oklch(0.3 0 0)"} />
                        <text y={-1} textAnchor="middle" fontSize={11} fill={lit ? "oklch(0.2 0 0)" : "oklch(1 0 0 / 0.7)"}>
                          {m.label}
                        </text>
                        <text y={12} textAnchor="middle" fontSize={9.5} fill={lit ? "oklch(0.45 0 0)" : "oklch(1 0 0 / 0.45)"} fontFamily="var(--font-mono)">
                          {m.feature}
                        </text>
                      </g>
                    </g>
                  )
                })}

                {/* Waveforms: played part bright, the rest dim */}
                {CALLER_BARS.map((b) => (
                  <rect key={`c${b.x}`} x={b.x} y={CALLER_Y - b.h / 2} width={2.2} height={b.h} rx={1.1} fill="oklch(0.95 0 0)" opacity={b.p <= at ? (b.on ? 0.9 : 0.35) : b.on ? 0.22 : 0.12} />
                ))}
                {HOOMAN_BARS.map((b) => (
                  <rect key={`h${b.x}`} x={b.x} y={HOOMAN_Y - b.h / 2} width={2.2} height={b.h} rx={1.1} fill="oklch(0.78 0.12 245)" opacity={b.p <= at ? (b.on ? 0.95 : 0.35) : b.on ? 0.25 : 0.12} />
                ))}
                {/* What it would have said: outlined, never filled */}
                {UNSAID_BARS.map((b) => (
                  <rect
                    key={`u${b.x}`}
                    x={b.x}
                    y={HOOMAN_Y - b.h / 2}
                    width={2.2}
                    height={b.h}
                    rx={1.1}
                    fill="none"
                    stroke="oklch(0.78 0.12 245)"
                    strokeWidth={0.6}
                    opacity={heard ? 0.6 : 0}
                    style={{ transition: "opacity 400ms" }}
                  />
                ))}

                {/* Playhead */}
                <g transform={`translate(${px(at)},0)`} opacity={at > 0 && at < 100 ? 1 : 0}>
                  <line y1={78} y2={HOOMAN_Y + 52} stroke="oklch(0.95 0 0)" strokeWidth={1.4} />
                  <circle cy={HOOMAN_Y + 52} r={4} fill="oklch(0.95 0 0)" />
                </g>
              </svg>
            </div>

            {/* Heard vs said, bottom left */}
            <div className={cn(FLOAT, "bottom-0 left-[30px] w-[24rem] transition-[opacity,translate] duration-500", heard ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}>
              <span className="text-label text-ink-muted">Heard vs said</span>
              <p>
                I can set up the full payment for you today{" "}
                <span className="text-ink-muted line-through decoration-ink-muted">and send the receipt by SMS.</span>
              </p>
              <span className="text-label text-ink-muted">Struck through: planned, but the caller cut in first.</span>
            </div>

            {/* Transcript so far, bottom right */}
            <div className={cn(FLOAT, "right-0 bottom-0 w-[22rem]")}>
              <span className="text-label text-ink-muted">Transcript · Maya Patel</span>
              <ol className="flex flex-col gap-1.5">
                {(said.length ? said : LINES.slice(0, 1)).slice(-2).map((l) => (
                  <li key={l.at} className="motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]">
                    <span className="text-ink-muted">{l.who}: </span>
                    <span className={l.who === "Caller" ? "text-ink-secondary" : ""}>{l.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Below lg: the four moments as a list */}
        <ol className="mt-8 flex flex-col gap-3 lg:hidden">
          {[...MOMENTS.map((m) => ({ k: m.feature, t: m.label })), { k: "Heard vs said", t: "Planned words the caller never heard, struck through" }].map((m) => (
            <li key={m.k} className="flex flex-col gap-1 rounded-xl bg-[oklch(0.23_0.005_260)] p-4 text-small text-[oklch(0.95_0_0)]">
              <span className="font-mono text-label text-white/55">{m.k}</span>
              {m.t}
            </li>
          ))}
        </ol>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
