import { UseCaseVignette } from "@/components/sections/use-case-vignettes"
import type { useCases } from "@/content/platform"

type UseCase = (typeof useCases)[number]

/** Where the halftone dots are densest, so neighbouring cards don't repeat. */
const FOCUS: Record<UseCase["visual"], string> = {
  collections: "15% 20%",
  booking: "85% 15%",
  leads: "80% 85%",
  support: "20% 85%",
  renewals: "50% 0%",
  surveys: "100% 50%",
}

/**
 * One use-case card: a single, full-size result card on a plain surface, so
 * the outcome reads at a glance. Hover or focus reveals the one exchange from
 * the call that led to it.
 */
export function UseCaseStory({ useCase }: { useCase: UseCase }) {
  const [first, second] = useCase.call
  return (
    <article
      tabIndex={0}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-line bg-background outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {/* Stage */}
      <div aria-hidden className="relative isolate flex h-72 items-center justify-center overflow-hidden bg-surface p-6">
        {/* Halftone: a dot grid fading out from one focal point. */}
        <span
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle,var(--color-ink-muted)_0.9px,transparent_1.1px)] bg-size-[7px_7px] opacity-50"
          style={{
            maskImage: `radial-gradient(ellipse 75% 85% at ${FOCUS[useCase.visual]}, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse 75% 85% at ${FOCUS[useCase.visual]}, black 0%, transparent 100%)`,
          }}
        />
        <div className="scale-95 transition-[transform,opacity] duration-300 ease-(--ease-out) group-hover:-translate-y-2 group-hover:opacity-30 group-focus-visible:-translate-y-2 group-focus-visible:opacity-30">
          <UseCaseVignette kind={useCase.visual} />
        </div>

        {/* The exchange behind the result, on hover / focus */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 flex-col gap-1.5 text-[12px] leading-snug text-foreground opacity-0 transition-[transform,opacity] duration-300 ease-(--ease-out) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {[first, second].map((l) => (
            <span
              key={l.text}
              className={
                l.who === "agent"
                  ? "max-w-[85%] self-start rounded-md border border-line bg-background px-2.5 py-1.5 shadow-sm"
                  : "max-w-[85%] self-end rounded-md bg-foreground px-2.5 py-1.5 text-background shadow-sm"
              }
            >
              {l.text}
            </span>
          ))}
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col gap-1.5 border-t border-line p-5">
        <h3 className="text-body font-medium">{useCase.title}</h3>
        <p className="text-small text-ink-secondary">{useCase.body}</p>
        <p className="mt-auto pt-2 font-mono text-label text-ink-muted">→ {useCase.result}</p>
      </div>
    </article>
  )
}
