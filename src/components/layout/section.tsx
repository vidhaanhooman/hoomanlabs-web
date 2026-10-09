import { cn } from "@/lib/utils"

import { sectionMeta, type SectionId } from "@/content/sections"

/**
 * A page section with the standard vertical rhythm (half of --section-gap top
 * and bottom; "default" and "tight" are now identical). `spacing="none"` lets a
 * section own its padding (e.g. the hero). Renders a draft label that only
 * shows when the outline overlay is switched on.
 */
export function Section({
  id,
  spacing = "default",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  id: SectionId
  spacing?: "default" | "tight" | "none"
}) {
  const meta = sectionMeta(id)
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative",
        spacing !== "none" && "py-(--section-pad)",
        className
      )}
      {...props}
    >
      <span
        data-section-label
        aria-hidden
        className="pointer-events-none absolute top-2 left-2 z-30 items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1 font-mono text-[11px] text-background"
      >
        {meta.name}
        <span className="opacity-60">/ {meta.status}</span>
      </span>
      {children}
    </section>
  )
}
