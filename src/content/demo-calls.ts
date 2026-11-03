/**
 * Use-case calls for the "Hear it" section. Fictional draft transcripts with
 * timings. Drop matching audio into public/audio/calls/ (same names as `src`);
 * until a file exists, the player runs a silent transcript preview.
 *
 * When real recordings arrive, replace the lines and re-time each `t`
 * (seconds from start) to the audio.
 */

export type CallLine = { t: number; speaker: "agent" | "caller"; text: string; translation?: string }

export type UseCaseCall = {
  id: string
  useCase: string
  summary: string
  agent: string
  language: string
  direction: "Inbound" | "Outbound"
  src: string
  /** Time of day the valley shows while this use case is selected. */
  scene: { art: string; label: string; glow: number; scrim: number }
  /** "Painted sound" texture for this use case. Placeholders (with `filter` recolouring)
   *  until public/art/listen/sound-*.png arrive (see docs/painted-sound-prompts.md). */
  sound: { art: string; colour: string; filter?: string }
  duration: number
  lines: CallLine[]
}

/**
 * TEMPORARY: demos without their own recording yet (Collections, Sales) play
 * the feedback call. To switch one over, set its `src` to its file in
 * /audio/calls/ and its `duration` to that file's length.
 */
const TEMP_AUDIO = "/audio/calls/feedback-en.mp3"
const TEMP_DURATION = 81

