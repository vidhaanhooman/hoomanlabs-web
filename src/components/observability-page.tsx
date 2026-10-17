import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ObservabilityConsole } from "@/components/observability/hero-console"
import { ObservabilityPanels } from "@/components/observability/panels"
import { Faq } from "@/components/product-page/faq"
import { Definition, HeroCopy, NextStep } from "@/components/product-page/page-bits"
import { observabilityPage as c } from "@/content/pages/observability"

/**
 * /platform/observability, split from Quality & Insights, in the homepage's
 * language like the other product pages: floating hero, definition, then
 * dashboards, alerts and conversation logs; FAQ, next step.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function ObservabilityPage() {
  return (
    <div style={ROOMY}>
      <Section id="observability-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See the dashboards", href: "#observability-dashboards" }} />
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <ObservabilityConsole />
        </Container>
      </Section>
      <Definition id="observability-definition" text={c.definition} />
      <ObservabilityPanels />
      <Faq id="observability-faq" items={c.faq} />
      <NextStep id="observability-next" related={c.related} />
    </div>
  )
}
