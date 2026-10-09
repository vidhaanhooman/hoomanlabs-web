import { PauseIcon, PlayIcon } from "@phosphor-icons/react/dist/ssr"

import { ScreenShell } from "@/components/product/ui-bits"
import { cn } from "@/lib/utils"

// Fictional demo voices.
const VOICES = [
  { name: "Ria", lang: "British English", playing: true },
  { name: "Arjun", lang: "Hindi", playing: false },
  { name: "Lucía", lang: "Spanish", playing: false },
]

/** Platform small cell: voice picker, one voice playing. Only the waveform moves. */
export function VoicesScreen({ className }: { className?: string }) {
  return (
    <ScreenShell className={cn("p-2.5", className)}>
      <ul className="flex flex-col gap-1.5">
        {VOICES.map((v) => (
          <li
            key={v.name}
            className={cn(
              "flex items-center gap-2.5 rounded-md border px-2.5 py-2",
              v.playing ? "border-(--ui-live)/40 bg-(--ui-raised)" : "border-(--ui-line) bg-(--ui-panel)"
            )}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-(--ui-text) text-(--ui-bg)">
              {v.playing ? <PauseIcon weight="fill" className="size-3" /> : <PlayIcon weight="fill" className="size-3" />}
            </span>
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate font-medium">{v.name}</span>
              <span className="truncate text-[11px] text-(--ui-muted)">{v.lang}</span>
            </span>
            {v.playing && (
              <span className="ui-wave flex h-3.5 items-end gap-[2px]" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="block h-full w-[2px] rounded-full bg-(--ui-live)" />
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </ScreenShell>
  )
}
