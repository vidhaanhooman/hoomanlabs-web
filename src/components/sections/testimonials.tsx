import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { testimonials } from "@/content/draft"

/** Centred title over a 3x2 quote grid (Cursor). Quotes max 3 lines. */
export function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeader title={testimonials.title} align="center" />
        {/* < 768px: swipeable row (bleeds to the screen edge). md+: 2/3-col grid. */}
        <ul className="-mx-(--gutter) mt-12 flex snap-x snap-mandatory scroll-px-(--gutter) gap-3 overflow-x-auto px-(--gutter) pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {Array.from({ length: testimonials.count }, (_, i) => (
            <li key={i} className="w-[85%] shrink-0 snap-start md:w-auto">
              <Panel className="h-full p-6">
                <figure className="flex h-full flex-col justify-between gap-10">
                <blockquote className="text-body text-ink-secondary">
                  Customer quote {i + 1}. One to three lines about a real result after launching
                  agents with HoomanLabs.
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Placeholder label="" className="size-9 shrink-0 rounded-full" />
                  <span className="flex flex-col">
                    <span className="text-small font-medium">Name</span>
                    <span className="text-small text-ink-muted">Role, Company</span>
                  </span>
                </figcaption>
                </figure>
              </Panel>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
