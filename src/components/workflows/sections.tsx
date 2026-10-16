import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { WorkflowConsole } from "@/components/workflows/hero-console"
import { workflowsPage as c } from "@/content/pages/workflows"

/**
 * Sections of /platform/workflows in the homepage's language, like Agents:
 * the hero (a large workflow console on the landscape backdrop, with one run
 * playing through the canvas). Sample data (Maya Patel, Halden Energy).
 */

export function WorkflowsHero() {
  return (
    <Section id="workflows-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See a run over days", href: "#workflows-days" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <WorkflowConsole />
      </Container>
    </Section>
  )
}
