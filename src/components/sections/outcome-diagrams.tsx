"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

/**
 * Outcomes in the site's own language: three panels, each with a static
 * fine-line drawing of the outcome (a noisy wait resolving into one calm
 * wave, reach rippling outward, tasks stepping up to done), a number that
 * counts up once when it scrolls into view, and a short explanation.
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
/** Counts up once, when the number itself has scrolled well into view. */
function CountUp({ to, format, delay = 0 }: { to: number; format: (v: number) => string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Fully on screen and above the bottom fifth, so it starts as you arrive, not on load.
  const start = useInView(ref, { amount: 1, once: true, margin: "0px 0px -20% 0px" })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now() + delay
    const tick = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - t0) / 1400))
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, to, delay])
  return <span ref={ref}>{format(v)}</span>
}

export function OutcomeDiagrams() {
  const reduce = usePrefersReducedMotion()
  return (
    <Section id="sl-outcomes">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What changes when agents take the calls.</h2>
          <p className="text-body text-ink-secondary">Three things teams measure in the first month.</p>
        </div>
        <div className="mt-(--heading-gap,2.5rem) grid gap-(--card-gap,0.75rem) md:grid-cols-3">
          {ITEMS.map(({ key, tag, value, format, label, body, Scene }, i) => (
            <Panel key={key} className="flex flex-col gap-6 p-6">
              <div aria-hidden className="h-44">
                <Scene />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-label text-ink-muted">{tag}</span>
                <span className="text-display font-normal tabular-nums">{reduce ? format(value) : <CountUp to={value} format={format} delay={i * 150} />}</span>
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

/* ------------------------------------------------------------ line drawings
   Static fine-line diagrams: thin strokes, dotted guides, open and filled
   points, tiny labels. */

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const }
const DOTTED = { ...STROKE, strokeDasharray: "1.5 4", opacity: 0.55 }

/** A noisy, broken line (waiting) that resolves into one calm wave (answered). */
function CallsScene() {
  const noisy = Array.from({ length: 22 }, (_, i) => {
    const x = 18 + i * 5.5
    const y = 90 + (i % 2 === 0 ? -1 : 1) * (6 + ((i * 7) % 11))
    return `${i === 0 ? "M" : "L"}${x},${y}`
  }).join(" ")
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full text-foreground">
      <path d={noisy} {...DOTTED} />
      <path d="M140,90 C160,90 165,60 185,60 C205,60 210,120 230,120 C250,120 255,90 275,90 L300,90" {...STROKE} />
      <circle cx={140} cy={90} r={4} className="fill-background" stroke="currentColor" strokeWidth={1.3} />
      <circle cx={300} cy={90} r={3.5} fill="currentColor" />
      <text x={18} y={150} fontSize={10.5} className="fill-ink-muted">
        Waiting
      </text>
      <text x={126} y={150} fontSize={10.5} className="fill-ink-muted">
        0.8s
      </text>
      <text x={266} y={150} fontSize={10.5} className="fill-foreground">
        Answered
      </text>
      <line x1={140} y1={100} x2={140} y2={138} {...DOTTED} />
    </svg>
  )
}

/** Reach spreading outward from one number: rings with leads on them. */
function LeadsScene() {
  const cx = 90
  const cy = 85
  const rings = [22, 44, 66]
  const leads = [
    [0, -0.6],
    [0, 2.1],
    [1, 0.3],
    [1, 1.5],
    [1, -2.2],
    [2, -0.9],
    [2, 0.6],
    [2, 2.6],
    [2, -2.6],
  ] as const
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full text-foreground">
      {rings.map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} {...(i === 0 ? DOTTED : STROKE)} opacity={i === 0 ? 0.55 : 1 - i * 0.2} />
      ))}
      <circle cx={cx} cy={cy} r={4} fill="currentColor" />
      {leads.map(([ring, a], i) => (
        <circle
          key={i}
          cx={cx + rings[ring] * Math.cos(a)}
          cy={cy + rings[ring] * Math.sin(a)}
          r={3}
          className={ring === 2 ? "fill-foreground" : "fill-background"}
          stroke="currentColor"
          strokeWidth={1.2}
        />
      ))}
      <line x1={cx + 66} y1={cy} x2={300} y2={cy} {...DOTTED} />
      <text x={200} y={cy - 8} fontSize={10.5} className="fill-ink-muted">
        within 5 min
      </text>
      <text x={200} y={cy + 18} fontSize={10.5} className="fill-foreground">
        3× leads reached
      </text>
    </svg>
  )
}

/** A row of open tasks that close in order and step up to "done". */
function TasksScene() {
  const pts = [
    { x: 30, y: 130, done: true },
    { x: 95, y: 108, done: true },
    { x: 160, y: 86, done: true },
    { x: 225, y: 64, done: false },
    { x: 290, y: 42, done: false },
  ]
  const solid = pts.filter((p) => p.done)
  const open = pts.slice(solid.length - 1)
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full text-foreground">
      <path d={solid.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ")} {...STROKE} />
      <path d={open.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ")} {...DOTTED} />
      {pts.map((p) => (
        <g key={p.x}>
          <line x1={p.x} y1={p.y + 8} x2={p.x} y2={152} {...DOTTED} />
          <circle cx={p.x} cy={p.y} r={4} className={p.done ? "fill-foreground" : "fill-background"} stroke="currentColor" strokeWidth={1.3} />
        </g>
      ))}
      <text x={22} y={164} fontSize={10} className="fill-ink-muted">
        Pay
      </text>
      <text x={84} y={164} fontSize={10} className="fill-ink-muted">
        Book
      </text>
      <text x={150} y={164} fontSize={10} className="fill-ink-muted">
        CRM
      </text>
      <text x={210} y={164} fontSize={10} className="fill-ink-muted">
        Notify
      </text>
      <text x={272} y={164} fontSize={10} className="fill-ink-muted">
        Close
      </text>
    </svg>
  )
}
