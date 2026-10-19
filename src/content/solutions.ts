import type { MenuPageId } from "@/content/platform"

/**
 * /solutions: use cases and industries as one matrix. Every use case lists
 * the industries it serves and every industry lists its use cases (with a
 * line on how it plays out there), so the hub, the detail pages and every
 * cross-link are generated from this file.
 *
 * PLACEHOLDER CONTENT throughout: the industry list, every metric (marked
 * `sample`), the systems per industry and the companies in the calls are
 * fictional until real ones are approved. No client content.
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

export type Industry = {
  kind: "industry"
  slug: string
  name: string
  short: string
  title: string
  line: string
  /** The work, in this industry's words, keyed by use-case slug. */
  jobs: { useCase: string; how: string }[]
  story: { day: string; title: string; body: string }[]
  systems: string[]
  compliance: { title: string; body: string }[]
  proof: { value: string; label: string; sample: true }
  faq: { q: string; a: string }[]
}

export const solutionsHub = {
  seo: {
    title: "AI Voice Agent Solutions by Use Case and Industry",
    description: "AI voice agents for collections, bookings, lead qualification, support, renewals and surveys, across healthcare, education, retail, travel and financial services.",
  },
  crumb: "Solutions",
  title: "Put a Hooman on the calls that matter most.",
  line: "Start from the job you need done, or from your industry. Every use case ends in a result you can count.",
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
    },
    faq: [
      { q: "Can it run surveys in Hindi and other languages?", a: "Yes, in English and major Indian languages, switching if the customer does." },
      { q: "Where do the answers go?", a: "Scores, themes and quotes are written to your CRM and show up in your dashboards." },
    ],
  },
]

