"use client"

import { useRef } from "react"
import { useInView } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * The industry pages' motion, played once when scrolled into view and off
 * for reduced motion: the call steps reveal one after another behind a line
 * that fills left to right.
 */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"

/** The steps list: a progress line on top, then the cards, revealed in order. */
export function StepsReveal({ children, count }: { children: React.ReactNode; count: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, amount: 0.3 })
  return (
    <div ref={ref} data-on={on} className="group/steps mt-12">
      <div aria-hidden className="mb-6 hidden h-px bg-line lg:block">
        <div className={cn("h-px origin-left scale-x-0 bg-foreground transition-transform duration-[1600ms] group-data-[on=true]/steps:scale-x-100 motion-reduce:scale-x-100", EASE)} />
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ "--n": count } as React.CSSProperties}>
        {children}
      </ol>
    </div>
  )
}

/** One step card, revealed after the ones before it. */
export function StepCard({ i, className, children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "translate-y-4 opacity-0 transition-[opacity,translate] duration-700 group-data-[on=true]/steps:translate-y-0 group-data-[on=true]/steps:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        EASE,
        className,
      )}
      style={{ transitionDelay: `${i * 320}ms` }}
    >
      {children}
    </li>
  )
}
