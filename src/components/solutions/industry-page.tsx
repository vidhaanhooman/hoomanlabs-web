import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { LinkCard, nextAfter } from "@/components/solutions/cards"
import { IndustryCalls } from "@/components/solutions/industry-calls"
import { SolutionStory } from "@/components/solutions/story"
import { industries, solutionHref, type Industry } from "@/content/solutions"

/**
 * /solutions/[industry]: the hero (copy, sample proof chip, a call player)
 * and the jobs it hands to a Hooman (each playable in the hero), a day-by-
 * day story, the systems it connects to and the rules it keeps, FAQ, two
 * other industries and the two-way close.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function IndustryPage({ industry: ind }: { industry: Industry }) {
  return (
    <div style={ROOMY}>
      <IndustryCalls slug={ind.slug} />

      <SolutionStory industry={ind} />

      <Section id="solution-systems">
        <Container className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-h2 font-normal">Works with your systems.</h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {ind.systems.map((s) => (
              <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-small text-ink-secondary">
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="solution-compliance">
        <Container className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-h2 font-normal">Inside your rules.</h2>
          <ul className="grid gap-8 sm:grid-cols-2 sm:gap-6">
            {ind.compliance.map((c) => (
              <li key={c.title} className="flex flex-col gap-2">
                <h3 className="text-h4 font-normal">{c.title}</h3>
                <p className="text-body text-ink-secondary">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Faq id="solution-faq" items={ind.faq} />

      <Section id="solution-next" spacing="tight">
        <Container>
          <ul className="grid gap-3 md:grid-cols-2">
            {nextAfter(industries, ind.slug).map((x) => (
              <LinkCard key={x.slug} href={solutionHref(x.slug)} label="Another industry" name={x.name} line={x.short} />
            ))}
          </ul>
        </Container>
      </Section>

      <TwoWayCta />
    </div>
  )
}
