import { ArrowCounterClockwiseIcon, ChatCircleTextIcon, CheckIcon, PhoneIcon, PlusIcon, WarningCircleIcon, WrenchIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/testing, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge).
 * Fictional data (Halden Energy, Ria, Maya Patel). Tool names, versions and
 * run numbers are illustrative.
 */

const AMBER = "text-[oklch(0.8_0.14_70)]"

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

function Fail({ children }: { children: React.ReactNode }) {
  return (
    <span className={cn("flex items-center gap-1 text-[11px]", AMBER)}>
      <XIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

function Turn({ n, who, children, dim = false }: { n: number; who: string; children: React.ReactNode; dim?: boolean }) {
  return (
    <div className={cn("grid grid-cols-[2.5rem_3.5rem_1fr] items-baseline gap-2", dim && "text-(--ui-muted)")}>
      <span className="font-mono text-[10.5px] text-(--ui-muted)">T{n}</span>
      <span className="text-[11px] text-(--ui-muted)">{who}</span>
      <span>{children}</span>
    </div>
  )
}

/** Spot checks: the expected reply and tool call at one turn. */
export function SpotCheckScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Scenario · balance enquiry" aside={<UiPill>Spot check</UiPill>}>
      <UiCard className="gap-2">
        <UiLabel>Conversation so far</UiLabel>
        <Turn n={1} who="Ria" dim>
          Hi, this is Ria from Halden Energy. How can I help?
        </Turn>
        <Turn n={2} who="Customer" dim>
          What do I owe this month?
        </Turn>
        <Turn n={3} who="Ria">
          You owe $142.00, due on 4 March.
        </Turn>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Expected at turn 3</UiLabel>
          <Ok>Passed on v13</Ok>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-(--ui-line) px-3 py-2">
          <WrenchIcon className="size-3.5 text-(--ui-muted)" />
          <span className="font-mono text-[11.5px]">get_balance(account_id)</span>
          <span className="ml-auto">
            <Ok>Called</Ok>
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-(--ui-line) px-3 py-2">
          <span className="text-[11px] text-(--ui-muted)">Reply mentions</span>
          <span className="rounded bg-(--ui-raised) px-1.5 py-px font-mono text-[11.5px]">$142.00</span>
          <span className="rounded bg-(--ui-raised) px-1.5 py-px font-mono text-[11.5px]">due 4 March</span>
          <span className="ml-auto">
            <Ok>Matched</Ok>
          </span>
        </div>
      </UiCard>
    </UiWindow>
  )
}

/** Test suites and versions: every scenario against a draft before publishing. */
export function SuiteScreen({ className }: { className: string }) {
  const versions = [
    { v: "v13", state: "Draft", note: "Shorter greeting, new refund policy", result: "118 of 120", ok: false },
    { v: "v12", state: "Live", note: "Hindi replies for billing", result: "117 of 117", ok: true },
    { v: "v11", state: "", note: "Card payments", result: "112 of 112", ok: true },
  ]
  return (
    <UiWindow className={className} title="Ria · Billing · versions" aside={<UiPill live>v12 live</UiPill>}>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Billing suite · v13 draft</UiLabel>
          <span className="text-[11px] text-(--ui-muted)">120 scenarios</span>
        </div>
        <div className="flex h-1.5 overflow-hidden rounded-full bg-(--ui-raised)">
          <span className="h-full bg-(--ui-live)" style={{ width: "98.3%" }} />
          <span className="h-full bg-[oklch(0.8_0.14_70)]" style={{ width: "1.7%" }} />
        </div>
        <div className="flex items-center gap-4 text-[11.5px]">
          <Ok>118 passed</Ok>
          <Fail>2 failed</Fail>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-(--ui-muted)">
            <WarningCircleIcon className={cn("size-3", AMBER)} />2 to fix before publishing
          </span>
        </div>
      </UiCard>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[3rem_1fr_6rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Version</span>
          <span>Notes</span>
          <span className="text-right">Suite</span>
        </div>
        {versions.map((x) => (
          <div key={x.v} className="grid grid-cols-[3rem_1fr_6rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="font-mono text-[11.5px]">{x.v}</span>
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate">{x.note}</span>
              {x.state && <span className={cn("shrink-0 rounded-full px-2 py-px text-[10.5px]", x.state === "Live" ? "bg-(--ui-live)/15 text-(--ui-live)" : "bg-(--ui-raised) text-(--ui-muted)")}>{x.state}</span>}
            </span>
            <span className={cn("text-right font-mono text-[11px]", x.ok ? "text-(--ui-muted)" : AMBER)}>{x.result}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Never-again tests: a real turn becomes a scenario, then is replayed. */
export function NeverAgainScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Conversation · Maya Patel" aside={<UiPill>Real call · 12 Mar</UiPill>}>
      <UiCard className="gap-2">
        <Turn n={4} who="Maya" dim>
          So what&apos;s the corrected amount?
        </Turn>
        <Turn n={5} who="Ria">
          Your corrected bill is <span className={cn("underline decoration-wavy underline-offset-4", "decoration-[oklch(0.8_0.14_70)]")}>$26.10</span>.
        </Turn>
        <div className="mt-1 flex items-center gap-1.5 pl-[6.5rem]">
          <span className="flex items-center gap-1 rounded-md bg-(--ui-raised) px-2 py-1 text-[11px]">
            <PlusIcon className="size-3" />
            Create scenario
          </span>
          <span className="flex items-center gap-1 rounded-md border border-(--ui-line) px-2 py-1 text-[11px] text-(--ui-muted)">
            <ArrowCounterClockwiseIcon className="size-3" />
            Re-run this turn
          </span>
        </div>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Re-run on v13 draft</UiLabel>
          <Ok>Correct amount</Ok>
        </div>
        <p className="text-[12.5px]">Your corrected bill is $62.10, due on the 4th.</p>
      </UiCard>
      <UiCard className="flex-row items-center gap-3 py-3">
        <CheckIcon weight="bold" className="size-3.5 text-(--ui-live)" />
        <span>Added to the Billing suite</span>
        <span className="ml-auto text-[11px] text-(--ui-muted)">Checked on every version</span>
      </UiCard>
    </UiWindow>
  )
}

/** Try it now: call or chat with sample data, logs alongside. */
export function TryItScreen({ className }: { className: string }) {
  const sample: [string, string][] = [
    ["customer_name", "Maya Patel"],
    ["balance_due", "$62.10"],
    ["due_date", "4 March"],
  ]
  return (
    <UiWindow className={className} title="Ria · Billing · test" aside={<UiPill>v13 draft</UiPill>}>
      <div className="flex gap-1 self-start rounded-full bg-(--ui-raised) p-0.5 text-[11.5px]">
        <span className="flex items-center gap-1.5 rounded-full bg-(--ui-panel) px-3 py-1">
          <PhoneIcon className="size-3" />
          Call
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 text-(--ui-muted)">
          <ChatCircleTextIcon className="size-3" />
          Chat
        </span>
      </div>
      <UiCard className="gap-1.5">
        <UiLabel>Sample data</UiLabel>
        {sample.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-(--ui-muted)">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Test call · 0:38</UiLabel>
          <UiPill live>Connected</UiPill>
        </div>
        <p className="text-[12.5px]">Hi Maya, this is Ria from Halden Energy. Your bill of $62.10 is due on the 4th. Would you like to pay it now?</p>
        <span className="font-mono text-[10.5px] text-(--ui-muted)">log · get_balance → 200 · 212ms</span>
      </UiCard>
    </UiWindow>
  )
}
