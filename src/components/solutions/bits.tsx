import { UiFloat, UiLabel, UiPill } from "@/components/product/ui-window"
import type { JobUi, Tone } from "@/content/industries"

/**
 * Small pieces shared by the Solutions hub and the industry pages: the
 * split section header (as Platform chapters: the point on the left, one
 * line on the right, bottoms aligned), and one record floating on the grey
 * stage, for use-case tiles and hub cards.
 */

export function SplitHeader({ title, line }: { title: string; line: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
      <h2 className="max-w-[18ch] text-h2 font-normal">{title}</h2>
      <p className="max-w-[44ch] text-body-lg text-ink-secondary">{line}</p>
    </div>
  )
}

export function TonePill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return tone === "live" ? <UiPill live>{children}</UiPill> : <UiPill tone={tone}>{children}</UiPill>
}

export function RecordFloat({ ui, className }: { ui: JobUi; className?: string }) {
  return (
    <UiFloat className={className}>
      <span className="flex items-center justify-between gap-3">
        <UiLabel>{ui.label}</UiLabel>
        <TonePill tone={ui.pill.tone}>{ui.pill.text}</TonePill>
      </span>
      <span className="text-[13px] text-(--ui-text)">{ui.title}</span>
      <dl className="flex flex-col border-t border-(--ui-line)">
        {ui.rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-(--ui-line) py-1.5 last:border-0">
            <dt className="text-(--ui-muted)">{k}</dt>
            <dd className="text-(--ui-text)">{v}</dd>
          </div>
        ))}
      </dl>
    </UiFloat>
  )
}
