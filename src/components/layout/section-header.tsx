import { cn } from "@/lib/utils"

/**
 * Section title. Stacked, never split left/right. Optional `aside` renders as
 * a quieter continuation in secondary ink (Cursor's two-tone pattern).
 */
export function SectionHeader({
  title,
  aside,
  align = "start",
  as: Heading = "h2",
  className,
}: {
  title: string
  aside?: string
  align?: "start" | "center"
  as?: "h2" | "h3"
  className?: string
}) {
  return (
    <Heading
      className={cn(
        "max-w-[32ch] text-h2 font-normal",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {title}
      {aside ? <span className="text-ink-secondary"> {aside}</span> : null}
    </Heading>
  )
}
