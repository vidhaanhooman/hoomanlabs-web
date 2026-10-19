import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { ctas, finalCta } from "@/content/draft"

/** Closing ask (homepage, Solutions): one CTA, Book a demo. */
export function TwoWayCta() {
  return (
    <Section id="cta" spacing="none" className="pt-(--section-pad) pb-(--section-gap)">
      <Container id="book-demo" className="flex scroll-mt-24 flex-col items-center gap-8 text-center">
        <SectionHeader title={finalCta.title} align="center" />
        <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
          {ctas.demo.label}
        </Link>
      </Container>
    </Section>
  )
}
