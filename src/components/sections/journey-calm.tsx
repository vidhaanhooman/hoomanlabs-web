"use client"

import { useEffect, useRef } from "react"
import {
  ArrowRightIcon,
  ChatTextIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  FlowArrowIcon,
  LightningIcon,
  PhoneIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  TextboxIcon,
  type Icon,
} from "@phosphor-icons/react"
import { siHubspot, siWhatsapp, siZendesk, type SimpleIcon } from "simple-icons"

import {
  JOURNEYS,
  SpeechLine,
  clock,
  useJourneyPlayback,
  type Event,
  type JourneyId,
  type SystemId,
} from "@/components/sections/journey"
import { cn } from "@/lib/utils"

/**
 * Calm hero journey (/lab/v3): step rail, one running transcript of every
 * action and line, and a context pane that fills in as the agent learns
 * things. One thing moving at a time; green only marks "now". Remount (key)
 * to switch journey.
 */

type Card = { title: string; rows: [string, string][] }

const CARDS: Record<JourneyId, Partial<Record<number, Card>>> = {
  inbound: {
    1: { title: "From your CRM", rows: [["Customer", "Maya Patel"], ["Balance", "£86.40 due 4 Mar"]] },
    3: { title: "Understood", rows: [["Intent", "Duplicate charge"], ["Sentiment", "Calm"]] },
    4: { title: "Outcome", rows: [["Ticket", "#TCK-2291"], ["Sent to", "Zendesk"]] },
  },
  outbound: {
    0: { title: "New lead", rows: [["Name", "Arjun Mehta"], ["Interest", "Support for 40 agents"]] },
    2: { title: "Enriched", rows: [["Company", "Northwind Ltd"], ["Role", "Head of CX"]] },
    4: { title: "Outcome", rows: [["Next try", "Today 2:00 pm"], ["Follow-up", "WhatsApp sent"]] },
  },
}

const STEP_PAUSE_MS = 900

/** The systems strip: brand marks where we have them, plain icons otherwise. Names are placeholders. */
const SYSTEMS: Record<SystemId, { name: string; brand?: SimpleIcon; icon?: Icon }> = {
  phone: { name: "Phone line", icon: PhoneIcon },
  crm: { name: "HubSpot", brand: siHubspot },
  zendesk: { name: "Zendesk", brand: siZendesk },
  sms: { name: "SMS", icon: ChatTextIcon },
  form: { name: "Website form", icon: TextboxIcon },
  campaigns: { name: "Campaigns", icon: FlowArrowIcon },
  whatsapp: { name: "WhatsApp", brand: siWhatsapp },
}

/**
 * Voice a line with the browser's speech synthesis (agent and caller get
 * different voices). Stand-in until each line has a recorded take. Messages
 * (WhatsApp) aren't spoken. Resolves when done, or after a safety timeout.
 */
function speakLine(e: Event): Promise<void> {
  if (e.kind === "action" || e.channel || typeof window === "undefined" || !("speechSynthesis" in window)) return Promise.resolve()
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"))
    const pick = (names: string[]) => voices.find((v) => names.some((n) => v.name.includes(n)))
    const u = new SpeechSynthesisUtterance(e.text)
    u.voice =
      (e.kind === "agent"
        ? pick(["Samantha", "Google UK English Female", "Serena", "Karen"])
        : pick(["Daniel", "Google UK English Male", "Arthur", "Moira"])) ??
      voices[e.kind === "agent" ? 0 : Math.min(1, voices.length - 1)] ??
      null
    u.rate = e.kind === "agent" ? 1.04 : 0.98
    u.pitch = e.kind === "agent" ? 1.05 : 0.95
    const finish = () => resolve()
    u.onend = finish
    u.onerror = finish
    setTimeout(finish, e.text.length * 95 + 2500)
    window.speechSynthesis.speak(u)
  })
}

