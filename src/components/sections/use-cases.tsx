import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { useCases } from "@/content/platform"

/** What teams use agents for: one result per card on a plain surface; the call shows on hover. */
export function UseCases({
  more,
  only,
  resultFirst = false,
}: {
  more?: { label: string; href: string }
  /** Show just these use cases (by visual id), in this order. */
  only?: (typeof useCases)[number]["visual"][]
  resultFirst?: boolean
} = {}) {
  const list = only ? only.map((v) => useCases.find((u) => u.visual === v)!).filter(Boolean) : useCases
  return (
    <Section id="product-use-cases">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What teams put agents on.</h2>
          <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((u, i) => (
            <li key={u.title} className="flex">
              {/* Checkerboard: dark and light alternate, so no two dark cards touch. */}
              <UseCaseStory
                useCase={u}
                resultFirst={resultFirst}
                tone={((i % 3) + Math.floor(i / 3)) % 2 === 0 ? "charcoal" : "light"}
              />
            </li>
          ))}
        </ul>
        {more && (
          <TextLink href={more.href} className="mt-8">
            {more.label}
          </TextLink>
        )}
      </Container>
    </Section>
  )
}
