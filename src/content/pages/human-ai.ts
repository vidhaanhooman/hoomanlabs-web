import type { MenuPageId } from "@/content/platform"

/**
 * /platform/human-ai, the Platform menu's featured page: your AI agents and
 * your human team on one platform. Three sections, in this order: human
 * transfer with context, QA of human calls, and learning from transferred
 * calls to improve the AI. Facts reuse what the site already states (warm
 * handoff inside office hours, a callback outside them; human recordings
 * scored with the same metrics). Learning from transfers ranks fixes by
 * the transfers they would remove. Sample data on the screens.
 * TO CONFIRM: transfer targets (phone numbers, queues, teams) and how human
 * recordings arrive (upload, telephony connection).
 */
export const humanAiPage = {
  seo: {
    title: "Human + AI: Warm Handoffs, Human QA and AI That Learns From Your Team",
    description:
      "Hand calls to your team with full context, score your human agents with the same QA as your AI, and learn from every transferred call to improve the AI.",
  },
  crumb: "Human + AI",
  title: "Your AI and your team, working as one.",
  line: "Hand off to a person with the full story, hold everyone to the same standard, and let every transfer teach the AI something new.",

  /** The "What is it?" definition. */
  definition: "Human + AI is how your Hoomans and your people share the work: warm handoffs with context, one QA for both, and an AI that learns from what your team does.",

  transfer: {
    label: "Human transfer",
    title: "Hand off with the whole story, not a cold transfer.",
    rows: [
      { id: "warm", title: "Warm handoff", body: "The call moves to the right person on your team, inside your office hours; outside them, the Hooman books a callback." },
      { id: "context", title: "Full context", body: "Your agent sees the summary, the reason for the handoff and every detail captured, so nobody asks the customer to start again." },
    ],
  },

  qa: {
    label: "QA of human calls",
    title: "One standard for your AI and your team.",
    rows: [
      { id: "side", title: "Side by side", body: "Compare scores and the biggest gap for every agent, AI or human, in one view." },
      { id: "same", title: "Same metrics", body: "Score your human agents' calls with the same scorecard as your Hoomans, each metric checked by AI, an audio rule or code." },
      { id: "coach", title: "Coach first where it counts", body: "See which agents to coach first, with short clips of the exact moments to go through together." },
    ],
  },

  learn: {
    label: "Learn from transfers",
    title: "Every transfer teaches the AI something.",
    rows: [
      { id: "fixes", title: "What your AI can do more", body: "Fixes ranked by the transfers each would remove: knowledge, a tool, the prompt, a policy or speech." },
      { id: "why", title: "Why calls were transferred", body: "The reasons behind every handoff, grouped by AI agent, so you know what it couldn't handle yet." },
      { id: "act", title: "Fix it from what your team did", body: "Each fix shows how your people handled it, with the action to take: add to the library, create a tool or edit the prompt." },
    ],
  },

  faq: [
    {
      q: "When does the AI hand over to a person?",
      a: "When the customer asks for one, or when your rules say so, such as a dispute. Handoffs happen inside your team's office hours; outside them, the Hooman books a callback.",
    },
    {
      q: "What does my agent see when a call comes through?",
      a: "A short summary, the reason for the handoff, the details captured so far and the transcript, so they can pick up where the AI left off.",
    },
    {
      q: "Can we QA our human team too?",
      a: "Yes. Upload your human agents' recordings and score them with the same metrics as your Hoomans, side by side.",
    },
    {
      q: "How does the AI learn from transfers?",
      a: "Every transfer is grouped by why it happened, and turned into fixes ranked by how many transfers each would remove. Each fix shows how your team handled it, with the action to take: add to the library, create a tool, edit the prompt or review a policy.",
    },
  ],

  /** Next step first: QA, then Agents. */
  related: ["quality", "agents"] satisfies MenuPageId[],
}
