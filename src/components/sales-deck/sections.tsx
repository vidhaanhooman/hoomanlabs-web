import { At, Mark, Pill, Slide, Tag, Wall } from "@/components/sales-deck/kit"

/**
 * Section structure for the decks: the story's sections (from the content
 * doc), an agenda slide and a divider that opens each section.
 */

export type Section = { n: string; title: string; items: string[] }

/** Story B's sections, with the doc's slide titles in each. */
export const SECTIONS_B: Section[] = [
  { n: "01", title: "Your world", items: ["Sound familiar?", "The reframe"] },
  { n: "02", title: "The cost", items: ["The numbers", "What it costs", "Nobody called"] },
  { n: "03", title: "A new way", items: ["The new standard", "Why the usual fixes fail"] },
  {
    n: "04",
    title: "The solution",
    items: ["Meet HoomanLabs", "It answers in seconds", "It speaks their language", "It does the work", "Tested, and hands over", "Compliant by default"],
  },
  { n: "05", title: "Proof", items: ["GIVA", "SaffronStays", "Holiday Tribe", "Quess"] },
  { n: "06", title: "Close", items: ["The cost of waiting", "Start with a pilot"] },
]

/** Story A's sections, with the doc's slide titles in each. */
export const SECTIONS_A: Section[] = [
  { n: "01", title: "The shift", items: ["The shift", "Winners and losers", "The old way"] },
  { n: "02", title: "Promised land", items: ["The promised land", "What it takes", "Live demo"] },
  { n: "03", title: "Five gifts", items: ["Answer instantly", "Speak their language", "Act on your systems", "Never embarrass your brand", "Stay compliant"] },
  { n: "04", title: "Proof", items: ["GIVA", "SaffronStays", "Holiday Tribe", "Quess", "Built on HoomanLabs"] },
  { n: "05", title: "Your path", items: ["Live in days", "The ask"] },
]

/** The agenda's geometry (slide pixels): the mark at the centre, a column of sections either side. */
const HUB = { cx: 960, cy: 560, tile: 200 }
const CARD = { w: 440, h: 112, leftX: 260, rightX: 1220 }

/**
 * The agenda as a hub: the HoomanLabs mark embossed at the centre, the
 * sections in two even columns either side, each joined to the mark by a thin
 * line. Each card gives the section's number, name and how many slides it holds.
 */
export function Agenda({ sections }: { sections: Section[] }) {
  const left = sections.slice(0, Math.ceil(sections.length / 2))
  const right = sections.slice(left.length)
  const rowsY = (n: number) => Array.from({ length: n }, (_, i) => HUB.cy + (i - (n - 1) / 2) * 190)
  const place = [
    ...left.map((s, i) => ({ s, x: CARD.leftX, y: rowsY(left.length)[i], side: "left" as const })),
    ...right.map((s, i) => ({ s, x: CARD.rightX, y: rowsY(right.length)[i], side: "right" as const })),
  ]
  return (
    <Slide className="items-center">
      <Pill>Contents</Pill>
      {/* Connectors from each card to the mark */}
      <svg aria-hidden viewBox="0 0 1920 1080" className="deck-anim pointer-events-none absolute inset-0 size-full" style={{ "--i": 1 } as React.CSSProperties} fill="none">
        {place.map(({ s, x, y, side }) => {
          const from = side === "left" ? x + CARD.w : x
          const to = side === "left" ? HUB.cx - HUB.tile / 2 : HUB.cx + HUB.tile / 2
          const mid = (from + to) / 2
          return (
            <g key={s.n}>
              <path d={`M${from} ${y} C ${mid} ${y}, ${mid} ${HUB.cy}, ${to} ${HUB.cy}`} stroke="rgb(0 0 0 / 0.14)" strokeWidth="1.5" />
              <circle cx={from} cy={y} r="4" fill="rgb(0 0 0 / 0.3)" />
            </g>
          )
        })}
      </svg>
      {/* The mark, embossed in the surface */}
      <div
        className="deck-anim absolute grid place-items-center rounded-[56px] border border-white/70 bg-[linear-gradient(145deg,#F4F4F4,#E3E3E3)] text-(--d-ink) shadow-[-12px_-12px_26px_rgb(255_255_255/0.9),16px_20px_40px_rgb(0_0_0/0.12)]"
        style={{ left: HUB.cx - HUB.tile / 2, top: HUB.cy - HUB.tile / 2, width: HUB.tile, height: HUB.tile }}
      >
        <Mark className="h-[86px] w-auto" />
      </div>
      {place.map(({ s, x, y }, i) => (
        <div
          key={s.n}
          className="deck-anim absolute flex items-center gap-[22px] rounded-[20px] bg-white px-[26px] shadow-[0_2px_0_rgb(0_0_0/0.03),0_20px_40px_-22px_rgb(0_0_0/0.28)]"
          style={{ left: x, top: y - CARD.h / 2, width: CARD.w, height: CARD.h, "--i": i + 2 } as React.CSSProperties}
        >
          <span className="grid size-[56px] shrink-0 place-items-center rounded-[14px] bg-(--d-ink) font-mono text-[18px] text-white">{s.n}</span>
          <span className="flex min-w-0 flex-col gap-[4px]">
            <span className="text-[28px] leading-[1.1] tracking-[-0.015em]">{s.title}</span>
            <span className="text-[16px] text-(--d-grey)">
              {s.items.length} {s.items.length === 1 ? "slide" : "slides"}
            </span>
          </span>
        </div>
      ))}
    </Slide>
  )
}

/** Where a divider's slide tags float among the pills, away from the centre. */
const AROUND = [
  { x: 210, y: 190, r: -4 },
  { x: 1380, y: 170, r: 3 },
  { x: 160, y: 800, r: 3 },
  { x: 1400, y: 820, r: -3 },
  { x: 760, y: 880, r: 2 },
  { x: 900, y: 130, r: -2 },
]

/** A section divider: dark, a wall of pressed-in pills, the number and name centred, its slides as tags among the pills. */
export function Divider({ section }: { section: Section; sections?: Section[] }) {
  return (
    <Slide tone="dark" className="items-center justify-center text-center">
      <Wall dark />
      <Pill dark>{section.n}</Pill>
      <h2 className="deck-anim mt-[32px] text-[150px] leading-[0.95] font-normal tracking-[-0.045em]" style={{ "--i": 1 } as React.CSSProperties}>
        {section.title}
      </h2>
      {section.items.map((it, i) => (
        <At key={it} x={AROUND[i].x} y={AROUND[i].y} r={AROUND[i].r} i={i + 2}>
          <Tag dark>{it}</Tag>
        </At>
      ))}
    </Slide>
  )
}
