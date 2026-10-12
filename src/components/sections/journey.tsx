"use client"

import { useState } from "react"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/**
 * Hero journey (/lab/v3): one pre-built customer journey, switchable between
 * inbound and outbound. FIRST PASS: a static step chain to settle the steps
 * and copy; the animated canvas replaces it next.
 */

type Step = { title: string; detail: string; branch?: string }

const JOURNEYS = {
  inbound: {
    label: "Inbound",
    steps: [
      { title: "Call comes in", detail: "+44 20 7946 0958 · billing line" },
      { title: "Context retrieved", detail: "Customer record, open balance and last call, before the first ring ends" },
      { title: "Contextual greeting", detail: "“Hi Maya, is this about the March bill?”" },
      { title: "Conversation", detail: "Answers, takes the payment or books the visit" },
      { title: "Ticket to CRM", detail: "Ticket with summary and next step sent to the CRM", branch: "If unresolved" },
    ] as Step[],
  },
  outbound: {
    label: "Outbound",
    steps: [
      { title: "Form submitted", detail: "Name, phone and interest from your site" },
      { title: "Added to campaign", detail: "Lead joins the “New demo requests” campaign" },
      { title: "Details enriched", detail: "Company, role and region added to the lead" },
      { title: "Call placed", detail: "Within a minute, in the lead’s language" },
      { title: "Message and retry", detail: "WhatsApp sent, retry queued for 2 hours", branch: "If unanswered" },
    ] as Step[],
  },
} as const

type JourneyId = keyof typeof JOURNEYS

export function Journey() {
  const [id, setId] = useState<JourneyId>("inbound")
  const journey = JOURNEYS[id]
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-4 sm:p-6">
      <div role="tablist" aria-label="Journey" className="flex w-fit gap-1 rounded-full bg-secondary p-1">
        {(Object.keys(JOURNEYS) as JourneyId[]).map((j) => (
          <button
            key={j}
            type="button"
            role="tab"
            aria-selected={id === j}
            onClick={() => setId(j)}
            className={cn(
              "rounded-full px-4 py-1.5 text-small transition-colors duration-150",
              id === j ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
            )}
          >
            {JOURNEYS[j].label}
          </button>
        ))}
      </div>
      <ol className="grid gap-3 md:grid-cols-5">
        {journey.steps.map((s, i) => (
          <li key={s.title} className="relative flex flex-col gap-2 rounded-md border border-line bg-background p-4">
            <span className="flex items-center justify-between font-mono text-label text-ink-muted">
              {s.branch ?? `0${i + 1}`}
              {i < journey.steps.length - 1 && <ArrowRightIcon className="hidden size-3.5 md:block" />}
            </span>
            <span className="text-body font-medium">{s.title}</span>
            <span className="text-small text-ink-secondary">{s.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
