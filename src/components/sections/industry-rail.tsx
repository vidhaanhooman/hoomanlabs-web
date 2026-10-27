"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

export type RailItem = { slug: string; name: string; line: string; tags: string[]; href: string; src: string }

/**
 * The homepage industries as expanding strips: six tall photo strips side by
 * side, each named sideways. Hovering or focusing one widens it to show its
 * line, a button and its use cases while the others narrow; the first is open
 * to start. Below the desktop width they stack as full cards. Each strip links
 * to its industry page.
 */
export function IndustryRail({ title, line, items }: { title: string; line: string; items: RailItem[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="py-(--section-pad)">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>
        <ul className="mt-(--heading-gap,2.5rem) flex flex-col gap-(--card-gap,0.75rem) lg:h-[30rem] lg:flex-row">
          {items.map((it, i) => (
            <Strip key={it.slug} item={it} on={i === open} onOpen={() => setOpen(i)} />
          ))}
        </ul>
      </Container>
    </div>
  )
}

/** One industry strip: narrow with its name sideways when closed, the full card when open. */
function Strip({ item, on, onOpen }: { item: RailItem; on: boolean; onOpen: () => void }) {
  return (
    <li
      className={cn("relative min-w-0 transition-[flex-grow] duration-500 ease-(--ease-out) motion-reduce:transition-none lg:basis-0", on ? "lg:grow-[5]" : "lg:grow")}
      onMouseEnter={onOpen}
    >
      <Link
        href={item.href}
        aria-label={`${item.name}: ${item.line}`}
        onFocus={onOpen}
        className="group/rail relative isolate flex h-80 flex-col justify-end overflow-hidden rounded-lg p-7 text-white outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:h-full"
      >
        <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover [filter:brightness(0.85)_saturate(0.9)]" />
        {/* Darkened well: most at the left and the bottom, where the words sit */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.1_0_0/0.9),oklch(0.1_0_0/0.72)_55%,oklch(0.1_0_0/0.55)),linear-gradient(to_top,oklch(0.1_0_0/0.45),transparent_60%)]"
        />

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
          <span className="text-body text-white/80">{item.line}</span>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-md bg-white/12 px-4 py-2 text-small backdrop-blur-sm transition-colors group-hover/rail:bg-white/20">
            See {item.name}
            <ArrowRightIcon className="size-3.5 transition-transform group-hover/rail:translate-x-0.5" />
          </span>
          <span className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="rounded-sm border border-white/25 px-2 py-0.5 font-mono text-[11px] text-white/80">
                {t}
              </span>
            ))}
          </span>
        </span>
      </Link>
    </li>
  )
}
