import { cn } from "@/lib/utils"

/**
 * Wireframe slot for an asset that doesn't exist yet. Sized by aspect ratio
 * so the real screenshot/photo drops in later without layout shift.
 *
 * - "fill": flat grey area (backdrops, photos, logos)
 * - "frame": white surface with a hairline (product UI windows)
 */
export function Placeholder({
  label,
  variant = "fill",
  className,
  children,
}: {
  label: string
  variant?: "fill" | "frame"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label ? `Placeholder: ${label}` : undefined}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md",
        variant === "fill" && "bg-placeholder",
        variant === "frame" && "border border-line bg-background",
        className
      )}
    >
      {children}
      {label ? (
        <span className="pointer-events-none absolute bottom-2.5 left-3 font-mono text-[11px] text-ink-muted">
          {label}
        </span>
      ) : null}
    </div>
  )
}
