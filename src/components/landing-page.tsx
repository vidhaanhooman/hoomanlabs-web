import { AgentConfigScreen } from "@/components/product/agent-config-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { UseCasesScreen } from "@/components/product/use-cases-screen"
import { DeployMeasure } from "@/components/sections/deploy-measure"
import { FeaturePanel } from "@/components/sections/feature-panel"
import { Hero } from "@/components/sections/hero"
import { StartPaths } from "@/components/sections/landing"
import { Listen } from "@/components/sections/listen"
import { Logos } from "@/components/sections/logos"
import { Platform } from "@/components/sections/platform"
import { RequestRouter } from "@/components/sections/request-router"
import { Testimonials } from "@/components/sections/testimonials"
import { panels } from "@/content/draft"

/**
 * Proposed homepage (/lab/home): the live page's big painted panels and
 * rhythm, plus use cases as one more big panel and "Two ways to start" as the
 * close. Grids of small items (security, integrations, channels) live on
 * /platform instead.
 */
export function LandingPage() {
  return (
    <>
      <Hero stage="parallax" screen="conversation" />
      <Logos />
      <FeaturePanel
        id="build"
        {...panels.build}
        visual="Agent builder UI"
        backdrop="/art/backdrops/home-build.png"
        screen={(className) => <AgentConfigScreen className={className} />}
        media="end"
      />
      <FeaturePanel
        id="test"
        {...panels.test}
        visual="Simulation run + QA scores UI"
        backdrop="/art/backdrops/home-test.png"
        screen={(className) => <SimulationRunScreen className={className} />}
        media="start"
      />
      <DeployMeasure />
      <FeaturePanel
        id="use-cases"
        {...panels.useCases}
        visual="Use cases"
        backdrop="/art/listen/listen-midday.png"
        screen={(className) => <UseCasesScreen className={className} />}
        media="end"
      />
      <RequestRouter />
      <Testimonials />
      <Platform />
      <Listen />
      <StartPaths />
    </>
  )
}
