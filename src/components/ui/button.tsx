import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Interactive controls are fully rounded (see shape rule in globals.css).
// Press feedback: scale 0.97 on :active, 160ms ease-out on transform only.
const baseButtonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border font-medium whitespace-nowrap select-none outline-none transition-[transform,background-color,border-color,color] duration-150 ease-(--ease-out) active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/88",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-line",
        outline:
          "border-line-strong bg-background text-foreground hover:bg-surface",
        ghost: "border-transparent text-foreground hover:bg-secondary",
        link: "border-transparent rounded-none px-0 text-foreground underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        sm: "h-8 px-3.5 text-small",
        default: "h-10 px-[1.125rem] text-small",
        // One CTA size site-wide (header, hero, sections): lg is kept as an alias.
        lg: "h-10 px-[1.125rem] text-small",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Use this for links styled as buttons. cva only concatenates classes, so
 * the result is passed through cn() to let a `className` override win.
 */
function buttonVariants(opts?: Parameters<typeof baseButtonVariants>[0]) {
  return cn(baseButtonVariants(opts))
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof baseButtonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
