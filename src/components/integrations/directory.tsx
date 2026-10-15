"use client"

import { useState } from "react"
import { PlusIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { integrationsPage as c } from "@/content/pages/integrations"
import { cn } from "@/lib/utils"

/**
 * The integrations directory, in the shape most SaaS integration pages use
 * (Linear, Slack, Vercel), kept minimal: category chips over a grid of
 * quiet cards, each a tile, the name, one line on what the Hooman does with
 * it, and the category (plus a note only when it isn't built in: Workflow,
 * Via API, Coming soon). The last card is the way in for everything else.
 * Letter tiles stand in until logo files are supplied; the list itself is a
 * placeholder (see the content file).
 */

const DOCS = "https://docs.hoomanlabs.com"

type Item = (typeof c.directory.items)[number]

function Card({ item }: { item: Item }) {
  const note = item.status === "Native" ? null : item.status
  return (
    <li className="flex items-start gap-3.5 rounded-xl border border-line p-5 transition-colors hover:border-line-strong">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-small text-ink-secondary">
        {item.name.startsWith("Your ") ? item.name.split(" ")[1][0].toUpperCase() : item.name[0]}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-body">{item.name}</span>
        <span className="text-small text-ink-secondary">{item.does}</span>
        <span className="pt-1 text-label text-ink-muted">
          {item.category}
          {note && ` · ${note}`}
        </span>
        {"href" in item && item.href && (
          <span className="pt-1">
            <TextLink href={item.href}>{item.cta}</TextLink>
          </span>
        )}
      </span>
    </li>
  )
}

export function Directory() {
  const { label, title, line, categories, items, more } = c.directory
  const [cat, setCat] = useState<string>("All")
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat)

  return (
    <Section id="integrations-directory">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <span className="font-mono text-label text-ink-muted">{label}</span>
            <h2 className="text-h2 font-normal">{title}</h2>
            <p className="text-body text-ink-secondary">{line}</p>
          </div>
          <span className="shrink-0 text-small text-ink-muted tabular-nums">{items.length} integrations, and any API</span>
        </div>

        {/* Categories */}
        <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
          {categories.map((k) => {
            const on = cat === k
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(k)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-small transition-colors",
                  on ? "border-foreground bg-foreground text-background" : "border-line text-ink-secondary hover:border-line-strong hover:text-foreground"
                )}
              >
                {k}
              </button>
            )
          })}
        </div>

        {/* The grid */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => (
            <Card key={i.id} item={i} />
          ))}
          <li className="flex items-start gap-3.5 rounded-xl border border-dashed border-line-strong p-5">
            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg border border-dashed border-line-strong text-ink-muted">
              <PlusIcon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-body">{more.title}</span>
              <span className="text-small text-ink-secondary">{more.body}</span>
              <span className="pt-1">
                <TextLink href={DOCS}>{more.link}</TextLink>
              </span>
            </span>
          </li>
        </ul>
      </Container>
    </Section>
  )
}
