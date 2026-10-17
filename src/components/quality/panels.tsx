"use client"

import { AnalyticsScreen, FailureModesScreen, ReviewScreen } from "@/components/product/quality-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { qualityPage as c } from "@/content/pages/quality"

/**
 * Split panels in the homepage's ProductPanel, alternating sides. Quality
 * analysis: post-conversation analytics first, then (after the four judges)
 * team review and failure modes. Dashboards, alerts and logs live on
 * /platform/observability.
 */

const DOCS = "https://docs.hoomanlabs.com"

export function AnalyticsPanel() {
  return <ProductPanel id="quality-analytics" {...c.analytics} link="Read about post-conversation analytics" linkHref={DOCS} screen={(cls, f) => <AnalyticsScreen className={cls} focus={f} />} />
}

export function QualityPanels() {
  const { humans, fault } = c
  return (
    <>
      <ProductPanel id="quality-humans" {...humans} link="Read about team review" linkHref={DOCS} media="start" screen={(cls) => <ReviewScreen className={cls} />} />
      <ProductPanel id="quality-fault" {...fault} link="Read about failure modes" linkHref={DOCS} screen={(cls, f) => <FailureModesScreen className={cls} focus={f} />} />
    </>
  )
}
