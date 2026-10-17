import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Judges } from "@/components/quality/judges"
import { AnalyticsPanel, QualityPanels } from "@/components/quality/panels"
import { QualityHero } from "@/components/quality/sections"
import { qualityPage as c } from "@/content/pages/quality"

/**
 * /platform/quality ("QA"), in the homepage's language like the other
 * product pages. Floating hero and definition, then post-conversation
 * analytics (summarize, extract, classify), advanced metrics with four
 * judges (full width), team review, and failure modes with their fixes;
 * FAQ, next step. Dashboards, alerts and logs: /platform/observability.
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
      <Definition id="quality-definition" text={c.definition} />
      <AnalyticsPanel />
      <Judges />
      <QualityPanels />
      <Faq id="quality-faq" items={c.faq} />
      <NextStep id="quality-next" related={c.related} />
    </div>
  )
}
