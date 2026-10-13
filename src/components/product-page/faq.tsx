"use client"

import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ctas } from "@/content/draft"
import type { SectionId } from "@/content/sections"

/** Questions and answers (good for search), heading pinned beside them. */
export function Faq({ id, title = "Questions, answered.", items }: { id: SectionId; title?: string; items: { q: string; a: string }[] }) {
  return (
    <Section id={id}>
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        <div className="flex flex-col gap-3 lg:sticky lg:top-28">
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">
            Can&apos;t find what you need?{" "}
            <Link data-demo href={ctas.demo.href} className="text-foreground underline underline-offset-4">
              Talk to our team
            </Link>
            .
          </p>
        </div>
        <Accordion className="border-y border-line">
          {items.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-line">
              <AccordionTrigger className="items-center gap-4 rounded-none py-4 text-body font-normal hover:no-underline focus-visible:ring-0">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-5 text-small text-ink-secondary">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}
