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
 * survey, appointment booking and support calls, in public/audio/calls/). Every other call is a
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
      title: "Books a doctor's appointment in Hindi",
      agent: "Asha",
      company: "A clinic",
      language: "Hindi",
      direction: "Inbound",
      duration: 144.4,
      audio: "/audio/calls/appointments-en.mp3",
      outcome: "Booked · tomorrow 8 am",
      // Real recording (the VSI booking demo), transcribed with ElevenLabs. The patient's name and number are left out.
      lines: [
        { t: 1.0, who: "agent", text: "नमस्ते, क्या आप डॉक्टर विनीत कौर के साथ appointment book करना चाहते हैं?", translation: "Hello, would you like to book an appointment with Dr Vineet Kaur?" },
        { t: 5.6, who: "caller", text: "Yes. जी।", translation: "Yes." },
        { t: 9.1, who: "agent", text: "अच्छा, आपके लिए कौन सा time सही रहेगा?", translation: "Okay, what time works for you?" },
        { t: 12.5, who: "caller", text: "सुबह।", translation: "Morning." },
        { t: 15.2, who: "agent", text: "ठीक है, सुबह का समय। मैं सुबह...", translation: "Okay, a morning slot. I'll…" },
        { t: 21.6, who: "agent", text: "अच्छा, तो आप सुबह जल्दी appointment चाहते हैं। मैं सुबह 08:00 बजे का समय check कर लेता हूँ। क्या यह आपके लिए ठीक रहेगा?", translation: "So you'd like an early morning appointment. Let me check 8 am. Would that work for you?" },
        { t: 29.9, who: "caller", text: "हम्म, ठीक रहेगा।", translation: "Hmm, that works." },
        { t: 34.9, who: "agent", text: "एक minute दीजिए।", translation: "Give me a minute." },
        { t: 38.1, who: "agent", text: "बढ़िया, सुबह 08:00 बजे का slot available है। क्या मैं इसे book कर दूँ?", translation: "Great, the 8 am slot is free. Shall I book it?" },
        { t: 43.1, who: "caller", text: "ठीक है, ठीक है, okay. कर दीजिए।", translation: "Okay, okay. Go ahead." },
        { t: 46.0, who: "agent", text: "अच्छा, booking के लिए आपका पूरा नाम बता दीजिए।", translation: "For the booking, could you tell me the full name?" },
        { t: 49.6, who: "caller", text: "[name]" },
        { t: 53.2, who: "agent", text: "ठीक है, [name]। सही लिखा ना मैंने?", translation: "Okay, [name]. Have I got that right?" },
        { t: 56.2, who: "caller", text: "हाँ, [name]।", translation: "Yes, [name]." },
        { t: 59.6, who: "agent", text: "और आपकी उम्र क्या है?", translation: "And what's the age?" },
        { t: 62.0, who: "caller", text: "उम्र है 27.", translation: "27." },
        { t: 66.5, who: "agent", text: "ठीक है। आप किस शहर से हैं?", translation: "Okay. Which city are you from?" },
        { t: 69.5, who: "caller", text: "गाजीपुर।", translation: "Ghazipur." },
        { t: 72.4, who: "agent", text: "अच्छा, जिस number से आप call कर रहे हैं, क्या मरीज से उसी number पे बात होगी?", translation: "And can we reach the patient on the number you're calling from?" },
        { t: 78.5, who: "caller", text: "नहीं, ये तो उनके पापा जी का number है।", translation: "No, this is her father's number." },
        { t: 84.1, who: "agent", text: "अच्छा, तो आप मरीज का phone number बता दीजिए। अपना complete phone number एक बार में बता सकते हैं। मैं note कर लेता हूँ।", translation: "Then could you give me the patient's number? You can say the full number in one go, and I'll note it down." },
        { t: 92.4, who: "caller", text: "मरीज, मरीज के पास phone number नहीं है। वो लड़की है और हम उसके पापा हूँ। इसी number, यही number save हो जाएगा और क्या? [number]", translation: "The patient doesn't have a phone. She's my daughter, I'm her father. This number can be saved, can't it? [number]" },
        { t: 103.8, who: "agent", text: "अच्छा, समझ गया। तो फिर इसी number पर contact किया जाएगा। बस एक second, मैं अभी आपकी booking कर देता हूँ।", translation: "Understood. We'll contact you on this number, then. Just a second, I'm making the booking now." },
        { t: 119.4, who: "agent", text: "एक minute दीजिए।", translation: "Give me a minute." },
        { t: 128.6, who: "agent", text: "आपकी appointment book हो गई है। कल सुबह 08:00 बजे डॉक्टर विनीत कौर के साथ आपका appointment है। धन्यवाद।", translation: "Your appointment is booked: tomorrow at 8 am with Dr Vineet Kaur. Thank you." },
        { t: 136.6, who: "caller", text: "ठीक है, sir.", translation: "Okay, sir." },
        { t: 140.0, who: "agent", text: "जी, धन्यवाद। आपका दिन शुभ हो।", translation: "Thank you. Have a good day." },
      ],
      // The opening lines for the use-case card.
      preview: [
        { t: 0, who: "agent", text: "नमस्ते, क्या आप डॉक्टर विनीत कौर के साथ appointment book करना चाहते हैं?", translation: "Hello, would you like to book an appointment with Dr Vineet Kaur?" },
        { t: 4.6, who: "caller", text: "Yes. जी।", translation: "Yes." },
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
      title: "Takes an exchange request and hands it to support",
      agent: "Janhvi",
      company: "An eyewear store",
      language: "Hindi",
      direction: "Inbound",
      duration: 190.4,
      audio: "/audio/calls/support-exchange-en.mp3",
      outcome: "Warranty claim passed to support · callback promised",
      // Real recording (an e-commerce exchange call, redacted), transcribed with ElevenLabs. [beep] marks a redaction.
      lines: [
        { t: 1.3, who: "agent", text: "Hi, I am Janhvi from [beep]. What can I do for you today?" },
        { t: 8.1, who: "caller", text: "मुझे एक order exchange करना है।", translation: "I need to exchange an order." },
        { t: 11.5, who: "agent", text: "ठीक है, मैं आपके order check कर रही हूँ। एक moment दीजिए।", translation: "Okay, I'm checking your orders. One moment." },
        { t: 18.4, who: "agent", text: "ठीक है, आपकी सबसे recent order में [beep] glasses और दो items हैं, जो 11 June 2026 को place हुई थी। क्या इसी order का product exchange करना है?", translation: "Your most recent order, placed on 11 June 2026, has [beep] glasses and two items. Is it a product from this order you want to exchange?" },
        { t: 29.0, who: "caller", text: "नहीं।", translation: "No." },
        { t: 31.7, who: "agent", text: "ठीक है। इसके अलावा एक lenses only eyeglasses वाली order है, जो 2 May 2026 को place हुई थी। क्या इसी order का product exchange करना है?", translation: "Okay. There's also a lenses-only eyeglasses order placed on 2 May 2026. Is it from this order?" },
        { t: 42.4, who: "caller", text: "2 May, मुझे तो ये नहीं पता, लेकिन मैं, मैंने लिया था एक sunglasses, अ, attachable रहता है ना, वो वाला लिया था। एक साथ दो-", translation: "2 May, I'm not sure about that, but I bought sunglasses, the attachable kind. Two together—" },
        { t: 50.1, who: "agent", text: "हाँ, समझ गई।", translation: "Yes, got it." },
        { t: 50.7, who: "caller", text: "... लिया था। हाँ, मुझे वो वाला चाहिए।", translation: "…I bought. Yes, that's the one I want." },
        { t: 54.9, who: "agent", text: "ठीक है। आपकी 2 May 2026 वाली order में [beep] clip-on eyeglasses और [beep] eyeglasses दोनों हैं। क्या आपको [beep] clip-on...", translation: "Okay. Your 2 May 2026 order has both [beep] clip-on eyeglasses and [beep] eyeglasses. Do you want the [beep] clip-on…" },
        { t: 64.8, who: "caller", text: "Clip-on वाला।", translation: "The clip-on one." },
        { t: 66.9, who: "agent", text: "ठीक है।", translation: "Okay." },
        { t: 67.7, who: "caller", text: "Clip-on वाला।", translation: "The clip-on one." },
        { t: 68.0, who: "agent", text: "आप [beep] ठीक है, just confirm-", translation: "You [beep]… okay, just to confirm—" },
        { t: 73.2, who: "caller", text: "आवाज़ नहीं आ रही।", translation: "I can't hear you." },
        { t: 75.7, who: "agent", text: "कोई बात नहीं, मैं repeat कर देती हूँ। आप [beep] eyeglasses exchange करना चाहते हैं, सही है?", translation: "No problem, I'll repeat that. You want to exchange the [beep] eyeglasses, right?" },
        { t: 81.9, who: "caller", text: "हाँ, हाँ।", translation: "Yes, yes." },
        { t: 84.1, who: "agent", text: "ठीक है। Exchange के लिए reason बता सकते हैं? जैसे size fit issue है, quality concern है, wrong item मिला या कुछ और?", translation: "Okay. Can you tell me the reason for the exchange? A size or fit issue, a quality concern, the wrong item, or something else?" },
        { t: 91.3, who: "caller", text: "नहीं, सारा चीज़ सही है, लेकिन ऊपर से जो clip-on है ना, clip-on का जो शीशा है, वो दब गया automatic. वो क्यों होगा पता नहीं। ये deform हो गया। वो ठीक से मतलब लगता ही नहीं है।", translation: "No, everything's fine, but the clip-on on top, its lens got pressed in by itself. I don't know why. It's deformed and doesn't fit properly any more." },
        { t: 102.0, who: "agent", text: "मैं आपकी request पर काम कर रही हूँ। एक minute दीजिए। आपका जो clip-on eyeglasses है, उसका exchange अभी possible नहीं है। इसमें support team की मदद चाहिए होगी। लेकिन ये item warranty में है। क्या आप चाहेंगे कि मैं warranty claim करने में आपकी मदद करूँ?", translation: "I'm working on your request, give me a minute. An exchange isn't possible for your clip-on eyeglasses right now; this needs the support team. But the item is under warranty. Would you like me to help you make a warranty claim?" },
        { t: 116.1, who: "caller", text: "मुझे आप उसका भी मतलब customer support से contact करा दीजिए। ठीक है?", translation: "For that too, please just connect me to customer support. Okay?" },
        { t: 122.3, who: "agent", text: "ठीक है। आपकी request आगे support team को भेज दी गई है। जल्दी ही agent आपकी मदद करेंगे। कोई और help चाहिए हो तो [beep] से contact कर सकते हैं। Thanks for calling.", translation: "Okay. Your request has gone to the support team, and an agent will help you soon. For anything else, you can contact [beep]. Thanks for calling." },
        { t: 135.4, who: "caller", text: "अभी खुद से call आएगा या मैं, मुझे करना है?", translation: "Will they call me, or do I have to call?" },
        { t: 139.6, who: "agent", text: "वैसे अभी आपको call का wait करना होगा। [beep] Support team से कोई agent आपको जल्द ही call करेगा। आपको दोबारा call करने की ज़रूरत नहीं है।", translation: "You'll just need to wait for the call. An agent from the support team will call you soon; you don't need to call again." },
        { t: 147.7, who: "caller", text: "कितना देर लगेगा time?", translation: "How long will it take?" },
        { t: 150.8, who: "agent", text: "वैसे usually support team कुछ ही घंटों में call back कर देती है।", translation: "Usually the support team calls back within a few hours." },
        { t: 154.9, who: "caller", text: "पहले direct call करने का option था ना? पहले direct call करने का option था उसमें।", translation: "Wasn't there an option to call directly before? There used to be a direct call option." },
        { t: 162.1, who: "agent", text: "हाँ, पहले direct call का option था, लेकिन अभी ज्यादातर cases में support team call back करती है। आपकी issue के हिसाब से agent आपको call करेंगे। आपको बस थोड़ी देर wait करना है। वो खुद ही call करेंगे।", translation: "Yes, there was, but now in most cases the support team calls back. An agent will call you about your issue. You just need to wait a little; they'll call you themselves." },
        { t: 173.8, who: "caller", text: "ठीक है।", translation: "Okay." },
        { t: 176.2, who: "agent", text: "ठीक है, आपकी बात clear है। Support team आपको जल्दी contact करेगी।", translation: "Okay, I've got that. The support team will contact you soon." },
        { t: 183.1, who: "agent", text: "अगर और कुछ पूछना हो तो आप कभी भी [beep] पर call कर सकते हैं। Have a good day.", translation: "If there's anything else, you can call [beep] any time. Have a good day." },
      ],
      // The opening lines for the use-case card.
      preview: [
        { t: 0, who: "caller", text: "मुझे एक order exchange करना है।", translation: "I need to exchange an order." },
        { t: 3.4, who: "agent", text: "ठीक है, मैं आपके order check कर रही हूँ। एक moment दीजिए।", translation: "Okay, I'm checking your orders. One moment." },
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


