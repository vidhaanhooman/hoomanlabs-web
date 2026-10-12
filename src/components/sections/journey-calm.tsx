"use client"

import { useRef } from "react"
import { CheckIcon, CircleNotchIcon, LightningIcon } from "@phosphor-icons/react"

import { JOURNEYS, SpeechLine, clock, useJourneyPlayback, type JourneyId } from "@/components/sections/journey"
import { cn } from "@/lib/utils"

/**
 * Calm hero journey (/lab/v3): two columns (step rail + feed), one step on
 * screen at a time, one thing moving at a time. Green only marks "now".
 * What the agent learns arrives as a light card that floats just outside the
 * window's edge, then gives way to the next. Remount (key) to switch journey.
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

export function CalmJourneyWindow({ id }: { id: JourneyId }) {
  const ref = useRef<HTMLDivElement>(null)
  const journey = JOURNEYS[id]
  const { events, steps } = journey
  const { at, done, step, seconds, speaking, status, jump } = useJourneyPlayback(journey, ref, { stepPause: STEP_PAUSE_MS })

  // The current step's events only; the rail keeps the history.
  const first = events.findIndex((e) => e.step === step)
  const upTo = done ? events.length : at.i + 1
  const lines = events.slice(first, upTo).filter((e) => e.step === step)
  const card = CARDS[id][step]

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl">
      <div className="ui-dark @container overflow-hidden rounded-lg text-[13px] leading-[1.6] shadow-[0_50px_120px_-40px_oklch(0.2_0.03_120/0.65)] @3xl:text-[14px]">
        {/* Top bar */}
        <div className="flex h-12 items-center gap-3 border-b border-(--ui-line) px-5">
          <span className={cn("size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
          <span className="font-medium">{done ? "Complete" : "Live"}</span>
          <span className="hidden text-(--ui-muted) @md:inline">{journey.title}</span>
          <span className="ml-auto font-mono text-(--ui-muted) tabular-nums">{clock(seconds)}</span>
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

        <div className="grid grid-cols-[minmax(0,1fr)] @3xl:grid-cols-[15rem_minmax(0,1fr)]">
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
                      "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-[background-color,border-color,color] duration-500",
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
            <ol key={`${id}-${step}`} aria-label={steps[step].label} className="flex h-60 flex-col gap-3.5 overflow-hidden px-5 pt-6 pb-4 motion-safe:animate-[reveal-blur_500ms_var(--ease-out)_both] @3xl:h-[19rem] @3xl:px-7">
              {/* What the agent learned, inline where there's no room for the floating card */}
              {card && (
                <li className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-(--ui-muted) xl:hidden">
                  {card.rows.map(([k, v]) => (
                    <span key={k}>
                      {k} <span className="text-(--ui-text)">{v}</span>
                    </span>
                  ))}
                </li>
              )}
              {lines.map((e, n) => {
                const i = first + n
                const live = i === at.i && !done
                return (
                  <li key={i} className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                    {e.kind === "action" ? (
                      live && at.w === 0 ? (
                        <span className="inline-flex items-center gap-2 text-(--ui-muted)">
                          <CircleNotchIcon className="size-3.5 motion-safe:animate-spin" aria-hidden />
                          {e.pending}…
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
            </ol>

            {/* Status */}
            <div className="flex h-11 items-center gap-3 border-t border-(--ui-line) px-5 text-(--ui-muted) @3xl:px-7">
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
        </div>
      </div>

      {/* Floating card: what the agent just learned */}
      {card && (
        <div
          key={`${id}-card-${step}`}
          aria-hidden
          className="absolute top-20 left-[calc(100%-2.5rem)] hidden w-60 flex-col gap-2 rounded-lg border border-black/5 bg-background p-4 text-foreground shadow-[0_24px_60px_-24px_oklch(0.2_0.03_120/0.55)] motion-safe:animate-[reveal-blur_600ms_var(--ease-out)_350ms_both] xl:flex"
        >
          <span className="font-mono text-label text-ink-muted">{card.title}</span>
          <dl className="flex flex-col">
            {card.rows.map(([k, v]) => (
              <div key={k} className="flex flex-col border-t border-line py-1.5 first:border-0 first:pt-0">
                <dt className="text-label text-ink-muted">{k}</dt>
                <dd className="text-small">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}
