/**
 * Example websites for the chat playground (/chat), each with its own agent
 * and scripted conversations. Fictional brands and sample data only.
 */

export type ChatMsg = { from: "agent" | "you"; text: string }
export type ChatStep = { reply: ChatMsg[]; options: string[] }

export type ChatScript = {
  greet: (name: string) => string
  options: string[]
  flows: Record<string, ChatStep>
  /** Free text → a flow key, by keyword. */
  match: (text: string) => string | null
  fallback: string
}

export type SiteId = "energy" | "store" | "clinic"

export type Site = {
  id: SiteId
  brand: string
  domain: string
  agent: string
  role: string
  /** The brand colour: site buttons and the widget's default accent. */
  accent: string
  context: string
  script: ChatScript
}

const handoff = (team: string): ChatStep => ({
  reply: [{ from: "agent", text: `Of course. I'm passing you to the ${team} team now, and they'll see this conversation.` }],
  options: [],
})

const thanks: ChatStep = { reply: [{ from: "agent", text: "Happy to help. Have a good day!" }], options: [] }

export const SITES: Site[] = [
  {
    id: "energy",
    brand: "Halden Energy",
    domain: "haldenenergy.example",
    agent: "Ria",
    role: "Billing assistant",
    accent: "oklch(0.52 0.13 155)",
    context: '{\n  "name": "Maya",\n  "balance": "₹2,850"\n}',
    script: {
      greet: (n) => `Hi ${n}, I'm Ria from Halden Energy. How can I help with your account today?`,
      options: ["Pay my bill", "Set up a payment plan", "Talk to a person"],
      flows: {
        "Pay my bill": {
          reply: [
            { from: "agent", text: "Your balance is ₹2,850, due 4 March." },
            { from: "agent", text: "Shall I take it now with the UPI ID on file, maya@okbank?" },
          ],
          options: ["Yes, pay now", "Not yet"],
        },
        "Yes, pay now": {
          reply: [
            { from: "agent", text: "Done. ₹2,850 is paid and your receipt is on its way to your email." },
            { from: "agent", text: "Anything else I can help with?" },
          ],
          options: ["Set up a payment plan", "That's all, thanks"],
        },
        "Not yet": {
          reply: [{ from: "agent", text: "No problem. I'll remind you two days before the due date." }],
          options: ["Set up a payment plan", "That's all, thanks"],
        },
        "Set up a payment plan": {
          reply: [{ from: "agent", text: "I can split ₹2,850 into up to three monthly payments. Would three payments of ₹950 work?" }],
          options: ["Yes, three payments", "Talk to a person"],
        },
        "Yes, three payments": {
          reply: [{ from: "agent", text: "All set: ₹950 on the 4th of each month, starting March. I've sent the details by SMS." }],
          options: ["That's all, thanks"],
        },
        "Talk to a person": handoff("billing"),
        "That's all, thanks": thanks,
      },
      match: (t) => (/\bplan|instal|split|month/i.test(t) ? "Set up a payment plan" : /\bpay|bill|balance|due/i.test(t) ? "Pay my bill" : /person|human|someone|team/i.test(t) ? "Talk to a person" : null),
      fallback: "I can help you pay your bill, set up a payment plan or reach a person.",
    },
  },
  {
    id: "store",
    brand: "Kestrel",
    domain: "kestrel.example",
    agent: "Kai",
    role: "Order support",
    accent: "oklch(0.62 0.17 45)",
    context: '{\n  "name": "Arjun",\n  "order": "KS-20418"\n}',
    script: {
      greet: (n) => `Hey ${n}, I'm Kai from Kestrel. Need help with an order?`,
      options: ["Where's my order?", "Return an item", "Talk to a person"],
      flows: {
        "Where's my order?": {
          reply: [
            { from: "agent", text: "Order KS-20418 (running shoes, size 9) left our warehouse yesterday." },
            { from: "agent", text: "It's out for delivery today, between 2 and 5 pm. Want live tracking by SMS?" },
          ],
          options: ["Yes, send tracking", "Change delivery address"],
        },
        "Yes, send tracking": {
          reply: [{ from: "agent", text: "Sent. You'll get a text when the courier is 10 minutes away." }],
          options: ["Return an item", "That's all, thanks"],
        },
        "Change delivery address": {
          reply: [{ from: "agent", text: "It's already with the courier, so I can't change the address now. I can ask them to leave it with a neighbour or at a safe place." }],
          options: ["Leave at a safe place", "Talk to a person"],
        },
        "Leave at a safe place": {
          reply: [{ from: "agent", text: "Done. The courier will leave it by your front door." }],
          options: ["That's all, thanks"],
        },
        "Return an item": {
          reply: [{ from: "agent", text: "You can return anything within 30 days. Which item: the running shoes or the water bottle?" }],
          options: ["The running shoes", "The water bottle"],
        },
        "The running shoes": {
          reply: [{ from: "agent", text: "Return started. Free pickup is booked for tomorrow morning, and your refund of ₹4,299 lands once we receive them." }],
          options: ["That's all, thanks"],
        },
        "The water bottle": {
          reply: [{ from: "agent", text: "Return started. Drop it at any Kestrel store, and your refund of ₹899 lands the same day." }],
          options: ["That's all, thanks"],
        },
        "Talk to a person": handoff("support"),
        "That's all, thanks": thanks,
      },
      match: (t) => (/return|refund|exchange/i.test(t) ? "Return an item" : /order|deliver|track|where/i.test(t) ? "Where's my order?" : /person|human|someone|team/i.test(t) ? "Talk to a person" : null),
      fallback: "I can track an order, start a return or get you to a person.",
    },
  },
  {
    id: "clinic",
    brand: "Northfield Clinics",
    domain: "northfieldclinics.example",
    agent: "Asha",
    role: "Appointments",
    accent: "oklch(0.52 0.15 250)",
    context: '{\n  "name": "Priya",\n  "clinic": "Indiranagar"\n}',
    script: {
      greet: (n) => `Hello ${n}, I'm Asha from Northfield Clinics. Would you like to book or change an appointment?`,
      options: ["Book an appointment", "Reschedule", "Talk to a person"],
      flows: {
        "Book an appointment": {
          reply: [
            { from: "agent", text: "Dr. Mehta (general physician) has these slots at Indiranagar:" },
            { from: "agent", text: "Tomorrow 10:30 am, tomorrow 4:00 pm, or Friday 11:00 am." },
          ],
          options: ["Tomorrow 10:30 am", "Friday 11:00 am"],
        },
        "Tomorrow 10:30 am": {
          reply: [{ from: "agent", text: "Booked: Dr. Mehta, tomorrow at 10:30 am. A confirmation is on its way by SMS." }],
          options: ["That's all, thanks"],
        },
        "Friday 11:00 am": {
          reply: [{ from: "agent", text: "Booked: Dr. Mehta, Friday at 11:00 am. A confirmation is on its way by SMS." }],
          options: ["That's all, thanks"],
        },
        Reschedule: {
          reply: [
            { from: "agent", text: "You're booked with Dr. Mehta on Thursday at 9:00 am." },
            { from: "agent", text: "Move it to Friday at 11:00 am instead?" },
          ],
          options: ["Yes, move it", "Talk to a person"],
        },
        "Yes, move it": {
          reply: [{ from: "agent", text: "Done. You're now booked for Friday at 11:00 am, and Thursday's slot is released." }],
          options: ["That's all, thanks"],
        },
        "Talk to a person": handoff("front desk"),
        "That's all, thanks": thanks,
      },
      match: (t) => (/resched|move|change|cancel/i.test(t) ? "Reschedule" : /book|appoint|slot|doctor/i.test(t) ? "Book an appointment" : /person|human|someone|team|desk/i.test(t) ? "Talk to a person" : null),
      fallback: "I can book or reschedule an appointment, or get you to the front desk.",
    },
  },
]
