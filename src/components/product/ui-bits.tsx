import { cn } from "@/lib/utils"

/**
 * Small shared pieces for the recreated product screens (dark `.ui-dark`
 * surfaces). Keeps window chrome, pills and labels identical across screens.
 */

export function ScreenShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("ui-dark @container flex flex-col overflow-hidden text-[13px] leading-[1.5]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ScreenBar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4", className)}>
      {children}
    </div>
  )
}

export function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("text-[11px] text-(--ui-muted)", className)}>{children}</span>
}

type Tone = "live" | "muted" | "warn" | "bad"

const TONE: Record<Tone, string> = {
  live: "border-(--ui-live)/40 text-(--ui-text) [--dot:var(--ui-live)]",
  muted: "border-(--ui-line) bg-(--ui-raised) text-(--ui-muted) [--dot:var(--ui-muted)]",
  warn: "border-[oklch(0.8_0.14_80/0.4)] text-(--ui-text) [--dot:oklch(0.8_0.14_80)]",
  bad: "border-[oklch(0.68_0.19_25/0.45)] text-(--ui-text) [--dot:oklch(0.68_0.19_25)]",
}

/** Status pill with a leading dot. */
export function Pill({ tone = "muted", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] whitespace-nowrap transition-colors duration-300",
        TONE[tone],
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-(--dot)" aria-hidden />
      {children}
    </span>
  )
}

export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-4 w-7 shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-(--ui-live)" : "bg-(--ui-raised) ring-1 ring-(--ui-line)"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-3 rounded-full bg-(--ui-text) transition-transform duration-200 ease-(--ease-out)",
          on && "translate-x-3"
        )}
      />
    </span>
  )
}

/** Shadow + border used when a screen sits on a backdrop. */
export const WINDOW_CHROME = "rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0_0/0.45)]"