export const industries: Industry[] = [
  {
    kind: "industry",
    slug: "healthcare",
    name: "Healthcare",
    short: "Bookings, reminders and follow-ups for clinics and hospitals.",
    title: "Every patient call answered, every slot filled.",
    line: "Hoomans book and remind, answer common questions and follow up after visits, so your front desk can focus on patients in front of them.",
    jobs: [
      { useCase: "appointment-booking", how: "Books, moves and confirms consultations in your calendar." },
      { useCase: "support", how: "Answers timings, directions, prices and reports questions." },
      { useCase: "surveys", how: "Calls after a visit to check in and log feedback." },
      { useCase: "payment-collections", how: "Reminds patients about pending bills and payment plans." },
    ],
    story: [
      { day: "Day 1", title: "Booked", body: "A patient calls at 9pm; the Hooman books Thursday at 10." },
      { day: "Day 3", title: "Reminded", body: "A reminder call the day before, with directions by SMS." },
      { day: "Day 4", title: "Visited", body: "The patient arrives; no-show avoided." },
      { day: "Day 6", title: "Followed up", body: "A check-in call logs how they're feeling and books a review." },
    ],
    systems: ["Practice management", "Google Calendar", "Your CRM", "WhatsApp (soon)"],
    compliance: [
      { title: "Consent and privacy", body: "Calls follow your consent rules, and sensitive details stay out of summaries you share." },
      { title: "Human handoff", body: "Clinical questions go straight to your staff with the context." },
    ],
    proof: { value: "−30%", label: "no-shows", sample: true },
    faq: [
      { q: "Can it give medical advice?", a: "No. It handles bookings and admin questions and hands anything clinical to your staff." },
      { q: "Which languages can patients use?", a: "English and major Indian languages, switching mid-call if they do." },
    ],
  },
  {
    kind: "industry",
    slug: "education",
    name: "Education",
    short: "Enquiries, counselling bookings, fee reminders and renewals.",
    title: "Call every enquiry while it's still warm.",
    line: "Hoomans call new enquiries in minutes, book counselling sessions, remind about fees and keep learners enrolled.",
    jobs: [
      { useCase: "lead-qualification", how: "Calls course enquiries in minutes and books a counsellor." },
      { useCase: "payment-collections", how: "Reminds about instalments and sets up fee plans." },
      { useCase: "renewals", how: "Calls ahead of renewal and keeps learners on track." },
      { useCase: "appointment-booking", how: "Schedules demos, classes and counselling slots." },
    ],
    story: [
      { day: "Day 1", title: "Enquired", body: "A form fills at 8pm; the Hooman calls within two minutes." },
      { day: "Day 1", title: "Qualified", body: "Weekend batch, starting this month; counselling booked." },
      { day: "Day 3", title: "Enrolled", body: "The counsellor closes; the first instalment is due on the 5th." },
      { day: "Day 34", title: "Reminded", body: "A friendly fee reminder and a payment link." },
    ],
    systems: ["Your CRM", "Lead forms and ads", "Google Calendar", "Payment links"],
    compliance: [
      { title: "Calling hours", body: "Calls only go out within the hours you allow, in the learner's time zone." },
      { title: "Do-not-call", body: "Numbers on DND lists are skipped automatically." },
    ],
    proof: { value: "2 min", label: "from enquiry to first call", sample: true },
    faq: [
      { q: "Can it talk to parents as well as learners?", a: "Yes. The same Hooman adapts its script to who answers." },
      { q: "Does it work with our CRM?", a: "Zoho CRM natively, and any CRM with an API as a skill." },
    ],
  },
  {
    kind: "industry",
    slug: "retail",
    name: "Retail & D2C",
    short: "Order support, COD confirmation, feedback and repeat purchase.",
    title: "Support every order without growing the team.",
    line: "Hoomans answer where-is-my-order calls, confirm orders, collect feedback and bring customers back.",
    jobs: [
      { useCase: "support", how: "Tracks orders, fixes addresses and handles returns." },
      { useCase: "surveys", how: "Calls after delivery to ask how it went." },
      { useCase: "lead-qualification", how: "Follows up on abandoned carts and new sign-ups." },
      { useCase: "renewals", how: "Brings customers back for subscriptions and repeat orders." },
    ],
    story: [
      { day: "Day 1", title: "Ordered", body: "A cash-on-delivery order; the Hooman calls to confirm the address." },
      { day: "Day 2", title: "Tracked", body: "The customer calls to ask where it is; answered in seconds." },
      { day: "Day 3", title: "Delivered", body: "A short feedback call logs a 9 out of 10." },
      { day: "Day 30", title: "Reordered", body: "A reminder before the refill runs out." },
    ],
    systems: ["Your store and order system", "Helpdesk", "Your CRM", "SMS"],
    compliance: [
      { title: "Verified calling", body: "Calls come from verified business numbers, so more customers pick up." },
      { title: "Opt-outs", body: "Anyone who opts out is never called again." },
    ],
    proof: { value: "70%", label: "of order calls resolved", sample: true },
    faq: [
      { q: "Can it confirm cash-on-delivery orders?", a: "Yes. It calls, confirms the order and address, and updates your system." },
      { q: "Can it handle returns?", a: "It explains your policy, starts the return and books the pickup through your system." },
    ],
  },
  {
    kind: "industry",
    slug: "travel",
    name: "Travel & hospitality",
    short: "Bookings, pre-arrival calls, guest support and post-stay feedback.",
    title: "Look after every guest, before and after the stay.",
    line: "Hoomans take bookings, call before arrival, answer guest questions and ask about the stay afterwards.",
    jobs: [
      { useCase: "appointment-booking", how: "Takes and changes bookings, day or night." },
      { useCase: "support", how: "Answers check-in, directions and amenities questions." },
      { useCase: "surveys", how: "Calls after checkout to ask about the stay." },
    ],
    story: [
      { day: "Day 1", title: "Booked", body: "A late-night call books two nights for the weekend." },
      { day: "Day 6", title: "Pre-arrival", body: "A call the day before confirms timing and shares directions." },
      { day: "Day 7", title: "Stayed", body: "Guest questions answered on the phone and in chat." },
      { day: "Day 9", title: "Feedback", body: "A post-stay call logs the rating and what to improve." },
    ],
    systems: ["Booking engine", "Your CRM", "Google Calendar", "SMS"],
    compliance: [
      { title: "Calling hours", body: "Guests are only called at sensible local times." },
      { title: "Human handoff", body: "Complaints go straight to your team with the details." },
    ],
    proof: { value: "4×", label: "more guest feedback", sample: true },
    faq: [
      { q: "Can it take bookings at night?", a: "Yes. It answers every call, 24/7, and books straight into your system." },
      { q: "Can it upsell?", a: "It can offer the add-ons you set, such as late checkout or meals." },
    ],
  },
  {
    kind: "industry",
    slug: "financial-services",
    name: "Financial services",
    short: "Collections, renewals, lead follow-up and verification calls.",
    title: "Collections and renewals that follow the rules.",
    line: "Hoomans remind, collect, renew and follow up on applications, inside your calling rules and with every disclosure read.",
    jobs: [
      { useCase: "payment-collections", how: "Early-stage reminders, promises to pay and plans." },
      { useCase: "renewals", how: "Policy and plan renewals, with objections handled." },
      { useCase: "lead-qualification", how: "Follows up on applications and books an advisor." },
    ],
    story: [
      { day: "Day −3", title: "Reminded", body: "A friendly call before the due date." },
      { day: "Day 1", title: "Promised", body: "The customer asks for the 4th; promise logged, link sent." },
      { day: "Day 3", title: "Nudged", body: "A reminder the day before the promise." },
      { day: "Day 4", title: "Paid", body: "Payment lands; the account is updated automatically." },
    ],
    systems: ["Loan or core system", "Your CRM", "Payment links", "Call events to your database"],
    compliance: [
      { title: "Disclosures on every call", body: "Required lines are read and checked by a code judge on every call." },
      { title: "DND and calling hours", body: "DND numbers are skipped and calls stay within allowed hours." },
    ],
    proof: { value: "+18%", label: "on-time payments", sample: true },
    faq: [
      { q: "How do we know every call was compliant?", a: "Every call is scored, including a check that each disclosure was read, and any miss points to the exact turn." },
      { q: "Can it handle hardship cases?", a: "It follows your rules, offers plans you allow and hands sensitive cases to your team." },
    ],
  },
]

export const caseBySlug = (slug: string) => useCases.find((u) => u.slug === slug)
export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug)
export const solutionHref = (slug: string) => `/solutions/${slug}`
/** Use cases have no page of their own: they live as cards on /solutions, each with its slug as the anchor. */
export const caseHref = (slug: string) => `/solutions#${slug}`
