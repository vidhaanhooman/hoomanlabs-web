import { IntegrationsConsole } from "@/components/integrations/hero-console"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { integrationsPage as c } from "@/content/pages/integrations"

/**
 * The /platform/integrations hero, like the other product pages: the copy,
 * then a large console on the landscape backdrop showing the Integrations
 * screen, with call events landing live and the outcome written back to the
 * CRM. Sample data; API paths and payloads illustrative.
 */

export function IntegrationsHero() {
  return (
    <Section id="integrations-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See how it connects", href: "#integrations-connect" }} />
      </Container>

      {/* A large integrations console on the landscape backdrop, with live call events */}
      <Container className="reveal mt-10 md:mt-14">
        <IntegrationsConsole />
      </Container>
    </Section>
  )
}
