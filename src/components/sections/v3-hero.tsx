"use client"

import Link from "next/link"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { JOBS, JobJourneyWindow, type JobId } from "@/components/sections/journey-job"
import { ctas } from "@/content/draft"

/**
 * Homepage hero: headline and CTA (no description) over the parallax painting with the journey
 * job window (a call, its follow-up and the job done); it plays Support,
 * then Sales, then Collections.
 */

const ORDER = Object.keys(JOBS) as JobId[]
const next = (j: JobId) => ORDER[(ORDER.indexOf(j) + 1) % ORDER.length]

export function V3Hero() {
  const [job, setJob] = useState<JobId>("support")
  return (
    <Section id="hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container className="relative">

        <h1 className="reveal text-display font-normal">
          AI agents that talk, follow up
          <span className="block">and finish the job.</span>
        </h1>
        <div className="reveal mt-8" style={{ "--i": 1 } as React.CSSProperties}>
          <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
            {ctas.demo.label}
          </Link>
        </div>

      </Container>

      <Container className="mt-10 md:mt-12">
        <div id="v3-journey" className="reveal" style={{ "--i": 2 } as React.CSSProperties}>
          <HeroParallaxStage className="rounded-xl">
            <div className="relative z-10 px-3 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
              <JobJourneyWindow key={job} id={job} onPick={setJob} onEnd={() => setJob((j) => next(j))} />
            </div>
          </HeroParallaxStage>
        </div>
      </Container>
    </Section>
  )
}
