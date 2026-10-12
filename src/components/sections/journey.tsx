"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  ChatCircleTextIcon,
  CheckCircleIcon,
  DatabaseIcon,
  FileTextIcon,
  LightningIcon,
  MegaphoneIcon,
  PhoneIncomingIcon,
  PhoneOutgoingIcon,
  SparkleIcon,
  TicketIcon,
  UserPlusIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react"

import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Hero journey (/lab/v3), in the product-window style (`ui-dark`) on the
 * painting. The pipeline runs across the top; the feed below builds up one
 * event at a time (actions as chips, speech as transcript lines); the side
 * panel fills in as each step learns something; the status bar says what's
 * happening now. Inbound / outbound switch in the top bar.
 *
 * Plays while on screen and loops; clicking a step jumps to it. Reduced
 * motion: the finished journey, still clickable.
 */

type Event =
  | { step: number; kind: "action"; text: string; detail?: string; done?: boolean }
  | { step: number; kind: "agent" | "caller"; text: string }

type Journey = {
  label: string
  title: string
  steps: { label: string; icon: Icon; status: string; branch?: string }[]
  events: Event[]
  /** Side panel rows; each appears once its step is reached. */
  context: { label: string; value: string; step: number }[]
  outcome: { pending: string; done: string }
}

const JOURNEYS: Record<"inbound" | "outbound", Journey> = {
  inbound: {
    label: "Inbound",
    title: "Inbound call",
    steps: [
      { label: "Call comes in", icon: PhoneIncomingIcon, status: "Ringing" },
      { label: "Context", icon: DatabaseIcon, status: "Retrieving customer context" },
      { label: "Greeting", icon: SparkleIcon, status: "Agent speaking" },
      { label: "Conversation", icon: ChatCircleTextIcon, status: "In conversation" },
      { label: "Ticket to CRM", icon: TicketIcon, status: "Ticket sent to CRM", branch: "If unresolved" },
    ],
    events: [
      { step: 0, kind: "action", text: "Incoming call", detail: "+44 20 7946 0958 · billing line" },
      { step: 1, kind: "action", text: "Customer found", detail: "CRM · 140 ms" },
      { step: 1, kind: "action", text: "Last call loaded", detail: "12 Feb · meter reading" },
      { step: 2, kind: "agent", text: "Hi Maya, it’s Ria from Halden Energy. Is this about your March bill?" },
      { step: 3, kind: "caller", text: "Yes, I think I was charged twice." },
      { step: 3, kind: "agent", text: "I can see two charges of £86.40 on 4 March. A refund this size needs approval, so I’ll raise it now." },
      { step: 4, kind: "action", text: "Unresolved", detail: "refund needs approval" },
      { step: 4, kind: "action", text: "Ticket created", detail: "#TCK-2291 · Zendesk" },
      { step: 4, kind: "action", text: "SMS sent", detail: "ticket number to customer", done: true },
    ],
    context: [
      { label: "Customer", value: "Maya Patel", step: 1 },
      { label: "Account", value: "HE-48213", step: 1 },
      { label: "Balance", value: "£86.40 due 4 Mar", step: 1 },
      { label: "Intent", value: "Duplicate charge", step: 3 },
      { label: "Sentiment", value: "Calm", step: 3 },
    ],
    outcome: { pending: "In progress", done: "Ticket #TCK-2291" },
  },
  outbound: {
    label: "Outbound",
    title: "Outbound lead",
    steps: [
      { label: "Form submitted", icon: FileTextIcon, status: "New lead received" },
      { label: "Campaign", icon: MegaphoneIcon, status: "Adding to campaign" },
      { label: "Enrich", icon: UserPlusIcon, status: "Enriching lead" },
      { label: "Call placed", icon: PhoneOutgoingIcon, status: "Calling" },
      { label: "Message + retry", icon: WhatsappLogoIcon, status: "Follow-up scheduled", branch: "If unanswered" },
    ],
    events: [
      { step: 0, kind: "action", text: "Form submitted", detail: "Demo request · website" },
      { step: 1, kind: "action", text: "Added to campaign", detail: "New demo requests · position 1" },
      { step: 2, kind: "action", text: "Lead enriched", detail: "company, role, region" },
      { step: 3, kind: "action", text: "Calling Arjun", detail: "+91 98••• ••210" },
      { step: 3, kind: "action", text: "No answer", detail: "rang 6 times" },
      { step: 4, kind: "agent", text: "WhatsApp: Hi Arjun, sorry we missed you. Is 2 pm a good time to call back?" },
      { step: 4, kind: "action", text: "Retry queued", detail: "today 2:00 pm", done: true },
    ],
    context: [
      { label: "Lead", value: "Arjun Mehta", step: 0 },
      { label: "Interest", value: "Support for 40 agents", step: 0 },
      { label: "Campaign", value: "New demo requests", step: 1 },
      { label: "Company", value: "Northwind Ltd", step: 2 },
      { label: "Role", value: "Head of CX", step: 2 },
    ],
    outcome: { pending: "In progress", done: "Retry at 2:00 pm" },
  },
}

