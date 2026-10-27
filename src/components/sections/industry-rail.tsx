"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { DitherField, type Glow } from "@/components/sections/dither-field"
import { cn } from "@/lib/utils"

export type RailItem = { slug: string; name: string; line: string; tags: string[]; href: string }

/** The gradient running across the row (see DitherField's row mode). */
export type RailField = { colors: string[]; glows: Glow[]; className: string }

/**
 * The homepage industries as expanding strips: six tall strips side by side,
 * with one moving dither gradient running across them all, each named sideways. Hovering or focusing one widens it to show its
 * line, a button and its use cases while the others narrow; the first is open
 * to start. Below the desktop width they stack as full cards. Each strip links
 * to its industry page.
 */
export function IndustryRail({ title, line, items, field }: { title: string; line: string; items: RailItem[]; field: RailField }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="py-(--section-pad)">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>
        <ul data-dither-row className="mt-(--heading-gap,2.5rem) flex flex-col gap-(--card-gap,0.75rem) lg:h-[30rem] lg:flex-row">
          {items.map((it, i) => (
            <Strip key={it.slug} item={it} field={field} on={i === open} onOpen={() => setOpen(i)} />
          ))}
        </ul>
      </Container>
    </div>
  )
}

/** One industry strip: narrow with its name sideways when closed, the full card when open. */
function Strip({ item, field, on, onOpen }: { item: RailItem; field: RailField; on: boolean; onOpen: () => void }) {
  return (
    <li
      className={cn("relative min-w-0 transition-[flex-grow] duration-500 ease-(--ease-out) motion-reduce:transition-none lg:basis-0", on ? "lg:grow-[5]" : "lg:grow")}
      onMouseEnter={onOpen}
    >
      <Link
        href={item.href}
        aria-label={`${item.name}: ${item.line}`}
        onFocus={onOpen}
        className="group/rail relative isolate flex h-80 flex-col justify-end overflow-hidden rounded-lg border border-line bg-surface p-7 transition-colors outline-none hover:border-line-strong focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:h-full"
      >
        <DitherField color={field.colors[0]} colors={field.colors} glows={field.glows} row className={field.className} />

        {/* Closed (desktop only): the name, sideways, at the foot of the strip */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-7 left-1/2 hidden -translate-x-1/2 rotate-180 text-h4 whitespace-nowrap transition-opacity duration-300 [writing-mode:vertical-rl] lg:block",
            on ? "opacity-0" : "opacity-100",
          )}
        >
          {item.name}
        </span>

        {/* Open: the full card (always shown below desktop) */}
        <span
          className={cn(
            "flex w-[min(100%,24rem)] flex-col gap-4 transition-opacity duration-300 lg:w-[24rem]",
            on ? "opacity-100 lg:delay-200" : "lg:pointer-events-none lg:opacity-0",
          )}
        >
          <span className="text-h2 leading-tight font-normal">{item.name}</span>
          <span className="text-body text-ink-secondary">{item.line}</span>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-md bg-foreground/[0.06] px-4 py-2 text-small transition-colors group-hover/rail:bg-foreground/[0.1]">
            See {item.name}
            <ArrowRightIcon className="size-3.5 transition-transform group-hover/rail:translate-x-0.5" />
          </span>
          <span className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] text-ink-secondary">
                {t}
              </span>
            ))}
          </span>
        </span>
      </Link>
    </li>
  )
}
