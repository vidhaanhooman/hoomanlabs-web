import Image from "next/image"
import type { SimpleIcon } from "simple-icons"

import { MARK_PATH } from "@/components/layout/wordmark"
import { cn } from "@/lib/utils"

/**
 * Building blocks for the sales deck (1920 × 1080 per slide), in the manner
 * of the Mark OS deck slides, in HoomanLabs colours: a soft neutral grey
 * ("mist") or graphite surface instead of a brand hue, white tags with black
 * icon squares, embossed tiles in the surface's own tone, and black or white
 * (never a hue) for the one thing that matters on a slide. Green only means
 * live.
 *
 * Compositions are centred and sparse: a pill eyebrow, a headline, and one
 * arrangement round it (a wall of pressed-in pills, tags fanned round a
 * centre, tiles scattered with cursors, a process row, a photo with tiles
 * floating on it). The only chrome is the HoomanLabs mark in the top-right
 * corner; DeckFrame adds the page number.
 */

export const DECK_VARS = {
  "--d-mist": "#ECECEC",
  "--d-bg": "#FAFAFA",
  "--d-dark": "#0E0E0E",
  "--d-graphite": "#191919",
  "--d-ink": "#141414",
  "--d-grey": "#6B6B6B",
  "--d-line": "#DCDCDC",
  "--d-green": "#2F9E57",
  "--d-amber": "#B37903",
} as React.CSSProperties

export const HERO_PHOTO = "/hero/parallax/00-master.png"

export type Tone = "mist" | "light" | "dark" | "photo"
type IconType = React.ComponentType<{ className?: string; weight?: "regular" | "fill" | "bold" | "duotone" }>

/** The HoomanLabs mark, filled. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 119 131" fill="currentColor" aria-hidden className={className}>
      <path fillRule="evenodd" d={MARK_PATH} />
    </svg>
  )
}

/** One slide: the surface, the mark in the top-right corner, and the content inside 120 px margins. */
export function Slide({
  tone = "mist",
  photo,
  markOnDark,
  children,
  className,
}: {
  tone?: Tone
  photo?: string
  /** The corner mark sits on something dark (a photo or dark half) though the slide is light. */
  markOnDark?: boolean
  children: React.ReactNode
  className?: string
}) {
  const onDark = tone === "dark" || tone === "photo"
  return (
    <div
      className={cn(
        "relative isolate h-[1080px] w-[1920px] overflow-hidden font-sans",
        tone === "mist" && "bg-(--d-mist) text-(--d-ink)",
        tone === "light" && "bg-(--d-bg) text-(--d-ink)",
        onDark && "bg-(--d-dark) text-white",
      )}
    >
      {tone === "photo" && photo && <PhotoBack src={photo} />}
      <Mark className={cn("absolute top-[56px] right-[64px] z-10 h-[30px] w-auto", onDark || markOnDark ? "text-white/80" : "text-(--d-ink)/80")} />
      <div className={cn("relative flex h-full flex-col px-[120px] pt-[120px] pb-[120px]", className)}>{children}</div>
    </div>
  )
}

/** A photo behind white words, dimmed evenly with a light blur (the website's story-card treatment). */
export function PhotoBack({ src, sizes = "1920px", dim = 0.55 }: { src: string; sizes?: string; dim?: number }) {
  return (
    <>
      <Image src={src} alt="" fill sizes={sizes} className="-z-20 object-cover" />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 backdrop-blur-[2px]"
        style={{ background: `linear-gradient(to bottom, oklch(0.12 0 0 / ${dim - 0.15}), oklch(0.12 0 0 / ${dim + 0.2}))` }}
      />
    </>
  )
}

