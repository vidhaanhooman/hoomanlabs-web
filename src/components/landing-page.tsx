import { Hero } from "@/components/sections/hero"
import {
  HomeChannels,
  HomeIntegrations,
  HowItWorks,
  Impact,
  Security,
  StartPaths,
} from "@/components/sections/landing"
import { Listen } from "@/components/sections/listen"
import { Logos } from "@/components/sections/logos"
import { Testimonials } from "@/components/sections/testimonials"
import { UseCasesScroll } from "@/components/sections/use-cases-scroll"

/**
 * Proposed homepage structure (/lab/home). Proof first (logos, hear it,
 * numbers), then "is it for me" (use cases), how it works, where it runs,
 * stories, trust, integrations, and the two ways to start as the close.
 */
export function LandingPage() {
  return (
    <>
      <Hero stage="parallax" screen="conversation" />
      <Logos />
      <Listen />
      <Impact />
      <UseCasesScroll />
      <HowItWorks />
      <HomeChannels />
      <Testimonials />
      <Security />
      <HomeIntegrations />
      <StartPaths />
    </>
  )
}
