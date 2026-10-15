import { InboxConsole } from "@/components/channels/inbox-console"
import { ChannelDevices } from "@/components/sections/channel-devices"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { channelsPage as c } from "@/content/pages/channels"
import { channels } from "@/content/platform"

/**
 * The /platform/channels hero: the headline, then a large Inbox console
 * on a mesh gradient (every channel's live conversations in one list, and
 * one customer's memory across them).
 */
export function ChannelsHero() {
  return (
    <Section id="channels-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "Follow one customer", href: "#channels-journey" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <InboxConsole />
      </Container>
    </Section>
  )
}

/** The homepage's channel devices (phone, web, app, WhatsApp, each with its modes), on Channels. */
export function ChannelsDevices() {
  return (
    <Section id="channels-devices">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{channels.headline}</h2>
          <p className="text-body text-ink-secondary">{channels.body}</p>
        </div>
        <ChannelDevices className="mt-10" />
      </Container>
    </Section>
  )
}
