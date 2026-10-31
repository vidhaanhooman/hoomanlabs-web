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
  RocketLaunchIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  TranslateIcon,
  UsersThreeIcon,
  WaveformIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr"

import {
  Button,
  Card,
  Contours,
  CoverLogo,
  Eyebrow,
  HERO_PHOTO,
  Headline,
  IconTile,
  Live,
  Need,
  Process,
  Qr,
  Slide,
  StepLine,
  Sub,
  Tag,
  Trend,
  Arcs,
  Bubble,
} from "@/components/sales-deck/kit"
import { C1, C2, C3, C4, C5, P1, P2, P3, P4, P5, Player } from "@/components/sales-deck/shared-slides"
import { Agenda, Divider, SECTIONS_A } from "@/components/sales-deck/sections"
import { DemoChips, Floating, Meta } from "@/components/sales-deck/story-b"
import { cn } from "@/lib/utils"

/**
 * Story A, Strategic narrative (19 slides), from the content doc "HoomanLabs
 * Sales Deck: Slide-by-Slide Content". On-slide copy is the doc's, word for
 * word; [X] gaps carry a "Data needed" label.
 */

const T = 19

function A1() {
  return (
    <Slide n={1} total={T} tone="photo" photo={HERO_PHOTO} footer={false} className="pb-[96px]">
      <Floating
        tiles={[
          { icon: PhoneCallIcon, x: 1330, y: 230, r: -8, size: 132, on: true },
          { icon: WaveformIcon, x: 1580, y: 380, r: 9 },
          { icon: TranslateIcon, x: 1250, y: 470, r: 6, size: 104 },
        ]}
      />
      <CoverLogo />
      <div className="mt-auto flex items-end justify-between gap-[64px]">
        <div className="flex flex-col gap-[32px]">
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
    <Slide n={2} total={T} className="flex-row gap-[96px]">
      <div className="flex w-1/2 flex-col justify-center">
        <Eyebrow>The shift</Eyebrow>
        <Headline grey="And AI voice can finally give it." className="mt-[24px]">
          Customers expect an answer in seconds, in their own language.
        </Headline>
        <Need className="mt-[28px] w-fit" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[20px]">
        <Card className="h-[300px] justify-between p-[44px]">
          <span className="flex items-center justify-between font-mono text-[18px] text-(--d-grey)">
            What customers expect
            <IconTile icon={UsersThreeIcon} size={64} look="light" />
          </span>
          <span className="text-[40px] leading-[1.2] tracking-[-0.02em]">An answer in seconds, in their own language</span>
        </Card>
        <Card look="dark" className="isolate h-[300px] justify-between overflow-hidden border-0 bg-(--d-dark) p-[44px]">
          <Arcs corner="br" rings={4} thickness={18} gap={22} inner={50} className="right-0 bottom-0 -z-10 text-white/[0.07]" />
          <span className="flex items-center justify-between font-mono text-[18px] text-white/55">
            <span className="flex items-center gap-[12px]">
              <Live /> What AI can now do
            </span>
            <IconTile icon={WaveformIcon} size={64} />
          </span>
          <span className="text-[40px] leading-[1.2] tracking-[-0.02em]">1.5M conversations a week, handled on HoomanLabs in 30+ languages.</span>
        </Card>
      </div>
    </Slide>
  )
}

