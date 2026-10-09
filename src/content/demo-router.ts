/**
 * Requests and the action the agent takes for each, for the router section.
 * Fictional examples; mixes channels and languages on purpose.
 */
export const routes: { request: string; action: string; channel: string; language: string }[] = [
  { request: "Where's my refund?", action: "Look up order", channel: "Chat", language: "English" },
  { request: "Can we move it to Friday?", action: "Reschedule appointment", channel: "Voice", language: "English" },
  { request: "मेरा बिल गलत है", action: "Open billing dispute", channel: "Voice", language: "Hindi" },
  { request: "I paid but it still says overdue", action: "Transfer payment", channel: "Voice", language: "English" },
  { request: "Quiero cancelar mi plan", action: "Start cancellation", channel: "WhatsApp", language: "Spanish" },
  { request: "Can someone call me back?", action: "Book callback", channel: "Chat", language: "English" },
  { request: "Send me the receipt", action: "Send SMS receipt", channel: "Voice", language: "English" },
  { request: "Has my parcel left?", action: "Check delivery status", channel: "WhatsApp", language: "English" },
  { request: "I need to speak to a person", action: "Hand off to your team", channel: "Voice", language: "English" },
]
