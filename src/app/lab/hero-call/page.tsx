import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroScene } from "@/components/lab/hero-scene"
import { heroCall } from "@/content/landing"

export const metadata: Metadata = { title: "Lab: hero with test call on the parallax (draft)" }

/** The earlier hero: headline, then the glass call card floating on the parallax painting. */
export default function LabHeroCall() {
  return (
    <Section id="hero" spacing="none" className="pt-16 pb-(--section-gap) md:pt-24">
      <Container>
        <h1 className="reveal text-display font-normal">
          AI employees for every customer conversation,
          <span className="block">starting with the phone.</span>
        </h1>
        <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 1 } as React.CSSProperties}>
          {heroCall.body}
        </p>
        <div className="reveal mt-10 md:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
          <HeroScene />
        </div>
      </Container>
    </Section>
  )
}
