"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { LightningIcon } from "@phosphor-icons/react"

import { UseCaseVignette } from "@/components/sections/use-case-vignettes"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import type { useCases } from "@/content/platform"
import { cn } from "@/lib/utils"

type UseCase = (typeof useCases)[number]

/**
 * One large use-case card that plays a call out in steps: the customer and
 * agent lines, the action the agent took, then the result card it produced.
 * Plays once when scrolled into view; hover or focus replays it. Reduced
 * motion shows the finished state.
 */

// Step 0: empty. 1-2: call lines. 3: action. 4: result.
const LAST = 4
const STEP_MS = 650

const WAVE = [5, 9, 7, 11, 6, 10, 8]

export function UseCaseStory({ useCase }: { useCase: UseCase }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: true })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(0)

  // Each run counts up from 0 to LAST.
  useEffect(() => {
    if (!inView || reduce) return
    let i = 0
    const t = setInterval(() => {
      i += 1
      setStep(i)
      if (i >= LAST) clearInterval(t)
    }, STEP_MS)
    return () => clearInterval(t)
  }, [inView, reduce, run])

  const shown = reduce ? LAST : step
  const replay = () => {
    if (reduce || shown < LAST) return
    setStep(0)
    setRun((r) => r + 1)
  }
  const talking = shown > 0 && shown < 3

  const reveal = (at: number) =>
    cn(
      "transition-[opacity,transform,filter] duration-500 ease-(--ease-out)",
      shown >= at ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-[2px]"
    )

  return (
    <article
      ref={ref}
      tabIndex={0}
      onPointerEnter={replay}
      onFocus={replay}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-line bg-surface outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {/* Stage */}
      <div aria-hidden className="dark relative flex h-[26rem] flex-col gap-3 overflow-hidden p-5 text-[12px] leading-snug text-foreground sm:p-6">
        {/* The call */}
        <div className="w-full max-w-[22rem] rounded-lg border border-line-strong bg-background p-3 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-ink-muted">
            <span className={cn("ui-wave flex h-3 items-center gap-[2px]")} data-idle={talking ? undefined : ""}>
              {WAVE.map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-foreground" style={{ height: h }} />
              ))}
            </span>
            <span>{shown >= 3 ? "Call ended" : "Live call"}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {useCase.call.map((l, i) => (
              <span
                key={i}
                className={cn(
                  "max-w-[85%] rounded-md px-2.5 py-1.5",
                  l.who === "agent" ? "self-start bg-surface" : "self-end bg-foreground text-background",
                  reveal(i + 1)
                )}
              >
                {l.text}
              </span>
            ))}
          </div>
        </div>

        {/* The action */}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 self-start rounded-full border border-line-strong bg-background px-2.5 py-1 text-ink-secondary",
            reveal(3)
          )}
        >
          <LightningIcon weight="fill" className="size-3 text-(--ui-live)" />
          {useCase.action}
        </span>

        {/* The result */}
        <div className={cn("mt-auto self-end", reveal(4))}>
          <UseCaseVignette kind={useCase.visual} />
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col gap-2 border-t border-line bg-background p-5 sm:p-6">
        <h3 className="text-h4 font-medium">{useCase.title}</h3>
        <p className="text-small text-ink-secondary">{useCase.body}</p>
        <p className="mt-auto pt-2 font-mono text-label text-ink-muted">→ {useCase.result}</p>
      </div>
    </article>
  )
}
