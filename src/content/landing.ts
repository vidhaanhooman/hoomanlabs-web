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
  howLink: { label: "See the full process", href: "/how-it-works" },
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
    },
    {
      name: "Enterprise, built with our team",
      for: "For companies that want forward-deployed engineers to build and run it with them.",
      rows: [
        { k: "How", v: "Discovery, design, build, test, pilot, scale" },
        { k: "Time to live", v: "A few weeks, with a plan" },
        { k: "Support", v: "Dedicated FDE, custom integrations, SLA" },
      ],
      cta: { label: "Book a demo", href: "https://hoomanlabs.com/platform" },
    },
  ],
}
