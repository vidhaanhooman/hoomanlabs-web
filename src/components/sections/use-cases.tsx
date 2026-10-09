import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { findArt } from "@/components/layout/tile-backdrop"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { useCases } from "@/content/platform"

/**
 * What teams use agents for: large cards that play a call through to its
 * result. A gradient at public/art/gradients/<visual>.(webp|png|jpg) becomes
 * that card's stage background.
 */
export function UseCases() {
  return (
    <Section id="product-use-cases">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What teams put agents on.</h2>
          <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {useCases.map((u) => (
            <li key={u.title} className="flex">
              <UseCaseStory useCase={u} background={findArt("gradients", u.visual)} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
