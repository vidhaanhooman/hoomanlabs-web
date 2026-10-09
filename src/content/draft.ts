/**
 * Draft copy. Placeholder wording only, written to the right length so the
 * layout can be judged. Final copy replaces this file in the content phase.
 */

export const nav = {
  /** "Product" is a menu built from src/content/products.ts. */
  links: [
    { label: "Solutions", href: "#platform" },
    { label: "Customers", href: "#testimonials" },
    { label: "Pricing", href: "#" },
    { label: "Docs", href: "#" },
  ],
  signIn: { label: "Sign in", href: "#" },
}

/** One label per intent, reused everywhere it appears. */
export const ctas = {
  /** The HoomanLabs platform. */
  demo: { label: "Book a demo", href: "https://hoomanlabs.com/platform" },
  talk: { label: "Talk to an agent", href: "#" },
}

export const hero = {
  headline: "Build, test and run voice and chat agents your customers can trust.",
}

export const logos = {
  label: "Trusted by teams at",
}

export const panels = {
  build: {
    title: "Build agents in one place",
    body: "Prompts, tools, voices, languages and models, versioned from draft to live.",
    link: "Explore the builder",
  },
  test: {
    title: "Test before your customers do",
    body: "Simulated callers run every scenario against each version, with QA scores on every conversation.",
    link: "See how testing works",
  },
  useCases: {
    title: "Put agents on your busiest calls",
    body: "Collections, bookings, lead qualification, support, renewals and surveys, each ending in a result you can count.",
    link: "See all use cases",
  },
  deploy: {
    title: "Run campaigns at scale",
    body: "Schedule outbound calls, manage phone numbers and track every task.",
    link: "Campaigns",
  },
  measure: {
    title: "Measure every conversation",
    body: "Transcripts, outcomes and analysis for each call and chat.",
    link: "Analytics",
  },
}

/** Request router section (requests in, actions out). */
export const router = {
  title: "One agent, any request.",
  aside: "Every request, in any language, is matched to the right action in your systems.",
}

export const testimonials = {
  title: "What teams say after launch",
  count: 6,
}

export const platform = {
  title: "Everything an agent needs to do the work",
  items: [
    {
      title: "Knowledge and data",
      body: "Libraries, documents and tables your agents read from and write to.",
      visual: "Knowledge library UI",
    },
    {
      title: "Voices and languages",
      body: "Pick voices, accents and languages per agent.",
      visual: "Voice picker UI",
    },
    {
      title: "Tools and integrations",
      body: "Connect the systems your agents act in.",
      visual: "Integrations UI",
    },
  ],
}

/** "Hear it" call player section. */
export const listen = {
  title: "Hear an agent on your use case",
  body: "Pick a use case, press play, then get the same call on your phone.",
}

export const finalCta = {
  title: "Put your first agent in front of customers.",
}

/** Footer link columns. Placeholder hrefs until the real pages exist. */
export const footer = {
  tagline: "Voice and chat agents, tested before they talk to your customers.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
  ],
}
