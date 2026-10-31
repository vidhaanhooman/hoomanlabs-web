import { Arcs, Eyebrow, Slide } from "@/components/sales-deck/kit"
import { cn } from "@/lib/utils"

/**
 * Section structure for the decks: the story's sections (from the content
 * doc), an agenda slide that lays them out as a bento grid, and a divider
 * slide that opens each section with its number, its name and the slides in
 * it.
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

/**
 * The agenda: the sections as a bento grid. The first tile is the large dark
 * one; the rest sit round it, each with its number, name and slides.
 */
export function Agenda({ sections }: { sections: Section[] }) {
  // Two rows: one large tile (two columns, both rows), the rest filling in; six sections need five columns, five need four
  const six = sections.length === 6
  const spans = six ? ["col-span-2 row-span-2", "", "", "", "", "col-span-2"] : ["col-span-2 row-span-2", "", "", "", ""]
  return (
    <Slide tone="grey">
      <Eyebrow>Contents</Eyebrow>
      <div className={cn("mt-[40px] grid flex-1 grid-rows-2 gap-[20px]", six ? "grid-cols-5" : "grid-cols-4")}>
        {sections.map((s, i) => {
          const big = i === 0
          return (
            <div
              key={s.n}
              className={cn(
                "deck-anim relative isolate flex flex-col justify-between overflow-hidden rounded-[14px] border p-[32px]",
                big ? "border-transparent bg-(--d-dark) text-white" : "border-(--d-line) bg-white",
                spans[i] ?? "",
              )}
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              {big && <Arcs corner="br" rings={5} thickness={26} gap={30} inner={70} className="right-0 bottom-0 -z-10 text-white/[0.07]" />}
              <span className={cn("leading-[0.8] tracking-[-0.05em] tabular-nums", big ? "text-[200px] text-white" : "text-[88px] text-(--d-ink)/15")}>{s.n}</span>
              <span className="flex flex-col gap-[12px]">
                <span className={cn("leading-[1.1] tracking-[-0.02em]", big ? "text-[64px]" : "text-[34px]")}>{s.title}</span>
                <span className={cn("font-mono leading-[1.5]", big ? "max-w-[620px] text-[18px] text-white/55" : "text-[15px] text-(--d-grey)")}>{s.items.join(" · ")}</span>
              </span>
            </div>
          )
        })}
      </div>
    </Slide>
  )
}

/**
 * A section divider: the number set huge, the section's name, and its slides
 * listed down the right like a table of contents (the current section's
 * place shown by the row of all sections along the top).
 */
export function Divider({ section, sections }: { section: Section; sections: Section[] }) {
  return (
    <Slide tone="dark" className="pt-[96px]">
      <Arcs corner="br" rings={7} thickness={34} gap={40} inner={120} className="right-0 bottom-0 -z-10 text-white/[0.045]" />
      {/* Where this section sits among the rest */}
      <ol className="flex gap-[10px] font-mono text-[16px]">
        {sections.map((s) => (
          <li key={s.n} className={cn("flex flex-1 flex-col gap-[10px]", s.n === section.n ? "text-white" : "text-white/35")}>
            <span className={cn("h-[2px]", s.n === section.n ? "bg-white" : "bg-white/15")} />
            {s.n} {s.title}
          </li>
        ))}
      </ol>
      <div className="mt-auto flex items-end justify-between gap-[80px]">
        <div className="flex flex-col">
          <span className="deck-anim text-[400px] leading-[0.78] tracking-[-0.06em] text-white tabular-nums">{section.n}</span>
          <h2 className="deck-anim mt-[40px] text-[120px] leading-[1] font-normal tracking-[-0.04em]" style={{ "--i": 1 } as React.CSSProperties}>
            {section.title}
          </h2>
        </div>
        <ol className="mb-[14px] flex w-[560px] flex-col">
          {section.items.map((it, i) => (
            <li
              key={it}
              className="deck-anim flex items-baseline gap-[24px] border-t border-white/12 py-[18px] text-[26px] last:border-b"
              style={{ "--i": i + 2 } as React.CSSProperties}
            >
              <span className="font-mono text-[16px] text-white/40">{String(i + 1).padStart(2, "0")}</span>
              {it}
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  )
}
