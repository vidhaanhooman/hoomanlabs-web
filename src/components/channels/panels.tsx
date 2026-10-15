"use client"

import { CarrierScreen, NumbersScreen, WebAppScreen } from "@/components/product/channel-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { channelsPage as c } from "@/content/pages/channels"

const DOCS = "https://docs.hoomanlabs.com"

/** Split panels in the homepage's ProductPanel, alternating sides. */
export function ChannelPanels() {
  const { phone, carrier, web } = c.panels
  return (
    <>
      <ProductPanel id="channels-phone" {...phone} link="Read about phone lines" linkHref={DOCS} screen={(cls) => <NumbersScreen className={cls} />} />
      <ProductPanel id="channels-carrier" {...carrier} link="Read about telephony" linkHref={DOCS} media="start" screen={(cls) => <CarrierScreen className={cls} />} />
      <ProductPanel id="channels-web" {...web} link="Read about web and app" linkHref={DOCS} screen={(cls) => <WebAppScreen className={cls} />} />
    </>
  )
}
