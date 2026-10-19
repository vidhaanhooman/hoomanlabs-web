import type { MenuPageId } from "@/content/platform"

/**
 * /solutions (the hub) and /solutions/[slug] (one page per industry). Every
 * industry page follows one template: the hero, one small case study (with its
 * job start to finish), its other use cases as cards,
 * what the industry needs, the shared "works everywhere" strip, a short FAQ.
 *
 * No figures until real ones are approved. The people and orders in the
 * flows are fictional samples (marked Sample). Product claims stay to what
 * the platform pages already say.
 */

export type Tone = "ok" | "warn" | "fail" | "live"
/** A small piece of product for a use-case card: one record with a status. Sample. */
export type JobUi = { label: string; title: string; rows: [string, string][]; pill: { text: string; tone: Tone } }
export type Job = { name: string; body: string; ui?: JobUi }
export type ScreenRow = { name: string; detail: string; status: string; tone: Tone }

export type Industry = {
  slug: string
  name: string
  /** Icon key for the hub card. */
  icon: "graduation" | "bank" | "truck" | "bag" | "stethoscope" | "sparkle"
  /** One line on the hub card. */
  card: string
  seo: { title: string; description: string }
  title: string
  line: string
  /** The use cases; the first is the one the case study covers, the rest are cards. */
  jobs: Job[]
  /** One small case study of the first use case. A fictional company, marked Sample. */
  story: { company: string; title: string; before: string; after: string; results: { value: string; label: string }[] }
  /** The case study's product screen: the day's list for that use case. Sample. */
  screen: { title: string; stats: { label: string; value: string }[]; rows: ScreenRow[] }
  flow: {
    trigger: { title: string; detail: string }
    call: { line: string; length: string }
    result: { outcome: string; system: string }
  }
  needs: { title: string; body: string }[]
  faq: { q: string; a: string }[]
}

