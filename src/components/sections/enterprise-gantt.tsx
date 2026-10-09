import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { enterpriseGantt, type GanttOwner } from "@/content/landing"
import { cn } from "@/lib/utils"

/**
 * Gantt chart for one enterprise flow: numbered phases with their detail on
 * the left, bars shaded by owner on an 8-week timeline, and labelled sign-off
 * gates. Scrolls sideways inside its own frame on narrow screens.
 */

const BAR: Record<GanttOwner, string> = {
  us: "bg-foreground text-background",
  joint: "bg-ink-muted text-background",
  you: "bg-line-strong text-foreground",
}

const pct = (w: number) => `${(w / enterpriseGantt.weeks) * 100}%`

export function EnterpriseGantt() {
  const { weeks, rows, owners } = enterpriseGantt
  const ownerLabel = Object.fromEntries(owners.map((o) => [o.owner, o.label])) as Record<GanttOwner, string>

  // Vertical week dividers, drawn once per timeline cell.
  const guides = {
    backgroundImage: "linear-gradient(to right, var(--color-line) 1px, transparent 1px)",
    backgroundSize: `${100 / weeks}% 100%`,
  }

  return (
    <Section id="enterprise-timeline">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{enterpriseGantt.title}</h2>
          <p className="text-body text-ink-secondary">{enterpriseGantt.body}</p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-md border border-line" role="figure" aria-label={enterpriseGantt.title}>
          <div className="min-w-[46rem] [--label:14rem] sm:[--label:18rem]">
            {/* Week header */}
            <div className="grid border-b border-line bg-surface" style={{ gridTemplateColumns: "var(--label) 1fr" }}>
              <span className="sticky left-0 z-10 bg-surface px-4 py-2 text-label text-ink-muted">Phase</span>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                {Array.from({ length: weeks }, (_, i) => (
                  <span key={i} className="border-l border-line py-2 text-center font-mono text-label text-ink-muted">
                    W{i + 1}
                  </span>
                ))}
              </div>
            </div>

            {rows.map((r, i) => (
              <div
                key={r.name}
                className="grid border-b border-line last:border-b-0"
                style={{ gridTemplateColumns: "var(--label) 1fr" }}
              >
                <div className="sticky left-0 z-10 bg-background px-4 py-3">
                  <p className="text-small font-medium">
                    {i + 1}. {r.name}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-ink-muted">{r.detail}</p>
                </div>
                <div className="relative min-h-16" style={guides}>
                  {r.gateBefore && (
                    <span
                      className="absolute top-1/2 z-10 flex -translate-x-full -translate-y-1/2 items-center gap-1.5 pr-1 text-[11px] font-medium whitespace-nowrap"
                      style={{ left: pct(r.start) }}
                    >
                      {r.gateBefore}
                      <Gate />
                    </span>
                  )}
                  <span
                    className={cn(
                      "absolute top-1/2 flex h-7 -translate-y-1/2 items-center justify-center rounded-sm px-2 text-[11px] font-medium",
                      BAR[r.owner]
                    )}
                    style={{ left: pct(r.start), width: pct(r.end - r.start) }}
                  >
                    <span className="truncate">{ownerLabel[r.owner]}</span>
                  </span>
                  {r.gate && (
                    <span
                      className="absolute top-1/2 z-10 flex -translate-x-1.5 -translate-y-1/2 items-center gap-1.5 text-[11px] font-medium whitespace-nowrap"
                      style={{ left: pct(r.end) }}
                    >
                      <Gate />
                      {r.gate}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-surface px-4 py-3">
              <span className="text-label text-ink-muted">Owner</span>
              {owners.map((o) => (
                <span key={o.owner} className="flex items-center gap-2 text-small text-ink-secondary">
                  <span className={cn("h-3 w-6 rounded-sm", BAR[o.owner])} />
                  {o.label}
                </span>
              ))}
              <span className="flex items-center gap-2 text-small text-ink-secondary">
                <Gate />
                Sign-off gate
              </span>
              <span className="ml-auto text-label text-ink-muted italic">{enterpriseGantt.note}</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Gate() {
  return <span aria-hidden className="size-2.5 shrink-0 rotate-45 rounded-[1px] bg-foreground ring-2 ring-background" />
}
