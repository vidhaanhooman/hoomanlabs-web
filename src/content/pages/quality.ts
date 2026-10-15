import type { MenuPageId } from "@/content/platform"

/**
 * /platform/quality ("Quality & Insights"), from the website content sheet
 * ("Platform pages" tab: the "AI QA" and "Post-call analysis" rows, merged
 * into one page; "Hoomanlabs" tab for each feature's marketing name). First
 * half Quality (judging every conversation), second half Insights (what
 * every call tells you). Sections are written as features, not the sheet's
 * questions, in the homepage's language like the other product pages.
 * The sheet's proof metric is TBD, so the definition runs without one.
 * Auto-improve is in development (shown as Coming soon).
 */
export const qualityPage = {
  seo: {
    title: "AI Call QA and Post-Call Analytics",
    description:
      "Score every AI and human call with LLM, classifier, code, audio and human judges, see the exact turn behind each failure, and turn every call into summaries, outcomes and data.",
  },
  crumb: "Quality & Insights",
  title: "Every conversation scored, explained and searchable.",
  line: "Five kinds of judges score every call against your standards and point to the exact turn behind each failure. Then every call becomes a summary, an outcome and data your team can use.",

  /** The sheet's "What is it?" definitions, joined. */
  definition:
    "Quality & Insights scores every conversation against your standards and points to the turn behind every failure, then turns each call into a summary, an outcome and structured data.",

  /** Sheet "AI QA" section 1 (the signature section): five judges, one scorecard. */
  judges: {
    label: "Scorecards",
    title: "Five judges, one scorecard.",
    line: "Pick the right judge for each rule: AI for nuance, classifiers for consistency, code for hard rules, audio for sound quality and people for the final word.",
    rows: [
      { id: "scorecards", title: "Scorecards", body: "Every conversation graded against the standards you set." },
      { id: "ready", title: "Ready scorecards", body: "Catch repetition loops, impoliteness and drops in sentiment from day one." },
    ],
  },

  /** Sheet "AI QA" section 7: where exactly it went wrong. */
  fault: {
    label: "Fault finder",
    title: "Every failure points to the turn behind it.",
    rows: [
      { id: "fault", title: "Fault finder", body: "A failed score links to the exact turns that caused it." },
      { id: "trace", title: "Turn trace", body: "Every pause explained: see which stage added delay on any turn." },
      { id: "heard", title: "Heard vs said", body: "What your Hooman planned to say, and what the caller actually heard." },
      { id: "tools", title: "Trace", body: "Every tool, API and knowledge lookup, with how fast it was and what came back." },
    ],
  },

  /** Sheet "AI QA" sections 8 to 10: ready scorecards, audits, alerts. */
  watch: {
    label: "Audits and alerts",
    title: "Score a sample or everything, and hear when quality drops.",
    rows: [
      { id: "audits", title: "Audits", body: "Score any slice of calls by agent, campaign, outcome or date, the latest or a random sample." },
      { id: "alerts", title: "Quality alerts", body: "An email the moment a scorecard's pass rate falls below your line." },
      { id: "watchtower", title: "Watchtower", body: "Alerts when call volume, pickup or quality drifts." },
    ],
  },

  /** Sheet "AI QA" sections 6 and 11: people in the loop, and your human team. */
  humans: {
    label: "Human review",
    title: "Your reviewers, and your human team, on the same scorecard.",
    rows: [
      { id: "review", title: "Review desk", body: "Reviewers tag issues in one click, with AI, self and team reviews side by side." },
      { id: "human", title: "Human team QA", body: "Upload your human agents' recordings and score them with the same judges as your Hoomans." },
    ],
  },

  /** Sheet "AI QA" section 12: QA that makes the agent better. */
  improve: {
    label: "Improve",
    title: "Every finding becomes a fix.",
    line: "Turn a failed moment into a test, replay it with your changes, and soon let reviews suggest the fix for you to approve.",
    rows: [
      { id: "tests", title: "Never-again tests", body: "Turn any real moment into a test, so a mistake never happens twice." },
      { id: "replay", title: "Replay & re-run", body: "Fix the prompt, replay the exact turn and see the new answer." },
      { id: "auto", title: "Auto-improve", body: "Scorecards and reviews turn into prompt and playbook fixes, with you approving each one.", soon: true },
    ],
  },

  /** The second half of the page: the sheet's "Post-call analysis" page. */
  insights: {
    label: "Insights",
    title: "Every call, turned into answers and data.",
    line: "Summaries, outcomes and fields for every call, questions answered across all of them, and the data in your systems the moment a call ends.",
  },

  /** Sheet "Post-call analysis" section 1. */
  record: {
    label: "Call record",
    title: "Everything about a call, on one screen.",
    rows: [
      { id: "record", title: "Call record", body: "Recording, transcript, actions and data, side by side." },
      { id: "actions", title: "Action timeline", body: "Every lookup, booking and failure, shown at the moment it happened." },
      { id: "health", title: "Call health check", body: "Speed, pacing and turn-taking, measured against your typical range." },
      { id: "xray", title: "Audio X-ray", body: "Hear what the caller said, what the AI heard and how sure it was." },
    ],
  },

  /** Sheet "Post-call analysis" sections 2 to 4. */
  debrief: {
    label: "Debrief",
    title: "The gist, the outcome and the details, from every call.",
    rows: [
      { id: "debrief", title: "Debrief", body: "A short AI summary of every conversation, written for your team." },
      { id: "outcomes", title: "Outcomes", body: "Each call tagged with your own outcomes, and re-run when you change the rules." },
      { id: "capture", title: "Data capture", body: "Promise dates, amounts, reasons and preferences, as clean fields." },
      { id: "checklist", title: "Call checklist", body: "The same questions asked of every call, answered in the same format." },
    ],
  },

  /** Sheet "Post-call analysis" section 5. */
  ask: {
    label: "Ask AI",
    title: "Ask anything across all your calls.",
    rows: [
      { id: "ask", title: "Ask AI", body: "Ask in plain language and get answers from thousands of conversations." },
      { id: "log", title: "Conversation log", body: "Every call and chat recorded, transcribed and searchable." },
    ],
  },

  /** Sheet "Post-call analysis" sections 6 and 7. */
  dashboards: {
    label: "Dashboards",
    title: "Your numbers, on your dashboard.",
    rows: [
      { id: "insights", title: "Insights", body: "Volume, outcomes and performance over time, for every Hooman." },
      { id: "custom", title: "Custom dashboards", body: "Pick the metrics that matter, from outcomes to scorecard pass rates, and chart them side by side." },
      { id: "reports", title: "Reports", body: "Share results with leadership as a downloadable report." },
    ],
  },

  /** Sheet "Post-call analysis" section 8 (links to Integrations & API). */
  data: {
    label: "Your systems",
    title: "The data reaches your systems the moment a call ends.",
    link: { label: "See integrations", href: "/platform/integrations" },
    rows: [
      { id: "events", title: "Call events", body: "Your CRM knows the moment a call starts, ends or transfers." },
      { id: "workflows", title: "Workflows", body: "Push summaries, outcomes and fields wherever they're needed." },
      { id: "api", title: "Hooman API", body: "Pull any call's record, scores and fields into your own tools." },
    ],
  },

  faq: [
    {
      q: "What can a scorecard check?",
      a: "Anything you can describe or define. LLM judges grade nuanced behaviour like tone and policy, classifier judges answer fixed questions consistently, code judges check hard rules exactly, audio judges score the recording itself, and your reviewers have the final word.",
    },
    {
      q: "Do we have to write scorecards from scratch?",
      a: "No. Ready scorecards catch repetition loops, impoliteness and drops in customer sentiment from day one, and you can add your own rules alongside them.",
    },
    {
      q: "Can we score every call, or only a sample?",
      a: "Either. Run audits on all calls or any slice, by agent, campaign, outcome, duration or date, using the latest calls or a random sample.",
    },
    {
      q: "Can we QA our human agents too?",
      a: "Yes. Upload your human team's call recordings and score them with the same judges and scorecards as your Hoomans.",
    },
    {
      q: "What do we get after every call?",
      a: "A recording, a transcript, a short summary, an outcome in your own categories, the fields you asked for, and the answers to your call checklist.",
    },
    {
      q: "Does the call data reach our CRM?",
      a: "Yes. Call events and workflows push summaries, outcomes and fields to your CRM or database the moment a call ends, and the API lets you pull them any time.",
    },
  ],

  /** Next step first (the sheet's related pages: Testing, Integrations & API). */
  related: ["testing", "integrations"] satisfies MenuPageId[],
}
