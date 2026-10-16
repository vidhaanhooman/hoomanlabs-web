"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@phosphor-icons/react"

import { MeshStage } from "@/components/layout/art-stage"
import { FROSTED, HERO_CARD } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { caseBySlug, industries, solutionHref, type Industry } from "@/content/solutions"
import { cn } from "@/lib/utils"

/**
 * Industries on /solutions as one big horizontal scroll. Each industry is a
 * wide panel on its own photo backdrop: the industry and its promise on the
 * left, and on the right a live use-case card. The use cases it relies on
 * most sit on the photo as frosted tabs; picking one swaps the card and
 * replays its call line by line. Move with swipe or trackpad (snap), the
 * arrow buttons, the dots or the arrow keys. A panel's call plays when the
 * panel comes into view. Reduced motion: calls show in full, no smooth
 * scrolling. Backdrops are placeholders (the product landscapes) until a
 * photo per industry exists.
 */

function UseCaseCard({ ind, job, playing }: { ind: Industry; job: number; playing: boolean }) {
  const reduce = usePrefersReducedMotion()
  const j = ind.jobs[job]
  const u = caseBySlug(j.useCase)
  const lines = (u?.call.lines ?? []).slice(0, 4)
  const [shown, setShown] = useState(0)

  // Play the call once the panel is in view (the card is remounted, so it
  // replays, each time its panel or tab becomes active).
  useEffect(() => {
    if (!playing || reduce) return
    let n = 0
    const id = setInterval(() => {
      n += 1
      setShown(n)
      if (n > lines.length) clearInterval(id)
    }, 900)
    return () => clearInterval(id)
  }, [playing, job, reduce, lines.length])

  if (!u) return null
  const seen = reduce ? lines.length + 1 : shown
  const done = seen > lines.length
  return (
    <div className={cn(HERO_CARD, "flex w-full flex-col")}>
      <div className="flex items-center justify-between gap-3 border-b border-(--ui-line) px-5 py-3.5">
        <span className="flex flex-col leading-tight">
          <span className="text-[15px]">{u.name}</span>
          <span className="text-[12px] text-(--ui-muted)">{j.how}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[11.5px]">
          <span className={cn("size-1.5 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live) motion-safe:animate-pulse")} />
          {done ? "Call ended" : "Live call"}
        </span>
      </div>
      <div className="flex min-h-[13.5rem] flex-col gap-2 px-5 py-4">
        {lines.map((l, i) => (
          <span
            key={i}
            className={cn(
              "max-w-[85%] rounded-2xl px-3.5 py-2 text-[12.5px] leading-snug transition-[opacity,translate] duration-500",
              l.who === "caller" ? "self-end rounded-br-sm bg-white text-black" : "self-start rounded-bl-sm bg-(--ui-raised)",
              i < seen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            )}
          >
            {l.translation ?? l.text}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-(--ui-line) px-5 py-3 text-[12px]">
        <span className={cn("flex items-center gap-1.5 transition-opacity duration-500", done ? "opacity-100" : "opacity-0")}>
          <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
          {u.call.outcome}
        </span>
        <Link href={solutionHref(u.slug)} className="shrink-0 text-(--ui-muted) hover:text-(--ui-text) hover:underline">
          {u.call.audio ? "Hear the recording" : "See the use case"} →
        </Link>
      </div>
    </div>
  )
}

function Panel({ ind, active }: { ind: Industry; active: boolean }) {
  const [job, setJob] = useState(0)
  const jobs = ind.jobs.slice(0, 3)
  return (
    <MeshStage image={ind.image} className="grid w-full gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_minmax(0,27rem)] lg:items-center lg:gap-12">
      {/* The industry, on the photo */}
      <div className="flex flex-col gap-5 text-white [text-shadow:0_1px_18px_oklch(0.15_0.02_40/0.6)]">
        <span className="font-mono text-[11px] tracking-wide text-white/80 uppercase">{ind.name}</span>
        <h3 className="max-w-[24rem] text-[28px] leading-tight font-normal sm:text-[34px]">{ind.title}</h3>
        <p className="max-w-[24rem] text-[15px] leading-relaxed text-white/85">{ind.line}</p>
        <div className="flex items-end gap-3">
          <span className="text-[40px] leading-none tabular-nums">{ind.proof.value}</span>
          <span className="pb-1 text-[13px] text-white/85">
            {ind.proof.label}
            <span className="block text-[11px] text-white/60">Sample figure</span>
          </span>
        </div>
        <Link
          href={solutionHref(ind.slug)}
          tabIndex={active ? 0 : -1}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] text-black [text-shadow:none] hover:bg-white/90"
        >
          Explore {ind.name.toLowerCase()}
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>

      {/* The use cases it relies on most, and one at work */}
      <div className="flex min-w-0 flex-col gap-3">
        <div role="tablist" aria-label={`${ind.name} use cases`} className="flex flex-wrap gap-2">
          {jobs.map((j, i) => {
            const u = caseBySlug(j.useCase)
            if (!u) return null
            const on = i === job
            return (
              <button
                key={j.useCase}
                role="tab"
                type="button"
                aria-selected={on}
                tabIndex={active ? 0 : -1}
                onClick={() => setJob(i)}
                className={cn(FROSTED, "rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors", on ? "border-white/60 bg-black/70" : "text-white/80 hover:text-white")}
              >
                {u.name}
              </button>
            )
          })}
        </div>
        <UseCaseCard key={`${ind.slug}-${job}-${active}`} ind={ind} job={job} playing={active} />
      </div>
    </MeshStage>
  )
}

export function IndustryCarousel() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduce = usePrefersReducedMotion()

  // The panel nearest the centre of the track is the active one.
  useEffect(() => {
    const el = track.current
    if (!el) return
    // Five panels: cheap enough to measure on every scroll event.
    const update = () => {
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let dist = Infinity
      el.querySelectorAll<HTMLElement>("[data-i]").forEach((c) => {
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid)
        if (d < dist) {
          dist = d
          best = Number(c.dataset.i)
        }
      })
      setActive(best)
    }
    el.addEventListener("scroll", update, { passive: true })
    return () => el.removeEventListener("scroll", update)
  }, [])

  const go = (i: number) => {
    const el = track.current
    const n = Math.max(0, Math.min(industries.length - 1, i))
    const card = el?.querySelector<HTMLElement>(`[data-i="${n}"]`)
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <div className="mt-10">
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Industries"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault()
            go(active + 1)
          } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            go(active - 1)
          }
        }}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-px-(--gutter) px-[max(var(--gutter),calc((100vw-81.25rem)/2+var(--gutter)))] pb-2 outline-none [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((ind, i) => (
          <div
            key={ind.slug}
            data-i={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${industries.length}: ${ind.name}`}
            className={cn("flex w-[min(76rem,calc(100vw-2*var(--gutter)))] shrink-0 snap-center transition-opacity duration-500 lg:h-[36rem]", i === active ? "opacity-100" : "opacity-60")}
          >
            <Panel ind={ind} active={i === active} />
          </div>
        ))}
      </div>

      {/* Where you are */}
      <div className="mx-auto mt-6 flex max-w-(--container-page) items-center justify-between gap-4 px-(--gutter)">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {industries.map((ind, i) => (
            <button
              key={ind.slug}
              type="button"
              onClick={() => go(i)}
              aria-current={i === active}
              className={cn("flex items-center gap-2 text-small transition-colors", i === active ? "text-foreground" : "text-ink-muted hover:text-foreground")}
            >
              <span className={cn("h-0.5 rounded-full transition-[width,background-color] duration-300", i === active ? "w-6 bg-foreground" : "w-3 bg-line-strong")} />
              {ind.name}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous industry" className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors hover:bg-surface disabled:opacity-40">
            <ArrowLeftIcon className="size-4" />
          </button>
          <button type="button" onClick={() => go(active + 1)} disabled={active === industries.length - 1} aria-label="Next industry" className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors hover:bg-surface disabled:opacity-40">
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
