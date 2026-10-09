import { componentHref } from "@/content/platform"

/**
 * New homepage structure (/lab/home). Order:
 * Hero, Logos, Try it, Impact, Use cases, How it works, Channels, Stories,
 * Security, Integrations, Two ways to start.
 *
 * DRAFT: copy, numbers, certifications and the two paths are placeholders to
 * confirm with the team.
 */

/** Build, Test, Run, Improve: the lifecycle in one section, each linking into Platform. */
export const howItWorks = {
  headline: "From first prompt to thousands of conversations.",
  body: "One platform for the whole lifecycle, so nothing gets lost between building, testing and running.",
  steps: [
    {
      verb: "Build",
      body: "Write the prompt or flow, add context and tools, pick the voice.",
      link: { label: "Agents", href: componentHref("agents") },
    },
    {
      verb: "Test",
      body: "Run simulated customers against every version before it goes live.",
      link: { label: "Simulations", href: componentHref("simulations") },
    },
    {
      verb: "Run",
      body: "Go live on phone, web, app and WhatsApp, with workflows around each conversation.",
      link: { label: "Channels", href: componentHref("channels") },
    },
    {
      verb: "Improve",
      body: "Score every conversation, A/B test new versions and promote the winner.",
      link: { label: "QA", href: componentHref("qa") },
    },
  ],
}

export const security = {
  headline: "Built for teams that answer to compliance.",
  body: "Your customers' data stays protected, and you stay in control of where it lives and who sees it.",
  items: [
    { title: "Encryption", body: "Data encrypted in transit and at rest, including call recordings and transcripts." },
    { title: "Certifications", body: "Placeholder: SOC 2, ISO 27001 and GDPR status to confirm." },
    { title: "Data residency", body: "Choose the region your data is stored and processed in." },
    { title: "Access & audit", body: "Role-based access, SSO and a full audit log of every change." },
  ],
  link: { label: "Security details", href: "#" },
}

/** The trigger for the full process page (/how-it-works). */
export const startPaths = {
  headline: "Two ways to get started.",
  body: "Build it yourself, or have our engineers build and run it with you.",
  paths: [
    {
      name: "Self-serve",
      for: "For teams with developers who want to start today.",
      rows: [
        { k: "How", v: "Sign up, build an agent, test it, connect a channel, go live" },
        { k: "Time to live", v: "Hours to days" },
        { k: "Support", v: "Docs, MCP and email" },
      ],
      cta: { label: "Start building", href: "#" },
      more: null,
    },
    {
      name: "Enterprise, built with our team",
      for: "For companies that want forward-deployed engineers to build and run it with them.",
      rows: [
        { k: "How", v: "Foundation, build, simulation, UAT, go live, one flow at a time" },
        { k: "Time to live", v: "4–8 weeks per flow, faster after the first" },
        { k: "Support", v: "Dedicated FDE, co-built with your team, full handover" },
      ],
      cta: { label: "Book a demo", href: "https://hoomanlabs.com/platform" },
      more: { label: "How an enterprise build runs", href: "/enterprise" },
    },
  ] as {
    name: string
    for: string
    rows: { k: string; v: string }[]
    cta: { label: string; href: string }
    more: { label: string; href: string } | null
  }[],
}

/**
 * How an enterprise build runs (generalised from our delivery framework; no
 * client specifics). Every step ends at a sign-off gate.
 */
export const enterpriseBuild = {
  eyebrow: "Enterprise",
  headline: "How an enterprise build runs.",
  body: "One flow at a time, co-built with your team, with a sign-off gate at every stage. Our forward-deployed engineers build it with you, then hand it over so you can run it yourselves.",
  ctaTitle: "Plan your first flow with us.",
  steps: [
    {
      name: "Foundation",
      body: "Our forward-deployed engineer works with your process team to turn your SOPs, happy and unhappy paths, into an agent SOP. System access is set up in parallel.",
      gate: "One north-star metric, 3–4 secondary metrics and go-live criteria agreed",
    },
    {
      name: "Build",
      body: "We build the agent and connect it to the APIs of the systems you already run: CRM, dialer, records and knowledge.",
      gate: "Agent working end to end on your stack",
    },
    {
      name: "Simulation testing",
      body: "Simulated callers run every path, including edge cases and refusals, with QA scoring each conversation.",
      gate: "Test report against the agreed metrics",
    },
    {
      name: "UAT",
      body: "Your team tests the agent on real scenarios before any customer hears it.",
      gate: "Your sign-off",
    },
    {
      name: "Go live",
      body: "A pilot on 10–20% of calls for one line, with your existing IVR as the fallback. Once validated, it scales to 100%, then the next flow begins.",
      gate: "Live on the full line",
    },
  ],
  notes: [
    "4–8 weeks per flow. The first takes longest; later flows reuse integrations and move faster.",
    "Every build ends with a knowledge transfer, so your team can run and change agents on the platform themselves.",
  ],
  split: {
    us: {
      title: "HoomanLabs brings",
      items: ["Agent build and integrations", "Testing, simulations and QA setup", "Guardrails, observability, reports and alerts"],
    },
    you: {
      title: "Your team brings",
      items: ["Process and domain knowledge, written SOPs", "Success criteria", "System access, API contracts, UAT and sign-off"],
    },
  },
}

