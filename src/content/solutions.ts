import type { MenuPageId } from "@/content/platform"

/**
 * /solutions: the hub copy and the use cases behind the hero's call player
 * (the industries themselves are in content/industries.ts).
 *
 * PLACEHOLDER CONTENT throughout: every metric (marked `sample`) and the
 * companies in the calls are fictional until real ones are approved. No
 * client content.
 *
 * Calls: `audio` is set only where a real, consented recording exists (the
 * survey call, public/audio/calls/feedback-en.mp3). Every other call is a
 * transcript preview that plays silently until its recording is added: drop
 * the file in public/audio/calls/, set `audio` and re-time each `t`.
 */

export type CallLine = { t: number; who: "agent" | "caller"; text: string; translation?: string }

export type SolutionCall = {
  title: string
  agent: string
  company: string
  language: string
  direction: "Inbound" | "Outbound"
  /** Seconds. For transcript previews, roughly the length of the lines. */
  duration: number
  /** A real recording; absent means a silent transcript preview. */
  audio?: string
  outcome: string
  lines: CallLine[]
  /** Lines to show on cards when `lines` is only a placeholder. */
  preview?: CallLine[]
}

export type UseCase = {
  kind: "use-case"
  slug: string
  name: string
  /** One line for cards. */
  short: string
  title: string
  line: string
  result: string
  steps: { when: "Before the call" | "During the call" | "After the call"; title: string; body: string }[]
  outcomes: { value: string; label: string; sample: true }[]
  powered: MenuPageId[]
  industries: string[]
  call: SolutionCall
  faq: { q: string; a: string }[]
}

