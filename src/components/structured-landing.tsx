import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroScene } from "@/components/lab/hero-scene"
import { AnalyticsScreen } from "@/components/product/analytics-screen"
import { OmnichannelScreen } from "@/components/product/omnichannel-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { FeaturePanel } from "@/components/sections/feature-panel"
import { FinalCta } from "@/components/sections/final-cta"
import { HomeIntegrations, Security, StartPaths } from "@/components/sections/landing"
import { Logos } from "@/components/sections/logos"
import {
  CustomerStories,
  HomeFaq,
  Outcomes,
  PlatformSummary,
  StatHeadline,
  UseCaseCarousel,
  UseCaseTemplates,
  VideoCaseStudy,
} from "@/components/sections/structure"
import { Testimonials } from "@/components/sections/testimonials"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { ctas } from "@/content/draft"
import { heroCall } from "@/content/landing"
import { developersPath, features } from "@/content/structure"

const SCREENS = {
  "feature-design": (c: string) => (
    <div className={`${c} flex items-center overflow-hidden bg-[oklch(0.13_0_0)]`}>
      <WorkflowCanvas className="w-full" />
    </div>
  ),
  "feature-channels": (c: string) => <OmnichannelScreen className={c} />,
  "feature-guardrails": (c: string) => <SimulationRunScreen className={c} />,
  "feature-analytics": (c: string) => <AnalyticsScreen className={c} />,
} as const

const BACKDROPS = {
  "feature-design": "/art/backdrops/home-build.png",
  "feature-channels": "/art/backdrops/home-deploy.png",
  "feature-guardrails": "/art/backdrops/home-test.png",
  "feature-analytics": "/art/backdrops/home-measure.png",
} as const

/**
 * Structured homepage (/lab/hero-call), 21 parts:
 * 1 hero · 2 use-case carousel · 3 logos · 4 outcomes · 5 stat · 6 quotes ·
 * 7 video case study · 8-11 platform features · 12 summary + resources ·
 * 13 integrations · 14 templates · 15 security · 16 get started (3 paths) ·
 * 17 stories · 18 FAQ · 19 closing CTA · 20 footer (layout) · 21 voice widget
 */
export function StructuredLanding() {
  return (
    <>
      {/* 1 Hero */}
      <Section id="hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <h1 className="reveal text-display font-normal">
            AI employees for every customer conversation,
            <span className="block">starting with the phone.</span>
          </h1>
          <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 1 } as React.CSSProperties}>
            {heroCall.body}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-2" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
            <Link href="#listen" className={buttonVariants({ variant: "secondary" })}>
              {ctas.talk.label}
            </Link>
          </div>
          <div id="listen" className="reveal mt-10 scroll-mt-24 md:mt-12" style={{ "--i": 3 } as React.CSSProperties}>
            <HeroScene />
          </div>
        </Container>
      </Section>

      <UseCaseCarousel />
      <Logos />
      <Outcomes />
      <StatHeadline />
      <Testimonials />
      <VideoCaseStudy />

      {features.map((f, i) => (
        <FeaturePanel
          key={f.id}
          id={f.id}
          title={f.title}
          body={f.body}
          link={f.link.label}
          linkHref={f.link.href}
          visual={f.eyebrow}
          backdrop={BACKDROPS[f.id]}
          screen={SCREENS[f.id]}
          media={i % 2 === 0 ? "end" : "start"}
        />
      ))}

      <PlatformSummary />
      <HomeIntegrations />
      <UseCaseTemplates />
      <Security />
      <StartPaths extra={[developersPath]} />
      <CustomerStories />
      <HomeFaq />
      <FinalCta />
      <VoiceWidget />
    </>
  )
}
