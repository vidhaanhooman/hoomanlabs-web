import { AgentPanels } from "@/components/agents/panels"
import { Moments } from "@/components/agents/moments"
import { AgentsHero, Talk } from "@/components/agents/sections"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Faq } from "@/components/product-page/faq"
import { agentsPage as c } from "@/content/pages/agents"

/**
 * /platform/agents, following the content sheet in the homepage's language:
 * hero, what a Hooman is (with the GIVA proof), four product panels
 * (job description, knowledge, live data tables, flow); the pinned "what it
 * can do" section (agents/can-do.tsx) is off the page for now; everything around the
 * conversation as one call's timeline (before, during, after), a call to hear, FAQ, the next step.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function AgentsPage() {
  return (
    <div style={ROOMY}>
      <AgentsHero />
      <Definition id="agents-definition" text={c.definition} proof={{ quote: `“${c.proof.quote}”`, by: c.proof.by }} />
      <AgentPanels />
      <Moments />
      <Talk />
      <Faq id="agents-faq" items={c.faq} />
      <NextStep id="agents-next" related={c.related} />
    </div>
  )
}
