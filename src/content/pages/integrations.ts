import type { MenuPageId } from "@/content/platform"

/**
 * /platform/integrations, from the website content sheet ("Platform pages"
 * tab for the sections, "Hoomanlabs" tab for each feature's name and
 * pointer). Sections are written as features, not the sheet's questions, in
 * the homepage's language like the other product pages. The sheet notes the
 * native list is short, so the page leads with "connect anything".
 * The sheet has no proof strip for this page. API paths and payloads shown
 * on screens are illustrative until checked against the API reference.
 */
export const integrationsPage = {
  seo: {
    title: "Voice AI Integrations, API and MCP",
    description: "Connect AI voice agents to your CRM, helpdesk, calendar and any API. Real-time call events, a full API and MCP put every call's data where your team works.",
  },
  crumb: "Integrations & API",
  title: "Every call's data, where your team works.",
  line: "Native integrations, call events, a full API and MCP. Every call's data lands where your team works.",

  /** The sheet's "What is it?" definition block. */
  definition: "Integrations connect Hoomans to the systems they read from and write to, and send every call's data where your team works.",

  /**
   * The directory of integrations. Telephony and voice from the console's
   * provider lists (HoomanLabs numbers first); the rest PLACEHOLDER until the
   * real list is supplied (the FAQ's native four, call events, the API and
   * MCP, workflow actions, WhatsApp coming soon). `does` says what the Hooman does with it; `io` marks
   * whether it reads during calls, writes after them, or both.
   */
  directory: {
    label: "Integrations",
    title: "Works with the tools you already use.",
    line: "Built-in integrations for your CRM, helpdesk, calendar and phone lines, and anything else through the API.",
    categories: ["All", "CRM", "Helpdesk", "Calendar", "Telephony", "Voice", "Messaging", "Developer"],
    items: [
      { id: "zoho", name: "Zoho CRM", category: "CRM", status: "Native", io: ["Read", "Write"], does: "Looks up the customer during the call, writes the outcome after." },
      { id: "freshdesk", name: "Freshdesk", category: "Helpdesk", status: "Native", io: ["Read", "Write"], does: "Reads open tickets, then closes or updates them with the call summary." },
      { id: "zendesk", name: "Zendesk", category: "Helpdesk", status: "Native", io: ["Read", "Write"], does: "Knows the ticket history before hello, and logs every call." },
      { id: "gcal", name: "Google Calendar", category: "Calendar", status: "Native", io: ["Read", "Write"], does: "Checks free slots mid-call and books callbacks and appointments." },
      { id: "hooman", name: "HoomanLabs numbers", category: "Telephony", status: "Native", io: [], does: "Numbers from us, ready to answer in minutes. No carrier account needed.", href: "/platform/channels#channels-carrier", cta: "Set up in Channels" },
      { id: "exotel", name: "Exotel", category: "Telephony", status: "Native", io: [], does: "Bring your Exotel account and keep your numbers." },
      { id: "ozonetel", name: "Ozonetel", category: "Telephony", status: "Native", io: [], does: "Bring your Ozonetel account and keep your numbers." },
      { id: "plivo", name: "Plivo", category: "Telephony", status: "Native", io: [], does: "Bring your Plivo account and keep your numbers." },
      { id: "twilio", name: "Twilio", category: "Telephony", status: "Native", io: [], does: "Bring your Twilio account and keep your numbers." },
      { id: "stt", name: "Speech-to-text", category: "Voice", status: "Native", io: [], does: "Deepgram, ElevenLabs, AssemblyAI, Sarvam and Navana, chosen per language.", href: "/platform/voice#voice-speech", cta: "See the speech layer" },
      { id: "tts", name: "Voices", category: "Voice", status: "Native", io: [], does: "ElevenLabs, Cartesia, Sarvam, Google, Amazon Polly, Murf and Soniox.", href: "/platform/voice#voice-speech", cta: "See the speech layer" },
      { id: "sms", name: "SMS", category: "Messaging", status: "Workflow", io: ["Write"], does: "Sends confirmations, receipts and payment links after the call." },
      { id: "whatsapp", name: "WhatsApp", category: "Messaging", status: "Coming soon", io: ["Read", "Write"], does: "Carry the same conversation on, where customers already are." },
      { id: "events", name: "Call events", category: "Developer", status: "Native", io: ["Write"], does: "Posts to your URL the moment a call starts, connects, transfers or ends." },
      { id: "api", name: "Hooman API", category: "Developer", status: "Native", io: ["Read", "Write"], does: "Agents, campaigns, calls and results, all available to your developers." },
      { id: "mcp", name: "Hooman MCP", category: "Developer", status: "Native", io: ["Read", "Write"], does: "Build, test and run campaigns from Claude, ChatGPT and more." },
      { id: "db", name: "Your database", category: "Developer", status: "Via API", io: ["Read", "Write"], does: "Reads account data as a skill, and writes each call's record after." },
    ],
    more: { title: "Any system with an API", body: "Connect it as a skill your Hooman can use mid-call, or write to it from a workflow.", link: "Read about skills" },
  },

  panels: {
    /** Sheet section 1. */
    connect: {
      label: "Integrations",
      title: "Connects to anything with an API.",
      rows: [
        { id: "native", title: "Integrations", body: "CRM, helpdesk and calendar, connected out of the box." },
        { id: "skills", title: "Skills", body: "Any other system with an API becomes a skill your Hooman can use mid-call." },
      ],
    },
    /** Sheet section 4. */
    api: {
      label: "Hooman API",
      title: "Everything you can click, you can code.",
      rows: [{ id: "api", title: "Hooman API", body: "Agents, campaigns, calls and results, all available to your developers." }],
    },
    /** Sheet section 5. */
    mcp: {
      label: "Hooman MCP",
      title: "Run it from your AI assistant.",
      rows: [{ id: "mcp", title: "Hooman MCP", body: "Build, test and run campaigns from Claude, ChatGPT and more." }],
    },
  },

  /** Sheet sections 2 and 3: a call's data, on its way out. */
  data: {
    label: "Call data",
    title: "Every call, turned into data your systems can use.",
    line: "When a call ends, its summary, outcome and fields are ready, and call events carry them straight to your CRM or database.",
    rows: [
      { id: "debrief", title: "Debrief", body: "A short summary of every conversation, written for your team." },
      { id: "outcomes", title: "Outcomes", body: "Each call tagged with your own outcomes." },
      { id: "capture", title: "Data capture", body: "Promise dates, amounts and reasons become structured fields." },
      { id: "checklist", title: "Call checklist", body: "Fixed questions answered in the same format on every call." },
      { id: "record", title: "Call record", body: "Transcript and recording, kept with every call." },
      { id: "events", title: "Call events", body: "Your CRM knows the moment a call starts, ends or transfers." },
    ],
  },

  faq: [
    {
      q: "Which systems connect out of the box?",
      a: "Zoho CRM, Freshdesk, Zendesk and Google Calendar natively. Any other system with an API connects as a skill, and workflows can write to it after every call.",
    },
    {
      q: "What data do we get from every call?",
      a: "A summary, the outcome, the fields you ask for (such as a promise date or an amount), answers to your checklist questions, the transcript and the recording.",
    },
    {
      q: "How does the data reach our systems?",
      a: "Call events are sent the moment a call starts, connects, transfers or ends, and workflows can push results to your CRM or database.",
    },
    {
      q: "Can our developers do everything through the API?",
      a: "Yes. Everything you can do in the console, from building agents to running campaigns and reading results, is available through the Hooman API.",
    },
    {
      q: "Which AI assistants work with the MCP server?",
      a: "Any assistant that supports MCP, including Claude and ChatGPT, can build, test and run campaigns through the Hooman MCP server.",
    },
  ],

  /** Next step first (the sheet's related pages: Workflows, Agents). */
  related: ["workflows", "agents"] satisfies MenuPageId[],
}
