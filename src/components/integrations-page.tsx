import { DataFlow } from "@/components/integrations/data-flow"
import { Directory } from "@/components/integrations/directory"
import { ConnectPanel, DeveloperPanels } from "@/components/integrations/panels"
import { IntegrationsHero } from "@/components/integrations/sections"
import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { integrationsPage as c } from "@/content/pages/integrations"

/**
 * /platform/integrations, following the content sheet in the homepage's
 * language (like the other product pages): floating hero,  * definition, the integrations directory, connect anything, a call's data on its way out (full width),
 * the API and MCP, FAQ, next step.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function IntegrationsPage() {
  return (
    <div style={ROOMY}>
      <IntegrationsHero />
      <Definition id="integrations-definition" text={c.definition} />
      <Directory />
      <ConnectPanel />
      <DataFlow />
      <DeveloperPanels />
      <Faq id="integrations-faq" items={c.faq} />
      <NextStep id="integrations-next" related={c.related} />
    </div>
  )
}
