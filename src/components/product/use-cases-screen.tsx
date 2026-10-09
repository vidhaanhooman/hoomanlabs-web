"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { Label, Pill, ScreenBar, ScreenShell } from "@/components/product/ui-bits"
import { UseCaseVignette } from "@/components/sections/use-case-vignettes"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useCases } from "@/content/platform"
import { cn } from "@/lib/utils"

const HOLD = 4200

/**
 * Use cases as one product screen for the home page's big painted panel: the
 * list on the left, the selected use case's exchange and result on the right.
 * Cycles on its own while visible; hover or click picks one and pauses.
 */
export function UseCasesScreen({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (!inView || reduce || held) return
    const t = setTimeout(() => setActive((a) => (a + 1) % useCases.length), HOLD)
    return () => clearTimeout(t)
  }, [inView, reduce, held, active])

  const u = useCases[active]

  return (
    <ScreenShell ref={ref} className={className}>
      <ScreenBar>
        <span className="font-medium">Use cases</span>
        <Pill tone="live">Live</Pill>
        <span className="ml-auto hidden text-(--ui-muted) @md:inline">{u.result}</span>
      </ScreenBar>

      <div className="grid min-h-0 flex-1 @md:grid-cols-[13rem_1fr]">
        {/* List */}
        <ul
          className="flex gap-1 overflow-x-auto border-b border-(--ui-line) p-2 @md:flex-col @md:overflow-visible @md:border-r @md:border-b-0"
          onMouseLeave={() => setHeld(false)}
        >
          {useCases.map((x, i) => (
            <li key={x.title} className="shrink-0">
              <button
                type="button"
                onMouseEnter={() => {
                  setActive(i)
                  setHeld(true)
                }}
                onClick={() => {
                  setActive(i)
                  setHeld(true)
                }}
                aria-pressed={i === active}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left whitespace-nowrap transition-colors duration-200",
                  i === active ? "bg-(--ui-raised) text-(--ui-text)" : "text-(--ui-muted) hover:text-(--ui-text)"
                )}
              >
                {x.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Selected: the exchange, then the result */}
        <div key={active} className="flex min-h-0 flex-col gap-3 overflow-hidden p-4 motion-safe:animate-[reveal-blur_450ms_var(--ease-out)_both]">
          <div className="hidden flex-col gap-1.5 @md:flex">
            {u.call.map((l) => (
              <span
                key={l.text}
                className={cn(
                  "max-w-[80%] rounded-md px-2.5 py-1.5",
                  l.who === "agent" ? "self-start bg-(--ui-raised)" : "self-end bg-(--ui-text) text-(--ui-bg)"
                )}
              >
                {l.text}
              </span>
            ))}
          </div>
          <Label className="mt-1 hidden @md:block">Result</Label>
          <div className="flex flex-1 items-start justify-center @md:justify-start">
            <UseCaseVignette kind={u.visual} theme="dark" />
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
