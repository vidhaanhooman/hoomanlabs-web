import Image from "next/image"
import type { SimpleIcon } from "simple-icons"

import { Wordmark } from "@/components/layout/wordmark"
import { cn } from "@/lib/utils"

/**
 * Building blocks for the sales deck, drawn at the deck's native size
 * (1920 × 1080 px per slide), kept strictly to the website's style: Geist at
 * regular weight, two-tone headlines, near-white and near-black slides, 8 px
 * cards with a 1 px border, outlined figure cells (as in the homepage story
 * grid), dark product UI, and the hero painting on the cover, reveal and close
 * only. One idea per slide; colour only for status (green for live or done).
 *
 * The slides are built from five templates: Statement, Figures, Product
 * (shared-slides), Proof (shared-slides) and Compare. Colours are the deck's
 * own fixed palette, so the deck and its PDF look the same in either theme.
 */

/** Palette, set on the deck root as CSS variables. */
export const DECK_VARS = {
  "--d-bg": "#FDFDFD",
  "--d-dark": "#0D0D0D",
  "--d-ink": "#161616",
  "--d-grey": "#6C6C6C",
  "--d-card": "#F7F7F7",
  "--d-line": "#E4E4E4",
  "--d-green": "#298646",
  "--d-amber": "#B37903",
} as React.CSSProperties

export const HERO_PHOTO = "/hero/parallax/00-master.png"

export type Tone = "light" | "dark" | "grey" | "photo"

/**
 * One slide at 1920 × 1080 with the footer logo (bottom-left). The page number
 * (bottom-right) is added by DeckFrame, which counts the slides in order, so
 * `n` and `total` are only a reading aid in the story files.
 */
export function Slide({
  tone = "light",
  photo,
  footer = true,
  logoOnDark,
  children,
  className,
}: {
  n?: number
  total?: number
  tone?: Tone
  /** Full-bleed photo for tone "photo", dimmed evenly with a light blur (the website's photo-card treatment). */
  photo?: string
  footer?: boolean
  /** The logo sits on something dark (a photo half) though the slide is light. */
  logoOnDark?: boolean
  children: React.ReactNode
  className?: string
}) {
  const onDark = tone === "dark" || tone === "photo"
  return (
    <div
      className={cn(
        "relative isolate h-[1080px] w-[1920px] overflow-hidden font-sans",
        tone === "light" && "bg-(--d-bg) text-(--d-ink)",
        tone === "grey" && "bg-(--d-card) text-(--d-ink)",
        onDark && "bg-(--d-dark) text-white",
      )}
    >
      {tone === "photo" && photo && <PhotoBack src={photo} />}
      <div className={cn("flex h-full flex-col px-[128px] pt-[120px] pb-[150px]", className)}>{children}</div>
      {footer && (
        <div className={cn("absolute inset-x-[128px] bottom-[56px] flex items-center justify-between", onDark ? "text-white" : "text-(--d-ink)")}>
          <Wordmark className={cn("h-[24px] w-auto", logoOnDark && "text-white")} />
        </div>
      )}
    </div>
  )
}

/** A photo behind white words: dimmed evenly and softened by a light blur, as on the website's story and industry cards. */
export function PhotoBack({ src, sizes = "1920px" }: { src: string; sizes?: string }) {
  return (
    <>
      <Image src={src} alt="" fill sizes={sizes} className="-z-20 object-cover" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-[oklch(0.12_0_0/0.58)] backdrop-blur-[3px]" />
    </>
  )
}

/** The white logo at the top-left of a cover. */
export function CoverLogo() {
  return <Wordmark className="h-[32px] w-auto text-white" />
}

/** A small pill above a headline (the eyebrow). */
export function Eyebrow({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-[16px] py-[7px] font-mono text-[17px] leading-none",
        dark ? "border-white/20 bg-white/[0.06] text-white/75" : "border-(--d-line) bg-white text-(--d-grey)",
        className,
      )}
    >
      {children}
    </p>
  )
}

