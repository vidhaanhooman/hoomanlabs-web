import type { ProductStage } from "@/content/products"

/**
 * The Platform: one product made of components (Agents, Workflow,
 * Simulations, QA, Channels, Tools & Integrations). Drives the nav "Platform"
 * menu, the footer column and the /platform overview page.
 *
 * DRAFT: every number, use case and integration here is a placeholder to
 * confirm with the team.
 */

export type ComponentId = "agents" | "workflow" | "simulations" | "qa" | "channels" | "tools"

export const platform = {
  name: "Platform",
  headline: "One platform to build, test and run AI agents on every channel.",
  subhead: "Voice and chat agents that act during the conversation, run your workflows and get better with every call.",
  ctaTitle: "See the platform on your own use case.",
}

/** Nav, footer and overview order. `group` splits the nav menu in two. */
export const components: {
  id: ComponentId
  name: string
  summary: string
  group: "Build & test" | "Connect"
}[] = [
  { id: "agents", name: "Agents", summary: "Prompt, flow, context and voice.", group: "Build & test" },
  { id: "workflow", name: "Workflow", summary: "Automations around every conversation.", group: "Build & test" },
  { id: "simulations", name: "Simulations", summary: "Test against personas before going live.", group: "Build & test" },
  { id: "qa", name: "QA", summary: "Score every real conversation.", group: "Build & test" },
  { id: "channels", name: "Channels", summary: "Phone, web, app and WhatsApp.", group: "Connect" },
  { id: "tools", name: "Tools & Integrations", summary: "Your CRM, calendars, APIs and MCP.", group: "Connect" },
]

export const componentHref = (id: ComponentId) => `/platform#product-${id}`

/* Hero: calls in, results out. */
export const flow = {
  sources: ["Inbound calls", "Outbound campaigns", "Chats and messages"],
  lanes: [
    { id: "resolved", label: "Resolved by the agent", share: 71 },
    { id: "callback", label: "Follow-up scheduled", share: 14 },
    { id: "human", label: "Handed to your team, with context", share: 9 },
  ],
  impact: [
    { value: "100%", label: "of calls and chats answered, day and night" },
    { value: "<1s", label: "to pick up, no hold music" },
    { value: "71%", label: "resolved without a person" },
    { value: "30+", label: "languages, switched mid-conversation" },
  ],
}

export const useCases = [
  {
    title: "Payment collections",
    body: "Remind customers before and after due dates, take promises to pay and set up plans.",
    result: "More on-time payments",
  },
  {
    title: "Appointment booking",
    body: "Book, confirm and reschedule appointments straight into your calendar.",
    result: "Fewer no-shows",
  },
  {
    title: "Lead qualification",
    body: "Reach new leads within minutes, ask your qualifying questions and book the sales call.",
    result: "Faster speed to lead",
  },
  {
    title: "Support triage",
    body: "Answer common questions, look up orders and route the rest with a full summary.",
    result: "Shorter queues",
  },
  {
    title: "Renewals and retention",
    body: "Reach customers before renewal, handle objections and flag the ones at risk.",
    result: "Higher renewal rate",
  },
  {
    title: "Surveys and feedback",
    body: "Run NPS and post-service conversations in the customer's language and log every answer.",
    result: "More responses",
  },
]

/* ---------------------------------------------------------------- components */

export const agents: ProductStage = {
  id: "agents",
  label: "Agents",
  headline: "Full control over every part of the conversation.",
  body: "Write the prompt, pull in context, pick the voice and decide what happens before, during and after each call or chat. Work in the console or from your own editor.",
  backdrop: "",
  hero: "agent-config",
  items: [
    {
      title: "Prompt & flow",
      body: "Write a single prompt or design a node-based flow. Insert live values into prompts with CEL expressions, like customer.plan.",
      mini: [],
    },
    {
      title: "Context & memory",
      body: "Pull live context before the conversation starts: pre-call APIs, your CRM, past conversations and memory.",
      mini: [],
    },
    {
      title: "Voices & languages",
      body: "Choose voices, accents and languages per agent, and switch mid-call when the caller does.",
      mini: [],
    },
    {
      title: "Actions",
      body: "Run actions pre-call, mid-call and on call end: fetch data, update your CRM, send an SMS or call a webhook.",
      mini: [],
    },
    {
      title: "Develop through MCP",
      beta: true,
      body: "Build, test and update agents from your editor or AI assistant with the HoomanLabs MCP server.",
      mini: [],
    },
  ],
}

