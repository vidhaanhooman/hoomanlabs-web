import type { Metadata } from "next"

import { ChatPlayground } from "@/components/chat/chat-playground"

/**
 * /chat: the chat playground. Not linked from anywhere and not indexed; open
 * it by URL. Scripted demo with sample data.
 */
export const metadata: Metadata = {
  title: "Chat playground",
  robots: { index: false, follow: false },
}

export default function ChatDemo() {
  return <ChatPlayground />
}
