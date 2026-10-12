"use client"

import Link from "next/link"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { Journey, type JourneyId } from "@/components/sections/journey"
import { CalmJourneyWindow } from "@/components/sections/journey-calm"
import { ctas } from "@/content/draft"
import { heroCall } from "@/content/landing"
import { cn } from "@/lib/utils"

/**
 * /lab/v3 hero, two layouts to compare (lab switch, top right):
 * - calm: a full-bleed painting with one large window whose lower edge
 *   breaks onto the page; it plays inbound, then outbound, on its own.
 * - window: the earlier framed painting with the three-column window.
 */

export function V3Hero() {
  const [layout, setLayout] = useState<"calm" | "window">("calm")
  const [journey, setJourney] = useState<JourneyId>("inbound")
  return (
    <Section id="hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container className="relative">
        <div role="tablist" aria-label="Hero layout (lab)" className="absolute top-0 right-4 hidden items-center gap-1 rounded-full border border-dashed border-line-strong p-1 sm:flex lg:right-6">
          <span className="px-2 font-mono text-[11px] text-ink-muted">Lab</span>
          {(["calm", "window"] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={layout === l}
              onClick={() => setLayout(l)}
              className={cn(
                "rounded-full px-3 py-1 text-[12px] capitalize transition-colors",
                layout === l ? "bg-foreground text-background" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <h1 className="reveal text-display font-normal">
          AI employees for every customer conversation,
          <span className="block">starting with the phone.</span>
        </h1>
        <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 1 } as React.CSSProperties}>
          {heroCall.body}
        </p>
        <div className="reveal mt-8" style={{ "--i": 2 } as React.CSSProperties}>
          <Link href={ctas.demo.href} className={buttonVariants()}>
            {ctas.demo.label}
          </Link>
        </div>

        {layout === "window" && (
          <div id="v3-journey" className="reveal mt-12 md:mt-16" style={{ "--i": 3 } as React.CSSProperties}>
            <Journey />
          </div>
        )}
      </Container>

      {layout === "calm" && (
        <div className="relative mt-10 md:mt-12">
          {/* Full-bleed painting; the window's lower edge breaks out below it */}
          <HeroParallaxStage className="absolute inset-x-0 top-0 bottom-20 rounded-none md:bottom-24" />
          <Container className="relative z-10 pt-12 md:pt-16 lg:pt-20">
            <div id="v3-journey" className="reveal" style={{ "--i": 4 } as React.CSSProperties}>
              <CalmJourneyWindow key={journey} id={journey} onEnd={() => setJourney((j) => (j === "inbound" ? "outbound" : "inbound"))} />
            </div>
          </Container>
        </div>
      )}
    </Section>
  )
}
