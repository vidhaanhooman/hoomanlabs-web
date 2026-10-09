"use client"

import { useEffect, useState } from "react"
import { useInView } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

/**
 * Steps through a scripted sequence and loops. `holds[i]` is how long step i
 * stays before the next one. Pauses while the element is off-screen; under
 * reduced motion it parks on the final step (the "finished" state).
 */
export function useScriptedLoop(ref: React.RefObject<Element | null>, holds: number[]) {
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const last = holds.length - 1
  const playing = inView && !reduce

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), holds[step])
    return () => clearTimeout(t)
  }, [playing, step, last, holds])

  return { step: reduce ? last : step, last, reduce }
}
