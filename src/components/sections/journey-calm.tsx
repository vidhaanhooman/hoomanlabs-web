"use client"

import { useRef } from "react"
import { CheckCircleIcon, CheckIcon, CircleNotchIcon, LightningIcon } from "@phosphor-icons/react"

import { ICON_ROW, JOURNEYS, SpeechLine, clock, useJourneyPlayback, type JourneyId } from "@/components/sections/journey"
import { cn } from "@/lib/utils"

/**
 * Calm hero journey (/lab/v3): step rail, one running transcript of every
 * action and line, and an extracted-data pane that fills in as the agent learns
 * things. Working actions shimmer, then their result
 * slides in; what the agent learns appears as chips under the line and in
 * the extracted-data pane. Green only marks "now". Remount (key) to switch.
 */

/** `from`: the transcript event that teaches this card (none for the outcome). */
type Card = { title: string; rows: [string, string][]; from?: number }

const CARDS: Record<JourneyId, Partial<Record<number, Card>>> = {
  inbound: {
    1: { title: "From your CRM", rows: [["Customer", "Maya Patel"], ["Balance", "$86.40 due 4 Mar"]], from: 1 },
    3: { title: "Understood", rows: [["Intent", "Duplicate charge"], ["Sentiment", "Calm"]], from: 4 },
    4: { title: "Outcome", rows: [["Ticket", "#TCK-2291"], ["Sent to", "Zendesk"]] },
  },
  outbound: {
    0: { title: "New lead", rows: [["Name", "Arjun Mehta"], ["Interest", "Support for 40 agents"]], from: 0 },
    2: { title: "Enriched", rows: [["Company", "Northwind Ltd"], ["Role", "Head of CX"]], from: 2 },
    4: { title: "Outcome", rows: [["Next try", "Today 2:00 pm"], ["Follow-up", "WhatsApp sent"]] },
  },
}

const STEP_PAUSE_MS = 900

export function CalmJourneyWindow({
  id,
  onEnd,
  onPick,
}: {
  id: JourneyId
  onEnd?: () => void
  onPick?: (j: JourneyId) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const journey = JOURNEYS[id]
  const { events, steps } = journey
  const { at, done, step, seconds, speaking, status, jump } = useJourneyPlayback(journey, ref, { stepPause: STEP_PAUSE_MS, onEnd })

  // One running transcript: every action and line so far.
  const lines = events.slice(0, done ? events.length : at.i + 1)
  const cards = Object.entries(CARDS[id]).map(([s, c]) => ({ step: Number(s), ...c! }))

  // A card is learned once its teaching event has finished.
  const learned = (c: Card) =>
    c.from !== undefined && (done || at.i > c.from || (at.i === c.from && events[c.from].kind === "action" && at.w === 1))
  return (
    <div ref={ref} className="relative">
      <div className="ui-dark @container relative overflow-hidden rounded-lg text-[13px] leading-[1.6] shadow-[0_50px_120px_-40px_oklch(0.2_0.03_120/0.65)] @3xl:text-[15px]">
        {/* Top bar */}
        <div className="flex h-14 items-center gap-3 border-b border-(--ui-line) px-5 @3xl:px-6">
          <span className={cn("size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
          <span className="font-medium">{done ? "Complete" : "Live"}</span>
          <span className="hidden text-(--ui-muted) @md:inline">{journey.title}</span>
          <span className="font-mono text-(--ui-muted) tabular-nums">{clock(seconds)}</span>
          {onPick && (
            <div role="tablist" aria-label="Journey" className="ml-auto flex gap-0.5 rounded-full border border-(--ui-line) bg-(--ui-raised) p-0.5">
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
          <ol aria-label="Journey steps" className="hidden flex-col gap-1 border-r border-(--ui-line) p-3 @3xl:flex">
            {steps.map((s, i) => {
              const state = i < step || done ? "done" : i === step ? "active" : "todo"
              return (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={state === "active" ? "step" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md border px-3.5 py-2.5 text-left transition-[background-color,border-color,color] duration-500",
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

          {/* Transcript */}
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
                const pending = live && e.kind === "action" && at.w === 0
                const fact = cards.find((c) => c.from === i && learned(c))
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
                          /* The outcome, highlighted */
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
                      <SpeechLine event={e} words={live ? at.w : Infinity} live={live} above />
                    )}

                    {/* What this line taught the agent */}
                    {fact && (
                      <div className={cn(ICON_ROW, "mt-2")}>
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

          {/* Extracted data, filled in as the agent learns it */}
          <aside aria-label="Extracted data" className="hidden flex-col gap-5 border-l border-(--ui-line) bg-(--ui-panel) p-5 @5xl:flex">
            {cards.map((c) => {
              // The outcome shows only once the journey is done.
              const outcome = c.step === steps.length - 1
              const known = outcome ? done : learned(c)
              return (
                <div
                  key={c.title}
                  className={cn(
                    "flex flex-col gap-2.5 transition-[background-color,border-color] duration-500",
                    // Space is kept from the start so the window doesn't jump when it lands.
                    outcome && "mt-auto rounded-md border border-(--ui-live)/40 bg-(--ui-live)/10 p-3.5",
                    outcome && (done ? "motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both]" : "invisible")
                  )}
                >
                  <span className={cn("flex items-center gap-1.5 font-mono text-[11px]", outcome ? "text-(--ui-live)" : "text-(--ui-muted)")}>
                    {outcome && <CheckCircleIcon weight="fill" className="size-3.5" aria-hidden />}
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
      </div>
    </div>
  )
}
