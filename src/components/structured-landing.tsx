import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroScene } from "@/components/lab/hero-scene"
import { AnalyticsScreen } from "@/components/product/analytics-screen"
import { OmnichannelScreen } from "@/components/product/omnichannel-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { FinalCta } from "@/components/sections/final-cta"
import { HomeIntegrations, StartPaths } from "@/components/sections/landing"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import {
  HomeFaq,
  PlatformSummary,
  StatHeadline,
  UseCaseCarousel,
  UseCaseTemplates,
} from "@/components/sections/structure"
import { Testimonials } from "@/components/sections/testimonials"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { ctas } from "@/content/draft"
import { heroCall } from "@/content/landing"
import { features } from "@/content/structure"

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

const CHROME = "rounded-md border border-black/10"


/**
 * Structured homepage (/lab/hero-call):
 * hero · logos · use-case carousel · outcomes · stat ·
 * platform features (2×2) · summary + resources · integrations · templates ·
 * get started (2 paths) · quotes · FAQ · closing CTA · footer (layout) · voice widget
 */
/** A little more room between every section on this page (site default is 2.5rem → 4rem). */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function StructuredLanding() {
  return (
    <div style={ROOMY}>
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

      <Logos />
      <UseCaseCarousel />
      <OutcomeDiagrams />
      <StatHeadline />

      {/* 8-11 Platform features: a 2x2 grid of compact cards */}
      <Section id="sl-features">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">Build, deploy, test and measure in one place.</h2>
            <p className="text-body text-ink-secondary">Everything an agent needs, from the first prompt to the thousandth call.</p>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {features.map((f) => (
              <li key={f.id}>
                <Panel className="flex h-full flex-col gap-5 p-5 sm:p-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-label text-ink-muted">{f.eyebrow}</span>
                    <h3 className="text-h4 font-normal">{f.title}</h3>
                    <p className="text-small text-ink-secondary">{f.body}</p>
                  </div>
                  {/* A cropped slice of the screen */}
                  <div aria-hidden className="relative h-52 overflow-hidden rounded-md">
                    {SCREENS[f.id](`absolute inset-x-0 top-0 h-80 ${CHROME}`)}
                  </div>
                  <TextLink href={f.link.href} className="mt-auto">
                    {f.link.label}
                  </TextLink>
                </Panel>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PlatformSummary />
      <HomeIntegrations />
      <UseCaseTemplates />
      <StartPaths />
      <Testimonials />
      <HomeFaq />
      <FinalCta />
      <VoiceWidget />
    </div>
  )
}
