import type { MenuPageId } from "@/content/platform"

/**
 * /platform/observability, split out of Quality & Insights per review:
 * dashboards (prebuilt views and custom widgets), alerts (presets, QA
 * thresholds, custom) and conversation logs (the turn debugger, changing
 * the agent then replaying and simulating from the log, and the actions on
 * every turn). In the homepage's language like the
 * other product pages. Figures on the screens are sample data.
 * TO CONFIRM: alert channels (email, Slack) and the preset alert list.
 */
export const observabilityPage = {
  seo: {
    title: "Voice AI Observability: Dashboards, Alerts and Conversation Logs",
    description:
      "Prebuilt dashboards for inbound, outbound, campaigns and tools, alerts on presets and QA thresholds, and a turn-by-turn log of every conversation and agent action.",
  },
  crumb: "Observability",
  title: "See what's happening, as it happens.",
  line: "Dashboards for every kind of conversation, alerts the moment something drifts, and the full log of every turn and every action.",

  /** The "What is it?" definition. */
  definition: "Observability shows what's happening across every conversation: dashboards to follow it, alerts when it drifts, and logs to see exactly what happened.",

  dashboards: {
    label: "Dashboards",
    title: "Ready views, and dashboards of your own.",
    rows: [
      { id: "prebuilt", title: "Prebuilt views", body: "Inbound, outbound, campaigns and tools, ready from day one." },
      { id: "custom", title: "Custom dashboards and widgets", body: "Build your own dashboards from widgets: any metric or outcome, charted your way, from QA pass rates to promises to pay." },
    ],
  },
  alerts: {
    label: "Alerts",
    title: "Hear about it before your customers do.",
    rows: [
      { id: "presets", title: "Preset alerts", body: "Volume, pickup and failed tools, watched from day one." },
      { id: "qa", title: "QA thresholds", body: "Get told when a metric's pass rate falls below your line." },
      { id: "custom", title: "Custom alerts", body: "Any metric, any condition, sent to email or Slack." },
    ],
  },
  logs: {
    label: "Conversation logs",
    title: "Every turn, and everything the agent did.",
    rows: [
      { id: "turns", title: "Turn deep dive", body: "Debug any turn: what was said, what the agent generated and actually spoke, and a timeline of every step with its latency." },
      { id: "act", title: "Act from the log", body: "Change the agent, then replay the turn and simulate the conversation to check the fix, without leaving the log." },
      { id: "actions", title: "Actions on every turn", body: "Every tool, API and lookup, shown on the turn it ran, with what was sent, what came back and how long it took." },
    ],
  },
  faq: [
    {
      q: "Which dashboards come ready?",
      a: "Prebuilt views for inbound, outbound, campaigns and tools, from day one. Then build custom dashboards of your own, from widgets for any metric or outcome.",
    },
    {
      q: "What can we get alerts for?",
      a: "Preset alerts for volume, pickup and failing tools, thresholds on any QA metric, and custom alerts on any metric or condition.",
    },
    {
      q: "What's in a conversation log?",
      a: "The recording and transcript, a debug view of every turn with each step's latency, and every tool, API and lookup the agent ran on that turn, with its result.",
    },
    {
      q: "Can we act on what we find?",
      a: "Yes. From any turn, flag it for review, replay it on a fix, or save it as a scenario so every future version is tested against it.",
    },
  ],

  /** Next step first: QA, then Integrations & API. */
  related: ["quality", "integrations"] satisfies MenuPageId[],
}
