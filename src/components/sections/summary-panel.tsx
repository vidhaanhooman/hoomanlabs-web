"use client"

import { ProductPanel } from "@/components/sections/how-it-works-v3"

type Row = { id: string; title: string; body: string; tab?: string }

/**
 * The platform summary on the homepage as one product panel (like Agents,
 * Workflow and Analytics above it): the parts as rows on the left, and the
 * chosen part's graphic on a light card on the grey stage. The graphics are
 * rendered on the server and passed in by row id.
 */
export function SummaryPanel({ rows, screens }: { rows: Row[]; screens: Record<string, React.ReactNode> }) {
  return (
    <ProductPanel
      id="sl-summary"
      label="Platform"
      title="Tested, scored and connected."
      line="Everything around the agent, in the same platform."
      compact
      grouped
      rows={rows}
      media="start"
      link="See the full platform"
      linkHref="/platform"
      screen={(_, focus) => (
        <div
          key={focus}
          className="absolute inset-x-[8%] top-1/2 flex max-h-[86%] -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-line bg-background p-3 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.08),0_16px_32px_-18px_oklch(0.2_0_0/0.35)] sm:inset-x-[14%]"
        >
          {screens[focus] ?? screens[rows[0].id]}
        </div>
      )}
    />
  )
}
