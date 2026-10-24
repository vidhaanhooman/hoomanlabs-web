"use client"

import { useRef } from "react"
import { useInView } from "motion/react"

/**
 * Brings a customer story card in from blur once it scrolls into view
 * (once), a beat after the card before it. Reduced motion: no blur, no
 * delay (see .story-reveal in globals.css).
 */
export function StoryReveal({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const shown = useInView(ref, { once: true, amount: 0.35 })
  return (
    <li ref={ref} data-shown={shown || undefined} className="story-reveal" style={{ "--reveal-d": `${index * 140}ms` } as React.CSSProperties}>
      {children}
    </li>
  )
}