/** A two-tone headline: the first line in the slide's ink, the grey line after it. */
export function Headline({
  children,
  grey,
  size = 72,
  dark = false,
  block = true,
  className,
}: {
  children: React.ReactNode
  grey?: React.ReactNode
  size?: number
  dark?: boolean
  /** Put the grey line on its own line (otherwise it runs on). */
  block?: boolean
  className?: string
}) {
  return (
    <h2 className={cn("deck-anim leading-[1.08] font-normal tracking-[-0.03em] text-balance", className)} style={{ fontSize: size }}>
      {children}
      {grey && (
        <>
          {block ? <br /> : " "}
          <span className={dark ? "text-white/50" : "text-(--d-grey)"}>{grey}</span>
        </>
      )}
    </h2>
  )
}

/** A sub line or short paragraph under a headline. */
export function Sub({ children, dark = false, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return <p className={cn("text-[28px] leading-[1.45]", dark ? "text-white/70" : "text-(--d-grey)", className)}>{children}</p>
}

/** The small amber "Data needed" label beside a gap; hidden in the client version. */
export function Need({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "deck-need inline-flex h-[26px] shrink-0 items-center rounded-[5px] bg-(--d-amber)/12 px-[9px] align-middle font-mono text-[14px] leading-none font-normal tracking-normal text-(--d-amber)",
        className,
      )}
    >
      Data needed
    </span>
  )
}

