
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Impact, Security, StartPaths } from "@/components/sections/landing"
import { ListenExperience } from "@/components/sections/listen-experience"
import { Logos } from "@/components/sections/logos"
import { PlatformOverview } from "@/components/sections/platform-overview"
import { Testimonials } from "@/components/sections/testimonials"
import { UseCases } from "@/components/sections/use-cases"
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
      <PaintedChapter field="impact">
        <Chapter {...chapters.impact} />
        <Impact />
      </PaintedChapter>

      {/* 3 Use cases */}
      <PaintedChapter field="usecases">
        <Chapter {...chapters.useCases} />
        <UseCases more={{ label: "See all use cases", href: "/platform#product-use-cases" }} />
      </PaintedChapter>

      {/* 4 Platform: overview of all six components; detail lives on /platform */}
      <PaintedChapter field="platform">
        <Chapter {...chapters.platform} />
        <PlatformOverview />
      </PaintedChapter>

      {/* 5 Proof, then trust */}
      <Chapter {...chapters.proof} />
      <Testimonials />
      <Security />

      {/* 6 Ways to get started */}
      <PaintedChapter field="start">
        <StartPaths />
      </PaintedChapter>
    </>
  )
}

/**
 * A chapter on its own painted colour field (public/art/fields/field-*.webp),
 * full-bleed, fading into the page at top and bottom so chapters read like
 * pages of one sketchbook. UI inside stays as is.
 */
function PaintedChapter({ field, children }: { field: "impact" | "usecases" | "platform" | "start"; children: React.ReactNode }) {
  const fade = "linear-gradient(to bottom, transparent 0, black 7rem, black calc(100% - 7rem), transparent 100%)"
  return (
    <div className="relative isolate pb-(--section-gap)">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(/art/fields/field-${field}.webp)`, maskImage: fade, WebkitMaskImage: fade }}
      />
      {children}
    </div>
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
