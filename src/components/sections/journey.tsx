"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  ChatCircleTextIcon,
  CheckCircleIcon,
  CircleNotchIcon,
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
 * painting. A vertical rail on the left lists the steps and lights the one
 * running now; the feed streams the journey live (actions spin, then resolve;
 * speech arrives word by word at talking pace); the side panel fills in as
 * the journey learns things; a call timer runs in the top bar.
 *
 * Plays while on screen and loops; clicking a step jumps to it. Reduced
 * motion: the finished journey, still clickable.
 */

export type Event =
  | { step: number; kind: "action"; pending: string; text: string; detail?: string; done?: boolean }
  | { step: number; kind: "agent" | "caller"; text: string; channel?: string }

export type Journey = {
  label: string
  title: string
  steps: { label: string; icon: Icon; branch?: string }[]
  events: Event[]
  /** Side panel rows; each appears once its step is reached. */
  context: { label: string; value: string; step: number }[]
  outcome: string
}

export const JOURNEYS: Record<"inbound" | "outbound", Journey> = {
  inbound: {
    label: "Inbound",
    title: "Inbound call · billing line",
    steps: [
      { label: "Call comes in", icon: PhoneIncomingIcon },
      { label: "Context retrieved", icon: DatabaseIcon },
      { label: "Contextual greeting", icon: SparkleIcon },
      { label: "Conversation", icon: ChatCircleTextIcon },
      { label: "Ticket to CRM", icon: TicketIcon, branch: "If unresolved" },
    ],
    events: [
      { step: 0, kind: "action", pending: "Answering", text: "Call answered", detail: "+44 20 7946 0958 · 1st ring" },
      { step: 1, kind: "action", pending: "Looking up caller", text: "Customer found", detail: "CRM · 140 ms" },
      { step: 1, kind: "action", pending: "Loading history", text: "Last call loaded", detail: "12 Feb · meter reading" },
      { step: 2, kind: "agent", text: "Hi Maya, it’s Ria from Halden Energy. Is this about your March bill?" },
      { step: 3, kind: "caller", text: "Yes. I think I was charged twice?" },
      { step: 3, kind: "agent", text: "You’re right, I can see two charges of £86.40 on the 4th of March." },
      { step: 3, kind: "caller", text: "Can you refund one today?" },
      { step: 3, kind: "agent", text: "Refunds this size need a quick approval, so I’ll raise it now and text you the reference." },
      { step: 4, kind: "action", pending: "Checking refund policy", text: "Unresolved", detail: "needs approval · over £50" },
      { step: 4, kind: "action", pending: "Creating ticket", text: "Ticket created", detail: "#TCK-2291 · Zendesk" },
      { step: 4, kind: "action", pending: "Sending SMS", text: "SMS sent", detail: "reference to customer", done: true },
    ],
    context: [
      { label: "Customer", value: "Maya Patel", step: 1 },
      { label: "Account", value: "HE-48213", step: 1 },
      { label: "Balance", value: "£86.40 due 4 Mar", step: 1 },
      { label: "Intent", value: "Duplicate charge", step: 3 },
      { label: "Sentiment", value: "Calm", step: 3 },
    ],
    outcome: "Ticket #TCK-2291",
  },
  outbound: {
    label: "Outbound",
    title: "Outbound lead · demo requests",
    steps: [
      { label: "Form submitted", icon: FileTextIcon },
      { label: "Added to campaign", icon: MegaphoneIcon },
      { label: "Details enriched", icon: UserPlusIcon },
      { label: "Call placed", icon: PhoneOutgoingIcon },
      { label: "Message and retry", icon: WhatsappLogoIcon, branch: "If unanswered" },
    ],
    events: [
      { step: 0, kind: "action", pending: "Receiving form", text: "Form submitted", detail: "Demo request · website" },
      { step: 1, kind: "action", pending: "Adding to campaign", text: "Added to campaign", detail: "New demo requests · #1 in queue" },
      { step: 2, kind: "action", pending: "Enriching lead", text: "Lead enriched", detail: "company · role · region" },
      { step: 3, kind: "action", pending: "Dialling +91 98••• ••210", text: "Ringing", detail: "6 rings" },
      { step: 3, kind: "action", pending: "Waiting for answer", text: "No answer", detail: "voicemail skipped" },
      { step: 4, kind: "agent", channel: "WhatsApp", text: "Hi Arjun, it’s Ria from HoomanLabs. Sorry we missed you! Is 2 pm a good time to call back?" },
      { step: 4, kind: "action", pending: "Scheduling retry", text: "Retry queued", detail: "today 2:00 pm", done: true },
    ],
    context: [
      { label: "Lead", value: "Arjun Mehta", step: 0 },
      { label: "Interest", value: "Support for 40 agents", step: 0 },
      { label: "Campaign", value: "New demo requests", step: 1 },
      { label: "Company", value: "Northwind Ltd", step: 2 },
      { label: "Role", value: "Head of CX", step: 2 },
    ],
    outcome: "Retry at 2:00 pm",
  },
}

