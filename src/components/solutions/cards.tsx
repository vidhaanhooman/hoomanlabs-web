import Link from "next/link"
import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Halftone } from "@/components/layout/halftone"
import { pageHref } from "@/components/product-page/page-bits"
import { platformFeatured, platformMenu, type MenuPageId } from "@/content/platform"
import { industryBySlug, solutionHref, caseBySlug, type Industry, type UseCase } from "@/content/solutions"
import { cn } from "@/lib/utils"

/**
 * The Solutions cards, in the channel devices' tile style: a light dotted
 * Halftone tile (alternating graphite and light) holding a small mockup,
 * then the name, a line and tag chips. A use case shows the first two
 * turns of its call and the outcome; an industry shows its sample proof
 * figure. Plus the quiet link cards used for "what powers it" and "next".
 * Server-safe (no hooks), so client sections can use them too.
 */

/** Where the dots are densest, cycling by position (as on the channel tiles). */
const FOCUS = ["15% 15%", "85% 20%", "20% 85%", "85% 80%", "50% 10%", "10% 50%"]
export const tileFocus = (i: number) => FOCUS[i % FOCUS.length]
const graphite = (i: number) => i % 2 === 0

export function Tag({ children, quiet = false }: { children: React.ReactNode; quiet?: boolean }) {
  return (
    <span className={cn("rounded-full border px-2 py-px text-label", quiet ? "border-dashed border-line-strong text-ink-muted" : "border-line-strong text-ink-secondary")}>
      {children}
    </span>
  )
}

/** The tile itself: dotted, rounded, mockup sat at the bottom edge. */
export function Tile({ i, className, children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden className={cn("relative isolate flex h-56 items-end justify-center overflow-hidden rounded-md border border-line bg-surface px-5 pt-6", className)}>
      <Halftone focus={tileFocus(i)} />
      <div className={cn("flex w-full justify-center text-foreground", graphite(i) && "dark graphite")}>{children}</div>
    </div>
  )
}

/** Two turns of the call and its outcome, on a small light card. */
export function MiniCall({ useCase }: { useCase: UseCase }) {
  const { call } = useCase
  const turns = call.lines.slice(0, 2)
  return (
    <div className="flex w-full max-w-[17rem] flex-col gap-1.5 rounded-t-md border border-b-0 border-line-strong bg-background p-3 text-[11px] leading-snug shadow-sm">
      <span className="mb-0.5 flex items-center justify-between text-[10px] text-ink-muted">
        <span>
          {call.agent} · {call.company}
        </span>
        <span>{call.audio ? "Recording" : call.language}</span>
      </span>
      {turns.map((l) => (
        <span
          key={l.t}
          className={cn("line-clamp-2 max-w-[90%] rounded-md px-2 py-1", l.who === "agent" ? "self-start bg-surface" : "self-end bg-foreground text-background")}
        >
          {l.text}
        </span>
      ))}
      <span className="mt-1 mb-1 inline-flex items-center gap-1 self-start rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-secondary">
        <CheckCircleIcon weight="fill" className="size-3 shrink-0 text-success" />
        <span className="line-clamp-1">{call.outcome}</span>
      </span>
    </div>
  )
}

/** The industry's sample proof figure, on a small light card. */
function MiniProof({ industry }: { industry: Industry }) {
  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-1 rounded-t-md border border-b-0 border-line-strong bg-background px-4 pt-4 pb-5 shadow-sm">
      <span className="text-[10px] text-ink-muted">{industry.name}</span>
      <span className="text-h3 font-normal tabular-nums">{industry.proof.value}</span>
      <span className="text-[11px] text-ink-secondary">{industry.proof.label}</span>
      <span className="mt-1 self-start font-mono text-[10px] text-ink-muted">Sample</span>
    </div>
  )
}

/** A use case: call mockup, name, short line, result and the industries it serves. */
export function UseCaseCard({ useCase, i, line }: { useCase: UseCase; i: number; line?: string }) {
  return (
    <li className="flex">
      <Link href={solutionHref(useCase.slug)} className="group flex w-full flex-col gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none">
        <Tile i={i} className="transition-colors group-hover:border-line-strong">
          <MiniCall useCase={useCase} />
        </Tile>
        <span className="flex items-center justify-between gap-2">
          <h3 className="text-body font-normal">{useCase.name}</h3>
          <ArrowRightIcon aria-hidden className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="-mt-1 text-small text-ink-secondary">{line ?? useCase.short}</span>
        <span className="text-small">
          <span className="text-ink-muted">Result · </span>
          {useCase.result}
        </span>
        <span className="flex flex-wrap gap-1">
          {useCase.industries.map((s) => (
            <Tag key={s}>{industryBySlug(s)?.name ?? s}</Tag>
          ))}
        </span>
      </Link>
    </li>
  )
}

