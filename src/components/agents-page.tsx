import { AgentPanels } from "@/components/agents/panels"
import { Moments } from "@/components/agents/moments"
import { AgentsHero, Definition, NextStep, Talk } from "@/components/agents/sections"
import { Faq } from "@/components/product-page/faq"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { agentsPage as c } from "@/content/pages/agents"

/**
 * /platform/agents, following the content sheet in the homepage's language:
 * hero, logos, what a Hooman is (with the GIVA proof), four product panels
 * (job description, knowledge, live data tables, flow); the pinned "what it
 * can do" section (agents/can-do.tsx) is off the page for now; everything around the
 * conversation as one call's timeline (before, during, after), a call to hear, FAQ, the next step and the two-way close.
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
      <Logos label="Trusted by 100+ teams" />
      <Definition />
      <AgentPanels />
      <Moments />
      <Talk />
      <Faq id="agents-faq" items={c.faq} />
      <NextStep />
      <TwoWayCta />
    </div>
  )
}
