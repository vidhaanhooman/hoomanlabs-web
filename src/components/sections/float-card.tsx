"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

/**
 * The homepage's card for customer stories and industries (after
 * Peerchamber's "How it runs" cards): a soft, heavily blurred photo washed in
 * the card's own colour, with a small piece of product UI floating on it, and
 * the title and line below the card. The UI lifts a little on hover.
 */
export function FloatCard({
  href,
  label,
  src,
  tint,
  title,
  line,
  className = "aspect-[4/5]",
  children,
}: {
  href: string
  label: string
  src: string
  tint: string
  title: string
  line: string
  /** The visual's shape. */
  className?: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group/float flex w-full flex-col gap-5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <span className={`relative isolate grid place-items-center overflow-hidden rounded-xl p-8 ${className}`}>
        <FloatBackdrop src={src} tint={tint} />
        <span className="w-full max-w-[17rem] transition-transform duration-500 ease-(--ease-out) group-hover/float:-translate-y-1 motion-reduce:transition-none">{children}</span>
      </span>
      <span className="flex flex-col gap-2 px-0.5">
        <span className="text-h3 font-medium text-balance">{title}</span>
        <span className="text-body text-ink-secondary">{line}</span>
      </span>
    </Link>
  )
}

/** The card's ground: the photo blurred soft, washed in the card's colour (deeper towards the foot). Sits behind the card's content; needs `isolate` on the parent. */
export function FloatBackdrop({ src, tint }: { src: string; tint: string }) {
  return (
    <>
      <span aria-hidden className="absolute inset-0 -z-30" style={{ background: tint }} />
      {src && (
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="-z-20 scale-125 object-cover opacity-70 blur-2xl transition-transform duration-[900ms] ease-(--ease-out) group-hover/float:scale-[1.32] motion-reduce:transition-none"
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(180deg, color-mix(in oklch, ${tint} 35%, transparent), color-mix(in oklch, ${tint} 85%, transparent))` }}
      />
    </>
  )
}

/** A white panel floating on the photo, in light and dark alike. */
export function FloatPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`flex flex-col rounded-lg bg-white text-[#111] shadow-[0_12px_32px_-12px_oklch(0_0_0/0.35)] ${className}`}>{children}</span>
}
