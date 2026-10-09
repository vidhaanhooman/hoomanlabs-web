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

export const useCaseCalls: UseCaseCall[] = [
  {
    id: "collections-en",
    useCase: "Collections",
    summary: "Finds a missed payment and moves it across",
    agent: "Ria",
    language: "English",
    direction: "Outbound",
    src: "/audio/calls/collections-en.mp3",
    scene: { art: "/art/listen/listen-morning.png", label: "Morning", glow: 0.15, scrim: 0.5 },
    sound: { art: "/art/backdrops/home-deploy.png", colour: "Sage" },
    duration: 30,
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
    id: "appointments-hi",
    useCase: "Appointments",
    summary: "Reschedules a visit in Hindi",
    agent: "Asha",
    language: "Hindi",
    direction: "Inbound",
    src: "/audio/calls/appointments-hi.mp3",
    scene: { art: "/art/listen/listen-midday.png", label: "Midday", glow: 0.1, scrim: 0.58 },
    sound: { art: "/art/backdrops/home-measure.png", colour: "Dusk blue" },
    duration: 26,
    lines: [
      { t: 0, speaker: "caller", text: "नमस्ते, मुझे कल का अपॉइंटमेंट बदलना है।", translation: "Hi, I need to change tomorrow's appointment." },
      { t: 5, speaker: "agent", text: "ज़रूर। शुक्रवार सुबह 10 बजे या दोपहर 3 बजे?", translation: "Of course. Friday 10am or 3pm?" },
      { t: 11, speaker: "caller", text: "शुक्रवार 3 बजे ठीक है।", translation: "Friday at 3 is fine." },
      { t: 15, speaker: "agent", text: "हो गया। शुक्रवार 3 बजे बुक है, मैं आपको SMS भेज रही हूँ।", translation: "Done. Booked for Friday at 3, sending you an SMS." },
      { t: 23, speaker: "caller", text: "धन्यवाद।", translation: "Thank you." },
    ],
  },
  {
    id: "support-es",
    useCase: "Support",
    summary: "Keeps a customer on a cheaper plan",
    agent: "Lucía",
    language: "Spanish",
    direction: "Inbound",
    src: "/audio/calls/support-es.mp3",
    scene: { art: "/art/listen/listen-evening.png", label: "Evening", glow: 0.35, scrim: 0.48 },
    sound: { art: "/art/backdrops/home-deploy.png", colour: "Terracotta", filter: "hue-rotate(-75deg) saturate(1.15)" },
    duration: 28,
    lines: [
      { t: 0, speaker: "caller", text: "Hola, quiero cancelar mi plan.", translation: "Hi, I want to cancel my plan." },
      { t: 4, speaker: "agent", text: "Claro. ¿Puedo preguntar el motivo? A veces podemos ayudar.", translation: "Of course. May I ask why? Sometimes we can help." },
      { t: 10, speaker: "caller", text: "Es demasiado caro para mí ahora.", translation: "It's too expensive for me right now." },
      { t: 14, speaker: "agent", text: "Puedo pasarte al plan básico por la mitad del precio. ¿Te interesa?", translation: "I can move you to the basic plan at half the price. Interested?" },
      { t: 23, speaker: "caller", text: "Sí, mejor así.", translation: "Yes, that's better." },
    ],
  },
  {
    id: "sales-en",
    useCase: "Sales",
    summary: "Qualifies a lead and books a demo",
    agent: "Sam",
    language: "English",
    direction: "Outbound",
    src: "/audio/calls/sales-en.mp3",
    scene: { art: "/art/listen/listen-night.png", label: "Night", glow: 0.75, scrim: 0.3 },
    sound: { art: "/art/backdrops/home-deploy.png", colour: "Ochre", filter: "hue-rotate(-40deg) saturate(1.2) brightness(1.05)" },
    duration: 29,
    lines: [
      { t: 0, speaker: "agent", text: "Hi Priya, it's Sam from Northwind. You asked about our fleet plan earlier today?" },
      { t: 6, speaker: "caller", text: "Yes, we've got about forty vans across two depots." },
      { t: 11, speaker: "agent", text: "Got it. Are you looking to switch this quarter, or just comparing for now?" },
      { t: 17, speaker: "caller", text: "This quarter, if the numbers work." },
      { t: 20, speaker: "agent", text: "Then let's get you a quote. I've booked you with our fleet team for Thursday at 11." },
    ],
  },
]
