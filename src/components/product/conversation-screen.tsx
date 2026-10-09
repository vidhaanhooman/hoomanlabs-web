"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckCircleIcon, LightningIcon } from "@phosphor-icons/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { demoCall, type ConversationEvent } from "@/content/demo-conversation"

/**
 * Recreated "live conversation" screen for the hero frame. Plays the scripted
 * call line by line, loops, pauses off-screen, and renders the finished call
 * statically under reduced motion. Visual is an approximation of the platform.
 */

const EVENTS = demoCall.events
const HOLD_AFTER_END_MS = 6000

/** How long the speaker "talks" (or the agent works) before the line lands. */
function delayFor(event: ConversationEvent) {
  if (event.kind === "action") return 750
  return Math.min(2600, Math.max(1000, event.text.length * 26))
}

function formatTime(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function ConversationScreen({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()

  const [step, setStep] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [seconds, setSeconds] = useState(demoCall.startSeconds)

  const playing = inView && !reduce
  const visible = reduce ? EVENTS.length : step
  const done = visible >= EVENTS.length
  const next = done ? null : EVENTS[visible]

  // Advance the script one event at a time; after the end, hold then restart.
  useEffect(() => {
    if (!playing) return
    const t = done
      ? setTimeout(() => {
          setStep(0)
          setSeconds(demoCall.startSeconds)
          setCycle((c) => c + 1)
        }, HOLD_AFTER_END_MS)
      : setTimeout(() => setStep((s) => s + 1), delayFor(EVENTS[step]))
    return () => clearTimeout(t)
  }, [playing, done, step])

  // Call timer, only while the call is "live".
  useEffect(() => {
    if (!playing || done) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [playing, done])

  const status = done
    ? "Call complete"
    : next?.kind === "action"
      ? "Agent working"
      : next?.kind === "agent"
        ? "Agent speaking"
        : "Caller speaking"

  return (
    <div
      ref={ref}
      className={cn("ui-dark @container flex flex-col overflow-hidden text-[13px] leading-[1.5]", className)}
    >
      {/* Top bar */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4">
        <span className="relative flex size-2">
          {!done && (
            <span className="absolute inset-0 rounded-full bg-(--ui-live) opacity-60 motion-safe:animate-ping" />
          )}
          <span className={cn("relative size-2 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
        </span>
        <span className="font-medium">{done ? "Ended" : "Live"}</span>
        <span className="hidden text-(--ui-muted) @md:inline">{demoCall.direction}</span>
        <span className="font-mono text-(--ui-muted) tabular-nums">{formatTime(seconds)}</span>
        <span className="ml-auto hidden items-center gap-2 @sm:flex">
          <span className="text-(--ui-muted)">{demoCall.agent.name}</span>
          <span className="rounded-full border border-(--ui-line) bg-(--ui-raised) px-2 py-0.5 font-mono text-[11px]">
            {demoCall.agent.version} · Live
          </span>
        </span>
      </div>

      <div className="grid min-h-0 flex-1 @3xl:grid-cols-[1fr_15rem]">
        {/* Transcript */}
        <div className="flex min-h-0 flex-col">
          <ol
            key={cycle}
            aria-label="Call transcript"
            className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 pt-4 pb-2"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 22%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%)",
            }}
          >
            {EVENTS.slice(0, visible).map((event, i) => (
              <li
                key={i}
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300"
              >
                {event.kind === "action" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-(--ui-line) bg-(--ui-raised) px-2.5 py-1 text-[12px]">
                    <LightningIcon weight="fill" className="size-3.5 text-(--ui-live)" aria-hidden />
                    {event.text}
                    <span className="font-mono text-(--ui-muted)">{event.detail}</span>
                  </span>
                ) : (
                  <div className="grid grid-cols-[3.75rem_1fr] gap-3">
                    <span className="pt-px text-[12px] text-(--ui-muted)">
                      {event.kind === "agent" ? "Agent" : "Caller"}
                    </span>
                    <p className={event.kind === "agent" ? "text-(--ui-text)" : "text-(--ui-text)/80"}>
                      {event.text}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Speaking indicator */}
          <div className="flex h-11 shrink-0 items-center gap-3 border-t border-(--ui-line) px-4 text-(--ui-muted)">
            <span className="ui-wave flex h-4 items-end gap-[3px]" data-idle={done || next?.kind === "action" ? "" : undefined} aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="block h-full w-[3px] rounded-full bg-(--ui-text)/70" />
              ))}
            </span>
            <span aria-live="polite">{status}</span>
          </div>
        </div>

        {/* Context panel (only when the frame is wide enough) */}
        <aside className="hidden flex-col gap-4 border-l border-(--ui-line) bg-(--ui-panel) p-4 @3xl:flex">
          <dl className="flex flex-col gap-2.5">
            {demoCall.customer.map((row) => (
              <div key={row.label} className="flex flex-col">
                <dt className="text-[11px] text-(--ui-muted)">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="h-px bg-(--ui-line)" />
          <dl className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <dt className="text-[11px] text-(--ui-muted)">Intent</dt>
              <dd className={visible >= 2 ? "" : "text-(--ui-muted)"}>
                {visible >= 2 ? demoCall.intent : "Listening…"}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[11px] text-(--ui-muted)">Sentiment</dt>
              <dd className={visible >= 2 ? "" : "text-(--ui-muted)"}>
                {visible >= 2 ? demoCall.sentiment : "Listening…"}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[11px] text-(--ui-muted)">Outcome</dt>
              <dd className={cn("flex items-center gap-1.5", !done && "text-(--ui-muted)")}>
                {done ? (
                  <>
                    <CheckCircleIcon weight="fill" className="size-4 text-(--ui-live)" aria-hidden />
                    {demoCall.outcome}
                  </>
                ) : (
                  "In progress"
                )}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
