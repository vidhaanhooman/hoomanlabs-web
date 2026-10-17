import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/** Text input on Base UI, in the site's tokens. Same height as a default button. */
function Input({ className, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-line-strong bg-background px-3 text-small text-foreground outline-none transition-[border-color] duration-150 placeholder:text-muted-foreground focus-visible:border-foreground disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
