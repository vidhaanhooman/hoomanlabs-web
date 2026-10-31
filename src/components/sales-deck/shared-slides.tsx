import { LightningIcon, PhoneIcon, SealCheckIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siHubspot, siRazorpay, siShopify, siWhatsapp, siZendesk, siZoho, type SimpleIcon } from "simple-icons"

import { BrandIcon, CallCard, Headline, In, Live, Need, Panel, PhotoBack, Pill, Qr, Slide, Sub, Tile, Title, Wave } from "@/components/sales-deck/kit"
import { cn } from "@/lib/utils"

/**
 * The shared slide library from the content doc: product slides P1 to P5 and
 * proof slides C1 to C5, used by both stories (only the pill, and on Story A
 * the five-dot progress row, change). Copy is the doc's, word for word.
 *
 * Each uses its own layout so the run doesn't repeat: copy and panel (P1,
 * P5), a wall of language names (P2), a flow from call to outcome (P3), a
 * fanned stack of test cards (P4); and for the proof, a giant number (C1),
 * a full-bleed split (C2), a full-bleed photo (C3) and a bento (C4).
 */

export type Shared = { eyebrow?: string; dots?: number }

/** Story A's five dots, showing which gift the audience is on. */
function GiftDots({ on }: { on: number }) {
  return (
    <span className="flex gap-[8px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("h-[8px] rounded-full", i === on ? "w-[28px] bg-(--d-ink)" : "w-[8px] bg-(--d-ink)/20")} />
      ))}
    </span>
  )
}

/** The left column of a product slide: tile, dots, pill, headline and body. */
function Copy({
  eyebrow,
  dots,
  icon,
  headline,
  grey,
  body,
  size = 64,
}: Shared & { icon: React.ComponentProps<typeof Tile>["icon"]; headline: string; grey: string; body: React.ReactNode; size?: number }) {
  return (
    <div className="deck-anim flex flex-col items-start gap-[28px]">
      <Tile icon={icon} size={96} />
      {dots ? <GiftDots on={dots} /> : null}
      {eyebrow && <Pill>{eyebrow}</Pill>}
      <Headline grey={grey} size={size}>
        {headline}
      </Headline>
      <Sub>{body}</Sub>
    </div>
  )
}

/** Copy and panel: the copy on the left, the product UI on a white panel on the right. */
function Product({
  children,
  ...copy
}: Shared & { icon: React.ComponentProps<typeof Tile>["icon"]; headline: string; grey: string; body: React.ReactNode; children: React.ReactNode }) {
  return (
    <Slide className="flex-row items-center gap-[96px]">
      <div className="w-[620px] shrink-0">
        <Copy {...copy} />
      </div>
      <In className="min-w-0 flex-1">
        <Panel className="p-[52px]">{children}</Panel>
      </In>
    </Slide>
  )
}

export function P1(p: Shared) {
  return (
    <Product
      {...p}
      icon={LightningIcon}
      headline="It answers in under a second,"
      grey="at any volume."
      body="No queues, no IVR, no ‘all our agents are busy’. Every call is picked up, even on your busiest day."
    >
      <div className="flex justify-between text-[16px] text-(--d-grey)">
        <span>Waiting</span>
        <span className="flex items-center gap-[8px]">
          <Live /> Answered
        </span>
      </div>
      <Wave width={800} height={90} className="mt-[12px] text-(--d-ink)" />
      <ul className="mt-[36px] flex flex-col">
        {[
          ["0.8s", "average time to answer"],
          ["300+", "calls handled at the same time"],
          ["200K+", "calls a day for a single customer"],
        ].map(([v, l]) => (
          <li key={v} className="flex items-baseline gap-[32px] border-t border-(--d-line) py-[22px] last:pb-0">
            <span className="w-[210px] text-[64px] leading-none tracking-[-0.04em] tabular-nums">{v}</span>
            <span className="text-[23px] text-(--d-grey)">{l}</span>
          </li>
        ))}
      </ul>
    </Product>
  )
}

/* ---------- P2: the language wall ---------- */

const WALL_ROWS = [
  ["Hindi", "English", "Hinglish"],
  ["Tamil", "Kannada", "Telugu", "Malayalam"],
  ["Marathi", "Bengali", "Gujarati", "Punjabi"],
  ["Arabic", "Spanish", "+more"],
]

