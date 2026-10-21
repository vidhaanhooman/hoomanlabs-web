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
export type Job = { name: string; body: string }
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
  /** The kinds of customer in this industry, each with its use cases (tabs). */
  segments: { name: string; cases: { name: string; body: string }[] }[]
  /** One call followed through five stages, for the detailed funnel. Sample. */
  funnel: {
    trigger: { at: string; title: string; detail: string }
    /** What the agent knows before it says hello. */
    context: [string, string][]
    turns: { who: "agent" | "caller"; text: string }[]
    /** The action taken during the call, shown inline after the turns. */
    tool: { name: string; args: string }
    length: string
    /** What gets written back after the call. */
    after: string[]
    result: { title: string; detail: string }
    /** The same call told in plain words, one sentence per stage, for non-technical readers. */
    story: { start: string; ready: string; action: string; result: string }
  }
  /** The story in two short paragraphs: what goes wrong today, and what changes with Ria. Sample. */
  narrative: { before: string; after: string }
  /** The three problems this industry has, and how a Hooman solves each (same order). */
  problems: { title: string; body: string }[]
  /** Each with one moment from a call: who said it, when, and the words to highlight. Sample. */
  solves: { title: string; body: string; moment: { who: string; at: string; text: string; mark: string[] }; done: { title: string; detail: string } }[]
  /** A customer quote; hidden until an approved one exists. */
  quote?: { text: string; name: string; role: string }
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
      },
      {
        name: "Course renewals",
        body: "Calls before access ends and renews the plan on the call.",
      },
      {
        name: "Admission documents",
        body: "Chases missing documents before the deadline and sends the upload link.",
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
    segments: [
      {
        name: "Universities & colleges",
        cases: [
          { name: "Admissions enquiry follow-up", body: "Calls each enquiry within minutes and books a counsellor." },
          { name: "Application documents", body: "Chases missing documents before the deadline and sends the upload link." },
          { name: "Fee reminders", body: "Reminds families before each fee is due and sends the payment link." },
          { name: "Alumni outreach", body: "Invites alumni to events and updates their details." },
        ],
      },
      {
        name: "Test prep & coaching",
        cases: [
          { name: "Lead qualification", body: "Asks about the exam, goals and timing, and scores every lead." },
          { name: "Demo class booking", body: "Books a free demo class at a time that suits the student." },
          { name: "Batch reminders", body: "Reminds students before each class and reschedules missed ones." },
          { name: "Course renewals", body: "Calls before access ends and renews the plan on the call." },
        ],
      },
      {
        name: "Online learning",
        cases: [
          { name: "Onboarding calls", body: "Welcomes new learners and helps them start their first lesson." },
          { name: "Completion nudges", body: "Checks in when a learner falls behind and books a mentor session." },
          { name: "Subscription renewals", body: "Reminds learners before renewal and keeps the plan going." },
          { name: "Course feedback", body: "Asks what worked and what didn't, and logs every answer." },
        ],
      },
    ],
    funnel: {
      trigger: { at: "9:02 pm", title: "New enquiry from the website", detail: "Maya Patel · Data science course" },
      context: [
        ["Course", "The one they asked about"],
        ["Source", "Website form, minutes ago"],
        ["Counsellor", "Next free slot"],
      ],
      turns: [
        { who: "agent", text: "Hi, this is Ria from the admissions team. You asked about our data science course?" },
        { who: "caller", text: "Yes, is there a weekend batch?" },
        { who: "agent", text: "There is, on Saturdays and Sundays. Shall I book a call with a counsellor?" },
        { who: "caller", text: "Thursday evening works." },
      ],
      tool: { name: "book_counsellor", args: "Thu 5 pm, Priya Shah" },
      length: "2:14",
      after: ["Session booked in the counsellor's calendar", "Lead marked qualified in the CRM", "Confirmation sent by SMS", "Summary added to the lead"],
      result: { title: "Counsellor booked", detail: "Minutes after the enquiry" },
      story: {
        start: "Late in the evening, a student fills in an enquiry form for a course.",
        ready: "Within minutes Ria calls, already knowing which course they asked about and when a counsellor is free.",
        action: "While they talk, Ria answers their questions and books a counsellor session.",
        result: "The student has a session booked minutes after asking, and nobody on your team had to pick up the phone.",
      },
    },
    narrative: {
      before:
        "Most enquiries arrive in the evening, when students finally have time to look. Counsellors call back the next morning, often later. By then many students have signed up somewhere else, and the rest are harder to reach.",
      after:
        "Now every enquiry gets a call within minutes, from Ria. She knows which course the student asked about, answers their questions in their language, and books them straight into a counsellor's calendar. Counsellors spend their day on the conversations that need them.",
    },
    problems: [
      { title: "Enquiries go cold", body: "Students enquire at night and on weekends. By the time a counsellor calls back, many have signed up elsewhere." },
      { title: "Counsellors stuck on routine calls", body: "Reminders and follow-ups eat the hours meant for real conversations with students." },
      { title: "Learners drop off quietly", body: "Missed fees and lapsed renewals go unnoticed until the learner has already left." },
    ],
    solves: [
      {
        title: "Called within minutes",
        body: "A Hooman calls every new enquiry within minutes, answers course questions and books a counsellor.",
        moment: { who: "Student", at: "0:06", text: "I just filled in the form for the data science course. Is there a weekend batch?", mark: ["data science course", "weekend batch"] },
        done: { title: "Counsellor booked", detail: "Added to the counsellor's calendar" },
      },
      {
        title: "Routine calls run themselves",
        body: "Fee reminders, document chasers and class reminders go out on their own, in the family's language.",
        moment: { who: "Parent", at: "0:09", text: "Can you send me the link for the term 2 fee? I'll pay it tonight.", mark: ["term 2 fee", "pay it tonight"] },
        done: { title: "Payment link sent", detail: "Fee reminder · by SMS" },
      },
      {
        title: "Check-ins before they leave",
        body: "Check-in and renewal calls reach learners before access ends, and renew the plan on the call.",
        moment: { who: "Learner", at: "0:12", text: "My access ends next week. I'd like to renew for another year.", mark: ["access ends", "renew"] },
        done: { title: "Plan renewed", detail: "Before access ended" },
      },
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
      },
      {
        name: "KYC reminders",
        body: "Asks for updated documents and sends the upload link.",
      },
      {
        name: "Loan application follow-up",
        body: "Calls applicants who stopped halfway and helps them finish.",
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
    segments: [
      {
        name: "Lending",
        cases: [
          { name: "Payment collections", body: "Calls before and after the due date and takes or logs the payment." },
          { name: "Loan application follow-up", body: "Calls applicants who stopped halfway and helps them finish." },
          { name: "KYC reminders", body: "Asks for updated documents and sends the upload link." },
          { name: "Repayment plans", body: "Offers only the plans your policy allows and records the choice." },
        ],
      },
      {
        name: "Insurance",
        cases: [
          { name: "Policy renewals", body: "Calls before a policy lapses and renews it with the same cover." },
          { name: "Premium reminders", body: "Reminds customers before each premium is due." },
          { name: "Claim status updates", body: "Tells customers where their claim stands and what's next." },
          { name: "Lead qualification", body: "Qualifies new leads and books the ones ready to buy." },
        ],
      },
      {
        name: "Payments & cards",
        cases: [
          { name: "Card activation", body: "Helps new cardholders activate and set up their card." },
          { name: "Failed payment recovery", body: "Calls when a payment fails and helps it go through." },
          { name: "Dispute intake", body: "Takes the details of a disputed charge and opens the case." },
          { name: "Transaction checks", body: "Confirms unusual transactions with the customer." },
        ],
      },
    ],
    funnel: {
      trigger: { at: "6 Mar, 10:00", title: "Instalment missed", detail: "Maya Patel · $240 due 5 Mar" },
      context: [
        ["Balance", "Amount and days overdue"],
        ["History", "Past payments"],
        ["Allowed", "New dates your policy allows"],
      ],
      turns: [
        { who: "agent", text: "Hi, this is Ria from your lender. This call is recorded. Your instalment was due yesterday." },
        { who: "caller", text: "I get paid on Friday. Can I pay then?" },
        { who: "agent", text: "Of course. I'll note Friday the 8th and text you a link to pay." },
        { who: "caller", text: "Great, thank you." },
      ],
      tool: { name: "log_promise_to_pay", args: "$240, Fri 8 Mar" },
      length: "1:48",
      after: ["Promise to pay logged in the loan system", "Payment link sent by SMS", "Reminder set before the new date", "Disclosure read, call recorded"],
      result: { title: "Promise to pay logged", detail: "Disclosure read, no agent needed" },
      story: {
        start: "A customer's instalment was due yesterday and hasn't come in.",
        ready: "Before calling, Ria checks the balance, the payment history and which new dates your policy allows.",
        action: "Ria reads the required disclosure, agrees a new date with the customer and texts a link to pay.",
        result: "A promise to pay is logged, the disclosure was read word for word, and no one on your team had to make the call.",
      },
    },
    narrative: {
      before:
        "Collections teams call by hand, working through yesterday's missed payments. Customers are reached late, disclosures are read differently by every caller, and renewals slip because there are never enough hands.",
      after:
        "Now Ria calls before and after every due date. She reads the required disclosure word for word, offers only what the policy allows, logs every promise to pay and sends the link. The team steps in only for disputes and difficult cases.",
    },
    problems: [
      { title: "Collections start too late", body: "Manual calling reaches customers days after the due date, when payments are harder to recover." },
      { title: "Compliance depends on the caller", body: "Disclosures and offers vary from one agent to the next, and every slip is a risk." },
      { title: "Renewals slip through", body: "Policies lapse and KYC goes stale because there aren't enough hands to call everyone." },
    ],
    solves: [
      {
        title: "Calls before and after every due date",
        body: "A Hooman reminds each customer on time, takes or logs the payment and sends the link.",
        moment: { who: "Customer", at: "0:14", text: "I missed the payment, but I get paid on Friday. Can I pay then?", mark: ["missed the payment", "pay then"] },
        done: { title: "Promise to pay logged", detail: "New date agreed · loan system updated" },
      },
      {
        title: "The same words on every call",
        body: "Fixed steps read your disclosures word for word, and it offers only what your policy allows.",
        moment: { who: "Ria", at: "0:03", text: "Before we start, this call is recorded for quality and compliance.", mark: ["recorded", "compliance"] },
        done: { title: "Disclosure read", detail: "Word for word · call recorded" },
      },
      {
        title: "Every customer reached",
        body: "Renewal and KYC calls run at any volume, in each customer's language.",
        moment: { who: "Customer", at: "0:21", text: "Yes, renew it with the same cover as last year, please.", mark: ["renew", "same cover"] },
        done: { title: "Policy renewed", detail: "Same cover · documents emailed" },
      },
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
      },
      {
        name: "Cash-on-delivery confirmation",
        body: "Confirms COD orders before they ship, so fewer come back.",
      },
      {
        name: "Pickup booking",
        body: "Books return and reverse pickups at a time the customer is home.",
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
    segments: [
      {
        name: "Last-mile delivery",
        cases: [
          { name: "Delivery confirmation", body: "Confirms the slot and the address the day before dispatch." },
          { name: "Failed delivery rescheduling", body: "Calls after a missed delivery and books the next attempt." },
          { name: "Address correction", body: "Adds missing flat numbers and landmarks on the call." },
          { name: "Cash-on-delivery confirmation", body: "Confirms COD orders before they ship, so fewer come back." },
        ],
      },
      {
        name: "Freight & B2B",
        cases: [
          { name: "Pickup booking", body: "Books pickups with the sender at a time that suits them." },
          { name: "Shipment status updates", body: "Tells customers where their shipment is and when it lands." },
          { name: "Proof of delivery follow-up", body: "Chases missing delivery confirmations." },
          { name: "Driver check-ins", body: "Checks in with drivers on the road and logs their updates." },
        ],
      },
      {
        name: "Returns",
        cases: [
          { name: "Return pickup booking", body: "Books return pickups at a time the customer is home." },
          { name: "Exchange coordination", body: "Arranges the pickup and the replacement in one call." },
          { name: "Refund status updates", body: "Tells customers when their refund will arrive." },
        ],
      },
    ],
    funnel: {
      trigger: { at: "Day before, 4:00 pm", title: "Delivery tomorrow", detail: "Order 7731 · Priya Shah" },
      context: [
        ["Slot", "Tomorrow's delivery window"],
        ["Address", "What's missing"],
        ["Payment", "Prepaid or cash on delivery"],
      ],
      turns: [
        { who: "agent", text: "Hi, this is Ria calling about your parcel. It arrives tomorrow. Will you be home?" },
        { who: "caller", text: "I won't be home then. Can it come in the evening?" },
        { who: "agent", text: "I've moved it to 3 to 6 pm. Which flat number should I add?" },
        { who: "caller", text: "It's 4B." },
      ],
      tool: { name: "update_delivery", args: "3–6 pm, flat 4B" },
      length: "1:12",
      after: ["Slot moved in the delivery system", "Missing details added to the address", "Route re-planned", "Confirmation sent by SMS"],
      result: { title: "Slot and address confirmed", detail: "First attempt saved" },
      story: {
        start: "A parcel is due tomorrow, but the address is missing a flat number.",
        ready: "The afternoon before, Ria calls the customer, already knowing the delivery slot and what's missing from the address.",
        action: "The customer won't be home, so Ria moves the delivery to a time that works and adds the missing details.",
        result: "The van arrives when the customer is home, at the right door, first time.",
      },
    },
    narrative: {
      before:
        "Every failed first attempt costs money. Drivers arrive to locked doors and addresses without a flat number, and cash-on-delivery orders get refused at the door and shipped back.",
      after:
        "Now Ria calls each customer the afternoon before. She confirms the slot, moves it if they won't be home, adds the missing details and confirms cash-on-delivery orders. Every change goes straight into the route for the next day.",
    },
    problems: [
      { title: "Failed first attempts", body: "Drivers arrive to locked doors, and every failed delivery costs a second trip." },
      { title: "Addresses that don't work", body: "Missing flat numbers and landmarks send vans to the wrong door." },
      { title: "COD orders come back", body: "Unconfirmed cash-on-delivery orders are refused at the door and shipped back." },
    ],
    solves: [
      {
        title: "Confirmed the day before",
        body: "A Hooman calls ahead to confirm the slot, and moves it if the customer won't be home.",
        moment: { who: "Customer", at: "0:10", text: "I won't be home tomorrow morning. Can it come in the evening?", mark: ["won't be home", "evening"] },
        done: { title: "Slot moved", detail: "To a time they'll be home" },
      },
      {
        title: "Fixed on the call",
        body: "Missing details are added before dispatch and written straight back to your delivery system.",
        moment: { who: "Customer", at: "0:17", text: "It's flat 4B, second floor, next to the pharmacy.", mark: ["flat 4B", "next to the pharmacy"] },
        done: { title: "Address fixed", detail: "Added to the route" },
      },
      {
        title: "Confirmed before it ships",
        body: "Cash-on-delivery orders are confirmed with the customer before they leave the warehouse.",
        moment: { who: "Customer", at: "0:08", text: "Yes, I'll pay cash on delivery. Please send it today.", mark: ["cash on delivery", "send it today"] },
        done: { title: "Cash on delivery confirmed", detail: "Cleared to ship" },
      },
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
      },
      {
        name: "Returns and exchanges",
        body: "Books the pickup and arranges the replacement in the same call.",
      },
      {
        name: "Post-delivery feedback",
        body: "Calls after delivery to ask how it went and log the answers.",
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
    segments: [
      {
        name: "Marketplaces & D2C",
        cases: [
          { name: "Order support", body: "Tracks the order, fixes the address or starts a return, and closes the ticket." },
          { name: "Abandoned cart follow-up", body: "Calls shoppers who left items behind and helps them check out." },
          { name: "Returns and exchanges", body: "Books the pickup and arranges the replacement in one call." },
          { name: "Post-delivery feedback", body: "Asks how the delivery went and logs the answers." },
        ],
      },
      {
        name: "Quick commerce",
        cases: [
          { name: "Order status", body: "Tells customers where their order is, in seconds." },
          { name: "Substitution approval", body: "Asks before replacing an out-of-stock item." },
          { name: "Delivery issue resolution", body: "Handles missing or damaged items and issues the fix." },
        ],
      },
      {
        name: "Subscriptions",
        cases: [
          { name: "Renewal reminders", body: "Reminds subscribers before renewal." },
          { name: "Payment failure recovery", body: "Calls when a renewal payment fails and helps it go through." },
          { name: "Win-back calls", body: "Calls customers who cancelled and offers a way back." },
        ],
      },
    ],
    funnel: {
      trigger: { at: "11:40 pm", title: "Inbound call", detail: "Number matched to Maya Patel" },
      context: [
        ["Order", "Found from the caller's number"],
        ["Status", "Out for delivery"],
        ["Address", "Missing flat number"],
      ],
      turns: [
        { who: "caller", text: "Hi, where's my order? It was due today." },
        { who: "agent", text: "I've found your order. It arrives today. Which flat number should I add?" },
        { who: "caller", text: "Flat 12, second floor." },
        { who: "agent", text: "Added. You'll get a text when it's out for delivery." },
      ],
      tool: { name: "update_address", args: "flat 12, floor 2" },
      length: "1:36",
      after: ["Ticket closed in the helpdesk", "Delivery note added to the order", "Tracking link sent by SMS", "Summary saved to the customer"],
      result: { title: "Resolved in one call", detail: "No agent needed" },
      story: {
        start: "Late at night, a customer calls to ask where their order is.",
        ready: "Ria recognises the number and pulls up the order before saying hello: it's out for delivery, but the address is missing a flat number.",
        action: "Ria tells them when it arrives and adds the flat number to the order while they talk.",
        result: "The question is answered in a couple of minutes, and your team didn't have to pick up.",
      },
    },
    narrative: {
      before:
        "On sale days the support line queues for half an hour. Most callers ask the same thing, where their order is, and agents spend the day looking orders up instead of solving real problems.",
      after:
        "Now Ria picks up every call on the first ring. She finds the order from the caller's number, fixes what needs fixing and closes the ticket with a summary. The team handles the unusual cases, with the full story in front of them.",
    },
    problems: [
      { title: "Queues on sale days", body: "Support lines back up for half an hour as soon as volume spikes." },
      { title: "The same question, all day", body: "Most calls are “where is my order?”, and agents spend the day looking orders up." },
      { title: "Carts left behind", body: "Shoppers leave items in their cart, and nobody follows up." },
    ],
    solves: [
      {
        title: "Every call picked up",
        body: "A Hooman answers on the first ring, however busy it gets.",
        moment: { who: "Customer", at: "0:02", text: "Hi, where's my order? It was supposed to arrive today.", mark: ["where's my order", "arrive today"] },
        done: { title: "Ticket closed", detail: "Delivery time shared · address fixed" },
      },
      {
        title: "Answers from the order",
        body: "It finds the order from the caller's number, fixes it and closes the ticket with a summary.",
        moment: { who: "Customer", at: "0:15", text: "The lamp is the wrong colour. Can I swap it for the white one?", mark: ["wrong colour", "swap it"] },
        done: { title: "Exchange booked", detail: "Pickup scheduled" },
      },
      {
        title: "A call to finish checkout",
        body: "Shoppers who left items behind get a call that helps them check out.",
        moment: { who: "Customer", at: "0:11", text: "I left it in my cart because delivery looked slow. Is there a faster option?", mark: ["left it in my cart", "faster option"] },
        done: { title: "Checked out", detail: "Faster delivery added" },
      },
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
      },
      {
        name: "Post-visit check-ins",
        body: "Calls after a visit to see how the patient feels and book a review.",
      },
      {
        name: "Lab report notifications",
        body: "Lets patients know their report is ready and books a follow-up.",
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
      call: { line: "The doctor has two times free this week. Which suits you?", length: "1:20" },
      result: { outcome: "Visit booked · Thu 10 am", system: "Calendar updated" },
    },
    segments: [
      {
        name: "Hospitals",
        cases: [
          { name: "Appointment booking", body: "Books visits after hours too, straight into the doctors' calendars." },
          { name: "Pre-visit instructions", body: "Calls before a visit with what to bring and how to prepare." },
          { name: "Discharge follow-up", body: "Checks in after discharge and books a review." },
          { name: "Billing questions", body: "Explains bills and sends the payment link." },
        ],
      },
      {
        name: "Clinics",
        cases: [
          { name: "Appointment reminders", body: "Calls the day before each visit and reschedules if needed." },
          { name: "Rescheduling", body: "Moves visits to the next free slot in one call." },
          { name: "Post-visit check-ins", body: "Asks how the patient feels and books a review." },
        ],
      },
      {
        name: "Diagnostics & labs",
        cases: [
          { name: "Home sample collection", body: "Books a home collection slot and confirms the address." },
          { name: "Report notifications", body: "Lets patients know their report is ready." },
          { name: "Follow-up consults", body: "Books a consult to go over the results." },
        ],
      },
    ],
    funnel: {
      trigger: { at: "8:15 pm", title: "After-hours call", detail: "Omar Haddad · existing patient" },
      context: [
        ["Patient", "Recognised from their number"],
        ["Doctor", "Open slots this week"],
        ["Language", "The patient's own"],
      ],
      turns: [
        { who: "caller", text: "Hi, I'd like to see Dr Rao this week." },
        { who: "agent", text: "The doctor has two times free this week. Which suits you?" },
        { who: "caller", text: "Thursday at 10." },
        { who: "agent", text: "Booked. I'll text you the address and time." },
      ],
      tool: { name: "book_appointment", args: "Dr Rao, Thu 10 am" },
      length: "1:20",
      after: ["Visit booked in the doctor's calendar", "Address and time sent by SMS", "Reminder call set for the day before", "Note added for the front desk"],
      result: { title: "Visit booked", detail: "While the clinic was closed" },
      story: {
        start: "It's evening and the clinic is closed. A patient calls to book a visit this week.",
        ready: "Ria recognises the patient and checks the doctor's calendar before answering.",
        action: "Ria offers two times, the patient picks one, and Ria books it.",
        result: "The visit is booked after hours, and the front desk finds it in the calendar in the morning.",
      },
    },
    narrative: {
      before:
        "Clinics miss calls every evening after closing, and patients book somewhere else. During the day the front desk juggles phones and patients, and forgotten visits leave empty slots that can't be filled in time.",
      after:
        "Now Ria answers every call, day or night, in the patient's language. She books visits straight into the doctors' calendars, calls the day before to confirm, and hands anything clinical to the staff.",
    },
    problems: [
      { title: "Missed calls after hours", body: "Patients call when the front desk is closed, and book somewhere else." },
      { title: "No-shows leave gaps", body: "Forgotten visits leave empty slots that can't be filled in time." },
      { title: "A front desk stretched thin", body: "Staff juggle ringing phones and the patients in front of them." },
    ],
    solves: [
      {
        title: "Every call answered",
        body: "A Hooman books visits after hours, straight into the doctors' calendars, in the patient's language.",
        moment: { who: "Patient", at: "0:04", text: "I know it's late, but can I see the doctor this week?", mark: ["see the doctor", "this week"] },
        done: { title: "Visit booked", detail: "Straight into the doctor's calendar" },
      },
      {
        title: "Reminders that move visits",
        body: "It calls the day before, and moves the visit if the patient can't make it.",
        moment: { who: "Patient", at: "0:09", text: "I can't make tomorrow at 10. Is Friday afternoon free?", mark: ["can't make tomorrow", "Friday afternoon"] },
        done: { title: "Visit moved", detail: "New time · reminder set" },
      },
      {
        title: "Admin off the desk",
        body: "It handles bookings and admin questions, and hands anything clinical to your staff.",
        moment: { who: "Patient", at: "0:13", text: "What time does the clinic open on Saturday?", mark: ["clinic open", "Saturday"] },
        done: { title: "Question answered", detail: "Opening hours sent by SMS" },
      },
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
      },
      {
        name: "Subscription renewals",
        body: "Reminds users before renewal and keeps the plan going.",
      },
      {
        name: "Win-back calls",
        body: "Calls users who cancelled to understand why and offer a way back.",
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
      call: { line: "I can see both charges. I've refunded the second one.", length: "0:58" },
      result: { outcome: "Refund issued", system: "Billing updated" },
    },
    segments: [
      {
        name: "Consumer apps",
        cases: [
          { name: "In-app voice support", body: "Users tap to talk and get help without leaving the app." },
          { name: "Onboarding calls", body: "Walks new users through setup in their first week." },
          { name: "Account and billing help", body: "Fixes billing and access in the conversation." },
        ],
      },
      {
        name: "Subscriptions",
        cases: [
          { name: "Subscription renewals", body: "Reminds users before renewal and keeps the plan going." },
          { name: "Payment failure recovery", body: "Helps a failed renewal go through." },
          { name: "Win-back calls", body: "Calls users who cancelled to understand why and offer a way back." },
        ],
      },
      {
        name: "Voice-first products",
        cases: [
          { name: "Voice conversations at scale", body: "Runs natural voice conversations inside your product." },
          { name: "Proactive check-ins", body: "Reaches out at the right moment, in the user's language." },
          { name: "Feedback collection", body: "Asks users what they think and logs every answer." },
        ],
      },
    ],
    funnel: {
      trigger: { at: "In the app", title: "User taps to talk", detail: "Sara Kim · Pro plan" },
      context: [
        ["Plan", "Their current plan"],
        ["Billing", "Recent charges"],
        ["Account", "Status and history"],
      ],
      turns: [
        { who: "caller", text: "I've been charged twice this month." },
        { who: "agent", text: "I can see both charges. I've refunded the second one." },
        { who: "caller", text: "Thanks, that was quick." },
        { who: "agent", text: "It'll show in 3 to 5 days. Anything else?" },
      ],
      tool: { name: "issue_refund", args: "$9.99, charge #2" },
      length: "0:58",
      after: ["Refund issued in billing", "Receipt sent by email", "Conversation logged for the team", "Tagged: duplicate charge"],
      result: { title: "Refund issued", detail: "Resolved inside the app" },
      story: {
        start: "A user notices they've been charged twice and taps to talk in the app.",
        ready: "Ria already sees their plan and both charges before they say a word.",
        action: "Ria refunds the second charge while they talk.",
        result: "The money is on its way in under a minute, and nobody had to open a ticket.",
      },
    },
    narrative: {
      before:
        "Users email support when something goes wrong with billing or access, and wait a day for an answer. Every new user adds more tickets, and people cancel without anyone asking why.",
      after:
        "Now users tap to talk inside the app. Ria sees their plan and recent activity, fixes billing or access in the conversation and logs it for the team. Before renewals, and after a cancellation, she calls to keep them on board.",
    },
    problems: [
      { title: "Help means leaving the app", body: "Billing and access questions go to email, and users wait a day for an answer." },
      { title: "Support doesn't scale with growth", body: "Every new user adds tickets your team has to answer." },
      { title: "Users leave quietly", body: "Subscribers cancel without anyone asking why." },
    ],
    solves: [
      {
        title: "Voice inside the app",
        body: "Users tap to talk and get help without leaving your product.",
        moment: { who: "User", at: "0:03", text: "I've been charged twice this month for the same plan.", mark: ["charged twice"] },
        done: { title: "Refund issued", detail: "Duplicate charge reversed" },
      },
      {
        title: "One agent, any scale",
        body: "The same agent handles one conversation or thousands at once, and fixes billing and access as it goes.",
        moment: { who: "User", at: "0:05", text: "I can't sign in on my new phone. Can you help?", mark: ["can't sign in", "new phone"] },
        done: { title: "Access restored", detail: "New phone signed in" },
      },
      {
        title: "Renewal and win-back calls",
        body: "Calls before renewal and after a cancellation keep subscribers on board.",
        moment: { who: "User", at: "0:16", text: "I cancelled because it felt expensive. Is there a cheaper plan?", mark: ["cancelled", "cheaper plan"] },
        done: { title: "Plan kept", detail: "Moved to a cheaper plan" },
      },
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

/**
 * Compliance badges for the industry pages' trust row. Empty on purpose:
 * the row stays hidden until each certification is confirmed (TO CONFIRM).
 */
export const trustBadges: { name: string; detail: string }[] = []
