import { PaintedFrame } from "@/components/layout/painted-frame";
import { UseCaseVignette } from "@/components/sections/use-case-vignettes";
import type { useCases } from "@/content/platform";
import { cn } from "@/lib/utils";

type UseCase = (typeof useCases)[number];

/** Painted textures (same family as the platform tiles and Listen). */
const SAGE = { src: "/art/backdrops/home-deploy.png" };
const DUSK = { src: "/art/backdrops/home-measure.png" };
const OCHRE = {
  src: "/art/backdrops/home-deploy.png",
  filter: "hue-rotate(-40deg) saturate(1.1) brightness(1.05)",
};
const TEXTURE: Record<UseCase["visual"], { src: string; filter?: string }> = {
  collections: SAGE,
  booking: DUSK,
  leads: OCHRE,
  support: OCHRE,
  renewals: SAGE,
  surveys: DUSK,
};

/**
 * One use-case card, built like the platform tiles: copy on the surface, then
 * a dark result card on a painted frame. Hover or focus reveals the one
 * exchange from the call that led to it.
 */
export function UseCaseStory({
  useCase,
  resultFirst = false,
}: {
  useCase: UseCase;
  /** Lead with the business result in large type, title below. */
  resultFirst?: boolean;
}) {
  const [first, second] = useCase.call;
  const texture = TEXTURE[useCase.visual];
  return (
    <article
      tabIndex={0}
      className="group flex w-full flex-col gap-5 rounded-md bg-surface p-5 outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:p-6"
    >
      {/* Copy */}
      {resultFirst ? (
        <div className="flex flex-col gap-1.5">
          <p className="text-h4 font-normal">{useCase.result}</p>
          <h3 className="font-mono text-label text-ink-muted">
            {useCase.title}
          </h3>
          <p className="text-small text-ink-secondary">{useCase.body}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-h4 font-normal">{useCase.title}</h3>
          <p className="text-small text-ink-secondary">{useCase.body}</p>
          <p className="pt-1 font-mono text-label text-ink-muted">
            → {useCase.result}
          </p>
        </div>
      )}

      {/* Painted frame with the result card */}
      <PaintedFrame
        texture={texture}
        className="mt-auto flex h-64 items-center justify-center p-4"
      >
        <div
          aria-hidden
          className="relative flex h-56 items-center justify-center"
        >
          <div className="scale-95 transition-[transform,opacity] duration-300 ease-(--ease-out) group-hover:-translate-y-2 group-hover:opacity-30 group-focus-visible:-translate-y-2 group-focus-visible:opacity-30">
            <UseCaseVignette kind={useCase.visual} theme="charcoal" />
          </div>

          {/* The exchange behind the result, on hover / focus */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 flex-col gap-1.5 text-[12px] leading-snug text-foreground opacity-0 transition-[transform,opacity] duration-300 ease-(--ease-out) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {[first, second].map((l) => (
              <span
                key={l.text}
                className={cn(
                  "max-w-[85%] rounded-md px-2.5 py-1.5 shadow-sm",
                  l.who === "agent"
                    ? "self-start border border-line bg-background"
                    : "self-end bg-foreground text-background",
                )}
              >
                {l.text}
              </span>
            ))}
          </div>
        </div>
      </PaintedFrame>
    </article>
  );
}
