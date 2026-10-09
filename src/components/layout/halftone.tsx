/** A soft dot grid fading out from one focal point (e.g. "15% 20%"). */
export function Halftone({ focus }: { focus: string }) {
  const mask = `radial-gradient(ellipse 75% 85% at ${focus}, black 0%, transparent 100%)`
  return (
    <span
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(circle,var(--color-ink-muted)_0.9px,transparent_1.1px)] bg-size-[7px_7px] opacity-50"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  )
}
