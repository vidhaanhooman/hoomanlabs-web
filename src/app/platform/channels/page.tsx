import type { Metadata } from "next"

import { ChannelsPage } from "@/components/channels-page"
import { channelsPage } from "@/content/pages/channels"

export const metadata: Metadata = {
  title: channelsPage.seo.title,
  description: channelsPage.seo.description,
}

export default function Channels() {
  return <ChannelsPage />
}
