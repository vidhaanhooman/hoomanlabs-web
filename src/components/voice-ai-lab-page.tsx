import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { VoiceFlow } from "@/components/product/voice-flow"
import { FinalCta } from "@/components/sections/final-cta"
import { Integrations } from "@/components/sections/integrations"
import { OnTheCall } from "@/components/sections/on-the-call"
import { ProductResources } from "@/components/sections/product-resources"
import { ProductStageList } from "@/components/sections/product-stage-list"
import { StageIndex } from "@/components/sections/stage-index"
import { UseCases } from "@/components/sections/use-cases"
import { ctas } from "@/content/draft"
import { getProduct } from "@/content/products"
import { buildStage, onTheCall } from "@/content/voice-ai-lab"

/**
 * The next Voice AI page (lab). Hero pipeline, use cases, then numbered
 * stages: Build (full control), On the call, Ship, Improve. Then
 * integrations, one quote, FAQs and the closing CTA.
 */
export function VoiceAiLabPage() {
  const product = getProduct("voice-ai")
  const [, ship, improve] = product.stages ?? []

  // Numbering runs straight through every stage.
  const callStart = 1 + buildStage.items.length
  const shipStart = callStart + onTheCall.items.length
  const improveStart = shipStart + ship.items.length

  const index = [
    { id: "build", label: "Build" },
    { id: "call", label: "On the call" },
    { id: "ship", label: "Ship" },
    { id: "improve", label: "Improve" },
  ]

  return (
    <>
      <Section id="product-hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <p className="reveal-blur text-small text-ink-muted">{product.name}</p>
          <h1 className="reveal-blur mt-3 max-w-[26ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {product.headline}
          </h1>
          <p
            className="reveal-blur mt-5 max-w-[52ch] text-body-lg text-ink-secondary"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {product.subhead}
          </p>
          <div className="reveal-blur mt-8 flex flex-wrap gap-2" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
            <Link href="/#listen" className={buttonVariants({ variant: "secondary" })}>
              {ctas.talk.label}
            </Link>
          </div>
          <div
            className="reveal-blur mt-12 rounded-md border border-line bg-surface px-4 py-6 sm:px-8 sm:py-8 md:mt-16 lg:px-10 lg:py-10"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <VoiceFlow />
          </div>
        </Container>
      </Section>

      <UseCases />

      <ProductStageList stage={buildStage} start={1} productName={product.name} />
      <OnTheCall start={callStart} productName={product.name} />
      <ProductStageList stage={ship} start={shipStart} productName={product.name} />
      <ProductStageList stage={improve} start={improveStart} productName={product.name} />
      <StageIndex stages={index} />

      <Integrations />

      <Section id="product-proof" spacing="tight">
        <Container>
          <Panel className="px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
            <figure className="flex max-w-[56ch] flex-col gap-8">
              <blockquote className="text-h3 font-normal">
                Customer quote about {product.name}. One to three lines on{" "}
                <mark className="bg-line px-0.5 text-foreground">a real, measurable result.</mark>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Placeholder label="" className="size-10 shrink-0 rounded-full" />
                <span className="flex flex-col">
                  <span className="text-small font-medium">Name</span>
                  <span className="text-small text-ink-muted">Role, Company</span>
                </span>
              </figcaption>
            </figure>
          </Panel>
        </Container>
      </Section>

      {product.resources && <ProductResources resources={product.resources} />}

      <FinalCta id="product-cta" title={product.ctaTitle} />
    </>
  )
}
