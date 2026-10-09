import { Container } from "@/components/layout/container"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { pad, StageHeader } from "@/components/sections/product-stage-list"
import { tools } from "@/content/platform"

/** Tools & Integrations: numbered items, then integration groups (logo slots stay placeholders). */
export function ToolsIntegrations({ start, productName }: { start: number; productName: string }) {
  const end = start + tools.items.length - 1
  return (
    <Section id="product-tools" className="scroll-mt-32 lg:scroll-mt-16">
      <Container>
        <StageHeader
          productName={productName}
          label={tools.label}
          range={`${pad(start)}–${pad(end)}`}
          headline={tools.headline}
          body={tools.body}
        />

        <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {tools.items.map((it, i) => (
            <li key={it.title} className="flex flex-col gap-2 border-t border-line pt-4">
              <span className="font-mono text-label text-ink-muted tabular-nums">{pad(start + i)}</span>
              <h3 className="text-body font-medium">{it.title}</h3>
              <p className="max-w-[48ch] text-small text-ink-secondary">{it.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.groups.map((g) => (
            <div key={g.label} className="flex flex-col gap-3">
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
