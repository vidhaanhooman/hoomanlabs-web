"use client"

import { FailoverScreen, GuardrailsScreen, RolesScreen, TelecomScreen } from "@/components/product/security-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { securityPage as c } from "@/content/pages/security"

const DOCS = "https://docs.hoomanlabs.com"

/** Split panels in the homepage's ProductPanel, alternating sides. */
export function SecurityPanels() {
  const { failover, guardrails, roles, telecom } = c.panels
  return (
    <>
      <ProductPanel id="security-failover" {...failover} link="Read about failover" linkHref={DOCS} screen={(cls) => <FailoverScreen className={cls} />} />
      <ProductPanel
        id="security-guardrails"
        {...guardrails}
        link="Read about call guardrails"
        linkHref={DOCS}
        media="start"
        screen={(cls) => <GuardrailsScreen className={cls} />}
      />
      <ProductPanel id="security-roles" {...roles} link="Read about workspaces and roles" linkHref={DOCS} screen={(cls) => <RolesScreen className={cls} />} />
      <ProductPanel
        id="security-telecom"
        {...telecom}
        link="Read about telecom compliance"
        linkHref={DOCS}
        media="start"
        screen={(cls) => <TelecomScreen className={cls} />}
      />
    </>
  )
}
