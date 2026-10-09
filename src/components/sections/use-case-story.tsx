import { UseCaseVignette } from "@/components/sections/use-case-vignettes"
import type { useCases } from "@/content/platform"

type UseCase = (typeof useCases)[number]

/**
 * One use-case card: a single, full-size result card on a painted texture, so
 * the outcome reads at a glance. Hover or focus reveals the one exchange from
 * the call that led to it.
 */
export function UseCaseStory({
  useCase,
  background,
}: {
  useCase: UseCase
  background?: { src: string; filter?: string }
}) {
  const [first, second] = useCase.call
  return (
    <article
      tabIndex={0}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-line bg-background outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {/* Stage */}
      <div aria-hidden className="relative isolate flex h-64 items-center justify-center overflow-hidden bg-surface p-6">
        {background && (
          <span
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${background.src})`, filter: background.filter }}
          />
        )}

        <div className="transition-[transform,opacity] duration-300 ease-(--ease-out) group-hover:-translate-y-2 group-hover:opacity-30 group-focus-visible:-translate-y-2 group-focus-visible:opacity-30">
          <UseCaseVignette kind={useCase.visual} />
        </div>

        {/* The exchange behind the result, on hover / focus */}
        <div className="dark pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 flex-col gap-1.5 text-[12px] leading-snug text-foreground opacity-0 transition-[transform,opacity] duration-300 ease-(--ease-out) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {[first, second].map((l) => (
            <span
              key={l.text}
              className={
                l.who === "agent"
                  ? "max-w-[85%] self-start rounded-md bg-background px-2.5 py-1.5 shadow-sm"
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
