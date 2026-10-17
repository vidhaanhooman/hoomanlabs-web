import type { MenuPageId } from "@/content/platform"

/**
 * /platform/observability, split out of Quality & Insights per review:
 * dashboards (prebuilt views and custom widgets), alerts (presets, QA
 * thresholds, custom) and conversation logs (turns and agent actions, with
 * review, save a scenario or replay). In the homepage's language like the
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
      { id: "turns", title: "Turn by turn", body: "The recording and transcript, with timings for every turn." },
      { id: "actions", title: "Agent actions", body: "Every tool, API and lookup, shown at the moment it happened, with its result." },
      { id: "review", title: "Review, save or replay", body: "Flag a turn for review, save it as a scenario or replay it on a fix." },
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
      a: "The recording and transcript with timings for every turn, and every tool, API and lookup the agent used, with its result.",
    },
    {
      q: "Can we act on what we find?",
      a: "Yes. From any turn, flag it for review, replay it on a fix, or save it as a scenario so every future version is tested against it.",
    },
  ],

  /** Next step first: QA, then Integrations & API. */
  related: ["quality", "integrations"] satisfies MenuPageId[],
}
