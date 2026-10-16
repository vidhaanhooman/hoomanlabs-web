"use client"

import { ListUploadScreen, RealtimeQueueScreen } from "@/components/product/campaign-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { campaignsPage as c } from "@/content/pages/campaigns"

const DOCS = "https://docs.hoomanlabs.com"

/** Split panels in the homepage's ProductPanel, alternating sides. */
export function ListPanels() {
  const { list, realtime } = c.panels
  return (
    <>
      <ProductPanel id="campaigns-list" {...list} link="Read about campaigns" linkHref={DOCS} screen={(cls) => <ListUploadScreen className={cls} />} />
      <ProductPanel id="campaigns-realtime" {...realtime} link="Read the API reference" linkHref={DOCS} media="start" screen={(cls) => <RealtimeQueueScreen className={cls} />} />
    </>
  )
}
