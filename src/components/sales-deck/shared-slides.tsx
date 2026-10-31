import { ClockIcon, DatabaseIcon, EyeSlashIcon, IdentificationCardIcon, PhoneXIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siHubspot, siRazorpay, siShopify, siWhatsapp, siZendesk, siZoho, type SimpleIcon } from "simple-icons"

import {
  Arcs,
  BrandIcon,
  Bubble,
  CallCard,
  Card,
  Eyebrow,
  Figure,
  Headline,
  IconTile,
  In,
  Live,
  Need,
  PhotoBack,
  Qr,
  Slide,
  Sub,
  Tag,
  Wave,
  Window,
} from "@/components/sales-deck/kit"
import { cn } from "@/lib/utils"

/**
 * The shared slide library from the content doc: product slides P1 to P5 and
 * proof slides C1 to C5, used by both stories (only the eyebrow, and on
 * Story A the five-dot progress row, change). Copy is the doc's, word for word.
 *
 * Product template: copy in the left 40%, and in the right 60% the product UI
 * on the website's grey panel surface. Proof template: the customer's photo
 * card on the left (dimmed and lightly blurred, the name in white, as on the
 * homepage story cards), the story and its number on the right.
 */

export type Shared = { n: number; total: number; eyebrow?: string; dots?: number }

/** Story A's row of five dots, showing which gift the audience is on. */
function GiftDots({ on }: { on: number }) {
  return (
    <span className="mb-[28px] flex gap-[10px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("size-[10px] rounded-full", i === on ? "bg-(--d-ink)" : "bg-(--d-line)")} />
      ))}
    </span>
  )
}

/** Product template: copy on the left, the product UI on a grey panel on the right. */
function Product({ n, total, eyebrow, dots, headline, grey, body, children }: Shared & { headline: string; grey: string; body: React.ReactNode; children: React.ReactNode }) {
  return (
    <Slide n={n} total={total} className="flex-row gap-[80px]">
      <div className="flex w-[40%] shrink-0 flex-col justify-center">
        {dots ? <GiftDots on={dots} /> : null}
        {eyebrow && <Eyebrow className="mb-[28px]">{eyebrow}</Eyebrow>}
        <Headline grey={grey} size={64}>
          {headline}
        </Headline>
        <Sub className="mt-[32px] text-[26px]">{body}</Sub>
      </div>
      <Card className="min-w-0 flex-1 justify-center p-[48px]">{children}</Card>
    </Slide>
  )
}

export function P1(p: Shared) {
  return (
    <Product
      {...p}
      headline="It answers in under a second,"
      grey="at any volume."
      body="No queues, no IVR, no ‘all our agents are busy’. Every call is picked up, even on your busiest day."
    >
      <div className="flex flex-col gap-[14px]">
        <div className="flex justify-between font-mono text-[17px] text-(--d-grey)">
          <span>Waiting</span>
          <span className="flex items-center gap-[8px]">
            <Live /> Answered
          </span>
        </div>
        <Wave width={880} height={100} flattens="start" dot="#298646" className="text-(--d-ink)" />
      </div>
      <ul className="mt-[36px] flex flex-col">
        {[
          ["0.8s", "average time to answer"],
          ["300+", "calls handled at the same time"],
          ["200K+", "calls a day for a single customer"],
        ].map(([v, l]) => (
          <li key={v} className="flex items-baseline gap-[28px] border-t border-(--d-line) py-[24px] last:pb-0">
            <span className="w-[220px] text-[68px] leading-none tracking-[-0.04em] tabular-nums">{v}</span>
            <span className="text-[25px] text-(--d-grey)">{l}</span>
          </li>
        ))}
      </ul>
    </Product>
  )
}

/** Small alternating tilts for a scatter of tags. */
const TILTS = [-3, 2, -1.5, 2.5, -2, 1.5, -2.5, 3, -1, 2, -3, 1.5, -2, 2.5]

const LANGS = ["Hindi", "English", "Hinglish", "Tamil", "Kannada", "Telugu", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "Arabic", "Spanish", "+more"]

/** The talk-to-an-agent player with the Hinglish transcript (P2, and A7's demo). */
export function Player({ className }: { className?: string }) {
  return (
    <Window
      className={className}
      title={
        <>
          <Live /> Talk to an agent
        </>
      }
    >
      <div className="flex h-[88px] items-center gap-[5px] border-b border-(--ui-line) px-[30px]">
        {Array.from({ length: 64 }, (_, i) => (
          <span key={i} className="w-[4px] rounded-full bg-white/70" style={{ height: 6 + Math.round(30 * Math.abs(Math.sin(i * 0.6) * Math.cos(i * 0.23))) }} />
        ))}
      </div>
      <div className="flex flex-col gap-[22px] p-[30px] text-[24px] leading-[1.45]">
        <p className="flex flex-col gap-[4px]">
          <span className="font-mono text-[16px] text-(--ui-muted)">Caller</span>
          Mera order damaged aaya hai. Can you replace it?
        </p>
        <p className="flex flex-col gap-[4px]">
          <span className="font-mono text-[16px] text-(--ui-muted)">Agent</span>
          Bilkul. Aapka order number bata dijiye, main abhi replacement book kar deti hoon.
        </p>
      </div>
    </Window>
  )
}

