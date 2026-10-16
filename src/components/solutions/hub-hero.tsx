"use client"

import { useState } from "react"
import { ArrowDownIcon } from "@phosphor-icons/react"

import { MeshStage } from "@/components/layout/art-stage"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FROSTED } from "@/components/product-page/hero-console"
import { HeroCopy } from "@/components/product-page/page-bits"
import { CallPlayer } from "@/components/solutions/call-player"
import { solutionsHub as c, useCases } from "@/content/solutions"
import { cn } from "@/lib/utils"

/**
 * The Solutions hub hero, one first screen: the hero copy with two ways in
 * (by use case, by industry), then the campaigns backdrop with the six use
 * cases as frosted pills on the image (as the voice pills on the Voice hero)
 * and one call player under them. Opens on the survey call, the real
 * recording; the others are transcript previews. A pill swaps the player
 * (fresh, not playing). Below sm the pills wrap and the player runs full
 * width.
 */

const JUMP = "inline-flex items-center gap-1 text-small font-medium text-foreground underline-offset-4 hover:underline"

export function SolutionsHero() {
  const [slug, setSlug] = useState("surveys")
  const u = useCases.find((x) => x.slug === slug) ?? useCases[0]

  return (
    <Section id="solutions-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy parent={null} crumb={c.crumb} title={c.title} line={c.line} />
        <div className="reveal mt-5 flex flex-wrap gap-x-6 gap-y-2" style={{ "--i": 4 } as React.CSSProperties}>
          <a href="#solutions-browse" className={JUMP}>
            Start by use case <ArrowDownIcon aria-hidden className="size-3.5" />
          </a>
          <a href="#solutions-industries" className={JUMP}>
            Start by industry <ArrowDownIcon aria-hidden className="size-3.5" />
          </a>
        </div>
      </Container>

      <Container className="reveal mt-10 md:mt-14">
        <MeshStage image="/art/product/campaigns-backdrop.webp" className="px-3 py-5 sm:px-[5%] sm:py-10">
          <div role="group" aria-label="Choose a use case to hear" className="mx-auto flex max-w-[62rem] flex-wrap justify-center gap-2">
            {useCases.map((x) => {
              const on = x.slug === slug
              return (
                <button
                  key={x.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSlug(x.slug)}
                  className={cn(
                    FROSTED,
                    "cursor-pointer rounded-full px-3.5 py-1.5 transition-colors hover:border-white/35 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none",
                    on && "border-white/50 bg-[oklch(0.16_0.005_260/0.82)]"
                  )}
                >
                  {x.name}
                </button>
              )
            })}
          </div>
          <div className="mx-auto mt-5 w-full max-w-[46rem] sm:mt-6">
            <CallPlayer key={u.slug} id={`hub-${u.slug}`} call={u.call} />
          </div>
        </MeshStage>
      </Container>
    </Section>
  )
}
