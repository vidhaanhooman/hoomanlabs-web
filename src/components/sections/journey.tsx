"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, PhoneIncomingIcon, PhoneOutgoingIcon, WhatsappLogoIcon } from "@phosphor-icons/react"

import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Hero journey (/lab/v3): a pipeline on the painting. A frosted panel holds
 * five steps joined by one fine line; a light travels the line, each step
 * lights as it arrives and its UI card rises beneath. The last step forks
 * (resolved / unresolved, answered / unanswered) and the light takes the
 * branch. Outbound tints the painting toward dusk.
 *
 * Autoplays while on screen and loops; clicking a step jumps to it. Reduced
 * motion: no autoplay, the full line drawn, steps still clickable. Below md the
 * pipeline runs vertically with the card under the active step.
 */

type Step = { title: string; card: React.ReactNode }

type Journey = {
  label: string
  steps: Step[]
  /** Label on the branch the light takes into the last step. */
  branch: string
  /** The branch not taken, shown as a quiet dashed end. */
  other: string
}

const STEP_MS = 2400
const HOLD_MS = 4200

/* ------------------------------------------------------------ card parts */

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-white/60 bg-background/85 p-3.5 shadow-[0_18px_40px_-24px_oklch(0.25_0.04_120/0.6)]">
      <span className="flex items-center gap-2 font-mono text-label text-ink-muted">
        {icon}
        {title}
      </span>
      {children}
    </div>
  )
}

function Rows({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="flex flex-col text-small">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 border-t border-line py-1.5 first:border-0 first:pt-0">
          <dt className="text-ink-muted">{k}</dt>
          <dd className="text-right">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Bubble({ who, children }: { who: "agent" | "user"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "max-w-[88%] rounded-lg px-2.5 py-1.5 text-small leading-snug",
        who === "agent" ? "self-start border border-line bg-surface" : "self-end bg-foreground text-background"
      )}
    >
      {children}
    </span>
  )
}

function Done({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-label text-[oklch(0.5_0.13_150)]">
      <CheckIcon weight="bold" className="size-3.5" />
      {children}
    </span>
  )
}