/** P2: the languages set as a wall of huge words (the three it's known for in black), the Hinglish exchange laid over it. */
export function P2({ eyebrow, dots }: Shared) {
  return (
    <Slide>
      <div className="deck-anim flex flex-col items-start gap-[24px]">
        {dots ? <GiftDots on={dots} /> : null}
        {eyebrow && <Pill>{eyebrow}</Pill>}
        <Headline grey="or both in one sentence." size={60}>
          It speaks Hindi, English,
        </Headline>
        <Sub className="max-w-[640px]">Plus Tamil, Kannada, Telugu and more: 30+ languages and 250+ voices.</Sub>
      </div>
      <div className="deck-anim mt-auto flex flex-col gap-[4px]" style={{ "--i": 1 } as React.CSSProperties}>
        {WALL_ROWS.map((row, r) => (
          <p key={r} className="flex gap-[44px] text-[104px] leading-[1.02] tracking-[-0.045em] whitespace-nowrap">
            {row.map((w) => (
              <span key={w} className={r === 0 ? "text-(--d-ink)" : "text-(--d-ink)/[0.13]"}>
                {w}
              </span>
            ))}
          </p>
        ))}
      </div>
      {/* The exchange, laid over the wall */}
      <In i={2} className="absolute top-[110px] right-[120px] flex w-[620px] flex-col gap-[14px]">
        <div className="self-start rounded-[20px] rounded-bl-[6px] bg-white px-[24px] py-[18px] text-[21px] leading-[1.4] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]">
          <span className="mb-[4px] block text-[14px] text-(--d-grey)">Caller</span>
          Mera order damaged aaya hai. Can you replace it?
        </div>
        <div className="self-end rounded-[20px] rounded-br-[6px] bg-(--d-ink) px-[24px] py-[18px] text-[21px] leading-[1.4] text-white shadow-[0_20px_40px_-20px_rgb(0_0_0/0.4)]">
          <span className="mb-[4px] block text-[14px] text-white/55">Agent</span>
          Bilkul. Aapka order number bata dijiye, main abhi replacement book kar deti hoon.
        </div>
        <span className="mt-[8px] flex items-center gap-[12px] self-end">
          <Need />
          <Qr size={76} />
        </span>
      </In>
    </Slide>
  )
}

/* ---------- P3: from call to outcome ---------- */

const LOGOS: { name: string; icon?: SimpleIcon }[] = [
  { name: "HubSpot", icon: siHubspot },
  { name: "Zendesk", icon: siZendesk },
  { name: "Shopify", icon: siShopify },
  { name: "Google Calendar", icon: siGooglecalendar },
  { name: "Razorpay", icon: siRazorpay },
  { name: "WhatsApp", icon: siWhatsapp },
  { name: "Zoho", icon: siZoho },
  { name: "LeadSquared" },
  { name: "Freshdesk" },
  { name: "Exotel" },
]

