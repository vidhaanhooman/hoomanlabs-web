"use client"

import { CheckIcon } from "@phosphor-icons/react"
import { useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * A button in a product screen recreation that plays its own result, so it
 * never looks clickable but dead: once on screen it waits, presses, then
 * shows what happened ("Tool drafted"). Replays each time the screen mounts
 * (e.g. when a panel row brings it back). Reduced motion: the label, still.
 */
export function MockAction({ children, done, className, delay = 1400 }: { children: React.ReactNode; done: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { amount: 0.6, once: true })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState<"idle" | "press" | "done">("idle")

  useEffect(() => {
    if (!seen || reduce) return
    const a = setTimeout(() => setStep("press"), delay)
    const b = setTimeout(() => setStep("done"), delay + 180)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [seen, reduce, delay])

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 transition-[transform,background-color,color] duration-200 ease-(--ease-out)",
        className,
        step === "press" && "scale-95",
        step === "done" && "bg-(--ui-raised) text-(--ui-text)",
      )}
    >
      {step === "done" ? (
        <span className="flex items-center gap-1.5 motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]">
          <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
          {done}
        </span>
      ) : (
        children
      )}
    </span>
  )
}
