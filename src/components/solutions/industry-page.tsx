import { MeshStage } from "@/components/layout/art-stage"
import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { HeroCopy } from "@/components/product-page/page-bits"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { RecordFloat, SplitHeader } from "@/components/solutions/bits"
import { CaseStudy } from "@/components/solutions/case-study"
import { Everywhere } from "@/components/solutions/everywhere"
import { JobFlow } from "@/components/solutions/job-flow"
import type { Industry } from "@/content/industries"
import { industryArt } from "@/lib/industry-art"
import { STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * /solutions/[slug], one template for every industry, one idea per section,
 * every section opening on the same split header so the page lines up:
 * the hero (its first use case start to finish on its painting), one small
 * case study of that use case (with the team's screen), the other use cases
 * as tiles (each with one record on the grey stage), what the industry
 * needs, the shared "works everywhere" strip, a short FAQ and the Book a
 * demo. Content in content/industries.ts.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

/** Asked on every industry page; answered from what the platform pages say. */
const HANDOFF = { q: "Can it hand a call to a person?", a: "Yes. It transfers the call to your team with a summary of what was said, inside your transfer hours." }

export function IndustryPage({ industry: x }: { industry: Industry }) {
  const art = industryArt(x.slug)
  return (
    <div style={ROOMY}>
      <Section id="industry-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy parent={{ label: "Solutions", href: "/solutions" }} crumb={x.name} title={x.title} line={x.line} />
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <MeshStage image={art} className="px-4 py-6 sm:px-[5%] sm:py-12">
            <div className="mx-auto flex max-w-[64rem] flex-col gap-4">
              <span className={cn("flex items-baseline justify-between gap-3 text-small", art ? "text-white [text-shadow:0_1px_8px_oklch(0.15_0.02_60/0.6)]" : "text-foreground")}>
                <span>{x.jobs[0].name}</span>
                <span className="font-mono text-label opacity-70">Sample</span>
              </span>
              <JobFlow industry={x} />
            </div>
          </MeshStage>
        </Container>
      </Section>

      <Section id="industry-story">
        <Container>
          <SplitHeader title="What changed for one team." line={`How one ${x.name} team runs ${x.jobs[0].name.toLowerCase()} with a Hooman.`} />
          <div className="mt-10 lg:mt-12">
            <CaseStudy industry={x} />
          </div>
        </Container>
      </Section>

      <Section id="industry-jobs">
        <Container>
          <SplitHeader title="Other jobs it takes on." line="The same agent, set up for the next job. Each one ends with the result in your systems." />
          <ul className="mt-10 grid gap-3 md:grid-cols-3 lg:mt-12">
            {x.jobs.slice(1).map((j) => (
              <li key={j.name} className="flex">
                <Panel className="flex w-full flex-col p-3">
                  <div className={`${STAGE} flex h-64 items-center justify-center p-6`}>{j.ui && <RecordFloat ui={j.ui} className="max-w-[20rem]" />}</div>
                  <div className="flex flex-col gap-1 px-3 pt-5 pb-3">
                    <span className="text-body">{j.name}</span>
                    <span className="text-small text-ink-secondary">{j.body}</span>
                  </div>
                </Panel>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="industry-needs">
        <Container>
          <SplitHeader title="What it gets right." line={`What ${x.name} teams ask for first, built into every call.`} />
          <ol className="mt-10 grid gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-3 lg:mt-12">
            {x.needs.map((n, i) => (
              <li key={n.title} className="flex flex-col gap-2">
                <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                <span className="text-h4 font-normal">{n.title}</span>
                <span className="text-small text-ink-secondary">{n.body}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Everywhere id="industry-everywhere" />
      <Faq id="industry-faq" items={[...x.faq, HANDOFF]} />
      <TwoWayCta />
    </div>
  )
}
