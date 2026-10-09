import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { StageScreen } from "@/components/sections/product-stage"
import type { MiniRow, ProductStage } from "@/content/products"
import type { SectionId } from "@/content/sections"
import { cn } from "@/lib/utils"

const TONE: Record<NonNullable<MiniRow["tone"]>, string> = {
  live: "border-(--ui-live)/40 text-(--ui-text) [--dot:var(--ui-live)]",
  warn: "border-[oklch(0.8_0.14_80/0.4)] text-(--ui-text) [--dot:oklch(0.8_0.14_80)]",
  muted: "border-(--ui-line) text-(--ui-muted) [--dot:var(--ui-muted)]",
}

/** Small dark product snippet: three key/value rows. */
function Mini({ rows }: { rows: MiniRow[] }) {
  return (
    <div aria-hidden className="ui-dark flex flex-col rounded-md px-3 py-1.5 text-[12px] leading-[1.4]">
      {rows.map((r) => (
        <div key={r.k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-1.5 last:border-b-0">
          <span className={cn("truncate", r.mono ? "font-mono text-(--ui-muted)" : "text-(--ui-text)/85")}>{r.k}</span>
          {r.v &&
            (r.tone ? (
              <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full border px-1.5 py-px text-[11px]", TONE[r.tone])}>
                <span className="size-1.5 rounded-full bg-(--dot)" />
                {r.v}
              </span>
            ) : (
              <span className={cn("shrink-0 tabular-nums", r.mono ? "font-mono text-(--ui-text)" : "text-(--ui-muted)")}>{r.v}</span>
            ))}
        </div>
      ))}
    </div>
  )
}

/**
 * One lifecycle stage as: stacked heading, one big painted image with the
 * stage's main screen, then a row of small cards (one per item), each with a
 * tiny product snippet, title and one line.
 */
export function ProductStageBento({ stage }: { stage: ProductStage }) {
  return (
    <Section id={`product-${stage.id}` as SectionId}>
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <p className="text-small text-ink-muted">{stage.label}</p>
          <h2 className="text-h2 font-normal">{stage.headline}</h2>
          <p className="text-body text-ink-secondary">{stage.body}</p>
        </div>

        {/* Big image */}
        <div className="relative isolate mt-10 aspect-[4/3] overflow-hidden rounded-md sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image src={stage.backdrop} alt="" fill sizes="(min-width: 1300px) 1300px, 100vw" className="-z-10 object-cover" />
          <StageScreen
            visual={stage.hero}
            className="absolute inset-x-[5%] top-[8%] bottom-[10%] z-10 sm:inset-x-[14%] lg:inset-x-[22%]"
          />
        </div>

        {/* Small cards */}
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stage.items.map((it) => (
            <li key={it.title}>
              <Panel className="flex h-full flex-col gap-4 p-3">
                <Mini rows={it.mini} />
                <div className="flex flex-col gap-1 px-1 pb-1">
                  <h3 className="flex items-center gap-2 text-body font-medium">
                    {it.title}
                    {it.beta && (
                      <span className="rounded-full border border-line-strong px-1.5 py-px text-label font-normal text-ink-secondary">
                        Beta
                      </span>
                    )}
                  </h3>
                  <p className="text-small text-ink-secondary">{it.body}</p>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
