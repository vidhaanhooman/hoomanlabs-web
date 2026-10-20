import { CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/** The floating cards' frame: the site's product-card look (hairline border, light lift). */
const CARD = "rounded-lg border border-line bg-background shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_12px_28px_-14px_oklch(0.2_0_0/0.25)]"

/**
 * The hero's transcript card (who and when, then what they said, key words
 * highlighted) and a small done card.
 * Without a photo the stage shows its painted gradient. Sample data.
 */

type Line = { who: string; at: string; text: string; mark?: string[] }

/** The text with each marked phrase highlighted. */
function Marked({ text, mark = [] }: { text: string; mark?: string[] }) {
  if (!mark.length) return <>{text}</>
  const re = new RegExp(`(${mark.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")
  return (
    <>
      {text.split(re).map((part, i) =>
        mark.some((m) => m.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="rounded-sm bg-(--ok)/25 px-0.5 text-foreground">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

/** The floating transcript card: who and when, then what they said. */
export function TranscriptCard({ lines, className }: { lines: Line[]; className?: string }) {
  return (
    <div className={cn(CARD, "flex w-full max-w-[17rem] flex-col gap-3 p-4", className)}>
      {lines.map((l, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="font-mono text-label text-ink-muted">
            {l.who} · {l.at}
          </span>
          <span className="text-small leading-relaxed text-foreground">
            <Marked text={l.text} mark={l.mark} />
          </span>
        </div>
      ))}
    </div>
  )
}

/** What got done, as a small card with a tick. */
export function DoneCard({ title, detail, className }: { title: string; detail: string; className?: string }) {
  return (
    <div className={cn(CARD, "flex w-fit max-w-[16rem] items-start gap-2.5 px-3.5 py-3", className)}>
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-(--ok)/18 text-(--ok-fg)">
        <CheckIcon aria-hidden className="size-3" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-small text-foreground">{title}</span>
        <span className="text-label text-ink-muted">{detail}</span>
      </span>
    </div>
  )
}
