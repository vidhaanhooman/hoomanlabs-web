"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckCircleIcon, CircleNotchIcon, WaveformIcon } from "@phosphor-icons/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { demoAgent } from "@/content/demo-agent"

/**
 * Recreated agent configuration screen for the Build panel. Plays one edit
 * cycle: instruction added, tool switched on, test scenarios run, Draft goes
 * Live. Loops, pauses off-screen, shows the Live state under reduced motion.
 * Visual is an approximation of the platform.
 */

const STEP = {
  draft: 0,
  instructionAdded: 1,
  toolOn: 2,
  testing: 3,
  passed: 4,
  live: 5,
} as const
const LAST = STEP.live

/** How long each step holds before the next one (index = current step). */
const HOLD_MS = [1300, 1300, 1300, 2200, 900, 5000]

export function AgentConfigScreen({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()

  const [step, setStep] = useState<number>(STEP.draft)
  const [passedCount, setPassedCount] = useState(0)

  const playing = inView && !reduce
  const s = reduce ? LAST : step
  const passed = reduce ? demoAgent.scenarios : s >= STEP.passed ? demoAgent.scenarios : passedCount

  // Advance through the cycle; after the hold on Live, start over.
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      if (step === LAST) {
        setPassedCount(0)
        setStep(STEP.draft)
      } else {
        setStep(step + 1)
      }
    }, HOLD_MS[step])
    return () => clearTimeout(t)
  }, [playing, step])

  // Count test scenarios up while "testing".
  useEffect(() => {
    if (!playing || step !== STEP.testing) return
    const t = setInterval(
      () => setPassedCount((n) => Math.min(demoAgent.scenarios, n + 1)),
      HOLD_MS[STEP.testing] / (demoAgent.scenarios + 2)
    )
    return () => clearInterval(t)
  }, [playing, step])

  const live = s >= STEP.live
  const status = live
    ? "Live · published just now"
    : s === STEP.passed
      ? `${demoAgent.scenarios}/${demoAgent.scenarios} scenarios passed`
      : s === STEP.testing
        ? `Running scenarios ${passed}/${demoAgent.scenarios}`
        : s >= STEP.instructionAdded
          ? `${s >= STEP.toolOn ? 2 : 1} unpublished ${s >= STEP.toolOn ? "changes" : "change"}`
          : "Draft"

  return (
    <div
      ref={ref}
      className={cn("ui-dark @container flex flex-col overflow-hidden text-[13px] leading-[1.5]", className)}
    >
      {/* Top bar: agent, version state, publish */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4">
        <span className="min-w-0 truncate font-medium">{demoAgent.name}</span>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[11px] whitespace-nowrap transition-colors duration-300",
            live
              ? "border-(--ui-live)/40 text-(--ui-text)"
              : "border-(--ui-line) bg-(--ui-raised) text-(--ui-muted)"
          )}
        >
          <span className={cn("size-1.5 rounded-full", live ? "bg-(--ui-live)" : "bg-(--ui-muted)")} />
          {demoAgent.version} · {live ? "Live" : "Draft"}
        </span>
        <span
          className={cn(
            "ml-auto shrink-0 rounded-full px-3 py-1 text-[12px] font-medium transition-[transform,background-color,color] duration-150",
            live ? "bg-(--ui-raised) text-(--ui-muted)" : "bg-(--ui-text) text-(--ui-bg)",
            s === STEP.passed && "scale-[0.97]"
          )}
        >
          {live ? "Published" : "Publish"}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 @2xl:grid-cols-[1fr_14rem]">
        {/* Instructions + tools */}
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden p-4">
          <section className="flex flex-col gap-2">
            <h4 className="hidden text-[11px] text-(--ui-muted) @md:block">Instructions</h4>
            <div className="flex flex-col gap-1 rounded-md border border-(--ui-line) bg-(--ui-panel) p-3">
              {/* Narrow windows: first line (truncated) + the change only. */}
              {demoAgent.instructions.map((line, i) => (
                <p
                  key={line}
                  className={cn("text-(--ui-text)/85", i === 0 ? "truncate @md:whitespace-normal" : "hidden @md:block")}
                >
                  {line}
                </p>
              ))}
              {s >= STEP.instructionAdded && (
                <p className="-mx-1.5 truncate rounded-sm border-l-2 border-(--ui-live) bg-(--ui-live)/10 px-1.5 @md:whitespace-normal motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
                  {demoAgent.addedInstruction}
                </p>
              )}
            </div>
          </section>

          <section className="hidden flex-col gap-2 @md:flex">
            <h4 className="text-[11px] text-(--ui-muted)">Tools</h4>
            <ul className="grid gap-1.5 @lg:grid-cols-2">
              {demoAgent.tools.map((tool) => {
                const on = tool.on || (tool.turnsOn === true && s >= STEP.toolOn)
                return (
                  <li
                    key={tool.name}
                    className="flex items-center justify-between gap-3 rounded-md border border-(--ui-line) bg-(--ui-panel) px-3 py-2"
                  >
                    <span className={on ? "" : "text-(--ui-muted)"}>{tool.name}</span>
                    <Toggle on={on} />
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        {/* Voice, languages, model, checks */}
        <aside className="hidden flex-col gap-4 border-l border-(--ui-line) bg-(--ui-panel) p-4 @2xl:flex">
          <dl className="flex flex-col gap-3">
            <div className="flex flex-col">
              <dt className="text-[11px] text-(--ui-muted)">Voice</dt>
              <dd className="flex items-center gap-1.5">
                <WaveformIcon className="size-4 text-(--ui-muted)" aria-hidden />
                {demoAgent.voice}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] text-(--ui-muted)">Languages</dt>
              <dd className="flex flex-wrap gap-1">
                {demoAgent.languages.map((lang) => (
                  <span key={lang} className="rounded-full border border-(--ui-line) bg-(--ui-raised) px-2 py-0.5 text-[12px]">
                    {lang}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[11px] text-(--ui-muted)">Model</dt>
              <dd>{demoAgent.model}</dd>
            </div>
          </dl>
          <div className="h-px bg-(--ui-line)" />
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-(--ui-muted)">Test scenarios</span>
            <span className={cn("flex items-center gap-1.5", s < STEP.testing && "text-(--ui-muted)")}>
              {s >= STEP.passed ? (
                <CheckCircleIcon weight="fill" className="size-4 text-(--ui-live)" aria-hidden />
              ) : s === STEP.testing ? (
                <CircleNotchIcon className="size-4 motion-safe:animate-spin" aria-hidden />
              ) : null}
              <span className="font-mono tabular-nums">
                {s >= STEP.testing ? `${passed}/${demoAgent.scenarios} passed` : "Not run"}
              </span>
            </span>
          </div>
        </aside>
      </div>

      {/* Status bar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-t border-(--ui-line) px-4 text-(--ui-muted)">
        {live && <span className="size-1.5 rounded-full bg-(--ui-live)" aria-hidden />}
        <span aria-live="polite" className="tabular-nums">
          {status}
        </span>
      </div>
    </div>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-4 w-7 shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-(--ui-live)" : "bg-(--ui-raised) ring-1 ring-(--ui-line)"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-3 rounded-full bg-(--ui-text) transition-transform duration-200 ease-(--ease-out)",
          on && "translate-x-3"
        )}
      />
    </span>
  )
}
