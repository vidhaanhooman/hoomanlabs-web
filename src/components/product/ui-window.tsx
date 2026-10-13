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

/** A small status pill for window title bars. */
export function UiPill({ children, live = false }: { children: React.ReactNode; live?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[11px] text-(--ui-text)">
      {live && <span className="size-1.5 rounded-full bg-(--ui-live)" />}
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
