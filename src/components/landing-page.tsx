
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Impact, Security, StartPaths } from "@/components/sections/landing"
import { ListenExperience } from "@/components/sections/listen-experience"
import { Logos } from "@/components/sections/logos"
import { PlatformOverview } from "@/components/sections/platform-overview"
import { Testimonials } from "@/components/sections/testimonials"
import { UseCases } from "@/components/sections/use-cases"
import { VoiceSamples } from "@/components/sections/voice-samples"
import { chapters, heroCall } from "@/content/landing"

/**
 * Proposed homepage (/lab/home), in the order a buyer's questions come:
 * 1 Hero: headline, then the listen / call-me panel, then logos
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
        <Container className="flex flex-col items-start text-left">
          <h1 className="reveal text-display font-normal">
            AI employees for every customer conversation,
            <span className="block">starting with the phone.</span>
          </h1>
          <p
            className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {heroCall.body}
          </p>
        </Container>
        <div id="listen" className="reveal mt-10 scroll-mt-24 md:mt-12" style={{ "--i": 4 } as React.CSSProperties}>
          <ListenExperience />
        </div>
      </Section>
      <Logos />

      {/* 2 Business impact */}
      <Chapter {...chapters.impact} />
      <Impact />

      {/* 3 Use cases */}
      <Chapter {...chapters.useCases} />
      <UseCases
        only={["collections", "booking", "support"]}
        resultFirst
        more={{ label: "See all use cases", href: "/platform#product-use-cases" }}
      />

      {/* 4 Platform: overview of all six components; detail lives on /platform */}
      <Chapter {...chapters.platform} />
      <PlatformOverview />
      <VoiceSamples />

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
