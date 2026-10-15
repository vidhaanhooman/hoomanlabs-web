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
    description: "Test every agent version with simulated customers, targeted checks and full suites before a real customer ever hears it.",
  },
  crumb: "Testing",
  title: "Know it's ready before a customer hears it.",
  line: "Simulated customers, targeted checks and full test suites run against every version of your Hooman before it goes live.",

  /** The sheet's "What is it?" definition block. */
  definition: "Testing lets you prove a Hooman works before launch, with simulated customers and repeatable tests for every version.",

  /** Sheet section 1, full width: simulated personas against a checklist. */
  callers: {
    label: "Mystery callers",
    title: "Simulated customers call before real ones do.",
    line: "Personas hold full conversations with your Hooman, and every conversation is scored against a checklist and the outcome you expect.",
    rows: [
      { id: "personas", title: "Personas", body: "Rushed, angry, elderly or switching language: choose who calls and how they behave." },
      { id: "checklist", title: "Checklist", body: "Every conversation is scored against the steps that must happen." },
      { id: "outcome", title: "Expected outcome", body: "Say how the conversation should end, and see whether it did." },
    ],
  },

  panels: {
    /** Sheet section 2. */
    checks: {
      label: "Spot checks",
      title: "Lock in the right answer for the moments that matter.",
      rows: [
        { id: "reply", title: "Exact replies", body: "Check what your Hooman says at a specific turn in the conversation." },
        { id: "tool", title: "Tool calls", body: "Check that the right tool is called at the right turn, with the right details." },
      ],
    },
    /** Sheet section 3. */
    suites: {
      label: "Test suites",
      title: "Check every scenario before each release.",
      rows: [
        { id: "suite", title: "Test suites", body: "Run every scenario against a draft version in one go, before you go live." },
        { id: "versions", title: "Versioning", body: "Change anything in a draft without touching live calls, and publish when the tests pass." },
      ],
    },
    /** Sheet section 4. */
    never: {
      label: "Never-again tests",
      title: "Every mistake becomes a test.",
      rows: [
        { id: "scenario", title: "Never-again tests", body: "Turn any moment from a real conversation into a test with one click, so it doesn't happen twice." },
        { id: "replay", title: "Replay & re-run", body: "Fix the prompt, replay the exact moment and see the new answer straight away." },
      ],
    },
    /** Sheet section 5. */
    try: {
      label: "Try it now",
      title: "Talk to your Hooman in seconds.",
      rows: [
        { id: "try", title: "Try-it-now", body: "Call or chat with your Hooman using sample customer data, before anyone else does." },
        { id: "loop", title: "Build-test loop", body: "Edit, simulate and check the logs in one screen, without leaving the agent." },
      ],
    },
  },

  faq: [
    {
      q: "Do we need real calls to test a Hooman?",
      a: "No. Mystery callers are simulated customers with their own personas, so you can test full conversations before a single real customer calls.",
    },
    {
      q: "What does a test actually check?",
      a: "A simulated conversation is scored against a checklist and the outcome you expect. A spot check looks at one moment: the exact reply or tool call at a specific turn.",
    },
    {
      q: "Can we change the Hooman without affecting live calls?",
      a: "Yes. Changes go into a draft version, which you can test with your full suite. Live calls keep using the published version until you publish the new one.",
    },
    {
      q: "How do real mistakes become tests?",
      a: "From any turn in a real conversation, create a scenario in one click. It joins your tests, so every later version is checked against that moment.",
    },
    {
      q: "Can we try it ourselves?",
      a: "Yes. Call or chat with your Hooman from the agent editor using sample customer data, and check the logs in the same screen.",
    },
  ],

  /** Next step first (the sheet's related pages: AI QA, Agents). */
  related: ["quality", "agents"] satisfies MenuPageId[],
}
