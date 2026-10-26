"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useInView } from "motion/react"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { Panel } from "@/components/layout/panel"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type StoryItem = {
  slug: string
  href: string
  company: string
  /** The company's logo, rendered on the server. */
  logo: React.ReactNode
  value: string
  label: string
  quote?: string
  by?: string
  facts: [string, string][]
}

const CYCLE_MS = 7000

/**
 * The homepage customer stories as one panel: the customers' logos as tabs
 * along the top, and the chosen story below, its quote large on the left and
 * its result and facts on the right. Tabs step on their own while the panel
 * is in view (a line fills under the active one, as in the product panels);
 * hovering pauses, a click holds the choice.
 */
export function StorySwitcher({ items }: { items: StoryItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduce = usePrefersReducedMotion()
  const [shown, setShown] = useState(0)
  const [paused, setPaused] = useState(false)
  const [chosen, setChosen] = useState(false)
  const cycling = inView && !reduce && !chosen && items.length > 1

  useEffect(() => {
    if (!cycling || paused) return
    const t = setTimeout(() => setShown((i) => (i + 1) % items.length), CYCLE_MS)
    return () => clearTimeout(t)
  }, [cycling, paused, shown, items.length])

  const story = items[shown]
  if (!story) return null

  return (
    <Panel ref={ref} className="flex flex-col" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="Customer stories" className="grid border-b border-line" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((x, i) => {
          const on = i === shown
          return (
            <button
              key={x.slug}
              type="button"
              role="tab"
              aria-selected={on}
              aria-label={x.company}
              onClick={() => {
                setShown(i)
                setChosen(true)
              }}
              className={cn(
                "relative flex h-16 cursor-pointer items-center justify-center border-line px-4 transition-opacity duration-300 outline-none not-first:border-l focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                on ? "opacity-100" : "opacity-40 hover:opacity-70",
              )}
            >
              {x.logo}
              {on && (
                <span aria-hidden className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
                  <span
                    key={`${i}-${cycling && !paused}`}
                    className="block h-full origin-left bg-foreground"
                    style={cycling && !paused ? { animation: `progress ${CYCLE_MS}ms linear both` } : undefined}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div key={story.slug} role="tabpanel" className="story-fade grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.6fr_1fr] lg:gap-0 lg:p-10">
        <figure className="flex flex-col justify-between gap-8 lg:pr-12">
          {story.quote && <blockquote className="text-h3 leading-snug font-normal text-balance sm:text-h2 sm:leading-tight">“{story.quote}”</blockquote>}
          {story.by && <figcaption className="text-small text-ink-secondary">{story.by}</figcaption>}
        </figure>
        <div className="flex flex-col gap-6 border-line lg:border-l lg:pl-12">
          <div className="flex flex-col gap-1">
            <span className="text-display font-normal tabular-nums">{story.value}</span>
            <span className="text-small text-ink-secondary">{story.label}</span>
          </div>
          <dl className="flex flex-col">
            {story.facts.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 border-t border-line py-2.5 text-small">
                <dt className="text-ink-muted">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <Link href={story.href} className="group/link mt-auto inline-flex items-center gap-1 text-small">
            Read the {story.company} story
            <ArrowRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Panel>
  )
}
