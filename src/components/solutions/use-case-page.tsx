import { MeshStage } from "@/components/layout/art-stage"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { HeroCopy } from "@/components/product-page/page-bits"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { CallPlayer } from "@/components/solutions/call-player"
import { IndustryCard, LinkCard, PoweredCards, nextAfter } from "@/components/solutions/cards"
import { industryBySlug, solutionHref, useCases, type UseCase } from "@/content/solutions"

/**
 * /solutions/[use case]: the hero copy over its call player, how it works
 * (before, during, after), three outcomes (all sample, marked), the
 * industries that use it (each with how it plays out there), the platform
 * pages that power it, FAQ, two other use cases and the two-way close.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function UseCasePage({ useCase: u }: { useCase: UseCase }) {
  const inds = u.industries.flatMap((s) => {
    const ind = industryBySlug(s)
    return ind ? [ind] : []
  })

  return (
    <div style={ROOMY}>
      <Section id="solution-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy parent={{ label: "Solutions", href: "/solutions" }} crumb={u.name} title={u.title} line={u.line} link={{ label: "How it works", href: "#solution-steps" }} />
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <MeshStage image="/art/product/campaigns-backdrop.webp" className="px-3 py-6 sm:p-[5%]">
            <div className="mx-auto w-full max-w-[46rem]">
              <CallPlayer id={`solution-${u.slug}`} call={u.call} />
            </div>
          </MeshStage>
        </Container>
      </Section>

      <Section id="solution-steps" className="scroll-mt-20">
        <Container>
          <h2 className="max-w-[32ch] text-h2 font-normal">How it works.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {u.steps.map((s) => (
              <li key={s.when} className="flex flex-col gap-2 border-t border-line pt-5">
                <span className="font-mono text-label text-ink-muted">{s.when}</span>
                <h3 className="text-h4 font-normal">{s.title}</h3>
                <p className="text-body text-ink-secondary">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="solution-outcomes">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 className="text-h2 font-normal">{u.result}.</h2>
            <span className="font-mono text-label text-ink-muted">Sample figures, for illustration</span>
          </div>
          <dl className="mt-10 grid gap-8 border-y border-line py-10 sm:grid-cols-3 sm:gap-6">
            {u.outcomes.map((o) => (
              <div key={o.label} className="flex flex-col-reverse gap-2">
                <dt className="text-small text-ink-secondary">{o.label}</dt>
                <dd className="text-display font-normal tabular-nums">{o.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section id="solution-matrix">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">Where it&apos;s used.</h2>
            <p className="text-body text-ink-secondary">How {u.name.toLowerCase()} plays out in each industry.</p>
          </div>
          <ul className="mt-10 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {inds.map((ind, i) => (
              <IndustryCard key={ind.slug} industry={ind} i={i} line={ind.jobs.find((j) => j.useCase === u.slug)?.how} />
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="solution-powered">
        <Container>
          <h2 className="max-w-[32ch] text-h2 font-normal">What powers it.</h2>
          <div className="mt-10">
            <PoweredCards ids={u.powered} />
          </div>
        </Container>
      </Section>

      <Faq id="solution-faq" items={u.faq} />

      <Section id="solution-next" spacing="tight">
        <Container>
          <ul className="grid gap-3 md:grid-cols-2">
            {nextAfter(useCases, u.slug).map((x) => (
              <LinkCard key={x.slug} href={solutionHref(x.slug)} label="Another use case" name={x.name} line={x.short} />
            ))}
          </ul>
        </Container>
      </Section>

      <TwoWayCta />
    </div>
  )
}
