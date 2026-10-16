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
  definition: "Workflows are the work your Hooman hands off: quick tools it calls in the middle of a conversation, and journeys that carry on for days after it.",
  /** PLACEHOLDER: the sheet's proof strip is "TBD: customer automation metric". */
  proof: { quote: "4 min", by: "of after-call work saved on every call" },

  /** Plain-language explainer for people new to workflows. */
  explainer: {
    title: "How a workflow works.",
    intro:
      "A workflow is a set of steps that runs on its own. It starts when something happens, decides what to do, does the work in your systems, and tells your team what it did. Some finish in seconds while your Hooman is still talking; others carry on for days.",
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

  /** The two kinds of workflow, introduced side by side. */
  types: {
    label: "Two kinds of workflow",
    title: "Tools for the moment, journeys for the long run.",
    items: [
      {
        id: "tools",
        name: "Workflows as tools",
        span: "Seconds, inside a live call",
        body: "Your Hooman calls a workflow mid-conversation. It does the heavy lifting in parallel and hands back a short answer, so the call keeps flowing.",
        href: "#workflows-tools",
      },
      {
        id: "journeys",
        name: "Workflows as journeys",
        span: "Days or longer, many steps",
        body: "A workflow follows a customer over time: a call, a payment link, a wait, then the right next step based on what they did.",
        href: "#workflows-days",
      },
    ],
  },

  /**
   * Workflows as tools: a small, fast model keeps the conversation going; a
   * tool workflow does the heavy work (parallel lookups, a larger reasoning
   * model, an action) and returns a concise summary the main model answers
   * from. Sample data and timings.
   */
  tools: {
    label: "Workflows as tools",
    title: "Heavy thinking off the call, so the conversation keeps flowing.",
    line: "A smaller, faster model holds the conversation. When it needs more, it calls a workflow: the workflow works with several systems at once, brings in a larger reasoning model, and returns a short summary. The main model answers from that, so the agent keeps talking and costs stay low.",
    notes: [
      { id: "fast", title: "Fast where it matters", body: "The model on the call stays small and quick, so replies never wait on heavy work." },
      { id: "parallel", title: "Many systems at once", body: "The workflow checks your billing, CRM and policies in parallel, not one after another." },
      { id: "reason", title: "Big reasoning, only when needed", body: "A larger model weighs the results inside the workflow, and only for the moments that need it." },
      { id: "summary", title: "A short answer back", body: "The main model gets a concise summary, not raw data, so it can respond in a sentence." },
    ],
  },

  /** One section for the building blocks (replaces separate triggers / AI / connect panels). */
  blocks: {
    label: "Building blocks",
    title: "Three kinds of step, on one canvas.",
    line: "Every workflow is built from the same few pieces. The journey above shows them working together, with waits in between.",
    items: [
      {
        id: "trigger",
        name: "Triggers",
        body: "Start from a call, a webhook or a schedule.",
        head: ["Trigger", "Starts when"],
        rows: [
          { k: "Call ended", v: "A call wraps up" },
          { k: "Webhook", v: "Your system sends an event" },
          { k: "Schedule", v: "A time you set" },
          { k: "Tool call", v: "Your Hooman, mid-call" },
        ],
        foot: { code: "POST /hooks/billing", text: "from Halden Energy" },
        link: "Read about triggers",
      },
      {
        id: "ai",
        name: "AI steps",
        body: "Classify, decide, or clean up data for the next step.",
        head: ["Call with Maya · 2:18", "AI step"],
        rows: [
          { k: "Classify", v: "Billing dispute" },
          { k: "Decide", v: "Refund eligible" },
          { k: "Extract & clean", v: "Amount $86.40" },
        ],
        foot: { code: '{ "intent": "refund" }', text: "returned to the next step" },
        link: "Read about AI steps",
      },
      {
        id: "act",
        name: "Code and actions",
        body: "The steps that follow, in parallel when you want.",
        head: ["Step", "Does"],
        rows: [
          { k: "API call", v: "Any system you run" },
          { k: "Ready-made action", v: "Send an SMS" },
          { k: "Code", v: "Your own JavaScript" },
          { k: "Call-back", v: "Puts a Hooman on the phone" },
        ],
        foot: { code: "issue_refund", text: "your own actions, called by name" },
        link: "See integrations",
      },
    ],
  },

  panels: {
    /** Sheet section 7. */
    test: {
      label: "Build & test",
      title: "Test every step before it runs for real.",
      rows: [{ id: "test", title: "Build & test", body: "Run each step on its own with sample data, and let AI write the code for you." }],
    },
  },

  /** Sheet sections 5 and 6: one customer over several days. */
  days: {
    label: "Workflows as journeys",
    title: "Journeys that follow a customer over days.",
    rows: [
      { id: "timing", title: "Logic & timing", body: "If this, then that, after a delay you choose." },
      { id: "callback", title: "Call-back step", body: "Any workflow can put a Hooman on the phone." },
      { id: "outreach", title: "Always-on outreach", body: "A new lead gets a call in seconds, automatically." },
      { id: "recall", title: "Recall", body: "Every step is remembered, so the next call picks up where the last left off." },
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
      q: "What's the difference between a tool and a journey?",
      a: "A tool workflow runs in seconds while your Hooman is on the call and returns a short summary it answers from. A journey runs for days or longer, with several steps and waits, such as a call, a payment link and a follow-up.",
    },
    {
      q: "Why not let the main model do everything?",
      a: "Keeping the model on the call small keeps replies fast and costs low. Heavy work, like checking several systems or reasoning with a larger model, happens inside a tool workflow, and only when it's needed.",
    },
    {
      q: "Does a workflow decide what the agent says?",
      a: "No. Your Hooman leads the conversation. A workflow is work it hands off and gets back: an answer mid-call, or the follow-up after it.",
    },
  ],

  /** Next step first (the sheet's "Testing & Improvement"), then related pages. */
  related: ["testing", "campaigns", "integrations"] satisfies MenuPageId[],
}