export function P2(p: Shared) {
  return (
    <Product {...p} headline="It speaks Hindi, English," grey="or both in one sentence." body="Plus Tamil, Kannada, Telugu and more: 30+ languages and 250+ voices.">
      <Player />
      <div className="mt-[28px] flex items-end gap-[28px]">
        <ul className="flex flex-1 flex-wrap gap-[12px]">
          {LANGS.map((l, i) => (
            <li key={l}>
              <Tag dark={i < 3} tilt={TILTS[i % TILTS.length]} i={i + 2} className="py-[8px] text-[19px]">
                {l}
              </Tag>
            </li>
          ))}
        </ul>
        <Qr size={104} />
      </div>
    </Product>
  )
}

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

export function P3(p: Shared) {
  return (
    <Product
      {...p}
      headline="It does the work"
      grey="during the call and after it."
      body="Looks up orders, takes payments and books slots on the call. Updates your CRM and sends the summary after."
    >
      {/* The integrations fan out above and below the call, as tags */}
      <ul className="flex flex-wrap justify-center gap-[14px] px-[20px]">
        {LOGOS.slice(0, 5).map((l, i) => (
          <li key={l.name} style={{ translate: `0 ${[10, -6, 4, -8, 8][i]}px` }}>
            <Tag tilt={TILTS[i]} i={i + 2} className="gap-[10px] py-[8px] pl-[14px] text-[19px]">
              {l.icon && <BrandIcon icon={l.icon} size={20} />}
              {l.name}
            </Tag>
          </li>
        ))}
      </ul>
      <In i={1} className="relative z-10 mx-auto mt-[28px] w-[92%]">
        <CallCard compact className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)]" />
        <div className="ui-dark mt-[12px] flex items-center gap-[14px] rounded-[10px] bg-(--ui-bg) px-[24px] py-[16px] font-mono text-[18px] text-(--ui-text)">
          <span className="size-[9px] rounded-full bg-(--ui-live)" />
          Done in 1.4s · CRM updated · callback booked · summary sent
        </div>
      </In>
      <ul className="mt-[28px] flex flex-wrap justify-center gap-[14px] px-[20px]">
        {LOGOS.slice(5).map((l, i) => (
          <li key={l.name} style={{ translate: `0 ${[-8, 6, -4, 10, -6][i]}px` }}>
            <Tag tilt={TILTS[i + 5]} i={i + 7} className="gap-[10px] py-[8px] pl-[14px] text-[19px]">
              {l.icon && <BrandIcon icon={l.icon} size={20} />}
              {l.name}
            </Tag>
          </li>
        ))}
      </ul>
    </Product>
  )
}

const SIM_ROWS: [string, "Passed" | "Review"][] = [
  ["Frustrated repeat caller", "Passed"],
  ["Switches to Hindi", "Passed"],
  ["Interrupts often", "Passed"],
  ["Asks for a human", "Review"],
  ["In a hurry", "Passed"],
]

export function P4(p: Shared) {
  return (
    <Product
      {...p}
      headline="Tested before it talks to anyone."
      grey="And hands over when it should."
      body="Every agent runs through simulated callers before launch. When a caller needs a person, it transfers with a summary, so nobody repeats themselves."
    >
      <Window title="Billing assistant · v5 · 17 / 18 passed">
        <ul className="flex flex-col px-[30px] py-[6px]">
          {SIM_ROWS.map(([name, status]) => (
            <li key={name} className="flex items-center justify-between border-b border-(--ui-line) py-[16px] text-[22px] last:border-0">
              {name}
              <span
                className={cn("rounded-[6px] px-[12px] py-[4px] font-mono text-[16px]", status === "Passed" ? "bg-(--ok)/18 text-(--ok-fg)" : "bg-(--warn)/18 text-(--warn-fg)")}
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      </Window>
      <div className="mt-[20px] grid grid-cols-2 gap-[20px]">
        {["pass rate before go-live", "of live calls auto-scored"].map((l) => (
          <Card key={l} look="white" className="gap-[10px] p-[26px]">
            <span className="flex items-center gap-[12px] text-[52px] leading-none tracking-[-0.03em]">
              [X]% <Need />
            </span>
            <span className="text-[21px] text-(--d-grey)">{l}</span>
          </Card>
        ))}
      </div>
      <div className="mt-[20px] flex items-center gap-[14px] rounded-[8px] border border-(--d-line) bg-white px-[26px] py-[18px] text-[22px]">
        <Live />
        Warm transfer with call summary
      </div>
    </Product>
  )
}

const CONTROL_ICONS = [DatabaseIcon, IdentificationCardIcon, PhoneXIcon, ClockIcon, EyeSlashIcon, SealCheckIcon]

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
    <Product {...p} headline="Compliant by default," grey="not by contract." body="The rules Indian buyers check are built into the platform.">
      <div className="grid grid-cols-2 gap-[16px]">
        {CONTROLS.map(([label, body], i) => (
          <Card key={label} look="white" className="h-[212px] gap-[10px] p-[24px]">
            <span className="flex items-center gap-[14px] font-mono text-[17px] text-(--d-grey)">
              <IconTile icon={CONTROL_ICONS[i]} size={44} look="light" on />
              {label}
            </span>
            <span className="text-[22px] leading-[1.4]">{body}</span>
            <span className="mt-auto flex items-center gap-[10px] font-mono text-[16px] text-(--d-grey)">
              Status: [to confirm] <Need />
            </span>
          </Card>
        ))}
      </div>
    </Product>
  )
}

/* ---------- Proof template ---------- */

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
  quote?: React.ReactNode
  /** A picture of the number beside it (e.g. before and after as circles). */
  visual?: React.ReactNode
}

