import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { AgentConfigScreen } from "@/components/product/agent-config-screen"
import { AnalyticsScreen } from "@/components/product/analytics-screen"
import { CampaignScreen } from "@/components/product/campaign-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { UseCasesScreen } from "@/components/product/use-cases-screen"
import { FeaturePanel } from "@/components/sections/feature-panel"
import { HomeChannels, HomeIntegrations, Impact, StartPaths } from "@/components/sections/landing"
import { ListenExperience } from "@/components/sections/listen-experience"
import { Logos } from "@/components/sections/logos"
import { Platform } from "@/components/sections/platform"
import { Testimonials } from "@/components/sections/testimonials"
import { ctas, hero, panels } from "@/content/draft"
import { chapters, homePlatform } from "@/content/landing"
import { componentHref } from "@/content/platform"

/**
 * Proposed homepage (/lab/home), in five parts:
 * 1 Hero with the listen / call-me experience as its visual, then logos
 * 2 Business impact: numbers, then customer quotes
 * 3 Platform: Agents, Workflow, Simulations, QA panels, Channels, Tools
 * 4 Use cases and integrations
 * 5 Ways to get started
 */
export function LandingPage() {
  return (
    <>
      {/* 1 Hero: headline, then hear an agent / get a call */}
      <Section id="hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <h1 className="reveal max-w-[30ch] text-display font-normal">{hero.headline}</h1>
          <div className="reveal mt-8 flex flex-wrap gap-2" style={{ "--i": 1 } as React.CSSProperties}>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
            <Link href="#listen" className={buttonVariants({ variant: "secondary" })}>
              {ctas.talk.label}
            </Link>
          </div>
        </Container>
        <div id="listen" className="reveal mt-12 scroll-mt-24 md:mt-16" style={{ "--i": 2 } as React.CSSProperties}>
          <ListenExperience />
        </div>
      </Section>
      <Logos />

      {/* 2 Business impact */}
      <Chapter {...chapters.impact} />
      <Impact />
      <Testimonials />

      {/* 3 Platform */}
      <Chapter {...chapters.platform} />
      <FeaturePanel
        id="product-agents"
        {...homePlatform.agents}
        linkHref={componentHref("agents")}
        visual="Agent builder UI"
        backdrop="/art/backdrops/home-build.png"
        screen={(className) => <AgentConfigScreen className={className} />}
        media="end"
      />
      <FeaturePanel
        id="product-workflow"
        {...homePlatform.workflow}
        linkHref={componentHref("workflow")}
        visual="Campaign UI"
        backdrop="/art/backdrops/home-deploy.png"
        screen={(className) => <CampaignScreen className={className} />}
        media="start"
      />
      <FeaturePanel
        id="product-simulations"
        {...homePlatform.simulations}
        linkHref={componentHref("simulations")}
        visual="Simulation run UI"
        backdrop="/art/backdrops/home-test.png"
        screen={(className) => <SimulationRunScreen className={className} />}
        media="end"
      />
      <FeaturePanel
        id="product-qa"
        {...homePlatform.qa}
        linkHref={componentHref("qa")}
        visual="QA analytics UI"
        backdrop="/art/backdrops/home-measure.png"
        screen={(className) => <AnalyticsScreen className={className} />}
        media="start"
      />
      <HomeChannels />
      <Platform title={homePlatform.tools.title} more={homePlatform.tools.more} />

      {/* 4 Use cases and integrations */}
      <Chapter {...chapters.useCases} />
      <FeaturePanel
        id="use-cases"
        {...panels.useCases}
        visual="Use cases"
        backdrop="/art/listen/listen-midday.png"
        screen={(className) => <UseCasesScreen className={className} />}
        media="end"
      />
      <HomeIntegrations />

      {/* 5 Ways to get started */}
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
