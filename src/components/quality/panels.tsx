"use client"

import { AskScreen, AuditScreen, CallRecordScreen, DashboardScreen, DebriefScreen, FaultScreen, ReviewScreen } from "@/components/product/quality-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { qualityPage as c } from "@/content/pages/quality"

/**
 * Split panels in the homepage's ProductPanel, alternating sides: the
 * Quality half (fault finder, audits and alerts, human review) and the
 * Insights half (call record, debrief, Ask AI, dashboards).
 */

const DOCS = "https://docs.hoomanlabs.com"

export function QualityPanels() {
  const { fault, watch, humans } = c
  return (
    <>
      <ProductPanel id="quality-fault" {...fault} link="Read about fault finder" linkHref={DOCS} screen={(cls) => <FaultScreen className={cls} />} />
      <ProductPanel id="quality-watch" {...watch} link="Read about audits" linkHref={DOCS} media="start" screen={(cls) => <AuditScreen className={cls} />} />
      <ProductPanel id="quality-humans" {...humans} link="Read about reviews" linkHref={DOCS} screen={(cls) => <ReviewScreen className={cls} />} />
    </>
  )
}

export function InsightsPanels() {
  const { record, debrief, ask, dashboards } = c
  return (
    <>
      <ProductPanel id="quality-record" {...record} link="Read about the call record" linkHref={DOCS} media="start" screen={(cls) => <CallRecordScreen className={cls} />} />
      <ProductPanel id="quality-debrief" {...debrief} link="Read about post-call analysis" linkHref={DOCS} screen={(cls) => <DebriefScreen className={cls} />} />
      <ProductPanel id="quality-ask" {...ask} link="Read about Ask AI" linkHref={DOCS} media="start" screen={(cls) => <AskScreen className={cls} />} />
      <ProductPanel id="quality-dashboards" {...dashboards} link="Read about dashboards" linkHref={DOCS} screen={(cls) => <DashboardScreen className={cls} />} />
    </>
  )
}