/** A card: grey with a 1 px border (the website's surface), an outlined cell, or dark. */
export function Card({
  children,
  className,
  look = "grey",
  style,
}: {
  children: React.ReactNode
  className?: string
  look?: "grey" | "outline" | "dark" | "white"
  style?: React.CSSProperties
}) {
  return (
    <div
      style={style}
      className={cn(
        "relative flex flex-col rounded-[8px] border",
        look === "grey" && "border-(--d-line) bg-(--d-card)",
        look === "outline" && "border-(--d-line)",
        look === "white" && "border-(--d-line) bg-white",
        look === "dark" && "border-white/12 text-white",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Mono step or card number, e.g. "01". */
export function Num({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[18px] opacity-55", className)}>{children}</span>
}

/**
 * Figures template: one number in an outlined cell (as in the homepage story
 * grid): a mono label, the number large, what it measures and its source.
 */
export function Figure({
  label,
  value,
  caption,
  source,
  need,
  dark = false,
  className,
}: {
  label?: React.ReactNode
  value: React.ReactNode
  caption: React.ReactNode
  source?: React.ReactNode
  need?: boolean
  dark?: boolean
  className?: string
}) {
  return (
    <Card look={dark ? "dark" : "outline"} className={cn("justify-between gap-[28px] p-[36px]", className)}>
      {label && <span className={cn("font-mono text-[18px]", dark ? "text-white/55" : "text-(--d-grey)")}>{label}</span>}
      <span className="flex flex-col gap-[12px]">
        <span className="flex items-center gap-[14px] text-[84px] leading-none tracking-[-0.04em] tabular-nums">
          {value}
          {need && <Need />}
        </span>
        <span className={cn("text-[24px] leading-[1.4]", dark ? "text-white/70" : "text-(--d-grey)")}>{caption}</span>
        {source && <span className={cn("font-mono text-[17px]", dark ? "text-white/50" : "text-(--d-grey)")}>{source}</span>}
      </span>
    </Card>
  )
}

/**
 * Compare template: a table in the website's style (thin row lines, mono
 * column heads); the last row can be a black band.
 */
export function Compare({ cols, rows, band = false, className }: { cols: string[]; rows: string[][]; band?: boolean; className?: string }) {
  const grid = { gridTemplateColumns: `1.3fr repeat(${cols.length}, 1fr)` }
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="grid border-b border-(--d-line) pb-[20px] font-mono text-[19px] text-(--d-grey)" style={grid}>
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
            className={cn("grid items-center py-[30px] text-[28px]", isBand ? "mt-[12px] rounded-[8px] bg-(--d-dark) px-[28px] text-white" : "border-b border-(--d-line)")}
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
    </div>
  )
}

/** A square placeholder for a QR code (the codes are still to make). */
export function Qr({ size = 96, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span
      className={cn("relative grid shrink-0 place-items-center rounded-[6px] border border-dashed", dark ? "border-white/30" : "border-(--d-line) bg-white")}
      style={{ width: size, height: size }}
    >
      <span className={cn("font-mono text-[13px]", dark ? "text-white/50" : "text-(--d-grey)")}>QR</span>
      <Need className="absolute -top-[13px] scale-75" />
    </span>
  )
}

/** The website's primary button: black, or white on dark. */
export function Button({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <span className={cn("inline-flex h-[60px] items-center rounded-[8px] px-[28px] text-[22px]", onDark ? "bg-white text-(--d-ink)" : "bg-(--d-dark) text-white")}>{children}</span>
  )
}

/* ---------- Polished elements (icon tiles, floating tags, process row) ---------- */

type IconType = React.ComponentType<{ className?: string; weight?: "regular" | "fill" | "bold" | "duotone" }>

/**
 * An app-style icon tile: a rounded square with a soft top light and a drop
 * shadow. "dark" on dark slides, "light" on light ones; "on" marks the
 * current or key one (white on dark, black on light).
 */
export function IconTile({
  icon: Icon,
  size = 96,
  look = "dark",
  on = false,
  className,
}: {
  icon: IconType
  size?: number
  look?: "dark" | "light" | "soft" | "soft-dark"
  on?: boolean
  className?: string
}) {
  const inverse = (look === "dark") === on
  const soft = look === "soft" || look === "soft-dark"
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center border",
        look === "soft"
          ? "border-white/70 bg-[linear-gradient(145deg,#FAFAFA,#ECECEC)] text-(--d-ink)/70 shadow-[-8px_-8px_18px_rgb(255_255_255/0.9),12px_16px_32px_rgb(0_0_0/0.10),inset_0_1px_0_white]"
          : look === "soft-dark"
            ? "border-white/[0.06] bg-[linear-gradient(145deg,#1C1C1C,#101010)] text-white/80 shadow-[-6px_-6px_16px_rgb(255_255_255/0.035),14px_18px_36px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.07)]"
            : soft
              ? ""
              : inverse
                ? "border-white/10 bg-[linear-gradient(to_bottom,#2B2B2B,#121212)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_18px_40px_-14px_rgb(0_0_0/0.55)]"
                : "border-black/[0.06] bg-[linear-gradient(to_bottom,#FFFFFF,#EFEFEF)] text-(--d-ink) shadow-[inset_0_1px_0_rgb(255_255_255),0_18px_40px_-16px_rgb(0_0_0/0.35)]",
        className,
      )}
      style={{ width: size, height: size, borderRadius: size * 0.26 }}
    >
      <Icon className="size-[42%]" weight="regular" />
    </span>
  )
}

/** A floating tag: a white pill with a small icon tile and a label, optionally tilted. */
export function Tag({
  icon: Icon,
  children,
  tilt = 0,
  dark = false,
  className,
  i = 0,
}: {
  icon?: IconType
  children: React.ReactNode
  tilt?: number
  dark?: boolean
  className?: string
  /** Order in the slide's entrance (staggered). */
  i?: number
}) {
  return (
    <span
      className={cn(
        "deck-anim inline-flex w-fit items-center gap-[14px] rounded-[14px] border py-[10px] pr-[20px] pl-[10px] text-[22px] whitespace-nowrap",
        dark
          ? "border-white/12 bg-[#1A1A1A] text-white shadow-[0_18px_40px_-16px_rgb(0_0_0/0.7)]"
          : "border-black/[0.06] bg-white text-(--d-ink) shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)]",
        !Icon && "pl-[20px]",
        className,
      )}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, "--i": i } as React.CSSProperties}
    >
      {Icon && (
        <span className={cn("grid size-[38px] place-items-center rounded-[10px]", dark ? "bg-white text-(--d-ink)" : "bg-(--d-ink) text-white")}>
          <Icon className="size-[20px]" weight="bold" />
        </span>
      )}
      {children}
    </span>
  )
}

/**
 * A process row: icon tiles joined by a line with a dot under each, the label
 * below (as in a step-by-step product flow). `on` marks the current step.
 */
