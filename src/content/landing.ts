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
 * Indicative Gantt for an enterprise rollout (weeks). Flow 1 is the longest;
 * later flows reuse integrations, and the next flow's Foundation overlaps the
 * previous flow's pilot. Exact weeks are set per flow at the Foundation gate.
 */
export type GanttKind = "foundation" | "access" | "build" | "test" | "live" | "run"

export const enterpriseGantt = {
  title: "The full rollout, week by week.",
  body: "Indicative timeline for three flows. Exact weeks are set per flow at its Foundation gate.",
  weeks: 18,
  legend: [
    { kind: "foundation", label: "Foundation" },
    { kind: "access", label: "System access" },
    { kind: "build", label: "Build" },
    { kind: "test", label: "Simulation + UAT" },
    { kind: "live", label: "Pilot → 100%" },
    { kind: "run", label: "QA and monitoring" },
  ] as { kind: GanttKind; label: string }[],
  groups: [
    {
      name: "Flow 1",
      note: "First flow, most iterative",
      rows: [
        { label: "Foundation", kind: "foundation", start: 1, end: 2, gate: true },
        { label: "System access", kind: "access", start: 1, end: 3 },
        { label: "Build", kind: "build", start: 3, end: 5, gate: true },
        { label: "Simulation testing", kind: "test", start: 5, end: 6, gate: true },
        { label: "UAT", kind: "test", start: 6, end: 7, gate: true },
        { label: "Pilot 10–20%, then 100%", kind: "live", start: 7, end: 9, gate: true },
      ],
    },
    {
      name: "Flow 2",
      note: "Reuses flow 1 integrations",
      rows: [
        { label: "Foundation", kind: "foundation", start: 8, end: 9, gate: true },
        { label: "Build", kind: "build", start: 10, end: 11, gate: true },
        { label: "Simulation + UAT", kind: "test", start: 11, end: 12, gate: true },
        { label: "Pilot, then 100%", kind: "live", start: 13, end: 14, gate: true },
      ],
    },
    {
      name: "Flow 3",
      note: "Faster again",
      rows: [
        { label: "Foundation", kind: "foundation", start: 13, end: 13, gate: true },
        { label: "Build", kind: "build", start: 14, end: 15, gate: true },
        { label: "Simulation + UAT", kind: "test", start: 15, end: 16, gate: true },
        { label: "Pilot, then 100%", kind: "live", start: 17, end: 18, gate: true },
      ],
    },
    {
      name: "Across all flows",
      note: "",
      rows: [
        { label: "QA, reports and alerts", kind: "run", start: 8, end: 18 },
        { label: "Knowledge transfer", kind: "run", start: 9, end: 9, gate: true },
      ],
    },
  ] as {
    name: string
    note: string
    rows: { label: string; kind: GanttKind; start: number; end: number; gate?: boolean }[]
  }[],
}
