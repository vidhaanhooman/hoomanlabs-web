import { cn } from "@/lib/utils"

/**
 * Technical isometric line drawings for each industry's card on /solutions,
 * in the style of an exploded product diagram: white faces, crisp ink edges,
 * hatching on the shaded side, dashed construction lines, signal arcs, and a
 * small product card floating beside the object, linked by a dashed lead.
 *
 *  - Healthcare: a clipboard and a pill bottle; card "Visit booked".
 *  - Education: an open book; card "Counsellor booked".
 *  - Retail: two parcels; card "Out for delivery".
 *  - Travel: a suitcase; card "Check-in 14:00".
 *  - Financial services: a bank card and coin stacks; card "Paid $62.10".
 *
 * Everything is drawn in planes: 2D shapes placed on the floor (z), front (y)
 * or side (x) of the isometric grid with an SVG matrix, so lines stay 1px
 * (non-scaling strokes). Neutral tokens only, so it reads in light and dark.
 * Hovering the card (`group/ind`) lifts the product card and runs the signal
 * arcs; reduced motion keeps both still. Sample data.
 */

type V3 = [number, number, number]
const C = Math.cos(Math.PI / 6)
/** Isometric projection: +x right-down, +y left-down, +z up. */
const iso = ([x, y, z]: V3) => [(x - y) * C, (x + y) * 0.5 - z] as const

const ink = (p: number) => `color-mix(in oklch, var(--foreground) ${p}%, var(--background))`
const PAPER = "var(--background)"
const FRONT = ink(4)
const SIDE = ink(9)
const INK = ink(70)
const SOFT = ink(40)
const GUIDE = ink(22)

const S = { stroke: INK, strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const, strokeLinejoin: "round" as const, strokeLinecap: "round" as const }
const G = { stroke: GUIDE, strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const, strokeDasharray: "2 3", fill: "none" }

/** A 2D drawing placed on one plane of the grid, with (0, 0) at `at`. Floor: u = +x, v = +y. Front: u = +x, v = down. Side: u = +y, v = down. */
function Plane({ on, at, children, className }: { on: "floor" | "front" | "side"; at: V3; children: React.ReactNode; className?: string }) {
  const [e, f] = iso(at)
  const m = on === "floor" ? [C, 0.5, -C, 0.5] : on === "front" ? [C, 0.5, 0, 1] : [-C, 0.5, 0, 1]
  return (
    <g transform={`matrix(${m.join(" ")} ${e.toFixed(2)} ${f.toFixed(2)})`} className={className}>
      {children}
    </g>
  )
}

/** A box from (x, y, z), w along x, d along y, h up: its front, side and top faces. Optional marks on each face. */
function Box({
  at: [x, y, z],
  w,
  d,
  h,
  hatch,
  top,
  front,
  side,
}: {
  at: V3
  w: number
  d: number
  h: number
  hatch?: boolean
  top?: React.ReactNode
  front?: React.ReactNode
  side?: React.ReactNode
}) {
  return (
    <g>
      <Plane on="front" at={[x, y + d, z + h]}>
        <rect width={w} height={h} fill={FRONT} {...S} />
        {front}
      </Plane>
      <Plane on="side" at={[x + w, y, z + h]}>
        <rect width={d} height={h} fill={hatch ? "url(#ind-hatch)" : SIDE} {...S} />
        {side}
      </Plane>
      <Plane on="floor" at={[x, y, z + h]}>
        <rect width={w} height={d} fill={PAPER} {...S} />
        {top}
      </Plane>
    </g>
  )
}

/** An upright cylinder standing on the floor at (cx, cy), from z to z + h. */
function Cylinder({ c: [cx, cy, z], r, h, fill = PAPER }: { c: V3; r: number; h: number; fill?: string }) {
  const [bx, by] = iso([cx, cy, z])
  const [, ty] = iso([cx, cy, z + h])
  const rx = r * Math.sqrt(1.5)
  const ry = r * Math.SQRT1_2
  return (
    <g>
      <path d={`M${bx - rx} ${ty} L${bx - rx} ${by} A${rx} ${ry} 0 0 0 ${bx + rx} ${by} L${bx + rx} ${ty} Z`} fill={SIDE} {...S} />
      <ellipse cx={bx} cy={ty} rx={rx} ry={ry} fill={fill} {...S} />
    </g>
  )
}

