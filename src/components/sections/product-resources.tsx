"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ProductResources as Resources } from "@/content/products"

function LinkList({ title, links, all, allLabel }: { title: string; links: Resources["guides"]; all: string; allLabel: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-h4 font-medium">{title}</h3>
      <ul className="flex flex-col border-t border-line">
        {links.map((l) => (
          <li key={l.label} className="border-b border-line">
            <Link
              href={l.href}
              className="group/res flex items-center justify-between gap-4 py-3 text-body text-ink-secondary transition-colors duration-150 hover:text-foreground"
            >
              {l.label}
              <ArrowRightIcon
                aria-hidden
                className="size-4 shrink-0 text-ink-muted transition-transform duration-150 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/res:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
      <TextLink href={all}>{allLabel}</TextLink>
    </div>
  )
}

/** FAQs answered inline (one open at a time). */
function FaqList({ faqs, all }: { faqs: Resources["faqs"]; all: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-h4 font-medium">FAQs</h3>
      <Accordion className="border-y border-line">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-line">
            <AccordionTrigger className="items-center gap-4 rounded-none py-3 text-body font-normal text-ink-secondary hover:text-foreground hover:no-underline aria-expanded:text-foreground focus-visible:ring-0">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="max-w-[56ch] pb-4 text-small text-ink-secondary">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <TextLink href={all}>All FAQs</TextLink>
    </div>
  )
}

/** Bottom of a product page: FAQs (accordion) and links to explanations. */
export function ProductResources({ resources }: { resources: Resources }) {
  return (
    <Section id="product-resources">
      <Container>
        <h2 className="text-h2 font-normal">Questions and guides</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10">
          <FaqList faqs={resources.faqs} all={resources.allFaqs} />
          <LinkList title="Explained" links={resources.guides} all={resources.allGuides} allLabel="Read the docs" />
        </div>
      </Container>
    </Section>
  )
}
