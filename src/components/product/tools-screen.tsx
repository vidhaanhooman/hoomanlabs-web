import { CalendarBlankIcon, ChatTextIcon, CreditCardIcon, UserListIcon } from "@phosphor-icons/react/dist/ssr"

import { ScreenShell, Toggle } from "@/components/product/ui-bits"
import { cn } from "@/lib/utils"

// Fictional demo tools (generic systems, no vendor names).
const TOOLS = [
  { name: "CRM", action: "Look up account", icon: UserListIcon, on: true },
  { name: "Payments", action: "Transfer payment", icon: CreditCardIcon, on: true },
  { name: "SMS", action: "Send confirmation", icon: ChatTextIcon, on: true },
  { name: "Calendar", action: "Book callback", icon: CalendarBlankIcon, on: false },
]

/** Platform small cell: connected systems the agent may act in. Static. */
export function ToolsScreen({ className }: { className?: string }) {
  return (
    <ScreenShell className={cn("p-2.5", className)}>
      <ul className="flex flex-col gap-1.5">
        {TOOLS.map((t) => (
          <li
            key={t.name}
            className="flex items-center gap-2.5 rounded-md border border-(--ui-line) bg-(--ui-panel) px-2.5 py-1.5"
          >
            <t.icon className={cn("size-4 shrink-0", t.on ? "text-(--ui-text)" : "text-(--ui-muted)")} aria-hidden />
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className={cn("truncate font-medium", !t.on && "text-(--ui-muted)")}>{t.name}</span>
              <span className="truncate text-[11px] text-(--ui-muted)">{t.action}</span>
            </span>
            <Toggle on={t.on} />
          </li>
        ))}
      </ul>
    </ScreenShell>
  )
}