/** The small pill above a headline. */
export function Pill({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "deck-anim inline-flex w-fit items-center gap-[10px] rounded-full border px-[18px] py-[8px] text-[17px] leading-none",
        dark ? "border-white/15 bg-white/[0.07] text-white/75" : "border-white/80 bg-white/55 text-(--d-ink)/70 shadow-[0_1px_2px_rgb(0_0_0/0.05)]",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A two-tone headline. */
export function Headline({
  children,
  grey,
  size = 84,
  dark = false,
  block = true,
  className,
}: {
  children: React.ReactNode
  grey?: React.ReactNode
  size?: number
  dark?: boolean
  block?: boolean
  className?: string
}) {
  return (
    <h2 className={cn("leading-[1.05] font-normal tracking-[-0.035em] text-balance", className)} style={{ fontSize: size }}>
      {children}
      {grey && (
        <>
          {block ? <br /> : " "}
          <span className={dark ? "text-white/45" : "text-(--d-grey)"}>{grey}</span>
        </>
      )}
    </h2>
  )
}

/** A pill and a headline, centred (or left), coming in first. */
export function Title({
  pill,
  children,
  grey,
  dark = false,
  size,
  block,
  center = true,
  className,
}: {
  pill?: React.ReactNode
  children: React.ReactNode
  grey?: React.ReactNode
  dark?: boolean
  size?: number
  block?: boolean
  center?: boolean
  className?: string
}) {
  return (
    <div className={cn("deck-anim flex flex-col gap-[28px]", center ? "mx-auto max-w-[1400px] items-center text-center" : "max-w-[1300px]", className)}>
      {pill && <Pill dark={dark}>{pill}</Pill>}
      <Headline grey={grey} dark={dark} size={size} block={block}>
        {children}
      </Headline>
    </div>
  )
}

/** A sub line or short paragraph. */
export function Sub({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return <p className={cn("max-w-[900px] text-[24px] leading-[1.55]", dark ? "text-white/60" : "text-(--d-grey)", className)}>{children}</p>
}

/** The small amber "Data needed" label beside a gap; hidden in the client version. */
export function Need({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "deck-need inline-flex h-[24px] shrink-0 items-center rounded-[4px] bg-(--d-amber)/14 px-[8px] align-middle font-mono text-[13px] leading-none font-normal tracking-normal text-(--d-amber)",
        className,
      )}
    >
      Data needed
    </span>
  )
}

/* ---------- Mark OS elements ---------- */

/**
 * A wall of blank pills pressed into the surface (same tone, inner shadow),
 * behind a centred statement. Fades out towards the middle so the words sit
 * on clear ground.
 */
export function Wall({ dark = false }: { dark?: boolean }) {
  const rows = [
    [210, 120, 260, 180, 300, 150, 230, 190],
    [150, 280, 140, 220, 170, 260, 130],
    [260, 170, 230, 120, 290, 160, 210, 140],
    [130, 240, 190, 300, 140, 220, 180],
    [220, 150, 270, 160, 200, 120, 280, 170],
    [180, 290, 130, 240, 170, 260, 150],
    [240, 140, 210, 180, 120, 300, 160, 200],
    [160, 230, 280, 140, 250, 130, 220],
    [290, 170, 150, 260, 190, 230, 140, 210],
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-between overflow-hidden py-[34px]">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-[20px]" style={{ marginLeft: -40 - (i % 3) * 90 }}>
          {r.concat(r).map((w, j) => (
            <span
              key={j}
              className={cn(
                "h-[62px] shrink-0 rounded-[16px]",
                dark
                  ? "bg-black/30 shadow-[inset_0_3px_6px_rgb(0_0_0/0.65),inset_0_-1px_0_rgb(255_255_255/0.06)]"
                  : "bg-black/[0.035] shadow-[inset_0_3px_5px_rgb(0_0_0/0.08),inset_0_-1px_0_rgb(255_255_255/0.95)]",
              )}
              style={{ width: w }}
            />
          ))}
        </div>
      ))}
      <span
        className={cn(
          "absolute inset-0",
          dark ? "bg-[radial-gradient(42%_40%_at_50%_50%,#0E0E0E_45%,transparent)]" : "bg-[radial-gradient(40%_38%_at_50%_50%,#ECECEC_50%,transparent)]",
        )}
      />
    </div>
  )
}

/** Faint large outlines behind a centred composition (nested rounded shapes and long lines). */
export function Lines({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1920 1080"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
      fill="none"
      stroke={dark ? "rgb(255 255 255 / 0.07)" : "rgb(0 0 0 / 0.07)"}
      strokeWidth="1.5"
    >
      <rect x="610" y="190" width="700" height="700" rx="230" />
      <rect x="430" y="40" width="1060" height="1000" rx="330" />
      <path d="M0 250 L700 1080 M1920 250 L1220 1080 M300 0 L960 560 L1620 0" />
    </svg>
  )
}

/**
 * An icon tile. "glossy": white, lit from the top, casting a soft shadow;
 * "soft": embossed in the surface's own tone (light or dark); "on": the
 * one that matters (black on light, white on dark).
 */