/** An industry: proof figure, name, short line (or how it uses one case) and its use cases. */
export function IndustryCard({ industry, i, line }: { industry: Industry; i: number; line?: string }) {
  return (
    <li className="flex">
      <Link href={solutionHref(industry.slug)} className="group flex w-full flex-col gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none">
        <Tile i={i} className="transition-colors group-hover:border-line-strong">
          <MiniProof industry={industry} />
        </Tile>
        <span className="flex items-center justify-between gap-2">
          <h3 className="text-body font-normal">{industry.name}</h3>
          <ArrowRightIcon aria-hidden className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="-mt-1 text-small text-ink-secondary">{line ?? industry.short}</span>
        <span className="flex flex-wrap gap-1">
          {industry.jobs.slice(0, 3).map((j) => (
            <Tag key={j.useCase}>{caseBySlug(j.useCase)?.name ?? j.useCase}</Tag>
          ))}
          {industry.jobs.length > 3 && <Tag quiet>+{industry.jobs.length - 3}</Tag>}
        </span>
      </Link>
    </li>
  )
}

/**
 * An industry with the use cases it relies on most (its `jobs`, in order),
 * as one full-width row: the name, line and proof tile on the left; on the
 * right, each job as a quiet card linking to the use case, with how it
 * plays out in this industry.
 */
export function IndustryRow({ industry, i }: { industry: Industry; i: number }) {
  return (
    <li className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16 lg:pt-10">
      <div className="flex min-w-0 flex-col">
        <Link href={solutionHref(industry.slug)} className="group inline-flex items-center gap-2 self-start rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          <h3 className="text-h3 font-normal">{industry.name}</h3>
          <ArrowRightIcon aria-hidden className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-2 max-w-[36ch] text-body text-ink-secondary">{industry.short}</p>
        <Tile i={i} className="mt-6 h-40">
          <MiniProof industry={industry} />
        </Tile>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <span className="font-mono text-label text-ink-muted">Most used</span>
        <ul className="grid gap-3 sm:grid-cols-2">
          {industry.jobs.map((j, k) => {
            const u = caseBySlug(j.useCase)
            if (!u) return null
            return (
              <li key={j.useCase} className="flex">
                <Link
                  href={solutionHref(u.slug)}
                  className="group flex w-full flex-col gap-1.5 rounded-md border border-line p-4 transition-colors hover:border-line-strong hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:p-5"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-baseline gap-2.5">
                      <span className="font-mono text-label text-ink-muted tabular-nums">{String(k + 1).padStart(2, "0")}</span>
                      <span className="text-body">{u.name}</span>
                    </span>
                    <ArrowRightIcon aria-hidden className="size-3.5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-small text-ink-secondary">{j.how}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

/** A quiet link card (as NextStep's): a small label, the name and a line. */
export function LinkCard({ href, label, name, line }: { href: string; label: string; name: string; line: string }) {
  return (
    <li className="flex">
      <Link href={href} className="group flex w-full items-center justify-between gap-6 rounded-md bg-surface p-6 transition-colors hover:bg-placeholder sm:p-7">
        <span className="flex flex-col gap-1">
          <span className="text-small text-ink-muted">{label}</span>
          <span className="text-h4 font-normal">{name}</span>
          <span className="text-small text-ink-secondary">{line}</span>
        </span>
        <ArrowRightIcon aria-hidden className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  )
}

const menuPage = (id: MenuPageId) => [...platformMenu.flatMap((g) => g.pages), platformFeatured].find((p) => p.id === id)

/** Link cards to the platform pages behind a use case, named and described as in the menu. */
export function PoweredCards({ ids }: { ids: MenuPageId[] }) {
  return (
    <ul className={cn("grid gap-3", ids.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2")}>
      {ids.map((id) => {
        const p = menuPage(id)
        return p ? <LinkCard key={id} href={pageHref(id)} label="Platform" name={p.name} line={p.blurb} /> : null
      })}
    </ul>
  )
}

/** The next `n` items after `slug`, wrapping round, for "next" cards. */
export function nextAfter<T extends { slug: string }>(list: T[], slug: string, n = 2) {
  const at = list.findIndex((x) => x.slug === slug)
  return Array.from({ length: Math.min(n, list.length - 1) }, (_, k) => list[(at + 1 + k) % list.length])
}
