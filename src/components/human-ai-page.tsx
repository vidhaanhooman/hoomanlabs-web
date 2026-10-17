import { HumanAiConsole } from "@/components/human-ai/hero-console"
import { HumanAiPanels } from "@/components/human-ai/panels"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { Definition, HeroCopy, NextStep } from "@/components/product-page/page-bits"
import { humanAiPage as c } from "@/content/pages/human-ai"

/**
 * /platform/human-ai, the Platform menu's featured page, in the homepage's
 * language like the other product pages: floating hero, definition, then
 * human transfer with context, QA of human calls, and learning from
 * transferred calls to improve the AI; FAQ, next step.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function HumanAiPage() {
  return (
    <div style={ROOMY}>
      <Section id="human-ai-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See a handoff", href: "#human-ai-transfer" }} />
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <HumanAiConsole />
        </Container>
      </Section>
      <Definition id="human-ai-definition" text={c.definition} />
      <HumanAiPanels />
      <Faq id="human-ai-faq" items={c.faq} />
      <NextStep id="human-ai-next" related={c.related} />
    </div>
  )
}
