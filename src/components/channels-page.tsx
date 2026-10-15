import { Journey } from "@/components/channels/journey"
import { ChannelPanels } from "@/components/channels/panels"
import { ChannelsDevices, ChannelsHero } from "@/components/channels/sections"
import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { channelsPage as c } from "@/content/pages/channels"

/**
 * /platform/channels, following the content sheet in the homepage's
 * language (like the other product pages): floating hero, logos, definition
 * and proof, phone lines, your own telephony, web and app, one customer
 * across channels (full width), FAQ, next step and the two-way close.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function ChannelsPage() {
  return (
    <div style={ROOMY}>
      <ChannelsHero />
      <Logos label="Trusted by 100+ teams" />
      <Definition id="channels-definition" text={c.definition} proof={c.proof} placeholder />
      <ChannelsDevices />
      <ChannelPanels />
      <Journey />
      <Faq id="channels-faq" items={c.faq} />
      <NextStep id="channels-next" related={c.related} />
      <TwoWayCta />
    </div>
  )
}