/** Proof template: the customer's photo card on the left, the story and its number on the right. */
function Proof({ n, total, s }: { n: number; total: number; s: Story }) {
  return (
    <Slide n={n} total={total} className="flex-row gap-[80px]">
      <div className="relative isolate flex w-[42%] shrink-0 flex-col justify-end overflow-hidden rounded-[8px] p-[48px] text-white">
        <PhotoBack src={s.photo} sizes="800px" />
        <span className="text-[64px] leading-none tracking-[-0.03em]">{s.name}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <Headline grey={s.grey} size={52} className="mt-[22px]">
          {s.headline}
        </Headline>
        <div className="mt-[40px] flex items-end justify-between gap-[32px]">
          <Figure value={s.big} caption={s.caption} className="border-0 p-0" />
          {s.visual}
        </div>
        <dl className="mt-[36px] flex flex-col">
          {(
            [
              ["The problem", s.problem],
              ["What we did", s.did],
              ["The result", s.result],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[190px_1fr] gap-[24px] border-t border-(--d-line) py-[16px]">
              <dt className="font-mono text-[17px] text-(--d-grey)">{k}</dt>
              <dd className="text-[22px] leading-[1.45]">{v}</dd>
            </div>
          ))}
        </dl>
        {s.quote && <p className="mt-[16px] flex items-center gap-[12px] text-[22px] text-(--d-grey)">{s.quote}</p>}
      </div>
    </Slide>
  )
}

export function C1({ n, total, headline }: Shared & { headline?: string }) {
  return (
    <Proof
      n={n}
      total={total}
      s={{
        photo: "/art/stories/giva-band.webp",
        name: "GIVA",
        eyebrow: "GIVA · D2C jewellery",
        headline: headline ?? "GIVA handles most support calls",
        grey: headline ? undefined : "with an agent.",
        big: "70%",
        caption: "of support queries automated",
        problem: "Support costs rising with every new order.",
        did: "A voice agent for order status, returns and FAQs.",
        result: "50% lower support cost, with 90% CSAT kept.",
        quote: (
          <>
            [Founder quote] <Need />
          </>
        ),
      }}
    />
  )
}

export function C2({ n, total }: Shared) {
  return (
    <Proof
      n={n}
      total={total}
      s={{
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
        visual: (
          <span className="flex items-end gap-[20px] text-(--d-ink)">
            <Bubble value={0.5} box={150} />
            <Bubble value={0.02} box={150} />
          </span>
        ),
      }}
    />
  )
}

export function C3({ n, total }: Shared) {
  return (
    <Proof
      n={n}
      total={total}
      s={{
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
      }}
    />
  )
}

export function C4({ n, total }: Shared) {
  return (
    <Proof
      n={n}
      total={total}
      s={{
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
      }}
    />
  )
}

export function C5({ n, total }: Shared) {
  return (
    <Slide n={n} total={total}>
      <Headline grey="on us.">Platforms build their voice products</Headline>
      <div className="mt-auto grid grid-cols-2 gap-[24px]">
        <Card look="grey" className="h-[460px] justify-between p-[52px]">
          <span className="font-mono text-[20px] text-(--d-grey)">Clickpost</span>
          <div className="flex flex-col gap-[20px]">
            <span className="text-[120px] leading-none tracking-[-0.04em]">40+</span>
            <p className="max-w-[660px] text-[26px] leading-[1.45] text-(--d-grey)">
              40+ brands, including Nykaa, Caratlane and Borosil, use HoomanLabs voice inside Clickpost for delivery and order calls.
            </p>
          </div>
        </Card>
        <Card look="dark" className="isolate h-[460px] justify-between overflow-hidden border-0 bg-(--d-dark) p-[52px]">
          <Arcs corner="tr" rings={5} thickness={22} gap={26} inner={60} className="top-0 right-0 -z-10 text-white/[0.07]" />
          <span className="font-mono text-[20px] text-white/55">Mindnotix</span>
          <div className="flex flex-col gap-[20px]">
            <span className="text-[120px] leading-none tracking-[-0.04em]">15+</span>
            <p className="max-w-[660px] text-[26px] leading-[1.45] text-white/65">
              15+ businesses live in 2 months on Sharyx Voice AI, a Tamil and Malayalam product built on our APIs.
            </p>
          </div>
        </Card>
      </div>
    </Slide>
  )
}
