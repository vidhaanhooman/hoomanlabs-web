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
  /**
   * Optional lifecycle stages. When present, the product page shows these
   * three stage sections instead of the generic features + "How it works".
   */
  stages?: ProductStage[]
  /** Links at the bottom of the page to general FAQs and explanations. */
  resources?: ProductResources
}

export type ProductResources = {
  faqs: { label: string; href: string }[]
  guides: { label: string; href: string }[]
  /** "See all" links for each column. */
  allFaqs: string
  allGuides: string
}

/** Which recreated screen (or placeholder) a stage's big image shows. */
export type StageVisual =
  | "agent-config"
  | "knowledge"
  | "tools"
  | "analytics"
  | "simulation"
  | "campaign"
  | { placeholder: string }

/** One row of a small UI snippet on a stage card. */
export type MiniRow = { k: string; v?: string; tone?: "live" | "warn" | "muted"; mono?: boolean }

export type ProductStage = {
  id: "build" | "ship" | "improve"
  label: string
  headline: string
  body: string
  /** Painted backdrop behind the screen. */
  backdrop: string
  /** Main screen for the big image (bento layout). */
  hero: StageVisual
  items: { title: string; body: string; beta?: boolean; mini: MiniRow[] }[]
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
    // Draft questions/guides; hrefs are placeholders until the pages exist.
    resources: {
      faqs: [
        { label: "How do voice agents handle interruptions?", href: "#" },
        { label: "Which languages and accents are supported?", href: "#" },
        { label: "Can I keep my existing phone numbers?", href: "#" },
        { label: "How is customer data stored and protected?", href: "#" },
        { label: "What happens when the agent can't help?", href: "#" },
      ],
      guides: [
        { label: "What is a voice AI agent?", href: "#" },
        { label: "Prompts vs flows: which to start with", href: "#" },
        { label: "SIP trunking, explained", href: "#" },
        { label: "Measuring call quality with QA metrics", href: "#" },
      ],
      allFaqs: "#",
      allGuides: "https://docs.hoomanlabs.com",
    },
    // Content from the product brief. Items marked "draft" have placeholder
    // descriptions to confirm.
    stages: [
      {
        id: "build",
        hero: "agent-config",
        label: "Build",
        headline: "An agent that sounds like you, configured in an afternoon.",
        body: "Start with a single prompt or a full node-based flow. Pull live context before every call, connect tools that take real action, then feed structured outcomes straight into your stack.",
        backdrop: "/art/backdrops/home-build.png",
        items: [
          {
            // draft
            title: "Prompt & flow",
            body: "Write a single prompt, or design a node-based flow with branches, conditions and handoffs.",
            mini: [{ k: "Greet", v: "Start" }, { k: "Verify identity", v: "Step 2" }, { k: "Resolve or hand off", v: "Step 3" }],
          },
          {
            title: "Context & memory",
            body: "Pull live context before the call connects: pre-call APIs, your CRM, past-conversation history, and indexed knowledge libraries the agent can cite.",
            mini: [{ k: "CRM account HE-48213", v: "Loaded", tone: "live" }, { k: "Past calls", v: "3" }, { k: "Billing FAQ", v: "Cited" }],
          },
          {
            // draft
            title: "Tools",
            body: "Connect the systems your agent acts in, so it can look up accounts, book slots and send confirmations mid-call.",
            mini: [{ k: "Look up account", v: "On", tone: "live" }, { k: "Send SMS", v: "On", tone: "live" }, { k: "Book callback", v: "Off", tone: "muted" }],
          },
          {
            // draft
            title: "Analysis",
            body: "Turn every call into structured outcomes and send them straight into your stack.",
            mini: [{ k: "outcome", v: "resolved", mono: true }, { k: "payment_moved", v: "true", mono: true }, { k: "sentiment", v: "calm", mono: true }],
          },
        ],
      },
      {
        id: "ship",
        hero: "simulation",
        label: "Ship",
        headline: "Prove it works, put it on a line, and go, inbound or outbound.",
        body: "Stress-test against real scenarios and personas before anything goes live. Provision a number or connect your own carrier with SIP trunking, then take inbound or launch outbound campaigns at scale.",
        backdrop: "/art/backdrops/home-test.png",
        items: [
          {
            title: "Simulate",
            body: "Stress-test against real scenarios and personas, code-switching, refusals, edge cases, and hear the difference between versions before anything reaches a customer.",
            beta: true,
            mini: [{ k: "Frustrated caller", v: "Passed", tone: "live" }, { k: "Code-switching", v: "Passed", tone: "live" }, { k: "Asks for a human", v: "Review", tone: "warn" }],
          },
          {
            // draft
            title: "Telephony",
            body: "Provision a number in minutes, or bring your own carrier with SIP trunking.",
            mini: [{ k: "+44 20 7946 0018", v: "Inbound" }, { k: "+91 80 4718 2290", v: "Outbound" }, { k: "SIP trunk", v: "Connected", tone: "live" }],
          },
          {
            // draft
            title: "Webhooks",
            body: "Send call events and outcomes to your systems the moment they happen.",
            mini: [{ k: "call.started", v: "200", mono: true }, { k: "call.ended", v: "200", mono: true }, { k: "outcome.ready", v: "200", mono: true }],
          },
          {
            // draft
            title: "Go live",
            body: "Take inbound calls or launch outbound campaigns at scale, with schedules and retries.",
            mini: [{ k: "Inbound line", v: "Live", tone: "live" }, { k: "March reminders", v: "Running", tone: "live" }, { k: "Retries", v: "1" }],
          },
        ],
      },
      {
        id: "improve",
        hero: "analytics",
        label: "Improve",
        headline: "Measure everything objective and subjective, break nothing.",
        body: "Track hard numbers and human judgment on every call. Build dashboards, set alerts, and improve on a new version, A/B tested against the live one, promoting only the winner.",
        backdrop: "/art/backdrops/home-measure.png",
        items: [
          {
            // draft
            title: "Objective metrics",
            body: "Track resolution, handle time, transfers and drop-offs on every call.",
            mini: [{ k: "Resolution", v: "71.4%" }, { k: "Avg handle time", v: "2m 41s" }, { k: "Transfers", v: "9.1%" }],
          },
          {
            // draft
            title: "Subjective metrics",
            body: "Score tone, empathy and accuracy on every conversation with automated QA.",
            mini: [{ k: "Empathy", v: "4.6 / 5" }, { k: "Accuracy", v: "4.8 / 5" }, { k: "Tone", v: "4.5 / 5" }],
          },
          {
            title: "Dashboards & alerts",
            body: "Build the dashboards you need and set threshold or ratio alerts on the metrics that matter, routed to Slack or on-call.",
            beta: true,
            mini: [{ k: "Resolution below 65%", v: "Slack" }, { k: "Transfers above 15%", v: "On-call" }, { k: "Status", v: "Quiet", tone: "live" }],
          },
          {
            // draft
            title: "Branch, A/B, promote",
            body: "Branch a new version, A/B test it against the live one, and promote only the winner.",
            mini: [{ k: "v4 (live)", v: "87.9" }, { k: "v5 (testing)", v: "91.6", tone: "live" }, { k: "Promote v5", v: "Ready" }],
          },
        ],
      },
    ],
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
