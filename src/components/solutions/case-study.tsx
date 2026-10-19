import { Panel } from "@/components/layout/panel"
import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { TonePill } from "@/components/solutions/bits"
import type { Industry } from "@/content/industries"
import { SCREEN_BLEED, STAGE } from "@/lib/recipes"

/**
 * One small case study per industry, as the Platform pages' feature panel:
 * on the left the company and its use case, a one-line result, before and
 * with a Hooman, and three figures; on the right that team's day in the
 * product (a dark screen on the grey stage: three counts and the list with
 * each record's status). The company, people and figures are fictional
 * samples, marked Sample.
 */
export function CaseStudy({ industry: x }: { industry: Industry }) {
  const s = x.story
  const sc = x.screen
  return (
    <Panel className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[2fr_3fr] lg:gap-0 lg:p-3">
      <div className="flex flex-col justify-between gap-8 px-2 pt-4 sm:px-4 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-4">
          <span className="flex flex-wrap items-baseline gap-x-2 text-small text-ink-muted">
            <span className="text-foreground">{s.company}</span>
            <span>·</span>
            <span>{x.jobs[0].name}</span>
            <span className="font-mono text-label">· Sample</span>
          </span>
          <h3 className="text-h3 font-normal text-balance">{s.title}</h3>
        </div>
        <div className="flex flex-col gap-5">
          {[
            { label: "Before", body: s.before },
            { label: "With a Hooman", body: s.after },
          ].map((b) => (
            <div key={b.label} className="flex flex-col gap-1.5">
              <span className="font-mono text-label text-ink-muted">{b.label}</span>
              <p className="text-small text-ink-secondary">{b.body}</p>
            </div>
          ))}
        </div>
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6">
          {s.results.map((r) => (
            <div key={r.label} className="flex flex-col gap-1.5">
              <dt className="order-2 text-small text-ink-secondary">{r.label}</dt>
              <dd className="text-h3 leading-none font-normal tabular-nums">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={`${STAGE} aspect-[4/3] lg:aspect-auto lg:min-h-[34rem]`}>
        <UiWindow className={SCREEN_BLEED} title={sc.title} aside={<UiPill live>Live</UiPill>}>
          <div className="grid grid-cols-3 gap-2.5">
            {sc.stats.map((t) => (
              <UiCard key={t.label} className="gap-1">
                <UiLabel>{t.label}</UiLabel>
                <span className="text-[18px] text-(--ui-text) tabular-nums">{t.value}</span>
              </UiCard>
            ))}
          </div>
          <div className="flex flex-col rounded-lg border border-(--ui-line)">
            <span className="grid grid-cols-[1fr_1.2fr_auto] gap-3 border-b border-(--ui-line) px-3.5 py-2">
              <UiLabel>Name</UiLabel>
              <UiLabel>Detail</UiLabel>
              <UiLabel>Status</UiLabel>
            </span>
            {sc.rows.map((r) => (
              <span key={r.name} className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
                <span className="truncate text-(--ui-text)">{r.name}</span>
                <span className="truncate text-(--ui-muted)">{r.detail}</span>
                <TonePill tone={r.tone}>{r.status}</TonePill>
              </span>
            ))}
          </div>
        </UiWindow>
      </div>
    </Panel>
  )
}
