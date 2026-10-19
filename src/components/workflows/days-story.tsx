"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ChatTextIcon, CheckCircleIcon, CheckIcon, HourglassIcon, LightningIcon, PhoneCallIcon, type Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { pageHref } from "@/components/product-page/page-bits"
import { workflowsPage as c } from "@/content/pages/workflows"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Follows a customer over days": one workflow on the console's charcoal
 * canvas, step by step across four days: a missed payment starts it, a
 * reminder call goes unanswered, a payment link goes by SMS, it waits two
 * days and checks, Ria calls back (remembering everything), and the bill is
 * paid. Two light cards float over the canvas edge, as in the hero: what
 * happened at the current step, and what the workflow remembers so far.
 * Laid out once at a design size and scaled to fit. Plays once when on
 * screen, then holds; hovering a step shows it. Below lg: a list. Reduced
 * motion: finished state. Sample data (Maya Patel, Halden Energy).
 */

type Tone = "neutral" | "warn" | "good"
type Step = {
  id: string
  day: string
  icon: Icon
  title: string
  sub: string
  outcome: { text: string; tone: Tone }
  detail: React.ReactNode
  remember: string
}

const STEPS: Step[] = [
  {
    id: "missed",
    day: "Day 1 · 09:00",
    icon: LightningIcon,
    title: "Missed bill",
    sub: "Billing webhook",
    outcome: { text: "Run started", tone: "neutral" },
    detail: <code className="font-mono text-[11.5px] text-ink-secondary">{'{ "account": "HLD-482913", "missed": 86.40 }'}</code>,
    remember: "Missed $86.40, due 1 March",
  },
  {
    id: "call1",
    day: "Day 1 · 10:02",
    icon: PhoneCallIcon,
    title: "Reminder call",
    sub: "Call-back step · Ria",
    outcome: { text: "No answer", tone: "warn" },
    detail: <p className="text-ink-secondary">Rang for 30 seconds, no answer. Next: send the payment link.</p>,
    remember: "Reminder call, no answer",
  },
  {
    id: "sms",
    day: "Day 1 · 10:05",
    icon: ChatTextIcon,
    title: "Payment link",
    sub: "SMS · ready-made",
    outcome: { text: "Sent", tone: "good" },
    detail: (
      <p className="rounded-lg rounded-bl-sm bg-surface px-3 py-2">Hi Maya, your Halden bill of $86.40 is overdue. Pay here: halden.example/p/77Q2</p>
    ),
    remember: "Payment link sent by SMS",
  },
  {
    id: "wait",
    day: "Day 1 → Day 3",
    icon: HourglassIcon,
    title: "Wait 2 days",
    sub: "Then check payment",
    outcome: { text: "Still unpaid", tone: "warn" },
    detail: <p className="text-ink-secondary">Checked billing on Day 3: $86.40 still open. Next: call back.</p>,
    remember: "Still unpaid after 2 days",
  },
  {
    id: "call2",
    day: "Day 3 · 10:01",
    icon: PhoneCallIcon,
    title: "Callback",
    sub: "Ria, with recall",
    outcome: { text: "Promise to pay", tone: "good" },
    detail: (
      <div className="flex flex-col gap-1.5">
        <p>
          <span className="text-ink-muted">Ria: </span>Hi Maya, I called on Monday and sent a link. Is now a better time?
        </p>
        <p className="text-ink-secondary">
          <span className="text-ink-muted">Caller: </span>Yes, sorry. I&apos;ll pay on the 4th.
        </p>
      </div>
    ),
    remember: "Promised to pay on 4 March",
  },
  {
    id: "paid",
    day: "Day 4 · 18:20",
    icon: CheckCircleIcon,
    title: "Paid",
    sub: "$86.40 received",
    outcome: { text: "Run complete", tone: "good" },
    detail: <p className="text-ink-secondary">Payment received. CRM updated and the workflow ends.</p>,
    remember: "Paid in full",
  },
]
const LAST = STEPS.length - 1
const BEAT_MS = 2300

// Design geometry (canvas units: 1000 × 520).
const VW = 1000
const VH = 520
const NW = 142
const NH = 64
const NY = 112
const nx = (i: number) => 24 + i * 162
const DESIGN_W = 1100
const DESIGN_H = 640

const FLOAT = "absolute z-10 flex flex-col gap-3 rounded-lg border border-line bg-background p-4 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)]"

const TONE: Record<Tone, string> = {
  neutral: "bg-(--ui-raised) text-(--ui-text)",
  warn: "bg-(--warn)/18 text-(--warn-fg)",
  good: "bg-(--ok)/18 text-(--ok-fg)",
}

