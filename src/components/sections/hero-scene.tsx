"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon } from "@phosphor-icons/react"

import { HeroCall } from "@/components/sections/hero-call"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { SamplePlayer } from "@/components/sections/sample-player"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useCaseCalls } from "@/content/demo-calls"
import { cn } from "@/lib/utils"

/**
 * The hero scene: the parallax painting with agents' finished tasks floating
 * in it at different depths (a few at a time, cycling), the call box in the
 * middle with a glass sample player above it. Fictional demo data.
 */

type Task = { key: string; who: string; what: string; x: string; y: string; depth: number }

const TASKS: Task[] = [
  { key: "pay", who: "Ria · Collections", what: "Payment moved to Friday", x: "6%", y: "16%", depth: 0.35 },
  { key: "book", who: "Aarav · Bookings", what: "Booked Thu 10:00 with Dr. Rao", x: "70%", y: "12%", depth: 0.45 },
  { key: "lead", who: "Sam · Sales", what: "Lead qualified, call booked", x: "8%", y: "70%", depth: 0.8 },
  { key: "refund", who: "Lucía · Support", what: "Refund approved, SMS sent", x: "68%", y: "72%", depth: 0.85 },
  { key: "renew", who: "Ria · Retention", what: "Gold plan renewed, 12 months", x: "2%", y: "44%", depth: 0.55 },
  { key: "nps", who: "Aarav · Surveys", what: "NPS 9 logged to CRM", x: "80%", y: "46%", depth: 0.6 },
]

const SHOWN = 3
const STEP_MS = 2600

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  const [tick, setTick] = useState(0)
  const [useCase, setUseCase] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setTick((n) => n + 1), STEP_MS)
    return () => clearInterval(t)
  }, [inView, reduce])

  // A rolling window of SHOWN tasks; reduced motion shows a fixed set.
  const visible = new Set(Array.from({ length: SHOWN }, (_, i) => TASKS[(tick + i * 2) % TASKS.length].key))

  const floats = TASKS.map((t) => ({
    key: t.key,
    depth: t.depth,
    node: (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute hidden transition-[opacity,transform] duration-700 ease-(--ease-out) md:block",
          visible.has(t.key) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
        style={{ left: t.x, top: t.y }}
      >
        <TaskCard who={t.who} what={t.what} />
      </div>
    ),
  }))

  return (
    <div ref={ref}>
      <HeroParallaxStage floats={floats} className="min-h-[36rem] sm:aspect-[16/10] sm:min-h-0 lg:aspect-[16/8]">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4">
          <SamplePlayer call={useCaseCalls[useCase]} />
          <HeroCall glass onUseCase={setUseCase} />

        </div>
      </HeroParallaxStage>
    </div>
  )
}

function TaskCard({ who, what }: { who: string; what: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/50 bg-background/80 py-2 pr-3.5 pl-2.5 shadow-[0_12px_30px_-14px_oklch(0.2_0.03_150/0.5)] backdrop-blur-md">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
        <CheckIcon weight="bold" className="size-3" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] text-ink-muted">{who}</span>
        <span className="text-small whitespace-nowrap">{what}</span>
      </span>
    </div>
  )
}
