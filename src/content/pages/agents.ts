import type { MenuPageId } from "@/content/platform"

/**
 * /platform/agents, from the website content sheet ("Platform pages" and
 * "Platform v2" tabs for the sections, "Hoomanlabs" tab for each feature's
 * marketing name and pointer). Sections are written as features, not the
 * sheet's questions. Laid out in the homepage's language. Sample data
 * (Halden Energy, Ria) throughout.
 */
export const agentsPage = {
  seo: {
    title: "AI Voice Agent Builder for Customer Calls",
    description: "Build AI voice agents that follow your process, use your data and take action in your systems, then test and publish safely.",
  },
  crumb: "Agents",
  title: "AI voice agents that follow your process and use your data.",
  line: "Write the job, lay out the steps, connect your data and tools, and your Hooman handles every conversation your way.",

  /** The sheet's "What is it?" definition block. */
  definition: "A Hooman is an AI agent you build from a prompt, a flow, and the context and tools it needs, so it handles every conversation your way.",
  /** Proof strip. */
  proof: { quote: "The future of customer calls.", by: "GIVA" },

  /** The three agent types, as cards under the definition. */
  types: {
    label: "Types",
    title: "One builder for every kind of conversation.",
    items: [
      { id: "voice", name: "Voice", body: "Takes and makes phone calls, and talks in your app or on your website." },
      { id: "chat", name: "Chat", body: "Replies on your website, in your app and on WhatsApp, with the same prompt and tools." },
      { id: "broadcast", name: "Broadcast", body: "One-way voice announcements to a list: reminders, alerts and updates." },
    ],
  },

  panels: {
    /** Sheet section 1. */
    job: {
      label: "Prompt",
      title: "Write the job once. It adapts to every customer.",
      rows: [
        { id: "instructions", title: "Instructions", body: "Write the job like you would for a new hire: who it is, what done looks like and the steps to get there." },
        { id: "variables", title: "Personalisation", body: "Variables bring in each customer's name, account and details, so every conversation is about them." },
        { id: "conditions", title: "Conditions", body: "CEL expressions switch instructions per customer, language or case, so one prompt covers them all." },
      ],
    },
    /** Kept for the Skills diagram (components/agents/skills.tsx, off the page for now). */
    skills: {
      label: "Skills",
      title: "Acts in your systems while it talks.",
      rows: [
        { id: "skills", title: "Skills", body: "Teach a Hooman to look up, book, update and pay inside your systems while it talks." },
        { id: "multi", title: "Multitasking", body: "Keeps the conversation going while it books, checks or updates in the background." },
        { id: "silence", title: "Fill-the-silence", body: "No dead air while systems respond." },
        { id: "smart", title: "Smart responses", body: "Raw API data becomes a clean, short answer the Hooman can use instantly." },
        { id: "builder", title: "Skill builder", body: "Describe the action; AI writes the skill and you test it in one click. Build it once, and every Hooman can use it." },
      ],
    },
    flow: {
      label: "Flow",
      title: "Exact steps where your process needs them.",
      rows: [
        { id: "nodes", title: "Nodes", body: "Lay the conversation out as steps: AI conversation, fixed lines, conditions, API calls, handoff and end call." },
        { id: "prompts", title: "A smaller prompt per step", body: "Each step gets its own focused instructions, so the agent only thinks about the job in front of it." },
        { id: "tools", title: "Tools per step", body: "Give each step only the tools it needs, like taking a payment only once the caller is verified." },
      ],
    },
    context: {
      label: "Context & actions",
      title: "Knows the customer. Acts in your systems.",
      rows: [
        { id: "precall", title: "Pre-call API", body: "Fetch the customer's account before hello, so the agent starts the conversation already knowing them." },
        { id: "memory", title: "Memory", body: "Remembers what happened in earlier conversations, so nobody repeats themselves." },
        { id: "library", title: "Library", body: "Answers from your SOPs, policies and FAQs, not guesses." },
        { id: "tables", title: "Data tables", body: "Upload a sheet and the agent looks up every price, branch and slot, no integration needed." },
        { id: "tools", title: "Tools", body: "Looks up, books, updates and takes payments in your systems while it talks." },
      ],
    },
    scale: {
      label: "Production ready",
      title: "Built to run at scale.",
      rows: [
        { id: "versions", title: "Versions", body: "Edit a draft, compare it with what's live, publish when ready and roll back in one click." },
        { id: "reuse", title: "Build once, use everywhere", body: "Tools, library documents and data tables are shared: build them once and use them in every agent." },
        { id: "channels", title: "Every channel", body: "The same agent answers on the phone, on your website, in your app and on WhatsApp." },
        { id: "testing", title: "Tested before it's live", body: "Run your scenarios against every draft, so a change never reaches customers untested." },
      ],
    },
  },

  /** The pinned "what it can do" section: actions a Hooman takes on a call. */
  canDo: {
    title: "What a Hooman can do on a call.",
    items: [
      { id: "answer", title: "Answers questions", body: "From your policies, FAQs and live data, not guesses." },
      { id: "pay", title: "Takes payments", body: "Charges the card on file or sends a link, and confirms it on the call." },
      { id: "book", title: "Books and reschedules", body: "Finds a free slot in your calendar and confirms it before hanging up." },
      { id: "update", title: "Updates your records", body: "Writes the outcome and next step to your CRM while it talks." },
      { id: "handoff", title: "Hands off to your team", body: "Transfers with a summary, so nobody asks the customer to start again." },
      { id: "follow", title: "Follows up", body: "Sends the receipt, the link or the summary the moment the call ends." },
    ],
  },

  talk: {
    title: "Hear a Hooman on the phone.",
    line: "Play a sample call, or have one of our agents call you now.",
  },

  faq: [
    {
      q: "What kinds of Hoomans can I build?",
      a: "Three types: Voice, for phone calls and in-app or web calls; Chat, for your website, app and WhatsApp; and Broadcast, for one-way voice announcements to a list.",
    },
    {
      q: "Can it follow our exact compliance script?",
      a: "Yes. Fixed conversation steps read your wording word for word, and branches decide when they apply. Everything else stays natural conversation.",
    },
    {
      q: "Do we need developers to set it up?",
      a: "No. You write the job in plain language and set up tools in the console. Developers can go further with code steps, the API and MCP.",
    },
    {
      q: "Which systems does it connect to?",
      a: "Zoho CRM, Freshdesk, Zendesk and Google Calendar natively, plus any system with an API through tools. Call events and data land back where your team works.",
    },
    {
      q: "What happens when it can't help?",
      a: "It transfers the call to your team with a summary, inside your transfer hours. Outside them, it books a callback.",
    },
    {
      q: "Can we test it before it goes live?",
      a: "Yes. Edit a draft, try it with test calls by phone or chat, then publish. Live calls stay on the current version until you do.",
    },
    {
      q: "Which languages does it speak?",
      a: "English and major Indian languages, including Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati and Punjabi, and it can switch language mid-call.",
    },
  ],

  /** Related pages; the first is the sheet's next step (Testing & Improvement). */
  related: ["testing", "voice"] satisfies MenuPageId[],
}
