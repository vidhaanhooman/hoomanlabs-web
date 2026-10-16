import type { MenuPageId } from "@/content/platform"

/**
 * /platform/integrations, from the website content sheet ("Platform pages"
 * tab for the sections, "Hoomanlabs" tab for each feature's name and
 * pointer). Sections are written as features, not the sheet's questions, in
 * the homepage's language like the other product pages. Per review, four
 * sections: connect, actions, webhooks, then the systems already integrated
 * (general names, reusing /platform's logo groups).
 * The sheet has no proof strip for this page. API paths and payloads shown
 * on screens are illustrative until checked against the API reference.
 */
export const integrationsPage = {
  seo: {
    title: "Voice AI Integrations, API, MCP and Webhooks",
    description: "Connect AI voice agents to anything with an API: before a call, during it as a tool, or in workflows. Start calls from your systems with the API or MCP, and get webhooks at every key event, including mid-call.",
  },
  crumb: "Integrations & API",
  title: "Every call's data, where your team works.",
  line: "Connect anything with an API, start calls from your own systems, and hear from us at every key moment.",

  /** The sheet's "What is it?" definition block. */
  definition: "Integrations connect Hoomans to your systems in both directions: your Hooman reads from and acts in your tools, your systems act in Hooman, and webhooks tell you what happened.",

  /**
   * Four sections, in this order: connect anything (before, during, in
   * workflows), take actions in Hooman (API and MCP), receive information
   * (webhooks at key events), and the systems already integrated.
   */
  sections: {
    connect: {
      label: "Connect",
      title: "Connect to anything with an API.",
      rows: [
        { id: "before", title: "Before the call", body: "Pull the customer's account, order or ticket, so every call starts informed." },
        { id: "during", title: "During the call, as a tool", body: "Check a balance, find a free slot or update a record while the customer is talking." },
        { id: "workflow", title: "In workflows", body: "Write results to your CRM or database after the call, or at any step." },
      ],
    },
    actions: {
      label: "Hooman API & MCP",
      title: "Take actions in Hooman, from your systems.",
      rows: [
        { id: "api", title: "Hooman API", body: "Start a call or conversation, add someone to a campaign, and read the results, all in code." },
        { id: "mcp", title: "Hooman MCP", body: "Do the same from Claude, ChatGPT and other AI assistants." },
      ],
    },
    webhooks: {
      label: "Webhooks",
      title: "Hear from us at every key moment.",
      rows: [
        { id: "call", title: "Call started and ended", body: "Know the moment a call begins and finishes; the ended event carries the summary, outcome and captured fields." },
        { id: "mid", title: "Mid-call", body: "Updates while the call is still live, such as a detail captured or a promise made, so your systems can act straight away." },
        { id: "transfer", title: "Transfers", body: "Transfer initiated, started and ended, so your team sees every handoff." },
      ],
    },
    systems: {
      label: "Already integrated",
      title: "Works with the systems you already use.",
      line: "Common CRMs, helpdesks, calendars, phone systems and automation tools, ready to connect. Anything else connects through its API.",
    },
  },

  faq: [
    {
      q: "Where do integrations fit into a call?",
      a: "In three places: before the call to pull the customer's details, during the call as a tool your Hooman uses, and in workflows to write results back after the call or at any step.",
    },
    {
      q: "Can our systems start calls?",
      a: "Yes. Use the Hooman API or MCP to start a call or conversation, add someone to a campaign, and read the results.",
    },
    {
      q: "Which events do webhooks send?",
      a: "Call started and call ended, mid-call updates while the call is live, and for transfers: initiated, started and ended. The call-ended event includes the summary, outcome and the fields captured on the call.",
    },
    {
      q: "Which systems are already integrated?",
      a: "Common CRMs, helpdesks, calendars, phone systems and automation tools. Anything else with an API connects as a tool your Hooman can use, or from a workflow.",
    },
    {
      q: "Which AI assistants work with the MCP server?",
      a: "Any assistant that supports MCP, including Claude and ChatGPT, can build, test and run campaigns through the Hooman MCP server.",
    },
  ],

  /** Next step first (the sheet's related pages: Workflows, Agents). */
  related: ["workflows", "agents"] satisfies MenuPageId[],
}
