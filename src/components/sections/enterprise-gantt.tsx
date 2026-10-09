import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { enterpriseGantt, type GanttKind } from "@/content/landing"
import { cn } from "@/lib/utils"

/**
 * Gantt chart of an enterprise rollout: a week grid, one row per phase,
 * grouped by flow, with a diamond for each sign-off gate. Scrolls sideways
 * inside its own frame on narrow screens.
 */

const BAR: Record<GanttKind, string> = {
  foundation: "bg-foreground",
  access: "bg-[repeating-linear-gradient(135deg,var(--color-ink-muted)_0_4px,transparent_4px_8px)] ring-1 ring-ink-muted ring-inset",
  build: "bg-ink-secondary",
  test: "bg-line-strong",
  live: "bg-[oklch(0.62_0.15_150)]",
  run: "bg-surface ring-1 ring-line-strong ring-inset",
}


export function EnterpriseGantt() {
  const { weeks, groups, legend } = enterpriseGantt
  // Label column, week columns, then a little room so the last gate isn't clipped.
  const cols = `var(--gantt-label) repeat(${weeks}, minmax(2rem, 1fr)) 1rem`

  return (
    <Section id="enterprise-timeline">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{enterpriseGantt.title}</h2>
          <p className="text-body text-ink-secondary">{enterpriseGantt.body}</p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {legend.map((l) => (
            <li key={l.kind} className="flex items-center gap-2 text-small text-ink-secondary">
              <span className={cn("h-2.5 w-5 rounded-sm", BAR[l.kind])} />
              {l.label}
            </li>
          ))}
          <li className="flex items-center gap-2 text-small text-ink-secondary">
            <Gate />
            Sign-off gate
          </li>
        </ul>

        <div className="mt-6 overflow-x-auto rounded-md border border-line" role="figure" aria-label={enterpriseGantt.title}>
          <div className="min-w-[48rem] [--gantt-label:8.5rem] sm:min-w-[56rem] sm:[--gantt-label:13rem]">
            {/* Week header */}
            <div className="grid border-b border-line bg-surface" style={{ gridTemplateColumns: cols }}>
              <span className="sticky left-0 z-10 bg-surface px-4 py-2.5 text-label text-ink-muted">Week</span>
              {Array.from({ length: weeks }, (_, i) => (
                <span key={i} className="border-l border-line py-2.5 text-center font-mono text-label text-ink-muted tabular-nums">
                  {i + 1}
                </span>
              ))}
            </div>

            {groups.map((g) => (
              <div key={g.name} className="border-b border-line last:border-b-0">
                <div className="sticky left-0 flex w-max items-baseline gap-2 px-4 pt-4 pb-1">
                  <span className="text-small font-medium">{g.name}</span>
                  {g.note && <span className="text-label text-ink-muted">{g.note}</span>}
                </div>
                {g.rows.map((r) => (
                  <div key={r.label} className="relative grid items-center" style={{ gridTemplateColumns: cols }}>
                    <span className="sticky left-0 z-10 truncate bg-background px-4 py-2 text-small text-ink-secondary">{r.label}</span>
                    {/* Week guides */}
                    {Array.from({ length: weeks }, (_, i) => (
                      <span key={i} aria-hidden className="h-full border-l border-line/60" style={{ gridColumn: i + 2, gridRow: 1 }} />
                    ))}
                    <span
                      className="relative mx-1 flex h-4 items-center"
                      style={{ gridColumn: `${r.start + 1} / ${r.end + 2}`, gridRow: 1 }}
                    >
                      <span className={cn("h-full w-full rounded-sm", BAR[r.kind])} />
                      {r.gate && <Gate className="absolute -right-2" />}
                    </span>
                  </div>
                ))}
                <div className="h-3" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Gate({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-2.5 shrink-0 rotate-45 rounded-[1px] border-2 border-background bg-foreground ring-1 ring-foreground", className)}
    />
  )
}
