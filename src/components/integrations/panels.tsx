"use client"

import { ApiScreen, ConnectApiScreen, McpScreen } from "@/components/product/integration-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { integrationsPage as c } from "@/content/pages/integrations"

const DOCS = "https://docs.hoomanlabs.com"

/** Split panels in the homepage's ProductPanel. */
export function ConnectPanel() {
  return <ProductPanel id="integrations-connect" {...c.panels.connect} link="Read about skills" linkHref={DOCS} screen={(cls) => <ConnectApiScreen className={cls} />} />
}

export function DeveloperPanels() {
  const { api, mcp } = c.panels
  return (
    <>
      <ProductPanel id="integrations-api" {...api} link="Read the API reference" linkHref={DOCS} media="start" screen={(cls) => <ApiScreen className={cls} />} />
      <ProductPanel id="integrations-mcp" {...mcp} link="Set up MCP" linkHref={DOCS} screen={(cls) => <McpScreen className={cls} />} />
    </>
  )
}
