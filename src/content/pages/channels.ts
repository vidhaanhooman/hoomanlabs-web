import type { MenuPageId } from "@/content/platform"

/**
 * /platform/channels, from the website content sheet ("Platform pages" tab
 * for the sections, "Hoomanlabs" tab for each feature's name and pointer).
 * Sections are written as features, not the sheet's questions, in the
 * homepage's language like the other product pages.
 * SAMPLE: the proof metric. WhatsApp calls and customer profiles are not
 * live yet (shown as Coming soon); web and in-app packaging to be verified.
 */
export const channelsPage = {
  seo: {
    title: "AI Phone Agent for Inbound Calls, Web and App",
    description: "The same AI agent on voice and chat: phone lines 24/7, your website, your app and WhatsApp, with one memory of every customer.",
  },
  crumb: "Channels",
  title: "One Hooman, on every channel.",
  line: "The same Hooman answers your phone line, your website, your app and WhatsApp, by voice or chat.",

  /** The sheet's "What is it?" definition block. */
  definition: "Channels are where your Hooman meets customers: phone calls, your website, your app and WhatsApp, by voice or chat.",
  /** SAMPLE: the sheet's proof strip is "TBD: inbound volume metric". */
  proof: { quote: "100% answered", by: "every inbound call picked up, day and night" },

  /**
   * Two sections, by how customers talk: Voice (phone, app, WhatsApp) and
   * Chat (web, app, WhatsApp). Availability matches `channels.modes` in
   * content/platform.ts: WhatsApp calls are coming soon.
   */
  panels: {
    voice: {
      label: "Voice",
      title: "Customers call, and your Hooman answers.",
      rows: [
        { id: "phone", title: "Phone", body: "HoomanLabs numbers, ready in minutes, or bring your own carrier (BYOT) and keep the numbers customers know. Answered 24/7." },
        { id: "app", title: "In-app calls", body: "Your users call your Hooman from inside your iOS or Android app." },
        { id: "whatsapp", title: "WhatsApp calls · Coming soon", body: "Voice calls on WhatsApp, with the same agent." },
      ],
    },
    chat: {
      label: "Chat",
      title: "Customers type, and get answers right away.",
      rows: [
        { id: "web", title: "Website chat", body: "A chat widget on your site, added with one small snippet." },
        { id: "app", title: "In-app chat", body: "Chat inside your iOS or Android app." },
        { id: "whatsapp", title: "WhatsApp", body: "Business messaging, where customers already are." },
      ],
    },
  },

  /** Sheet sections 4 and 5: one customer, every channel. */
  journey: {
    label: "One memory",
    title: "One customer, one memory, on every channel.",
    line: "Whether they call, chat or tap in your app, your Hooman knows who they are and what happened last time.",
    rows: [
      { id: "continuity", title: "Session continuity", body: "A conversation carries on across channels, without starting again." },
      { id: "recall", title: "Recall", body: "Picks up where the last conversation left off; customers never repeat themselves." },
      { id: "profiles", title: "Customer profiles", body: "History, preferences and open issues, known before hello.", soon: true },
    ],
  },

  faq: [
    {
      q: "Can it answer our existing phone number?",
      a: "Yes. Connect your Exotel, Ozonetel, Plivo or Twilio account and keep the numbers your customers already know, or get new numbers from us.",
    },
    {
      q: "Does it answer around the clock?",
      a: "Yes. Inbound calls are answered 24/7, with no queue and no hold music, and a person can take over when your team is in.",
    },
    {
      q: "How do we add it to our website?",
      a: "Add one small snippet to your site for the chat widget. In your app, users can chat with your Hooman or call it.",
    },
    {
      q: "Is it the same agent on every channel?",
      a: "Yes. It's one Hooman with one memory of each customer, so a conversation that starts on the phone can continue on your website or app.",
    },
    {
      q: "Does it work on WhatsApp?",
      a: "Yes, for chat: your Hooman answers WhatsApp business messages. WhatsApp voice calls are coming soon; talk to us if you'd like early access.",
    },
  ],

  /** Next step first (the sheet's related pages: Campaigns, Human + AI). */
  related: ["campaigns", "human-ai"] satisfies MenuPageId[],
}
