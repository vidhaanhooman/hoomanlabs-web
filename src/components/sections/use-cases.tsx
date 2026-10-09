import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { useCases } from "@/content/platform"

/** Same painted colour textures as the Listen panel (sage, dusk blue, ochre, terracotta). */
const TEXTURE = {
  sage: { src: "/art/backdrops/home-deploy.png" },
  dusk: { src: "/art/backdrops/home-measure.png" },
  terracotta: { src: "/art/backdrops/home-deploy.png", filter: "hue-rotate(-75deg) saturate(1.15)" },
  ochre: { src: "/art/backdrops/home-deploy.png", filter: "hue-rotate(-40deg) saturate(1.2) brightness(1.05)" },
}

const BACKGROUND: Record<(typeof useCases)[number]["visual"], { src: string; filter?: string }> = {
  collections: TEXTURE.sage,
  booking: TEXTURE.dusk,
  leads: TEXTURE.ochre,
  support: TEXTURE.terracotta,
  renewals: TEXTURE.dusk,
  surveys: TEXTURE.sage,
}

/** What teams use agents for: one result per card on a painted texture; the call shows on hover. */
export function UseCases() {
  return (
    <Section id="product-use-cases">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What teams put agents on.</h2>
          <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <li key={u.title} className="flex">
              <UseCaseStory useCase={u} background={BACKGROUND[u.visual]} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
