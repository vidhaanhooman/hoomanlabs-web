import type { MenuPageId } from "@/content/platform"

/**
 * /platform/channels, from the website content sheet ("Platform pages" tab
 * for the sections, "Hoomanlabs" tab for each feature's name and pointer).
 * Sections are written as features, not the sheet's questions, in the
 * homepage's language like the other product pages.
 * SAMPLE: the proof metric. WhatsApp and customer profiles are not live yet
 * (shown as Coming soon); web and in-app packaging to be verified.
 */
export const channelsPage = {
  seo: {
    title: "AI Phone Agent for Inbound Calls, Web and App",
    description: "The same AI agent answers your phone lines 24/7, your website and your app, with one memory of every customer. WhatsApp coming soon.",
  },
  crumb: "Channels",
  title: "One Hooman, on every channel.",
  line: "The same Hooman answers your phone line, your website and your app, with WhatsApp coming next.",

  /** The sheet's "What is it?" definition block. */
  definition: "Channels are where your Hooman meets customers: phone lines, web voice and chat, in-app calls and soon WhatsApp.",
  /** SAMPLE: the sheet's proof strip is "TBD: inbound volume metric". */
  proof: { quote: "100% answered", by: "every inbound call picked up, day and night" },

  panels: {
    /** Sheet section 1. */
    phone: {
      label: "Phone lines",
      title: "Answers your phone line, day and night.",
      rows: [{ id: "phone", title: "Phone lines", body: "Get numbers and handle inbound calls 24/7, with no queue and no hold music." }],
    },
    /** Sheet section 2. */
    carrier: {
      label: "Telephony",
      title: "Our numbers, or your carrier.",
      rows: [
        { id: "hooman", title: "HoomanLabs numbers", body: "Get numbers from us, ready to answer in minutes. No carrier account needed." },
        { id: "byot", title: "Bring your own carrier", body: "Connect Exotel, Ozonetel, Plivo or Twilio and keep the numbers customers know." },
        { id: "verified", title: "Verified calling", body: "Verified business numbers, for trust and better pickup." },
      ],
      // TO CONFIRM before adding: the countries numbers are offered in.
    },
    /** Sheet section 3. */
    web: {
      label: "Web and app",
      title: "Talks on your website and in your app.",
      rows: [
        { id: "web", title: "Web & chat", body: "Voice and chat on your website, from one small snippet." },
        { id: "app", title: "In-app voice", body: "Let your users call your Hooman from inside your app." },
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
      { id: "whatsapp", title: "WhatsApp", body: "Continue conversations where customers already are.", soon: true },
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
      a: "Add one small snippet to your site for voice and chat. For your app, your users can call your Hooman from inside it.",
    },
    {
      q: "Is it the same agent on every channel?",
      a: "Yes. It's one Hooman with one memory of each customer, so a conversation that starts on the phone can continue on your website or app.",
    },
    {
      q: "When is WhatsApp coming?",
      a: "WhatsApp is next on our list. Talk to us if you'd like early access.",
    },
  ],

  /** Next step first (the sheet's related pages: Campaigns, Human + AI). */
  related: ["campaigns", "human-ai"] satisfies MenuPageId[],
}
