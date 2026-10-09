import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { KnowledgeScreen } from "@/components/product/knowledge-screen"
import { ToolsScreen } from "@/components/product/tools-screen"
import { VoicesScreen } from "@/components/product/voices-screen"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { TextLink } from "@/components/layout/text-link"
import { platform } from "@/content/draft"

/**
 * Three capabilities as an asymmetric bento (one tall lead cell, two stacked),
 * not three equal cards. Exactly three cells for three items.
 */
export function Platform({ title = platform.title, more }: { title?: string; more?: { label: string; href: string } } = {}) {
  const [lead, ...rest] = platform.items
  return (
    <Section id="platform">
      <Container>
        <SectionHeader title={title} />
        <div className="mt-12 grid gap-3 lg:grid-cols-12 lg:grid-rows-2">
          <Panel className="flex flex-col gap-6 p-4 sm:p-6 lg:col-span-7 lg:row-span-2 lg:p-8">
            <h3 className="text-h3 font-normal">
              {lead.title}
              <span className="block text-ink-secondary">{lead.body}</span>
            </h3>
            <KnowledgeScreen className="mt-auto aspect-[4/3] rounded-md border border-black/10 lg:aspect-auto lg:min-h-96 lg:flex-1" />
          </Panel>
          {rest.map((item, i) => (
            <Panel key={item.title} className="grid gap-6 p-4 sm:grid-cols-2 sm:items-end sm:p-6 lg:col-span-5">
              <h3 className="text-h4 font-normal">
                {item.title}
                <span className="block text-ink-secondary">{item.body}</span>
              </h3>
              {i === 0 ? (
                <VoicesScreen className="rounded-md border border-black/10 sm:aspect-square" />
              ) : (
                <ToolsScreen className="rounded-md border border-black/10 sm:aspect-square" />
              )}
            </Panel>
          ))}
        </div>
        {more && (
          <TextLink href={more.href} className="mt-8">
            {more.label}
          </TextLink>
        )}
      </Container>
    </Section>
  )
}