/** Three signal arcs at a screen point, pointing `dir` (degrees); they pulse in turn on hover. */
function Signal({ x, y, dir = 0 }: { x: number; y: number; dir?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${dir})`} fill="none" {...S}>
      {[4, 8, 12].map((r, i) => (
        <path
          key={r}
          d={`M${r * Math.cos(-0.9)} ${r * Math.sin(-0.9)} A${r} ${r} 0 0 1 ${r * Math.cos(0.9)} ${r * Math.sin(0.9)}`}
          className="motion-safe:group-hover/ind:animate-[signal_1.4s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </g>
  )
}

/** A small product card standing on the front plane: window dots, a title, a line, and a status. */
function Card({ at, w = 78, title, line, status }: { at: V3; w?: number; title: string; line: string; status?: string }) {
  return (
    <g className="transition-transform duration-500 ease-(--ease-out) group-hover/ind:-translate-y-1.5 motion-reduce:transition-none">
      <Plane on="front" at={at}>
        <rect width={w} height={44} rx={4} fill={PAPER} {...S} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={7 + i * 5} cy={7} r={1.6} fill={i === 0 ? INK : "none"} {...S} />
        ))}
        <line x1={0} y1={14} x2={w} y2={14} {...S} stroke={SOFT} />
        <text x={6} y={25} fontSize={6.6} fontFamily="var(--font-mono)" fill={INK}>
          {title}
        </text>
        <text x={6} y={34} fontSize={5.4} fontFamily="var(--font-mono)" fill={SOFT}>
          {line}
        </text>
        {status && (
          <>
            <rect x={w - 22} y={4} width={17} height={6} rx={3} fill={FRONT} {...S} />
            <circle cx={w - 18} cy={7} r={1.2} fill={INK} />
            <text x={w - 15} y={8.9} fontSize={4.4} fontFamily="var(--font-mono)" fill={INK}>
              {status}
            </text>
          </>
        )}
      </Plane>
    </g>
  )
}

/** Dashed construction lines along the floor, just past the objects (an L under the scene). */
function Guides({ x1, y1 }: { x1: number; y1: number }) {
  return (
    <Plane on="floor" at={[0, 0, 0]}>
      <line x1={-8} y1={y1} x2={x1} y2={y1} {...G} />
      <line x1={x1} y1={-8} x2={x1} y2={y1} {...G} />
    </Plane>
  )
}

/** A dashed lead from a screen point to another. */
const Lead = ({ a, b }: { a: readonly [number, number]; b: readonly [number, number] }) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...G} />

const rows = (n: number, x: number, y: number, w: number, gap = 9, box = true) =>
  Array.from({ length: n }, (_, i) => (
    <g key={i}>
      {box && <rect x={x} y={y + i * gap - 3} width={5} height={5} rx={1} fill={i < 2 ? INK : "none"} {...S} />}
      <line x1={x + (box ? 9 : 0)} y1={y + i * gap} x2={x + w - (i % 2 ? 10 : 0)} y2={y + i * gap} {...S} stroke={SOFT} />
    </g>
  ))

function Healthcare() {
  return (
    <>
      <Guides x1={124} y1={100} />
      {/* Clipboard lying flat, with its clip and a checklist */}
      <Box at={[0, 0, 0]} w={66} d={88} h={4} hatch top={<g>{rows(4, 10, 24, 46)}</g>} />
      <Box at={[22, -4, 4]} w={22} d={10} h={4} />
      {/* Pill bottle and cap */}
      <Cylinder c={[96, 70, 0]} r={11} h={26} />
      <Cylinder c={[96, 70, 26]} r={12} h={7} fill={FRONT} />
      <Lead a={iso([66, 20, 8])} b={iso([110, -10, 60])} />
      <Signal x={iso([118, 54, 30])[0]} y={iso([118, 54, 30])[1]} dir={-30} />
      <Card at={[96, -30, 80]} title="Visit booked" line="Thu · 10:00 · Dr Rao" status="ok" />
    </>
  )
}

function Education() {
  const text = (x: number) => (
    <g>
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={x} y1={12 + i * 10} x2={x + 38 - (i % 3) * 6} y2={12 + i * 10} {...S} stroke={SOFT} />
      ))}
    </g>
  )
  return (
    <>
      <Guides x1={138} y1={122} />
      {/* Open book: the cover, then two page blocks either side of the spine */}
      <Box at={[0, 0, 0]} w={124} d={84} h={4} />
      <Box at={[2, 2, 4]} w={59} d={80} h={6} hatch top={text(9)} />
      <Box at={[63, 2, 4]} w={59} d={80} h={6} top={text(9)} />
      {/* A ruler beside it */}
      <Box
        at={[20, 98, 0]}
        w={96}
        d={12}
        h={3}
        top={
          <g>
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={6 + i * 7.6} y1={0} x2={6 + i * 7.6} y2={i % 2 ? 3 : 5} {...S} />
            ))}
          </g>
        }
      />
      <Lead a={iso([122, 20, 10])} b={iso([150, 0, 70])} />
      <Signal x={iso([124, 50, 20])[0] + 14} y={iso([124, 50, 20])[1] - 4} dir={-25} />
      <Card at={[130, -30, 90]} title="Counsellor booked" line="Sat · 11:30 · Online" status="ok" w={86} />
    </>
  )
}

function Retail() {
  return (
    <>
      <Guides x1={132} y1={72} />
      {/* A big parcel with tape, and a smaller one beside it */}
      <Box at={[0, 0, 0]} w={66} d={58} h={46} hatch top={<rect x={28} y={0} width={10} height={58} fill={FRONT} {...S} />} front={<rect x={28} y={0} width={10} height={14} fill={SIDE} {...S} />} />
      <Box
        at={[78, 24, 0]}
        w={40}
        d={34}
        h={28}
        top={<line x1={0} y1={17} x2={40} y2={17} {...S} />}
        front={
          <g>
            <rect x={6} y={8} width={14} height={9} fill="none" {...S} />
            <line x1={8} y1={11} x2={18} y2={11} {...S} stroke={SOFT} />
            <line x1={8} y1={14} x2={15} y2={14} {...S} stroke={SOFT} />
          </g>
        }
      />
      <Lead a={iso([66, 10, 46])} b={iso([110, -14, 76])} />
      <Signal x={iso([118, 40, 28])[0] + 14} y={iso([118, 40, 28])[1] - 8} dir={-30} />
      <Card at={[100, -36, 98]} title="Out for delivery" line="Order 4821 · today" status="ok" w={84} />
    </>
  )
}

function Travel() {
  return (
    <>
      <Guides x1={126} y1={70} />
      {/* A standing suitcase: body, ribs, handle and wheels */}
      <Box
        at={[0, 20, 0]}
        w={62}
        d={26}
        h={74}
        hatch
        front={
          <g>
            {[16, 31, 46].map((x) => (
              <line key={x} x1={x} y1={8} x2={x} y2={68} {...S} stroke={SOFT} />
            ))}
            <line x1={0} y1={12} x2={62} y2={12} {...S} />
          </g>
        }
      />
      <Plane on="front" at={[20, 33, 86]}>
        <path d="M0 12 L0 2 Q0 0 2 0 L20 0 Q22 0 22 2 L22 12" fill="none" {...S} strokeWidth={1.6} />
      </Plane>
      <Cylinder c={[6, 44, -3]} r={3.5} h={3} fill={INK} />
      <Cylinder c={[56, 44, -3]} r={3.5} h={3} fill={INK} />
      {/* A room key tag on the floor */}
      <Box
        at={[82, 40, 0]}
        w={30}
        d={18}
        h={3}
        top={
          <g>
            <circle cx={6} cy={9} r={2.5} fill="none" {...S} />
            <line x1={12} y1={7} x2={26} y2={7} {...S} stroke={SOFT} />
            <line x1={12} y1={11} x2={22} y2={11} {...S} stroke={SOFT} />
          </g>
        }
      />
      <Lead a={iso([62, 20, 74])} b={iso([96, -6, 96])} />
      <Signal x={iso([112, 50, 6])[0] + 12} y={iso([112, 50, 6])[1] - 8} dir={-30} />
      <Card at={[86, -28, 118]} title="Check-in 14:00" line="Room 304 · 2 nights" status="ok" w={80} />
    </>
  )
}

function Financial() {
  return (
    <>
      <Guides x1={160} y1={92} />
      {/* A bank card lying flat, with its chip and number */}
      <Box
        at={[0, 0, 0]}
        w={86}
        d={54}
        h={3}
        hatch
        top={
          <g>
            <rect x={0} y={10} width={86} height={8} fill={SIDE} {...S} />
            <rect x={10} y={26} width={14} height={11} rx={2} fill={FRONT} {...S} />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={32 + i * 13} y1={44} x2={41 + i * 13} y2={44} {...S} stroke={SOFT} />
            ))}
          </g>
        }
      />
      {/* Coin stacks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Cylinder key={i} c={[110, 40, i * 5]} r={13} h={5} fill={i === 4 ? PAPER : FRONT} />
      ))}
      {[0, 1].map((i) => (
        <Cylinder key={i} c={[136, 66, i * 5]} r={13} h={5} fill={i === 1 ? PAPER : FRONT} />
      ))}
      <Lead a={iso([110, 30, 26])} b={iso([128, -10, 74])} />
      <Signal x={iso([86, 10, 3])[0] + 10} y={iso([86, 10, 3])[1] - 12} dir={-40} />
      <Card at={[120, -34, 96]} title="Paid $62.10" line="Card ending 4271" status="ok" w={78} />
    </>
  )
}

const SCENES: Record<string, () => React.ReactElement> = {
  healthcare: Healthcare,
  education: Education,
  retail: Retail,
  travel: Travel,
  "financial-services": Financial,
}

/** Each scene's drawn area, padded (measured from the drawings). */
const VIEW: Record<string, string> = {
  healthcare: "-98 -51 278 167",
  education: "-117 -44 334 178",
  retail: "-73 -70 268 176",
  travel: "-72 -93 244 195",
  "financial-services": "-91 -57 296 187",
}

/** One industry's illustration; place it inside an element with the `group/ind` class. */
export function IndustryArt({ slug, className }: { slug: string; className?: string }) {
  const Scene = SCENES[slug]
  if (!Scene) return null
  return (
    <svg aria-hidden viewBox={VIEW[slug]} className={cn("overflow-visible", className)}>
      <defs>
        <pattern id="ind-hatch" width={3.5} height={3.5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={3.5} height={3.5} fill={PAPER} />
          <line x1={0} y1={0} x2={0} y2={3.5} stroke={SOFT} strokeWidth={0.8} />
        </pattern>
      </defs>
      <Scene />
    </svg>
  )
}
