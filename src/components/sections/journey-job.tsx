"use client"

import { useEffect, useRef, useState } from "react"
import {
  CalendarCheckIcon,
  ChatCircleTextIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleNotchIcon,
  CurrencyInrIcon,
  HandshakeIcon,
  LightningIcon,
  PackageIcon,
  PhoneCallIcon,
  PlayIcon,
  SealCheckIcon,
  StarIcon,
  TruckIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react"

import { ICON_ROW, SpeechLine, clock, useJourneyPlayback, type Journey } from "@/components/sections/journey"
import { cn } from "@/lib/utils"

/**
 * Homepage hero: one job from first call to done ("talk, follow up and
 * finish the job"). The rail groups the steps by phase (on the call,
 * follow-up, job done); the transcript streams the call, marks where it
 * ends, then carries on with the follow-up on WhatsApp and the actions that
 * close the job. Above it, the call itself: live while it runs, then its
 * recording. The side pane fills in as the agent learns things, with the
 * outcome at the end (chips under the line stand in for it on narrow
 * windows). Opens part-way in so it's never blank; remount (key) to switch.
 * All names, numbers and companies are made up.
 */

type Card = { title: string; rows: [string, string][]; from?: number }
type Job = Journey & { company: string; customer: string; phone: string; cards: Card[] }

export const JOBS = {
  support: {
    label: "Support",
    title: "Inbound · damaged order",
    company: "Lumen Jewels",
    customer: "Neha Kapoor",
    phone: "+91 99300 ••• 18",
    steps: [
      { label: "Order found", icon: PackageIcon, phase: "On the call" },
      { label: "Issue understood", icon: ChatCircleTextIcon, phase: "On the call" },
      { label: "Photo on WhatsApp", icon: WhatsappLogoIcon, phase: "Follow-up" },
      { label: "Replacement shipped", icon: TruckIcon, phase: "Follow-up" },
      { label: "Delivered and rated", icon: StarIcon, phase: "Job done" },
    ],
    events: [
      { step: 0, kind: "action", pending: "Finding order", text: "Order found", detail: "#LJ-20931 · delivered 2 Nov" },
      { step: 0, kind: "agent", text: "Hi Neha, Ria from Lumen Jewels. Is this about your order from 2 November?" },
      { step: 1, kind: "caller", text: "Yes. The ring arrived with a bent clasp." },
      { step: 1, kind: "agent", text: "Sorry about that. I’ll send you a WhatsApp link for a photo, and we’ll replace it." },
      { step: 1, kind: "action", pending: "Ending call", text: "Call ended", marker: "call-ended" },
      { step: 2, kind: "agent", channel: "WhatsApp", text: "Here’s the link for a photo of the clasp. It takes a minute." },
      { step: 2, kind: "caller", channel: "WhatsApp", text: "Done, photo sent." },
      { step: 2, kind: "action", pending: "Checking photo", text: "Damage confirmed", detail: "bent clasp · under warranty" },
      { step: 3, kind: "action", pending: "Creating replacement", text: "Replacement shipped", detail: "#LJ-21107 · arrives 7 Nov" },
      { step: 4, kind: "action", pending: "Tracking delivery", text: "Delivered and rated", detail: "7 Nov · 5 of 5", done: true },
    ],
    cards: [
      { title: "From your store", rows: [["Customer", "Neha Kapoor"], ["Order", "#LJ-20931"]], from: 0 },
      { title: "Understood", rows: [["Issue", "Damaged clasp"], ["Wants", "Replacement"]], from: 2 },
      { title: "Job done", rows: [["Replacement", "#LJ-21107"], ["Rating", "5 of 5"]] },
    ],
    context: [],
    outcome: "Delivered and rated",
  },
  sales: {
    label: "Sales",
    title: "Outbound · new enquiry",
    company: "Skyline Homes",
    customer: "Arjun Mehta",
    phone: "+91 98450 ••• 62",
    steps: [
      { label: "Enquiry called", icon: PhoneCallIcon, phase: "On the call" },
      { label: "Needs qualified", icon: ChatCircleTextIcon, phase: "On the call" },
      { label: "Brochure on WhatsApp", icon: WhatsappLogoIcon, phase: "Follow-up" },
      { label: "Visit booked", icon: CalendarCheckIcon, phase: "Follow-up" },
      { label: "Visit done", icon: HandshakeIcon, phase: "Job done" },
    ],
    events: [
      { step: 0, kind: "action", pending: "Calling enquiry", text: "Connected", detail: "website form · 2 min ago" },
      { step: 0, kind: "agent", text: "Hi Arjun, Ria from Skyline Homes. You asked about our 2BHK flats in Whitefield?" },
      { step: 1, kind: "caller", text: "Yes, my budget is about 90 lakh. Is anything ready to move in?" },
      { step: 1, kind: "agent", text: "Two are. I’ll send the brochure on WhatsApp and we can book a visit." },
      { step: 1, kind: "action", pending: "Ending call", text: "Call ended", marker: "call-ended" },
      { step: 2, kind: "agent", channel: "WhatsApp", text: "Here’s the Tower B brochure. Does Saturday at 11 work for a visit?" },
      { step: 2, kind: "caller", channel: "WhatsApp", text: "Saturday works." },
      { step: 3, kind: "action", pending: "Booking visit", text: "Visit booked", detail: "Sat 11:00 · Tower B · in CRM" },
      { step: 3, kind: "action", pending: "Sending reminder", text: "Reminder sent", detail: "Fri 6 pm · WhatsApp" },
      { step: 4, kind: "action", pending: "Checking in", text: "Visit done", detail: "sales team notified", done: true },
    ],
    cards: [
      { title: "From your CRM", rows: [["Lead", "Arjun Mehta"], ["Enquiry", "2BHK, Whitefield"]], from: 0 },
      { title: "Qualified", rows: [["Budget", "₹90 lakh"], ["Wants", "Ready to move"]], from: 2 },
      { title: "Job done", rows: [["Visit", "Sat 11:00"], ["Next", "Sales team"]] },
    ],
    context: [],
    outcome: "Visit done",
  },
  collections: {
    label: "Collections",
    title: "Outbound · EMI reminder",
    company: "Kestrel Finance",
    customer: "Ravi Kumar",
    phone: "+91 97411 ••• 05",
    steps: [
      { label: "Account found", icon: CurrencyInrIcon, phase: "On the call" },
      { label: "Promise to pay", icon: ChatCircleTextIcon, phase: "On the call" },
      { label: "Pay link on WhatsApp", icon: WhatsappLogoIcon, phase: "Follow-up" },
      { label: "Payment received", icon: CheckCircleIcon, phase: "Follow-up" },
      { label: "Account settled", icon: SealCheckIcon, phase: "Job done" },
    ],
    events: [
      { step: 0, kind: "action", pending: "Loading account", text: "Account found", detail: "EMI ₹4,200 · 5 days late" },
      { step: 0, kind: "agent", text: "Hi Ravi, Ria from Kestrel Finance. A quick call about this month’s EMI of ₹4,200." },
      { step: 1, kind: "caller", text: "Sorry, my salary came late. I can pay on Friday." },
      { step: 1, kind: "agent", text: "No problem. I’ll send a payment link on WhatsApp for Friday." },
      { step: 1, kind: "action", pending: "Ending call", text: "Call ended", marker: "call-ended" },
      { step: 2, kind: "agent", channel: "WhatsApp", text: "Here’s your link for ₹4,200. It stays open until Friday night." },
      { step: 2, kind: "action", pending: "Scheduling reminder", text: "Reminder set", detail: "Fri 10 am · WhatsApp" },
      { step: 3, kind: "action", pending: "Watching for payment", text: "Payment received", detail: "₹4,200 · UPI · Fri 12:14" },
      { step: 4, kind: "action", pending: "Updating account", text: "Account settled", detail: "receipt sent · CRM updated", done: true },
    ],
    cards: [
      { title: "From your loan book", rows: [["Customer", "Ravi Kumar"], ["Due", "₹4,200 EMI"]], from: 0 },
      { title: "Agreed", rows: [["Pays", "Friday"], ["Reason", "Salary delay"]], from: 2 },
      { title: "Job done", rows: [["Paid", "₹4,200"], ["Account", "Settled"]] },
    ],
    context: [],
    outcome: "Account settled",
  },
} satisfies Record<string, Job>

export type JobId = keyof typeof JOBS

const STEP_PAUSE_MS = 900
// Open with the first action done, so the window never starts blank.
const OPEN_AT = 1
const WAVE = [5, 9, 6, 12, 8, 14, 7, 11, 5, 13, 9, 6, 12, 8, 10, 6, 13, 7, 9, 12, 5, 10, 8, 14]

export function JobJourneyWindow({ id, onEnd, onPick }: { id: JobId; onEnd?: () => void; onPick?: (j: JobId) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const job: Job = JOBS[id]
  const { events, steps } = job
  const { at, done, step, seconds, speaking, status, jump } = useJourneyPlayback(job, ref, { stepPause: STEP_PAUSE_MS, onEnd, start: OPEN_AT })

  const lines = events.slice(0, done ? events.length : at.i + 1)
  const endAt = events.findIndex((e) => e.kind === "action" && e.marker === "call-ended")
  const ended = done || at.i > endAt || (at.i === endAt && at.w === 1)

  // The call's length, fixed when it ends (the job timer keeps running).
  const [callSeconds, setCallSeconds] = useState<number | null>(null)
  if (ended && callSeconds === null) setCallSeconds(Math.max(seconds, 1))
  if (!ended && callSeconds !== null) setCallSeconds(null)

  // A card is learned once its teaching event has finished.
  const learned = (c: Card) =>
    c.from !== undefined && (done || at.i > c.from || (at.i === c.from && events[c.from].kind === "action" && at.w === 1))
  const outcome = job.cards.find((c) => c.from === undefined)

  // Fills from the top; once full it follows the newest line, and the top edge fades.
  const transcript = useRef<HTMLOListElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  useEffect(() => {
    const el = transcript.current
    if (!el) return
    const over = el.scrollHeight > el.clientHeight + 1
    setOverflowing(over)
    if (over) el.scrollTo({ top: el.scrollHeight, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }, [lines.length, at.w, done])

  const phases = [...new Set(steps.map((s) => s.phase!))]

  return (
    <div ref={ref} className="relative">
      <div className="ui-dark @container relative overflow-hidden rounded-lg text-[13px] leading-[1.6] shadow-[0_50px_120px_-40px_oklch(0.2_0.03_120/0.65)] @3xl:text-[15px]">
        {/* Top bar */}
        <div className="flex h-14 items-center gap-3 border-b border-(--ui-line) px-5 @3xl:px-6">
          <span className={cn("size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
          <span className="font-medium">{done ? "Done" : "Live"}</span>
          <span className="hidden text-(--ui-muted) @md:inline">{job.title}</span>
          <span className="font-mono text-(--ui-muted) tabular-nums">{clock(seconds)}</span>
          <span aria-live="polite" className="sr-only">
            {status}
          </span>
          {onPick && (
            <div role="tablist" aria-label="Job" className="ml-auto flex gap-0.5 rounded-full border border-(--ui-line) bg-(--ui-raised) p-0.5">
              {(Object.keys(JOBS) as JobId[]).map((j) => (
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
                  {JOBS[j].label}
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

        <div className="grid grid-cols-[minmax(0,1fr)] @3xl:grid-cols-[14rem_minmax(0,1fr)] @5xl:grid-cols-[15rem_minmax(0,1fr)_16rem]">
          {/* Step rail, grouped by phase */}
          <nav aria-label="Job steps" className="hidden flex-col gap-5 border-r border-(--ui-line) p-4 @3xl:flex">
            {phases.map((phase) => (
              <div key={phase} className="flex flex-col gap-1">
                <span className="px-2 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">{phase}</span>
                <ol className="flex flex-col gap-1">
                  {steps.map((s, i) => {
                    if (s.phase !== phase) return null
                    const state = i < step || done ? "done" : i === step ? "active" : "todo"
                    return (
                      <li key={s.label}>
                        <button
                          type="button"
                          onClick={() => jump(i)}
                          aria-current={state === "active" ? "step" : undefined}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-md border px-2 py-2 text-left transition-[background-color,border-color,color] duration-500",
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
                          <span className={state === "todo" ? "text-(--ui-muted)" : ""}>{s.label}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </nav>

          <div className="flex min-w-0 flex-col">
            {/* The call: live while it runs, then its recording */}
            <div className="flex h-16 items-center gap-3 border-b border-(--ui-line) px-5 @3xl:px-8">
              <span
                aria-hidden
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-500",
                  ended ? "bg-(--ui-raised) text-(--ui-text)" : "bg-(--ui-live)/15 text-(--ui-live)"
                )}
              >
                {ended ? <PlayIcon weight="fill" className="size-3" /> : <PhoneCallIcon weight="fill" className="size-3.5" />}
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span>{ended ? "Call recording" : "On the call"}</span>
                <span className="truncate font-mono text-[11px] text-(--ui-muted)">
                  {job.customer} · {job.phone}
                </span>
              </span>
              <span className="ml-auto hidden h-4 items-center gap-[3px] @xl:flex" aria-hidden>
                {WAVE.map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block w-[2px] rounded-full transition-[height,background-color] duration-300",
                      ended ? "bg-(--ui-live)/60" : speaking ? "bg-(--ui-live)" : "bg-(--ui-text)/25"
                    )}
                    style={{ height: ended || speaking ? h : 3 }}
                  />
                ))}
              </span>
              <span className="ml-auto font-mono text-(--ui-muted) tabular-nums @xl:ml-4">{clock(callSeconds ?? seconds)}</span>
            </div>

            {/* Transcript: the call, where it ends, then the follow-up */}
            <ol
              ref={transcript}
              aria-label="Job transcript"
              className="flex h-72 flex-col gap-4 overflow-hidden px-5 pt-6 pb-5 @3xl:h-[24rem] @3xl:px-8"
              style={
                overflowing
                  ? { maskImage: "linear-gradient(to bottom, transparent, black 22%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%)" }
                  : undefined
              }
            >
              {lines.map((e, i) => {
                const live = i === at.i && !done
                const pending = live && e.kind === "action" && at.w === 0
                const fact = job.cards.find((c) => c.from === i && learned(c))

                if (e.kind === "action" && e.marker === "call-ended") {
                  if (pending) return null
                  return (
                    <li key={i} className="flex items-center gap-3 py-1 font-mono text-[11.5px] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                      <span className="h-px flex-1 bg-(--ui-line)" />
                      <span>
                        Call ended · {clock(callSeconds ?? seconds)} <span className="text-(--ui-muted)">follow-up starts</span>
                      </span>
                      <span className="h-px flex-1 bg-(--ui-line)" />
                    </li>
                  )
                }

                return (
                  <li key={i} className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                    {e.kind === "action" ? (
                      <div className={cn(ICON_ROW, "items-center")}>
                        {pending ? (
                          <CircleNotchIcon className="size-3.5 text-(--ui-muted) motion-safe:animate-spin" aria-hidden />
                        ) : e.done ? (
                          <CheckCircleIcon weight="fill" className="size-4 text-(--ui-live) motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-300" aria-hidden />
                        ) : (
                          <LightningIcon weight="fill" className="size-3.5 text-(--ui-muted) motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-300" aria-hidden />
                        )}
                        {pending ? (
                          <span className="shimmer-text">{e.pending}…</span>
                        ) : e.done ? (
                          <span className="-ml-1.5 inline-flex max-w-max min-w-0 items-center gap-2 rounded-md border border-(--ui-live)/40 bg-(--ui-live)/10 px-3 py-1.5 motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both]">
                            <span className="shrink-0 font-medium">{e.text}</span>
                            {e.detail && <span className="truncate font-mono text-[12px] text-(--ui-muted)">{e.detail}</span>}
                          </span>
                        ) : (
                          <span className="flex min-w-0 items-baseline gap-2">
                            <span className="shrink-0">{e.text}</span>
                            {e.detail && (
                              <span className="truncate font-mono text-[12px] text-(--ui-muted) motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-2 motion-safe:duration-500">
                                {e.detail}
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    ) : (
                      <SpeechLine
                        event={e}
                        words={live ? at.w : Infinity}
                        live={live}
                        above
                        label={`${e.kind === "agent" ? "Ria" : "Customer"}${e.channel ? ` · ${e.channel}` : ""}`}
                      />
                    )}

                    {/* What this line taught the agent (the side pane shows it on wide windows) */}
                    {fact && (
                      <div className={cn(ICON_ROW, "mt-2 @5xl:hidden")}>
                        <span />
                        <span className="flex flex-wrap gap-1.5">
                          {fact.rows.map(([k, v]) => (
                            <span
                              key={k}
                              className="rounded-full border border-(--ui-live)/40 bg-(--ui-live)/10 px-2.5 py-0.5 text-[12px] whitespace-nowrap motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500"
                            >
                              {v}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>

          {/* What the agent learned, then the outcome */}
          <aside aria-label="What the agent knows" className="hidden flex-col gap-5 border-l border-(--ui-line) bg-(--ui-panel) p-5 @5xl:flex">
            {job.cards.map((c) => {
              const isOutcome = c === outcome
              if (!isOutcome && !learned(c)) return null
              return (
                <div
                  key={c.title}
                  className={cn(
                    "flex flex-col gap-2.5 motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both]",
                    isOutcome && "mt-auto rounded-md border border-(--ui-live)/40 bg-(--ui-live)/10 p-3.5",
                    isOutcome && !done && "invisible"
                  )}
                >
                  <span className={cn("flex items-center gap-1.5 font-mono text-[11px]", isOutcome ? "text-(--ui-live)" : "text-(--ui-muted)")}>
                    {isOutcome && <CheckCircleIcon weight="fill" className="size-3.5" aria-hidden />}
                    {c.title}
                  </span>
                  <dl className="flex flex-col gap-2">
                    {c.rows.map(([k, v]) => (
                      <div key={k} className="flex flex-col">
                        <dt className="text-[11px] text-(--ui-muted)">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )
            })}
          </aside>
        </div>
      </div>
    </div>
  )
}