export function CalmJourneyWindow({
  id,
  onEnd,
  onPick,
  sound = false,
  onSound,
  tryHref,
}: {
  id: JourneyId
  onEnd?: () => void
  onPick?: (j: JourneyId) => void
  /** Voice the conversation (off by default; browsers need a click first). */
  sound?: boolean
  onSound?: (on: boolean) => void
  /** Where "Get this call on your phone" goes once the journey ends. */
  tryHref?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const journey = JOURNEYS[id]
  const { events, steps } = journey
  const { at, done, step, seconds, speaking, status, jump } = useJourneyPlayback(journey, ref, {
    stepPause: STEP_PAUSE_MS,
    onEnd,
    speak: sound ? speakLine : undefined,
  })

  // Stop talking when sound goes off or the window goes away.
  useEffect(() => {
    if (!sound) window.speechSynthesis?.cancel()
  }, [sound])
  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  // Systems in use now, and ones already touched.
  const live = done ? null : at.i < events.length ? events[at.i].system : null
  const touched = new Set(events.slice(0, done ? events.length : at.i).map((e) => e.system))

  // One running transcript: every action and line so far.
  const lines = events.slice(0, done ? events.length : at.i + 1)
  const cards = Object.entries(CARDS[id]).map(([s, c]) => ({ step: Number(s), ...c! }))

  return (
    <div ref={ref} className="relative">
      <div className="ui-dark @container relative overflow-hidden rounded-lg text-[13px] leading-[1.6] shadow-[0_50px_120px_-40px_oklch(0.2_0.03_120/0.65)] @3xl:text-[15px]">
        {/* Top bar */}
        <div className="flex h-14 items-center gap-3 border-b border-(--ui-line) px-5 @3xl:px-6">
          <span className={cn("size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
          <span className="font-medium">{done ? "Complete" : "Live"}</span>
          <span className="hidden text-(--ui-muted) @md:inline">{journey.title}</span>
          <span className="hidden font-mono text-(--ui-muted) tabular-nums @sm:inline">{clock(seconds)}</span>
          {onSound && (
            <button
              type="button"
              onClick={() => onSound(!sound)}
              aria-pressed={sound}
              aria-label={sound ? "Sound on" : "Listen"}
              className={cn(
                "ml-auto flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition-colors",
                sound ? "border-(--ui-live)/50 text-(--ui-text)" : "border-(--ui-line) text-(--ui-muted) hover:text-(--ui-text)"
              )}
            >
              {sound ? <SpeakerHighIcon className="size-3.5" aria-hidden /> : <SpeakerSlashIcon className="size-3.5" aria-hidden />}
              <span className="hidden @md:inline">{sound ? "Sound on" : "Listen"}</span>
            </button>
          )}
          {onPick && (
            <div role="tablist" aria-label="Journey" className={cn("flex gap-0.5 rounded-full border border-(--ui-line) bg-(--ui-raised) p-0.5", !onSound && "ml-auto")}>
              {(Object.keys(JOURNEYS) as JourneyId[]).map((j) => (
                <button
                  key={j}
                  type="button"
                  role="tab"
                  aria-selected={id === j}
                  onClick={() => onPick(j)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[12px] transition-colors duration-150 @md:px-3",
                    id === j ? "bg-(--ui-text) text-(--ui-bg)" : "text-(--ui-muted) hover:text-(--ui-text)"
                  )}
                >
                  {JOURNEYS[j].label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Narrow: progress in place of the rail */}
        <div className="flex items-center gap-3 border-b border-(--ui-line) px-5 py-2.5 @3xl:hidden">
          <span className="flex flex-1 gap-1">
            {steps.map((s, i) => (
              <span
                key={s.label}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i === step && !done ? "bg-(--ui-live)" : i < step || done ? "bg-(--ui-text)/45" : "bg-(--ui-line)"
                )}
              />
            ))}
          </span>
          <span className="text-[12px] whitespace-nowrap">{steps[step].label}</span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] @3xl:grid-cols-[15rem_minmax(0,1fr)] @5xl:grid-cols-[16rem_minmax(0,1fr)_17rem]">
          {/* Step rail */}
          <ol aria-label="Journey steps" className="hidden flex-col gap-1.5 border-r border-(--ui-line) p-4 @3xl:flex">
            {steps.map((s, i) => {
              const state = i < step || done ? "done" : i === step ? "active" : "todo"
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={state === "active" ? "step" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md border px-3.5 py-3 text-left transition-[background-color,border-color,color] duration-500",
                      state === "active" ? "border-(--ui-live)/40 bg-(--ui-live)/[0.07]" : "border-transparent hover:bg-(--ui-raised)"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                        state === "active" && "border-(--ui-live)/70 text-(--ui-live)",
                        state === "done" && "border-(--ui-line) bg-(--ui-raised) text-(--ui-text)",
                        state === "todo" && "border-(--ui-line) text-(--ui-muted)"
                      )}
                    >
                      {state === "done" ? <CheckIcon weight="bold" className="size-3" /> : <s.icon className="size-3.5" />}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      {s.branch && <span className="font-mono text-[10.5px] text-(--ui-muted)">{s.branch}</span>}
                      <span className={state === "todo" ? "text-(--ui-muted)" : ""}>{s.label}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Feed: this step only */}
          <div className="flex min-w-0 flex-col">
            <ol
              aria-label="Journey transcript"
              className="flex h-72 flex-col justify-end gap-4 overflow-hidden px-5 pt-7 pb-4 @3xl:h-[30rem] @3xl:px-8"
              style={{
                maskImage: "linear-gradient(to bottom, transparent, black 22%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%)",
              }}
            >
              {lines.map((e, i) => {
                const live = i === at.i && !done
                return (
                  <li key={i} className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                    {e.kind === "action" ? (
                      live && at.w === 0 ? (
                        <span className="inline-flex items-center gap-2 text-(--ui-muted)">
                          <CircleNotchIcon className="size-3.5 motion-safe:animate-spin" aria-hidden />
                          {e.pending}…
                        </span>
                      ) : e.done ? (
                        /* The outcome, highlighted */
                        <span className="inline-flex max-w-full items-center gap-2 rounded-md border border-(--ui-live)/40 bg-(--ui-live)/10 px-3 py-2 motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both]">
                          <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-(--ui-live)" aria-hidden />
                          <span className="shrink-0 font-medium">{e.text}</span>
                          {e.detail && <span className="truncate font-mono text-[12px] text-(--ui-muted)">{e.detail}</span>}
                        </span>
                      ) : (
                        <span className="inline-flex max-w-full items-center gap-2">
                          <LightningIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-muted)" aria-hidden />
                          <span className="shrink-0">{e.text}</span>
                          {e.detail && <span className="truncate font-mono text-[12px] text-(--ui-muted)">{e.detail}</span>}
                        </span>
                      )
                    ) : (
                      <SpeechLine event={e} words={live ? at.w : Infinity} live={live} />
                    )}
                  </li>
                )
              })}
              {done && tryHref && (
                <li className="motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_400ms_both]">
                  <a
                    href={tryHref}
                    className="group inline-flex items-center gap-2 rounded-full bg-(--ui-text) px-4 py-2 text-[13px] font-medium text-(--ui-bg) transition-transform active:scale-[0.97]"
                  >
                    <PhoneIcon weight="fill" className="size-3.5" aria-hidden />
                    Get this call on your phone
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </li>
              )}
            </ol>

            {/* Status */}
            <div className="flex h-12 items-center gap-3 border-t border-(--ui-line) px-5 text-(--ui-muted) @3xl:px-8">
              <span className="ui-wave flex h-4 items-end gap-[3px]" data-idle={speaking ? undefined : ""} aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={cn("block h-full w-[3px] rounded-full", speaking ? "bg-(--ui-text)/80" : "bg-(--ui-text)/30")} />
                ))}
              </span>
              <span aria-live="polite">{status}</span>
              <span className="ml-auto font-mono text-[11px] tabular-nums">
                {step + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* What the agent has learned, filled in as it goes */}
          <aside aria-label="Context" className="hidden flex-col gap-5 border-l border-(--ui-line) bg-(--ui-panel) p-5 @5xl:flex">
            {cards.map((c) => {
              // The outcome lands only when the journey is done.
              const outcome = c.step === steps.length - 1
              const known = done || (!outcome && step >= c.step)
              return (
                <div
                  key={c.title}
                  className={cn(
                    "flex flex-col gap-2.5 transition-[background-color,border-color] duration-500",
                    outcome && "mt-auto rounded-md border p-3.5",
                    outcome && (known ? "border-(--ui-live)/40 bg-(--ui-live)/10" : "border-(--ui-line)")
                  )}
                >
                  <span className={cn("flex items-center gap-1.5 font-mono text-[11px]", outcome && known ? "text-(--ui-live)" : "text-(--ui-muted)")}>
                    {outcome && known && <CheckCircleIcon weight="fill" className="size-3.5" aria-hidden />}
                    {c.title}
                  </span>
                  <dl className="flex flex-col gap-2">
                    {c.rows.map(([k, v]) => (
                      <div key={k} className="flex flex-col">
                        <dt className="text-[11px] text-(--ui-muted)">{k}</dt>
                        <dd className={cn("transition-colors duration-500", !known && "text-(--ui-muted)")}>{known ? v : "…"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )
            })}
          </aside>
        </div>

        {/* Systems the agent works in; the one in use now lights up */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-(--ui-line) px-5 py-3 [scrollbar-width:none] @3xl:px-6">
          <span className="mr-1 shrink-0 font-mono text-[11px] text-(--ui-muted)">Connected</span>
          {journey.systems.map((k) => {
            const sys = SYSTEMS[k]
            const now = live === k
            const used = touched.has(k)
            return (
              <span
                key={k}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition-[border-color,color,box-shadow] duration-500",
                  now
                    ? "border-(--ui-live)/60 text-(--ui-text) shadow-[0_0_16px_-4px_var(--ui-live)]"
                    : used
                      ? "border-(--ui-line) text-(--ui-text)"
                      : "border-(--ui-line) text-(--ui-muted)"
                )}
              >
                {sys.brand ? (
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <path d={sys.brand.path} />
                  </svg>
                ) : (
                  sys.icon && <sys.icon className="size-3.5" aria-hidden />
                )}
                {sys.name}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
