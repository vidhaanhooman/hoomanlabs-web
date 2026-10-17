import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { QualityConsole } from "@/components/quality/hero-console"
import { qualityPage as c } from "@/content/pages/quality"

/**
 * The /platform/quality hero and its lighter sections. The hero: the copy,
 * then a large console on the landscape backdrop with one call's transcript
 * and its scorecard (the failed judge pointing to its turn).
 */

export function QualityHero() {
  return (
    <Section id="quality-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See a scorecard", href: "#quality-judges" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <QualityConsole />
      </Container>
    </Section>
  )
}
