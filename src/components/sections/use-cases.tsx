import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { UseCaseTile, type UseCaseVisual } from "@/components/sections/use-case-visuals"
import { useCases } from "@/content/platform"

/** What teams use agents for: the result the agent produced, the job, and what it drives. */
export function UseCases() {
  return (
    <Section id="product-use-cases">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What teams put agents on.</h2>
          <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <li key={u.title} className="flex flex-col gap-2">
              <UseCaseTile kind={u.image as UseCaseVisual} />
              <h3 className="mt-3 text-body font-medium">{u.title}</h3>
              <p className="text-small text-ink-secondary">{u.body}</p>
              <p className="mt-auto pt-1 font-mono text-label text-ink-muted">→ {u.result}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
