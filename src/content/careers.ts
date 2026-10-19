/**
 * /careers and /careers/[slug]. One open role for now (Forward Deployed
 * Engineer). The hiring process shows on each role's page.
 *
 * PLACEHOLDERS, marked TO CONFIRM: location and work setup, the application
 * address, the hiring steps' timings, any salary band, and the FDE role's
 * details (drafted from how the product is described on the site; edit them
 * to match the team).
 */

export type Role = {
  slug: string
  title: string
  team: string
  /** TO CONFIRM */
  location: string
  /** TO CONFIRM */
  type: string
  summary: string
  intro: string
  sections: { title: string; items: string[] }[]
}

/** TO CONFIRM: where applications go. */
export const APPLY_EMAIL = "careers@hoomanlabs.com"

export const careersPage = {
  seo: {
    title: "Careers at HoomanLabs",
    description: "Help build AI employees for every customer conversation. See open roles at HoomanLabs.",
  },
  crumb: "Careers",
  title: "Build the people your customers talk to.",
  line: "We make AI employees that hold real customer conversations, in their language, on every channel. We're a small team, and every hire shapes what we become.",

  process: [
    { step: "Intro call", body: "30 minutes with the founders about you, us and the role." },
    { step: "Technical deep dive", body: "Walk us through something you built and shipped: the problem, your choices and what broke." },
    { step: "Working session", body: "A short, paid exercise on a real problem, done together." },
    { step: "Meet the team", body: "Conversations with the people you'd work with, then an offer." },
  ],

  nobody: { title: "Don't see your role?", body: "If you'd make the product better, write to us anyway with what you'd work on." },
}

/** TO CONFIRM: the FDE role's details, location and type. */
export const roles: Role[] = [
  {
    slug: "forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    team: "Engineering",
    location: "Bengaluru · Hybrid",
    type: "Full-time",
    summary: "Work with our customers to take their AI agents from first call to thousands a day, in their systems and their language.",
    intro:
      "You'll sit between our customers and the product. You'll learn how a customer's team really works, design the agent, flow and tools that fit, connect it to their systems, and stay until it holds up on real calls at scale. What you learn in the field comes straight back into the product.",
    sections: [
      {
        title: "What you'll do",
        items: [
          "Own customer launches end to end: scope the use case, build the agent, test it and take it live.",
          "Write prompts, flows and conditions, and design the tools, pre-call APIs and webhooks they need.",
          "Connect agents to customers' CRMs, helpdesks, telephony and internal APIs.",
          "Read call logs and QA results, find why a call went wrong, and fix it.",
          "Build reusable tools, templates and scripts so the next launch is faster.",
          "Bring what you see with customers back to product and engineering.",
        ],
      },
      {
        title: "What we're looking for",
        items: [
          "3+ years as a software engineer, solutions engineer or similar, shipping to real users.",
          "Strong with APIs and integrations: REST, webhooks, auth, and debugging other people's systems.",
          "Comfortable writing code (TypeScript or Python) and reading logs under pressure.",
          "You enjoy working directly with customers and explain technical things clearly.",
          "You care whether the outcome landed, not just whether the code shipped.",
        ],
      },
      {
        title: "Nice to have",
        items: [
          "Experience with LLMs, prompt design or voice and telephony (SIP, IVR, contact centres).",
          "You've worked in a customer-facing engineering role at a startup.",
          "You speak an Indian language besides English.",
        ],
      },
    ],
  },
]

export const roleBySlug = (slug: string) => roles.find((r) => r.slug === slug)
export const roleHref = (slug: string) => `/careers/${slug}`