export const industries: Industry[] = [
  {
    slug: "education",
    name: "Education",
    icon: "graduation",
    card: "Call every enquiry while it's still warm, and keep learners enrolled.",
    seo: { title: "AI Voice Agents for Education", description: "Call course enquiries in minutes, book counsellors, remind about fees and renew learners, in English and Indian languages." },
    title: "Call every enquiry while it's still warm.",
    line: "Hoomans call new enquiries in minutes, book counselling sessions, remind about fees and keep learners enrolled.",
    jobs: [
      { name: "Admissions enquiry follow-up", body: "Calls each new enquiry within minutes, answers course questions and books a counsellor." },
      {
        name: "Fee reminders",
        body: "Reminds families before each fee is due and sends the payment link.",
        ui: {
          label: "Fee reminder",
          title: "Term 2 fee · ₹48,000",
          rows: [
            ["Parent", "Asha Menon"],
            ["Due", "10 Apr"],
          ],
          pill: { text: "Link sent", tone: "ok" },
        },
      },
      {
        name: "Course renewals",
        body: "Calls before access ends and renews the plan on the call.",
        ui: {
          label: "Renewal",
          title: "Annual plan · ends in 7 days",
          rows: [
            ["Learner", "Omar Haddad"],
            ["Plan", "Data science"],
          ],
          pill: { text: "Renewed", tone: "ok" },
        },
      },
      {
        name: "Admission documents",
        body: "Chases missing documents before the deadline and sends the upload link.",
        ui: {
          label: "Documents",
          title: "2 of 4 uploaded",
          rows: [
            ["Student", "Sara Kim"],
            ["Deadline", "Fri 5 pm"],
          ],
          pill: { text: "Reminder set", tone: "warn" },
        },
      },
    ],
    story: {
      company: "Kestrel Learning",
      title: "Every enquiry called in two minutes, not two days.",
      before: "Enquiries came in late at night and waited for counsellors the next day. By then, many students had signed up elsewhere.",
      after: "A Hooman now calls each enquiry within minutes, answers course questions and books a counsellor for the next free slot.",
      results: [
        { value: "2 min", label: "from enquiry to first call" },
        { value: "2×", label: "counselling sessions booked" },
        { value: "24/7", label: "enquiries answered" },
      ],
    },
    screen: {
      title: "Kestrel Learning · Enquiries",
      stats: [
        { label: "Called today", value: "312" },
        { label: "Booked", value: "128" },
        { label: "Calling now", value: "14" },
      ],
      rows: [
        { name: "Maya Patel", detail: "Data science", status: "Counsellor booked", tone: "ok" },
        { name: "Omar Haddad", detail: "MBA", status: "On the call", tone: "live" },
        { name: "Priya Shah", detail: "UX design", status: "Callback 6 pm", tone: "warn" },
        { name: "Sara Kim", detail: "Data science", status: "Counsellor booked", tone: "ok" },
        { name: "Daniel Brooks", detail: "Cloud", status: "No answer · retry", tone: "warn" },
      ],
    },
    flow: {
      trigger: { title: "New enquiry", detail: "Data science course · 9:02 pm" },
      call: { line: "Shall I book you a call with a counsellor this week?", length: "2:14" },
      result: { outcome: "Counsellor booked · Thu 5 pm", system: "CRM updated" },
    },
    needs: [
      { title: "Speed to first call", body: "Enquiries are called while the student is still deciding, not days later." },
      { title: "Their language", body: "Students and parents talk in the language they're comfortable with, and can switch mid-call." },
      { title: "Counsellors' calendars", body: "Sessions are booked straight into the right counsellor's calendar." },
    ],
    faq: [
      { q: "Can it call enquiries that come in late at night?", a: "Yes. It calls within your calling hours and books counsellors into the next free slot." },
      { q: "Which languages can students use?", a: "English and major Indian languages, switching mid-call if they do." },
    ],
  },
  {
    slug: "bfsi",
    name: "BFSI",
    icon: "bank",
    card: "Collections, renewals and KYC calls that follow the rules.",
    seo: {
      title: "AI Voice Agents for Banking, Financial Services and Insurance",
      description: "Payment collections, policy renewals, KYC reminders and loan follow-up calls, with disclosures read word for word.",
    },
    title: "Collections and renewals that follow the rules.",
    line: "Hoomans call before and after due dates, read your disclosures word for word and take or log the payment.",
    jobs: [
      { name: "Payment collections", body: "Calls before and after the due date and takes or logs the payment." },
      {
        name: "Policy renewals",
        body: "Calls before a policy lapses and renews it with the same cover.",
        ui: {
          label: "Renewal",
          title: "Motor policy · lapses 12 Apr",
          rows: [
            ["Customer", "Omar Haddad"],
            ["Cover", "Same as last year"],
          ],
          pill: { text: "Renewed", tone: "ok" },
        },
      },
      {
        name: "KYC reminders",
        body: "Asks for updated documents and sends the upload link.",
        ui: {
          label: "KYC",
          title: "Address proof needed",
          rows: [
            ["Customer", "Priya Shah"],
            ["Sent", "Upload link"],
          ],
          pill: { text: "Awaiting upload", tone: "warn" },
        },
      },
      {
        name: "Loan application follow-up",
        body: "Calls applicants who stopped halfway and helps them finish.",
        ui: {
          label: "Application",
          title: "Personal loan · step 3 of 5",
          rows: [
            ["Applicant", "Daniel Brooks"],
            ["Stopped at", "Income details"],
          ],
          pill: { text: "Completed", tone: "ok" },
        },
      },
    ],
    story: {
      company: "Halden Finance",
      title: "More on-time payments, with every disclosure read.",
      before: "Collections calls were made by hand, late in the cycle, and disclosures weren't always read the same way.",
      after: "A Hooman calls before and after each due date, reads the disclosure word for word and logs every promise to pay.",
      results: [
        { value: "+18%", label: "on-time payments" },
        { value: "100%", label: "of calls with disclosures read" },
        { value: "3×", label: "customers reached each day" },
      ],
    },
    screen: {
      title: "Halden Finance · Collections",
      stats: [
        { label: "Reached", value: "1,240" },
        { label: "Promises", value: "486" },
        { label: "Disclosures read", value: "100%" },
      ],
      rows: [
        { name: "Maya Patel", detail: "$240 · due 5 Mar", status: "Promise · Friday", tone: "ok" },
        { name: "Omar Haddad", detail: "$610 · due 2 Mar", status: "Paid on call", tone: "ok" },
        { name: "Sara Kim", detail: "$180 · due 6 Mar", status: "On the call", tone: "live" },
        { name: "Daniel Brooks", detail: "$420 · due 1 Mar", status: "Dispute · to team", tone: "fail" },
        { name: "Asha Menon", detail: "$95 · due 7 Mar", status: "Callback tomorrow", tone: "warn" },
      ],
    },
    flow: {
      trigger: { title: "Instalment missed", detail: "$240 · due 5 Mar" },
      call: { line: "This call is recorded. I'll note Friday and text you a link to pay.", length: "1:48" },
      result: { outcome: "Promise to pay · Friday", system: "Loan system updated" },
    },
    needs: [
      { title: "Disclosures, word for word", body: "Fixed steps read your required wording exactly, every time." },
      { title: "Only allowed offers", body: "It offers only the plans your policy allows, and hands anything else to your team." },
      { title: "A record of every call", body: "Every call is recorded and transcribed, with what was said and done." },
    ],
    faq: [
      { q: "Can it read our exact compliance script?", a: "Yes. Fixed conversation steps read your wording word for word, and branches decide when they apply." },
      { q: "What happens when a customer disputes?", a: "It hands the call to your team with a summary, inside your transfer hours." },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: "truck",
    card: "Confirm every delivery before it leaves, and fix the address on the call.",
    seo: { title: "AI Voice Agents for Logistics", description: "Delivery confirmation, rescheduling and cash-on-delivery confirmation calls that update your route." },
    title: "Every delivery confirmed before it leaves.",
    line: "Hoomans call the day before to confirm the slot and the address, and write the changes back to your delivery system.",
    jobs: [
      { name: "Delivery confirmation", body: "Confirms the slot and fixes the address the day before dispatch." },
      {
        name: "Failed delivery rescheduling",
        body: "Calls after a missed delivery and books the next attempt.",
        ui: {
          label: "Missed delivery",
          title: "Order 7764 · attempt 1 failed",
          rows: [
            ["Customer", "Sara Kim"],
            ["Next attempt", "Tomorrow, 9–12"],
          ],
          pill: { text: "Rebooked", tone: "ok" },
        },
      },
      {
        name: "Cash-on-delivery confirmation",
        body: "Confirms COD orders before they ship, so fewer come back.",
        ui: {
          label: "Cash on delivery",
          title: "Order 7790 · ₹2,350",
          rows: [
            ["Customer", "Daniel Brooks"],
            ["Ships", "Today"],
          ],
          pill: { text: "Confirmed", tone: "ok" },
        },
      },
      {
        name: "Pickup booking",
        body: "Books return and reverse pickups at a time the customer is home.",
        ui: {
          label: "Pickup",
          title: "Return · 1 parcel",
          rows: [
            ["Customer", "Asha Menon"],
            ["Slot", "Sat, 10–1"],
          ],
          pill: { text: "Pickup booked", tone: "ok" },
        },
      },
    ],
    story: {
      company: "Corvo Logistics",
      title: "Fewer failed deliveries, confirmed the day before.",
      before: "Drivers arrived to locked doors and wrong addresses, and every failed attempt cost a second trip.",
      after: "A Hooman calls the day before dispatch, confirms the slot, fixes the address and updates the route.",
      results: [
        { value: "−35%", label: "failed first deliveries" },
        { value: "1 in 5", label: "addresses corrected on the call" },
        { value: "Next day", label: "routes planned on confirmed slots" },
      ],
    },
    screen: {
      title: "Corvo Logistics · Tomorrow's deliveries",
      stats: [
        { label: "To confirm", value: "2,860" },
        { label: "Confirmed", value: "2,214" },
        { label: "Address fixed", value: "418" },
      ],
      rows: [
        { name: "Order 7731", detail: "Maya Patel · 3–6 pm", status: "Address fixed", tone: "ok" },
        { name: "Order 7732", detail: "Omar Haddad · 10–2", status: "Confirmed", tone: "ok" },
        { name: "Order 7735", detail: "Priya Shah · 10–2", status: "On the call", tone: "live" },
        { name: "Order 7738", detail: "Sara Kim · 2–6", status: "Moved to Sat", tone: "warn" },
        { name: "Order 7741", detail: "Daniel Brooks · 10–2", status: "Unreachable", tone: "fail" },
      ],
    },
    flow: {
      trigger: { title: "Delivery tomorrow", detail: "Order 7731 · 10 am – 2 pm" },
      call: { line: "I've moved it to 3 to 6 pm and added your flat number, 4B.", length: "1:12" },
      result: { outcome: "Slot and address confirmed", system: "Route updated" },
    },
    needs: [
      { title: "Volume, on time", body: "Thousands of calls go out in the hours before dispatch." },
      { title: "Clean addresses", body: "Missing flat numbers and landmarks are fixed on the call." },
      { title: "Back into your system", body: "Every confirmed slot and address lands in your delivery system." },
    ],
    faq: [
      { q: "Can it update our delivery system?", a: "Yes, through tools that call your system's API, so the route reflects every change." },
      { q: "What if the customer doesn't pick up?", a: "Retries follow your rules, and the order is flagged if the customer can't be reached." },
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    icon: "bag",
    card: "Support every order without growing the team.",
    seo: { title: "AI Voice Agents for E-commerce", description: "Order support, abandoned cart follow-up and returns, answered and resolved in the call." },
    title: "Support every order without growing the team.",
    line: "Hoomans answer every order call, track and fix orders in your systems, and close the ticket with a summary.",
    jobs: [
      { name: "Order support", body: "Tracks the order, fixes the address or starts a return, and closes the ticket." },
      {
        name: "Abandoned cart follow-up",
        body: "Calls shoppers who left items behind and helps them check out.",
        ui: {
          label: "Abandoned cart",
          title: "2 items · $86",
          rows: [
            ["Shopper", "Priya Shah"],
            ["Left", "Yesterday"],
          ],
          pill: { text: "Checked out", tone: "ok" },
        },
      },
      {
        name: "Returns and exchanges",
        body: "Books the pickup and arranges the replacement in the same call.",
        ui: {
          label: "Return",
          title: "Lamp · wrong colour",
          rows: [
            ["Customer", "Omar Haddad"],
            ["Pickup", "Thu, 9–12"],
          ],
          pill: { text: "Exchange sent", tone: "ok" },
        },
      },
      {
        name: "Post-delivery feedback",
        body: "Calls after delivery to ask how it went and log the answers.",
        ui: {
          label: "Feedback",
          title: "Delivered yesterday",
          rows: [
            ["Customer", "Asha Menon"],
            ["Rating", "5 of 5"],
          ],
          pill: { text: "Logged", tone: "ok" },
        },
      },
    ],
    story: {
      company: "Lumen Home",
      title: "Order calls answered on the first ring, day and night.",
      before: "On sale days the support line queued for half an hour, and most calls were the same question: where is my order?",
      after: "A Hooman picks up every call, finds the order from the caller's number, fixes it and closes the ticket.",
      results: [
        { value: "70%", label: "of order calls resolved" },
        { value: "0 min", label: "wait, even on sale days" },
        { value: "24/7", label: "support line open" },
      ],
    },
    screen: {
      title: "Lumen Home · Support line",
      stats: [
        { label: "Calls today", value: "940" },
        { label: "Resolved", value: "658" },
        { label: "Wait", value: "0 min" },
      ],
      rows: [
        { name: "Maya Patel", detail: "Where's my order?", status: "Resolved", tone: "ok" },
        { name: "Daniel Brooks", detail: "Change address", status: "Resolved", tone: "ok" },
        { name: "Sara Kim", detail: "Start a return", status: "On the call", tone: "live" },
        { name: "Omar Haddad", detail: "Damaged item", status: "To team · summary", tone: "warn" },
        { name: "Priya Shah", detail: "Refund status", status: "Resolved", tone: "ok" },
      ],
    },
    flow: {
      trigger: { title: "Customer calls", detail: "“Where's my order?” · 11:40 pm" },
      call: { line: "It arrives by 6 pm. Which flat number should I add?", length: "1:36" },
      result: { outcome: "Resolved · address fixed", system: "Ticket closed" },
    },
    needs: [
      { title: "No queues on sale days", body: "Every call is picked up, however busy it gets." },
      { title: "Answers from the order", body: "It finds the order from the caller's number and acts on it." },
      { title: "A person when needed", body: "Unusual cases go to your team with the full context." },
    ],
    faq: [
      { q: "Does it work with our helpdesk?", a: "Yes. It connects to your helpdesk and anything else with an API." },
      { q: "Can it answer chat too?", a: "Yes. The same agent can answer on your website and in your app." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "stethoscope",
    card: "Every patient call answered, every slot filled.",
    seo: { title: "AI Voice Agents for Healthcare", description: "Appointment booking, reminders and post-visit check-ins, in the patient's language." },
    title: "Every patient call answered, every slot filled.",
    line: "Hoomans book and remind, answer common questions and follow up after visits, so your front desk can focus on the patients in front of them.",
    jobs: [
      { name: "Appointment booking", body: "Books visits after hours too, and sends directions by text." },
      {
        name: "Appointment reminders",
        body: "Calls the day before each visit and reschedules if needed.",
        ui: {
          label: "Reminder",
          title: "Dr Rao · tomorrow 10 am",
          rows: [
            ["Patient", "Omar Haddad"],
            ["Reply", "Can't make it"],
          ],
          pill: { text: "Moved to Fri", tone: "warn" },
        },
      },
      {
        name: "Post-visit check-ins",
        body: "Calls after a visit to see how the patient feels and book a review.",
        ui: {
          label: "Check-in",
          title: "3 days after visit",
          rows: [
            ["Patient", "Asha Menon"],
            ["Feeling", "Better"],
          ],
          pill: { text: "Review booked", tone: "ok" },
        },
      },
      {
        name: "Lab report notifications",
        body: "Lets patients know their report is ready and books a follow-up.",
        ui: {
          label: "Lab report",
          title: "Blood test · ready",
          rows: [
            ["Patient", "Priya Shah"],
            ["Follow-up", "Mon 11 am"],
          ],
          pill: { text: "Booked", tone: "ok" },
        },
      },
    ],
    story: {
      company: "Rao Family Clinics",
      title: "Fewer no-shows, and bookings taken after hours.",
      before: "The front desk missed calls after 6 pm, and many booked patients forgot their visit.",
      after: "A Hooman answers every call, books into the doctors' calendars and calls the day before each visit.",
      results: [
        { value: "−30%", label: "no-shows" },
        { value: "40%", label: "of bookings made after hours" },
        { value: "0", label: "missed calls" },
      ],
    },
    screen: {
      title: "Rao Family Clinics · Front desk",
      stats: [
        { label: "Calls today", value: "418" },
        { label: "Booked", value: "172" },
        { label: "After hours", value: "40%" },
      ],
      rows: [
        { name: "Maya Patel", detail: "New visit · Dr Rao", status: "Booked Thu 10 am", tone: "ok" },
        { name: "Daniel Brooks", detail: "Reschedule", status: "Moved to Mon", tone: "ok" },
        { name: "Sara Kim", detail: "Clinic hours", status: "On the call", tone: "live" },
        { name: "Omar Haddad", detail: "Symptoms question", status: "To staff", tone: "warn" },
        { name: "Asha Menon", detail: "New visit · Dr Iyer", status: "Booked Fri 3 pm", tone: "ok" },
      ],
    },
    flow: {
      trigger: { title: "After-hours call", detail: "Wants Dr Rao this week · 8:15 pm" },
      call: { line: "Dr Rao has Thursday at 10 or Friday at 3. Which suits you?", length: "1:20" },
      result: { outcome: "Visit booked · Thu 10 am", system: "Calendar updated" },
    },
    needs: [
      { title: "Admin, not advice", body: "It handles bookings and admin questions, and hands anything clinical to your staff." },
      { title: "The patient's language", body: "Patients speak the language they're comfortable with." },
      { title: "Fewer missed visits", body: "Reminder calls confirm or move visits before the slot is lost." },
    ],
    faq: [
      { q: "Can it give medical advice?", a: "No. It handles bookings and admin questions and hands anything clinical to your staff." },
      { q: "Which languages can patients use?", a: "English and major Indian languages, switching mid-call if they do." },
    ],
  },
  {
    slug: "consumer-ai",
    name: "Consumer AI",
    icon: "sparkle",
    card: "A voice for your app's users, at any scale.",
    seo: { title: "AI Voice Agents for Consumer AI Apps", description: "In-app voice support, onboarding and renewal conversations for consumer apps." },
    title: "A voice for your app's users, at any scale.",
    line: "Hoomans talk to your users inside the app, know their account, and fix billing and access in the conversation.",
    jobs: [
      { name: "In-app voice support", body: "Users tap to talk and get help without leaving the app." },
      {
        name: "Onboarding calls",
        body: "Walks new users through setup in their first week.",
        ui: {
          label: "Onboarding",
          title: "Day 2 · setup 60% done",
          rows: [
            ["User", "Sara Kim"],
            ["Next", "Connect calendar"],
          ],
          pill: { text: "Set up", tone: "ok" },
        },
      },
      {
        name: "Subscription renewals",
        body: "Reminds users before renewal and keeps the plan going.",
        ui: {
          label: "Renewal",
          title: "Pro plan · renews 3 May",
          rows: [
            ["User", "Daniel Brooks"],
            ["Plan", "$9.99 a month"],
          ],
          pill: { text: "Kept", tone: "ok" },
        },
      },
      {
        name: "Win-back calls",
        body: "Calls users who cancelled to understand why and offer a way back.",
        ui: {
          label: "Win-back",
          title: "Cancelled 2 weeks ago",
          rows: [
            ["User", "Priya Shah"],
            ["Reason", "Too expensive"],
          ],
          pill: { text: "Offer accepted", tone: "ok" },
        },
      },
    ],
    story: {
      company: "Tandem",
      title: "Voice support inside the app, at any scale.",
      before: "Billing and access questions went to email, and users waited a day for answers.",
      after: "Users tap to talk inside the app. A Hooman sees their account, fixes billing or access and logs the conversation.",
      results: [
        { value: "80%", label: "resolved in the conversation" },
        { value: "Seconds", label: "to an answer, not a day" },
        { value: "1", label: "agent for voice and chat" },
      ],
    },
    screen: {
      title: "Tandem · In-app voice",
      stats: [
        { label: "Conversations", value: "3,100" },
        { label: "Resolved", value: "80%" },
        { label: "Live now", value: "42" },
      ],
      rows: [
        { name: "Maya Patel", detail: "Charged twice", status: "Refund issued", tone: "ok" },
        { name: "Omar Haddad", detail: "Can't sign in", status: "Access restored", tone: "ok" },
        { name: "Asha Menon", detail: "Change plan", status: "In conversation", tone: "live" },
        { name: "Daniel Brooks", detail: "Delete account", status: "To team", tone: "warn" },
        { name: "Sara Kim", detail: "Export data", status: "Resolved", tone: "ok" },
      ],
    },
    flow: {
      trigger: { title: "User taps to talk", detail: "Charged twice this month" },
      call: { line: "I can see two charges of $9.99. I've refunded the second one.", length: "0:58" },
      result: { outcome: "Refund issued", system: "Billing updated" },
    },
    needs: [
      { title: "Inside the app", body: "Voice works in your app and on the web, not only by phone." },
      { title: "Knows the account", body: "It sees the user's plan and recent activity before it answers." },
      { title: "Acts, then logs", body: "It fixes billing or access, then logs the conversation for your team." },
    ],
    faq: [
      { q: "Can users talk to it inside our app?", a: "Yes. Add a talk button to your app or website and users speak to the same agent." },
      { q: "Does it work for chat as well?", a: "Yes. One agent handles voice and chat with the same prompt and tools." },
    ],
  },
]

export const industryBySlug = (slug: string) => industries.find((x) => x.slug === slug)
export const industryHref = (slug: string) => `/solutions/${slug}`

/** The "works everywhere" strip, each linking to the platform page that covers it. */
export const everywhere: { title: string; body: string; page: MenuPageId }[] = [
  { title: "Your customers' languages", body: "English and major Indian languages, switching mid-call.", page: "voice" },
  { title: "Your systems", body: "CRMs, helpdesks, calendars and any API, used during the call.", page: "integrations" },
  { title: "A person when needed", body: "Warm handoff to your team, with the full context.", page: "human-ai" },
  { title: "Security", body: "How data is handled, stored and protected.", page: "security" },
]
