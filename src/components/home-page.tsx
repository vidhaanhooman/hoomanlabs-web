import { AgentConfigScreen } from "@/components/product/agent-config-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { Listen } from "@/components/sections/listen"
import { DeployMeasure } from "@/components/sections/deploy-measure"
import { FeaturePanel } from "@/components/sections/feature-panel"
import { FinalCta } from "@/components/sections/final-cta"
import { Hero, type HeroScreen, type HeroStage } from "@/components/sections/hero"
import { Logos } from "@/components/sections/logos"
import { Platform } from "@/components/sections/platform"
import { RequestRouter } from "@/components/sections/request-router"
import { Testimonials } from "@/components/sections/testimonials"
import { panels } from "@/content/draft"
import { sections, type SectionId } from "@/content/sections"

/**
 * The home page body. The real page and every /lab experiment render this,
 * so experiments stay an exact copy of the page apart from what they vary.
 */
export function HomePage({
  heroStage,
  heroScreen,
}: {
  heroStage?: HeroStage
  heroScreen?: HeroScreen
}) {
  const registry: Partial<Record<SectionId, () => React.ReactNode>> = {
    hero: () => <Hero stage={heroStage} screen={heroScreen} />,
    logos: () => <Logos />,
    build: () => (
      <FeaturePanel
        id="build"
        {...panels.build}
        visual="Agent builder UI"
        backdrop="/art/backdrops/home-build.png"
        screen={(className) => <AgentConfigScreen className={className} />}
        media="end"
      />
    ),
    test: () => (
      <FeaturePanel
        id="test"
        {...panels.test}
        visual="Simulation run + QA scores UI"
        backdrop="/art/backdrops/home-test.png"
        screen={(className) => <SimulationRunScreen className={className} />}
        media="start"
      />
    ),
    "deploy-measure": () => <DeployMeasure />,
    router: () => <RequestRouter />,
    testimonials: () => <Testimonials />,
    platform: () => <Platform />,
    listen: () => <Listen />,
    cta: () => <FinalCta />,
  }

  return sections.map(({ id }) => {
    const render = registry[id]
    return render ? <RegistryItem key={id} render={render} /> : null
  })
}

function RegistryItem({ render }: { render: () => React.ReactNode }) {
  return render()
}
