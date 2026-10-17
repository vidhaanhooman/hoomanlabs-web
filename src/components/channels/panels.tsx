"use client"

import { ChatScreen, VoiceScreen } from "@/components/product/channel-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { channelsPage as c } from "@/content/pages/channels"

const DOCS = "https://docs.hoomanlabs.com"

/** Voice and Chat, in the homepage's split ProductPanel; hovering a row focuses its part of the screen. */
export function ChannelPanels() {
  const { voice, chat } = c.panels
  return (
    <>
      <ProductPanel id="channels-voice" {...voice} link="Read about voice channels" linkHref={DOCS} screen={(cls, f) => <VoiceScreen className={cls} focus={f} />} />
      <ProductPanel id="channels-chat" {...chat} link="Read about chat channels" linkHref={DOCS} media="start" screen={(cls, f) => <ChatScreen className={cls} focus={f} />} />
    </>
  )
}
