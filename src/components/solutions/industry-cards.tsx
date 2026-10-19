import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { MeshStage } from "@/components/layout/art-stage"
import { LiveCard } from "@/components/solutions/live-card"
import { industries, industryHref } from "@/content/industries"
import { industryArt } from "@/lib/industry-art"
import { cn } from "@/lib/utils"

/**
 * The hub's industries: one big card per industry, full width, the photo on
 * one side (alternating) and on the other the industry, its one line, its
 * use cases with one described as an example. The whole
 * card links to the industry page. On the photo, the example call in the
 * centre (live-card.tsx), which plays out on hover or focus while the photo
 * eases in.
 * Photo: public/art/solutions/<slug>.webp
 * (the painted gradient until it's added).
 */
export function IndustryCards() {
  return (
    <ul className="mt-10 flex flex-col gap-3 lg:mt-12">
      {industries.map((x, i) => {
        const [main, ...rest] = x.jobs
        return (
          <li key={x.slug} id={`industry-${x.slug}`} className="scroll-mt-24">
            <Link
              href={industryHref(x.slug)}
              className="group grid gap-6 rounded-md bg-surface p-3 transition-colors outline-none hover:bg-placeholder focus-visible:ring-2 focus-visible:ring-ring lg:grid-cols-2 lg:gap-0"
            >
              <MeshStage
                image={industryArt(x.slug)}
                className={cn(
                  "aspect-[4/5] rounded-md sm:aspect-[4/3] lg:aspect-auto lg:min-h-[32rem] [&_img]:transition-[scale] [&_img]:duration-[1200ms] [&_img]:ease-(--ease-out) group-hover:[&_img]:scale-[1.05]",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                <LiveCard industry={x} />
              </MeshStage>
              <div className="flex flex-col justify-between gap-10 px-3 pb-3 sm:px-5 lg:px-12 lg:py-12">
                <div className="flex flex-col gap-3">
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-small text-ink-muted">{x.name}</span>
                    <ArrowRightIcon aria-hidden className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <h3 className="max-w-[20ch] text-h2 font-normal text-balance">{x.title}</h3>
                  <p className="max-w-[48ch] text-body text-ink-secondary">{x.line}</p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 rounded-md border border-line bg-background p-5">
                    <span className="font-mono text-label text-ink-muted">For example</span>
                    <span className="text-h4 font-normal">{main.name}</span>
                    <span className="text-small text-ink-secondary">{main.body}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-label text-ink-muted">Other use cases</span>
                    <ul className="flex flex-col border-t border-line">
                      {rest.map((j) => (
                        <li key={j.name} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-small">
                          <span className="shrink-0">{j.name}</span>
                          <span className="hidden text-right text-ink-muted sm:block">{j.body}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-small font-medium underline-offset-4 group-hover:underline">See {x.name}</span>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
