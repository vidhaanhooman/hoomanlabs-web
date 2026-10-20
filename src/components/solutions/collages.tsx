import Image from "next/image"
import { CaretUpIcon, CheckCircleIcon, CheckIcon, HandPointingIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/**
 * The industry moments' visuals, after PolyAI: they float on the white page
 * and break out of their frame, cards overlapping the edges with soft
 * shadows, in the site green at full strength. A photo collage (a customer
 * on the call, the transcript card spilling over one
 * corner, optionally what got done over the other) and a data collage (a
 * light chart, a call-reason dropdown over its side, two stat cards over its
 * foot). Photos: public/art/solutions/<slug>-<n>.webp. Sample data.
 */

const LIFT = "shadow-[0_2px_6px_oklch(0.2_0_0/0.06),0_32px_64px_-24px_oklch(0.2_0_0/0.32)]"

type Line = { who: string; at: string; text: string; mark?: string[] }

/** The text with each marked phrase highlighted in the site green. */
function Marked({ text, mark = [] }: { text: string; mark?: string[] }) {
  if (!mark.length) return <>{text}</>
  const re = new RegExp(`(${mark.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")
  return (
    <>
      {text.split(re).map((part, i) =>
        mark.some((m) => m.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="rounded-sm bg-(--ok)/35 px-1 text-foreground">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

/** The big transcript card: avatar, time, what was said. */
function SaidCard({ line, className }: { line: Line; className?: string }) {
  return (
    <div className={cn("flex gap-3 rounded-md bg-background p-4 sm:gap-4 sm:p-7", LIFT, className)}>
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-small text-background sm:size-10 sm:text-body">
        {line.who.charAt(0)}
      </span>
      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="font-mono text-label text-ink-muted">
          {line.who} · {line.at}
        </span>
        <span className="text-body leading-relaxed text-ink-secondary sm:text-body-lg">
          <Marked text={line.text} mark={line.mark} />
        </span>
      </span>
    </div>
  )
}

/** What got done, with a tick. */
function DoneCard({ done, className }: { done: { title: string; detail: string }; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-md bg-background px-5 py-4", LIFT, className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--ok) text-background">
        <CheckIcon aria-hidden weight="bold" className="size-4" />
      </span>
      <span className="flex flex-col">
        <span className="text-body">{done.title}</span>
        <span className="text-small text-ink-muted">{done.detail}</span>
      </span>
    </div>
  )
}

/**
 * A photo with the transcript card spilling over one lower corner ("right"
 * or "left"); with `done`, what got done floats over the opposite top corner.
 */
export function PhotoCollage({ image, line, done, side = "right" }: { image?: string; line: Line; done?: { title: string; detail: string }; side?: "right" | "left" }) {
  const right = side === "right"
  return (
    <div className={cn("relative pb-16 sm:pb-28", right ? "pr-4 sm:pr-12" : "pl-4 sm:pl-12", done && "pt-8")}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-md bg-surface">
        {image && <Image src={image} alt="" fill sizes="(min-width: 1024px) 44rem, 100vw" className="object-cover" />}
      </div>
      <div className={cn("absolute bottom-0 w-[min(26rem,92%)]", right ? "right-0" : "left-0")}>
        <SaidCard line={line} />
      </div>
      {done && (
        <div className={cn("absolute top-0", right ? "left-0 sm:-left-6" : "right-0 sm:-right-6")}>
          <DoneCard done={done} />
        </div>
      )}
    </div>
  )
}

/** A light chart with a trend line, a call-reason dropdown over its side and two stat cards over its foot. */
export function ChartCollage({ reasons, picked = 0, stats }: { reasons: string[]; picked?: number; stats: { label: string; value: string }[] }) {
  const bars = [30, 44, 66, 84, 56, 66, 90, 56]
  const line = [40, 34, 58, 68, 50, 54, 46, 52]
  const W = 100 / bars.length
  return (
    <div className="relative pt-6 pb-24 pl-12 sm:pb-28 sm:pl-28">
      <div className={cn("relative aspect-[5/4] rounded-md bg-background px-8 pt-12 pb-8 sm:px-12", LIFT)}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full" aria-hidden>
          {bars.map((h, i) => (
            <rect key={i} x={i * W + W * 0.4} y={100 - h} width={W * 0.2} height={h} className="fill-foreground" />
          ))}
          <polyline points={line.map((v, i) => `${i * W + W / 2},${100 - v}`).join(" ")} fill="none" stroke="var(--ok)" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
        </svg>
      </div>

      <div className={cn("absolute top-0 left-0 w-[min(17rem,58%)] overflow-hidden rounded-md bg-background", LIFT)}>
        <div className="flex items-center justify-between px-4 py-3 text-small sm:px-5 sm:py-4 sm:text-body">
          Call reason
          <CaretUpIcon aria-hidden className="size-4" />
        </div>
        <ul className="flex flex-col gap-1 bg-surface p-2 text-small sm:p-3 sm:text-body">
          {reasons.map((r, i) => (
            <li key={r} className={cn("relative truncate rounded-md px-3 py-2 sm:py-2.5", i === picked ? "bg-(--ok)/35 text-foreground" : "text-ink-secondary")}>
              {r}
              {i === picked && <HandPointingIcon aria-hidden weight="fill" className="absolute top-1/2 right-4 hidden size-5 -translate-y-1/4 text-foreground sm:block" />}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute right-0 bottom-0 flex gap-3 sm:right-8 sm:gap-4">
        {stats.slice(0, 2).map((s, i) => {
          const I = i ? CheckCircleIcon : PhoneIcon
          return (
            <div key={s.label} className={cn("flex items-center gap-3 rounded-md bg-background px-4 py-3 sm:px-6 sm:py-5", LIFT)}>
              <I aria-hidden weight="fill" className="size-6 text-(--ok)" />
              <span className="flex flex-col">
                <span className="font-mono text-label text-ink-muted">{s.label}</span>
                <span className="font-mono text-h3 leading-tight tabular-nums">{s.value}</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
