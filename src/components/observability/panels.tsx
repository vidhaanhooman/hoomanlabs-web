"use client"

import { AlertsScreen, DashboardScreen } from "@/components/product/quality-screens"
import { ReplayScreen } from "@/components/product/testing-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { observabilityPage as c } from "@/content/pages/observability"

/**
 * /platform/observability's split panels, alternating sides: dashboards
 * (prebuilt views and custom widgets), alerts (presets, QA thresholds,
 * custom) and conversation logs (the console's log, shared with Testing).
 */

const DOCS = "https://docs.hoomanlabs.com"

export function ObservabilityPanels() {
  const { dashboards, alerts, logs } = c
  return (
    <>
      <ProductPanel id="observability-dashboards" {...dashboards} link="Read about dashboards" linkHref={DOCS} screen={(cls, f) => <DashboardScreen className={cls} focus={f} />} />
      <ProductPanel id="observability-alerts" {...alerts} link="Read about alerts" linkHref={DOCS} media="start" screen={(cls, f) => <AlertsScreen className={cls} focus={f} />} />
      <ProductPanel id="observability-logs" {...logs} link="Read about conversation logs" linkHref={DOCS} screen={(cls, f) => <ReplayScreen className={cls} focus={f} type="Inbound" />} />
    </>
  )
}
