import type { ProductStage } from "@/content/products"

/**
 * Content for the /lab/voice-ai page (the next Voice AI page). Kept apart from
 * products.ts so the live /voice-ai doesn't change until this is promoted.
 *
 * DRAFT: every number, use case and integration here is a placeholder to
 * confirm with the team.
 */

/* Hero: calls in, results out. */
export const flow = {
  sources: ["Inbound calls", "Outbound campaigns", "Scheduled callbacks"],
  lanes: [
    { id: "resolved", label: "Resolved by the agent", share: 71 },
    { id: "callback", label: "Callback booked", share: 14 },
    { id: "human", label: "Handed to your team, with context", share: 9 },
  ],
  impact: [
    { value: "100%", label: "of calls answered, day and night" },
    { value: "<1s", label: "to pick up, no hold music" },
    { value: "71%", label: "resolved without a person" },
    { value: "30+", label: "languages, switched mid-call" },
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
    body: "Call new leads within minutes, ask your qualifying questions and book the sales call.",
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
    body: "Run NPS and post-service calls in the caller's language and log every answer.",
    result: "More responses",
  },
]

/** Build, framed as full control. Replaces the live Build stage in the lab. */
export const buildStage: ProductStage = {
  id: "build",
  label: "Build",
  headline: "Full control over every part of the call.",
  body: "Write the prompt, pull in context, connect tools and decide what happens before, during and after each call. Work in the console or from your own editor.",
  backdrop: "",
  hero: "agent-config",
  items: [
    {
      title: "Prompt & flow",
      body: "Write a single prompt or design a node-based flow. Insert live values into prompts with CEL expressions, like customer.plan.",
      mini: [],
    },
    {
      title: "Context",
      body: "Pull live context before the call connects: pre-call APIs, your CRM, past conversations and memory.",
      mini: [],
    },
    {
      title: "Tools & knowledge base",
      body: "Connect the systems your agent acts in, and index the documents it can cite so answers come from your policies.",
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

/** How the agent behaves on a real phone line. */
export const onTheCall = {
  label: "On the call",
  headline: "Sounds natural on a real phone line.",
  body: "Real calls are noisy, people pause and interrupt, and sometimes nobody picks up. The agent handles all of it without a script for each case.",
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

/** Integration groups. Tiles are placeholders until logos are confirmed. */
export const integrations = {
  headline: "Works with the tools you already use.",
  body: "Connect your CRM, calendars and phone lines, or build your own with webhooks, the API and MCP.",
  groups: [
    { label: "CRM & helpdesk", count: 4 },
    { label: "Calendars", count: 3 },
    { label: "Telephony", count: 4 },
    { label: "Developer", items: ["HoomanLabs MCP", "Webhooks", "REST API", "CEL"] },
  ],
}
