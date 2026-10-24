import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ctas, finalCta } from "@/content/draft"
import type { SectionId } from "@/content/sections"

/**
 * Closing ask, just above the footer: one large centred line and one
 * button (Book a demo, same label as nav and hero), on the page itself with
 * no card, set large in italic with generous room above.
 */
export function FinalCta({
  id = "cta",
  title = finalCta.title,
}: {
  id?: SectionId
  title?: string
}) {
  return (
    <Section id={id} spacing="none" className="pt-28 pb-28 md:pt-40 md:pb-36">
      <Container id="book-demo" className="flex scroll-mt-24 flex-col items-center gap-6 text-center">
        <h2 className="max-w-[20ch] text-[clamp(3rem,1.5rem+5vw,6rem)] leading-[1.04] font-normal tracking-[-0.03em] italic text-balance">{title}</h2>
        <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
          {ctas.demo.label}
        </Link>
      </Container>
    </Section>
  )
}
