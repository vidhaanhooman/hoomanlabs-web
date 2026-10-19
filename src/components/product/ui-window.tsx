import { cn } from "@/lib/utils"

/**
 * The frame for dark product-screen recreations on Platform pages: a title
 * bar and a body in the `.ui-dark` style. Takes the window class from the
 * page (the STAGE / SCREEN_BLEED recipe); content keeps to the part left
 * visible when the window runs past the stage's right edge.
 */
export function UiWindow({ className, title, aside, children }: { className: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div aria-hidden className={cn("ui-dark flex flex-col overflow-hidden text-[12px] leading-[1.55]", className)}>
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-(--ui-line) px-4 pr-[22%] text-(--ui-muted)">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/10" />
          ))}
        </span>
        <span className="ml-1 text-(--ui-text)">{title}</span>
        {aside && <span className="ml-auto">{aside}</span>}
      </div>
      <div
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-5 pr-[22%]"
        style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent)" }}
      >
        {children}
      </div>
    </div>
  )
}

/** Status tones: ok / fail / warn get a tint of their colour, with a dot. */
export type UiTone = "ok" | "fail" | "warn"
const TONE: Record<UiTone, string> = {
  ok: "bg-(--ok)/18 text-(--ok-fg) [--dot:var(--ok)]",
  fail: "bg-(--fail)/18 text-(--fail-fg) [--dot:var(--fail)]",
  warn: "bg-(--warn)/18 text-(--warn-fg) [--dot:var(--warn)]",
}

/**
 * The one status pill for product screens. Plain (raised fill), `live` (a
 * green dot, for title bars), or a `tone` (tinted, for pass / fail / warn).
 */
export function UiPill({ children, live = false, tone, dot = true, className }: { children: React.ReactNode; live?: boolean; tone?: UiTone; dot?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] whitespace-nowrap transition-colors duration-300",
        tone ? TONE[tone] : "bg-(--ui-raised) text-(--ui-text)",
        className
      )}
    >
      {live && !tone && <span className="size-1.5 rounded-full bg-(--ui-live)" />}
      {tone && dot && <span aria-hidden className="size-1.5 rounded-full bg-(--dot)" />}
      {children}
    </span>
  )
}

/** A bordered card inside a window. */
export function UiCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-2.5 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5", className)}>{children}</div>
}

/** A mono, uppercase label. */
export function UiLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] tracking-wide text-(--ui-muted) uppercase">{children}</span>
}

/**
 * A single piece of product (a card, a menu, a record) floating on the grey
 * stage, for Chapter tiles. Sized to its content, never a whole window.
 */
export function UiFloat({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "ui-dark flex w-full max-w-[24rem] flex-col gap-2.5 rounded-lg border border-black/10 dark:border-white/10 p-4 text-[12px] leading-[1.55] shadow-[0_1px_2px_oklch(0.2_0_0/0.12),0_12px_28px_-14px_oklch(0.2_0_0/0.35)]",
        className
      )}
    >
      {children}
    </div>
  )
}
