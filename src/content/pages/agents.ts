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
  line: "Write the job, connect your knowledge and systems, and your Hooman handles every conversation your way.",

  /** The sheet's "What is it?" definition block. */
  definition: "A Hooman is an AI agent you configure with a job description, knowledge, data tables and skills, so it handles calls your way.",
  /** Proof strip. */
  proof: { quote: "The future of customer calls.", by: "GIVA" },

  panels: {
    /** Sheet section 1. */
    job: {
      label: "Job description",
      title: "Write the job once. It adapts to every caller.",
      rows: [
        { id: "job", title: "Job description", body: "Write the job like you would for a new hire; the Hooman follows it on every call." },
        { id: "logic", title: "Prompt logic", body: "One prompt that adapts per customer, language or case, with no duplicate agents." },
        { id: "personal", title: "Personalisation", body: "Greets by name, knows the time of day, adapts lines to each customer." },
        { id: "intro", title: "First impression", body: "Open every call on brand, with a ring, pause and greeting you control." },
      ],
    },
    /** Sheet section 4. */
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
    /** Sheet section 3. */
    knowledge: {
      label: "Knowledge",
      title: "Answers from your information, not guesses.",
      rows: [
        { id: "knowledge", title: "Knowledge", body: "Answers grounded in your SOPs, policies and FAQs." },
        { id: "tables", title: "Live data tables", body: "Upload a sheet and your Hooman looks up every price, branch and slot, no integration required." },
      ],
    },
    /** Sheet section 2 ("Playbooks" in the sheet; called Flow on the site). */
    flow: {
      label: "Flow",
      title: "Exact steps where compliance needs them.",
      rows: [
        { id: "flow", title: "Flow", body: "Mix free conversation with exact scripted steps where compliance needs it." },
        { id: "routing", title: "Smart routing", body: "Every caller starts on the right path, decided by your data." },
        { id: "nodes", title: "Node types", body: "AI conversation, fixed lines, logic, API calls, handoff to a person and end call." },
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

  /** Sheet sections 5 to 7, as one call's timeline. */
  around: {
    title: "Everything around the conversation.",
    line: "Context before the call, a person when needed, and safe changes after it.",
    moments: [
      { stage: "Before the call", title: "Knows the customer", body: "Pre-call briefing and recall: details arrive before hello, and nobody repeats themselves." },
      { stage: "During the call", title: "Hands off with context", body: "Warm handoff inside office hours; outside them, the Hooman takes a callback." },
      { stage: "After the call", title: "Changes safely", body: "Edit a draft, try it now, then publish. Live calls are never touched until you're ready." },
    ],
  },

  talk: {
    title: "Hear a Hooman on the phone.",
    line: "Play a sample call, or have one of our agents call you now.",
  },

  faq: [
    {
      q: "What kinds of Hoomans can I build?",
      a: "Three types: one that talks with your customers, one that announces (a one-way broadcast), and one that listens to recordings and scores them.",
    },
    {
      q: "Can it follow our exact compliance script?",
      a: "Yes. Fixed conversation steps read your wording word for word, and branches decide when they apply. Everything else stays natural conversation.",
    },
    {
      q: "Do we need developers to set it up?",
      a: "No. You write the job in plain language and set up skills in the console. Developers can go further with code steps, the API and MCP.",
    },
    {
      q: "Which systems does it connect to?",
      a: "Zoho CRM, Freshdesk, Zendesk and Google Calendar natively, plus any system with an API through skills. Call events and data land back where your team works.",
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
