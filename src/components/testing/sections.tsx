import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { TestingConsole } from "@/components/testing/hero-console"
import { testingPage as c } from "@/content/pages/testing"

/**
 * The /platform/testing hero, like the other product pages: the copy, then
 * a test run floating on the landscape backdrop (big counters, a progress
 * line and scenario results landing one by one). Sample data.
 */
export function TestingHero() {
  return (
    <Section id="testing-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See a test run", href: "#testing-callers" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <TestingConsole />
      </Container>
    </Section>
  )
}
