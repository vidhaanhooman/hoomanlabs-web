import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Panel } from "@/components/layout/panel"
import { IndustryArt } from "@/components/solutions/industry-art"
import { caseHref, caseBySlug, industries, solutionHref, type Industry } from "@/content/solutions"
import { cn } from "@/lib/utils"

/**
 * Industries on /solutions as large cards, two to a row, in the homepage
 * platform cards' style (grey panel, light inset): a boxy illustration of
 * the industry's objects (industry-art.tsx), its promise and sample proof figure, its top three use cases
 * (each linking to its page) and a link to the industry page. The last card
 * of an odd count spans the row, illustration beside the copy.
 */

function Art({ ind, wide }: { ind: Industry; wide: boolean }) {
  return (
    <div className={cn("h-48 overflow-hidden rounded-md bg-background p-4 sm:h-52 sm:p-5", wide && "lg:h-full lg:min-h-52 lg:p-10")}>
      <IndustryArt slug={ind.slug} className="size-full" />
    </div>
  )
}

function Card({ ind, wide }: { ind: Industry; wide: boolean }) {
  return (
    <Panel className={cn("group/ind grid w-full gap-6 p-4 sm:p-5", wide && "lg:grid-cols-2 lg:gap-10")}>
      <Art ind={ind} wide={wide} />
      <div className={cn("flex flex-col gap-6 px-2 pb-3 sm:px-3", wide && "lg:py-4")}>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-label text-ink-muted">{ind.name}</span>
          <h3 className="text-h3 font-normal">{ind.title}</h3>
          <p className="text-body text-ink-secondary">{ind.short}</p>
        </div>
        <span className="flex items-baseline gap-2">
          <span className="text-h2 leading-none font-normal tabular-nums">{ind.proof.value}</span>
          <span className="text-small text-ink-secondary">{ind.proof.label}</span>
          <span className="font-mono text-label text-ink-muted">Sample</span>
        </span>
        <div className="flex flex-col overflow-hidden rounded-md border border-line bg-background text-small">
          <span className="border-b border-line px-3.5 py-2 text-label text-ink-muted">Top use cases</span>
          {ind.jobs.slice(0, 3).map((j) => {
            const u = caseBySlug(j.useCase)
            if (!u) return null
            return (
              <Link
                key={j.useCase}
                href={caseHref(u.slug)}
                className="group flex items-center justify-between gap-3 border-b border-line px-3.5 py-3 transition-colors last:border-0 hover:bg-surface"
              >
                <span className="flex min-w-0 flex-col gap-0.5 leading-tight">
                  <span>{u.name}</span>
                  <span className="text-label text-ink-muted">{j.how}</span>
                </span>
                <ArrowRightIcon className="size-3.5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            )
          })}
        </div>
        <Link href={solutionHref(ind.slug)} className="group mt-auto inline-flex w-fit items-center gap-1.5 text-small font-medium">
          Explore {ind.name}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Panel>
  )
}

export function IndustryCards() {
  const odd = industries.length % 2 === 1
  return (
    <ul className="mt-10 grid gap-3 lg:grid-cols-2">
      {industries.map((ind, i) => {
        const wide = odd && i === industries.length - 1
        return (
          <li key={ind.slug} className={cn("flex min-w-0", wide && "lg:col-span-2")}>
            <Card ind={ind} wide={wide} />
          </li>
        )
      })}
    </ul>
  )
}
