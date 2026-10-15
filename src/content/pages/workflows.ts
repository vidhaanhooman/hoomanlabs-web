import type { MenuPageId } from "@/content/platform"

/**
 * /platform/workflows, from the website content sheet ("Platform pages" and
 * "Platform v2" tabs for the sections, "Hoomanlabs" tab for each feature's
 * marketing name and pointer). Sections are written as features, not the
 * sheet's questions, in the homepage's language like /platform/agents.
 * Sample data (Halden Energy, Maya Patel). PLACEHOLDER: the proof metric.
 */
export const workflowsPage = {
  seo: {
    title: "AI Call Workflow Automation",
    description: "Connect every conversation to your CRM, payments and calendars with visual workflows: AI steps, logic, code and follow-up calls.",
  },
  crumb: "Workflows",
  title: "Finish the work, not just the talk.",
  line: "Visual workflows connect every conversation to your systems, with AI steps, logic and code.",

  /** The sheet's "What is it?" definition block. */
  definition: "Workflows are visual automations that run before, during and after conversations, so the work gets done, not just discussed.",
  /** PLACEHOLDER: the sheet's proof strip is "TBD: customer automation metric". */
  proof: { quote: "4 min", by: "of after-call work saved on every call" },

  /** Plain-language explainer for people new to workflows. */
  explainer: {
    title: "How a workflow works.",
    intro:
      "A workflow is a set of steps that runs on its own. It starts when something happens, decides what to do, does the work in your systems, and tells your team what it did.",
    analogy: "Think of the checklist your team follows after every call. A workflow follows it for them, the same way every time, in seconds.",
    steps: [
      {
        id: "trigger",
        name: "Something happens",
        body: "A call ends, a form is filled in, or a payment is missed. That event starts the workflow.",
        example: "Maya's billing call ends.",
      },
      {
        id: "decide",
        name: "It decides",
        body: "An AI step reads the conversation or the data, and rules choose the right next step.",
        example: "She promised to pay on the 4th.",
      },
      {
        id: "act",
        name: "It does the work",
        body: "It updates your CRM, sends a message or books a call, often several at once.",
        example: "CRM updated, reminder set, SMS sent.",
      },
      {
        id: "report",
        name: "It reports back",
        body: "Every step is logged, so your team can see what happened and when.",
        example: "Done in 1.2 seconds, visible to the team.",
      },
    ],
  },

  panels: {
    /** Sheet section 1. */
    triggers: {
      label: "Triggers",
      title: "Starts on its own.",
      rows: [
        { id: "triggers", title: "Triggers", body: "Start from a call, a webhook, your app or a schedule." },
        { id: "events", title: "Call events", body: "Your CRM knows the moment a call starts, ends or transfers." },
      ],
    },
    /** Sheet section 2. */
    ai: {
      label: "AI steps",
      title: "Turns conversations into clean decisions.",
      rows: [{ id: "ai", title: "AI steps", body: "Classify, extract and decide, returning clean, structured data the next step can use." }],
    },
    /** Sheet section 3. */
    connect: {
      label: "Connect",
      title: "Updates your systems and sends messages.",
      rows: [
        { id: "http", title: "Connect anything", body: "Call any API, with a fixed IP for bank and enterprise systems that require allow-listing." },
        { id: "presets", title: "Ready-made steps", body: "Common actions in one click." },
        { id: "code", title: "Code steps", body: "Full control when you need it, in JavaScript." },
      ],
    },
    /** Sheet section 7. */
    test: {
      label: "Build & test",
      title: "Test every step before it runs for real.",
      rows: [{ id: "test", title: "Build & test", body: "Run each step on its own with sample data, and let AI write the code for you." }],
    },
  },

  /** Sheet sections 5 and 6: one customer over several days. */
  days: {
    label: "Follow-ups",
    title: "Follows a customer over days, not just one call.",
    rows: [
      { id: "timing", title: "Logic & timing", body: "If this, then that, after a delay you choose." },
      { id: "callback", title: "Call-back step", body: "Any workflow can put a Hooman on the phone." },
      { id: "outreach", title: "Always-on outreach", body: "A new lead gets a call in seconds, automatically." },
      { id: "recall", title: "Recall", body: "Every step is remembered, so the next call picks up where the last left off." },
    ],
  },

  /** Sheet section 4. */
  logic: {
    title: "Built for real business logic.",
    line: "Branches, waits, parallel steps and predictable error handling.",
    items: [
      { id: "branch", title: "Logic & timing", body: "Branch on any condition and wait between steps." },
      { id: "parallel", title: "Parallel steps", body: "Update the CRM, notify the team and send a message at the same time." },
      { id: "reliable", title: "Reliable runs", body: "Predictable behaviour when an API is slow or fails." },
    ],
  },

  faq: [
    {
      q: "What can start a workflow?",
      a: "A call ending, a webhook from any system, your own app through the API, or a schedule.",
    },
    {
      q: "Do we need developers to build workflows?",
      a: "No. Most workflows are triggers, AI steps, branches and ready-made steps set up on the canvas. Code steps are there when you want full control, and AI can write them for you.",
    },
    {
      q: "Can it reach systems behind an allow-list?",
      a: "Yes. API steps can call out from a fixed IP, so bank and enterprise systems that require allow-listing can accept them.",
    },
    {
      q: "What happens if one of our systems is slow or down?",
      a: "Each step has its own timeout and error policy, so a run behaves predictably: it takes the path you set for failures and reports the result back to your system.",
    },
    {
      q: "How is this different from a flow inside a call?",
      a: "A flow shapes what happens during a conversation. Workflows do the work around it: before a call, after it ends, and across the days in between.",
    },
  ],

  /** Next step first (the sheet's "Testing & Improvement"), then related pages. */
  related: ["testing", "campaigns", "integrations"] satisfies MenuPageId[],
}
