import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { UseCasesScreen } from "@/components/product/use-cases-screen"
import { FeaturePanel } from "@/components/sections/feature-panel"
import { Impact, Security, StartPaths } from "@/components/sections/landing"
import { ConversationScreen } from "@/components/product/conversation-screen"
import { HeroCall } from "@/components/sections/hero-call"
import { FRAME_CLASS, STAGE_CLASS } from "@/components/sections/hero"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { Logos } from "@/components/sections/logos"
import { PlatformOverview } from "@/components/sections/platform-overview"
import { Testimonials } from "@/components/sections/testimonials"
import { ctas, panels } from "@/content/draft"
import { chapters, heroCall } from "@/content/landing"

/**
 * Proposed homepage (/lab/home), in the order a buyer's questions come:
 * 1 Hero: headline, call-me box, parallax with a live call, then logos
 * 2 Business impact (numbers)
 * 3 Use cases
 * 4 Platform overview: six component tiles, detail on /platform
 * 5 Customer quotes, then a short security strip
 * 6 Ways to get started
 */
export function LandingPage() {
  return (
    <>
      {/* 1 Hero: centred headline, the call box, then the parallax with a live call */}
      <Section id="hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container className="flex flex-col items-center text-center">
          <h1 className="reveal text-display font-normal">
            {heroCall.title}
            <span className="block text-ink-secondary">{heroCall.aside}</span>
          </h1>
          <p
            className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {heroCall.body}
          </p>
          <div id="listen" className="reveal mt-8 w-full scroll-mt-24" style={{ "--i": 2 } as React.CSSProperties}>
            <HeroCall />
          </div>
          <p
            className="reveal mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-small text-ink-secondary"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {heroCall.proof.map((p) => (
              <span key={p} className="flex items-center gap-3">
                {p}
                <span aria-hidden className="text-ink-muted">·</span>
              </span>
            ))}
            <Link href={ctas.demo.href} className="font-medium text-foreground hover:underline">
              {ctas.demo.label} →
            </Link>
          </p>
          <div className="reveal mt-12 w-full md:mt-16" style={{ "--i": 4 } as React.CSSProperties}>
            <HeroParallaxStage className={STAGE_CLASS}>
              <ConversationScreen
                className={`${FRAME_CLASS} rounded-md border border-black/10 text-left shadow-[0_24px_60px_-24px_oklch(0.25_0.03_150/0.55)]`}
              />
            </HeroParallaxStage>
          </div>
        </Container>
      </Section>
      <Logos />

      {/* 2 Business impact */}
      <Chapter {...chapters.impact} />
      <Impact />

      {/* 3 Use cases */}
      <Chapter {...chapters.useCases} />
      <FeaturePanel
        id="use-cases"
        {...panels.useCases}
        visual="Use cases"
        backdrop="/art/listen/listen-midday.png"
        softBackdrop
        screen={(className) => <UseCasesScreen className={className} />}
        media="end"
      />

      {/* 4 Platform: overview of all six components; detail lives on /platform */}
      <Chapter {...chapters.platform} />
      <PlatformOverview />

      {/* 5 Proof, then trust */}
      <Chapter {...chapters.proof} />
      <Testimonials />
      <Security />


      {/* 6 Ways to get started */}
      <StartPaths />
    </>
  )
}

/** Numbered chapter label over a group of sections. */
function Chapter({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div className="pt-(--section-gap)">
      <Container>
        <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-label text-ink-muted">
          <span>{n}</span>
          <span>{label}</span>
        </div>
        {title && <h2 className="mt-8 max-w-[24ch] text-h2 font-normal">{title}</h2>}
      </Container>
    </div>
  )
}
