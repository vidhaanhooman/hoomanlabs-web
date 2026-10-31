import {
  CheckCircleIcon,
  ClockIcon,
  LightningIcon,
  PhoneCallIcon,
  PhoneIcon,
  PhoneXIcon,
  RocketLaunchIcon,
  TranslateIcon,
  TrendUpIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"

import {
  At,
  Button,
  CALL_STEPS,
  Cursor,
  HERO_PHOTO,
  Headline,
  In,
  Lines,
  Need,
  Panel,
  PhotoBack,
  Phone,
  Pill,
  Process,
  Qr,
  Slide,
  Sub,
  Tag,
  Tile,
  Title,
  Wall,
} from "@/components/sales-deck/kit"
import { Agenda, Divider, SECTIONS_B } from "@/components/sales-deck/sections"
import { C1, C2, C3, C4, P1, P2, P3, P4, P5 } from "@/components/sales-deck/shared-slides"

/**
 * Story B, Challenger teaching, from the content doc "HoomanLabs Sales Deck:
 * Slide-by-Slide Content", with an agenda and section dividers. On-slide copy
 * is the doc's, word for word; [X] gaps carry a "Data needed" label.
 */

/** The four live demo agents, with their numbers (shared with Story A). */
export const DEMOS = [
  ["Edtech lead qualification", "+91-8035316807"],
  ["Field sales job screening", "+91-8035316832"],
  ["Villa feedback collection", "+91-8035316692"],
  ["Real estate lead qualification", "+91-8035739357"],
]

/** "Call it": the demo agents in a 2 × 2 grid of dark tags, each with its number and a QR code. */
export function DemoRow({ className }: { className?: string }) {
  return (
    <ul className={`deck-anim grid grid-cols-2 gap-[16px] ${className ?? ""}`} style={{ "--i": 3 } as React.CSSProperties}>
      {DEMOS.map(([name, phone]) => (
        <li key={phone} className="flex items-center gap-[18px] rounded-[18px] border border-white/10 bg-white/[0.06] p-[16px] text-white backdrop-blur-md">
          <Qr size={68} dark />
          <span className="flex min-w-0 flex-col gap-[5px]">
            <span className="flex items-center gap-[8px] text-[14px] text-white/55">
              <PhoneIcon className="size-[14px]" /> Call it
            </span>
            <span className="text-[18px] leading-[1.3]">{name}</span>
            <span className="font-mono text-[15px] text-white/80 tabular-nums">{phone}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Cover meta line, e.g. "HoomanLabs · Sales deck · [Month 2026]". */
export function Meta() {
  return (
    <span className="flex shrink-0 items-center gap-[12px] text-[17px] whitespace-nowrap text-white/65">
      HoomanLabs · Sales deck · [Month 2026] <Need />
    </span>
  )
}

/** A labelled glossy tile, floating on a photo. */
function Floating({ icon, x, y, r, size = 120, i = 2 }: { icon: React.ComponentProps<typeof Tile>["icon"]; x: number; y: number; r: number; size?: number; i?: number }) {
  return (
    <At x={x} y={y} r={r} i={i}>
      <Tile icon={icon} size={size} />
    </At>
  )
}

function B1() {
  return (
    <Slide tone="photo" photo={HERO_PHOTO}>
      <Floating icon={PhoneCallIcon} x={1310} y={230} r={-8} size={140} />
      <Floating icon={PhoneXIcon} x={1580} y={400} r={9} i={3} />
      <Floating icon={ClockIcon} x={1230} y={500} r={6} size={104} i={4} />
      <div className="deck-anim mt-auto flex items-end justify-between gap-[80px]">
        <div className="flex flex-col items-start gap-[32px]">
          <Headline grey="Then you let it ring out." size={112} dark>
            You pay to make your phone ring.
          </Headline>
          <Sub dark>A conversation about the calls you’re losing, and how to stop losing them.</Sub>
        </div>
        <Meta />
      </div>
    </Slide>
  )
}

/** B2: the three pressures scattered round the headline as embossed tiles, each with its line. */
function B2() {
  const items = [
    { icon: TrendUpIcon, n: "01", title: "Leads up", body: "Marketing keeps the phone ringing, and volume keeps climbing.", x: 170, y: 560 },
    { icon: UsersThreeIcon, n: "02", title: "Team flat", body: "The same people are expected to call back faster every month.", x: 1420, y: 520 },
    { icon: LightningIcon, n: "03", title: "Peaks spike", body: "Sale and festive seasons multiply volume for weeks. Hiring can’t follow.", x: 800, y: 660 },
  ]
  return (
    <Slide className="items-center">
      <Lines />
      <Title pill="Your world" grey="And a peak every festive season.">
        Leads up. Headcount flat.
      </Title>
      {items.map((it, i) => (
        <At key={it.n} x={it.x} y={it.y} i={i + 2}>
          <div className="flex w-[330px] flex-col items-center gap-[14px] text-center">
            <Tile icon={it.icon} look="soft" size={112} />
            <span className="mt-[8px] text-[28px] leading-[1.2]">{it.title}</span>
            <span className="text-[18px] leading-[1.45] text-(--d-grey)">{it.body}</span>
          </div>
        </At>
      ))}
      <Cursor x={1680} y={620} i={6} />
    </Slide>
  )
}

function B3() {
  return (
    <Slide tone="dark" className="items-center justify-center text-center">
      <Wall dark />
      <Headline grey="It’s the phone." size={104} dark className="deck-anim">
        Your biggest leak isn’t marketing.
      </Headline>
      <Sub dark className="deck-anim mt-[36px] text-center">
        You pay to make the phone ring. Then missed and slow calls quietly lose the leads you already paid for.
      </Sub>
      <Need className="mt-[20px]" />
    </Slide>
  )
}

/** B4: one giant number, the other three small along the side. */
function B4() {
  return (
    <Slide className="flex-row gap-[96px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <Title pill="The cost" grey="And they’re not unusual." size={60} center={false}>
          Half of SaffronStays’ calls went unanswered.
        </Title>
        <In className="mt-auto flex flex-col gap-[20px]">
          <Tag icon={PhoneXIcon}>Before HoomanLabs</Tag>
          <span className="text-[380px] leading-[0.76] tracking-[-0.065em] tabular-nums">50%</span>
          <span className="flex items-baseline gap-[20px]">
            <span className="text-[30px]">of calls missed.</span>
            <span className="font-mono text-[17px] text-(--d-grey)">SaffronStays, before.</span>
          </span>
        </In>
      </div>
      <ul className="flex w-[440px] shrink-0 flex-col justify-end gap-[20px]">
        {[
          ["~90 min", "to call back a new lead.", "Holiday Tribe, before."],
          ["12%", "of inbound calls missed.", "Holiday Tribe, before."],
          ["30–35%", "of seller time spent on junk leads.", "Source to confirm."],
        ].map(([v, cap, src], i) => (
          <li key={v} className="deck-anim" style={{ "--i": i + 2 } as React.CSSProperties}>
            <Panel className="gap-[10px] p-[30px]">
              <span className="text-[60px] leading-none tracking-[-0.04em] tabular-nums">{v}</span>
              <span className="text-[20px]">{cap}</span>
              <span className="flex items-center gap-[10px] font-mono text-[15px] text-(--d-grey)">
                {src} {i === 2 && <Need />}
              </span>
            </Panel>
          </li>
        ))}
      </ul>
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
  const op = "self-center text-[44px] text-(--d-grey)"
  return (
    <Slide>
      <Title grey="every month.">Here’s what that costs you</Title>
      <In className="mt-auto flex items-stretch gap-[18px]">
        {inputs.map(([v, l], i) => (
          <div key={l} className="contents">
            {i > 0 && <span className={op}>×</span>}
            <Panel className="h-[230px] flex-1 justify-between p-[30px]">
              <span className="text-[16px] text-(--d-grey)">{l}</span>
              <span className="text-[56px] leading-none tracking-[-0.03em]">{v}</span>
            </Panel>
          </div>
        ))}
        <span className={op}>=</span>
        <div className="flex h-[230px] flex-[1.3] flex-col justify-between rounded-[24px] bg-(--d-ink) p-[30px] text-white">
          <span className="text-[16px] text-white/55">lost every month</span>
          <span className="text-[56px] leading-none tracking-[-0.03em]">₹[X]</span>
        </div>
      </In>
      <Cursor x={300} y={800} i={4} />
      <In i={3} className="mx-auto mt-[32px] flex items-center gap-[12px] text-[19px] text-(--d-grey)">
        Your numbers, filled in live. <Need />
      </In>
    </Slide>
  )
}

/** B6: a split screen, what sales says on the left, what the leads say over the story on the right. */
function B6() {
  return (
    <Slide className="flex-row p-0" markOnDark>
      <div className="deck-anim flex w-1/2 flex-col justify-end p-[120px]">
        <span className="h-[90px] text-[180px] leading-[0.8] text-(--d-ink)/15">“</span>
        <Headline size={88} className="mt-[32px]">
          Sales says the leads are junk.
        </Headline>
      </div>
      <div className="relative isolate flex w-1/2 flex-col justify-end gap-[28px] p-[120px] text-white">
        <PhotoBack src="/art/industries/e-commerce-rail.webp" sizes="960px" dim={0.62} />
        {[
          { x: 520, y: 160, r: -7 },
          { x: 660, y: 270, r: 6 },
          { x: 380, y: 250, r: -4 },
        ].map((p, i) => (
          <span key={i} className="deck-anim absolute" style={{ left: p.x, top: p.y, rotate: `${p.r}deg`, "--i": i + 3 } as React.CSSProperties}>
            <Tile icon={PhoneXIcon} size={96} />
          </span>
        ))}
        <In i={1}>
          <Headline size={88} dark className="text-white/60">
            The leads say nobody called.
          </Headline>
        </In>
        <In i={2} className="flex flex-col items-start gap-[16px]">
          <Pill dark className="flex items-center gap-[12px]">
            A real story <Need />
          </Pill>
          <p className="text-[26px] leading-[1.4]">A customer calls three times during a sale. Nobody picks up. She buys from a competitor who answered.</p>
        </In>
      </div>
    </Slide>
  )
}

function B7() {
  return (
    <Slide className="items-center">
      <Lines />
      <Title grey="And finish the job on the call." size={72}>
        Answer every call in seconds, in their language.
      </Title>
      <Process
        className="mt-auto w-full"
        steps={[
          { icon: LightningIcon, title: "Seconds, not minutes", body: "Every call picked up instantly, at any hour and any volume." },
          { icon: TranslateIcon, title: "Their language, not yours", body: "Hindi, English, Hinglish or a regional language, whatever the caller speaks." },
          { icon: CheckCircleIcon, title: "Done on the call, not after", body: "Order found, slot booked, CRM updated before they hang up." },
        ]}
      />
      <In i={4} className="mt-[44px] text-[19px] text-(--d-grey)">
        The standard any solution has to meet.
      </In>
    </Slide>
  )
}

/** Where each option sits on B8's quadrant (0 to 1 across for speed, 0 to 1 up for Hinglish), with the other two answers. */
const OPTIONS = [
  { name: "More agents", x: 0.2, y: 0.8, rest: "Scales for peaks: No · Acts on your systems: Partly" },
  { name: "IVR menus", x: 0.5, y: 0.2, rest: "Scales for peaks: Yes · Acts on your systems: No" },
  { name: "Generic bots", x: 0.82, y: 0.22, rest: "Scales for peaks: Yes · Acts on your systems: Partly" },
  { name: "The new way", x: 0.82, y: 0.82, rest: "Scales for peaks: Yes · Acts on your systems: Yes", on: true },
]

/** B8: the options on a quadrant, answering in seconds across and speaking Hinglish up; only the new way reaches the top right. */
function B8() {
  const W = 1560
  const H = 470
  return (
    <Slide>
      <Title grey="can’t get you there." size={64} center={false}>
        More agents, IVRs and generic bots
      </Title>
      <In className="mt-auto mb-[36px] ml-[60px]">
        <div className="relative" style={{ width: W, height: H }}>
          {/* Axes and quadrant lines */}
          <span className="absolute inset-0 rounded-[24px] border border-(--d-ink)/10" />
          <span className="absolute top-0 bottom-0 left-1/2 w-px bg-(--d-ink)/15" />
          <span className="absolute top-1/2 right-0 left-0 h-px bg-(--d-ink)/15" />
          <span className="absolute right-0 -bottom-[36px] text-[17px] text-(--d-grey)">Answers in seconds →</span>
          <span className="absolute bottom-0 -left-[40px] origin-bottom-left -rotate-90 text-[17px] whitespace-nowrap text-(--d-grey)" style={{ translate: "24px 0" }}>
            Speaks Hinglish →
          </span>
          {OPTIONS.map((o, i) => (
            <div
              key={o.name}
              className="deck-anim absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[10px] text-center"
              style={{ left: o.x * W, top: (1 - o.y) * H, "--i": i + 2 } as React.CSSProperties}
            >
              <span
                className={
                  o.on
                    ? "rounded-[16px] bg-(--d-ink) px-[26px] py-[14px] text-[26px] text-white"
                    : "rounded-[16px] bg-white px-[24px] py-[14px] text-[24px] shadow-[0_14px_30px_-16px_rgb(0_0_0/0.3)]"
                }
              >
                {o.name}
              </span>
              <span className="w-[320px] text-[15px] leading-[1.4] text-(--d-grey)">{o.rest}</span>
            </div>
          ))}
        </div>
      </In>
    </Slide>
  )
}

/** B9: the reveal as a bento: the headline on the landscape, the phone, the numbers, and the four agents to call. */
export function Reveal() {
  return (
    <Slide className="pt-[110px] pb-[100px]">
      <div className="grid h-full grid-cols-4 grid-rows-[1fr_1fr_auto] gap-[20px]">
        <In i={0} className="relative isolate col-span-2 row-span-2 flex flex-col justify-end overflow-hidden rounded-[28px] p-[48px] text-white">
          <PhotoBack src={HERO_PHOTO} sizes="900px" dim={0.5} />
          <Pill dark>The solution</Pill>
          <Headline grey="Voice and chat agents, tested before they talk to your customers." size={52} dark className="mt-[24px]">
            HoomanLabs: built for the new way.
          </Headline>
        </In>
        <In i={1} className="row-span-2 flex items-center justify-center overflow-hidden rounded-[28px] bg-(--d-graphite)">
          <div className="scale-[0.8]">
            <Phone>
              <ol className="flex flex-col gap-[16px] border-t border-(--ui-line) pt-[20px]">
                {CALL_STEPS.map((step, i) => (
                  <li key={step} className={i === 4 ? "flex items-center gap-[12px] text-[17px] text-(--ui-muted)" : "flex items-center gap-[12px] text-[17px]"}>
                    <span className={i < 4 ? "size-[8px] shrink-0 rounded-full bg-(--ui-live)" : "size-[8px] shrink-0 rounded-full bg-white/25"} />
                    {step}
                  </li>
                ))}
              </ol>
            </Phone>
          </div>
        </In>
        <In i={2}>
          <Panel className="h-full justify-between p-[36px]">
            <span className="text-[72px] leading-none tracking-[-0.04em]">1.5M</span>
            <span className="text-[20px] text-(--d-grey)">conversations a week</span>
          </Panel>
        </In>
        <In i={3} className="grid grid-cols-2 gap-[20px]">
          <Panel className="h-full justify-between p-[30px]">
            <span className="text-[60px] leading-none tracking-[-0.04em]">30+</span>
            <span className="text-[18px] text-(--d-grey)">languages</span>
          </Panel>
          <div className="flex h-full flex-col justify-between rounded-[24px] bg-(--d-ink) p-[30px] text-white">
            <span className="flex items-center gap-[10px] text-[60px] leading-none tracking-[-0.04em]">[X]</span>
            <span className="flex flex-col items-start gap-[8px] text-[18px] text-white/60">
              live customers <Need />
            </span>
          </div>
        </In>
        <In i={4} className="col-span-4 grid grid-cols-4 gap-[20px]">
          {DEMOS.map(([name, phone]) => (
            <Panel key={phone} className="flex-row items-center gap-[16px] p-[18px]">
              <Qr size={64} />
              <span className="flex min-w-0 flex-col gap-[4px]">
                <span className="flex items-center gap-[6px] text-[14px] text-(--d-grey)">
                  <PhoneIcon className="size-[13px]" /> Call it
                </span>
                <span className="text-[17px] leading-[1.25]">{name}</span>
                <span className="font-mono text-[14px] tabular-nums">{phone}</span>
              </span>
            </Panel>
          ))}
        </In>
      </div>
    </Slide>
  )
}

/** B19: the cost of waiting as a chart: savings rising past the plan's cost, the payback marked where they cross. */
function B19() {
  return (
    <Slide tone="dark">
      <Title grey="costs ₹[X]." dark size={84} center={false}>
        Every month you wait
      </Title>
      <In className="relative mt-auto">
        <svg viewBox="0 0 1680 460" className="h-[460px] w-[1680px] text-white" aria-hidden>
          <defs>
            <linearGradient id="b19-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1="0" x2="1680" y1={40 + k * 130} y2={40 + k * 130} stroke="currentColor" strokeOpacity="0.07" />
          ))}
          <path d="M0 440 C 420 420, 700 300, 900 230 S 1400 70, 1680 30 L1680 460 L0 460 Z" fill="url(#b19-fill)" />
          <path d="M0 440 C 420 420, 700 300, 900 230 S 1400 70, 1680 30" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 230 L1680 230" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="900" cy="230" r="18" fill="#2F9E57" fillOpacity="0.25" />
          <circle cx="900" cy="230" r="8" fill="#2F9E57" />
        </svg>
        {/* The three figures, pinned to the chart */}
        <div className="deck-anim absolute top-[250px] left-[20px] flex flex-col gap-[6px]" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="text-[16px] text-white/55">HoomanLabs per month</span>
          <span className="flex items-center gap-[10px] text-[40px] tracking-[-0.03em]">
            ₹[X] <Need />
          </span>
        </div>
        <div className="deck-anim absolute top-[110px] left-[940px] flex flex-col gap-[6px]" style={{ "--i": 3 } as React.CSSProperties}>
          <span className="text-[16px] text-white/55">Payback</span>
          <span className="flex items-center gap-[10px] text-[40px] tracking-[-0.03em]">
            [X] weeks <Need />
          </span>
        </div>
        <div className="deck-anim absolute top-[-20px] right-[0px] flex flex-col items-end gap-[6px]" style={{ "--i": 4 } as React.CSSProperties}>
          <span className="text-[16px] text-white/55">Your monthly loss</span>
          <span className="flex items-center gap-[10px] text-[40px] tracking-[-0.03em]">
            ₹[X] <Need />
          </span>
        </div>
      </In>
      <In i={5} className="mt-[28px] text-[17px] text-white/50">
        Billed per second. Pay-as-you-go from ₹7.5 per minute, Enterprise from ₹5 per minute.
      </In>
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
    <Slide tone="dark" className="items-center">
      <Lines dark />
      <Title grey="this week." dark size={96}>
        Start with a pilot
      </Title>
      <Process
        dark
        on={0}
        size={112}
        className="mt-[64px] w-[1200px]"
        steps={[
          { icon: PhoneIcon, title: "1 Demo call (30 min)" },
          { icon: UsersThreeIcon, title: "2 Use-case workshop" },
          { icon: RocketLaunchIcon, title: "3 Pilot on live traffic" },
        ]}
      />
      <In i={4} className="mt-auto flex w-full items-end gap-[20px]">
        {WAYS.map(([t, b]) => (
          <div key={t} className="flex w-[440px] flex-col gap-[10px] rounded-[20px] border border-white/[0.07] bg-(--d-graphite) p-[26px]">
            <span className="text-[23px]">{t}</span>
            <span className="text-[18px] leading-[1.45] text-white/55">{b}</span>
          </div>
        ))}
        <div className="ml-auto flex items-end gap-[24px]">
          <div className="flex flex-col items-end gap-[14px]">
            <Button onDark>Book a demo</Button>
            <span className="flex items-center gap-[10px] text-[16px] text-white/55">
              [Booking link] · [Sales email] <Need />
            </span>
          </div>
          <Qr size={100} dark />
        </div>
      </In>
    </Slide>
  )
}

export function storyB() {
  const s = SECTIONS_B
  return [
    <B1 key="b1" />,
    <Agenda key="agenda" sections={s} />,
    <Divider key="s1" section={s[0]} />,
    <B2 key="b2" />,
    <B3 key="b3" />,
    <Divider key="s2" section={s[1]} />,
    <B4 key="b4" />,
    <B5 key="b5" />,
    <B6 key="b6" />,
    <Divider key="s3" section={s[2]} />,
    <B7 key="b7" />,
    <B8 key="b8" />,
    <Divider key="s4" section={s[3]} />,
    <Reveal key="b9" />,
    <P1 key="b10" eyebrow="The new way · 01 Seconds" />,
    <P2 key="b11" eyebrow="The new way · 02 Language" />,
    <P3 key="b12" eyebrow="The new way · 03 Done on the call" />,
    <P4 key="b13" eyebrow="The new way · 04 Safe for your brand" />,
    <P5 key="b14" eyebrow="The new way · 05 Compliant" />,
    <Divider key="s5" section={s[4]} />,
    <C1 key="b15" />,
    <C2 key="b16" />,
    <C3 key="b17" />,
    <C4 key="b18" />,
    <Divider key="s6" section={s[5]} />,
    <B19 key="b19" />,
    <B20 key="b20" />,
  ]
}