/**
 * Indicative Gantt for one enterprise flow (weeks are 0-based, fractional).
 * Bars are shaded by owner. The cycle repeats per flow; later flows are faster.
 */
export type GanttOwner = "us" | "joint" | "you"

export const enterpriseGantt = {
  title: "One flow, week by week.",
  body: "About 4–8 weeks per flow. The cycle repeats for each flow, and later flows are faster because systems are reused.",
  weeks: 8,
  owners: [
    { owner: "us", label: "HoomanLabs" },
    { owner: "joint", label: "Joint" },
    { owner: "you", label: "Your team" },
  ] as { owner: GanttOwner; label: string }[],
  rows: [
    {
      name: "Foundation",
      detail: "Flow scope · SOP, happy and unhappy paths · knowledge base · success metrics (1 north-star + 3–4 secondary)",
      owner: "joint",
      start: 0,
      end: 2,
      gate: "SOP and success-criteria sign-off",
    },
    {
      name: "System access & API docs",
      detail: "Telephony · CRM · other systems, in parallel with Foundation",
      owner: "you",
      start: 0,
      end: 2,
    },
    {
      name: "Build",
      detail: "Prompt · persona · script · guardrails · tools · integrations",
      owner: "us",
      start: 2,
      end: 4.5,
    },
    {
      name: "Simulation testing",
      detail: "Test scenarios · QA metrics · run and re-run",
      owner: "us",
      start: 3.5,
      end: 5,
      gate: "Results sign-off",
    },
    {
      name: "UAT",
      detail: "Dedicated UAT · parallel fixes · validation",
      owner: "joint",
      start: 5,
      end: 6,
    },
    {
      name: "Go live",
      detail: "Controlled volume, then scale to 100%",
      owner: "joint",
      start: 6,
      end: 7.5,
      gateBefore: "Pilot → go-live",
    },
  ] as {
    name: string
    detail: string
    owner: GanttOwner
    start: number
    end: number
    gate?: string
    gateBefore?: string
  }[],
  note: "Weeks are indicative and set per flow at the Foundation gate.",
}

/** Homepage chapters (/lab/home): numbered labels over each group of sections. */
export const chapters = {
  impact: { n: "01", label: "Business impact", title: "Results you can measure from the first month." },
  useCases: { n: "02", label: "Use cases", title: "" },
  platform: { n: "03", label: "Platform", title: "One platform for the whole agent lifecycle." },
  proof: { n: "04", label: "Customers", title: "" },
}

/** Platform panels on the homepage, one per component. */
export const homePlatform = {
  agents: { title: "Agents", body: "Prompt or flow, context, voices and actions, with full control.", link: "Agents" },
  workflow: { title: "Workflow", body: "Campaigns, triggers and follow-ups around every conversation.", link: "Workflow" },
  simulations: { title: "Simulations", body: "Simulated customers test every version before it goes live.", link: "Simulations" },
  qa: { title: "QA", body: "Every conversation scored, with dashboards, alerts and A/B tests.", link: "QA" },
  tools: { title: "Tools & integrations", more: { label: "See everything on the platform", href: "/platform" } },
}

/** Hero copy for the proposed homepage. Proof figures are placeholders to confirm. */
export const heroCall = {
  title: "Every call answered.",
  aside: "Every task done.",
  body: "AI employees for every customer conversation, starting with the phone.",
  proof: ["10.66M+ calls handled", "4.6/5 from 12,000+ customer ratings"],
}
