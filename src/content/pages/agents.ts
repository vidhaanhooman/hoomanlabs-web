import type { Capability, Feature } from "@/components/product-page/blocks"
import type { MenuPageId } from "@/content/platform"

/**
 * /platform/agents, from the website content sheet ("Platform pages" tab for
 * the sections, written as features rather than questions; "Hoomanlabs" tab
 * for each feature's marketing pointer, with names reworded to plain SaaS
 * labels). Follows the product-page structure: hero, logos, three parts,
 * deep-dives, compact grid, proof, integrations, enterprise, FAQ, CTA.
 */
export const agentsPage = {
  crumb: "Agents",
  title: "AI voice agents that follow your rules.",
  line: "Write the job, connect your data, and your Hooman handles every call your way.",

  pillars: [
    { title: "Write the job", body: "Describe the role, rules and goal in plain language, like a brief for a new hire." },
    { title: "Connect your data", body: "Knowledge, tables, CRM context and tools, available on every call." },
    { title: "Control every step", body: "Add flows, transfers and versions wherever you need certainty." },
  ],

  /** Deep-dive 1: the pinned prompt. */
  prompt: {
    title: "Write the job once. It adapts to every caller.",
    line: "One prompt with your rules, your data and your tools, adjusting to each customer, language and case.",
  },

  /** Deep-dive 2: flows. */
  flows: {
    title: "Exact steps where compliance needs them.",
    body: "For most calls the prompt is enough. When a call must follow a script, add a flow that mixes free conversation with fixed steps.",
    features: [
      { name: "Conversation flows", pointer: "Mix free conversation with exact scripted steps where compliance needs it." },
      { name: "Conditional routing", pointer: "Every caller starts on the right path, decided by your data." },
      { name: "7 node types", pointer: "AI conversation, fixed conversation, code, API, branch, transfer to human and end call." },
    ],
  } satisfies Capability,

  /** Deep-dive 3: tools mid-call. */
  tools: {
    title: "Acts in your systems without breaking the conversation.",
    body: "Your Hooman looks up, books, updates and pays while it talks, so callers never wait in silence.",
    features: [
      { name: "Background tool calls", pointer: "Keeps the conversation going while it books, checks or updates in the background." },
      { name: "AI tool builder", pointer: "Describe the action; AI writes the tool and you test it in one click." },
      { name: "Shared tools", pointer: "Build a tool once; every Hooman in the team can use it." },
      { name: "Filler messages", pointer: "No dead air while systems respond." },
      { name: "Response formatting", pointer: "Raw API data becomes a clean, short answer the Hooman can use instantly." },
    ],
  } satisfies Capability,

  /** The compact grid (icons are set on the page). */
  grid: {
    title: "And everything around the call.",
    items: [
      { name: "Outbound context", pointer: "Every outbound call starts with the right loan, order or lead details." },
      { name: "Call history", pointer: "Picks up where the last call left off; customers never repeat themselves." },
      { name: "Customer profiles", pointer: "Knows the customer's history, preferences and open issues before saying hello.", soon: true },
      { name: "Warm transfer", pointer: "When a human is needed, the call moves with context, not a cold transfer." },
      { name: "Transfer hours", pointer: "Handoffs respect shift timings; after hours the Hooman takes a callback." },
      { name: "Version control", pointer: "Change anything without touching live calls; roll forward when tested." },
      { name: "Test calls", pointer: "Talk to your Hooman by phone or chat before anyone else does." },
      { name: "Agent types", pointer: "Talk, announce, or listen and score." },
    ] satisfies Feature[],
  },

  /** PLACEHOLDER until a real, approved quote arrives. */
  proof: {
    quote: "We wrote our collections process once, and every call now follows it to the letter, in the customer's own language.",
    name: "Name Surname",
    role: "Head of Customer Operations, Company",
    result: { figure: "71%", label: "of billing calls resolved without a person" },
  },

  integrations: {
    title: "Works with the systems you already run.",
    line: "Native connectors for your CRM, helpdesk and calendar, and your own APIs as tools.",
  },

  enterprise: {
    title: "Built for enterprise teams.",
    items: [
      { title: "Model and voice failover", body: "If a model or voice provider fails, calls keep going on a backup." },
      { title: "Workspaces and roles", body: "Separate brands, regions or teams, each with the right access." },
      { title: "DND list built in", body: "Opted-out numbers are never called, automatically." },
      { title: "Verified numbers", body: "KYC-verified business numbers for trust and pickup." },
    ],
  },

  faq: [
    {
      q: "Can it follow our exact compliance script?",
      a: "Yes. Fixed conversation steps read your wording word for word, and branches decide when they apply. Everything else stays natural conversation.",
    },
    {
      q: "Do we need developers to set it up?",
      a: "No. You write the job in plain language and set up tools in the console. Developers can go further with code steps, the API and MCP.",
    },
    {
      q: "Which systems does it connect to?",
      a: "Zoho CRM, Freshdesk, Zendesk and Google Calendar natively, plus any system with an API through tools. Call events and data land back where your team works.",
    },
    {
      q: "What happens when it can't help?",
      a: "It transfers the call to your team with a summary, inside your transfer hours. Outside them, it books a callback.",
    },
    {
      q: "Can we test it before it goes live?",
      a: "Yes. Edit a draft, try it with test calls by phone or chat, then publish. Live calls stay on the current version until you do.",
    },
    {
      q: "Which languages does it speak?",
      a: "English and major Indian languages, including Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati and Punjabi, and it can switch language mid-call.",
    },
  ],

  related: ["voice", "workflows", "testing", "human-ai"] satisfies MenuPageId[],
}
