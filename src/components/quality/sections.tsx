import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroCopy } from "@/components/product-page/page-bits"
import { QualityConsole } from "@/components/quality/hero-console"
import { qualityPage as c } from "@/content/pages/quality"
import type { SectionId } from "@/content/sections"

/**
 * The /platform/quality hero and its lighter sections. The hero: the copy,
 * then a large console on the landscape backdrop with one call's transcript
 * and its five-judge scorecard (the failed judge pointing to its turn).
 * Below: the "every finding becomes a fix" and "your systems" row lists,
 * and the small label that opens the page's Insights half.
 */

export function QualityHero() {
  return (
    <Section id="quality-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See a scorecard", href: "#quality-judges" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <QualityConsole />
      </Container>
    </Section>
  )
}

type RowItem = { id: string; title: string; body: string; soon?: boolean }

/** A light section: heading beside a few border-t feature rows. */
function RowList({ id, label, title, line, rows, link }: { id: SectionId; label: string; title: string; line?: string; rows: readonly RowItem[]; link?: { label: string; href: string } }) {
  return (
    <Section id={id} spacing="tight">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h3 font-normal">{title}</h2>
          {line && <p className="text-body text-ink-secondary">{line}</p>}
          {link && (
            <span className="pt-2">
              <TextLink href={link.href}>{link.label}</TextLink>
            </span>
          )}
        </div>
        <ul className="grid gap-6 sm:grid-cols-3">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="flex flex-wrap items-center gap-2 text-body">
                {r.title}
                {r.soon && <span className="rounded-full border border-line-strong px-2 py-px text-[11px] text-ink-muted">Coming soon</span>}
              </span>
              <span className="text-small text-ink-secondary">{r.body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** Never-again tests, replay and (soon) auto-improve. */
export function QualityImprove() {
  return <RowList id="quality-improve" {...c.improve} />
}

/** Call events, workflows and the API, linking to Integrations & API. */
export function QualityData() {
  return <RowList id="quality-data" {...c.data} />
}

/** Opens the page's second half: the label, heading and line for Insights. */
export function InsightsDivider() {
  const { label, title, line } = c.insights
  return (
    <div className="pt-(--section-gap) pb-(--section-pad)">
      <Container>
        <div className="flex flex-col gap-3 border-t border-line pt-10">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="max-w-[24ch] text-h2 font-normal">{title}</h2>
          <p className="max-w-[56ch] text-body text-ink-secondary">{line}</p>
        </div>
      </Container>
    </div>
  )
}
