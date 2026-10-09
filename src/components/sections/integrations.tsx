import { Container } from "@/components/layout/container"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { integrations } from "@/content/voice-ai-lab"

/** Integration groups. Logo slots stay placeholders until confirmed. */
export function Integrations() {
  return (
    <Section id="product-integrations">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{integrations.headline}</h2>
          <p className="text-body text-ink-secondary">{integrations.body}</p>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.groups.map((g) => (
            <div key={g.label} className="flex flex-col gap-3 border-t border-line pt-4">
              <h3 className="text-small font-medium">{g.label}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {"items" in g && g.items
                  ? g.items.map((x) => (
                      <li
                        key={x}
                        className="flex h-12 items-center justify-center rounded-md border border-line px-2 text-center text-small"
                      >
                        {x}
                      </li>
                    ))
                  : Array.from({ length: g.count ?? 0 }, (_, i) => (
                      <li key={i}>
                        <Placeholder label="Logo" className="h-12" />
                      </li>
                    ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