export function Tile({
  icon: Icon,
  size = 104,
  look = "glossy",
  dark = false,
  className,
}: {
  icon: IconType
  size?: number
  look?: "glossy" | "soft" | "on"
  dark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center",
        look === "glossy" &&
          (dark
            ? "border border-white/10 bg-[linear-gradient(to_bottom,#2C2C2C,#151515)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_20px_44px_-16px_rgb(0_0_0/0.7)]"
            : "border border-white bg-[linear-gradient(to_bottom,#FFFFFF,#F1F1F1)] text-(--d-ink) shadow-[inset_0_1px_0_white,0_22px_44px_-18px_rgb(0_0_0/0.3)]"),
        look === "soft" &&
          (dark
            ? "border border-white/[0.05] bg-[linear-gradient(145deg,#1D1D1D,#111)] text-white/70 shadow-[-6px_-6px_16px_rgb(255_255_255/0.03),14px_18px_36px_rgb(0_0_0/0.7)]"
            : "border border-white/70 bg-[linear-gradient(145deg,#F3F3F3,#E4E4E4)] text-(--d-ink)/60 shadow-[-8px_-8px_18px_rgb(255_255_255/0.85),12px_16px_30px_rgb(0_0_0/0.10)]"),
        look === "on" &&
          (dark
            ? "bg-white text-(--d-ink) shadow-[0_20px_44px_-16px_rgb(255_255_255/0.25)]"
            : "bg-(--d-ink) text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_22px_44px_-18px_rgb(0_0_0/0.5)]"),
        className,
      )}
      style={{ width: size, height: size, borderRadius: size * 0.27 }}
    >
      <Icon className="size-[42%]" />
    </span>
  )
}

/** A white tag with a small black icon square, optionally tilted (Mark OS's guideline tags). */
export function Tag({
  icon: Icon,
  children,
  tilt = 0,
  dark = false,
  className,
}: {
  icon?: IconType
  children: React.ReactNode
  tilt?: number
  dark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-[14px] rounded-[16px] py-[10px] pr-[22px] pl-[10px] text-[22px] whitespace-nowrap",
        dark ? "bg-[#202020] text-white shadow-[0_18px_40px_-16px_rgb(0_0_0/0.7)]" : "bg-white text-(--d-ink) shadow-[0_2px_0_rgb(0_0_0/0.04),0_18px_36px_-18px_rgb(0_0_0/0.3)]",
        !Icon && "pl-[22px]",
        className,
      )}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {Icon && (
        <span className={cn("grid size-[40px] place-items-center rounded-[11px]", dark ? "bg-white text-(--d-ink)" : "bg-(--d-ink) text-white")}>
          <Icon className="size-[20px]" weight="bold" />
        </span>
      )}
      {children}
    </span>
  )
}

/** Place something absolutely on the slide (slide coordinates), tilted, entering at step `i`. */
export function At({ x, y, r = 0, i = 2, children }: { x: number; y: number; r?: number; i?: number; children: React.ReactNode }) {
  return (
    <div className="deck-anim absolute" style={{ left: x, top: y, rotate: `${r}deg`, "--i": i } as React.CSSProperties}>
      {children}
    </div>
  )
}

/** A collaborator's cursor with an optional dark name label. */
export function Cursor({ label, x, y, i = 4 }: { label?: string; x: number; y: number; i?: number }) {
  return (
    <At x={x} y={y} i={i}>
      <span className="flex items-start">
        <svg viewBox="0 0 24 24" className="size-[34px] drop-shadow-[0_4px_8px_rgb(0_0_0/0.3)]" aria-hidden>
          <path d="M4 2.5 L19.5 12 L12.5 13.5 L9 20.5 Z" fill="#141414" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        {label && <span className="mt-[22px] rounded-[6px] bg-(--d-ink) px-[10px] py-[5px] text-[15px] whitespace-nowrap text-white">{label}</span>}
      </span>
    </At>
  )
}

