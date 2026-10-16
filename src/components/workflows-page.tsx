import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { DaysStory } from "@/components/workflows/days-story"
import { Explainer } from "@/components/workflows/explainer"
import { TestPanel } from "@/components/workflows/panels"
import { WorkflowsHero } from "@/components/workflows/sections"
import { ToolsStory } from "@/components/workflows/tools-story"
import { BuildingBlocks, WorkflowTypes } from "@/components/workflows/types"
import { workflowsPage as c } from "@/content/pages/workflows"

/**
 * /platform/workflows, following the content sheet in the homepage's
 * language (like /platform/agents): floating hero, definition and
 * proof, how a workflow works (plain-language explainer), the two kinds of
 * workflow, workflows as tools (a live call handing heavy work to a tool
 * workflow), workflows as journeys (a customer followed over days), the
 * building blocks in one section, build and test, FAQ, next step.
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
      <Definition id="workflows-definition" text={c.definition} proof={c.proof} placeholder />
      <Explainer />
      <WorkflowTypes />
      <ToolsStory />
      <DaysStory />
      <BuildingBlocks />
      <TestPanel />
      <Faq id="workflows-faq" items={c.faq} />
      <NextStep id="workflows-next" related={c.related} />
    </div>
  )
}
