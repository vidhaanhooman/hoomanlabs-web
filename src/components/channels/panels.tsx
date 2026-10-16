"use client"

import { ChatDemo } from "@/components/channels/chat-demo"
import { VoiceDemo } from "@/components/channels/voice-demo"

/** Voice and Chat on /platform/channels: each a split panel whose rows pick what plays on the stage. */
export function ChannelPanels() {
  return (
    <>
      <VoiceDemo />
      <ChatDemo />
    </>
  )
}
