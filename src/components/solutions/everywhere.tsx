import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { pageHref } from "@/components/product-page/page-bits"
import { SplitHeader } from "@/components/solutions/bits"
import { everywhere } from "@/content/industries"
import type { SectionId } from "@/content/sections"

/**
 * One strip, shared by the hub and every industry page: what works the same
 * in every industry, as four equal link cards, each to the platform page
 * that covers it.
 */
export function Everywhere({ id }: { id: SectionId }) {
  return (
    <Section id={id}>
      <Container>
        <SplitHeader title="The same platform underneath." line="Whatever the industry, every Hooman gets the same languages, systems, handoff and security." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {everywhere.map((e) => (
            <li key={e.title} className="flex">
              <Link
                href={pageHref(e.page)}
                className="group flex w-full flex-col justify-between gap-10 rounded-md bg-surface p-6 transition-colors outline-none hover:bg-placeholder focus-visible:ring-2 focus-visible:ring-ring sm:p-7"
              >
                <ArrowRightIcon aria-hidden className="size-4 self-end text-ink-muted transition-transform group-hover:translate-x-0.5" />
                <span className="flex flex-col gap-1.5">
                  <span className="text-h4 font-normal">{e.title}</span>
                  <span className="text-small text-ink-secondary">{e.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
