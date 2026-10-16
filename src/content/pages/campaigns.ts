import type { MenuPageId } from "@/content/platform"

/**
 * /platform/campaigns, from the website content sheet ("Platform pages" tab
 * for the sections, "Hoomanlabs" tab for each feature's name and pointer).
 * Sections are written as features, not the sheet's questions, in the
 * homepage's language like Agents, Workflows and Voice.
 * SAMPLE: the proof metric, the run figures, caller IDs and concurrency numbers.
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
  definition: "Campaigns are how Hoomans call customers at scale: Outreach campaigns call a list in batches, and Always-on campaigns call in real time, the moment your systems add someone.",
  /** SAMPLE: the sheet's proof strip is "TBD: reach/pickup metric". */
  proof: { quote: "64% pickup", by: "on reminder campaigns, with number rotation" },

  panels: {
    /** Sheet section 1. */
    list: {
      label: "Outreach campaigns · Batch",
      title: "Upload a list. Call it in batches.",
      rows: [
        { id: "outreach", title: "Batch calling", body: "Upload a list with per-customer data and call through it at the pace you set." },
        { id: "briefing", title: "Pre-call briefing", body: "Every outbound call starts with the right loan, order or lead details." },
        { id: "ab", title: "A/B testing", body: "Split a list between two agent versions and compare outcomes." },
      ],
    },
    /** Sheet section 2. */
    realtime: {
      label: "Always-on · Real-time",
      title: "Calls new leads in real time.",
      rows: [
        { id: "always", title: "Real-time calling", body: "A new lead gets a call in seconds, automatically, with no list to upload." },
        { id: "api", title: "Hooman API", body: "Add a call to a campaign from your CRM, website or app." },
        { id: "callback", title: "Call-back step", body: "Any workflow can put a Hooman on the phone." },
      ],
    },
  },

  /** Sheet sections 3 and 5: a campaign running. */
  run: {
    label: "A campaign, running",
    title: "Retries, slots and caller IDs, handled.",
    line: "Calls go out in parallel, each outcome decides what happens next, and caller IDs rotate for better pickup.",
  },

  /** Sheet sections 3–5: what every campaign gets, in one grid of six. */
  features: {
    title: "Everything a campaign needs, built in.",
    line: "Pickup, pace and compliance are handled on every dial, for batch and real-time campaigns alike.",
    items: [
      { id: "rotation", title: "Number rotation & caller IDs", body: "Verified caller IDs rotate across your numbers for better pickup." },
      { id: "retries", title: "Smart retries", body: "Retry by outcome, with set gaps and a limit on attempts." },
      { id: "concurrency", title: "Concurrency", body: "Choose how many calls run at once; the rest wait in the queue." },
      { id: "hours", title: "Calling hours", body: "Calls only go out in the hours you allow." },
      { id: "dnd", title: "DND protection", body: "Opted-out and DND numbers are skipped before every dial." },
      { id: "double", title: "No double-dial", body: "A customer already reached is never called twice in the same window." },
    ],
  },


  faq: [
    {
      q: "What's the difference between Outreach and Always-on?",
      a: "Outreach campaigns are batch: upload a list and the Hooman calls through it. Always-on campaigns are real-time: your CRM, website or a workflow adds a person and they're called within seconds.",
    },
    {
      q: "How do I start a campaign?",
      a: "Upload a list with the details each call needs, pick the Hooman that makes the calls, set calling hours and retries, and start. You can also add calls one by one through the API.",
    },
    {
      q: "Can calls start from our CRM or website?",
      a: "Yes. Always-on campaigns call in real time: they accept new calls through the API or from a workflow, so a new lead or a missed payment gets a call within seconds.",
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
      a: "Yes. Split a campaign between two agents or two versions, then compare pickup and outcomes.",
    },
  ],

  /** Next step first, then a related page. */
  related: ["workflows", "integrations"] satisfies MenuPageId[],
}