export type JourneyId = keyof typeof JOURNEYS

/* Pacing. Speech streams word by word; a short "breath" before each line. */
const ACTION_PENDING_MS = 850
const AFTER_ACTION_MS = 450
const BREATH_MS = 650
const AFTER_LINE_MS = 650
const HOLD_MS = 5500
const wordMs = (who: "agent" | "caller", n: number) => (who === "agent" ? 95 : 125) + ((n * 37) % 60)

export function clock(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

/** Playhead: events before `i` are complete; event `i` is in progress at `w`
 *  (actions: 0 pending, 1 resolved; speech: words shown). */
type Head = { i: number; w: number }

/**
 * Shared playback for the hero journey variants. Advances one event at a
 * time while `ref` is on screen; `stepPause` adds a beat between steps.
 */
export function useJourneyPlayback(journey: Journey, ref: React.RefObject<HTMLElement | null>, { stepPause = 0 } = {}) {
  const [head, setHead] = useState<Head>({ i: 0, w: 0 })
  const [seconds, setSeconds] = useState(0)
  const reduce = usePrefersReducedMotion()
  const inView = useInView(ref, { amount: 0.3 })

  const { events, steps } = journey
  const at: Head = reduce ? { i: events.length, w: 0 } : head
  const done = at.i >= events.length
  const current = done ? null : events[at.i]
  const step = done ? steps.length - 1 : current!.step
  const playing = !reduce && inView

  // Advance the playhead.
  useEffect(() => {
    if (!playing) return
    let next: Head
    let ms: number
    if (done) {
      next = { i: 0, w: 0 }
      ms = HOLD_MS
    } else if (current!.kind === "action") {
      next = head.w === 0 ? { i: head.i, w: 1 } : { i: head.i + 1, w: 0 }
      ms = head.w === 0 ? ACTION_PENDING_MS : AFTER_ACTION_MS
    } else {
      const words = current!.text.split(" ").length
      next = head.w < words ? { i: head.i, w: head.w + 1 } : { i: head.i + 1, w: 0 }
      ms = head.w === 0 ? BREATH_MS : head.w < words ? wordMs(current!.kind, head.w) : AFTER_LINE_MS
    }
    // A beat before a new step starts.
    if (!done && next.i !== head.i && next.i < events.length && events[next.i].step !== current!.step) ms += stepPause
    const t = setTimeout(() => {
      setHead(next)
      if (done) setSeconds(0)
    }, ms)
    return () => clearTimeout(t)
  }, [playing, done, current, head, events, stepPause])

  // Call timer while the journey runs.
  useEffect(() => {
    if (!playing || done) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [playing, done])

  const reset = () => {
    setHead({ i: 0, w: 0 })
    setSeconds(0)
  }
  /** Jump to the start of a step. */
  const jump = (s: number) => setHead({ i: events.findIndex((e) => e.step === s), w: 0 })

  const speaking = current && current.kind !== "action" && at.w > 0 ? current.kind : null
  const status = done
    ? "Journey complete"
    : current!.kind === "action"
      ? at.w === 0
        ? `${current!.pending}…`
        : current!.text
      : speaking === "agent"
        ? current!.channel
          ? `Agent writing on ${current!.channel}`
          : "Agent speaking"
        : speaking === "caller"
          ? "Caller speaking"
          : "Listening"

  return { at, done, current, step, seconds, speaking, status, reset, jump }
}

export function Journey() {
  const [id, setId] = useState<JourneyId>("inbound")
  const ref = useRef<HTMLDivElement>(null)
  const journey = JOURNEYS[id]
  const { events, steps } = journey
  const { at, done, step, seconds, speaking, status, reset, jump } = useJourneyPlayback(journey, ref)

  const pick = (j: JourneyId) => {
    setId(j)
    reset()
  }

  return (
    <div ref={ref}>
      <HeroParallaxStage className="rounded-xl">
        <div className="relative z-10 px-3 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-24">
          <div className="ui-dark @container overflow-hidden rounded-lg text-[13px] leading-[1.55] @5xl:text-[14px] shadow-[0_40px_100px_-40px_oklch(0.2_0.03_120/0.7)]">
            {/* Top bar */}
            <div className="flex h-12 items-center gap-3 border-b border-(--ui-line) px-4">
              <span className="relative flex size-2">
                {!done && <span className="absolute inset-0 rounded-full bg-(--ui-live) opacity-60 motion-safe:animate-ping" />}
                <span className={cn("relative size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
              </span>
              <span className="font-medium">{done ? "Complete" : "Live"}</span>
              <span className="hidden text-(--ui-muted) @md:inline">{journey.title}</span>
              <span className="font-mono text-(--ui-muted) tabular-nums">{clock(seconds)}</span>
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

            {/* Narrow screens: compact progress in place of the rail */}
            <div className="flex items-center gap-3 border-b border-(--ui-line) px-4 py-2.5 @3xl:hidden">
              <span className="flex flex-1 gap-1">
                {steps.map((s, i) => (
                  <span
                    key={s.label}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      i < step || done ? "bg-(--ui-live)" : i === step ? "bg-(--ui-live)/50" : "bg-(--ui-line)"
                    )}
                  />
                ))}
              </span>
              <span className="text-[12px] whitespace-nowrap">
                <span className="text-(--ui-muted)">{step + 1}/{steps.length}</span> {steps[step].label}
              </span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)] @3xl:grid-cols-[14.5rem_minmax(0,1fr)_16rem]">
              {/* Step rail */}
              <ol aria-label="Journey steps" className="hidden flex-col gap-1 border-r border-(--ui-line) p-3 @3xl:flex">
                {steps.map((s, i) => {
                  const state = i < step || done ? "done" : i === step ? "active" : "todo"
                  return (
                    <li key={s.label} className="relative">
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute top-9 -bottom-1 left-[1.4rem] w-px transition-colors duration-500",
                            state === "done" ? "bg-(--ui-live)/60" : "bg-(--ui-line)"
                          )}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => jump(i)}
                        aria-current={state === "active" ? "step" : undefined}
                        className={cn(
                          "relative flex w-full items-start gap-2.5 rounded-md border px-2.5 py-2 text-left transition-[background-color,border-color,color] duration-300",
                          state === "active"
                            ? "border-(--ui-live)/45 bg-(--ui-live)/10 shadow-[0_0_24px_-8px_var(--ui-live)]"
                            : "border-transparent hover:bg-(--ui-raised)"
                        )}
                      >
                        <span
                          className={cn(
                            "relative grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                            state === "active" && "border-(--ui-live) bg-(--ui-bg) text-(--ui-live)",
                            state === "done" && "border-transparent bg-(--ui-live)/15 text-(--ui-live)",
                            state === "todo" && "border-(--ui-line) bg-(--ui-bg) text-(--ui-muted)"
                          )}
                        >
                          {state === "active" && (
                            <span className="absolute inset-0 rounded-full border border-(--ui-live) motion-safe:animate-ping motion-safe:[animation-duration:1.6s]" />
                          )}
                          {state === "done" ? <CheckCircleIcon weight="fill" className="size-4" /> : <s.icon className="size-3.5" />}
                        </span>
                        <span className="flex min-w-0 flex-col">
                          {s.branch && <span className="font-mono text-[10.5px] text-(--ui-muted)">{s.branch}</span>}
                          <span className={state === "todo" ? "text-(--ui-muted)" : ""}>{s.label}</span>
                          {state === "active" && <span className="text-[11px] text-(--ui-live)">Now</span>}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              {/* Live feed */}
              <div className="flex min-w-0 flex-col">
                <ol
                  key={id}
                  aria-label="Journey events"
                  className="flex h-80 flex-col justify-end gap-3 overflow-hidden px-4 pt-4 pb-3 @3xl:h-[28rem] @3xl:px-6"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 25%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%)",
                  }}
                >
                  {events.slice(0, Math.min(at.i + 1, events.length)).map((e, i) => {
                    const live = i === at.i
                    const firstOfStep = i === 0 || events[i - 1].step !== e.step
                    return (
                      <li key={i} className="flex flex-col gap-2.5">
                        {firstOfStep && (
                          <span
                            className={cn(
                              "flex items-center gap-2 pt-1 font-mono text-[10.5px] tracking-wide uppercase transition-colors duration-300",
                              e.step === step && !done ? "text-(--ui-live)" : "text-(--ui-muted)"
                            )}
                          >
                            {String(e.step + 1).padStart(2, "0")} · {steps[e.step].label}
                            <span className="h-px flex-1 bg-(--ui-line)" />
                          </span>
                        )}
                        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300">
                          {e.kind === "action" ? (
                            live && at.w === 0 ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-(--ui-line) px-2.5 py-1 text-[12px] text-(--ui-muted)">
                                <CircleNotchIcon className="size-3.5 motion-safe:animate-spin" aria-hidden />
                                {e.pending}…
                              </span>
                            ) : (
                              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-(--ui-line) bg-(--ui-raised) px-2.5 py-1 text-[12px]">
                                {e.done ? (
                                  <CheckCircleIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-live)" aria-hidden />
                                ) : (
                                  <LightningIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-live)" aria-hidden />
                                )}
                                <span className="shrink-0">{e.text}</span>
                                {e.detail && <span className="truncate font-mono text-(--ui-muted)">{e.detail}</span>}
                              </span>
                            )
                          ) : (
                            <SpeechLine event={e} words={live ? at.w : Infinity} live={live} />
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ol>

                {/* Status */}
                <div className="flex h-11 items-center gap-3 border-t border-(--ui-line) px-4 text-(--ui-muted)">
                  <span className="ui-wave flex h-4 items-end gap-[3px]" data-idle={speaking ? undefined : ""} aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={cn("block h-full w-[3px] rounded-full", speaking ? "bg-(--ui-live)" : "bg-(--ui-text)/50")} />
                    ))}
                  </span>
                  <span aria-live="polite" className={speaking ? "text-(--ui-text)" : ""}>
                    {status}
                  </span>
                </div>
              </div>

              {/* Context, filled as the journey learns it */}
              <aside className="hidden flex-col gap-4 border-l border-(--ui-line) bg-(--ui-panel) p-4 @3xl:flex">
                <dl className="flex flex-col gap-2.5">
                  {journey.context.map((row) => {
                    const known = done || step >= row.step
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
                    {done ? journey.outcome : "In progress"}
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

/** A transcript line that streams in word by word; a blinking caret while it's live. */
export function SpeechLine({ event, words, live }: { event: Extract<Event, { kind: "agent" | "caller" }>; words: number; live: boolean }) {
  const all = event.text.split(" ")
  const shown = all.slice(0, words).join(" ")
  const speaking = live && words < all.length
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3">
      <span className={cn("flex items-center gap-1.5 pt-px text-[12px]", speaking ? "text-(--ui-live)" : "text-(--ui-muted)")}>
        {event.kind === "agent" ? (event.channel ?? "Agent") : "Caller"}
      </span>
      <p className={cn("min-h-[1.5em]", event.kind === "caller" && "text-(--ui-text)/80")}>
        {words === 0 ? (
          <span className="ui-wave inline-flex h-3 items-end gap-[2px] align-middle" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-full w-[3px] rounded-full bg-(--ui-muted)" />
            ))}
          </span>
        ) : (
          shown
        )}
        {speaking && words > 0 && <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-(--ui-text) motion-safe:animate-[blink_1s_steps(1)_infinite]" />}
      </p>
    </div>
  )
}
