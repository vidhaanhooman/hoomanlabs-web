import Link from "next/link"
import { Fragment } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { VoiceFlow } from "@/components/product/voice-flow"
import { Channels } from "@/components/sections/channels"
import { FinalCta } from "@/components/sections/final-cta"
import { ProductResources } from "@/components/sections/product-resources"
import { ManageAgents } from "@/components/sections/manage-agents"
import { ProductStageList } from "@/components/sections/product-stage-list"
import { StageIndex } from "@/components/sections/stage-index"
import { ToolsIntegrations } from "@/components/sections/tools-integrations"
import { UseCases } from "@/components/sections/use-cases"
import { ctas } from "@/content/draft"
import {
  agents,
  components,
  onTheCall,
  platform,
  qaCopy,
  simulations,
  workflow,
} from "@/content/platform"
import { getProduct, type ProductStage } from "@/content/products"

/**
 * /platform overview. Hero pipeline, use cases, then one numbered section per
 * component (Agents, Workflow, Simulations, QA, Channels, Tools &
 * Integrations), one quote, FAQs and the closing CTA.
 */
export function PlatformPage() {
  // FAQs and the QA metric items still live with the former Voice AI content.
  const voice = getProduct("voice-ai")
  const improve = voice.stages?.find((s) => s.id === "improve")
  const qa: ProductStage = { ...qaCopy, id: "qa", backdrop: "", hero: "analytics", items: improve?.items ?? [] }

  // Numbering runs straight through every component.
  const stages = [agents, workflow, simulations, qa]
  const starts: number[] = []
  let n = 1
  for (const s of stages) {
    starts.push(n)
    n += s.items.length
  }
  const channelsStart = n
  const toolsStart = channelsStart + onTheCall.items.length

  return (
    <>
      <Section id="product-hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <p className="reveal-blur text-small text-ink-muted">{platform.name}</p>
          <h1 className="reveal-blur mt-3 max-w-[26ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {platform.headline}
          </h1>
          <p
            className="reveal-blur mt-5 max-w-[52ch] text-body-lg text-ink-secondary"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {platform.subhead}
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

      {stages.map((s, i) => (
        <Fragment key={s.id}>
          <ProductStageList stage={s} start={starts[i]} productName={platform.name} />
          {s.id === "agents" && <ManageAgents />}
        </Fragment>
      ))}
      <Channels start={channelsStart} productName={platform.name} />
      <ToolsIntegrations start={toolsStart} productName={platform.name} />
      <StageIndex stages={components.map((c) => ({ id: c.id, label: c.name }))} />

      <Section id="product-proof" spacing="tight">
        <Container>
          <Panel className="px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
            <figure className="flex max-w-[56ch] flex-col gap-8">
              <blockquote className="text-h3 font-normal">
                Customer quote about the platform. One to three lines on{" "}
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

      {voice.resources && <ProductResources resources={voice.resources} />}

      <FinalCta id="product-cta" title={platform.ctaTitle} />
    </>
  )
}
