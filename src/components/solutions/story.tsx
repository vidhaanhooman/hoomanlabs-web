"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import type { Industry } from "@/content/solutions"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

/**
 * An industry's day-by-day story as a horizontal timeline (a list below
 * md): a rule with a dot per step, the day, a title and a line. Steps rise
 * in once, in order, when the timeline comes into view; reduced motion
 * shows it finished.
 */
export function SolutionStory({ industry }: { industry: Industry }) {
  const ref = useRef<HTMLOListElement>(null)
  const seen = useInView(ref, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const shown = reduce || seen

  return (
    <Section id="solution-story">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">One customer, step by step.</h2>
          <p className="text-body text-ink-secondary">How the work adds up in {industry.name.toLowerCase()}, across days.</p>
        </div>
        <ol ref={ref} className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
          {industry.story.map((s, i) => (
            <motion.li
              key={`${s.day}-${s.title}`}
              initial={false}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : i * 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col gap-2 border-l border-line pl-5 md:border-t md:border-l-0 md:pt-6 md:pl-0"
            >
              <span aria-hidden className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-foreground md:-top-[4.5px] md:left-0" />
              <span className="font-mono text-label text-ink-muted">{s.day}</span>
              <h3 className="text-h4 font-normal">{s.title}</h3>
              <p className="text-body text-ink-secondary">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
