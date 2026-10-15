import type { MenuPageId } from "@/content/platform"

/**
 * /platform/campaigns, from the website content sheet ("Platform pages" tab
 * for the sections, "Hoomanlabs" tab for each feature's name and pointer).
 * Sections are written as features, not the sheet's questions, in the
 * homepage's language like Agents, Workflows and Voice.
 * SAMPLE: the proof metric, the run figures and the concurrency numbers.
 */
export const campaignsPage = {
  seo: {
    title: "AI Outbound Calling Software at Scale",
    description: "Upload a list or trigger calls from your systems. AI voice agents call thousands of customers with smart retries, calling hours and DND built in.",
  },
  crumb: "Campaigns",
  title: "Thousands of calls, done right.",
  line: "Upload a list or trigger calls from your systems; smart retries, calling hours and DND are built in.",

  /** The sheet's "What is it?" definition block. */
  definition: "Campaigns are how Hoomans call customers at scale, from a one-time list or an always-on queue triggered by your systems.",
  /** SAMPLE: the sheet's proof strip is "TBD: reach/pickup metric". */
  proof: { quote: "64% pickup", by: "on reminder campaigns, with number rotation" },

  panels: {
    /** Sheet section 1. */
    list: {
      label: "Outreach campaigns",
      title: "Upload a list. Every call is personal.",
      rows: [
        { id: "outreach", title: "Outreach campaigns", body: "Upload a list with per-customer data and start calling." },
        { id: "briefing", title: "Pre-call briefing", body: "Every outbound call starts with the right loan, order or lead details." },
      ],
    },
    /** Sheet section 2. */
    realtime: {
      label: "Always-on",
      title: "Calls new leads in seconds.",
      rows: [
        { id: "always", title: "Always-on outreach", body: "A new lead gets a call in seconds, automatically." },
        { id: "api", title: "Hooman API", body: "Add a call to a campaign from your CRM, website or app." },
        { id: "callback", title: "Call-back step", body: "Any workflow can put a Hooman on the phone." },
      ],
    },
    /** Sheet section 6. */
    split: {
      label: "A/B testing",
      title: "Find the script that works, on live calls.",
      rows: [
        { id: "ab", title: "Agent A/B testing", body: "Split live traffic between agents or versions and compare outcomes." },
        { id: "live", title: "Live edits", body: "Change a running campaign without stopping it." },
        { id: "broadcast", title: "Broadcast", body: "One-way announcements to a whole list, when there's nothing to discuss." },
      ],
    },
  },

  /** Sheet sections 3 and 5: a campaign running. */
  run: {
    label: "A campaign, running",
    title: "Retries, slots and caller IDs, handled.",
    line: "Calls go out in parallel, each outcome decides what happens next, and caller IDs rotate for better pickup.",
    rows: [
      { id: "retries", title: "Smart retries", body: "Retry by outcome, with set gaps and priorities." },
      { id: "slots", title: "Concurrency", body: "Choose how many calls run at once." },
      { id: "rotation", title: "Number rotation", body: "Rotate verified caller IDs for better pickup, using the numbers set up in Channels." },
    ],
  },

  /** Sheet section 4. */
  consent: {
    title: "Consent and compliance, built in.",
    line: "Suppression runs before every dial, so the wrong people are never called.",
    items: [
      { id: "hours", title: "Calling hours", body: "Calls only go out in the hours you allow." },
      { id: "dnd", title: "DND shield", body: "Opted-out and DND numbers are skipped automatically." },
      { id: "double", title: "No double-dial", body: "Customers already contacted are never called twice." },
    ],
  },

  faq: [
    {
      q: "How do I start a campaign?",
      a: "Upload a list with the details each call needs, pick the Hooman that makes the calls, set calling hours and retries, and start. You can also add calls one by one through the API.",
    },
    {
      q: "Can calls start from our CRM or website?",
      a: "Yes. Always-on campaigns accept new calls through the API or from a workflow, so a new lead or a missed payment gets a call within seconds.",
    },
    {
      q: "Who gets retried, and when?",
      a: "You set retries by outcome: for example, no answer after two hours, voicemail the next morning, and busy after thirty minutes, with a limit on attempts.",
    },
    {
      q: "How do you keep campaigns compliant?",
      a: "Numbers on DND or opt-out lists are skipped, customers already contacted aren't called again, and calls only go out inside the calling hours you set.",
    },
    {
      q: "Can we test two scripts against each other?",
      a: "Yes. Split a running campaign between two agents or two versions, then compare pickup, outcomes and quality scores.",
    },
  ],

  /** Next step first, then a related page. */
  related: ["workflows", "integrations"] satisfies MenuPageId[],
}
