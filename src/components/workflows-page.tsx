import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { DaysStory } from "@/components/workflows/days-story"
import { Explainer } from "@/components/workflows/explainer"
import { TestPanel, TopPanels } from "@/components/workflows/panels"
import { LogicTrio, WorkflowsHero } from "@/components/workflows/sections"
import { workflowsPage as c } from "@/content/pages/workflows"

/**
 * /platform/workflows, following the content sheet in the homepage's
 * language (like /platform/agents): floating hero, logos, definition and
 * proof, how a workflow works (plain-language explainer), three split panels (triggers, AI steps, connect), a customer
 * followed over days (full width), the business-logic trio, build and test,
 * FAQ, next step and the two-way close.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function WorkflowsPage() {
  return (
    <div style={ROOMY}>
      <WorkflowsHero />
      <Logos label="Trusted by 100+ teams" />
      <Definition id="workflows-definition" text={c.definition} proof={c.proof} placeholder />
      <Explainer />
      <TopPanels />
      <DaysStory />
      <LogicTrio />
      <TestPanel />
      <Faq id="workflows-faq" items={c.faq} />
      <NextStep id="workflows-next" related={c.related} />
      <TwoWayCta />
    </div>
  )
}