export function DaysStory() {
  const { label, title, rows } = c.days
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [played, setPlayed] = useState(-1)
  const [hover, setHover] = useState<number | null>(null)
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
    if (!seen || reduce || played >= LAST) return
    const t = setTimeout(() => setPlayed((p) => p + 1), played < 0 ? 300 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, played])

  const step = hover ?? (reduce ? LAST : played)
  const cur = STEPS[Math.max(0, step)]

  return (
    <Section id="workflows-days" className="ui-scope">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
        </div>

        {/* Canvas with the run's detail floating over its edges (lg up) */}
        <div ref={ref} className="relative mt-10 hidden lg:block" style={{ height: DESIGN_H * scale }}>
          <div className="absolute top-0 left-0 px-[55px] py-8" style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
            <div className="relative aspect-[1000/520] overflow-hidden rounded-xl border border-black/10 dark:border-(--ui-line) bg-(--ui-panel) bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)]">
              {/* The track between steps; the wait is dashed, as time passes. */}
              <svg aria-hidden viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
                {STEPS.slice(0, -1).map((s, i) => {
                  const x1 = nx(i) + NW
                  const x2 = nx(i + 1)
                  const y = NY + NH / 2
                  const travelled = step >= i + 1
                  const dashed = s.id === "wait" || STEPS[i + 1].id === "wait"
                  return (
                    <g key={s.id}>
                      <line x1={x1} y1={y} x2={x2} y2={y} stroke="oklch(1 0 0 / 0.24)" strokeWidth={1.3} strokeDasharray={dashed ? "4 4" : undefined} />
                      <line
                        x1={x1}
                        y1={y}
                        x2={x2}
                        y2={y}
                        stroke="var(--ui-text)"
                        strokeWidth={1.5}
                        pathLength={1}
                        strokeDasharray="1 1"
                        style={{ strokeDashoffset: travelled ? 0 : 1, transition: "stroke-dashoffset 800ms var(--ease-out)" }}
                      />
                    </g>
                  )
                })}
              </svg>

              {STEPS.map((s, i) => {
                const state = i === step ? "active" : i < step ? "done" : "idle"
                return (
                  <div key={s.id} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                    <span
                      className={cn("absolute font-mono text-[10.5px] transition-colors duration-300", state === "idle" ? "text-(--ui-muted)/60" : "text-(--ui-muted)")}
                      style={{ left: `${(nx(i) / VW) * 100}%`, top: `${((NY - 30) / VH) * 100}%` }}
                    >
                      {s.day}
                    </span>
                    <div
                      className={cn(
                        "absolute flex flex-col justify-center gap-1.5 rounded-lg border bg-(--ui-raised) px-2.5 text-[11.5px] leading-none text-(--ui-text) transition-[opacity,border-color,box-shadow] duration-500 ease-(--ease-out)",
                        state === "active" ? "border-white/85 shadow-[0_0_0_3px_oklch(1_0_0/0.12),0_0_40px_-6px_oklch(1_0_0/0.25)]" : "border-white/15",
                        state === "idle" && "opacity-50"
                      )}
                      style={{ left: `${(nx(i) / VW) * 100}%`, top: `${(NY / VH) * 100}%`, width: `${(NW / VW) * 100}%`, height: `${(NH / VH) * 100}%` }}
                    >
                      <span className="flex items-center gap-1.5">
                        <s.icon weight="fill" className="size-3.5 shrink-0 text-(--data)" />
                        <span className="truncate">{s.title}</span>
                        {state === "done" && <CheckIcon weight="bold" className="ml-auto size-3 shrink-0 text-(--ok)" />}
                        {state === "active" && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-(--ok) motion-safe:animate-pulse" />}
                      </span>
                      <span className="truncate text-[10.5px] text-(--ui-muted)">{s.sub}</span>
                    </div>
                    {/* Outcome, once reached */}
                    <span
                      className={cn(
                        "absolute rounded-full px-2 py-0.5 text-[10.5px] whitespace-nowrap transition-[opacity,translate] duration-500",
                        TONE[s.outcome.tone],
                        i <= step ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      )}
                      style={{ left: `${(nx(i) / VW) * 100}%`, top: `${((NY + NH + 12) / VH) * 100}%` }}
                    >
                      {s.outcome.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* What the workflow remembers (Recall), bottom left */}
            <div className={cn(FLOAT, "bottom-0 left-[30px] w-[19rem]")}>
              <span className="text-label text-ink-muted">Remembered for Maya Patel</span>
              <ol className="flex flex-col gap-2">
                {STEPS.slice(0, Math.max(1, step + 1)).map((s, i) => (
                  <li key={s.id} className={cn("flex items-center gap-2", i === Math.max(0, step) ? "text-foreground" : "text-ink-secondary")}>
                    <CheckIcon weight="bold" className="size-3.5 shrink-0 text-success" />
                    {s.remember}
                  </li>
                ))}
              </ol>
            </div>

            {/* The current step, bottom right */}
            <div className={cn(FLOAT, "right-0 bottom-0 w-[22rem]")}>
              <div className="flex items-center justify-between text-label text-ink-muted">
                <span>
                  Step {Math.max(0, step) + 1} of {STEPS.length} · {cur.title}
                </span>
                <span>{cur.day}</span>
              </div>
              <div key={cur.id} className="motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]">
                {cur.detail}
              </div>
            </div>
          </div>
        </div>

        {/* Below lg: the run as a list */}
        <ol className="mt-8 flex flex-col gap-3 lg:hidden">
          {STEPS.map((s) => (
            <li key={s.id} className="flex flex-col gap-2 rounded-xl bg-(--ui-panel) p-4 text-small text-(--ui-text)">
              <span className="flex items-center justify-between font-mono text-label text-(--ui-muted)">
                {s.day}
                <span className={cn("rounded-full px-2 py-0.5 font-sans text-[11px]", TONE[s.outcome.tone])}>{s.outcome.text}</span>
              </span>
              <span>{s.title}</span>
              <span className="text-(--ui-muted)">{s.sub}</span>
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
        <TextLink href={pageHref("campaigns")} className="mt-6">
          See campaigns
        </TextLink>
      </Container>
    </Section>
  )
}
