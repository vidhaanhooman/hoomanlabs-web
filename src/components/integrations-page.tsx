import { IntegrationPanels } from "@/components/integrations/panels"
import { IntegrationsHero } from "@/components/integrations/sections"
import { Systems } from "@/components/integrations/systems"
import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { integrationsPage as c } from "@/content/pages/integrations"

/**
 * /platform/integrations, following the content sheet in the homepage's
 * language (like the other product pages): floating hero, definition, then
 * four sections in order: connect anything with an API, take actions in
 * Hooman (API and MCP), webhooks at key events, and the systems already
 * integrated; FAQ, next step.
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
      <IntegrationPanels />
      <Systems />
      <Faq id="integrations-faq" items={c.faq} />
      <NextStep id="integrations-next" related={c.related} />
    </div>
  )
}