export function Process({
  steps,
  on,
  dark = false,
  soft = false,
  size = 112,
  className,
}: {
  steps: { icon: IconType; title: string; body?: React.ReactNode; n?: string }[]
  on?: number
  dark?: boolean
  /** Embossed tiles (same tone as the slide) instead of solid ones. */
  soft?: boolean
  size?: number
  className?: string
}) {
  return (
    <ol className={cn("grid", className)} style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((s, i) => (
        <li key={s.title} className="deck-anim flex flex-col items-center gap-[22px] text-center" style={{ "--i": i + 1 } as React.CSSProperties}>
          <IconTile icon={s.icon} size={size} look={soft && i !== on ? (dark ? "soft-dark" : "soft") : dark ? "dark" : "light"} on={i === on} />
          <span className="relative flex h-[14px] w-full items-center justify-center">
            <span
              className={cn("absolute h-px", dark ? "bg-white/20" : "bg-(--d-line)", i === 0 ? "right-0 left-1/2" : i === steps.length - 1 ? "right-1/2 left-0" : "inset-x-0")}
            />
            <span
              className={cn(
                "relative size-[14px] rounded-full border-2",
                i === on ? (dark ? "border-white bg-white" : "border-(--d-ink) bg-(--d-ink)") : dark ? "border-white/40 bg-(--d-dark)" : "border-(--d-ink)/30 bg-(--d-bg)",
              )}
            />
          </span>
          {s.n && <span className="-mb-[12px] font-mono text-[17px] opacity-55">{s.n}</span>}
          <span className={cn("text-[28px] leading-[1.2]", i === on || on === undefined ? "" : dark ? "text-white/60" : "text-(--d-grey)")}>{s.title}</span>
          {s.body && <span className={cn("max-w-[300px] text-[20px] leading-[1.45]", dark ? "text-white/60" : "text-(--d-grey)")}>{s.body}</span>}
        </li>
      ))}
    </ol>
  )
}

