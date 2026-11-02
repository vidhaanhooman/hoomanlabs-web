"use client"

import { useState } from "react"
import { CheckIcon, FlaskIcon, MagnifyingGlassIcon, RocketLaunchIcon, UserCheckIcon, WrenchIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

export type TimelineStep = {
  name: string
  /** When the step starts, e.g. "Week 01". */
  when: string
  body: string
  /** What happens in the step (from the week-by-week plan). */
  items: string[]
  gate: string
}

const ICONS = [MagnifyingGlassIcon, WrenchIcon, FlaskIcon, UserCheckIcon, RocketLaunchIcon]

/**
 * The enterprise build as a timeline (after Persistence's deployment page):
 * the steps down the left with their week, and beside each a card. One step
 * is open at a time, showing what it is, what happens in it and its sign-off
 * gate; the rest sit as quiet rows with their gate on the right. Clicking a
 * row or its place on the timeline opens it.
 */
export function EnterpriseTimeline({ steps }: { steps: TimelineStep[] }) {
  const [open, setOpen] = useState(0)
  return (
    <ol className="relative flex flex-col gap-3">
      {/* The timeline's line, behind the dots */}
      <span aria-hidden className="absolute top-3 bottom-3 left-[5px] hidden w-px bg-line md:block" />
      {steps.map((s, i) => {
        const on = i === open
        const Icon = ICONS[i] ?? CheckIcon
        return (
          <li key={s.name} className="relative grid gap-3 md:grid-cols-[11rem_1fr] md:gap-8">
            {/* Where it sits on the timeline */}
            <button type="button" onClick={() => setOpen(i)} aria-label={`Show ${s.name}`} className="hidden items-start gap-4 pt-[13px] text-left outline-none md:flex">
              <span
                className={cn(
                  "relative z-10 mt-1 size-[11px] shrink-0 rounded-full border-2 transition-colors",
                  on ? "border-foreground bg-foreground" : "border-line-strong bg-background",
                )}
              />
              <span className="flex flex-col gap-0.5">
                <span className={cn("font-mono text-label tabular-nums transition-colors", on ? "text-foreground" : "text-ink-muted")}>{s.when}</span>
                <span className={cn("text-small transition-colors", on ? "text-foreground" : "text-ink-secondary")}>{s.name}</span>
              </span>
            </button>

            {/* The card: a quiet row, or the open step */}
            <div
              className={cn(
                "overflow-hidden rounded-xl border transition-colors duration-300",
                on ? "border-line bg-[linear-gradient(135deg,var(--surface),var(--placeholder))]" : "border-line bg-background hover:bg-surface",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-expanded={on}
                className={cn("flex w-full items-center justify-between gap-6 px-6 text-left outline-none focus-visible:bg-surface", on ? "h-0 opacity-0" : "h-16 opacity-100")}
                tabIndex={on ? -1 : 0}
              >
                <span className="flex items-center gap-3 text-body">
                  <span className="font-mono text-label text-ink-muted tabular-nums md:hidden">{s.when}</span>
                  {s.name}
                </span>
                <span className="hidden truncate text-small text-ink-muted sm:block">{s.gate}</span>
              </button>

              <div className={cn("grid transition-[grid-template-rows] duration-500 ease-(--ease-out)", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="min-h-0">
                  <div className={cn("grid gap-10 p-6 transition-opacity duration-500 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16", on ? "opacity-100" : "opacity-0")}>
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-background shadow-xs">
                          <Icon className="size-5" />
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="font-mono text-label text-ink-muted tabular-nums">{s.when}</span>
                          <span className="text-h2 font-normal">{s.name}</span>
                        </span>
                      </div>
                      <p className="max-w-[48ch] text-body text-ink-secondary">{s.body}</p>
                      <div className="mt-auto flex max-w-[44ch] flex-col gap-1 rounded-lg border border-line bg-background px-4 py-3">
                        <span className="text-label text-ink-muted">Sign-off gate</span>
                        <span className="text-small">{s.gate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-small text-ink-muted">What happens</p>
                      <ul className="mt-3 flex flex-col">
                        {s.items.map((it) => (
                          <li key={it} className="flex items-start gap-3 border-b border-line py-3 text-body last:border-0">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line bg-background">
                              <CheckIcon className="size-3" weight="bold" />
                            </span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
