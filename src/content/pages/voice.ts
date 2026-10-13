import type { Capability, Feature } from "@/components/product-page/blocks"
import type { MenuPageId } from "@/content/platform"

/**
 * /platform/voice, from the website content sheet ("Platform pages" tab for
 * the sections, written as features; "Hoomanlabs" tab for the pointers, with
 * plain SaaS names).
 *
 * DEMO NUMBERS (replace when real data arrives): the latency figure, the
 * proof quote and its result, and the provider list. Search for "DEMO".
 */
export const voicePage = {
  crumb: "Voice",
  title: "AI voice agents that sound human, in every language.",
  line: "Natural voices, human turn-taking and native Indian languages, fast enough that conversations flow.",

  pillars: [
    { title: "Sounds human", body: "Leading voice engines, tuned per use case, with names and numbers said right." },
    { title: "Listens like a person", body: "Waits for callers to finish, lets them cut in, and re-engages quiet ones." },
    { title: "Speaks your customers' language", body: "Native Indian languages, switching mid-sentence when the caller does." },
  ],

  sound: {
    title: "A voice that fits every call.",
    body: "Choose from leading voice engines and tune speed, warmth and pacing per use case: calm for collections, upbeat for sales.",
    features: [
      { name: "Voice studio", pointer: "Pick from the best voices in the world, including native Indian voices." },
      { name: "Voice tuning", pointer: "Calm for collections, upbeat for sales; numbers and dates read naturally." },
      { name: "Pronunciation", pointer: "Brand names, product codes and local names pronounced correctly." },
      { name: "Background ambience", pointer: "Sounds like a real desk, not a robot in a void." },
    ],
  } satisfies Capability,

  turns: {
    title: "Knows when to talk, and when to listen.",
    body: "It waits for callers to finish, lets them interrupt naturally, and gently re-engages a caller who goes quiet.",
    features: [
      { name: "End-of-turn detection", pointer: "Knows when to speak and when to wait, even while callers read out numbers." },
      { name: "Natural interruptions", pointer: "Customers can interrupt like with a person; background noise does not." },
      { name: "Silence re-engagement", pointer: "Gently re-engages quiet callers instead of hanging up." },
      { name: "Heard vs said", pointer: "Know exactly where a caller cut in and what they missed." },
    ],
  } satisfies Capability,

  languages: {
    title: "Understands your customers, however they speak.",
    body: "Native Indian languages, mid-sentence switching, boosted keywords for your names and codes, and noise reduction for real-world lines.",
    features: [
      { name: "Indian languages", pointer: "Native Indian languages and accents, not translated afterthoughts." },
      { name: "Mid-call switching", pointer: "Switches with the customer mid-sentence, Hinglish included." },
      { name: "Keyword boosting", pointer: "Your product names, places and codes are heard right the first time." },
      { name: "Noise reduction", pointer: "Works from a busy street, a shop floor or a moving car." },
      { name: "Transcription choice", pointer: "Best-in-class transcription per language, swappable anytime." },
    ],
  } satisfies Capability,

  /** The language wall. Translations to be checked by native speakers. */
  wall: {
    title: "One agent, in your customers' own languages.",
    items: [
      { lang: "English", text: "Your bill is due on Friday." },
      { lang: "Hindi", text: "आपका बिल शुक्रवार को देय है।" },
      { lang: "Tamil", text: "உங்கள் பில் வெள்ளிக்கிழமை செலுத்த வேண்டும்." },
      { lang: "Telugu", text: "మీ బిల్లు శుక్రవారం చెల్లించాలి." },
      { lang: "Kannada", text: "ನಿಮ್ಮ ಬಿಲ್ ಶುಕ್ರವಾರ ಪಾವತಿಸಬೇಕು." },
      { lang: "Malayalam", text: "നിങ്ങളുടെ ബിൽ വെള്ളിയാഴ്ച അടയ്ക്കണം." },
      { lang: "Marathi", text: "तुमचे बिल शुक्रवारी भरायचे आहे." },
      { lang: "Gujarati", text: "તમારું બિલ શુક્રવારે ભરવાનું છે." },
      { lang: "Punjabi", text: "ਤੁਹਾਡਾ ਬਿੱਲ ਸ਼ੁੱਕਰਵਾਰ ਨੂੰ ਭਰਨਾ ਹੈ।" },
    ],
  },

  /** Deep-dive 4: speed. DEMO timings in the visual. */
  speed: {
    title: "Fast enough that conversations flow.",
    body: "Every turn is measured stage by stage, so you can see where time goes and tune it, model by model and step by step.",
    features: [
      { name: "Latency trace", pointer: "Every pause explained: see which step added delay on any turn." },
      { name: "Model choice", pointer: "Use the right model for the job; switch as better ones arrive." },
      { name: "Step-level tuning", pointer: "Fast model for small talk, careful model for payments, patient turn-taking for card numbers." },
    ],
  } satisfies Capability,

  hear: {
    title: "Hear it for yourself.",
    line: "Play a real call in another language, or have one of our agents call you now.",
  },

  grid: {
    title: "Tuned for real calls.",
    items: [
      { name: "Number and date reading", pointer: "Amounts, dates and codes read the way people say them." },
      { name: "Voicemail detection", pointer: "No minutes wasted talking to answering machines." },
      { name: "Call duration limits", pointer: "Every call stays within time and budget." },
      { name: "Transcript confidence", pointer: "Hear what the caller said, what the AI heard, and how confident it was." },
    ] satisfies Feature[],
  },

  // DEMO: provider names are generic until we confirm we can name them.
  providers: {
    title: "Built on the best engines, and never locked to one.",
    line: "Leading voice, transcription and model providers, switchable per agent, with failover between them.",
    names: ["Voice engine A", "Voice engine B", "Indian voices", "Transcription A", "Transcription B", "Leading LLMs"],
  },

  reliability: {
    title: "Calls keep going when a provider doesn't.",
    items: [
      { title: "Model failover", body: "If a model fails, the call continues on a backup model." },
      { title: "Voice failover", body: "If a voice provider fails, the call keeps its voice on a backup." },
      { title: "Transcription failover", body: "Transcription switches to a backup provider. Coming soon." },
      { title: "Call guardrails", body: "Every call stays within its time and budget limits." },
    ],
  },

  // DEMO: placeholder quote and result.
  proof: {
    quote: "Customers switch to Hindi halfway through a sentence and the agent just follows. Most never realise they were talking to AI.",
    name: "Name Surname",
    role: "Head of CX, Company",
    result: { figure: "4.6 / 5", label: "average caller rating across languages" },
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
      q: "Will it work on noisy calls?",
      a: "Noise reduction cleans caller audio before transcription, so it works from a busy street, a shop floor or a moving car.",
    },
    {
      // DEMO: replace with the published typical latency.
      q: "How fast does it reply?",
      a: "Typical replies arrive in under 800 ms, and every turn is measured stage by stage so you can see and tune where time goes.",
    },
    {
      q: "Can we choose or tune the voice?",
      a: "Yes. Pick from leading voice engines and tune speed, stability and warmth per agent, with a pronunciation dictionary for your names.",
    },
    {
      q: "What happens if a voice or model provider goes down?",
      a: "Calls fail over to a backup model and voice automatically, so conversations keep going.",
    },
  ],

  related: ["agents", "channels", "testing", "quality"] satisfies MenuPageId[],
}
