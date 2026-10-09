import { cn } from "@/lib/utils"

/** Page-width container: 1300px max, responsive gutters from --gutter. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-(--container-page) px-(--gutter)", className)}
      {...props}
    />
  )
}