/** Rows of faint, blank pills behind a statement (a quiet texture). */
export function GhostPills({ dark = false, className }: { dark?: boolean; className?: string }) {
  const rows = [
    [180, 260, 120, 300, 200, 160, 240],
    [240, 140, 320, 180, 220, 280],
    [120, 300, 200, 160, 260, 140, 220],
    [280, 180, 240, 140, 300, 200],
    [160, 220, 140, 280, 180, 260, 120],
    [220, 300, 160, 200, 140, 280],
    [140, 200, 280, 120, 240, 180, 260],
    [300, 160, 220, 260, 140, 200],
  ]
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 flex flex-col justify-between overflow-hidden py-[40px]", className)}>
      {rows.map((r, i) => (
        <div key={i} className="flex gap-[22px]" style={{ marginLeft: -60 - (i % 3) * 70 }}>
          {r.concat(r).map((w, j) => (
            <span
              key={j}
              className={cn(
                "h-[48px] shrink-0 rounded-[14px]",
                dark
                  ? "bg-white/[0.02] shadow-[inset_0_2px_4px_rgb(0_0_0/0.7),inset_0_-1px_0_rgb(255_255_255/0.06)]"
                  : "bg-black/[0.025] shadow-[inset_0_2px_3px_rgb(0_0_0/0.07),inset_0_-1px_0_rgb(255_255_255/0.9)]",
              )}
              style={{ width: w }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * Faint contour lines behind a centred composition: nested rounded outlines
 * and a few long diagonals, like the guides of a layout.
 */
export function Contours({ dark = false, className }: { dark?: boolean; className?: string }) {
  const c = dark ? "rgb(255 255 255 / 0.06)" : "rgb(0 0 0 / 0.06)"
  return (
    <svg aria-hidden viewBox="0 0 1920 1080" className={cn("pointer-events-none absolute inset-0 -z-10 size-full", className)} fill="none" stroke={c} strokeWidth="1.5">
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={560 - k * 150} y={250 - k * 110} width={800 + k * 300} height={580 + k * 220} rx={260 + k * 60} />
      ))}
      <path d="M0 160 L760 1080 M1920 160 L1160 1080 M380 0 L960 540 L1540 0" />
    </svg>
  )
}

/** A collaborator's cursor (an arrow), optionally with a dark name label. */
export function Cursor({ label, className, i = 0 }: { label?: string; className?: string; i?: number }) {
  return (
    <span className={cn("deck-anim pointer-events-none absolute flex items-start gap-[2px]", className)} style={{ "--i": i } as React.CSSProperties}>
      <svg viewBox="0 0 24 24" className="size-[34px] drop-shadow-[0_4px_8px_rgb(0_0_0/0.35)]" aria-hidden>
        <path d="M4 2.5 L19.5 12 L12.5 13.5 L9 20.5 Z" fill="#161616" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {label && <span className="mt-[22px] rounded-[6px] bg-(--d-ink) px-[10px] py-[5px] font-mono text-[15px] whitespace-nowrap text-white">{label}</span>}
    </span>
  )
}

/** Anything that should come in with the slide's entrance (blur up), in order `i`. */
export function In({ i = 0, className, children }: { i?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("deck-anim", className)} style={{ "--i": i } as React.CSSProperties}>
      {children}
    </div>
  )
}

/**
 * Concentric arcs spreading from a corner: the deck's sound-wave motif (a
 * voice going out), drawn as thick quarter rings in the slide's ink.
 */
export function Arcs({
  corner = "br",
  rings = 5,
  thickness = 30,
  gap = 34,
  inner = 90,
  className,
}: {
  corner?: "br" | "bl" | "tr" | "tl"
  rings?: number
  thickness?: number
  gap?: number
  inner?: number
  className?: string
}) {
  const size = inner + rings * (thickness + gap)
  const [cx, cy] = { br: [size, size], bl: [0, size], tr: [size, 0], tl: [0, 0] }[corner]
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none absolute", className)}
      style={{ width: size, height: size }}
      fill="none"
      stroke="currentColor"
    >
      {Array.from({ length: rings }, (_, k) => (
        <circle key={k} cx={cx} cy={cy} r={inner + k * (thickness + gap) + thickness / 2} strokeWidth={thickness} />
      ))}
    </svg>
  )
}

/** A filled circle whose area shows a share (0–1), inside a fixed box; the full share is drawn as a thin ring. */
export function Bubble({ value, box = 220, dark = false, className }: { value: number; box?: number; dark?: boolean; className?: string }) {
  const R = box / 2
  const r = Math.max(4, R * Math.sqrt(value))
  return (
    <svg aria-hidden viewBox={`0 0 ${box} ${box}`} className={cn("shrink-0", className)} style={{ width: box, height: box }}>
      <circle cx={R} cy={R} r={R - 1} fill="none" stroke="currentColor" strokeOpacity={dark ? 0.25 : 0.2} strokeDasharray="3 6" />
      <circle cx={R} cy={R} r={r} fill="currentColor" />
    </svg>
  )
}

/* ---------- Thin-line drawings (the website's outcome-card style) ---------- */

const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, vectorEffect: "non-scaling-stroke" } as const

/** A line drawing: rising, flat or spiking. */
export function Trend({ kind, width = 232, height = 72, className }: { kind: "rise" | "flat" | "spike"; width?: number; height?: number; className?: string }) {
  const d = { rise: "M4 66 L60 56 L116 40 L172 24 L228 8", flat: "M4 38 L228 38", spike: "M4 58 L80 58 L104 10 L128 58 L228 58" }[kind]
  const end = { rise: [228, 8], flat: [228, 38], spike: [104, 10] }[kind]
  return (
    <svg viewBox="0 0 232 72" preserveAspectRatio="none" className={className} style={{ width, height }} aria-hidden overflow="visible">
      <path d={d} {...stroke} />
      <circle cx={end[0]} cy={end[1]} r="3" fill="currentColor" />
    </svg>
  )
}

/** A waveform that flattens into a dead line (or, reversed, a flat wait that becomes an answer). */
export function Wave({
  width = 1664,
  height = 140,
  flattens = "end",
  dot,
  className,
}: {
  width?: number
  height?: number
  flattens?: "end" | "start"
  dot?: string
  className?: string
}) {
  const mid = height / 2
  const pts: string[] = []
  const steps = Math.max(60, Math.round(width / 9))
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const t = i / steps
    const live = flattens === "end" ? (t < 0.62 ? 1 : Math.max(0, 1 - (t - 0.62) / 0.08)) : t < 0.38 ? 0 : Math.min(1, (t - 0.38) / 0.06)
    const amp = live * (mid - 8) * (0.35 + 0.65 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)))
    pts.push(`${x.toFixed(1)},${(mid + (i % 2 ? amp : -amp)).toFixed(1)}`)
  }
  const dotX = flattens === "end" ? width - 6 : width * 0.38
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} style={{ width, height }} aria-hidden>
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={dotX} cy={mid} r="5" fill={dot ?? "currentColor"} />
    </svg>
  )
}