/** A process row: tiles joined by a line with a dot under each; `on` lights one. */
export function Process({
  steps,
  on,
  dark = false,
  size = 120,
  className,
}: {
  steps: { icon: IconType; title: string; body?: React.ReactNode }[]
  on?: number
  dark?: boolean
  size?: number
  className?: string
}) {
  return (
    <ol className={cn("grid", className)} style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((s, i) => (
        <li key={s.title} className="deck-anim flex flex-col items-center gap-[24px] text-center" style={{ "--i": i + 1 } as React.CSSProperties}>
          <Tile icon={s.icon} size={size} look={i === on ? "on" : "glossy"} dark={dark} />
          <span className="relative flex h-[14px] w-full items-center justify-center">
            <span
              className={cn("absolute h-px", dark ? "bg-white/20" : "bg-(--d-ink)/15", i === 0 ? "right-0 left-1/2" : i === steps.length - 1 ? "right-1/2 left-0" : "inset-x-0")}
            />
            <span
              className={cn(
                "relative size-[14px] rounded-full border-2",
                i === on ? (dark ? "border-white bg-white" : "border-(--d-ink) bg-(--d-ink)") : dark ? "border-white/35 bg-(--d-dark)" : "border-(--d-ink)/25 bg-(--d-mist)",
              )}
            />
          </span>
          <span className={cn("text-[28px] leading-[1.2]", on !== undefined && i !== on && (dark ? "text-white/55" : "text-(--d-grey)"))}>{s.title}</span>
          {s.body && <span className={cn("max-w-[300px] text-[19px] leading-[1.45]", dark ? "text-white/55" : "text-(--d-grey)")}>{s.body}</span>}
        </li>
      ))}
    </ol>
  )
}

/** A white panel on the mist surface (soft shadow), or a graphite one on dark. */
export function Panel({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[24px]",
        dark ? "border border-white/[0.07] bg-(--d-graphite) text-white" : "bg-white shadow-[0_2px_0_rgb(0_0_0/0.03),0_30px_60px_-30px_rgb(0_0_0/0.18)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Figures in a row of panels: a big number, what it measures, and a mono source. */
export function Figures({
  items,
  dark = false,
  size = 76,
  className,
}: {
  items: { value: React.ReactNode; caption: React.ReactNode; source?: React.ReactNode }[]
  dark?: boolean
  size?: number
  className?: string
}) {
  return (
    <ul className={cn("grid gap-[24px]", className)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((f, i) => (
        <li key={i} className="deck-anim" style={{ "--i": i + 1 } as React.CSSProperties}>
          <Panel dark={dark} className="h-[300px] justify-between p-[36px]">
            <span className="flex items-center gap-[14px] leading-[0.95] tracking-[-0.04em] tabular-nums" style={{ fontSize: size }}>
              {f.value}
            </span>
            <span className="flex flex-col gap-[10px]">
              <span className={cn("text-[22px] leading-[1.4]", dark ? "text-white/70" : "text-(--d-ink)")}>{f.caption}</span>
              {f.source && <span className={cn("font-mono text-[15px]", dark ? "text-white/45" : "text-(--d-grey)")}>{f.source}</span>}
            </span>
          </Panel>
        </li>
      ))}
    </ul>
  )
}

/** A comparison table on a white panel; the last row can be a black band. */
export function Compare({ cols, rows, band = false, className }: { cols: string[]; rows: string[][]; band?: boolean; className?: string }) {
  const grid = { gridTemplateColumns: `1.4fr repeat(${cols.length}, 1fr)` }
  return (
    <Panel className={cn("deck-anim p-[40px]", className)}>
      <div className="grid border-b border-(--d-line) pb-[18px] text-[18px] text-(--d-grey)" style={grid}>
        <span />
        {cols.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      {rows.map(([name, ...vals], r) => {
        const isBand = band && r === rows.length - 1
        return (
          <div
            key={name}
            className={cn("grid items-center py-[24px] text-[26px]", isBand ? "mt-[14px] rounded-[14px] bg-(--d-ink) px-[24px] text-white" : "border-b border-(--d-line)")}
            style={grid}
          >
            <span>{name}</span>
            {vals.map((v, i) => (
              <span key={i} className={isBand ? "" : v === "Yes" ? "text-(--d-ink)" : "text-(--d-grey)"}>
                {v}
              </span>
            ))}
          </div>
        )
      })}
    </Panel>
  )
}

/** A square placeholder for a QR code (the codes are still to make). */
export function Qr({ size = 80, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-[10px] border border-dashed", dark ? "border-white/30" : "border-(--d-ink)/20 bg-white")}
      style={{ width: size, height: size }}
    >
      <span className={cn("font-mono text-[13px]", dark ? "text-white/50" : "text-(--d-grey)")}>QR</span>
    </span>
  )
}

/** A black (or white, on dark) pill button. */
export function Button({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <span className={cn("inline-flex h-[64px] items-center rounded-full px-[32px] text-[22px]", onDark ? "bg-white text-(--d-ink)" : "bg-(--d-ink) text-white")}>{children}</span>
  )
}

/** Anything that comes in with the slide's entrance, in order `i`. */
export function In({ i = 1, className, children }: { i?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("deck-anim", className)} style={{ "--i": i } as React.CSSProperties}>
      {children}
    </div>
  )
}

/** A waveform: a flat wait that becomes an answer. */
export function Wave({ width = 800, height = 90, className }: { width?: number; height?: number; className?: string }) {
  const mid = height / 2
  const pts: string[] = []
  const steps = Math.round(width / 9)
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const live = t < 0.38 ? 0 : Math.min(1, (t - 0.38) / 0.06)
    const amp = live * (mid - 6) * (0.35 + 0.65 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)))
    pts.push(`${((i / steps) * width).toFixed(1)},${(mid + (i % 2 ? amp : -amp)).toFixed(1)}`)
  }
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} style={{ width, height }} aria-hidden>
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={width * 0.38} cy={mid} r="5" fill="#2F9E57" />
    </svg>
  )
}

