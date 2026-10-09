"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowCounterClockwiseIcon, CheckIcon } from "@phosphor-icons/react"

import { Label, Pill, ScreenBar, ScreenShell, WINDOW_CHROME } from "@/components/product/ui-bits"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Voice AI hero: the whole product as a live pipeline, not a product screen.
 * 01 Incoming -> 02 Context -> 03 The call (voice, language, interruptions,
 * tools) -> 04 Outcome (fields, QA, where it was sent) -> 05 Improve, which
 * loops back to the agent. Three scenarios rotate; the chips switch them.
 * Fictional demo data.
 */

type SourceId = "inbound" | "sip" | "campaign" | "callback"
type Dest = "CRM" | "Webhook" | "SMS" | "Callback" | "Human"
type Line =
  | { who: "caller" | "agent"; text: string; cut?: boolean }
  | { who: "tool"; text: string }

type Scenario = {
  id: string
  chip: string
  source: SourceId
  direction: "Inbound call" | "Outbound call"
  langs: string[]
  /** Index of the transcript line after which the language flips. */
  switchAfter?: number
  context: { src: string; v: string }[]
  lines: Line[]
  duration: string
  outcome: { k: string; v: string }[]
  resolution: { label: string; tone: "live" | "warn" }
  qa: number
  sent: Dest[]
}

const SOURCES: { id: SourceId; label: string; v: string }[] = [
  { id: "inbound", label: "Inbound", v: "+44 20 7946 0•••" },
  { id: "sip", label: "Your carrier", v: "SIP trunk" },
  { id: "campaign", label: "Campaign", v: "March reminders" },
  { id: "callback", label: "Callback", v: "Scheduled" },
]

const DESTS: Dest[] = ["CRM", "Webhook", "SMS", "Callback", "Human"]

const SCENARIOS: Scenario[] = [
  {
    id: "billing",
    chip: "Billing · Hindi",
    source: "inbound",
    direction: "Inbound call",
    langs: ["EN", "HI"],
    switchAfter: 0,
    context: [
      { src: "CRM", v: "Priya Raman · Gold" },
      { src: "History", v: "Called 3 days ago" },
      { src: "API", v: "Payment £86 pending" },
      { src: "Knowledge", v: "Billing policy v3" },
    ],
    lines: [
      { who: "agent", text: "Hi Priya, this is Ria from Halden Energy. How can I help?" },
      { who: "caller", text: "Mera last payment abhi tak apply nahi hua." },
      { who: "tool", text: "Looked up account" },
      { who: "agent", text: "Payment mil gaya hai. Main abhi apply kar deti hoon." },
      { who: "tool", text: "Applied payment · Sent SMS" },
    ],
    duration: "2:14",
    outcome: [
      { k: "Intent", v: "payment_not_applied" },
      { k: "Action", v: "payment_applied" },
      { k: "Language", v: "English → Hindi" },
      { k: "Sentiment", v: "Positive" },
    ],
    resolution: { label: "Resolved", tone: "live" },
    qa: 96,
    sent: ["CRM", "SMS", "Webhook"],
  },
  {
    id: "reminder",
    chip: "Payment reminder · Outbound",
    source: "campaign",
    direction: "Outbound call",
    langs: ["EN"],
    context: [
      { src: "CRM", v: "Tom Hadley · Standard" },
      { src: "API", v: "Invoice £86, due 28 Mar" },
      { src: "History", v: "No previous calls" },
      { src: "Knowledge", v: "Payment plans" },
    ],
    lines: [
      { who: "agent", text: "Hi Tom, it's Ria from Halden Energy, about your March bill of £86, due on the", cut: true },
      { who: "caller", text: "Sorry, I'm driving. Can you call me Friday?" },
      { who: "tool", text: "Booked callback · Fri 10:00" },
      { who: "agent", text: "Of course. I'll call Friday at 10 and text you the details now." },
      { who: "tool", text: "Sent SMS" },
    ],
    duration: "0:48",
    outcome: [
      { k: "Intent", v: "callback_requested" },
      { k: "Action", v: "callback_booked" },
      { k: "Language", v: "English" },
      { k: "Sentiment", v: "Neutral" },
    ],
    resolution: { label: "Callback booked", tone: "warn" },
    qa: 92,
    sent: ["CRM", "Callback", "SMS"],
  },
  {
    id: "escalation",
    chip: "Escalation · Handoff",
    source: "sip",
    direction: "Inbound call",
    langs: ["EN"],
    context: [
      { src: "CRM", v: "Ana Ferreira · Gold" },
      { src: "History", v: "3 calls in 7 days" },
      { src: "API", v: "Open ticket #2291" },
      { src: "Knowledge", v: "Escalation policy" },
    ],
    lines: [
      { who: "caller", text: "This is the third time I'm calling. I want to speak to a person." },
      { who: "agent", text: "I'm sorry, Ana. I can see ticket 2291, so let me get you to the team now." },
      { who: "tool", text: "Transferred to billing team · summary attached" },
      { who: "agent", text: "Connecting you. They'll have the full history, so you won't repeat yourself." },
    ],
    duration: "1:02",
    outcome: [
      { k: "Intent", v: "repeat_complaint" },
      { k: "Action", v: "transferred_to_human" },
      { k: "Language", v: "English" },
      { k: "Sentiment", v: "Frustrated → calm" },
    ],
    resolution: { label: "Transferred", tone: "warn" },
    qa: 94,
    sent: ["Human", "CRM", "Webhook"],
  },
]

