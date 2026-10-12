/**
 * Content for the structured homepage (/lab/hero-call). DRAFT: every number,
 * customer, story and FAQ answer is a placeholder to confirm with the team.
 */

export const outcomes = {
  title: "What changes when agents take the calls.",
  body: "Three things customers measure in the first month.",
  items: [
    {
      tag: "Customer experience",
      value: "<1s",
      label: "to answer, day or night",
      body: "No hold music and no queue. Customers get answers in their own language, on the channel they chose.",
      points: ["Every call answered", "30+ languages", "Handoff with full context"],
    },
    {
      tag: "Growth",
      value: "3×",
      label: "faster speed to lead",
      body: "Call new leads within minutes, qualify them and book the sales call while interest is high.",
      points: ["Instant outbound", "Qualification on the call", "Meetings booked to calendar"],
    },
    {
      tag: "Efficiency",
      value: "71%",
      label: "resolved without a person",
      body: "Agents finish the job, not just the conversation: payments moved, bookings made, CRM updated.",
      points: ["Actions mid-call", "Fewer repeat calls", "Teams focus on hard cases"],
    },
  ],
}

export const stat = {
  value: "1.2 million",
  label: "conversations handled every week",
  body: "Across phone, web, app and WhatsApp, in 30+ languages.",
}

export const caseStudy = {
  eyebrow: "Case study",
  customer: "Halden Energy",
  quote: "Our agents now pick up every billing call, and our team only sees the ones that need a person.",
  person: "Name, Head of Customer Operations",
  results: [
    { value: "−42%", label: "average wait time" },
    { value: "68%", label: "calls resolved end to end" },
    { value: "6 weeks", label: "to go live" },
  ],
  video: "/media/case-study.mp4",
  poster: "/art/backdrops/home-build.png",
  link: { label: "Read the story", href: "#" },
}

export const features = [
  {
    id: "feature-design",
    eyebrow: "Agent design and workflows",
    title: "Design agents and workflows visually",
    body: "Write a prompt or build a flow, connect tools and add the automations that run before and after every call.",
    link: { label: "Explore Agents", href: "/platform/agents" },
  },
  {
    id: "feature-channels",
    eyebrow: "Omnichannel",
    title: "One agent on every channel",
    body: "Deploy the same agent, knowledge and tools to phone, web, app and WhatsApp, and keep the conversation when customers switch.",
    link: { label: "See channels", href: "/platform#product-channels" },
  },
  {
    id: "feature-guardrails",
    eyebrow: "Guardrails and testing",
    title: "Tested before a customer hears it",
    body: "Simulated callers run every version through your scenarios, with guardrails on what agents can say and do.",
    link: { label: "See simulations", href: "/platform#product-simulations" },
  },
  {
    id: "feature-analytics",
    eyebrow: "Analytics",
    title: "See every conversation, measured",
    body: "Outcomes, QA scores and trends in one dashboard, with alerts when something changes.",
    link: { label: "See QA", href: "/platform#product-qa" },
  },
] as const

export const resources = {
  title: "Everything in one platform.",
  links: [
    { label: "Docs", body: "Guides and concepts", href: "https://docs.hoomanlabs.com" },
    { label: "API reference", body: "Build on HoomanLabs", href: "#" },
    { label: "MCP server", body: "Manage agents from your editor", href: "/platform/agents#product-manage" },
    { label: "Changelog", body: "What shipped this month", href: "#" },
  ],
}

export const templates = {
  title: "Start from a template.",
  body: "Ready-made agents for common jobs. Pick one, adjust it to your process, test it and go live.",
  groups: [
    {
      name: "Support",
      items: [
        { title: "Order status", body: "Looks up orders and delivery times, then texts tracking links." },
        { title: "Returns and refunds", body: "Checks eligibility, starts the return and confirms by SMS." },
        { title: "Support triage", body: "Answers common questions and routes the rest with a summary." },
      ],
    },
    {
      name: "Sales",
      items: [
        { title: "Lead qualification", body: "Calls new leads, asks your questions and books the meeting." },
        { title: "Demo booking", body: "Finds a time that works and sends the calendar invite." },
        { title: "Win-back", body: "Reaches lapsed customers with an offer and logs the outcome." },
      ],
    },
    {
      name: "Collections",
      items: [
        { title: "Payment reminders", body: "Reminds before and after due dates and takes promises to pay." },
        { title: "Payment plans", body: "Offers instalments within your rules and confirms the plan." },
        { title: "Failed payments", body: "Explains the failure and helps the customer pay again." },
      ],
    },
    {
      name: "Operations",
      items: [
        { title: "Appointment booking", body: "Books, confirms and reschedules into your calendar." },
        { title: "Surveys and NPS", body: "Runs post-service surveys and writes answers to your CRM." },
        { title: "Verification calls", body: "Confirms identity and details before an order ships." },
      ],
    },
  ],
}

/** Third get-started path (the homepage already has self-serve and enterprise). */
export const developersPath = {
  name: "Developers",
  for: "For engineers who want to build on the API, SDKs and MCP.",
  rows: [
    { k: "How", v: "API keys, SDKs, webhooks and the MCP server" },
    { k: "Time to live", v: "Minutes to your first call" },
    { k: "Support", v: "Docs, examples and community" },
  ],
  cta: { label: "Read the docs", href: "https://docs.hoomanlabs.com" },
  more: null,
}

export const stories = {
  title: "Latest customer stories.",
  items: [
    { tag: "Collections", title: "How Halden Energy answers every billing call", art: "/art/backdrops/home-build.png", href: "#" },
    { tag: "Bookings", title: "Fewer no-shows for a 40-clinic network", art: "/art/backdrops/home-test.png", href: "#" },
    { tag: "Support", title: "Order queries in Hindi, English and Tamil", art: "/art/listen/listen-midday.png", href: "#" },
  ],
  all: { label: "All stories", href: "#" },
}

export const faqs = {
  title: "Questions, answered.",
  items: [
    {
      q: "How long does it take to go live?",
      a: "Self-serve teams can take their first call the same day. Enterprise builds take 4–8 weeks per flow, with the first flow the longest.",
    },
    {
      q: "Can we keep our existing phone numbers?",
      a: "Yes. Connect your carrier over SIP and keep your numbers and caller ID, or buy new local numbers.",
    },
    {
      q: "What happens when the agent can't help?",
      a: "It hands the call to your team with a summary, books a callback, or follows the fallback you set.",
    },
    {
      q: "Which languages do agents speak?",
      a: "30+ languages and accents, including Hindi, Tamil, English and Spanish, and they switch mid-call when the caller does.",
    },
    {
      q: "How is customer data protected?",
      a: "Data is encrypted in transit and at rest, access is role-based, and you choose where it is stored.",
    },
    {
      q: "How is it priced?",
      a: "Usage-based for self-serve. Enterprise pays actual call costs plus a platform fee, with an optional outcome-based component.",
    },
  ],
}
