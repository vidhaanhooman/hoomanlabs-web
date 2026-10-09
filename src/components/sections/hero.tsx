import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Placeholder } from "@/components/layout/placeholder"
import { ConversationScreen } from "@/components/product/conversation-screen"
import { Section } from "@/components/layout/section"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { ctas, hero } from "@/content/draft"

/** Backdrop + frame geometry, shared by every stage variant so they stay identical. */
export const STAGE_CLASS = "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/9]"
export const FRAME_CLASS =
  "absolute inset-x-[5%] top-[6%] bottom-[10%] z-10 sm:inset-x-[8%] sm:top-[8%] sm:bottom-[11%] lg:inset-x-[10%]"

/** Which backdrop sits behind the product frame. Lab pages try alternatives. */
export type HeroStage = "placeholder" | "parallax"

/** What fills the product frame. */
export type HeroScreen = "placeholder" | "conversation"

/**
 * Cursor-style hero: quiet left-aligned headline + two CTAs, then the product
 * as the main visual, full container width on a backdrop.
 */
export function Hero({
  stage = "placeholder",
  screen = "placeholder",
}: {
  stage?: HeroStage
  screen?: HeroScreen
}) {
  const frame =
    screen === "conversation" ? (
      <ConversationScreen
        className={`${FRAME_CLASS} rounded-md border border-black/10 shadow-[0_24px_60px_-24px_oklch(0.25_0.03_150/0.55)]`}
      />
    ) : (
      <Placeholder variant="frame" label="Product UI: default screen TBD, 16:10" className={FRAME_CLASS} />
    )

  return (
    <Section id="hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
      <Container>
        <h1 className="reveal max-w-[30ch] text-display font-normal">{hero.headline}</h1>

        <div className="reveal mt-8 flex flex-wrap gap-2" style={{ "--i": 1 } as React.CSSProperties}>
          <Link href={ctas.demo.href} className={buttonVariants()}>
            {ctas.demo.label}
          </Link>
          <Link href={ctas.talk.href} className={buttonVariants({ variant: "secondary" })}>
            {ctas.talk.label}
          </Link>
        </div>

        <div className="reveal mt-12 md:mt-16" style={{ "--i": 2 } as React.CSSProperties}>
          {stage === "parallax" ? (
            <HeroParallaxStage className={STAGE_CLASS}>{frame}</HeroParallaxStage>
          ) : (
            <Placeholder label="Backdrop: art or colour field" className={STAGE_CLASS}>
              {frame}
            </Placeholder>
          )}
        </div>
      </Container>
    </Section>
  )
}