const IMPROVE = ["Scored by QA", "Added to simulations", "Agent v5 suggested"]

/* Timeline per scenario: 0 ringing, 1 context, then one step per transcript
   line, then outcome, sent, improve (held), then the next scenario. */
const outcomeStep = (sc: Scenario) => 2 + sc.lines.length
const lastStep = (sc: Scenario) => outcomeStep(sc) + 2
function hold(sc: Scenario, step: number) {
  if (step === 0) return 1200
  if (step === 1) return 1500
  const line = sc.lines[step - 2]
  if (line) return line.who === "tool" ? 1000 : 1700
  if (step === outcomeStep(sc)) return 1400
  if (step === outcomeStep(sc) + 1) return 1200
  return 3600
}

function usePipeline(ref: React.RefObject<Element | null>) {
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  const [state, setState] = useState({ s: 0, step: 0 })
  const sc = SCENARIOS[state.s]

  useEffect(() => {
    if (!inView || reduce) return
    const t = setTimeout(
      () =>
        setState((p) =>
          p.step >= lastStep(SCENARIOS[p.s]) ? { s: (p.s + 1) % SCENARIOS.length, step: 0 } : { s: p.s, step: p.step + 1 }
        ),
      hold(sc, state.step)
    )
    return () => clearTimeout(t)
  }, [inView, reduce, sc, state.step])

  return {
    s: state.s,
    sc,
    step: reduce ? lastStep(sc) : state.step,
    pick: (s: number) => setState({ s, step: 0 }),
  }
}

/* ---------------------------------------------------------------- pieces */

function StepTag({ n, title }: { n: string; title: string }) {
  return (
    <p className="mb-2 inline-flex self-start rounded-full bg-background/85 px-2.5 py-0.5 font-mono text-[11px] text-ink-secondary backdrop-blur-sm">
      {n} · {title}
    </p>
  )
}

/** Hairline between stages with a dot travelling along it while it flows. */
function Flow({ on, className }: { on: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center", className)}>
      <span className="relative h-6 w-px bg-line-strong lg:h-px lg:w-full">
        {on && (
          <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground motion-safe:animate-[flow-y_1s_linear_infinite] lg:top-1/2 lg:left-0 lg:translate-x-0 lg:motion-safe:animate-[flow-x_1s_linear_infinite]" />
        )}
      </span>
    </div>
  )
}

function Row({
  k,
  children,
  className,
  style,
}: {
  k: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div style={style} className={cn("flex items-center justify-between gap-3 border-b border-(--ui-line) py-1.5 last:border-0", className)}>
      <Label>{k}</Label>
      <span className="min-w-0 truncate text-right">{children}</span>
    </div>
  )
}

/* ---------------------------------------------------------------- main */

