"use client"

import { useRef } from "react"

import { Label, Pill, ScreenBar, ScreenShell } from "@/components/product/ui-bits"
import { useScriptedLoop } from "@/hooks/use-scripted-loop"

// Fictional demo data.
const START = { queued: 412, calling: 6, completed: 803, callbacks: 27 }
const PER_STEP = { queued: -7, completed: 6, callbacks: 1 }

const TASKS = [
  { name: "Priya Raman", phone: "+44 7700 900•••" },
  { name: "Tom Hadley", phone: "+44 7700 900•••" },
  { name: "Ana Ferreira", phone: "+44 7700 900•••" },
  { name: "Kwame Asante", phone: "+44 7700 900•••" },
  { name: "Lena Vogel", phone: "+44 7700 900•••" },
]
// Each task's final state; it starts queued and moves through calling.
const OUTCOME: ("completed" | "callback")[] = ["completed", "callback", "completed", "completed", "completed"]

const HOLDS = [900, 900, 900, 900, 900, 900, 4000]

/** Deploy panel: an outbound campaign moving through its queue. */
export function CampaignScreen({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { step } = useScriptedLoop(ref, HOLDS)
  const n = Math.min(step, TASKS.length)

  const stats = [
    { label: "Queued", value: START.queued + PER_STEP.queued * n },
    { label: "Calling", value: START.calling },
    { label: "Completed", value: START.completed + PER_STEP.completed * n },
    { label: "Callbacks", value: START.callbacks + PER_STEP.callbacks * n },
  ]

  return (
    <ScreenShell ref={ref} className={className}>
      <ScreenBar>
        <span className="min-w-0 truncate font-medium">March payment reminders</span>
        <Pill tone="live">Running</Pill>
        <span className="ml-auto hidden text-(--ui-muted) @md:inline">Outbound · 3 numbers</span>
      </ScreenBar>

      <dl className="grid shrink-0 grid-cols-2 gap-px border-b border-(--ui-line) bg-(--ui-line) @md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col bg-(--ui-bg) px-4 py-3">
            <dt>
              <Label>{s.label}</Label>
            </dt>
            <dd className="font-mono text-[15px] tabular-nums">{s.value.toLocaleString("en-GB")}</dd>
          </div>
        ))}
      </dl>

      <ul className="min-h-0 flex-1 overflow-hidden px-4">
        {TASKS.map((task, i) => {
          // Task i is calling at step i, finished after.
          const state = i < n ? OUTCOME[i] : i === n ? "calling" : "queued"
          return (
            <li key={task.name} className="flex items-center gap-3 border-b border-(--ui-line) py-2">
              <span className="min-w-0 flex-1 truncate">{task.name}</span>
              <span className="hidden font-mono text-(--ui-muted) @md:inline">{task.phone}</span>
              {state === "completed" && <Pill tone="live">Completed</Pill>}
              {state === "callback" && <Pill tone="warn">Callback booked</Pill>}
              {state === "calling" && <Pill tone="live" className="motion-safe:animate-pulse">Calling</Pill>}
              {state === "queued" && <Pill>Queued</Pill>}
            </li>
          )
        })}
      </ul>
    </ScreenShell>
  )
}
