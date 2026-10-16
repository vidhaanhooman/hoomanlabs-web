"use client"

import { useRef, useState } from "react"
import { PlayIcon } from "@phosphor-icons/react"

import { MeshStage } from "@/components/layout/art-stage"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroCopy } from "@/components/product-page/page-bits"
import { CallPlayer } from "@/components/solutions/call-player"
import { MiniCall, Tag, Tile } from "@/components/solutions/cards"
import { industryBySlug, solutionHref, caseBySlug, type UseCase } from "@/content/solutions"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * An industry page's hero and its jobs, together because they share the
 * player: the hero copy, the sample proof chip and a call player (the first
 * job's call); below, one tile per job with how it plays out here, a link
 * to the use case and a play button that loads that job's call into the
 * hero player, scrolls to it and starts it. Takes the slug (serialisable)
 * and reads the data itself.
 */
export function IndustryCalls({ slug }: { slug: string }) {
  const ind = industryBySlug(slug)!
  const jobs = ind.jobs.flatMap((j) => {
    const u = caseBySlug(j.useCase)
    return u ? [{ ...j, u }] : []
  })
  const [pick, setPick] = useState<{ u: UseCase; auto: boolean }>({ u: jobs[0].u, auto: false })
  const stage = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()

  const play = (u: UseCase) => {
    setPick({ u, auto: true })
    stage.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
  }

  return (
    <>
      <Section id="solution-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy parent={{ label: "Solutions", href: "/solutions" }} crumb={ind.name} title={ind.title} line={ind.line} link={{ label: "See the jobs", href: "#solution-matrix" }} />
          <p className="reveal mt-8 inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-full border border-line px-4 py-1.5 text-small" style={{ "--i": 4 } as React.CSSProperties}>
            <span className="tabular-nums">{ind.proof.value}</span>
            <span className="text-ink-secondary">{ind.proof.label}</span>
            <span className="font-mono text-label text-ink-muted">Sample</span>
          </p>
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <div ref={stage} className="scroll-mt-24">
            <MeshStage image="/art/product/channels-mountains.webp" className="px-3 py-6 sm:p-[5%]">
              <div className="mx-auto w-full max-w-[46rem]">
                <CallPlayer key={pick.u.slug} id={`industry-${ind.slug}-${pick.u.slug}`} call={pick.u.call} autoPlay={pick.auto} />
              </div>
            </MeshStage>
          </div>
        </Container>
      </Section>

      <Section id="solution-matrix" className="scroll-mt-20">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">The calls a Hooman takes on.</h2>
            <p className="text-body text-ink-secondary">Each one in {ind.name.toLowerCase()} terms, with a call to hear or preview.</p>
          </div>
          <ul className={cn("mt-10 grid gap-x-4 gap-y-10 sm:grid-cols-2", jobs.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
            {jobs.map((j, i) => (
              <li key={j.useCase} className="flex flex-col gap-3">
                <div className="relative">
                  <Tile i={i}>
                    <MiniCall useCase={j.u} />
                  </Tile>
                  <button
                    type="button"
                    onClick={() => play(j.u)}
                    aria-label={`${j.u.call.audio ? "Play" : "Preview"} the ${j.u.name.toLowerCase()} call`}
                    className="absolute top-3 left-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong bg-background py-1 pr-3 pl-1.5 text-label text-foreground shadow-sm transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-foreground text-background">
                      <PlayIcon weight="fill" className="size-2.5" />
                    </span>
                    {j.u.call.audio ? "Play the call" : "Preview the call"}
                  </button>
                </div>
                <h3 className="text-body font-normal">{j.u.name}</h3>
                <p className="-mt-1 text-small text-ink-secondary">{j.how}</p>
                <span className="flex flex-wrap items-center justify-between gap-2">
                  <Tag>{j.u.result}</Tag>
                  <TextLink href={solutionHref(j.u.slug)}>See the use case</TextLink>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
