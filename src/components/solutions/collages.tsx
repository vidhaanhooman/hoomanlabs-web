import { CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/**
 * The industry pages' visuals: outcomes only, no photos of people, no
 * accent colour and no sample figures. An outcome card (the call's outcome
 * and what gets written back) and an outcome panel (one change's outcome on
 * the plain grey stage).
 */

const LIFT = "shadow-[0_2px_6px_oklch(0.2_0_0/0.06),0_32px_64px_-24px_oklch(0.2_0_0/0.32)]"

type Outcome = { title: string; detail: string }

/** What got done, with a tick. */
export function OutcomeLine({ outcome, className }: { outcome: Outcome; className?: string }) {
  return (
    <p className={cn("flex items-start gap-3 text-body", className)}>
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
        <CheckIcon aria-hidden weight="bold" className="size-3" />
      </span>
      <span className="flex flex-col">
        <span>{outcome.title}</span>
        <span className="text-small text-ink-muted">{outcome.detail}</span>
      </span>
    </p>
  )
}

/** A floating card: the call's outcome, then what gets written back. */
export function OutcomeCard({ outcome, items, className }: { outcome: Outcome; items: string[]; className?: string }) {
  return (
    <div className={cn("flex w-full max-w-[24rem] flex-col gap-5 rounded-md bg-background p-6 sm:p-7", LIFT, className)}>
      <OutcomeLine outcome={outcome} />
      <ul className="flex flex-col gap-2 border-t border-line pt-4">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2 text-small text-ink-secondary">
            <CheckIcon aria-hidden className="mt-1 size-3.5 shrink-0 text-foreground" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
