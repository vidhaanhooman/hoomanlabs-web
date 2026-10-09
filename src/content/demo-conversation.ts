/**
 * Scripted call for the hero's live-conversation screen.
 * Fictional draft: names, company and account numbers are made up.
 * Replace with an approved script (e.g. adapted from a QA simulation).
 */

export type ConversationEvent =
  | { kind: "agent" | "caller"; text: string }
  | { kind: "action"; text: string; detail: string }

export const demoCall = {
  direction: "Outbound call",
  agent: { name: "Billing assistant", version: "v3" },
  startSeconds: 104, // timer starts at 01:44, mid-call
  customer: [
    { label: "Customer", value: "Daniel Okafor" },
    { label: "Account", value: "HE-48213" },
    { label: "Plan", value: "Home Energy, monthly" },
  ],
  intent: "Payment not applied",
  sentiment: "Calm",
  outcome: "Resolved, transfer requested",
  events: [
    {
      kind: "agent",
      text: "Hi Daniel, this is Ria from Halden Energy about your March bill. Is now a good time?",
    },
    { kind: "caller", text: "Yeah, go ahead. I'm pretty sure I already paid that one." },
    { kind: "action", text: "Looked up account", detail: "HE-48213" },
    {
      kind: "agent",
      text: "You did. $86.40 came in on March 3, but it went to an old account number, so it hasn't been applied yet.",
    },
    { kind: "caller", text: "Ah, okay. Can you move it across?" },
    { kind: "action", text: "Created transfer request", detail: "TR-2291" },
    {
      kind: "agent",
      text: "Done. It should show within two to three working days, and I'm texting you a confirmation now.",
    },
    { kind: "action", text: "Sent SMS confirmation", detail: "+44 7700 900418" },
    { kind: "caller", text: "Perfect, thanks Ria." },
  ] satisfies ConversationEvent[] as ConversationEvent[],
}
