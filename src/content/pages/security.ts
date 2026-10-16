import type { MenuPageId } from "@/content/platform"

/**
 * /platform/security, from the website content sheet: the Platform overview's
 * "Is it enterprise-ready?" and "What if something fails mid-call?" rows, and
 * the "Hoomanlabs" tab for each feature's name, pointer and status (Call
 * guardrails, Always-on failover, Always-on failover (STT), Warm handoff,
 * Office hours, Calling hours, DND shield, Verified calling, Workspaces &
 * roles). Written as features, in the homepage's language.
 * NEEDS FACTS: everything in `data` (certifications, data residency,
 * retention, model training, uptime). Nothing there is claimed until it is
 * confirmed; the page shows "Shared during evaluation" instead.
 * Transcription (STT) failover is In progress on the sheet (shown as soon).
 */
export const securityPage = {
  seo: {
    title: "Enterprise-Ready AI Voice Agents: Failover, Roles and Compliance",
    description:
      "AI voice agents built for regulated, high-volume businesses: automatic model and voice failover, call guardrails, workspaces and roles, DND shield, calling hours and verified calling.",
  },
  crumb: "Security & Reliability",
  title: "Always on, compliant and in your control.",
  line: "Failover at every layer, role-based access for every team, and telecom compliance built in.",

  /** The sheet's "Is it enterprise-ready?" answer, as the definition. */
  definition: "Built for regulated, high-volume businesses: calls keep going when a provider fails, every team gets the right access, and compliance runs before every dial.",

  panels: {
    /** Overview row 3: "What if something fails mid-call?" */
    failover: {
      label: "Always on",
      title: "If a provider fails, the call keeps going.",
      rows: [
        { id: "failover", title: "Always-on failover", body: "If a model or voice provider fails, calls keep going on a backup." },
        { id: "stt", title: "Transcription failover", body: "Coming soon: transcription keeps working even if a provider goes down." },
      ],
    },
    /** Overview row 3: guardrails on call length and closing behaviour. */
    guardrails: {
      label: "Call guardrails",
      title: "Every call stays within time and budget.",
      rows: [
        { id: "length", title: "Call guardrails", body: "Cap call length, with a graceful close or a handoff when time runs out." },
        { id: "handoff", title: "Warm handoff", body: "When a human is needed, the call moves with context, not a cold transfer." },
        { id: "hours", title: "Office hours", body: "Handoffs respect shift timings; after hours the Hooman takes a callback." },
      ],
    },
    /** Overview row 2: role-based access for every team. */
    roles: {
      label: "Workspaces & roles",
      title: "The right access for every team.",
      rows: [
        { id: "workspaces", title: "Workspaces", body: "Separate brands, regions or teams, each in its own workspace." },
        { id: "roles", title: "Roles", body: "Owners, org admins and admins, each with the right access." },
      ],
    },
    /** Overview row 2: telecom compliance built in. */
    telecom: {
      label: "Telecom compliance",
      title: "Compliance runs before every dial.",
      rows: [
        { id: "dnd", title: "DND shield", body: "Opted-out and DND numbers are never called, automatically." },
        { id: "calling", title: "Calling hours", body: "Calls only go out in the hours you allow, in every timezone." },
        { id: "verified", title: "Verified calling", body: "Verified business numbers, for trust and better pickup." },
      ],
    },
  },

  /** NEEDS FACTS: nothing here is a claim yet. */
  data: {
    label: "Your data",
    title: "Your data, in detail.",
    line: "We share our security and data practices in full during evaluation, so your security team can review them with ours.",
    items: [
      // TO CONFIRM: certifications held (none are claimed until confirmed).
      { id: "certifications", title: "Certifications", value: "Shared during evaluation" },
      // TO CONFIRM: where call data is stored and processed.
      { id: "residency", title: "Data residency", value: "Shared during evaluation" },
      // TO CONFIRM: how long recordings and transcripts are kept, and whether it is configurable.
      { id: "retention", title: "Retention", value: "Shared during evaluation" },
      // TO CONFIRM: whether customer data is used to train models.
      { id: "training", title: "Model training", value: "Shared during evaluation" },
      // TO CONFIRM: uptime commitment. The live status page is public.
      { id: "uptime", title: "Uptime", value: "Live status page", href: "https://status.hoomanlabs.com/" },
    ],
  },

  faq: [
    {
      q: "What happens if a model or voice provider fails mid-call?",
      a: "Your Hooman switches to a backup automatically and the call keeps going. Transcription failover is coming soon.",
    },
    {
      q: "Can we stop calls from running too long?",
      a: "Yes. Call guardrails cap call length and end gracefully or hand off to a person, and handoffs only happen inside your team's office hours.",
    },
    {
      q: "Can different teams have different access?",
      a: "Yes. Set up workspaces for separate brands, regions or teams, and give each member the right role.",
    },
    {
      q: "How do you keep outbound calling compliant?",
      a: "DND and opted-out numbers are skipped automatically, calls only go out in the calling hours you set, and you call from verified business numbers.",
    },
    {
      q: "Where is our data stored, and how long is it kept?",
      a: "We share our data residency, retention and security details during evaluation. Talk to our team and we'll walk your security team through them.",
    },
  ],

  /** Next step first, then a related page. */
  related: ["quality", "channels"] satisfies MenuPageId[],
}
