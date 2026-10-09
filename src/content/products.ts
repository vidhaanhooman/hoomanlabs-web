/**
 * Product pages (/voice-ai, /chat-agents, /qa, /telephony). Draft copy, written to the
 * right length so the template can be judged. Final copy replaces this file.
 */

export type ProductSlug = "voice-ai" | "chat-agents" | "qa" | "telephony"

export type Product = {
  slug: ProductSlug
  name: string
  /** One line for the nav menu and footer. */
  summary: string
  headline: string
  subhead: string
  heroVisual: string
  features: { title: string; body: string; link: string; visual: string }[]
  how: { verb: string; body: string }[]
  ctaTitle: string
}

export const productList: Product[] = [
  {
    slug: "voice-ai",
    name: "Voice AI agents",
    summary: "Answer and make calls, in any language.",
    headline: "Voice agents that answer, call and get the job done.",
    subhead: "Natural voices in many languages, with tools that act during the call.",
    heroVisual: "Voice agent console: live call + configuration, 16:10",
    features: [
      {
        title: "Natural, multilingual voices",
        body: "Pick voices, accents and languages per agent, and switch mid-call when the caller does.",
        link: "Browse voices",
        visual: "Voice and language picker UI",
      },
      {
        title: "Actions during the call",
        body: "Agents look up accounts, book slots and send confirmations while they talk.",
        link: "See tools",
        visual: "Call transcript with tool calls UI",
      },
      {
        title: "Inbound and outbound at scale",
        body: "Answer every inbound call and run outbound campaigns on schedules and numbers you control.",
        link: "Campaigns",
        visual: "Campaign scheduler UI, 21:9",
      },
    ],
    how: [
      { verb: "Configure", body: "Set the prompt, tools, voice and model, then save it as a version." },
      { verb: "Test", body: "Run simulated callers against the version before it takes a real call." },
      { verb: "Go live", body: "Connect your numbers and start calling, with every conversation measured." },
    ],
    ctaTitle: "Hear a voice agent on your own use case.",
  },
  {
    slug: "chat-agents",
    name: "Chat agents",
    summary: "On your website, app and WhatsApp.",
    headline: "Chat agents for your website, app and WhatsApp.",
    subhead: "The same knowledge and tools as your voice agents, wherever customers type.",
    heroVisual: "Chat widget + conversation inbox, 16:10",
    features: [
      {
        title: "One agent, every channel",
        body: "Deploy once to your website widget, inside your app and on WhatsApp.",
        link: "Channels",
        visual: "Channel switcher UI",
      },
      {
        title: "Grounded in your knowledge",
        body: "Answers come from your libraries, documents and tables, with the source attached.",
        link: "Knowledge",
        visual: "Answer with cited sources UI",
      },
      {
        title: "Clean handoff to people",
        body: "When a person is needed, the conversation reaches your team with the full context.",
        link: "Handoff",
        visual: "Handoff to team inbox UI, 21:9",
      },
    ],
    how: [
      { verb: "Connect", body: "Add your knowledge and the tools the agent is allowed to use." },
      { verb: "Test", body: "Run simulated customers through every flow before launch." },
      { verb: "Embed", body: "Drop in the widget or connect WhatsApp, and watch every chat in one place." },
    ],
    ctaTitle: "See a chat agent answer from your own content.",
  },
  {
    slug: "qa",
    name: "QA and simulations",
    summary: "Test every agent before it goes live.",
    headline: "Know your agent works before your customers find out.",
    subhead: "Simulated customers, repeatable scenarios and automatic QA scores on every conversation.",
    heroVisual: "Simulation run: personas x scenarios with scores, 16:10",
    features: [
      {
        title: "Simulated personas",
        body: "Customers with goals, moods and accents that push your agent the way real ones do.",
        link: "Personas",
        visual: "Persona library UI",
      },
      {
        title: "Scenarios on every version",
        body: "Repeatable test cases for each flow, run again whenever the agent changes.",
        link: "Scenarios",
        visual: "Scenario results by version UI",
      },
      {
        title: "QA metrics on real conversations",
        body: "Score live conversations automatically, so regressions surface before customers notice.",
        link: "QA metrics",
        visual: "QA metrics over time UI, 21:9",
      },
    ],
    how: [
      { verb: "Define", body: "Write scenarios and choose personas for each flow you care about." },
      { verb: "Run", body: "Simulate conversations against a new version in minutes." },
      { verb: "Compare", body: "See scores side by side and ship the version that holds up." },
    ],
    ctaTitle: "Test an agent you already run.",
  },
  {
    slug: "telephony",
    name: "Telephony",
    summary: "Numbers, SIP and call routing.",
    headline: "Phone numbers and calling, built in.",
    subhead: "Buy local numbers, bring your own carrier, and route every call to the right agent.",
    heroVisual: "Numbers + routing console, 16:10",
    features: [
      {
        title: "Local numbers in minutes",
        body: "Pick local and toll-free numbers by country and assign them to agents or campaigns.",
        link: "Numbers",
        visual: "Number search and assignment UI",
      },
      {
        title: "Bring your own carrier",
        body: "Connect your existing SIP trunk and keep your numbers, rates and caller ID.",
        link: "SIP trunking",
        visual: "SIP trunk configuration UI",
      },
      {
        title: "Routing, transfers and hours",
        body: "Send each call to the right agent by number, time or intent, and transfer to your team when needed.",
        link: "Call routing",
        visual: "Call routing flow UI, 21:9",
      },
    ],
    how: [
      { verb: "Connect", body: "Buy numbers here or link your carrier over SIP." },
      { verb: "Route", body: "Assign numbers to agents and set hours, fallbacks and transfers." },
      { verb: "Scale", body: "Run inbound lines and outbound campaigns across countries." },
    ],
    ctaTitle: "Put an agent on your phone line.",
  },
]

export function getProduct(slug: ProductSlug) {
  const product = productList.find((p) => p.slug === slug)
  if (!product) throw new Error(`Unknown product: ${slug}`)
  return product
}