export const useCaseCalls: UseCaseCall[] = [
  {
    id: "collections-en",
    useCase: "Collections",
    summary: "Finds a missed payment and moves it across",
    agent: "Ria",
    language: "English",
    direction: "Outbound",
    src: TEMP_AUDIO,
    scene: { art: "/art/listen/listen-morning.png", label: "Morning", glow: 0.15, scrim: 0.5 },
    sound: { art: "/art/backdrops/home-deploy.png", colour: "Sage" },
    duration: TEMP_DURATION,
    lines: [
      { t: 0, speaker: "agent", text: "Hi Daniel, this is Ria from Halden Energy about your March bill. Is now a good time?" },
      { t: 6, speaker: "caller", text: "Go ahead. I'm pretty sure I already paid that one." },
      { t: 10, speaker: "agent", text: "You did. It went to an old account number, so it hasn't been applied yet." },
      { t: 17, speaker: "caller", text: "Ah, okay. Can you move it across?" },
      { t: 20, speaker: "agent", text: "Done. It'll show within two days, and I'm texting you a confirmation now." },
      { t: 27, speaker: "caller", text: "Perfect, thanks Ria." },
    ],
  },
  {
    // Real recording (the VSI booking demo), transcribed with ElevenLabs. The patient's name and number are left out.
    // The id stays as it is: the call-back route maps it to its agent.
    id: "appointments-hi",
    useCase: "Appointments",
    summary: "Books a doctor's appointment in Hindi",
    agent: "Asha",
    language: "Hindi",
    direction: "Inbound",
    src: "/audio/calls/appointments-en.mp3",
    scene: { art: "/art/listen/listen-midday.png", label: "Midday", glow: 0.1, scrim: 0.58 },
    sound: { art: "/art/backdrops/home-measure.png", colour: "Dusk blue" },
    duration: 144.4,
    lines: [
      {
        t: 1.0,
        speaker: "agent",
        text: "नमस्ते, क्या आप डॉक्टर विनीत कौर के साथ appointment book करना चाहते हैं?",
        translation: "Hello, would you like to book an appointment with Dr Vineet Kaur?",
      },
      { t: 5.6, speaker: "caller", text: "Yes. जी।", translation: "Yes." },
      { t: 9.1, speaker: "agent", text: "अच्छा, आपके लिए कौन सा time सही रहेगा?", translation: "Okay, what time works for you?" },
      { t: 12.5, speaker: "caller", text: "सुबह।", translation: "Morning." },
      { t: 15.2, speaker: "agent", text: "ठीक है, सुबह का समय। मैं सुबह...", translation: "Okay, a morning slot. I'll…" },
      {
        t: 21.6,
        speaker: "agent",
        text: "अच्छा, तो आप सुबह जल्दी appointment चाहते हैं। मैं सुबह 08:00 बजे का समय check कर लेता हूँ। क्या यह आपके लिए ठीक रहेगा?",
        translation: "So you'd like an early morning appointment. Let me check 8 am. Would that work for you?",
      },
      { t: 29.9, speaker: "caller", text: "हम्म, ठीक रहेगा।", translation: "Hmm, that works." },
      { t: 34.9, speaker: "agent", text: "एक minute दीजिए।", translation: "Give me a minute." },
      { t: 38.1, speaker: "agent", text: "बढ़िया, सुबह 08:00 बजे का slot available है। क्या मैं इसे book कर दूँ?", translation: "Great, the 8 am slot is free. Shall I book it?" },
      { t: 43.1, speaker: "caller", text: "ठीक है, ठीक है, okay. कर दीजिए।", translation: "Okay, okay. Go ahead." },
      { t: 46.0, speaker: "agent", text: "अच्छा, booking के लिए आपका पूरा नाम बता दीजिए।", translation: "For the booking, could you tell me the full name?" },
      { t: 49.6, speaker: "caller", text: "[name]" },
      { t: 53.2, speaker: "agent", text: "ठीक है, [name]। सही लिखा ना मैंने?", translation: "Okay, [name]. Have I got that right?" },
      { t: 56.2, speaker: "caller", text: "हाँ, [name]।", translation: "Yes, [name]." },
      { t: 59.6, speaker: "agent", text: "और आपकी उम्र क्या है?", translation: "And what's the age?" },
      { t: 62.0, speaker: "caller", text: "उम्र है 27.", translation: "27." },
      { t: 66.5, speaker: "agent", text: "ठीक है। आप किस शहर से हैं?", translation: "Okay. Which city are you from?" },
      { t: 69.5, speaker: "caller", text: "गाजीपुर।", translation: "Ghazipur." },
      {
        t: 72.4,
        speaker: "agent",
        text: "अच्छा, जिस number से आप call कर रहे हैं, क्या मरीज से उसी number पे बात होगी?",
        translation: "And can we reach the patient on the number you're calling from?",
      },
      { t: 78.5, speaker: "caller", text: "नहीं, ये तो उनके पापा जी का number है।", translation: "No, this is her father's number." },
      {
        t: 84.1,
        speaker: "agent",
        text: "अच्छा, तो आप मरीज का phone number बता दीजिए। अपना complete phone number एक बार में बता सकते हैं। मैं note कर लेता हूँ।",
        translation: "Then could you give me the patient's number? You can say the full number in one go, and I'll note it down.",
      },
      {
        t: 92.4,
        speaker: "caller",
        text: "मरीज, मरीज के पास phone number नहीं है। वो लड़की है और हम उसके पापा हूँ। इसी number, यही number save हो जाएगा और क्या? [number]",
        translation: "The patient doesn't have a phone. She's my daughter, I'm her father. This number can be saved, can't it? [number]",
      },
      {
        t: 103.8,
        speaker: "agent",
        text: "अच्छा, समझ गया। तो फिर इसी number पर contact किया जाएगा। बस एक second, मैं अभी आपकी booking कर देता हूँ।",
        translation: "Understood. We'll contact you on this number, then. Just a second, I'm making the booking now.",
      },
      { t: 119.4, speaker: "agent", text: "एक minute दीजिए।", translation: "Give me a minute." },
      {
        t: 128.6,
        speaker: "agent",
        text: "आपकी appointment book हो गई है। कल सुबह 08:00 बजे डॉक्टर विनीत कौर के साथ आपका appointment है। धन्यवाद।",
        translation: "Your appointment is booked: tomorrow at 8 am with Dr Vineet Kaur. Thank you.",
      },
      { t: 136.6, speaker: "caller", text: "ठीक है, sir.", translation: "Okay, sir." },
      { t: 140.0, speaker: "agent", text: "जी, धन्यवाद। आपका दिन शुभ हो।", translation: "Thank you. Have a good day." },
    ],
  },
  {
    // Real recording (an e-commerce exchange call, redacted), transcribed with ElevenLabs. [beep] marks a redaction.
    // The id stays as it is: the call-back route maps it to its agent.
    id: "support-es",
    useCase: "Support",
    summary: "Finds the order and hands a warranty claim to support",
    agent: "Janhvi",
    language: "Hindi",
    direction: "Inbound",
    src: "/audio/calls/support-exchange-en.mp3",
    scene: { art: "/art/listen/listen-evening.png", label: "Evening", glow: 0.35, scrim: 0.48 },
    sound: { art: "/art/backdrops/home-deploy.png", colour: "Terracotta", filter: "hue-rotate(-75deg) saturate(1.15)" },
    duration: 190.4,
    lines: [
      { t: 1.3, speaker: "agent", text: "Hi, I am Janhvi from [beep]. What can I do for you today?" },
      { t: 8.1, speaker: "caller", text: "मुझे एक order exchange करना है।", translation: "I need to exchange an order." },
      { t: 11.5, speaker: "agent", text: "ठीक है, मैं आपके order check कर रही हूँ। एक moment दीजिए।", translation: "Okay, I'm checking your orders. One moment." },
      {
        t: 18.4,
        speaker: "agent",
        text: "ठीक है, आपकी सबसे recent order में [beep] glasses और दो items हैं, जो 11 June 2026 को place हुई थी। क्या इसी order का product exchange करना है?",
        translation: "Your most recent order, placed on 11 June 2026, has [beep] glasses and two items. Is it a product from this order you want to exchange?",
      },
      { t: 29.0, speaker: "caller", text: "नहीं।", translation: "No." },
      {
        t: 31.7,
        speaker: "agent",
        text: "ठीक है। इसके अलावा एक lenses only eyeglasses वाली order है, जो 2 May 2026 को place हुई थी। क्या इसी order का product exchange करना है?",
        translation: "Okay. There's also a lenses-only eyeglasses order placed on 2 May 2026. Is it from this order?",
      },
      {
        t: 42.4,
        speaker: "caller",
        text: "2 May, मुझे तो ये नहीं पता, लेकिन मैं, मैंने लिया था एक sunglasses, अ, attachable रहता है ना, वो वाला लिया था। एक साथ दो-",
        translation: "2 May, I'm not sure about that, but I bought sunglasses, the attachable kind. Two together—",
      },
      { t: 50.1, speaker: "agent", text: "हाँ, समझ गई।", translation: "Yes, got it." },
      { t: 50.7, speaker: "caller", text: "... लिया था। हाँ, मुझे वो वाला चाहिए।", translation: "…I bought. Yes, that's the one I want." },
      {
        t: 54.9,
        speaker: "agent",
        text: "ठीक है। आपकी 2 May 2026 वाली order में [beep] clip-on eyeglasses और [beep] eyeglasses दोनों हैं। क्या आपको [beep] clip-on...",
        translation: "Okay. Your 2 May 2026 order has both [beep] clip-on eyeglasses and [beep] eyeglasses. Do you want the [beep] clip-on…",
      },
      { t: 64.8, speaker: "caller", text: "Clip-on वाला।", translation: "The clip-on one." },
      { t: 66.9, speaker: "agent", text: "ठीक है।", translation: "Okay." },
      { t: 67.7, speaker: "caller", text: "Clip-on वाला।", translation: "The clip-on one." },
      { t: 68.0, speaker: "agent", text: "आप [beep] ठीक है, just confirm-", translation: "You [beep]… okay, just to confirm—" },
      { t: 73.2, speaker: "caller", text: "आवाज़ नहीं आ रही।", translation: "I can't hear you." },
      {
        t: 75.7,
        speaker: "agent",
        text: "कोई बात नहीं, मैं repeat कर देती हूँ। आप [beep] eyeglasses exchange करना चाहते हैं, सही है?",
        translation: "No problem, I'll repeat that. You want to exchange the [beep] eyeglasses, right?",
      },
      { t: 81.9, speaker: "caller", text: "हाँ, हाँ।", translation: "Yes, yes." },
      {
        t: 84.1,
        speaker: "agent",
        text: "ठीक है। Exchange के लिए reason बता सकते हैं? जैसे size fit issue है, quality concern है, wrong item मिला या कुछ और?",
        translation: "Okay. Can you tell me the reason for the exchange? A size or fit issue, a quality concern, the wrong item, or something else?",
      },
      {
        t: 91.3,
        speaker: "caller",
        text: "नहीं, सारा चीज़ सही है, लेकिन ऊपर से जो clip-on है ना, clip-on का जो शीशा है, वो दब गया automatic. वो क्यों होगा पता नहीं। ये deform हो गया। वो ठीक से मतलब लगता ही नहीं है।",
        translation: "No, everything's fine, but the clip-on on top, its lens got pressed in by itself. I don't know why. It's deformed and doesn't fit properly any more.",
      },
      {
        t: 102.0,
        speaker: "agent",
        text: "मैं आपकी request पर काम कर रही हूँ। एक minute दीजिए। आपका जो clip-on eyeglasses है, उसका exchange अभी possible नहीं है। इसमें support team की मदद चाहिए होगी। लेकिन ये item warranty में है। क्या आप चाहेंगे कि मैं warranty claim करने में आपकी मदद करूँ?",
        translation:
          "I'm working on your request, give me a minute. An exchange isn't possible for your clip-on eyeglasses right now; this needs the support team. But the item is under warranty. Would you like me to help you make a warranty claim?",
      },
      {
        t: 116.1,
        speaker: "caller",
        text: "मुझे आप उसका भी मतलब customer support से contact करा दीजिए। ठीक है?",
        translation: "For that too, please just connect me to customer support. Okay?",
      },
      {
        t: 122.3,
        speaker: "agent",
        text: "ठीक है। आपकी request आगे support team को भेज दी गई है। जल्दी ही agent आपकी मदद करेंगे। कोई और help चाहिए हो तो [beep] से contact कर सकते हैं। Thanks for calling.",
        translation: "Okay. Your request has gone to the support team, and an agent will help you soon. For anything else, you can contact [beep]. Thanks for calling.",
      },
      { t: 135.4, speaker: "caller", text: "अभी खुद से call आएगा या मैं, मुझे करना है?", translation: "Will they call me, or do I have to call?" },
      {
        t: 139.6,
        speaker: "agent",
        text: "वैसे अभी आपको call का wait करना होगा। [beep] Support team से कोई agent आपको जल्द ही call करेगा। आपको दोबारा call करने की ज़रूरत नहीं है।",
        translation: "You'll just need to wait for the call. An agent from the support team will call you soon; you don't need to call again.",
      },
      { t: 147.7, speaker: "caller", text: "कितना देर लगेगा time?", translation: "How long will it take?" },
      {
        t: 150.8,
        speaker: "agent",
        text: "वैसे usually support team कुछ ही घंटों में call back कर देती है।",
        translation: "Usually the support team calls back within a few hours.",
      },
      {
        t: 154.9,
        speaker: "caller",
        text: "पहले direct call करने का option था ना? पहले direct call करने का option था उसमें।",
        translation: "Wasn't there an option to call directly before? There used to be a direct call option.",
      },
      {
        t: 162.1,
        speaker: "agent",
        text: "हाँ, पहले direct call का option था, लेकिन अभी ज्यादातर cases में support team call back करती है। आपकी issue के हिसाब से agent आपको call करेंगे। आपको बस थोड़ी देर wait करना है। वो खुद ही call करेंगे।",
        translation:
          "Yes, there was, but now in most cases the support team calls back. An agent will call you about your issue. You just need to wait a little; they'll call you themselves.",
      },
      { t: 173.8, speaker: "caller", text: "ठीक है।", translation: "Okay." },
      {
        t: 176.2,
        speaker: "agent",
        text: "ठीक है, आपकी बात clear है। Support team आपको जल्दी contact करेगी।",
        translation: "Okay, I've got that. The support team will contact you soon.",
      },
      {
        t: 183.1,
        speaker: "agent",
        text: "अगर और कुछ पूछना हो तो आप कभी भी [beep] पर call कर सकते हैं। Have a good day.",
        translation: "If there's anything else, you can call [beep] any time. Have a good day.",
      },
    ],
  },
  {
    id: "sales-en",
    useCase: "Sales",
    summary: "Qualifies a lead and books a demo",
    agent: "Sam",
    language: "English",
    direction: "Outbound",
    src: TEMP_AUDIO,
    scene: { art: "/art/listen/listen-night.png", label: "Night", glow: 0.75, scrim: 0.3 },
    sound: { art: "/art/backdrops/home-deploy.png", colour: "Ochre", filter: "hue-rotate(-40deg) saturate(1.2) brightness(1.05)" },
    duration: TEMP_DURATION,
    lines: [
      { t: 0, speaker: "agent", text: "Hi Priya, it's Sam from Northwind. You asked about our fleet plan earlier today?" },
      { t: 6, speaker: "caller", text: "Yes, we've got about forty vans across two depots." },
      { t: 11, speaker: "agent", text: "Got it. Are you looking to switch this quarter, or just comparing for now?" },
      { t: 17, speaker: "caller", text: "This quarter, if the numbers work." },
      { t: 20, speaker: "agent", text: "Then let's get you a quote. I've booked you with our fleet team for Thursday at 11." },
    ],
  },
  {
    // Real recording; transcript to come (one line shown until then).
    id: "feedback-en",
    useCase: "Feedback",
    summary: "Asks a guest about their stay and logs the answers",
    agent: "Ria",
    language: "English",
    direction: "Outbound",
    src: TEMP_AUDIO,
    scene: { art: "/art/listen/listen-evening.png", label: "Evening", glow: 0.5, scrim: 0.4 },
    sound: { art: "/art/backdrops/home-measure.png", colour: "Dusk blue" },
    duration: TEMP_DURATION,
    lines: [{ t: 0, speaker: "agent", text: "A post-stay feedback call. Transcript coming soon." }],
  },
]
