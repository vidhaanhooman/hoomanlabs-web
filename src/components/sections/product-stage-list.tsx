import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { StageScreen } from "@/components/product/stage-screen"
import type { ProductStage } from "@/content/products"
import type { SectionId } from "@/content/sections"
import { cn } from "@/lib/utils"

export const pad = (n: number) => String(n).padStart(2, "0")

const COLS: Record<number, string> = { 3: "lg:grid-cols-3", 5: "lg:grid-cols-5" }

/** Mono corner labels over a hairline, then the stage headline and body. */
export function StageHeader({
  productName,
  label,
  range,
  headline,
  body,
}: {
  productName: string
  label: string
  range: string
  headline: string
  body: string
}) {
  return (
    <>
      <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-label text-ink-muted">
        <span>{productName}</span>
        <span>
          {label} · {range}
        </span>
      </div>
      <div className="mt-10 flex max-w-[44rem] flex-col gap-3">
        <h2 className="text-h2 font-normal">{headline}</h2>
        <p className="text-body text-ink-secondary">{body}</p>
      </div>
    </>
  )
}

const SCREEN = "absolute inset-x-[4%] top-[6%] bottom-[6%] z-10 sm:inset-x-[8%] lg:inset-x-[12%]"

/**
 * Lighter stage block (Fin-inspired): mono corner labels, stacked heading,
 * one big plain panel with a LIGHT product screen, then the items as numbered text
 * columns separated by hairlines. No cards, no extra dark snippets.
 *
 * `start` is the number of the first item, so numbering runs 01-12 across
 * Build, Ship and Improve.
 */
export function ProductStageList({
  stage,
  start,
  productName,
}: {
  stage: ProductStage
  start: number
  productName: string
}) {
  const end = start + stage.items.length - 1
  return (
    <Section id={`product-${stage.id}` as SectionId} className="scroll-mt-32 lg:scroll-mt-16">
      <Container>
        <StageHeader
          productName={productName}
          label={stage.label}
          range={`${pad(start)}–${pad(end)}`}
          headline={stage.headline}
          body={stage.body}
        />

        <div className="relative isolate mt-10 aspect-[4/3] overflow-hidden rounded-md sm:aspect-[16/9] lg:aspect-[5/2]">
          {/* Imagery lives in the hero only; stages stay quiet on a plain panel. */}
          <div className="absolute inset-0 -z-10 rounded-md border border-line bg-surface" />
          <StageScreen visual={stage.hero} light className={SCREEN} />
        </div>

        <ol className={cn("mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2", COLS[stage.items.length] ?? "lg:grid-cols-4")}>
          {stage.items.map((it, i) => (
            <li key={it.title} className="flex flex-col gap-2 border-t border-line pt-4">
              <span className="font-mono text-label text-ink-muted tabular-nums">{pad(start + i)}</span>
              <h3 className="flex items-center gap-2 text-body font-medium">
                {it.title}
                {it.beta && (
                  <span className="rounded-full border border-line-strong px-1.5 py-px text-label font-normal text-ink-secondary">
                    Beta
                  </span>
                )}
              </h3>
              <p className="text-small text-ink-secondary">{it.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
