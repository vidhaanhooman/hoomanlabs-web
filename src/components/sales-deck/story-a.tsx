import {
  ArrowsClockwiseIcon,
  BroadcastIcon,
  ChartLineUpIcon,
  DatabaseIcon,
  FlaskIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  PhoneCallIcon,
  PhoneIcon,
  PlugIcon,
  RobotIcon,
  RocketLaunchIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  SquaresFourIcon,
  TranslateIcon,
  UsersThreeIcon,
  WaveformIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr"

import { At, Button, Cursor, HERO_PHOTO, Headline, In, Lines, Live, Need, Panel, Phone, Pill, Qr, Slide, Sub, Tag, Tile, Title, Wall } from "@/components/sales-deck/kit"
import { Agenda, Divider, SECTIONS_A } from "@/components/sales-deck/sections"
import { C1, C2, C3, C4, C5, P1, P2, P3, P4, P5 } from "@/components/sales-deck/shared-slides"
import { DemoRow, Meta } from "@/components/sales-deck/story-b"
import { cn } from "@/lib/utils"

/**
 * Story A, Strategic narrative, from the content doc "HoomanLabs Sales Deck:
 * Slide-by-Slide Content", with an agenda and section dividers. On-slide copy
 * is the doc's, word for word; [X] gaps carry a "Data needed" label.
 */

function A1() {
  return (
    <Slide tone="photo" photo={HERO_PHOTO}>
      <At x={1310} y={230} r={-8}>
        <Tile icon={PhoneCallIcon} size={140} />
      </At>
      <At x={1580} y={400} r={9} i={3}>
        <Tile icon={WaveformIcon} size={120} />
      </At>
      <At x={1230} y={500} r={6} i={4}>
        <Tile icon={TranslateIcon} size={104} />
      </At>
      <div className="deck-anim mt-auto flex items-end justify-between gap-[80px]">
        <div className="flex flex-col items-start gap-[32px]">
          <Headline grey="just changed." size={128} dark>
            The phone call
          </Headline>
          <Sub dark>AI agents that talk, follow up and finish the job.</Sub>
        </div>
        <Meta />
      </div>
    </Slide>
  )
}

function A2() {
  return (
    <Slide className="flex-row items-center gap-[80px]">
      <div className="flex w-[820px] shrink-0 flex-col items-start gap-[24px]">
        <Title pill="The shift" grey="And AI voice can finally give it." size={60} center={false}>
          Customers expect an answer in seconds, in their own language.
        </Title>
        <Need />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[20px]">
        <In>
          <Panel className="h-[300px] justify-between p-[44px]">
            <span className="flex items-center justify-between">
              <Pill className="border-(--d-line)">What customers expect</Pill>
              <Tile icon={UsersThreeIcon} size={64} look="soft" />
            </span>
            <span className="text-[34px] leading-[1.2] tracking-[-0.02em]">An answer in seconds, in their own language</span>
          </Panel>
        </In>
        <In i={2}>
          <div className="flex h-[300px] flex-col justify-between rounded-[24px] bg-(--d-ink) p-[44px] text-white">
            <span className="flex items-center justify-between">
              <Pill dark className="gap-[10px]">
                <Live /> What AI can now do
              </Pill>
              <Tile icon={WaveformIcon} size={64} dark />
            </span>
            <span className="text-[34px] leading-[1.2] tracking-[-0.02em]">1.5M conversations a week, handled on HoomanLabs in 30+ languages.</span>
          </div>
        </In>
      </div>
    </Slide>
  )
}

/** A3: a split screen under the headline, the old way dark on the left, the side that's ahead light on the right. */
function A3() {
  const half = (dark: boolean, title: string, lines: string[], big: string, caption: string) => (
    <div className={cn("flex h-full flex-col px-[120px] pt-[64px] pb-[110px]", dark ? "bg-(--d-ink) text-white" : "bg-white")}>
      <Pill dark={dark} className={dark ? "" : "border-(--d-line)"}>
        {title}
      </Pill>
      <ul className="mt-[32px] flex flex-col gap-[10px] text-[25px] leading-[1.35]">
        {lines.map((l) => (
          <li key={l} className={dark ? "text-white/80" : ""}>
            {l}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end gap-[24px]">
        <span className="text-[180px] leading-[0.78] tracking-[-0.06em]">{big}</span>
        <span className={cn("mb-[12px] max-w-[300px] text-[21px] leading-[1.35]", dark ? "text-white/55" : "text-(--d-grey)")}>{caption}</span>
      </div>
    </div>
  )
  return (
    <Slide className="p-0">
      <div className="px-[120px] pt-[120px] pb-[64px]">
        <Title grey="Others are still saying ‘press 1’." size={72} center={false}>
          Some businesses are pulling ahead.
        </Title>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2">
        <In>
          {half(
            true,
            "Still on the old way",
            ["IVR menus and long queues", "Call centres that close at 7pm", "Leads called back hours later"],
            "50%",
            "of calls missed at SaffronStays, before.",
          )}
        </In>
        <In i={2}>
          {half(
            false,
            "Already ahead",
            ["Every call answered in under a second", "24/7, in the caller’s language", "Every new lead called within seconds"],
            "2%",
            "of calls missed at SaffronStays, after.",
          )}
        </In>
      </div>
    </Slide>
  )
}

/** A4: the three old fixes scattered round the headline as embossed tiles. */
function A4() {
  const items = [
    { icon: UsersThreeIcon, title: "Hire more agents", body: "Weeks to hire and train, and still can’t flex for festive peaks or late-night calls.", x: 170, y: 560 },
    { icon: SquaresFourIcon, title: "Add IVR menus", body: "Callers press buttons, wait, then hang up before anyone helps them.", x: 1420, y: 520 },
    { icon: RobotIcon, title: "Plug in a generic bot", body: "Built for US English. Struggles with Hinglish and Indian phone networks.", x: 800, y: 660 },
  ]
  return (
    <Slide className="items-center">
      <Lines />
      <Title grey="The old fixes can’t keep up.">More agents, more menus, more bots.</Title>
      {items.map((it, i) => (
        <At key={it.title} x={it.x} y={it.y} i={i + 2}>
          <div className="flex w-[330px] flex-col items-center gap-[14px] text-center">
            <Tile icon={it.icon} look="soft" size={112} />
            <span className="mt-[8px] text-[28px] leading-[1.2]">{it.title}</span>
            <span className="text-[18px] leading-[1.45] text-(--d-grey)">{it.body}</span>
          </div>
        </At>
      ))}
    </Slide>
  )
}

function A5() {
  return (
    <Slide tone="photo" photo={HERO_PHOTO}>
      <At x={1380} y={170} r={-7}>
        <Tile icon={PhoneCallIcon} size={124} />
      </At>
      <At x={1620} y={330} r={8} i={3}>
        <Tile icon={ArrowsClockwiseIcon} size={124} />
      </At>
      <At x={1420} y={480} r={4} i={4}>
        <Tile icon={DatabaseIcon} size={124} look="on" dark />
      </At>
      <div className="deck-anim mt-auto flex flex-col gap-[36px]">
        <h2 className="text-[104px] leading-[1.04] font-normal tracking-[-0.035em]">
          Every call answered.
          <br />
          Every follow-up done.
          <br />
          <span className="text-white/50">Every outcome in your CRM.</span>
        </h2>
        <Sub dark>This is where the winning side ends up.</Sub>
      </div>
    </Slide>
  )
}

/** A6: the five things scattered round the headline as embossed tiles, with collaborators' cursors (Mark OS's review slide). */
const FIVE = [
  { icon: LightningIcon, title: "Answer instantly", body: "No queues, no IVR, no missed calls at peak.", x: 150, y: 150, size: 128 },
  { icon: TranslateIcon, title: "Speak their language", body: "Hindi, English, Hinglish and 30+ more.", x: 1440, y: 130, size: 108 },
  { icon: PlugIcon, title: "Act on your systems", body: "Look up orders, take payments, update the CRM.", x: 1490, y: 580, size: 136 },
  { icon: SealCheckIcon, title: "Never embarrass your brand", body: "Tested before launch, with a person one step away.", x: 800, y: 700, size: 100 },
  { icon: ShieldCheckIcon, title: "Stay compliant", body: "DPDP, TRAI DLT and RBI calling hours, built in.", x: 180, y: 610, size: 116 },
]

function A6() {
  return (
    <Slide className="items-center justify-center text-center">
      <Lines />
      {FIVE.map((f, i) => (
        <At key={f.title} x={f.x} y={f.y} i={i + 2}>
          <div className="flex w-[320px] flex-col items-center gap-[14px]">
            <Tile icon={f.icon} size={f.size} look="soft" />
            <span className="mt-[6px] text-[24px] leading-[1.2]">{f.title}</span>
            <span className="text-[17px] leading-[1.4] text-(--d-grey)">{f.body}</span>
          </div>
        </At>
      ))}
      <Cursor x={330} y={260} i={7} />
      <Cursor x={1610} y={700} i={8} />
      <Title grey="five things." block={false} size={92} className="-mt-[60px] max-w-[880px]">
        Getting there takes
      </Title>
      <In i={8} className="mt-[28px] text-[19px] text-(--d-grey)">
        Each of the next five slides answers one of these.
      </In>
    </Slide>
  )
}

function A7() {
  return (
    <Slide tone="dark" className="flex-row gap-[120px]">
      <Lines dark />
      <div className="flex min-w-0 flex-1 flex-col gap-[32px]">
        <Title grey="Call it." dark size={80} center={false}>
          Don’t take our word for it.
        </Title>
        <Sub dark>Four live agents you can call right now, from any phone.</Sub>
        <DemoRow className="mt-auto" />
      </div>
      <In i={1} className="-my-[40px] self-center">
        <Phone>
          <div className="flex flex-col gap-[18px] border-t border-(--ui-line) pt-[20px] text-[17px] leading-[1.45]">
            <p className="flex flex-col gap-[4px]">
              <span className="font-mono text-[13px] text-(--ui-muted)">Caller</span>
              Mera order damaged aaya hai. Can you replace it?
            </p>
            <p className="flex flex-col gap-[4px]">
              <span className="font-mono text-[13px] text-(--ui-muted)">Agent</span>
              Bilkul. Aapka order number bata dijiye, main abhi replacement book kar deti hoon.
            </p>
          </div>
        </Phone>
      </In>
    </Slide>
  )
}

/** A18: the path as a vertical timeline on the right; the headline and the pricing on the left. */
function A18() {
  const steps = [
    { icon: MagnifyingGlassIcon, title: "Discovery", body: "Map your call flows and pick the first use case." },
    { icon: WrenchIcon, title: "Build", body: "Set up the agent, voice, knowledge and integrations." },
    { icon: FlaskIcon, title: "Simulate", body: "Test real scenarios before any customer hears it." },
    { icon: BroadcastIcon, title: "Pilot", body: "Go live on a slice of traffic and measure." },
    { icon: ChartLineUpIcon, title: "Scale", body: "Roll out to all calls, languages and teams." },
  ]
  return (
    <Slide className="flex-row gap-[120px]">
      <div className="flex w-[640px] shrink-0 flex-col">
        <Title grey="Not quarters." size={96} center={false}>
          Live in days.
        </Title>
        <In i={6} className="mt-auto flex flex-col overflow-hidden rounded-[24px] bg-(--d-ink) text-white">
          {[
            ["Pay-as-you-go", "₹7.5–10 per minute"],
            ["Enterprise", "₹5–6.75 per minute"],
            ["Billing", "per second, no seats"],
          ].map(([k, v], i) => (
            <div key={k} className={cn("flex items-baseline justify-between gap-[24px] px-[36px] py-[26px]", i > 0 && "border-t border-white/10")}>
              <span className="text-[17px] text-white/55">{k}</span>
              <span className="text-[32px] tracking-[-0.02em]">{v}</span>
            </div>
          ))}
        </In>
      </div>
      <ol className="flex min-w-0 flex-1 flex-col justify-between">
        {steps.map((st, i) => (
          <li key={st.title} className="deck-anim relative flex items-center gap-[32px]" style={{ "--i": i + 1 } as React.CSSProperties}>
            {i < steps.length - 1 && <span className="absolute top-[88px] left-[43px] h-[72px] w-px bg-(--d-ink)/15" />}
            <Tile icon={st.icon} size={88} look={i === 0 ? "on" : "glossy"} />
            <span className="font-mono text-[17px] text-(--d-grey)">{String(i + 1).padStart(2, "0")}</span>
            <span className="w-[220px] text-[34px] leading-[1.15] tracking-[-0.015em]">{st.title}</span>
            <span className="flex-1 text-[21px] leading-[1.45] text-(--d-grey)">{st.body}</span>
          </li>
        ))}
      </ol>
    </Slide>
  )
}

function A19() {
  return (
    <Slide tone="dark" className="items-center justify-center text-center">
      <Wall dark />
      <Headline grey="find you on?" size={104} dark className="deck-anim">
        Which side will your customers
      </Headline>
      <In i={2} className="mt-[56px] flex gap-[16px]">
        {(
          [
            [PhoneIcon, "1 Demo call", -3],
            [UsersThreeIcon, "2 Use-case workshop", 2],
            [RocketLaunchIcon, "3 Pilot this month", -2],
          ] as const
        ).map(([icon, label, tilt]) => (
          <Tag key={label} icon={icon} dark tilt={tilt}>
            {label}
          </Tag>
        ))}
      </In>
      <In i={4} className="mt-[56px] flex items-center gap-[24px]">
        <Button onDark>Book a demo</Button>
        <Qr size={88} dark />
        <span className="flex items-center gap-[10px] text-[16px] text-white/55">
          [Booking link] · [Sales email] <Need />
        </span>
      </In>
    </Slide>
  )
}

export function storyA() {
  const s = SECTIONS_A
  return [
    <A1 key="a1" />,
    <Agenda key="agenda" sections={s} />,
    <Divider key="s1" section={s[0]} />,
    <A2 key="a2" />,
    <A3 key="a3" />,
    <A4 key="a4" />,
    <Divider key="s2" section={s[1]} />,
    <A5 key="a5" />,
    <A6 key="a6" />,
    <A7 key="a7" />,
    <Divider key="s3" section={s[2]} />,
    <P1 key="a8" dots={1} eyebrow="Gift 01 · Answer instantly" />,
    <P2 key="a9" dots={2} eyebrow="Gift 02 · Speak their language" />,
    <P3 key="a10" dots={3} eyebrow="Gift 03 · Act on your systems" />,
    <P4 key="a11" dots={4} eyebrow="Gift 04 · Never embarrass your brand" />,
    <P5 key="a12" dots={5} eyebrow="Gift 05 · Stay compliant" />,
    <Divider key="s4" section={s[3]} />,
    <C1 key="a13" headline="GIVA is already on the winning side." />,
    <C2 key="a14" />,
    <C3 key="a15" />,
    <C4 key="a16" />,
    <C5 key="a17" />,
    <Divider key="s5" section={s[4]} />,
    <A18 key="a18" />,
    <A19 key="a19" />,
  ]
}
