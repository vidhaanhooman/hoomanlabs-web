/**
 * /careers and /careers/[slug]. One open role for now (Product Designer).
 *
 * PLACEHOLDERS, marked TO CONFIRM: location and work setup, the application
 * address, benefits, team size, the hiring steps' timings and any salary
 * band. Values and how-we-work lines are drafted from how the product is
 * described on the site; edit them to match the team.
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

  values: [
    { title: "Calm over clever", body: "Customers should feel looked after, not impressed. We choose the quiet, clear option." },
    { title: "Real calls, not demos", body: "We judge work by how it sounds on a noisy line in Hindi at 9pm, not in a slide." },
    { title: "Own the outcome", body: "A call isn't done when it ends. We care whether the payment landed and the booking stuck." },
    { title: "Show, then tell", body: "We prototype early, listen to recordings together and let the work make the argument." },
  ],

  /** TO CONFIRM: every line. */
  how: [
    { label: "Where", value: "Bengaluru, hybrid" },
    { label: "Team", value: "Small, product-led team" },
    { label: "Stage", value: "Early, with customers live in production" },
    { label: "Hours", value: "Flexible, with shared overlap hours" },
  ],

  /** TO CONFIRM: every benefit. */
  benefits: [
    { title: "Meaningful equity", body: "Share in what we build together." },
    { title: "Health cover", body: "For you and your family." },
    { title: "Your setup", body: "A laptop and tools of your choice." },
    { title: "Learning budget", body: "Courses, books and conferences." },
    { title: "Time off", body: "Generous leave, and we mean it." },
    { title: "Team offsites", body: "A few times a year, in person." },
  ],

  process: [
    { step: "Intro call", body: "30 minutes with the founders about you, us and the role." },
    { step: "Portfolio review", body: "Walk us through two pieces of work you're proud of." },
    { step: "Working session", body: "A short, paid exercise on a real problem, done together." },
    { step: "Meet the team", body: "Conversations with the people you'd work with, then an offer." },
  ],

  nobody: { title: "Don't see your role?", body: "If you'd make the product better, write to us anyway with what you'd work on." },
}

export const roles: Role[] = [
  {
    slug: "product-designer",
    title: "Product Designer",
    team: "Design",
    location: "Bengaluru · Hybrid",
    type: "Full-time",
    summary: "Design the console teams use to build, test and run AI voice agents, and the site that explains it.",
    intro:
      "You'll own the experience of building and running a Hooman: writing its job, connecting it to systems, testing it with simulated callers and reading what happened on every call. It's a product where the hardest design problems are about trust, clarity and time, and where a good interface means a customer somewhere gets a better phone call.",
    sections: [
      {
        title: "What you'll do",
        items: [
          "Design end-to-end flows in the console, from first agent to thousands of calls a day.",
          "Turn complex systems (prompts, workflows, call traces, QA scores) into interfaces that feel simple.",
          "Prototype in Figma and in code, and test with real customers and real call recordings.",
          "Own and grow our design system, in light and dark.",
          "Shape how we explain the product, on the website and in demos.",
          "Work daily with engineering and the founders, from idea to shipped.",
        ],
      },
      {
        title: "What we're looking for",
        items: [
          "4+ years designing software products, with work you can walk us through end to end.",
          "Strong interaction and visual craft: hierarchy, type, spacing and motion that feel calm.",
          "Comfort with complex, data-heavy tools, and the judgement to make them simple.",
          "You write clearly and explain your decisions.",
          "You like being close to customers and the messy reality of how they work.",
        ],
      },
      {
        title: "Nice to have",
        items: [
          "Experience with AI products, conversational interfaces or developer tools.",
          "You prototype in code (React, Tailwind) or are keen to.",
          "You've built or run a design system.",
          "You speak an Indian language besides English.",
        ],
      },
    ],
  },
]

export const roleBySlug = (slug: string) => roles.find((r) => r.slug === slug)
export const roleHref = (slug: string) => `/careers/${slug}`