function Wave() {
  return (
    <span className="ui-wave flex h-4 items-center gap-[3px]" aria-hidden>
      {[5, 11, 7, 14, 9, 12, 6, 10, 5].map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-foreground/70" style={{ height: h }} />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------ journeys */

const JOURNEYS: Record<"inbound" | "outbound", Journey> = {
  inbound: {
    label: "Inbound",
    branch: "If unresolved",
    other: "Resolved · call closed",
    steps: [
      {
        title: "Call comes in",
        card: (
          <Card title="Incoming · billing line" icon={<PhoneIncomingIcon className="size-3.5" />}>
            <span className="flex items-center justify-between gap-3">
              <span className="text-body tabular-nums">+44 20 7946 0958</span>
              <Wave />
            </span>
            <span className="text-small text-ink-secondary">Answered on the first ring</span>
          </Card>
        ),
      },
      {
        title: "Context retrieved",
        card: (
          <Card title="Customer record · CRM">
            <Rows
              rows={[
                ["Name", "Maya Patel"],
                ["Balance", "£86.40 due 4 Mar"],
                ["Last call", "12 Feb · meter reading"],
                ["Language", "English"],
              ]}
            />
          </Card>
        ),
      },
      {
        title: "Contextual greeting",
        card: (
          <Card title="Agent · Ria">
            <Bubble who="agent">Hi Maya, it&rsquo;s Ria from Halden. Is this about your March bill?</Bubble>
            <Bubble who="user">Yes, I think I was charged twice.</Bubble>
          </Card>
        ),
      },
      {
        title: "Conversation",
        card: (
          <Card title="Live transcript">
            <Bubble who="agent">I can see two charges of £86.40 on 4 March.</Bubble>
            <Bubble who="user">Can you refund one today?</Bubble>
            <span className="text-label text-ink-muted">Refunds over £50 need approval</span>
          </Card>
        ),
      },
      {
        title: "Ticket to CRM",
        card: (
          <Card title="Ticket #TCK-2291">
            <Rows
              rows={[
                ["Issue", "Duplicate charge refund"],
                ["Priority", "High"],
                ["Summary", "Transcript and next step attached"],
              ]}
            />
            <Done>Sent to Zendesk · customer told by SMS</Done>
          </Card>
        ),
      },
    ],
  },
  outbound: {
    label: "Outbound",
    branch: "If unanswered",
    other: "Answered · qualify and book",
    steps: [
      {
        title: "Form submitted",
        card: (
          <Card title="Demo request · website">
            <Rows
              rows={[
                ["Name", "Arjun Mehta"],
                ["Phone", "+91 98••• ••210"],
                ["Interest", "Support for 40 agents"],
              ]}
            />
          </Card>
        ),
      },
      {
        title: "Added to campaign",
        card: (
          <Card title="Campaign · New demo requests">
            <Rows
              rows={[
                ["Queue", "128 leads"],
                ["Arjun", "Position 1 · call within 1 min"],
              ]}
            />
            <Done>Added</Done>
          </Card>
        ),
      },
      {
        title: "Details enriched",
        card: (
          <Card title="Lead · enriched">
            <Rows
              rows={[
                ["Company", "Northwind Ltd"],
                ["Role", "Head of CX"],
                ["Region", "Mumbai"],
                ["Language", "Hindi, English"],
              ]}
            />
          </Card>
        ),
      },
      {
        title: "Call placed",
        card: (
          <Card title="Calling Arjun" icon={<PhoneOutgoingIcon className="size-3.5" />}>
            <span className="flex items-center justify-between gap-3">
              <span className="text-body tabular-nums">+91 98••• ••210</span>
              <Wave />
            </span>
            <span className="text-small text-ink-secondary">Rang 6 times · no answer</span>
          </Card>
        ),
      },
      {
        title: "Message and retry",
        card: (
          <Card title="WhatsApp" icon={<WhatsappLogoIcon className="size-3.5" />}>
            <Bubble who="agent">Hi Arjun, sorry we missed you. Is 2 pm a good time to call back?</Bubble>
            <Done>Retry queued · today 2:00 pm</Done>
          </Card>
        ),
      },
    ],
  },
}

type JourneyId = keyof typeof JOURNEYS

/* Node positions on the desktop line, in % of the pipeline box. The last
   step sits on the lower branch; the branch not taken ends above it. */
const NODES = [
  { x: 6, y: 50 },
  { x: 27, y: 50 },
  { x: 48, y: 50 },
  { x: 69, y: 50 },
  { x: 92, y: 80 },
]
const OTHER = { x: 92, y: 20 }
// The line's viewBox is 1000×160, close to the box's shape, so strokes stay even without non-scaling-stroke (which breaks pathLength).

/* ------------------------------------------------------------ component */

export function Journey() {
  const [id, setId] = useState<JourneyId>("inbound")
  const [step, setStep] = useState(0)
  const reduce = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const journey = JOURNEYS[id]
  const last = journey.steps.length - 1

  // Advance one step at a time while on screen; hold on the last, then loop.
  useEffect(() => {
    if (reduce || !inView) return
    const t = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), step >= last ? HOLD_MS : STEP_MS)
    return () => clearTimeout(t)
  }, [step, id, reduce, inView, last])

  const pick = (j: JourneyId) => {
    setId(j)
    setStep(0)
  }
  const drawn = (i: number) => reduce || i < step

  return (
    <div ref={ref}>
      <HeroParallaxStage className="rounded-xl">
        {/* Dusk wash for the outbound journey */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.62_0.13_45/0.55),oklch(0.5_0.11_350/0.35)_55%,oklch(0.32_0.07_285/0.45))] mix-blend-multiply transition-opacity duration-1000 ease-(--ease-out)"
          style={{ opacity: id === "outbound" ? 1 : 0 }}
        />

        <div className="relative z-10 flex items-center justify-center px-3 py-8 sm:px-8 sm:py-12 lg:min-h-[40rem]">
          <div className="w-full max-w-5xl rounded-[2rem] border border-white/40 bg-[oklch(0.99_0.01_85/0.42)] p-4 shadow-[0_30px_80px_-40px_oklch(0.25_0.04_120/0.55),inset_0_1px_0_oklch(1_0_0/0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:p-6">
            {/* Toggle + status */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div role="tablist" aria-label="Journey" className="flex gap-1 rounded-full bg-white/35 p-1">
                {(Object.keys(JOURNEYS) as JourneyId[]).map((j) => (
                  <button
                    key={j}
                    type="button"
                    role="tab"
                    aria-selected={id === j}
                    onClick={() => pick(j)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-small transition-colors duration-150",
                      id === j ? "bg-background text-foreground shadow-xs" : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {JOURNEYS[j].label}
                  </button>
                ))}
              </div>
              <span className="flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-label" aria-live="polite">
                <span className={cn("size-1.5 rounded-full bg-[oklch(0.62_0.15_150)]", !reduce && "animate-pulse")} />
                Step {step + 1} of {journey.steps.length} · {journey.steps[step].title}
              </span>
            </div>

            {/* Desktop: horizontal line with a travelling light */}
            <div className="hidden md:block">
              <div className="relative mt-6 aspect-[1000/160]">
                <svg viewBox="0 0 1000 160" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
                  {NODES.slice(1).map((n, i) => {
                    const a = NODES[i]
                    return (
                      <g key={i}>
                        <line x1={a.x * 10} y1={a.y * 1.6} x2={n.x * 10} y2={n.y * 1.6} className="stroke-foreground/20" strokeWidth={1.5} />
                        <line
                          x1={a.x * 10}
                          y1={a.y * 1.6}
                          x2={n.x * 10}
                          y2={n.y * 1.6}
                          pathLength={1}
                          strokeDasharray="1 1"
                          className="stroke-foreground transition-[stroke-dashoffset] duration-700 ease-(--ease-out)"
                          style={{ strokeDashoffset: drawn(i) ? 0 : 1 }}
                          strokeWidth={1.5}
                        />
                      </g>
                    )
                  })}
                  <line
                    x1={NODES[3].x * 10}
                    y1={NODES[3].y * 1.6}
                    x2={OTHER.x * 10}
                    y2={OTHER.y * 1.6}
                    className="stroke-foreground/30"
                    strokeWidth={1.2}
                    strokeDasharray="2 5"
                  />
                </svg>

                {/* The branch not taken */}
                <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${OTHER.x}%`, top: `${OTHER.y}%` }}>
                  <span className="block size-2.5 rounded-full border border-dashed border-foreground/50 bg-background/60" />
                  <span className="absolute top-1/2 right-5 -translate-y-1/2 text-label whitespace-nowrap text-foreground/55">{journey.other}</span>
                </span>

                {/* Steps */}
                {journey.steps.map((s, i) => {
                  const n = NODES[i]
                  const lit = reduce || i <= step
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setStep(i)}
                      aria-current={i === step ? "step" : undefined}
                      className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                      style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    >
                      {i === last && (
                        <span className="absolute bottom-full mb-2 rounded-full bg-background/70 px-2 py-0.5 font-mono text-[10px] whitespace-nowrap text-ink-secondary">
                          {journey.branch}
                        </span>
                      )}
                      <span
                        className={cn(
                          "grid size-4 place-items-center rounded-full border transition-[background-color,border-color,transform] duration-300",
                          lit ? "border-foreground bg-foreground" : "border-foreground/40 bg-background/80",
                          i === step && "scale-125"
                        )}
                      >
                        {lit && i < step && <CheckIcon weight="bold" className="size-2.5 text-background" />}
                      </span>
                      <span
                        className={cn(
                          "absolute top-full mt-2 text-small whitespace-nowrap transition-colors",
                          i === step ? "font-medium text-foreground" : "text-foreground/65 group-hover:text-foreground"
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                  )
                })}

                {/* The light */}
                {!reduce && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_oklch(1_0_0/0.35),0_0_18px_6px_oklch(1_0_0/0.7)] transition-[left,top] duration-700 ease-(--ease-out)"
                    style={{ left: `${NODES[step].x}%`, top: `${NODES[step].y}%` }}
                  />
                )}
              </div>

              {/* The active step's card, under its node */}
              <div className="relative mt-9 h-48">
                <div
                  key={`${id}-${step}`}
                  className="absolute top-0 w-80 motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both]"
                  style={{ left: `${NODES[step].x}%`, transform: `translateX(-${NODES[step].x}%)` }}
                >
                  {journey.steps[step].card}
                </div>
              </div>
            </div>

            {/* Mobile: vertical list, card under the active step */}
            <ol className="mt-5 flex flex-col md:hidden">
              {journey.steps.map((s, i) => (
                <li key={s.title} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < last && <span aria-hidden className={cn("absolute top-5 bottom-0 left-[7px] w-px", drawn(i) ? "bg-foreground" : "bg-foreground/20")} />}
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-1 size-4 shrink-0 rounded-full border",
                      reduce || i <= step ? "border-foreground bg-foreground" : "border-foreground/40 bg-background/80"
                    )}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <button type="button" onClick={() => setStep(i)} className="flex flex-wrap items-center gap-2 text-left text-body">
                      <span className={i === step ? "font-medium" : "text-foreground/70"}>{s.title}</span>
                      {i === last && <span className="font-mono text-[10px] text-ink-secondary">{journey.branch}</span>}
                    </button>
                    {i === step && (
                      <div key={`${id}-${step}`} className="motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both]">
                        {s.card}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </HeroParallaxStage>
    </div>
  )
}
