import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { UseCaseCard } from "@/components/solutions/cards"
import { IndustryCarousel } from "@/components/solutions/industry-carousel"
import { SolutionsHero } from "@/components/solutions/hub-hero"
import { useCases } from "@/content/solutions"

/**
 * /solutions, in the product pages' roomy language: one hero (the copy, two
 * ways in, and the use cases as frosted pills over one call player, opening
 * on the real survey recording), then the use cases (dotted tiles) and, in
 * their own section, the industries as one big horizontal scroll (each on
 * its own photo, with its top use cases as tabs and a live call card), all linking to /solutions/[slug]. A short FAQ and the two-way
 * close. Everything comes from content/solutions.ts (placeholder content,
 * sample figures marked as such).
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

/** Hub questions, answered only from what the solutions data already says. */
const FAQ = [
  { q: "Which jobs can a Hooman do?", a: `${useCases.map((u) => u.name).join(", ")}. Each use case page shows how it works, step by step.` },
  { q: "Which languages can customers use?", a: "English and major Indian languages, switching mid-call if the customer does." },
  { q: "Are these real calls and results?", a: "The survey call is a real recording. The other calls are transcript previews, and every figure marked Sample is illustrative." },
]

export function SolutionsPage() {
  return (
    <div style={ROOMY}>
      <SolutionsHero />

      <Section id="solutions-browse" className="scroll-mt-20">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <span className="font-mono text-label text-ink-muted">Use cases</span>
            <h2 className="text-h2 font-normal">Start from the job.</h2>
            <p className="text-body text-ink-secondary">Each one ends in a result you can count, and lists the industries it serves.</p>
          </div>
          <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <UseCaseCard key={u.slug} useCase={u} i={i} />
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="solutions-industries" className="scroll-mt-20">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <span className="font-mono text-label text-ink-muted">Industries</span>
            <h2 className="text-h2 font-normal">Or from your industry.</h2>
            <p className="text-body text-ink-secondary">Scroll through, then pick a use case to watch the call it handles.</p>
          </div>
        </Container>
        <IndustryCarousel />
      </Section>

      <Faq id="solutions-faq" items={FAQ} />
      <TwoWayCta />
    </div>
  )
}