export function VoicePipeline({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { s, sc, step, pick } = usePipeline(ref)

  const O = outcomeStep(sc)
  const ringing = step === 0
  const contextOn = step >= 1
  const shown = Math.min(Math.max(step - 1, 0), sc.lines.length)
  const live = step >= 2 && step < O
  const ended = step >= O
  const sentOn = step >= O + 1
  const improveOn = step >= O + 2
  const lastLine = sc.lines[shown - 1]
  const talking = live && lastLine?.who !== "tool"
  const lang = sc.switchAfter !== undefined && shown > sc.switchAfter + 1 ? 1 : 0

  return (
    <div ref={ref} className={cn("flex flex-col gap-4 text-[12px]", className)}>
      {/* Scenario chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {SCENARIOS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={i === s}
            onClick={() => pick(i)}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] backdrop-blur-sm transition-colors duration-200",
              i === s ? "bg-foreground text-background" : "bg-background/80 text-ink-secondary hover:text-foreground"
            )}
          >
            {x.chip}
          </button>
        ))}
        <span className="ml-auto hidden rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] text-ink-secondary backdrop-blur-sm sm:inline">
          6 calls live · {(12408 + s * 3 + (ended ? 1 : 0)).toLocaleString("en-GB")} today
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_2rem_1.35fr_2rem_1fr] lg:items-center">
        {/* 01 Incoming + 02 Context */}
        <div className="flex flex-col">
          <StepTag n="01" title="Incoming" />
          <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
            <ScreenBar className="h-9">
              <span className="font-medium">Incoming</span>
              <Label className="ml-auto">Inbound + outbound</Label>
            </ScreenBar>
            <ul className="flex flex-col p-1.5">
              {SOURCES.map((src) => {
                const on = src.id === sc.source
                return (
                  <li
                    key={src.id}
                    className={cn(
                      "flex items-center gap-2 rounded px-2.5 py-1.5 transition-colors duration-300",
                      on ? "bg-(--ui-raised)" : "text-(--ui-muted)"
                    )}
                  >
                    <span className="w-20 shrink-0">{src.label}</span>
                    <span className="min-w-0 truncate font-mono text-[11px] text-(--ui-muted)">{src.v}</span>
                    {on && (
                      <Pill tone={ringing ? "warn" : "live"} className="ml-auto">
                        {ringing ? "Ringing" : "Connected"}
                      </Pill>
                    )}
                  </li>
                )
              })}
            </ul>
          </ScreenShell>

          <Flow on={ringing} className="lg:hidden" />
          <div className="mt-0 lg:mt-4">
            <StepTag n="02" title="Context" />
            <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
              <ScreenBar className="h-9">
                <span className="font-medium">Before the call</span>
                <Pill tone={contextOn ? "live" : "muted"} className="ml-auto">
                  {contextOn ? "Pulled" : "Waiting"}
                </Pill>
              </ScreenBar>
              <div className="px-3 py-1" key={sc.id}>
                {sc.context.map((c, i) => (
                  <Row
                    key={c.src}
                    k={c.src}
                    className={cn("transition-opacity duration-300", contextOn ? "opacity-100" : "opacity-25")}
                    style={{ transitionDelay: contextOn ? `${i * 150}ms` : "0ms" }}
                  >
                    {c.v}
                  </Row>
                ))}
              </div>
            </ScreenShell>
          </div>
        </div>

        <Flow on={step === 1} />

        {/* 03 The call */}
        <div>
          <StepTag n="03" title="The call" />
          <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
            <ScreenBar className="h-9">
              <span className="font-medium">{sc.direction}</span>
              <Pill tone={ended ? "muted" : ringing ? "warn" : "live"}>
                {ended ? `Ended ${sc.duration}` : step < 2 ? "Connecting" : "Live"}
              </Pill>
              <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-(--ui-muted)">
                {sc.langs.map((l, i) => (
                  <span key={l} className="flex items-center gap-1">
                    {i > 0 && <span>→</span>}
                    <span className={cn("rounded px-1", i === lang && "bg-(--ui-raised) text-(--ui-text)")}>{l}</span>
                  </span>
                ))}
              </span>
            </ScreenBar>
            <ol key={sc.id} className="flex h-[18rem] flex-col justify-end gap-2 overflow-hidden px-3 py-3">
              {sc.lines.slice(0, shown).map((l, i) =>
                l.who === "tool" ? (
                  <li
                    key={i}
                    className="flex items-center gap-1.5 self-center rounded-full border border-(--ui-line) bg-(--ui-panel) px-2.5 py-0.5 text-[11px] text-(--ui-muted) motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]"
                  >
                    <CheckIcon weight="bold" className="size-3 text-(--ui-live)" aria-hidden />
                    {l.text}
                  </li>
                ) : (
                  <li
                    key={i}
                    className={cn(
                      "flex max-w-[88%] flex-col gap-0.5 motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]",
                      l.who === "agent" ? "self-start" : "items-end self-end"
                    )}
                  >
                    <Label>
                      {l.who === "agent" ? "Agent" : "Caller"}
                      {l.who === "agent" && l.cut && " · interrupted"}
                    </Label>
                    <span
                      className={cn(
                        "rounded-md px-2.5 py-1.5",
                        l.who === "agent" ? "bg-(--ui-raised)" : "bg-(--ui-text) text-(--ui-bg)"
                      )}
                    >
                      {l.text}
                      {l.who === "agent" && l.cut && <span className="text-(--ui-muted)">…</span>}
                    </span>
                  </li>
                )
              )}
              {step < 2 && (
                <li className="self-center text-(--ui-muted)">{ringing ? "Ringing…" : "Reading context…"}</li>
              )}
            </ol>
            <div className="flex items-center gap-2.5 border-t border-(--ui-line) px-3 py-2">
              <span className="ui-wave flex h-4 items-end gap-[3px]" data-idle={talking ? undefined : ""} aria-hidden>
                {[10, 16, 12, 14, 8].map((h, i) => (
                  <span key={i} className="w-[3px] rounded-full bg-(--ui-text)" style={{ height: h }} />
                ))}
              </span>
              <Label>Ria · natural voice</Label>
              <Label className="ml-auto hidden @xs:inline">Interruptions · tools on</Label>
            </div>
          </ScreenShell>
        </div>

        <Flow on={step === O} />

        {/* 04 Outcome */}
        <div>
          <StepTag n="04" title="Outcome" />
          <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
            <ScreenBar className="h-9">
              <span className="font-medium">After the call</span>
              <Pill tone={ended ? sc.resolution.tone : "muted"} className="ml-auto">
                {ended ? sc.resolution.label : "Waiting"}
              </Pill>
            </ScreenBar>
            <div className="px-3 py-1">
              {sc.outcome.map((r) => (
                <Row key={r.k} k={r.k}>
                  <span className="font-mono text-[11px]">{ended ? r.v : "—"}</span>
                </Row>
              ))}
              <Row k="QA score">
                <span className="font-mono tabular-nums">{ended ? `${sc.qa} / 100` : "—"}</span>
              </Row>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-(--ui-line) px-3 py-2.5">
              <Label>Sent to</Label>
              <div className="flex flex-wrap gap-1">
                {DESTS.map((d) => (
                  <Pill key={d} tone={sentOn && sc.sent.includes(d) ? "live" : "muted"}>
                    {d}
                  </Pill>
                ))}
              </div>
            </div>
          </ScreenShell>
        </div>
      </div>

      {/* 05 Improve: loops back to the agent */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md bg-background/85 px-3 py-2 backdrop-blur-sm">
        <span className="font-mono text-[11px] text-ink-secondary">05 · Improve</span>
        <ol className="flex flex-wrap items-center gap-1.5">
          {IMPROVE.map((x, i) => (
            <li key={x} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-ink-muted">→</span>}
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 transition-colors duration-300",
                  improveOn ? "border-foreground/20 text-foreground" : "border-transparent text-ink-muted"
                )}
                style={{ transitionDelay: improveOn ? `${i * 250}ms` : "0ms" }}
              >
                {x}
              </span>
            </li>
          ))}
        </ol>
        <span className="ml-auto flex items-center gap-1 text-ink-secondary">
          <ArrowCounterClockwiseIcon className="size-3.5" aria-hidden />
          Back into the agent
        </span>
      </div>
    </div>
  )
}
