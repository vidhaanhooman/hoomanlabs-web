import { ListPanels, SplitPanel } from "@/components/campaigns/panels"
import { RunStory } from "@/components/campaigns/run-story"
import { CampaignsHero, ConsentTrio } from "@/components/campaigns/sections"
import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { campaignsPage as c } from "@/content/pages/campaigns"

/**
 * /platform/campaigns, following the content sheet in the homepage's
 * language (like the other product pages): floating hero, logos, definition
 * and proof, list and always-on panels, a campaign running (full width),
 * consent and compliance, A/B testing, FAQ, next step and the two-way close.
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
      <Logos label="Trusted by 100+ teams" />
      <Definition id="campaigns-definition" text={c.definition} proof={c.proof} placeholder />
      <ListPanels />
      <RunStory />
      <ConsentTrio />
      <SplitPanel />
      <Faq id="campaigns-faq" items={c.faq} />
      <NextStep id="campaigns-next" related={c.related} />
      <TwoWayCta />
    </div>
  )
}
