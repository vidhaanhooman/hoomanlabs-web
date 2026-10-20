/**
 * Small pieces shared by the Solutions hub and the industry pages: the
 * split section header (as Platform chapters: the point on the left, one
 * line on the right, bottoms aligned).
 */

export function SplitHeader({ title, line }: { title: string; line: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
      <h2 className="max-w-[18ch] text-h2 font-normal">{title}</h2>
      <p className="max-w-[44ch] text-body-lg text-ink-secondary">{line}</p>
    </div>
  )
}
