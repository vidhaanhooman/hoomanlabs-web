import type { MenuPageId } from "@/content/platform"

/**
 * /platform/voice, from the website content sheet ("Platform pages" and
 * "Platform v2" tabs for the sections, "Hoomanlabs" tab for each feature's
 * marketing name and pointer). Sections are written as features, not the
 * sheet's questions, in the homepage's language like Agents and Workflows.
 *
 * SAMPLE (replace when real data arrives): the latency figure (780 ms), the
 * proof strip, the node-tuning values, and the audio (every player uses the
 * one real recording). Language wall translations to be checked by native
 * speakers. Not on this page by decision: noise reduction, the latency
 * breakdown, and a full provider list.
 */
export const voicePage = {
  seo: {
    title: "Human-Like Voice AI in Indian Languages",
    description: "Natural voices, human turn-taking and native Indian languages with Hinglish code-switching, measured turn by turn for speed.",
  },
  crumb: "Voice",
  title: "Sounds human, in your customers' language.",
  line: "Natural voices, human turn-taking and native Indian languages, fast enough that conversations flow.",

  /** The sheet's "What is it?" definition block. */
  definition: "HoomanLabs voice is the speech layer of every Hooman: listening, turn-taking and speaking, tuned for Indian languages and real phone lines.",
  /** SAMPLE: the sheet's proof strip is "TBD: latency figure + language list". */
  proof: { quote: "780 ms · Indian languages and more", by: "typical turn, in your customers' own languages" },

  /** Sheet section 1. */
  studio: {
    label: "Voice studio",
    title: "A voice that fits every call.",
    rows: [
      { id: "studio", title: "Voice studio", body: "Pick from the best voices in the world, including native Indian voices." },
      { id: "tuning", title: "Voice tuning", body: "Calm for collections, upbeat for sales; speed, warmth and pacing per use case." },
      { id: "ambience", title: "Ambience", body: "Sounds like a real desk, not a robot in a void." },
    ],
  },

  /** Sheet section 2. */
  turns: {
    label: "Turn-taking",
    title: "Knows when to talk, and when to listen.",
    line: "It waits for callers to finish, lets them interrupt naturally, and gently re-engages a caller who goes quiet.",
    rows: [
      { id: "turnsense", title: "TurnSense", body: "Knows when to speak and when to wait, even while callers read out numbers." },
      { id: "bargein", title: "Natural barge-in", body: "Customers can interrupt, just as they would with a person." },
      { id: "nudge", title: "Nudge", body: "Gently re-engages quiet callers instead of hanging up." },
      { id: "heard", title: "Heard vs said", body: "Know exactly where a caller cut in and what they missed." },
    ],
  },

  /** Sheet section 3. */
  languages: {
    label: "Languages",
    title: "Speaks like your customers do.",
    line: "Native Indian languages and many more, with mid-sentence switching and your own keywords heard right.",
    rows: [
      { id: "bharat", title: "Bharat-ready", body: "Native Indian languages and accents, not translated afterthoughts." },
      { id: "switch", title: "Code-switch", body: "Switches with the customer mid-sentence, Hinglish included." },
      { id: "keywords", title: "Keyword boost", body: "Your product names, places and codes are heard right the first time." },
      { id: "ear", title: "Open ear", body: "Transcription picked per language from several providers, such as Deepgram and Sarvam, and swappable anytime." },
    ],
  },

  /** A few examples, not the full list (`more` says so). Translations to be checked by native speakers. */
  wall: {
    title: "One agent, in your customers' own languages.",
    items: [
      { lang: "English", code: "en", text: "Your bill is due on Friday." },
      { lang: "Hindi", code: "hi", text: "आपका बिल शुक्रवार को देय है।" },
      { lang: "Tamil", code: "ta", text: "உங்கள் பில் வெள்ளிக்கிழமை செலுத்த வேண்டும்." },
      { lang: "Telugu", code: "te", text: "మీ బిల్లు శుక్రవారం చెల్లించాలి." },
      { lang: "Kannada", code: "kn", text: "ನಿಮ್ಮ ಬಿಲ್ ಶುಕ್ರವಾರ ಪಾವತಿಸಬೇಕು." },
      { lang: "Marathi", code: "mr", text: "तुमचे बिल शुक्रवारी भरायचे आहे." },
      { lang: "Thai", code: "th", text: "บิลของคุณครบกำหนดชำระวันศุกร์" },
      { lang: "Spanish", code: "es", text: "Tu factura vence el viernes." },
      { lang: "Bahasa Indonesia", code: "id", text: "Tagihan Anda jatuh tempo hari Jumat." },
    ],
    /** The last chip in the switcher: a few more languages, named in their own scripts. */
    moreChip: "+ Many more",
    moreNames: [
      { code: "ml", name: "മലയാളം" },
      { code: "gu", name: "ગુજરાતી" },
      { code: "pa", name: "ਪੰਜਾਬੀ" },
      { code: "bn", name: "বাংলা" },
    ],
    moreCaption: "Malayalam, Gujarati, Punjabi, Bengali and many more",
  },

  /** Sheet section 4. */
  sayRight: {
    label: "Pronunciation",
    title: "Says names and numbers right.",
    rows: [
      { id: "say", title: "Say-it-right", body: "Brand names, product codes and local names pronounced correctly." },
      { id: "numbers", title: "Numbers and dates", body: "Amounts, dates and codes read the way people say them." },
    ],
  },

  /**
   * Node-level tuning: voice and turn-taking set once for the agent, then
   * overridden for the steps that need it. `overrides` are only the settings
   * a node changes; everything else uses the agent default. Sample values.
   */
  nodes: {
    label: "Tuned per node",
    title: "Every step of the call can sound and listen differently.",
    line: "Set voice and turn-taking once for the agent, then override only what a step needs. Everything else stays on the default.",
    /** The console's controls: sliders carry a range; the rest are toggles or a choice. */
    settings: [
      { id: "speed", label: "Speaking speed", kind: "slider", base: "1.0×", min: 0.7, max: 1.3 },
      { id: "warmth", label: "Warmth", kind: "slider", base: "70%", min: 0, max: 100 },
      { id: "wait", label: "Wait before replying", kind: "slider", base: "0.6 s", min: 0, max: 2.5 },
      { id: "numbers", label: "Read numbers", kind: "choice", base: "Naturally" },
      { id: "interrupt", label: "Caller can interrupt", kind: "toggle", base: "Yes" },
      { id: "digits", label: "Wait for full numbers", kind: "toggle", base: "Off" },
    ],
    flow: [
      { id: "greet", name: "Greeting", note: "Friendly and quick", overrides: { warmth: "85%" } },
      { id: "verify", name: "Verify identity", note: "Uses the agent defaults", overrides: {} },
      { id: "card", name: "Take card number", note: "Patient while digits are read out", overrides: { speed: "0.9×", wait: "1.8 s", interrupt: "No", digits: "On" } },
      { id: "confirm", name: "Confirm payment", note: "Slow and exact on amounts", overrides: { speed: "0.85×", numbers: "Digit by digit" } },
      { id: "handoff", name: "Hand off", note: "Warmer, handing to a person", overrides: { warmth: "90%", wait: "1.0 s" } },
    ],
  },

  /** Sheet sections 6 and 7. */
  /** The provider strip under Languages: a few per side as examples, then "+ more". `logo` names a file in public/logos/providers. */
  trio: {
    items: [
      {
        id: "stt",
        title: "Speech-to-text",
        providers: [{ name: "Deepgram", logo: "deepgram" }, { name: "Sarvam" }, { name: "AssemblyAI" }],
      },
      {
        id: "tts",
        title: "Text-to-speech",
        providers: [{ name: "ElevenLabs", logo: "elevenlabs" }, { name: "Cartesia" }, { name: "Google", logo: "google" }],
      },
    ],
  },




  faq: [
    {
      q: "Which languages does it speak?",
      a: "English and major Indian languages, including Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati and Punjabi, and it can switch language mid-call.",
    },
    {
      q: "Does it handle regional accents and Hinglish?",
      a: "Yes. Recognition is chosen per language, keywords can be boosted for your names and codes, and it follows callers who mix languages mid-sentence.",
    },
    {
      q: "What speech-to-text and text-to-speech does it use?",
      a: "Both are multi-provider. Speech-to-text is chosen per language from engines such as Deepgram and Sarvam, and voices come from leading engines such as ElevenLabs. If a provider goes down, calls carry on a backup.",
    },
    {
      // SAMPLE: replace with the published typical latency.
      q: "How fast does it reply?",
      a: "A typical turn takes about 780 ms from the caller stopping to the Hooman speaking (sample figure), fast enough that conversations flow.",
    },
    {
      q: "Can we choose or tune the voice?",
      a: "Yes. Pick a voice from leading engines such as ElevenLabs, tune speed, stability and warmth, and add a pronunciation dictionary for your names.",
    },
    {
      q: "Can voice and turn-taking change during a call?",
      a: "Yes. Set them once for the agent, then override them per node: for example, slower speech and a longer wait while a caller reads out a card number.",
    },
    {
      q: "What happens if a voice or model provider goes down?",
      a: "Calls fail over to a backup model and voice automatically, so conversations keep going.",
    },
  ],

  /** Next step first (the sheet's related pages: Agents, AI QA). */
  related: ["agents", "quality"] satisfies MenuPageId[],
}
