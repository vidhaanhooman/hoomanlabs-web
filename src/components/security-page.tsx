import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { SecurityPanels } from "@/components/security/panels"
import { SecurityData, SecurityHero } from "@/components/security/sections"
import { securityPage as c } from "@/content/pages/security"

/**
 * /platform/security, following the content sheet in the homepage's
 * language (like the other product pages): floating hero (failover in
 * action), definition, always-on failover, call guardrails,
 * workspaces and roles, telecom compliance, your data (placeholders until
 * confirmed), FAQ, next step.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function SecurityPage() {
  return (
    <div style={ROOMY}>
      <SecurityHero />
      <Definition id="security-definition" text={c.definition} />
      <SecurityPanels />
      <SecurityData />
      <Faq id="security-faq" items={c.faq} />
      <NextStep id="security-next" related={c.related} />
    </div>
  )
}
