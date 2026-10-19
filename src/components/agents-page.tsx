import { AgentPanels } from "@/components/agents/panels"
import { AgentsHero, Talk } from "@/components/agents/sections"
import { AgentTypes } from "@/components/agents/types"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Faq } from "@/components/product-page/faq"
import { agentsPage as c } from "@/content/pages/agents"

/**
 * /platform/agents, following the content sheet in the homepage's language:
 * hero, what a Hooman is (with the GIVA proof), the three types (Voice,
 * Chat, Broadcast), then prompt, flow, context & actions and production
 * ready; a call to hear, FAQ, the next step. The pinned "what it can do"
 * section (agents/can-do.tsx) is off the page for now.
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
      <AgentTypes />
      <AgentPanels />
      <Talk />
      <Faq id="agents-faq" items={c.faq} />
      <NextStep id="agents-next" related={c.related} />
    </div>
  )
}
