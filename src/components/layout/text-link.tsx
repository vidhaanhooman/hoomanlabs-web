import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

/** Inline "learn more" link. Arrow nudges on hover (pointer devices only). */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1 text-small font-medium text-foreground underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
      <ArrowRightIcon
        aria-hidden
        className="size-3.5 transition-transform duration-150 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/link:translate-x-0.5"
      />
    </Link>
  )
}
