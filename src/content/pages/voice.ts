import type { MenuPageId } from "@/content/platform"

/**
 * /platform/voice, from the website content sheet ("Platform pages" and
 * "Platform v2" tabs for the sections, "Hoomanlabs" tab for each feature's
 * marketing name and pointer). Sections are written as features, not the
 * sheet's questions, in the homepage's language like Agents and Workflows.
 *
 * SAMPLE (replace when real data arrives): the latency figure (780 ms), the
 * proof strip, and the audio (every player uses the one real recording).
 * Language wall translations to be checked by native speakers.
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
  proof: { quote: "780 ms · 9 languages", by: "typical turn, and native Indian languages with English" },

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
      { id: "bargein", title: "Natural barge-in", body: "Customers can interrupt like with a person; background noise does not." },
      { id: "nudge", title: "Nudge", body: "Gently re-engages quiet callers instead of hanging up." },
      { id: "heard", title: "Heard vs said", body: "Know exactly where a caller cut in and what they missed." },
    ],
  },

  /** Sheet section 3. */
  languages: {
    label: "Languages",
    title: "Speaks like your customers do.",
    line: "Native Indian languages, mid-sentence switching, your own keywords, and clear audio from noisy lines.",
    rows: [
      { id: "bharat", title: "Bharat-ready", body: "Native Indian languages and accents, not translated afterthoughts." },
      { id: "switch", title: "Code-switch", body: "Switches with the customer mid-sentence, Hinglish included." },
      { id: "keywords", title: "Keyword boost", body: "Your product names, places and codes are heard right the first time." },
      { id: "clear", title: "Clear line", body: "Works from a busy street, a shop floor or a moving car." },
      { id: "ear", title: "Open ear", body: "Best-in-class transcription per language, swappable anytime." },
    ],
  },

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

  /** Sheet section 4. */
  sayRight: {
    label: "Pronunciation",
    title: "Says names and numbers right.",
    rows: [
      { id: "say", title: "Say-it-right", body: "Brand names, product codes and local names pronounced correctly." },
      { id: "numbers", title: "Numbers and dates", body: "Amounts, dates and codes read the way people say them." },
    ],
  },

  /** Sheet section 5. SAMPLE timings. */
  speed: {
    label: "Speed",
    title: "Fast enough that conversations flow.",
    rows: [
      { id: "trace", title: "Turn trace", body: "Every pause explained: see which step added delay on any turn." },
      { id: "brain", title: "Brain choice", body: "Use the right model for the job; switch as better ones arrive." },
    ],
  },

  /** Sheet sections 6 and 7. */
  trio: {
    title: "Tuned per moment, and always on.",
    line: "Different settings for different steps of a call, with backups when a provider fails.",
    items: [
      { id: "step", title: "Step-level tuning", body: "Fast model for small talk, careful model for payments, patient turn-taking for card numbers." },
      { id: "failover", title: "Always-on failover", body: "If a model or voice provider fails, calls keep going on a backup." },
      { id: "stt", title: "Transcription failover", body: "Transcription keeps working even if a provider goes down.", soon: true },
    ],
  },

  /**
   * The speech layer, named plainly for buyers who compare STT and TTS, with
   * the providers available in the console (speech-to-text and voice lists).
   * `logo` names a file in public/logos/providers (Simple Icons, CC0); the
   * rest show an initial until their logo files are added.
   */
  speech: {
    label: "Under the hood",
    title: "Listening and speaking, tuned for real phone calls.",
    line: "Speech-to-text hears the caller and text-to-speech gives your Hooman its voice. Both are tuned for Indian languages and real phone lines.",
    sides: [
      {
        id: "stt",
        label: "Listening · speech-to-text",
        providers: [
          { name: "Deepgram", model: "Nova-3", logo: "deepgram" },
          { name: "ElevenLabs", model: "Scribe", logo: "elevenlabs" },
          { name: "AssemblyAI", model: "Universal" },
          { name: "Sarvam", model: "Saarika" },
          { name: "Navana" },
        ],
        rows: [
          { title: "Chosen per language", body: "Recognition picked for each language and accent, not one model for all." },
          { title: "Mixed-language speech", body: "Follows Hinglish and callers who switch language mid-sentence." },
          { title: "Your words", body: "Boost the names, product codes and places your callers say." },
          { title: "Noisy lines", body: "Noise reduction cleans the audio before it is transcribed." },
        ],
      },
      {
        id: "tts",
        label: "Speaking · text-to-speech",
        providers: [
          { name: "ElevenLabs", logo: "elevenlabs" },
          { name: "Cartesia" },
          { name: "Sarvam" },
          { name: "Google", logo: "google" },
          { name: "Amazon Polly" },
          { name: "Murf" },
          { name: "Soniox" },
        ],
        rows: [
          { title: "Natural voices", body: "Pick a voice from any of these engines and tune speed, warmth and stability." },
          { title: "Said right", body: "Names, amounts, dates and codes read the way people say them." },
          { title: "Fast turns", body: "About 780 ms from the caller stopping to the Hooman speaking (sample figure)." },
          { title: "Always on", body: "If a voice or transcription provider fails, calls carry on a backup." },
        ],
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
      a: "Speech-to-text runs on Deepgram, ElevenLabs, AssemblyAI, Sarvam or Navana, chosen per language and tuned for Indian accents and mixed-language speech. Voices come from ElevenLabs, Cartesia, Sarvam, Google, Amazon Polly, Murf and Soniox. Both fail over to a backup if a provider goes down.",
    },
    {
      q: "Will it work on noisy calls?",
      a: "Noise reduction cleans caller audio before transcription, so it works from a busy street, a shop floor or a moving car.",
    },
    {
      // SAMPLE: replace with the published typical latency.
      q: "How fast does it reply?",
      a: "A typical turn takes about 780 ms from the caller stopping to the Hooman speaking (sample figure), and every turn is measured stage by stage so you can see and tune where time goes.",
    },
    {
      q: "Can we choose or tune the voice?",
      a: "Yes. Pick a voice from ElevenLabs, Cartesia, Sarvam, Google, Amazon Polly, Murf or Soniox, and tune speed, stability and warmth per agent, with a pronunciation dictionary for your names.",
    },
    {
      q: "What happens if a voice or model provider goes down?",
      a: "Calls fail over to a backup model and voice automatically, so conversations keep going.",
    },
  ],

  /** Next step first (the sheet's related pages: Agents, AI QA). */
  related: ["agents", "quality"] satisfies MenuPageId[],
}
