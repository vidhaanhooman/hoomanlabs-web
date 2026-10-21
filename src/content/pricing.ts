import type { MenuPageId } from "@/content/platform"

/**
 * /pricing. Two plans, Pay as you go and Enterprise, from what the site
 * already states (usage-based self-serve; enterprise is call costs plus a
 * platform fee, with an optional outcome-based part) and the free credits
 * given at sign-up (₹1,000 or $10). No per-minute rate is published yet, so
 * none is shown. Shown in INR or USD with a toggle.
 */

export type Currency = "INR" | "USD"

export const credits: Record<Currency, string> = { INR: "₹1,000", USD: "$10" }

export const pricingPage = {
  seo: {
    title: "Pricing: Pay-as-you-go AI Voice Agents, with Free Credits",
    description:
      "Start free with ₹1,000 or $10 in credits, then pay only for what you use. Or choose Enterprise: call costs plus a platform fee, built with our engineers. AI voice and chat agents for every industry.",
    canonical: "https://www.hoomanlabs.com/pricing",
  },
  crumb: "Pricing",
  title: (c: Currency) => `Start free with ${credits[c]} in credits.`,
  line: "Build, test and run your first AI voice agent on free credits. Then pay only for what you use, or let our engineers build it with you.",
  plans: [
    {
      id: "payg",
      name: "Pay as you go",
      for: "For teams with developers who want to start today.",
      price: (c: Currency) => ({ big: credits[c], small: "in free credits to start" }),
      after: "Then pay only for what you use. No commitment.",
      features: [
        "Build voice and chat agents yourself",
        "Test with simulations before you go live",
        "Connect phone, web and app channels",
        "Live in hours to days",
        "Docs, MCP and email support",
      ],
      more: null as { label: string; href: string } | null,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      for: "For companies that want our engineers to build and run it with them.",
      price: () => ({ big: "Custom", small: "call costs + platform fee" }),
      after: "With an optional outcome-based component.",
      features: [
        "A dedicated forward-deployed engineer",
        "Built with your team, one flow at a time",
        "4–8 weeks per flow, faster after the first",
        "Full handover to your team",
      ],
      more: { label: "How an enterprise build runs", href: "/enterprise" },
    },
  ],
  included: {
    title: "Built on the HoomanLabs platform.",
    line: "Agents, voices, workflows, channels, integrations and testing: the parts behind every call.",
    pages: ["agents", "voice", "workflows", "channels", "integrations", "testing", "quality", "human-ai"] as MenuPageId[],
  },
  compare: {
    title: "Compare plans.",
    rows: [
      { k: "Free credits", payg: (c: Currency) => credits[c], ent: () => "Talk to us" },
      { k: "How you pay", payg: () => "For what you use", ent: () => "Call costs + platform fee" },
      { k: "Outcome-based pricing", payg: () => "—", ent: () => "Optional" },
      { k: "Who builds it", payg: () => "Your team", ent: () => "Our engineers, with your team" },
      { k: "Time to live", payg: () => "Hours to days", ent: () => "4–8 weeks per flow" },
      { k: "Support", payg: () => "Docs, MCP and email", ent: () => "Dedicated engineer" },
    ],
  },
  faq: [
    { q: "How do the free credits work?", a: "New accounts get ₹1,000 or $10 in credits to build, test and run their first agent before paying anything." },
    { q: "How does pay as you go work?", a: "It's usage-based: you pay only for what your agents use, with no commitment." },
    { q: "What does Enterprise cost?", a: "Enterprise pays the actual call costs plus a platform fee, with an optional outcome-based component. We share a quote after a short call about your flows." },
    { q: "Which currencies can I pay in?", a: "Indian rupees (INR) and US dollars (USD)." },
    { q: "Who builds the agents?", a: "On pay as you go, your team builds them on the platform. On Enterprise, our forward-deployed engineers build and run them with your team, then hand over." },
  ],
}
