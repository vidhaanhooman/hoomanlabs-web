/**
 * Scripted agent configuration for the Build panel's screen.
 * Fictional draft: agent, company and counts are made up.
 */
export const demoAgent = {
  name: "Billing assistant",
  version: "v4",
  instructions: [
    "You are Ria, the billing assistant for Halden Energy.",
    "Confirm the caller's identity before discussing their account.",
    "Keep answers short and confirm next steps before ending the call.",
  ],
  /** Line that appears as the pending change. */
  addedInstruction:
    "If a payment hasn't been applied, offer to transfer it and text a confirmation.",
  tools: [
    { name: "Look up account", on: true },
    { name: "Create transfer request", on: true },
    { name: "Send SMS", on: false, turnsOn: true },
    { name: "Book callback", on: true },
  ],
  voice: "Ria, British English",
  languages: ["English", "Hindi", "Spanish"],
  model: "Fast, low latency",
  scenarios: 18,
}
