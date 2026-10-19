import { cn } from "@/lib/utils"
import { UiPill } from "@/components/product/ui-window"

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

/** Status pill: the shared UiPill under the older tone names (live, muted, warn, bad). */
export function Pill({ tone = "muted", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  if (tone === "live") return <UiPill live className={className}>{children}</UiPill>
  if (tone === "warn") return <UiPill tone="warn" className={className}>{children}</UiPill>
  if (tone === "bad") return <UiPill tone="fail" className={className}>{children}</UiPill>
  return <UiPill className={cn("text-(--ui-muted)", className)}>{children}</UiPill>
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
export const WINDOW_CHROME = "rounded-md border border-black/10 dark:border-white/10 shadow-[0_20px_50px_-24px_oklch(0.25_0_0/0.45)]"