function A3() {
  const side = (dark: boolean, title: string, lines: string[], big: string, share: number, caption: string) => (
    <Card look={dark ? "dark" : "grey"} className={cn("h-[580px] p-[52px]", dark && "border-0 bg-(--d-dark)")}>
      <span className={cn("font-mono text-[20px]", dark ? "text-white/55" : "text-(--d-grey)")}>{title}</span>
      <ul className="mt-[28px] flex flex-col">
        {lines.map((l) => (
          <li key={l} className={cn("border-b py-[14px] text-[28px] leading-[1.35]", dark ? "border-white/10" : "border-(--d-line)")}>
            {l}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-[10px]">
        <span className="flex items-end justify-between">
          <span className="text-[120px] leading-none tracking-[-0.04em]">{big}</span>
          <Bubble value={share} box={150} dark={dark} className={dark ? "text-white" : "text-(--d-ink)"} />
        </span>
        <span className={cn("text-[24px]", dark ? "text-white/60" : "text-(--d-grey)")}>{caption}</span>
      </div>
    </Card>
  )
  return (
    <Slide n={3} total={T}>
      <Headline grey="Others are still saying ‘press 1’.">Some businesses are pulling ahead.</Headline>
      <div className="mt-auto grid grid-cols-2 gap-[24px]">
        {side(
          true,
          "Still on the old way",
          ["IVR menus and long queues", "Call centres that close at 7pm", "Leads called back hours later"],
          "50%",
          0.5,
          "of calls missed at SaffronStays, before.",
        )}
        {side(
          false,
          "Already ahead",
          ["Every call answered in under a second", "24/7, in the caller’s language", "Every new lead called within seconds"],
          "2%",
          0.02,
          "of calls missed at SaffronStays, after.",
        )}
      </div>
    </Slide>
  )
}

function A4() {
  const cards = [
    ["01", <Trend key="r" kind="rise" width={300} height={80} />, "Hire more agents", "Weeks to hire and train, and still can’t flex for festive peaks or late-night calls."],
    ["02", <StepLine key="s" width={300} height={80} />, "Add IVR menus", "Callers press buttons, wait, then hang up before anyone helps them."],
    ["03", <Trend key="f" kind="flat" width={300} height={80} />, "Plug in a generic bot", "Built for US English. Struggles with Hinglish and Indian phone networks."],
  ] as const
  return (
    <Slide n={4} total={T}>
      <Headline grey="The old fixes can’t keep up.">More agents, more menus, more bots.</Headline>
      <div className="mt-auto grid grid-cols-3 gap-[24px]">
        {cards.map(([n, art, title, body]) => (
          <Card key={n} className="gap-[20px] p-[40px]">
            <span className="absolute top-[24px] right-[32px] text-[96px] leading-[0.8] tracking-[-0.05em] text-(--d-ink)/15 tabular-nums">{n}</span>
            <span className="my-[12px] text-(--d-ink)">{art}</span>
            <span className="text-[34px] leading-[1.15]">{title}</span>
            <span className="text-[24px] leading-[1.45] text-(--d-grey)">{body}</span>
          </Card>
        ))}
      </div>
    </Slide>
  )
}

function A5() {
  return (
    <Slide n={5} total={T} tone="photo" photo={HERO_PHOTO}>
      <Floating
        tiles={[
          { icon: PhoneCallIcon, x: 1360, y: 150, r: -7, size: 120 },
          { icon: ArrowsClockwiseIcon, x: 1600, y: 300, r: 8, size: 120 },
          { icon: DatabaseIcon, x: 1400, y: 430, r: 4, size: 120, on: true },
        ]}
      />
      <div className="mt-auto flex flex-col gap-[36px]">
        <h2 className="text-[104px] leading-[1.06] font-normal tracking-[-0.03em]">
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

/** A6: the five things scattered round the headline as embossed tiles (each with its title and line). */
const FIVE = [
  { icon: LightningIcon, title: "Answer instantly", body: "No queues, no IVR, no missed calls at peak.", x: 150, y: 150, size: 132 },
  { icon: TranslateIcon, title: "Speak their language", body: "Hindi, English, Hinglish and 30+ more.", x: 1440, y: 130, size: 112 },
  { icon: PlugIcon, title: "Act on your systems", body: "Look up orders, take payments, update the CRM.", x: 1500, y: 560, size: 140 },
  { icon: SealCheckIcon, title: "Never embarrass your brand", body: "Tested before launch, with a person one step away.", x: 820, y: 690, size: 104 },
  { icon: ShieldCheckIcon, title: "Stay compliant", body: "DPDP, TRAI DLT and RBI calling hours, built in.", x: 190, y: 600, size: 120 },
]

function A6() {
  return (
    <Slide n={6} total={T} tone="grey" className="items-center justify-center text-center">
      <Contours />
      {FIVE.map((f, i) => (
        <div
          key={f.title}
          className="deck-anim absolute flex w-[320px] flex-col items-center gap-[16px] text-center"
          style={{ left: f.x, top: f.y, "--i": i + 2 } as React.CSSProperties}
        >
          <IconTile icon={f.icon} size={f.size} look="soft" />
          <span className="mt-[6px] text-[26px] leading-[1.2]">{f.title}</span>
          <span className="text-[18px] leading-[1.4] text-(--d-grey)">{f.body}</span>
        </div>
      ))}
      <Headline grey="five things." block={false} size={96} className="max-w-[900px]">
        Getting there takes
      </Headline>
      <p className="deck-anim mt-[32px] font-mono text-[20px] text-(--d-grey)" style={{ "--i": 8 } as React.CSSProperties}>
        Each of the next five slides answers one of these.
      </p>
    </Slide>
  )
}

function A7() {
  return (
    <Slide n={7} total={T} tone="dark">
      <Arcs corner="bl" rings={6} className="bottom-0 left-0 -z-10 text-white/[0.045]" />
      <div className="flex gap-[96px]">
        <div className="flex w-[40%] shrink-0 flex-col justify-center">
          <Headline grey="Call it." size={84} dark>
            Don’t take our word for it.
          </Headline>
          <Sub dark className="mt-[32px]">
            Four live agents you can call right now, from any phone.
          </Sub>
        </div>
        <Player className="flex-1" />
      </div>
      <DemoChips className="mt-auto" />
    </Slide>
  )
}

function A18() {
  return (
    <Slide n={18} total={T}>
      <Headline grey="Not quarters." block={false}>
        Live in days.
      </Headline>
      <Process
        className="mt-[56px]"
        on={0}
        size={96}
        steps={[
          { n: "01", icon: MagnifyingGlassIcon, title: "Discovery", body: "Map your call flows and pick the first use case." },
          { n: "02", icon: WrenchIcon, title: "Build", body: "Set up the agent, voice, knowledge and integrations." },
          { n: "03", icon: FlaskIcon, title: "Simulate", body: "Test real scenarios before any customer hears it." },
          { n: "04", icon: BroadcastIcon, title: "Pilot", body: "Go live on a slice of traffic and measure." },
          { n: "05", icon: ChartLineUpIcon, title: "Scale", body: "Roll out to all calls, languages and teams." },
        ]}
      />
      <div className="mt-auto grid grid-cols-3 rounded-[8px] bg-(--d-dark) text-white">
        {[
          ["Pay-as-you-go", "₹7.5–10 per minute"],
          ["Enterprise", "₹5–6.75 per minute"],
          ["Billing", "per second, no seats"],
        ].map(([k, v], i) => (
          <div key={k} className={cn("flex flex-col gap-[10px] p-[40px]", i > 0 && "border-l border-white/10")}>
            <span className="font-mono text-[18px] text-white/55">{k}</span>
            <span className="text-[40px] leading-[1.15] tracking-[-0.02em]">{v}</span>
          </div>
        ))}
      </div>
    </Slide>
  )
}

function A19() {
  return (
    <Slide n={19} total={T} tone="photo" photo={HERO_PHOTO}>
      <Headline grey="find you on?" size={104} dark>
        Which side will your customers
      </Headline>
      <div className="mt-auto flex items-end justify-between gap-[48px]">
        <ul className="flex gap-[14px]">
          {(
            [
              [PhoneIcon, "1 Demo call"],
              [UsersThreeIcon, "2 Use-case workshop"],
              [RocketLaunchIcon, "3 Pilot this month"],
            ] as const
          ).map(([icon, s], i) => (
            <li key={s}>
              <Tag icon={icon} dark={i > 0} tilt={[-3, 2, -2][i]}>
                {s}
              </Tag>
            </li>
          ))}
        </ul>
        <div className="flex items-end gap-[24px]">
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

export function storyA() {
  return [
    <A1 key={1} />,
    <Agenda key="agenda" sections={SECTIONS_A} />,
    <Divider key="s1" section={SECTIONS_A[0]} sections={SECTIONS_A} />,
    <A2 key={2} />,
    <A3 key={3} />,
    <A4 key={4} />,
    <Divider key="s2" section={SECTIONS_A[1]} sections={SECTIONS_A} />,
    <A5 key={5} />,
    <A6 key={6} />,
    <A7 key={7} />,
    <Divider key="s3" section={SECTIONS_A[2]} sections={SECTIONS_A} />,
    <P1 key={8} n={8} total={T} dots={1} eyebrow="Gift 01 · Answer instantly" />,
    <P2 key={9} n={9} total={T} dots={2} eyebrow="Gift 02 · Speak their language" />,
    <P3 key={10} n={10} total={T} dots={3} eyebrow="Gift 03 · Act on your systems" />,
    <P4 key={11} n={11} total={T} dots={4} eyebrow="Gift 04 · Never embarrass your brand" />,
    <P5 key={12} n={12} total={T} dots={5} eyebrow="Gift 05 · Stay compliant" />,
    <Divider key="s4" section={SECTIONS_A[3]} sections={SECTIONS_A} />,
    <C1 key={13} n={13} total={T} headline="GIVA is already on the winning side." />,
    <C2 key={14} n={14} total={T} />,
    <C3 key={15} n={15} total={T} />,
    <C4 key={16} n={16} total={T} />,
    <C5 key={17} n={17} total={T} />,
    <Divider key="s5" section={SECTIONS_A[4]} sections={SECTIONS_A} />,
    <A18 key={18} />,
    <A19 key={19} />,
  ]
}
