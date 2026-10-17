import type { MenuPageId } from "@/content/platform"

/**
 * /platform/quality ("QA"; Observability has its own page), from the website content sheet
 * ("Platform pages" tab: the "AI QA" and "Post-call analysis" rows, merged
 * into one page; "Hoomanlabs" tab for each feature's marketing name). First
 * half Quality (judging every conversation), second half Insights (what
 * every call tells you). Sections are written as features, not the sheet's
 * questions, in the homepage's language like the other product pages.
 * Per review: post-conversation analytics first, then four judges, team
 * review and failure modes. Dashboards, alerts and logs live on
 * /platform/observability.
 */
export const qualityPage = {
  seo: {
    title: "AI Conversation QA and Post-Conversation Analytics",
    description:
      "Summarize, extract and classify every conversation, score it with LLM, classifier, code and audio judges, add team review, and find the failure modes worth fixing.",
  },
  crumb: "QA",
  title: "Every conversation scored, explained and searchable.",
  line: "Every conversation is summarized, classified and scored by four kinds of judge, so you can find what fails most and fix it.",

  /** The sheet's "What is it?" definition. */
  definition:
    "QA turns every conversation into a summary, data and scores, and points to the failures worth fixing.",

  /* ------------------------------------------------- Quality analysis */

  /** First: post-conversation analytics. */
  analytics: {
    label: "Post-conversation analytics",
    title: "Every conversation summarized, extracted and classified.",
    rows: [
      { id: "summary", title: "Summarize", body: "A short summary of every conversation, written for your team." },
      { id: "extract", title: "Extract", body: "Promise dates, amounts, reasons and preferences, as clean fields." },
      { id: "classify", title: "Classify", body: "Each conversation tagged with your own outcomes and categories, and re-run when you change the rules." },
    ],
  },

  /** Advanced metrics: four judge types (full width). */
  judges: {
    label: "Advanced metrics",
    title: "Four judges, one scorecard.",
    line: "Pick the right judge for each metric: an LLM for nuance, a classifier for consistency, code for hard rules and audio for how it sounded.",
    rows: [
      { id: "scorecards", title: "Scorecards", body: "Every conversation graded against the standards you set." },
      { id: "ready", title: "Ready metrics", body: "Catch repetition loops, impoliteness and drops in sentiment from day one." },
      { id: "sample", title: "All or a sample", body: "Score every conversation, or any slice by agent, campaign or outcome." },
    ],
  },

  /** Team review, kept separate from the automated judges. */
  humans: {
    label: "Team review",
    title: "Your reviewers have the final word.",
    rows: [
      { id: "review", title: "Review desk", body: "Reviewers tag issues in one click, with AI, self and team reviews side by side." },
      { id: "human", title: "Your human team too", body: "Upload your human agents' recordings and score them with the same metrics as your Hoomans." },
    ],
  },

  /** Failure modes, and how the metrics improve the agent. */
  fault: {
    label: "Failure modes",
    title: "See what fails most, and fix it.",
    rows: [
      { id: "modes", title: "Failure modes", body: "Failed metrics are grouped into patterns, so you see which problems happen most." },
      { id: "turn", title: "The turn behind it", body: "Every failure links to the exact turn, with what was heard, said and done." },
      { id: "fix", title: "Fix and re-test", body: "Replay the turn on a fix and save it as a scenario, so the agent gets better every week." },
    ],
  },









  faq: [
    {
      q: "What do we get after every conversation?",
      a: "A summary, the information you asked to extract as clean fields, and a classification into your own outcomes and categories, plus the recording and transcript.",
    },
    {
      q: "What's the difference between the four judges?",
      a: "LLM judges grade nuance like tone and policy, classifier judges answer fixed questions the same way every time, code judges check hard rules exactly, and audio judges score the recording itself.",
    },
    {
      q: "Where do people fit in?",
      a: "Team review sits alongside the judges: reviewers tag issues and have the final word, and you can score your human agents with the same metrics.",
    },
    {
      q: "How do metrics improve the agent?",
      a: "Failed metrics are grouped into failure modes. Each points to the turns behind it, which you can replay on a fix and save as a scenario for every future version.",
    },
  ],

  /** Next step first: Observability, then Testing. */
  related: ["observability", "testing"] satisfies MenuPageId[],
}
