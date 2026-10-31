import {
  ChatCircleTextIcon,
  ClockIcon,
  LightningIcon,
  PhoneCallIcon,
  PhoneIcon,
  PhoneXIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  TranslateIcon,
  TrendUpIcon,
  UsersThreeIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr"

import {
  Arcs,
  Bubble,
  Button,
  CallCard,
  Card,
  Compare,
  Contours,
  CoverLogo,
  Cursor,
  Eyebrow,
  GhostPills,
  HERO_PHOTO,
  Headline,
  IconTile,
  In,
  Need,
  PhotoBack,
  Process,
  Qr,
  Slide,
  Sub,
  Tag,
} from "@/components/sales-deck/kit"
import { C1, C2, C3, C4, P1, P2, P3, P4, P5 } from "@/components/sales-deck/shared-slides"
import { Agenda, Divider, SECTIONS_B } from "@/components/sales-deck/sections"
import { cn } from "@/lib/utils"

/**
 * Story B, Challenger teaching (20 slides, the recommended version), from the
 * content doc "HoomanLabs Sales Deck: Slide-by-Slide Content". On-slide copy is
 * the doc's, word for word; [X] gaps carry a "Data needed" label.
 */

const T = 20

/** The four live demo agents, with their numbers (shared with Story A). */
export const DEMOS = [
  ["Edtech lead qualification", "+91-8035316807"],
  ["Field sales job screening", "+91-8035316832"],
  ["Villa feedback collection", "+91-8035316692"],
  ["Real estate lead qualification", "+91-8035739357"],
]

/** "Call it" chips, each with a QR code. */
export function DemoChips({ className }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-4 gap-[16px] ${className ?? ""}`}>
      {DEMOS.map(([name, phone]) => (
        <li
          key={phone}
          className="flex items-center gap-[16px] rounded-[14px] border border-white/12 bg-[#151515]/80 p-[16px] text-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)]"
        >
          <Qr size={76} dark />
          <span className="flex min-w-0 flex-col gap-[4px]">
            <span className="flex items-center gap-[8px] font-mono text-[14px] text-white/55">
              <PhoneIcon className="size-[14px]" /> Call it
            </span>
            <span className="text-[18px] leading-[1.3]">{name}</span>
            <span className="font-mono text-[16px] tabular-nums">{phone}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Cover meta line, e.g. "HoomanLabs · Sales deck · [Month 2026]". */
export function Meta() {
  return (
    <span className="flex items-center gap-[12px] font-mono text-[20px] text-white/70">
      HoomanLabs · Sales deck · [Month 2026] <Need />
    </span>
  )
}

/** Icon tiles floating over a photo, each placed and tilted. */
export function Floating({ tiles }: { tiles: { icon: React.ComponentProps<typeof IconTile>["icon"]; x: number; y: number; r: number; size?: number; on?: boolean }[] }) {
  return (
    <>
      {tiles.map((t, i) => (
        <span key={i} className="absolute" style={{ left: t.x, top: t.y, transform: `rotate(${t.r}deg)` }}>
          <IconTile icon={t.icon} size={t.size ?? 120} on={t.on} />
        </span>
      ))}
    </>
  )
}

function B1() {
  return (
    <Slide n={1} total={T} tone="photo" photo={HERO_PHOTO} footer={false} className="pb-[96px]">
      <Floating
        tiles={[
          { icon: PhoneCallIcon, x: 1330, y: 230, r: -8, size: 132, on: true },
          { icon: PhoneXIcon, x: 1580, y: 380, r: 9 },
          { icon: ClockIcon, x: 1250, y: 470, r: 6, size: 104 },
        ]}
      />
      <CoverLogo />
      <div className="mt-auto flex items-end justify-between gap-[64px]">
        <div className="flex flex-col gap-[32px]">
          <Headline grey="Then you let it ring out." size={112} dark>
            You pay to make your phone ring.
          </Headline>
          <Sub dark className="max-w-[960px]">
            A conversation about the calls you’re losing, and how to stop losing them.
          </Sub>
        </div>
        <Meta />
      </div>
    </Slide>
  )
}

function B2() {
  const cards = [
    ["01", TrendUpIcon, "Leads up", "Marketing keeps the phone ringing, and volume keeps climbing."],
    ["02", UsersThreeIcon, "Team flat", "The same people are expected to call back faster every month."],
    ["03", LightningIcon, "Peaks spike", "Sale and festive seasons multiply volume for weeks. Hiring can’t follow."],
  ] as const
  return (
    <Slide n={2} total={T}>
      <Eyebrow>Your world</Eyebrow>
      <Headline grey="And a peak every festive season." className="mt-[28px]">
        Leads up. Headcount flat.
      </Headline>
      <div className="mt-auto grid grid-cols-3 gap-[24px]">
        {cards.map(([n, icon, title, body], i) => (
          <Card key={n} className="deck-anim gap-[18px] p-[40px]" style={{ "--i": i + 1 } as React.CSSProperties}>
            <div className="flex items-start justify-between">
              <IconTile icon={icon} size={88} look="soft" />
              <span className="text-[96px] leading-[0.8] tracking-[-0.05em] text-(--d-ink)/15 tabular-nums">{n}</span>
            </div>
            <span className="mt-[20px] text-[34px] leading-[1.15]">{title}</span>
            <span className="text-[24px] leading-[1.45] text-(--d-grey)">{body}</span>
          </Card>
        ))}
      </div>
    </Slide>
  )
}

function B3() {
  return (
    <Slide n={3} total={T} tone="dark" className="items-center justify-center text-center">
      <GhostPills dark />
      <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_50%,#0D0D0D_35%,transparent)]" />
      <Headline grey="It’s the phone." size={112} dark>
        Your biggest leak isn’t marketing.
      </Headline>
      <Sub dark className="mt-[40px] max-w-[1100px]">
        You pay to make the phone ring. Then missed and slow calls quietly lose the leads you already paid for.
      </Sub>
      <Need className="mt-[24px]" />
    </Slide>
  )
}

function B4() {
  const tiles = [
    ["50%", "of calls missed.", "SaffronStays, before."],
    ["~90 min", "to call back a new lead.", "Holiday Tribe, before."],
    ["12%", "of inbound calls missed.", "Holiday Tribe, before."],
    ["30–35%", "of seller time spent on junk leads.", "Source to confirm."],
  ]
  return (
    <Slide n={4} total={T}>
      <Eyebrow>The cost</Eyebrow>
      <Headline grey="And they’re not unusual." className="mt-[28px]">
        Half of SaffronStays’ calls went unanswered.
      </Headline>
      {/* The four numbers as a bento: the headline figure large and dark, the rest round it */}
      <div className="mt-auto grid h-[480px] grid-cols-4 grid-rows-2 gap-[20px]">
        <In i={1} className="relative isolate col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-[14px] bg-(--d-dark) p-[40px] text-white">
          <Arcs corner="br" rings={5} thickness={22} gap={28} inner={60} className="right-0 bottom-0 -z-10 text-white/[0.06]" />
          <Tag icon={PhoneXIcon} dark className="text-[19px]">
            Before HoomanLabs
          </Tag>
          <span className="flex items-end justify-between gap-[24px]">
            <span className="flex flex-col gap-[14px]">
              <span className="text-[150px] leading-[0.8] tracking-[-0.05em]">{tiles[0][0]}</span>
              <span className="text-[26px] text-white/75">{tiles[0][1]}</span>
              <span className="font-mono text-[17px] text-white/50">{tiles[0][2]}</span>
            </span>
            <Bubble value={0.5} box={170} dark className="text-white" />
          </span>
        </In>
        {tiles.slice(1).map(([v, cap, src], i) => (
          <In key={v} i={i + 2} className={cn("flex flex-col justify-between rounded-[14px] border border-(--d-line) bg-white p-[30px]", i === 0 && "col-span-2")}>
            <span className="text-[72px] leading-none tracking-[-0.04em] tabular-nums">{v}</span>
            <span className="flex flex-col gap-[8px]">
              <span className="text-[22px] leading-[1.35]">{cap}</span>
              <span className="flex items-center gap-[10px] font-mono text-[16px] text-(--d-grey)">
                {src} {i === 2 && <Need />}
              </span>
            </span>
          </In>
        ))}
      </div>
    </Slide>
  )
}

function B5() {
  const inputs = [
    ["[X]", "leads a month"],
    ["[X]%", "missed or answered late"],
    ["[X]%", "conversion"],
    ["₹[X]", "average order value"],
  ]
  const op = "self-center text-[48px] text-(--d-grey)"
  return (
    <Slide n={5} total={T} tone="grey">
      <Cursor className="top-[760px] left-[300px]" i={6} />
      <Headline grey="every month." block={false}>
        Here’s what that costs you
      </Headline>
      <div className="mt-auto flex items-stretch gap-[16px]">
        {inputs.map(([v, l], i) => (
          <div key={l} className="contents">
            {i > 0 && <span className={op}>×</span>}
            <Card look="white" className="h-[240px] flex-1 justify-between p-[30px] shadow-[0_18px_40px_-24px_rgb(0_0_0/0.25)]">
              <span className="text-[60px] leading-none tracking-[-0.03em]">{v}</span>
              <span className="font-mono text-[18px] text-(--d-grey)">{l}</span>
            </Card>
          </div>
        ))}
        <span className={op}>=</span>
        <div className="relative isolate flex h-[240px] flex-[1.25] flex-col justify-between overflow-hidden rounded-[8px] bg-(--d-dark) p-[30px] text-white shadow-[0_24px_50px_-20px_rgb(0_0_0/0.5)]">
          <Arcs corner="tr" rings={4} thickness={14} gap={18} inner={40} className="-top-px -right-px -z-10 text-white/[0.08]" />
          <span className="text-[60px] leading-none tracking-[-0.03em]">₹[X]</span>
          <span className="font-mono text-[18px] text-white/60">lost every month</span>
        </div>
      </div>
      <p className="mt-[28px] flex items-center gap-[14px] font-mono text-[20px] text-(--d-grey)">
        Your numbers, filled in live. <Need />
      </p>
    </Slide>
  )
}

function B6() {
  return (
    <Slide n={6} total={T}>
      <div className="flex gap-[24px]">
        <span className="-mt-[24px] text-[160px] leading-none text-(--d-line)">“</span>
        <Headline grey="The leads say nobody called." size={80}>
          Sales says the leads are junk.
        </Headline>
      </div>
      <div className="relative isolate mt-auto flex h-[360px] flex-col justify-end gap-[16px] overflow-hidden rounded-[14px] p-[48px] text-white">
        <PhotoBack src="/art/industries/e-commerce-rail.webp" />
        <Floating
          tiles={[
            { icon: PhoneXIcon, x: 1230, y: 40, r: -7, size: 96 },
            { icon: PhoneXIcon, x: 1380, y: 120, r: 6, size: 96 },
            { icon: PhoneXIcon, x: 1520, y: 30, r: -4, size: 96 },
          ]}
        />
        <Eyebrow dark className="flex items-center gap-[12px]">
          A real story <Need />
        </Eyebrow>
        <p className="max-w-[1100px] text-[38px] leading-[1.3]">A customer calls three times during a sale. Nobody picks up. She buys from a competitor who answered.</p>
      </div>
    </Slide>
  )
}

function B7() {
  return (
    <Slide n={7} total={T}>
      <Contours />
      <Headline grey="And finish the job on the call." className="text-center">
        Answer every call in seconds, in their language.
      </Headline>
      <Process
        soft
        className="mt-auto"
        size={124}
        steps={[
          { n: "01", icon: LightningIcon, title: "Seconds, not minutes", body: "Every call picked up instantly, at any hour and any volume." },
          { n: "02", icon: TranslateIcon, title: "Their language, not yours", body: "Hindi, English, Hinglish or a regional language, whatever the caller speaks." },
          { n: "03", icon: CheckCircleIcon, title: "Done on the call, not after", body: "Order found, slot booked, CRM updated before they hang up." },
        ]}
      />
      <p className="mt-[44px] text-center font-mono text-[20px] text-(--d-grey)">The standard any solution has to meet.</p>
    </Slide>
  )
}

function B8() {
  return (
    <Slide n={8} total={T}>
      <Headline grey="can’t get you there.">More agents, IVRs and generic bots</Headline>
      <Compare
        band
        className="mt-auto"
        cols={["Answers in seconds", "Speaks Hinglish", "Scales for peaks", "Acts on your systems"]}
        rows={[
          ["More agents", "No", "Yes", "No", "Partly"],
          ["IVR menus", "Partly", "No", "Yes", "No"],
          ["Generic bots", "Yes", "No", "Yes", "Partly"],
          ["The new way", "Yes", "Yes", "Yes", "Yes"],
        ]}
      />
    </Slide>
  )
}

/** B9: the reveal, over the hero landscape (a callback to the cover). */
export function Reveal({ n, total }: { n: number; total: number }) {
  return (
    <Slide n={n} total={total} tone="photo" photo={HERO_PHOTO}>
      <Floating
        tiles={[
          { icon: ChatCircleTextIcon, x: 1150, y: 110, r: -9, size: 104 },
          { icon: WhatsappLogoIcon, x: 1700, y: 520, r: 8, size: 96 },
        ]}
      />
      <div className="flex gap-[80px]">
        <div className="flex flex-1 flex-col">
          <Eyebrow dark>The solution</Eyebrow>
          <Headline grey="Voice and chat agents, tested before they talk to your customers." size={68} dark className="mt-[28px]">
            HoomanLabs: built for the new way.
          </Headline>
          <ul className="mt-[48px] grid grid-cols-3 gap-[16px]">
            {[
              ["1.5M", "conversations a week"],
              ["30+", "languages"],
              ["[X]", "live customers"],
            ].map(([v, l]) => (
              <li key={l} className="flex flex-col gap-[8px] border-t border-white/25 pt-[18px]">
                <span className="flex items-center gap-[12px] text-[60px] leading-none tracking-[-0.03em]">
                  {v} {v === "[X]" && <Need />}
                </span>
                <span className="text-[22px] text-white/65">{l}</span>
              </li>
            ))}
          </ul>
        </div>
        <CallCard compact className="relative z-10 mt-[60px] w-[580px] shrink-0 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]" />
      </div>
      <DemoChips className="mt-auto" />
    </Slide>
  )
}

function B19() {
  const cards = [
    ["Your monthly loss", "₹[X]"],
    ["HoomanLabs per month", "₹[X]"],
    ["Payback", "[X] weeks"],
  ]
  return (
    <Slide n={19} total={T} tone="dark">
      <Headline grey="costs ₹[X]." dark>
        Every month you wait
      </Headline>
      {/* A bento: the monthly loss large, the plan and payback beside it, the payback chart under them */}
      <div className="mt-auto grid h-[540px] grid-cols-4 grid-rows-2 gap-[20px]">
        <In i={1} className="relative isolate col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-[14px] border border-white/10 bg-[#151515] p-[40px]">
          <Arcs corner="br" rings={5} thickness={22} gap={28} inner={60} className="right-0 bottom-0 -z-10 text-white/[0.05]" />
          <span className="font-mono text-[18px] text-white/55">{cards[0][0]}</span>
          <span className="flex items-center gap-[16px] text-[150px] leading-[0.8] tracking-[-0.05em]">
            {cards[0][1]} <Need />
          </span>
        </In>
        {cards.slice(1).map(([l, v], i) => (
          <In key={l} i={i + 2} className="flex flex-col justify-between rounded-[14px] border border-white/10 bg-[#151515] p-[30px]">
            <span className="font-mono text-[17px] text-white/55">{l}</span>
            <span className="flex items-center gap-[12px] text-[64px] leading-none tracking-[-0.04em]">
              {v} <Need />
            </span>
          </In>
        ))}
        <In i={4} className="col-span-2 flex items-center overflow-hidden rounded-[14px] border border-white/10 bg-[#151515] px-[30px]">
          {/* A cost line and a savings line crossing at the payback point */}
          <svg viewBox="0 0 760 200" className="h-[200px] w-full text-white" aria-hidden>
            <line x1="0" y1="199" x2="760" y2="199" stroke="currentColor" strokeOpacity="0.2" />
            <path d="M0 70 L760 70" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 8" />
            <path d="M0 190 C 180 170, 320 100, 410 70 S 640 16, 760 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="410" cy="70" r="14" fill="#298646" fillOpacity="0.25" />
            <circle cx="410" cy="70" r="7" fill="#298646" />
          </svg>
        </In>
      </div>
      <p className="mt-[24px] font-mono text-[19px] text-white/55">Billed per second. Pay-as-you-go from ₹7.5 per minute, Enterprise from ₹5 per minute.</p>
    </Slide>
  )
}

/** The two ways to start (B20). */
const WAYS = [
  ["Build it yourself", "sign up, build, test against simulated callers and go live, often the same day."],
  ["Build it with our team", "our engineers build your first flow on your systems, in 4 to 8 weeks."],
]

function B20() {
  return (
    <Slide n={20} total={T} tone="photo" photo={HERO_PHOTO}>
      <div className="flex items-start justify-between gap-[80px]">
        <Headline grey="this week." size={104} dark>
          Start with a pilot
        </Headline>
        <Process
          dark
          on={0}
          size={104}
          className="w-[860px]"
          steps={[
            { icon: PhoneIcon, title: "1 Demo call (30 min)" },
            { icon: UsersThreeIcon, title: "2 Use-case workshop" },
            { icon: RocketLaunchIcon, title: "3 Pilot on live traffic" },
          ]}
        />
      </div>
      <div className="mt-auto flex items-end gap-[20px]">
        {WAYS.map(([t, b]) => (
          <div key={t} className="flex w-[470px] flex-col gap-[10px] rounded-[14px] border border-white/12 bg-[#151515]/80 p-[28px] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)]">
            <span className="text-[26px]">{t}</span>
            <span className="text-[20px] leading-[1.45] text-white/70">{b}</span>
          </div>
        ))}
        <div className="ml-auto flex items-end gap-[24px]">
          <div className="flex flex-col items-end gap-[16px]">
            <Button onDark>Book a demo</Button>
            <span className="flex items-center gap-[10px] font-mono text-[18px] text-white/70">
              [Booking link] · [Sales email] <Need />
            </span>
          </div>
          <Qr size={120} dark />
        </div>
      </div>
    </Slide>
  )
}

export function storyB() {
  return [
    <B1 key={1} />,
    <Agenda key="agenda" sections={SECTIONS_B} />,
    <Divider key="s1" section={SECTIONS_B[0]} sections={SECTIONS_B} />,
    <B2 key={2} />,
    <B3 key={3} />,
    <Divider key="s2" section={SECTIONS_B[1]} sections={SECTIONS_B} />,
    <B4 key={4} />,
    <B5 key={5} />,
    <B6 key={6} />,
    <Divider key="s3" section={SECTIONS_B[2]} sections={SECTIONS_B} />,
    <B7 key={7} />,
    <B8 key={8} />,
    <Divider key="s4" section={SECTIONS_B[3]} sections={SECTIONS_B} />,
    <Reveal key={9} n={9} total={T} />,
    <P1 key={10} n={10} total={T} eyebrow="The new way · 01 Seconds" />,
    <P2 key={11} n={11} total={T} eyebrow="The new way · 02 Language" />,
    <P3 key={12} n={12} total={T} eyebrow="The new way · 03 Done on the call" />,
    <P4 key={13} n={13} total={T} eyebrow="The new way · 04 Safe for your brand" />,
    <P5 key={14} n={14} total={T} eyebrow="The new way · 05 Compliant" />,
    <Divider key="s5" section={SECTIONS_B[4]} sections={SECTIONS_B} />,
    <C1 key={15} n={15} total={T} />,
    <C2 key={16} n={16} total={T} />,
    <C3 key={17} n={17} total={T} />,
    <C4 key={18} n={18} total={T} />,
    <Divider key="s6" section={SECTIONS_B[5]} sections={SECTIONS_B} />,
    <B19 key={19} />,
    <B20 key={20} />,
  ]
}