/* ---------- Product UI (the website's dark panels) ---------- */

/** A dark app window with chrome dots and a title line. */
export function Window({ title, children, className }: { title?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "ui-dark flex flex-col overflow-hidden rounded-[16px] border border-white/10 bg-(--ui-bg) text-(--ui-text) shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="flex h-[52px] shrink-0 items-center gap-[10px] border-b border-(--ui-line) px-[22px]">
        <span className="size-[10px] rounded-full bg-white/15" />
        <span className="size-[10px] rounded-full bg-white/15" />
        <span className="size-[10px] rounded-full bg-white/15" />
        {title && <span className="ml-[12px] flex items-center gap-[10px] text-[17px] text-(--ui-muted)">{title}</span>}
      </div>
      {children}
    </div>
  )
}

/** A green live dot. */
export function Live({ className }: { className?: string }) {
  return <span className={cn("inline-block size-[9px] rounded-full bg-(--d-green)", className)} />
}

/** The damaged-order call as a step list with mono times (the website's live call card). */
export const CALL_STEPS = ["Order found", "Issue understood", "Photo on WhatsApp", "Replacement shipped", "Delivered and rated"]

export function CallCard({ className }: { className?: string }) {
  return (
    <Window
      className={className}
      title={
        <>
          <Live /> Live
        </>
      }
    >
      <ol className="flex flex-col gap-[18px] p-[28px]">
        {CALL_STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-[16px]">
            <span className={cn("grid size-[24px] shrink-0 place-items-center rounded-full", i < 4 ? "bg-(--ok)/20" : "border border-(--ui-line)")}>
              <span className={cn("size-[8px] rounded-full", i < 4 ? "bg-(--ok)" : "bg-white/30")} />
            </span>
            <span className={cn("flex-1 text-[21px]", i === 4 && "text-(--ui-muted)")}>{s}</span>
            <span className="flex items-center gap-[8px] font-mono text-[15px] text-(--ui-muted)">
              [X] <Need className="scale-[0.85]" />
            </span>
          </li>
        ))}
      </ol>
    </Window>
  )
}

/** A phone on an agent call: black bezel, the call screen in the product's dark UI, and what the call shows below. */
export function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[680px] w-[332px] shrink-0 rounded-[54px] bg-[#0A0A0A] p-[10px] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.08)]",
        className,
      )}
    >
      <div className="ui-dark relative flex h-full flex-col overflow-hidden rounded-[44px] bg-(--ui-bg) px-[22px] pt-[54px] pb-[24px] text-(--ui-text)">
        <span className="absolute top-[14px] left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex flex-col items-center gap-[10px] text-center">
          <span className="grid size-[64px] place-items-center rounded-full bg-white text-(--d-ink)">
            <Mark className="h-[26px] w-auto" />
          </span>
          <span className="text-[20px]">HoomanLabs agent</span>
          <span className="flex items-center gap-[8px] font-mono text-[14px] text-(--ui-muted)">
            <span className="size-[8px] rounded-full bg-(--ui-live)" /> Live
          </span>
          <span className="mt-[6px] flex h-[34px] items-center gap-[3px]">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className="w-[3px] rounded-full bg-white/70" style={{ height: 4 + Math.round(26 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.21))) }} />
            ))}
          </span>
        </div>
        <div className="mt-[22px] flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

/** A brand mark from simple-icons, in one colour. */
export function BrandIcon({ icon, size = 22, className }: { icon: SimpleIcon; size?: number; className?: string }) {
  return (
    <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}