type JourneyId = keyof typeof JOURNEYS

const HOLD_MS = 5000

function delayFor(e: Event) {
  if (e.kind === "action") return 1100
  return Math.min(2800, Math.max(1300, e.text.length * 26))
}

export function Journey() {
  const [id, setId] = useState<JourneyId>("inbound")
  const [shown, setShown] = useState(1)
  const reduce = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const pipe = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { amount: 0.3 })

  const journey = JOURNEYS[id]
  const { events, steps } = journey
  const visible = reduce ? events.length : shown
  const done = visible >= events.length
  const step = events[visible - 1].step

  // One event at a time while on screen; hold on the finished journey, then loop.
  useEffect(() => {
    if (reduce || !inView) return
    const t = setTimeout(
      () => setShown((n) => (n >= events.length ? 1 : n + 1)),
      done ? HOLD_MS : delayFor(events[visible])
    )
    return () => clearTimeout(t)
  }, [visible, done, events, reduce, inView])

  // On narrow screens the pipeline scrolls; keep the active step in view.
  useEffect(() => {
    const ol = pipe.current
    const el = ol?.querySelector<HTMLElement>("[aria-current=step]")
    if (ol && el && ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" })
  }, [step, id])

  const pick = (j: JourneyId) => {
    setId(j)
    setShown(1)
  }
  /** Jump to the end of a step. */
  const jump = (s: number) => setShown(events.findLastIndex((e) => e.step === s) + 1)

  const next = done ? null : events[visible]
  const status = done
    ? steps[steps.length - 1].status
    : next?.kind === "agent"
      ? "Agent speaking"
      : next?.kind === "caller"
        ? "Caller speaking"
        : steps[next?.step ?? step].status

  return (
    <div ref={ref}>
      <HeroParallaxStage className="rounded-xl">
        <div className="relative z-10 px-3 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="ui-dark @container overflow-hidden rounded-lg text-[13px] leading-[1.5] shadow-[0_40px_100px_-40px_oklch(0.2_0.03_120/0.7)]">
            {/* Top bar */}
            <div className="flex h-12 items-center gap-3 border-b border-(--ui-line) px-4">
              <span className="relative flex size-2">
                {!done && <span className="absolute inset-0 rounded-full bg-(--ui-live) opacity-60 motion-safe:animate-ping" />}
                <span className={cn("relative size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
              </span>
              <span className="font-medium">{done ? "Complete" : "Live"}</span>
              <span className="hidden text-(--ui-muted) @md:inline">{journey.title}</span>
              <div role="tablist" aria-label="Journey" className="ml-auto flex gap-0.5 rounded-full border border-(--ui-line) bg-(--ui-raised) p-0.5">
                {(Object.keys(JOURNEYS) as JourneyId[]).map((j) => (
                  <button
                    key={j}
                    type="button"
                    role="tab"
                    aria-selected={id === j}
                    onClick={() => pick(j)}
                    className={cn(
                      "rounded-full px-3 py-1 text-[12px] transition-colors duration-150",
                      id === j ? "bg-(--ui-text) text-(--ui-bg)" : "text-(--ui-muted) hover:text-(--ui-text)"
                    )}
                  >
                    {JOURNEYS[j].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <ol ref={pipe} className="relative flex items-center gap-2 overflow-x-auto border-b border-(--ui-line) px-4 py-3.5 [scrollbar-width:none]" aria-label="Pipeline">
              {steps.map((s, i) => {
                const state = i < step || (done && i === step) ? "done" : i === step ? "active" : "todo"
                return (
                  <li key={s.label} className={cn("flex items-center gap-2", i > 0 && "flex-1")}>
                    {i > 0 && (
                      <span aria-hidden className={cn("relative h-px min-w-6 flex-1", i <= step ? "bg-(--ui-live)/70" : "bg-(--ui-line)")}>
                        {i === step && !done && (
                          <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-(--ui-live) shadow-[0_0_8px_var(--ui-live)] motion-safe:animate-[flow-x_1.1s_ease-in-out_infinite]" />
                        )}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={state === "active" ? "step" : undefined}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] whitespace-nowrap transition-colors duration-300",
                        state === "active" && "border-(--ui-live)/60 bg-(--ui-live)/10 text-(--ui-text)",
                        state === "done" && "border-(--ui-line) bg-(--ui-raised) text-(--ui-text)",
                        state === "todo" && "border-(--ui-line) text-(--ui-muted) hover:text-(--ui-text)"
                      )}
                    >
                      {state === "done" ? (
                        <CheckCircleIcon weight="fill" className="size-3.5 text-(--ui-live)" aria-hidden />
                      ) : (
                        <s.icon className={cn("size-3.5", state === "active" && "text-(--ui-live)")} aria-hidden />
                      )}
                      {s.branch && <span className="font-mono text-[10.5px] text-(--ui-muted)">{s.branch} →</span>}
                      {s.label}
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="grid grid-cols-[minmax(0,1fr)] @3xl:grid-cols-[minmax(0,1fr)_16rem]">
              {/* Feed */}
              <div className="flex flex-col">
                <ol
                  key={id}
                  aria-label="Journey events"
                  className="flex h-80 flex-col justify-end gap-3 overflow-hidden px-4 pt-4 pb-3 @3xl:h-[22rem]"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 22%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%)",
                  }}
                >
                  {events.slice(0, visible).map((e, i) => (
                    <li key={i} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300">
                      {e.kind === "action" ? (
                        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-(--ui-line) bg-(--ui-raised) px-2.5 py-1 text-[12px]">
                          {e.done ? (
                            <CheckCircleIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-live)" aria-hidden />
                          ) : (
                            <LightningIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-live)" aria-hidden />
                          )}
                          <span className="shrink-0">{e.text}</span>
                          {e.detail && <span className="truncate font-mono text-(--ui-muted)">{e.detail}</span>}
                        </span>
                      ) : (
                        <div className="grid grid-cols-[3.75rem_1fr] gap-3">
                          <span className="pt-px text-[12px] text-(--ui-muted)">{e.kind === "agent" ? "Agent" : "Caller"}</span>
                          <p className={e.kind === "agent" ? "" : "text-(--ui-text)/80"}>{e.text}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>

                {/* Status */}
                <div className="flex h-11 items-center gap-3 border-t border-(--ui-line) px-4 text-(--ui-muted)">
                  <span className="ui-wave flex h-4 items-end gap-[3px]" data-idle={done || next?.kind === "action" ? "" : undefined} aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className="block h-full w-[3px] rounded-full bg-(--ui-text)/70" />
                    ))}
                  </span>
                  <span aria-live="polite">{status}</span>
                  <span className="ml-auto font-mono text-[11px] tabular-nums">
                    Step {step + 1} / {steps.length}
                  </span>
                </div>
              </div>

              {/* Context, filled as the journey learns it */}
              <aside className="hidden flex-col gap-4 border-l border-(--ui-line) bg-(--ui-panel) p-4 @3xl:flex">
                <dl className="flex flex-col gap-2.5">
                  {journey.context.map((row) => {
                    const known = step >= row.step
                    return (
                      <div key={row.label} className="flex flex-col">
                        <dt className="text-[11px] text-(--ui-muted)">{row.label}</dt>
                        <dd className={cn("transition-colors duration-300", !known && "text-(--ui-muted)")}>{known ? row.value : "…"}</dd>
                      </div>
                    )
                  })}
                </dl>
                <div className="h-px bg-(--ui-line)" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-(--ui-muted)">Outcome</span>
                  <span className={cn("flex items-center gap-1.5", !done && "text-(--ui-muted)")}>
                    {done && <CheckCircleIcon weight="fill" className="size-4 text-(--ui-live)" aria-hidden />}
                    {done ? journey.outcome.done : journey.outcome.pending}
                  </span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </HeroParallaxStage>
    </div>
  )
}