export const workflow: ProductStage = {
  id: "workflow",
  label: "Workflow",
  headline: "Automate the work around every conversation.",
  body: "Launch campaigns, trigger follow-ups and chain multi-step jobs across calls, messages and your own systems, without a developer for each change.",
  backdrop: "",
  hero: "campaign",
  items: [
    {
      title: "Campaigns",
      body: "Run outbound calls at scale on schedules, time zones and numbers you control, with retries.",
      mini: [],
    },
    {
      title: "Triggers & schedules",
      body: "Start a workflow from a webhook, a CRM change, a schedule or the outcome of a call.",
      mini: [],
    },
    {
      title: "Multi-step follow-ups",
      body: "Chain steps like call, then SMS, then callback, with conditions between them.",
      mini: [],
    },
    {
      title: "Data sync",
      body: "Write results back to your CRM and tables the moment a conversation ends.",
      mini: [],
    },
  ],
}

export const simulations: ProductStage = {
  id: "simulations",
  label: "Simulations",
  headline: "Know it works before a customer finds out.",
  body: "Run simulated customers against every version of your agent, with the goals, moods and accents real ones have, and compare the results side by side.",
  backdrop: "",
  hero: "simulation",
  items: [
    {
      title: "Personas",
      body: "Simulated customers who are frustrated, hard of hearing, in a hurry or switching languages.",
      mini: [],
    },
    {
      title: "Scenarios",
      body: "Repeatable test cases for each flow: refusals, edge cases and requests for a human.",
      mini: [],
    },
    {
      title: "Every version",
      beta: true,
      body: "Run the full set whenever the agent changes, before anything reaches a customer.",
      mini: [],
    },
    {
      title: "Compare & listen",
      body: "See scores side by side and hear the difference between versions.",
      mini: [],
    },
  ],
}

/** QA reuses the live Improve items (metrics, dashboards, A/B). */
export const qaCopy = {
  label: "QA",
  headline: "Measure every conversation, objective and subjective.",
  body: "Track hard numbers and human judgment on every call and chat. Build dashboards, set alerts and A/B test a new version against the live one, promoting only the winner.",
}

/* Channels: which surfaces each modality runs on. */
export const channels = {
  label: "Channels",
  headline: "One agent, wherever your customers are.",
  body: "Deploy the same agent, knowledge and tools to phone, web, app and WhatsApp, by voice or by chat.",
  modes: [
    {
      name: "Voice",
      surfaces: [
        { name: "Phone", note: "Your numbers or SIP trunk" },
        { name: "Web", note: "Call from your website" },
        { name: "App", note: "In-app voice, iOS and Android" },
        { name: "WhatsApp", note: "Voice calls", soon: true },
      ],
    },
    {
      name: "Chat",
      surfaces: [
        { name: "Web", note: "Widget on your website" },
        { name: "App", note: "In-app chat, iOS and Android" },
        { name: "WhatsApp", note: "Business messaging" },
      ],
    },
  ],
}

/** How voice agents behave on a real line (shown under Channels). */
export const onTheCall = {
  label: "On voice calls",
  items: [
    {
      visual: "turn" as const,
      title: "Turn detection",
      body: "Knows when the caller has finished, not just paused, so it never talks over them or leaves dead air.",
    },
    {
      visual: "noise" as const,
      title: "Noise reduction",
      body: "Filters traffic, TV and background voices so the agent hears the caller, not the room.",
    },
    {
      visual: "voicemail" as const,
      title: "Voicemail detection",
      body: "Spots an answering machine and leaves your message, or hangs up and retries later.",
    },
    {
      visual: "interrupt" as const,
      title: "Interruptions & languages",
      body: "Stops the moment the caller cuts in, and switches language when they do.",
    },
  ],
}

export type OnTheCallVisual = (typeof onTheCall.items)[number]["visual"]

/** Tools & Integrations. Logo tiles are placeholders until confirmed. */
export const tools = {
  label: "Tools & Integrations",
  headline: "Works with the tools you already use.",
  body: "Give agents tools to act mid-conversation and a knowledge base to answer from, then connect your CRM, calendars and phone lines, or build your own with webhooks, the API and MCP.",
  items: [
    {
      title: "Tools",
      body: "Let agents look up accounts, book slots, take payments and send confirmations while they talk.",
    },
    {
      title: "Knowledge base",
      body: "Index your documents and policies so answers come from your sources, with citations.",
    },
  ],
  groups: [
    { label: "CRM & helpdesk", count: 4 },
    { label: "Calendars", count: 3 },
    { label: "Telephony", count: 4 },
    { label: "Developer", items: ["HoomanLabs MCP", "Webhooks", "REST API", "CEL"] },
  ],
}