/** A thin arrow between flow nodes. */
function Arrow() {
  return (
    <svg viewBox="0 0 64 16" className="h-[16px] w-[64px] shrink-0 text-(--d-ink)/40" aria-hidden>
      <path d="M0 8 H60 M52 2 L60 8 L52 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** P3: the call as a flow, left to right: the caller, the agent on the call, the systems it works in, the outcome. */
export function P3({ eyebrow, dots }: Shared) {
  return (
    <Slide className="items-center">
      <Title pill={eyebrow} size={64} grey="during the call and after it.">
        It does the work
      </Title>
      {dots ? (
        <span className="mt-[16px]">
          <GiftDots on={dots} />
        </span>
      ) : null}
      <Sub className="deck-anim mt-[20px] text-center">Looks up orders, takes payments and books slots on the call. Updates your CRM and sends the summary after.</Sub>
      <div className="mt-auto flex w-full items-center justify-between">
        <In i={1} className="flex flex-col items-center gap-[14px]">
          <Tile icon={PhoneIcon} size={112} look="on" />
          <span className="text-[19px] text-(--d-grey)">Caller</span>
        </In>
        <Arrow />
        <In i={2} className="w-[560px]">
          <CallCard />
        </In>
        <Arrow />
        <In i={3}>
          <Panel className="w-[340px] p-[28px]">
            <ul className="grid grid-cols-2 gap-x-[18px] gap-y-[14px] text-[16px]">
              {LOGOS.map((l) => (
                <li key={l.name} className="flex items-center gap-[8px]">
                  {l.icon ? <BrandIcon icon={l.icon} size={16} /> : <span className="size-[6px] rounded-full bg-(--d-ink)/30" />}
                  <span className="truncate">{l.name}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </In>
        <Arrow />
        <In i={4}>
          <div className="ui-dark flex w-[260px] flex-col gap-[14px] rounded-[20px] bg-(--ui-bg) p-[28px] font-mono text-[17px] text-(--ui-text)">
            {["Done in 1.4s", "CRM updated", "callback booked", "summary sent"].map((t) => (
              <span key={t} className="flex items-center gap-[10px]">
                <span className="size-[8px] rounded-full bg-(--ui-live)" />
                {t}
              </span>
            ))}
          </div>
        </In>
      </div>
    </Slide>
  )
}

/* ---------- P4: a fanned stack of test cards ---------- */

const SIM_ROWS: [string, "Passed" | "Review"][] = [
  ["Frustrated repeat caller", "Passed"],
  ["Switches to Hindi", "Passed"],
  ["Interrupts often", "Passed"],
  ["Asks for a human", "Review"],
  ["In a hurry", "Passed"],
]

/** P4: the simulated callers as a fanned stack of cards, the one that needs a look pulled forward. */
export function P4(p: Shared) {
  const back = SIM_ROWS.filter(([, s]) => s === "Passed")
  return (
    <Slide className="flex-row items-center gap-[80px]">
      <div className="w-[620px] shrink-0">
        <Copy
          {...p}
          icon={SealCheckIcon}
          headline="Tested before it talks to anyone."
          grey="And hands over when it should."
          body="Every agent runs through simulated callers before launch. When a caller needs a person, it transfers with a summary, so nobody repeats themselves."
        />
      </div>
      <div className="relative flex h-full min-w-0 flex-1 flex-col">
        <In i={1}>
          <Pill>Billing assistant · v5 · 17 / 18 passed</Pill>
        </In>
        {/* The stack: passed cards fanned behind, the review card in front */}
        <div className="relative mt-[40px] h-[460px]">
          {back.map(([name], i) => (
            <div
              key={name}
              className="deck-anim absolute left-[40px] flex h-[130px] w-[640px] items-start justify-between rounded-[22px] bg-white px-[32px] pt-[24px] text-[22px] shadow-[0_20px_40px_-24px_rgb(0_0_0/0.3)]"
              style={{ top: i * 74, rotate: `${[-4, -1.5, 1.5, 3.5][i]}deg`, translate: `${i * 22}px 0`, "--i": i + 2 } as React.CSSProperties}
            >
              {name}
              <span className="rounded-[8px] bg-(--d-green)/12 px-[12px] py-[5px] text-[15px] text-(--d-green)">Passed</span>
            </div>
          ))}
          <div
            className="deck-anim absolute top-[300px] left-[120px] flex h-[150px] w-[660px] items-center justify-between rounded-[24px] bg-(--d-ink) px-[36px] text-[26px] text-white shadow-[0_40px_70px_-30px_rgb(0_0_0/0.6)]"
            style={{ "--i": 6 } as React.CSSProperties}
          >
            Asks for a human
            <span className="rounded-[8px] bg-(--d-amber)/25 px-[14px] py-[6px] text-[16px] text-[#F3C266]">Review</span>
          </div>
        </div>
        <In i={7} className="mt-auto grid grid-cols-3 gap-[24px]">
          {["pass rate before go-live", "of live calls auto-scored"].map((l) => (
            <Panel key={l} className="gap-[8px] p-[26px]">
              <span className="flex items-center gap-[10px] text-[40px] leading-none tracking-[-0.03em]">
                [X]% <Need />
              </span>
              <span className="text-[17px] text-(--d-grey)">{l}</span>
            </Panel>
          ))}
          <Panel className="justify-end gap-[10px] p-[26px]">
            <Live />
            <span className="text-[19px] leading-[1.3]">Warm transfer with call summary</span>
          </Panel>
        </In>
      </div>
    </Slide>
  )
}

const CONTROLS = [
  ["Data hosting", "where call data and recordings live, with an India-only option."],
  ["DPDP consent", "captured and logged on every call."],
  ["TRAI DLT and DND", "headers registered, DND numbers scrubbed before calling."],
  ["RBI calling hours", "collection calls only between 8am and 7pm."],
  ["PII redaction", "personal data masked in transcripts and recordings."],
  ["Certifications", "ISO 27001 and SOC 2 status."],
]

export function P5(p: Shared) {
  return (
    <Product {...p} icon={ShieldCheckIcon} headline="Compliant by default," grey="not by contract." body="The rules Indian buyers check are built into the platform.">
      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
        {CONTROLS.map(([label, body]) => (
          <div key={label} className="flex flex-col gap-[8px] border-t border-(--d-line) pt-[18px]">
            <span className="text-[18px] text-(--d-grey)">{label}</span>
            <span className="text-[20px] leading-[1.4]">{body}</span>
            <span className="mt-[2px] flex items-center gap-[10px] font-mono text-[14px] text-(--d-grey)">
              Status: [to confirm] <Need />
            </span>
          </div>
        ))}
      </div>
    </Product>
  )
}

/* ---------- Proof: four layouts ---------- */

type Story = {
  photo: string
  name: string
  eyebrow: string
  headline: string
  grey?: string
  big: string
  caption: string
  problem: string
  did: string
  result: React.ReactNode
}

/** The problem, what we did and the result, as quiet rows. */
function Rows({ s, dark = false }: { s: Story; dark?: boolean }) {
  return (
    <dl className="flex flex-col">
      {(
        [
          ["The problem", s.problem],
          ["What we did", s.did],
          ["The result", s.result],
        ] as const
      ).map(([k, v]) => (
        <div key={k} className={cn("grid grid-cols-[170px_1fr] gap-[24px] border-t py-[13px]", dark ? "border-white/15" : "border-(--d-line)")}>
          <dt className={cn("pt-[3px] text-[16px]", dark ? "text-white/55" : "text-(--d-grey)")}>{k}</dt>
          <dd className="text-[20px] leading-[1.45]">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

const GIVA: Story = {
  photo: "/art/stories/giva-band.webp",
  name: "GIVA",
  eyebrow: "GIVA · D2C jewellery",
  headline: "GIVA handles most support calls",
  grey: "with an agent.",
  big: "70%",
  caption: "of support queries automated",
  problem: "Support costs rising with every new order.",
  did: "A voice agent for order status, returns and FAQs.",
  result: "50% lower support cost, with 90% CSAT kept.",
}

/** C1, GIVA: the number set giant beside the photo. */
export function C1({ headline }: Shared & { headline?: string }) {
  const s = { ...GIVA, headline: headline ?? GIVA.headline, grey: headline ? undefined : GIVA.grey }
  return (
    <Slide className="flex-row gap-[72px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="deck-anim flex flex-col items-start gap-[24px]">
          <Pill>{s.eyebrow}</Pill>
          <Headline grey={s.grey} size={52}>
            {s.headline}
          </Headline>
        </div>
        <In className="mt-auto flex items-end gap-[28px]">
          <span className="text-[280px] leading-[0.78] tracking-[-0.06em] tabular-nums">{s.big}</span>
          <span className="mb-[18px] max-w-[260px] text-[24px] leading-[1.35] text-(--d-grey)">{s.caption}</span>
        </In>
        <In i={2} className="mt-[40px]">
          <Rows s={s} />
          <p className="mt-[6px] flex items-center gap-[12px] text-[19px] text-(--d-grey)">
            [Founder quote] <Need />
          </p>
        </In>
      </div>
      <In i={0} className="relative isolate flex w-[560px] shrink-0 flex-col justify-end overflow-hidden rounded-[28px] p-[44px] text-white">
        <PhotoBack src={s.photo} sizes="600px" />
        <span className="text-[56px] leading-none tracking-[-0.03em]">{s.name}</span>
      </In>
    </Slide>
  )
}

/** C2, SaffronStays: a full-bleed split, the photo filling the left half, the before and after on the right. */
export function C2() {
  const s: Story = {
    photo: "/art/stories/saffronstays-band.webp",
    name: "SaffronStays",
    eyebrow: "SaffronStays · Villa rentals",
    headline: "SaffronStays went from missing 1 in 2 calls",
    grey: "to 1 in 50.",
    big: "50% → 2%",
    caption: "missed calls",
    problem: "Half of booking enquiries went unanswered.",
    did: "An agent that answers every enquiry and books follow-ups, 700+ calls a day.",
    result: "10% more revenue and 65% lower calling costs.",
  }
  return (
    <Slide className="flex-row p-0">
      <In i={0} className="relative isolate flex w-1/2 flex-col justify-end p-[120px] text-white">
        <PhotoBack src={s.photo} sizes="960px" />
        <span className="text-[72px] leading-none tracking-[-0.03em]">{s.name}</span>
      </In>
      <div className="flex w-1/2 flex-col justify-center gap-[44px] p-[120px]">
        <div className="deck-anim flex flex-col items-start gap-[24px]">
          <Pill>{s.eyebrow}</Pill>
          <Headline grey={s.grey} size={52}>
            {s.headline}
          </Headline>
        </div>
        <In className="flex flex-col gap-[12px]">
          <span className="text-[136px] leading-[0.85] tracking-[-0.05em] tabular-nums">{s.big}</span>
          <span className="text-[22px] text-(--d-grey)">{s.caption}</span>
        </In>
        <In i={2}>
          <Rows s={s} />
        </In>
      </div>
    </Slide>
  )
}

/** C3, Holiday Tribe: the photo full-bleed, the story in white over it. */
export function C3() {
  const s: Story = {
    photo: "/art/stories/holiday-tribe-band.webp",
    name: "Holiday Tribe",
    eyebrow: "Holiday Tribe · Travel",
    headline: "Holiday Tribe calls leads in seconds,",
    grey: "not 90 minutes.",
    big: "35%",
    caption: "of the sales team’s time saved",
    problem: "New web leads waited about 90 minutes for a callback.",
    did: "Zoho triggers an instant call and writes the result back to the CRM.",
    result: "35% of sales time saved and 30% more revenue per consultant.",
  }
  return (
    <Slide tone="photo" photo={s.photo}>
      <div className="deck-anim flex flex-col items-start gap-[24px]">
        <Pill dark>{s.eyebrow}</Pill>
        <Headline grey={s.grey} size={64} dark className="max-w-[1100px]">
          {s.headline}
        </Headline>
      </div>
      <div className="mt-auto flex items-end justify-between gap-[80px]">
        <In className="flex flex-col gap-[12px]">
          <span className="text-[220px] leading-[0.8] tracking-[-0.06em] tabular-nums">{s.big}</span>
          <span className="text-[24px] text-white/70">{s.caption}</span>
        </In>
        <In i={2} className="w-[760px] rounded-[24px] border border-white/10 bg-black/35 p-[32px] backdrop-blur-md">
          <Rows s={s} dark />
        </In>
      </div>
    </Slide>
  )
}

/** C4, Quess: a bento of the photo, the headline, the number and the story. */
export function C4() {
  const s: Story = {
    photo: "/art/industries/education-rail.webp",
    name: "Quess",
    eyebrow: "Quess · Staffing",
    headline: "Quess screens 10,000 candidates",
    grey: "a day.",
    big: "10,000",
    caption: "candidates screened every day, in three languages",
    problem: "Volume hiring across Hindi, English and Kannada speakers.",
    did: "Voice screening calls in all three languages.",
    result: (
      <span className="flex items-center gap-[12px]">
        [Result metric] <Need />
      </span>
    ),
  }
  return (
    <Slide>
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-[24px]">
        <In i={0} className="relative isolate row-span-2 flex flex-col justify-end overflow-hidden rounded-[28px] p-[44px] text-white">
          <PhotoBack src={s.photo} sizes="600px" />
          <span className="text-[56px] leading-none tracking-[-0.03em]">{s.name}</span>
        </In>
        <In className="col-span-2">
          <Panel className="h-full justify-between p-[44px]">
            <Pill className="border-(--d-line)">{s.eyebrow}</Pill>
            <Headline grey={s.grey} size={60}>
              {s.headline}
            </Headline>
          </Panel>
        </In>
        <In i={2}>
          <div className="flex h-full flex-col justify-end gap-[12px] rounded-[24px] bg-(--d-ink) p-[40px] text-white">
            <span className="text-[96px] leading-[0.85] tracking-[-0.05em] tabular-nums">{s.big}</span>
            <span className="text-[19px] leading-[1.4] text-white/65">{s.caption}</span>
          </div>
        </In>
        <In i={3}>
          <Panel className="h-full justify-center p-[36px]">
            <Rows s={s} />
          </Panel>
        </In>
      </div>
    </Slide>
  )
}

export function C5() {
  return (
    <Slide>
      <Title grey="on us.">Platforms build their voice products</Title>
      <div className="mt-auto grid grid-cols-2 gap-[28px]">
        <In>
          <Panel className="h-[420px] justify-between p-[52px]">
            <Pill className="border-(--d-line)">Clickpost</Pill>
            <div className="flex flex-col gap-[18px]">
              <span className="text-[112px] leading-[0.9] tracking-[-0.045em]">40+</span>
              <p className="max-w-[640px] text-[23px] leading-[1.45] text-(--d-grey)">
                40+ brands, including Nykaa, Caratlane and Borosil, use HoomanLabs voice inside Clickpost for delivery and order calls.
              </p>
            </div>
          </Panel>
        </In>
        <In i={2}>
          <div className="flex h-[420px] flex-col justify-between rounded-[24px] bg-(--d-ink) p-[52px] text-white">
            <Pill dark>Mindnotix</Pill>
            <div className="flex flex-col gap-[18px]">
              <span className="text-[112px] leading-[0.9] tracking-[-0.045em]">15+</span>
              <p className="max-w-[640px] text-[23px] leading-[1.45] text-white/60">
                15+ businesses live in 2 months on Sharyx Voice AI, a Tamil and Malayalam product built on our APIs.
              </p>
            </div>
          </div>
        </In>
      </div>
    </Slide>
  )
}
