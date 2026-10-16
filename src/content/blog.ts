/**
 * The blog. Posts are typed content blocks (no CMS yet), rendered by
 * components/blog/post-body.tsx; `h2` blocks become the table of contents.
 *
 * PLACEHOLDER POSTS: every post below is marked `placeholder` and shows a
 * notice on its page. Figures in them are illustrative. Replace with real
 * posts (or wire a CMS) before launch.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; by?: string }
  | { type: "callout"; text: string }
  | { type: "code"; text: string; lang?: string }

export type Category = "Product" | "Engineering" | "Voice AI" | "Customers" | "Company"

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: Category
  date: string // ISO
  minutes: number
  author: { name: string; role: string }
  placeholder: true
  body: Block[]
}

export const blogPage = {
  seo: {
    title: "Blog",
    description: "Notes from the HoomanLabs team on AI voice agents, real calls, testing and building for India.",
  },
  title: "Notes from the team.",
  line: "What we're learning building AI employees that talk to customers on real phone lines.",
}

export const categories: ("All" | Category)[] = ["All", "Product", "Engineering", "Voice AI", "Customers", "Company"]

const TEAM = { name: "HoomanLabs team", role: "Product" }

export const posts: Post[] = [
  {
    slug: "every-call-should-end-in-a-result",
    title: "Every call should end in a result you can count",
    excerpt: "A call that ends with 'thanks, bye' is a cost. A call that ends with a payment, a booking or a fixed address is work done. How we design for the second kind.",
    category: "Product",
    date: "2026-10-08",
    minutes: 6,
    author: TEAM,
    placeholder: true,
    body: [
      { type: "p", text: "Most voice bots are judged on whether they sounded human. Customers judge them on something simpler: did the thing I called about get done?" },
      { type: "h2", text: "Start from the outcome" },
      { type: "p", text: "Before we write a single line of a Hooman's job, we write the outcomes it can end in: paid, promise to pay, booked, transferred with notes. Every conversation is designed backwards from those." },
      { type: "list", items: ["Name the outcomes first, in the customer's words.", "Give each one a field your CRM understands.", "Decide what happens next for each, before the call starts."] },
      { type: "h2", text: "Make the result visible" },
      { type: "p", text: "An outcome only counts if your team can see it. That's why every call ends with a summary, an outcome tag and the fields that matter, written where your team already works." },
      { type: "quote", text: "We stopped asking how the call sounded and started asking what it changed.", by: "Placeholder quote" },
      { type: "h2", text: "Follow through after the call" },
      { type: "p", text: "The call ending is often the start of the work: a reminder the day before a promise, a confirmation SMS, a callback on Thursday. Workflows carry that on without anyone wrapping up by hand." },
      { type: "callout", text: "Placeholder post: figures and quotes are illustrative." },
    ],
  },
  {
    slug: "keeping-voice-turns-under-a-second",
    title: "How we keep voice turns under a second",
    excerpt: "Where the time goes between a caller stopping and a Hooman replying, and the stage-by-stage trace we use to win it back.",
    category: "Engineering",
    date: "2026-09-24",
    minutes: 8,
    author: { name: "HoomanLabs team", role: "Engineering" },
    placeholder: true,
    body: [
      { type: "p", text: "On a phone call, silence is loud. A pause that's fine in a chat window feels broken on a line, so we treat every turn as a budget." },
      { type: "h2", text: "Where the time goes" },
      { type: "list", items: ["Knowing the caller has finished, not just paused.", "Turning speech into text.", "Deciding what to say, and whether to act.", "Turning the reply back into speech."] },
      { type: "h2", text: "Measure every stage" },
      { type: "p", text: "Every turn is traced stage by stage, so a slow turn points to the step that caused it. Here's the shape of a trace (illustrative values):" },
      { type: "code", lang: "text", text: "end-of-utterance   180 ms\nspeech-to-text     140 ms\nfirst token        260 ms\ntext-to-speech     200 ms\n─────────────────────────\nturn               780 ms" },
      { type: "h2", text: "Fail over before it hurts" },
      { type: "p", text: "If a provider slows down, the call moves to a backup before the caller notices. The fastest turn is the one that never waits on an outage." },
      { type: "callout", text: "Placeholder post: timings are illustrative, not measured." },
    ],
  },
  {
    slug: "hinglish-on-a-noisy-line",
    title: "Hinglish on a noisy line: what we learned",
    excerpt: "Callers switch languages mid-sentence, from busy streets and shop floors. What it takes for a Hooman to keep up.",
    category: "Voice AI",
    date: "2026-09-10",
    minutes: 5,
    author: { name: "HoomanLabs team", role: "Voice" },
    placeholder: true,
    body: [
      { type: "p", text: "\"Main Friday ko pay kar sakta hoon, or should I pay now?\" One sentence, two languages, a scooter going past. That's a normal call." },
      { type: "h2", text: "Pick recognition per language" },
      { type: "p", text: "No single speech-to-text model is best everywhere. We choose per language and accent, and boost the words your callers actually say: names, product codes, places." },
      { type: "h2", text: "Clean the audio first" },
      { type: "p", text: "Noise reduction runs before transcription, so the Hooman hears the caller and not the street." },
      { type: "h2", text: "Answer in kind" },
      { type: "p", text: "When a caller switches, the Hooman follows, mid-call, without asking them to pick a language." },
      { type: "callout", text: "Placeholder post." },
    ],
  },
  {
    slug: "testing-before-a-customer-hears-it",
    title: "Testing a voice agent before a customer hears it",
    excerpt: "Mystery callers, spot checks and never-again tests: how we make sure the next version is better than the last.",
    category: "Product",
    date: "2026-08-27",
    minutes: 7,
    author: TEAM,
    placeholder: true,
    body: [
      { type: "p", text: "You wouldn't put a new hire on the phones without training. A Hooman shouldn't go live without being tested on the calls that matter." },
      { type: "h2", text: "Mystery callers" },
      { type: "p", text: "Simulated customers with personas (rushed, angry, switching language) call each new version and are scored against a checklist." },
      { type: "h2", text: "Spot checks" },
      { type: "p", text: "For the moments that matter, such as reading a disclosure or calling the payment tool, we lock in the expected answer." },
      { type: "h2", text: "Never-again tests" },
      { type: "p", text: "Every real mistake becomes a test, so it can't come back in the next version." },
      { type: "callout", text: "Placeholder post." },
    ],
  },
  {
    slug: "hello-hoomanlabs",
    title: "Hello, HoomanLabs",
    excerpt: "Why we're building AI employees for customer conversations, and why we started with the phone.",
    category: "Company",
    date: "2026-08-12",
    minutes: 4,
    author: TEAM,
    placeholder: true,
    body: [
      { type: "p", text: "Most customer conversations still happen on the phone, and most of them are about getting one thing done." },
      { type: "h2", text: "Why the phone first" },
      { type: "p", text: "It's where the volume is, where waiting hurts most, and where a good answer changes someone's day." },
      { type: "h2", text: "What's next" },
      { type: "p", text: "The same Hooman, on your website, in your app and soon on WhatsApp, with one memory of every customer." },
      { type: "callout", text: "Placeholder post." },
    ],
  },
]

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)
export const postHref = (slug: string) => `/blog/${slug}`
export const formatDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
/** Turns a heading into an anchor id for the table of contents. */
export const anchor = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
