import type { MenuPageId } from "@/content/platform"

/**
 * /platform/testing, from the website content sheet ("Platform pages" tab
 * for the sections, "Hoomanlabs" tab for each feature's name and pointer:
 * Mystery callers, Spot checks, Test suites, Versioning, Never-again tests,
 * Replay & re-run, Try-it-now, Build-test loop). Sections are written as
 * features, not the sheet's questions, in the homepage's language like the
 * other product pages. The sheet has no proof strip for this page.
 * Run numbers, personas and versions on the screens are sample data.
 */
export const testingPage = {
  seo: {
    title: "Voice Agent Testing and Simulation",
    description: "Talk to your agent in minutes, test every version with simulated customers and full suites, fix any turn and A/B test changes before they go live.",
  },
  crumb: "Testing",
  title: "Know it's ready before a customer hears it.",
  line: "Talk to it in minutes, run simulated customers against every version, fix any turn, and A/B test changes before they go live.",

  /** The sheet's "What is it?" definition block. */
  definition: "Testing is how you try, simulate and fix a Hooman before customers meet it, then prove each change before everyone gets it.",

  /** Try it now, first: build an agent and talk to it on a web call. */
  try: {
    label: "Try it now",
    title: "Build an agent and talk to it in minutes.",
    rows: [
      { id: "loop", title: "Build-test loop", body: "Edit, talk and check the logs in one screen, without leaving the agent." },
      { id: "talk", title: "Talk to it on the web", body: "Start a web call or chat with your Hooman from the editor, with sample customer data." },
    ],
  },

  /** Simulations and test suites, in one section (full width): personas scored against a checklist. */
  callers: {
    label: "Simulations & test suites",
    title: "Simulated customers talk to your Hooman before real ones do.",
    line: "Create personas, run them all as a suite against each draft, and score every conversation against a checklist and the outcome you expect.",
    rows: [
      { id: "personas", title: "Personas", body: "Rushed, angry, elderly or switching language: create who talks to your Hooman and how they behave." },
      { id: "checklist", title: "Checklist and outcome", body: "Each conversation is scored on the steps that must happen and how it should end." },
      { id: "suite", title: "Test suites", body: "Run every persona against a draft before each release; live conversations stay on the published version." },
    ],
  },

  panels: {
    /** Spot checks and turn replay, in one: find, re-run, save as a scenario. */
    checks: {
      label: "Spot checks & replay",
      title: "Find an issue, fix it, and never see it again.",
      rows: [
        { id: "find", title: "Flag the moment", body: "Spot a wrong reply or tool call at a specific turn, in a simulation or a real conversation in post-call analytics." },
        { id: "rerun", title: "Replay the turn", body: "Fix it and replay that exact turn to see the new answer straight away." },
        { id: "save", title: "Simulate and save it", body: "Simulate that moment and save it as a scenario or match case, so every future version is tested against it." },
      ],
    },
    /** A/B testing, inbound and outbound. */
    ab: {
      label: "A/B testing",
      title: "Prove a change works before everyone gets it.",
      rows: [
        { id: "change", title: "Scripts, voices or flows", body: "Send a share of conversations to the new version and compare outcomes before rolling it out." },
        { id: "both", title: "Inbound and outbound", body: "Works on conversations customers start and the ones your Hooman starts." },
      ],
    },
  },

  faq: [
    // TO CONFIRM: simulated chat conversations (web chat is shown in Try it now).
    {
      q: "Does testing work for chat as well as voice?",
      a: "Yes. You can talk to or chat with a draft from the editor, and simulated customers can hold either kind of conversation.",
    },
    // TO CONFIRM: whether suites can run automatically on publish.
    {
      q: "When do test suites run?",
      a: "Whenever you choose, on any draft. Run the suite before you publish, and a version with failing scenarios is flagged so you can fix it first.",
    },
    {
      q: "Where do test scenarios come from?",
      a: "From personas you create, and from any turn you save, in a simulation or in a real conversation from post-call analytics.",
    },
    {
      q: "Do tests affect live customers?",
      a: "No. Simulations and spot checks run against a draft; live conversations stay on the published version until you publish.",
    },
    {
      q: "How is A/B testing different from a test suite?",
      a: "A suite proves a draft with simulated customers before release. An A/B test sends a share of real conversations, inbound or outbound, to a new version so you can compare outcomes before everyone gets it.",
    },
  ],

  /** Next step first (the sheet's related pages: AI QA, Agents). */
  related: ["quality", "agents"] satisfies MenuPageId[],
}
