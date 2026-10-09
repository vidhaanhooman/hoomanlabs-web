import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { useCases } from "@/content/platform"

/** What teams use agents for: tiles like the platform overview (painted frame + result card); the call shows on hover. */
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
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">What teams put agents on.</h2>
            <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
          </div>
          {more && <TextLink href={more.href}>{more.label}</TextLink>}
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((u) => (
            <li key={u.title} className="flex">
<UseCaseStory useCase={u} resultFirst={resultFirst} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
