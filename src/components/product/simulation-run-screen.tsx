"use client"

import { useRef } from "react"
import { CircleNotchIcon } from "@phosphor-icons/react"

import { Label, Pill, ScreenBar, ScreenShell } from "@/components/product/ui-bits"
import { useScriptedLoop } from "@/hooks/use-scripted-loop"
import { cn } from "@/lib/utils"

// Fictional demo data: personas, scenarios and scores are made up.
const RUNS = [
  { persona: "Frustrated repeat caller", scenario: "Payment not applied", score: 96.4, ok: true },
  { persona: "Hard of hearing", scenario: "Change billing date", score: 91.8, ok: true },
  { persona: "Hindi speaker", scenario: "Explain tariff", score: 88.2, ok: true },
  { persona: "Interrupts often", scenario: "Dispute late fee", score: 93.5, ok: true },
  { persona: "Asks for a human", scenario: "Escalation request", score: 74.1, ok: false },
  { persona: "In a hurry", scenario: "Update phone number", score: 97.0, ok: true },
]

// Step 0: queued. Steps 1..6: run i finishes. Last step: hold on the summary.
const HOLDS = [800, 550, 550, 550, 550, 550, 550, 4500]

/** Test panel: personas x scenarios run against a draft version. */
export function SimulationRunScreen({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { step } = useScriptedLoop(ref, HOLDS)
  const done = Math.min(step, RUNS.length)
  const finished = done === RUNS.length
  const passed = RUNS.slice(0, done).filter((r) => r.ok).length
  const review = done - passed

  return (
    <ScreenShell ref={ref} className={className}>
      <ScreenBar>
        <span className="min-w-0 truncate font-medium">Simulation run</span>
        <Pill>v4 · Draft</Pill>
        <span className="ml-auto hidden text-(--ui-muted) @md:inline">Billing flows · {RUNS.length} scenarios</span>
      </ScreenBar>

      <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3">
        <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-(--ui-line) pb-2 @lg:grid-cols-[1.1fr_1fr_auto_3.5rem]">
          <Label>Persona</Label>
          <Label className="hidden @lg:block">Scenario</Label>
          <Label>Result</Label>
          <Label className="hidden text-right @lg:block">Score</Label>
        </div>
        <ul>
          {RUNS.map((run, i) => {
            const state = i < done ? (run.ok ? "passed" : "review") : i === done && !finished ? "running" : "queued"
            return (
              <li
                key={run.persona}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-(--ui-line) py-2 @lg:grid-cols-[1.1fr_1fr_auto_3.5rem]"
              >
                <span className="truncate">{run.persona}</span>
                <span className="hidden truncate text-(--ui-muted) @lg:block">{run.scenario}</span>
                <span>
                  {state === "passed" && <Pill tone="live">Passed</Pill>}
                  {state === "review" && <Pill tone="warn">Needs review</Pill>}
                  {state === "running" && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-(--ui-muted)">
                      <CircleNotchIcon className="size-3.5 motion-safe:animate-spin" aria-hidden />
                      Running
                    </span>
                  )}
                  {state === "queued" && <Pill>Queued</Pill>}
                </span>
                <span
                  className={cn(
                    "hidden text-right font-mono tabular-nums @lg:block",
                    i < done ? "" : "text-(--ui-muted)"
                  )}
                >
                  {i < done ? run.score.toFixed(1) : "--"}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex h-10 shrink-0 items-center gap-3 border-t border-(--ui-line) px-4 text-(--ui-muted)">
        <span aria-live="polite" className="tabular-nums">
          {finished
            ? `${passed} passed · ${review} needs review`
            : done === 0
              ? `${RUNS.length} scenarios queued`
              : `Running ${done + 1} of ${RUNS.length}`}
        </span>
        {finished && (
          <span className="ml-auto hidden font-mono tabular-nums @md:inline">
            QA score <span className="text-(--ui-text)">91.6</span> · v3 87.9
          </span>
        )}
      </div>
    </ScreenShell>
  )
}
