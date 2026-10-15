import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Judges } from "@/components/quality/judges"
import { InsightsPanels, QualityPanels } from "@/components/quality/panels"
import { InsightsDivider, QualityData, QualityHero, QualityImprove } from "@/components/quality/sections"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { qualityPage as c } from "@/content/pages/quality"

/**
 * /platform/quality ("Quality & Insights"), following the content sheet in
 * the homepage's language (like the other product pages), merging its
 * "AI QA" and "Post-call analysis" pages. Floating hero, logos, definition
 * (no proof: the sheet's metric is TBD), then the Quality half: five judges
 * (full width), fault finder, audits and alerts, human review, every
 * finding a fix; then the Insights half: call record, debrief, Ask AI,
 * dashboards, your systems; FAQ, next step and the two-way close.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function QualityPage() {
  return (
    <div style={ROOMY}>
      <QualityHero />
      <Logos label="Trusted by 100+ teams" />
      <Definition id="quality-definition" text={c.definition} />
      <Judges />
      <QualityPanels />
      <QualityImprove />
      <InsightsDivider />
      <InsightsPanels />
      <QualityData />
      <Faq id="quality-faq" items={c.faq} />
      <NextStep id="quality-next" related={c.related} />
      <TwoWayCta />
    </div>
  )
}
