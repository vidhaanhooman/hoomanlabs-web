import { ListPanels } from "@/components/campaigns/panels"
import { RunStory } from "@/components/campaigns/run-story"
import { CampaignsHero, FeatureGrid } from "@/components/campaigns/sections"
import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { campaignsPage as c } from "@/content/pages/campaigns"

/**
 * /platform/campaigns, following the content sheet in the homepage's
 * language (like the other product pages): floating hero, definition
 * and proof, Outreach (batch, with A/B testing) and Always-on (real-time)
 * panels, a campaign
 * running (full width), the six built-in features, FAQ, next step.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function CampaignsPage() {
  return (
    <div style={ROOMY}>
      <CampaignsHero />
      <Definition id="campaigns-definition" text={c.definition} proof={c.proof} placeholder />
      <ListPanels />
      <RunStory />
      <FeatureGrid />
      <Faq id="campaigns-faq" items={c.faq} />
      <NextStep id="campaigns-next" related={c.related} />
    </div>
  )
}