export const useCases: UseCase[] = [
  {
    kind: "use-case",
    slug: "payment-collections",
    name: "Payment collections",
    short: "Reminders, promises to pay and payment plans, before and after the due date.",
    title: "Collect more, with calls customers don't dread.",
    line: "Your Hooman reminds customers before and after due dates, takes promises to pay, sets up plans and sends the payment link, in their language.",
    result: "More on-time payments",
    steps: [
      { when: "Before the call", title: "Knows the account", body: "Balance, due date and payment history arrive before hello." },
      { when: "During the call", title: "Agrees a way to pay", body: "Takes the payment, a promise to pay or a plan, and answers questions about the bill." },
      { when: "After the call", title: "Follows through", body: "Writes the promise to your CRM, sends the link and calls back the day before." },
    ],
    outcomes: [
      { value: "+18%", label: "on-time payments", sample: true },
      { value: "64%", label: "pickup on reminders", sample: true },
      { value: "0", label: "manual follow-ups", sample: true },
    ],
    powered: ["campaigns", "workflows", "integrations"],
    industries: ["financial-services", "education", "healthcare"],
    call: {
      title: "Moves a payment to after payday",
      agent: "Ria",
      company: "Halden Energy",
      language: "English",
      direction: "Outbound",
      duration: 32,
      outcome: "Promise to pay · 4 March · link sent",
      lines: [
        { t: 0, who: "agent", text: "Hi Maya, this is Ria from Halden Energy about your March bill of $86.40. Is now a good time?" },
        { t: 7, who: "caller", text: "I get paid on the 3rd. Can I pay on the 4th?" },
        { t: 12, who: "agent", text: "Of course. I've noted the 4th, and I'll text you a payment link now." },
        { t: 19, who: "caller", text: "Great, thank you." },
        { t: 22, who: "agent", text: "You're welcome. I'll send a reminder on the 3rd, just in case." },
      ],
    },
    faq: [
      { q: "Does it follow collections rules?", a: "Calls run inside your calling hours and consent rules, with DND checks and the disclosures you set read on every call." },
      { q: "Can it take a payment on the call?", a: "It can send a secure payment link during the call, or take a payment through your payment system as a skill." },
    ],
  },
  {
    kind: "use-case",
    slug: "appointment-booking",
    name: "Appointment booking",
    short: "Book, confirm and reschedule straight into your calendar.",
    title: "Every booking made, moved and confirmed, day or night.",
    line: "Your Hooman checks free slots while it talks, books or moves the appointment in your calendar, and sends the confirmation.",
    result: "Fewer no-shows",
    steps: [
      { when: "Before the call", title: "Reminds", body: "Calls or messages ahead of the appointment to confirm." },
      { when: "During the call", title: "Finds a slot", body: "Checks live availability and books the time that suits the caller." },
      { when: "After the call", title: "Confirms", body: "Updates the calendar and sends an SMS with the details." },
    ],
    outcomes: [
      { value: "−30%", label: "no-shows", sample: true },
      { value: "24/7", label: "bookings answered", sample: true },
      { value: "45s", label: "average booking", sample: true },
    ],
    powered: ["agents", "integrations", "channels"],
    industries: ["healthcare", "travel", "education"],
    call: {
      title: "Reschedules a visit in Hindi",
      agent: "Asha",
      company: "Kestrel Clinics",
      language: "Hindi",
      direction: "Inbound",
      duration: 26,
      outcome: "Rebooked · Friday 3pm · SMS sent",
      lines: [
        { t: 0, who: "caller", text: "नमस्ते, मुझे कल का अपॉइंटमेंट बदलना है।", translation: "Hi, I need to change tomorrow's appointment." },
        { t: 5, who: "agent", text: "ज़रूर। शुक्रवार सुबह 10 बजे या दोपहर 3 बजे?", translation: "Of course. Friday 10am or 3pm?" },
        { t: 11, who: "caller", text: "शुक्रवार 3 बजे ठीक है।", translation: "Friday at 3 is fine." },
        { t: 15, who: "agent", text: "हो गया। शुक्रवार 3 बजे बुक है, मैं आपको SMS भेज रही हूँ।", translation: "Done. Booked for Friday at 3, sending you an SMS." },
      ],
    },
    faq: [
      { q: "Which calendars does it work with?", a: "Google Calendar natively, and any booking system with an API as a skill." },
      { q: "Can it handle cancellations too?", a: "Yes. It cancels, frees the slot and can offer the next available time." },
    ],
  },
  {
    kind: "use-case",
    slug: "lead-qualification",
    name: "Lead qualification",
    short: "Reach new leads in minutes, qualify them and book the sales call.",
    title: "Call every lead while they're still interested.",
    line: "Your Hooman calls new leads within minutes, asks your qualifying questions, scores the answers and books the right ones with your team.",
    result: "Faster speed to lead",
    steps: [
      { when: "Before the call", title: "Picks up the lead", body: "A form, ad or webhook starts the call within minutes." },
      { when: "During the call", title: "Qualifies", body: "Asks your questions, handles objections and checks fit." },
      { when: "After the call", title: "Hands over", body: "Scores the lead in your CRM and books the sales call." },
    ],
    outcomes: [
      { value: "2 min", label: "to first call", sample: true },
      { value: "3×", label: "more leads reached", sample: true },
      { value: "100%", label: "of leads called", sample: true },
    ],
    powered: ["campaigns", "workflows", "integrations"],
    industries: ["education", "financial-services", "retail"],
    call: {
      title: "Qualifies a course enquiry and books a counsellor",
      agent: "Sam",
      company: "Brightpath Learning",
      language: "English",
      direction: "Outbound",
      duration: 30,
      outcome: "Qualified · counselling call Thursday 11am",
      lines: [
        { t: 0, who: "agent", text: "Hi Priya, it's Sam from Brightpath. You asked about the data science course earlier today?" },
        { t: 6, who: "caller", text: "Yes, I'm looking for something I can do on weekends." },
        { t: 11, who: "agent", text: "Got it. Are you hoping to start this month, or later in the year?" },
        { t: 16, who: "caller", text: "This month, if I can." },
        { t: 19, who: "agent", text: "Then let's get you a plan. I've booked you with a counsellor for Thursday at 11." },
      ],
    },
    faq: [
      { q: "How fast can it call a new lead?", a: "Within minutes of the form or webhook, inside your calling hours." },
      { q: "Can we use our own qualifying questions?", a: "Yes. Write them in the job description; answers are captured as fields in your CRM." },
    ],
  },
  {
    kind: "use-case",
    slug: "support",
    name: "Customer support",
    short: "Answer common questions, look things up and route the rest with a summary.",
    title: "Answer the questions that fill your queue.",
    line: "Your Hooman answers from your knowledge, looks up orders and accounts, and hands the rest to your team with a full summary.",
    result: "Shorter queues",
    steps: [
      { when: "Before the call", title: "Recognises the caller", body: "Matches the number to the customer and their open issues." },
      { when: "During the call", title: "Resolves", body: "Answers from your knowledge base and takes action in your systems." },
      { when: "After the call", title: "Closes the loop", body: "Updates the ticket, or transfers with a summary when a person is needed." },
    ],
    outcomes: [
      { value: "70%", label: "resolved without a person", sample: true },
      { value: "0s", label: "hold time", sample: true },
      { value: "4.6/5", label: "caller rating", sample: true },
    ],
    powered: ["agents", "channels", "integrations"],
    industries: ["retail", "travel", "healthcare"],
    call: {
      title: "Tracks an order and fixes the address",
      agent: "Ria",
      company: "Juniper & Co",
      language: "English",
      direction: "Inbound",
      duration: 28,
      outcome: "Resolved · address updated · ticket closed",
      lines: [
        { t: 0, who: "caller", text: "Hi, where's my order? It was meant to arrive today." },
        { t: 5, who: "agent", text: "It's out for delivery and arrives by 6pm. I can see the flat number is missing, though." },
        { t: 12, who: "caller", text: "Oh, it's flat 4B." },
        { t: 15, who: "agent", text: "Updated to flat 4B. The driver has it now, and I've sent you the tracking link." },
      ],
    },
    faq: [
      { q: "What if it can't help?", a: "It transfers to your team during working hours with a summary, or takes a callback outside them." },
      { q: "Does it work on chat too?", a: "Yes. The same Hooman answers on your website and in your app." },
    ],
  },
  {
    kind: "use-case",
    slug: "renewals",
    name: "Renewals and retention",
    short: "Reach customers before renewal, handle objections, flag the ones at risk.",
    title: "Keep more customers at renewal time.",
    line: "Your Hooman calls before renewal, answers questions, offers the right plan and flags customers at risk for your team.",
    result: "Higher renewal rate",
    steps: [
      { when: "Before the call", title: "Spots the renewal", body: "Your CRM or a schedule starts the call ahead of the date." },
      { when: "During the call", title: "Keeps them", body: "Renews, offers a better-fit plan or answers what's holding them back." },
      { when: "After the call", title: "Flags risk", body: "Writes the outcome and sends at-risk customers to your team." },
    ],
    outcomes: [
      { value: "+12%", label: "renewal rate", sample: true },
      { value: "1 in 4", label: "saves with a better plan", sample: true },
      { value: "100%", label: "of renewals called", sample: true },
    ],
    powered: ["campaigns", "workflows", "quality"],
    industries: ["financial-services", "education", "retail"],
    call: {
      title: "Renews a plan and moves it to yearly",
      agent: "Ria",
      company: "Halden Energy",
      language: "English",
      direction: "Outbound",
      duration: 24,
      outcome: "Renewed · moved to yearly plan",
      lines: [
        { t: 0, who: "agent", text: "Hi Arjun, your plan renews next week. Shall I keep it going?" },
        { t: 5, who: "caller", text: "Yes. Is there anything cheaper if I pay for the year?" },
        { t: 10, who: "agent", text: "There is. The yearly plan saves you two months. Shall I switch you?" },
        { t: 15, who: "caller", text: "Yes please." },
      ],
    },
    faq: [
      { q: "Can it offer discounts?", a: "Only the offers you set, with the rules you write, such as who qualifies and when." },
      { q: "What happens to customers at risk?", a: "They're tagged and sent to your team with the reason, so someone can follow up." },
    ],
  },
  {
    kind: "use-case",
    slug: "surveys",
    name: "Surveys and feedback",
    short: "NPS and post-service calls in the customer's language, every answer logged.",
    title: "Hear from every customer, not just the ones who reply.",
    line: "Your Hooman runs NPS and post-service conversations in the customer's language, asks follow-ups and logs every answer.",
    result: "More responses",
    steps: [
      { when: "Before the call", title: "Picks the moment", body: "A stay, delivery or visit ending starts the call." },
      { when: "During the call", title: "Listens", body: "Asks your questions and a natural follow-up on the answer." },
      { when: "After the call", title: "Logs it", body: "Scores and themes go to your CRM and dashboards." },
    ],
    outcomes: [
      { value: "4×", label: "more responses", sample: true },
      { value: "9", label: "languages", sample: true },
      { value: "100%", label: "of answers logged", sample: true },
    ],
    powered: ["campaigns", "quality", "voice"],
    industries: ["travel", "healthcare", "retail"],
    call: {
      title: "Asks a guest about their stay",
      agent: "Ria",
      company: "A hotel group",
      language: "English (India)",
      direction: "Outbound",
      duration: 81.4,
      audio: "/audio/calls/feedback-en.mp3",
      outcome: "Feedback logged to the CRM",
      // Real recording; the timed transcript is still to come.
      lines: [{ t: 0, who: "agent", text: "A real post-stay feedback call. Press play to listen." }],
      // Sample lines for the use-case card until the transcript is in.
      preview: [
        { t: 0, who: "agent", text: "Hi Sara, it's Ria from Halden. How was your stay, out of 10?" },
        { t: 4, who: "caller", text: "A nine. The room was great, check-in was slow." },
      ],
    },
    faq: [
      { q: "Can it run surveys in Hindi and other languages?", a: "Yes, in English and major Indian languages, switching if the customer does." },
      { q: "Where do the answers go?", a: "Scores, themes and quotes are written to your CRM and show up in your dashboards." },
    ],
  },
]


