import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { HeroCopy } from "@/components/product-page/page-bits"
import { Everywhere } from "@/components/solutions/everywhere"
import { IndustryCards } from "@/components/solutions/industry-cards"
import { industries } from "@/content/industries"
import { solutionsHub as c } from "@/content/solutions"

/**
 * /solutions, the hub: the page heading, then the six industries as big
 * cards (photo, one example use case, other use cases) linking to their own pages
 * (/solutions/[slug]), the shared "works everywhere" strip, a short
 * FAQ and the Book a demo.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

const FAQ = [
  { q: "Which industries do you work with?", a: `${industries.map((x) => x.name).join(", ")}, and any team that runs on calls.` },
  { q: "Which languages can customers use?", a: "English and major Indian languages, switching mid-call if the customer does." },
  { q: "Are these real customers?", a: "Not yet. The teams, people and figures marked Sample are illustrative." },
  { q: "Can it hand a call to a person?", a: "Yes. It transfers the call to your team with a summary of what was said, inside your transfer hours." },
]

export function SolutionsPage() {
  return (
    <div style={ROOMY}>
      <Section id="solutions-industries" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy parent={null} crumb={c.crumb} title="Built for your industry." line="Six industries, the jobs a Hooman takes on in each, and one team's results." />
          <IndustryCards />
        </Container>
      </Section>

      <Everywhere id="solutions-everywhere" />
      <Faq id="solutions-faq" items={FAQ} />
      <TwoWayCta />
    </div>
  )
}