/** An orbit: a ring of dots around a centre (languages). */
export function Orbit({ size = 96, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={{ width: size, height: size }} aria-hidden>
      <circle cx="60" cy="60" r="44" {...stroke} />
      <circle cx="60" cy="60" r="22" {...stroke} opacity={0.5} />
      {[0, 60, 130, 200, 260, 320].map((a) => (
        <circle key={a} cx={60 + 44 * Math.cos((a * Math.PI) / 180)} cy={60 + 44 * Math.sin((a * Math.PI) / 180)} r="3.5" fill="currentColor" />
      ))}
      <circle cx="60" cy="60" r="3.5" fill="currentColor" />
    </svg>
  )
}

/** A step line: dots joined by a line (actions done in order). */
export function StepLine({ width = 232, height = 72, className }: { width?: number; height?: number; className?: string }) {
  return (
    <svg viewBox="0 0 232 72" preserveAspectRatio="none" className={className} style={{ width, height }} aria-hidden overflow="visible">
      <path d="M8 60 L64 60 L64 36 L120 36 L120 12 L224 12" {...stroke} />
      {[
        [8, 60],
        [64, 36],
        [120, 12],
        [224, 12],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
    </svg>
  )
}

/** A horizontal line of numbered dots (a short process). */
export function Steps({ items, dark = false, className }: { items: { n: string; title: string; body?: string }[]; dark?: boolean; className?: string }) {
  return (
    <ol className={cn("grid", className)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((s, i) => (
        <li key={s.n} className="flex flex-col gap-[12px] pr-[32px]">
          <span className="relative flex h-[12px] items-center">
            <span className={cn("relative z-10 size-[12px] rounded-full", dark ? "bg-white" : "bg-(--d-ink)")} />
            {i < items.length - 1 && <span className={cn("absolute right-0 left-[12px] h-px", dark ? "bg-white/35" : "bg-(--d-line)")} />}
          </span>
          <span className="mt-[14px] font-mono text-[18px] opacity-55">{s.n}</span>
          <span className="text-[30px] leading-[1.2]">{s.title}</span>
          {s.body && <span className={cn("text-[21px] leading-[1.45]", dark ? "text-white/65" : "text-(--d-grey)")}>{s.body}</span>}
        </li>
      ))}
    </ol>
  )
}

/* ---------- Product UI (the website's dark panels) ---------- */

/** A dark app window with chrome dots and a title line. */
export function Window({ title, children, className }: { title?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("ui-dark flex flex-col overflow-hidden rounded-[10px] border border-white/10 bg-(--ui-bg) text-(--ui-text)", className)}>
      <div className="flex h-[50px] shrink-0 items-center gap-[10px] border-b border-(--ui-line) px-[20px]">
        <span className="size-[10px] rounded-full bg-white/15" />
        <span className="size-[10px] rounded-full bg-white/15" />
        <span className="size-[10px] rounded-full bg-white/15" />
        {title && <span className="ml-[10px] flex items-center gap-[10px] text-[17px] text-(--ui-muted)">{title}</span>}
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

export function CallCard({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Window
      className={className}
      title={
        <>
          <Live /> Live
        </>
      }
    >
      <ol className={cn("flex flex-col", compact ? "gap-[16px] p-[26px]" : "gap-[20px] p-[32px]")}>
        {CALL_STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-[16px]">
            <span className={cn("grid size-[24px] shrink-0 place-items-center rounded-full", i < 4 ? "bg-(--ok)/20" : "border border-(--ui-line)")}>
              <span className={cn("size-[8px] rounded-full", i < 4 ? "bg-(--ok)" : "bg-white/30")} />
            </span>
            <span className={cn("flex-1", compact ? "text-[20px]" : "text-[23px]", i === 4 && "text-(--ui-muted)")}>{s}</span>
            <span className="flex items-center gap-[8px] font-mono text-[16px] text-(--ui-muted)">
              [X] <Need className="scale-[0.8]" />
            </span>
          </li>
        ))}
      </ol>
    </Window>
  )
}

/** A brand mark from simple-icons, in one colour. */
export function BrandIcon({ icon, size = 26, className }: { icon: SimpleIcon; size?: number; className?: string }) {
  return (
    <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}
