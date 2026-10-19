import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { ctas, finalCta } from "@/content/draft"
import type { SectionId } from "@/content/sections"

/** Closing ask: one CTA, Book a demo (same label as nav and hero). */
export function FinalCta({
  id = "cta",
  title = finalCta.title,
}: {
  id?: SectionId
  title?: string
}) {
  return (
    <Section id={id} spacing="none" className="pt-(--section-pad) pb-(--section-gap)">
      <Container id="book-demo" className="scroll-mt-24 flex flex-col items-center gap-8 text-center">
        <SectionHeader title={title} align="center" />
        <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
          {ctas.demo.label}
        </Link>
      </Container>
    </Section>
  )
}
