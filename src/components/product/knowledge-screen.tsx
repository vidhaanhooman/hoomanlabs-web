import { FileTextIcon, GlobeIcon, TableIcon } from "@phosphor-icons/react/dist/ssr"

import { Label, ScreenBar, ScreenShell } from "@/components/product/ui-bits"
import { cn } from "@/lib/utils"

// Fictional demo data.
const LIBRARIES = ["Billing", "Tariffs", "Policies", "Onboarding"]
const ITEMS = [
  { name: "Billing FAQ", kind: "Document", icon: FileTextIcon, updated: "2 days ago", agents: 4 },
  { name: "Tariff rates 2026", kind: "Table", icon: TableIcon, updated: "Today", agents: 3 },
  { name: "Refund policy", kind: "Document", icon: FileTextIcon, updated: "1 week ago", agents: 5 },
  { name: "Payment methods", kind: "Web page", icon: GlobeIcon, updated: "3 days ago", agents: 2 },
  { name: "Customer accounts", kind: "Table", icon: TableIcon, updated: "Live sync", agents: 4 },
  { name: "Escalation rules", kind: "Document", icon: FileTextIcon, updated: "5 days ago", agents: 6 },
]

/** Platform lead cell: knowledge libraries agents read from and write to. Static. */
export function KnowledgeScreen({ className }: { className?: string }) {
  return (
    <ScreenShell className={className}>
      <ScreenBar>
        <span className="min-w-0 truncate font-medium">Knowledge</span>
        <span className="ml-auto text-(--ui-muted)">Billing library</span>
      </ScreenBar>
      <div className="grid min-h-0 flex-1 @lg:grid-cols-[9rem_1fr]">
        <nav aria-label="Libraries" className="hidden flex-col gap-0.5 border-r border-(--ui-line) bg-(--ui-panel) p-2 @lg:flex">
          {LIBRARIES.map((lib, i) => (
            <span
              key={lib}
              className={cn("rounded-md px-2 py-1.5", i === 0 ? "bg-(--ui-raised)" : "text-(--ui-muted)")}
            >
              {lib}
            </span>
          ))}
        </nav>
        <div className="min-h-0 overflow-hidden px-4 pt-3">
          <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-(--ui-line) pb-2 @md:grid-cols-[1fr_6rem_6rem_4rem]">
            <Label>Name</Label>
            <Label className="hidden @md:block">Updated</Label>
            <Label className="hidden @md:block">Type</Label>
            <Label className="text-right">Agents</Label>
          </div>
          <ul>
            {ITEMS.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-(--ui-line) py-2 @md:grid-cols-[1fr_6rem_6rem_4rem]"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <item.icon className="size-4 shrink-0 text-(--ui-muted)" aria-hidden />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="hidden text-(--ui-muted) @md:block">{item.updated}</span>
                <span className="hidden text-(--ui-muted) @md:block">{item.kind}</span>
                <span className="text-right font-mono tabular-nums">{item.agents}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScreenShell>
  )
}
