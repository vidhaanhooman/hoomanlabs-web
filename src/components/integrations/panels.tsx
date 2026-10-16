"use client"

import { ActionsScene, ConnectScene, WebhooksScene } from "@/components/integrations/scenes"

/** The first three sections of /platform/integrations: connect, actions (API and MCP), webhooks. */
export function IntegrationPanels() {
  return (
    <>
      <ConnectScene />
      <ActionsScene />
      <WebhooksScene />
    </>
  )
}
