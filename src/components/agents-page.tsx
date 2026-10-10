import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { AgentBuilder } from "@/components/product/flow-canvas"
import { FinalCta } from "@/components/sections/final-cta"
import { ManageAgents } from "@/components/sections/manage-agents"
import { ProductStageList } from "@/components/sections/product-stage-list"
import { VoiceSamples } from "@/components/sections/voice-samples"
import { ctas } from "@/content/draft"
import { agents } from "@/content/platform"

const CHROME = "rounded-md border border-black/10 shadow-[0_30px_80px_-30px_oklch(0.25_0_0/0.5)]"

/**
 * /platform/agents: the builder playing a live call, what you control (01-05),
 * how agents behave on a real line (audio A/B), managing them from the
 * console or MCP, then the closing CTA.
 */
export function AgentsPage() {
  return (
    <>
      <Section id="agents-hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <p className="reveal-blur text-small text-ink-muted">
            <Link href="/platform" className="hover:text-foreground">
              Platform
            </Link>{" "}
            / Agents
          </p>
          <h1 className="reveal-blur mt-3 max-w-[24ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {agents.headline}
          </h1>
          <p
            className="reveal-blur mt-5 max-w-[56ch] text-body-lg text-ink-secondary"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {agents.body}
          </p>
          <div className="reveal-blur mt-8 flex flex-wrap gap-2" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
            <Link href="/#listen" className={buttonVariants({ variant: "secondary" })}>
              {ctas.talk.label}
            </Link>
          </div>
          <div className="reveal-blur mt-12 md:mt-16" style={{ "--i": 4 } as React.CSSProperties}>
            <AgentBuilder className={`md:h-[34rem] ${CHROME}`} />
          </div>
        </Container>
      </Section>

      <ProductStageList stage={agents} start={1} productName="Agents" />
      <VoiceSamples />
      <ManageAgents />
      <FinalCta id="agents-cta" title="Build your first agent with us." />
    </>
  )
}
