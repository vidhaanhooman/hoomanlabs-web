import { cn } from "@/lib/utils"

/** Cursor-style soft container: surface fill, no border, no shadow. */
export function Panel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-md bg-surface", className)} {...props} />
}
