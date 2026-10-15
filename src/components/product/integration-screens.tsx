import { BracketsCurlyIcon, CheckIcon, GlobeIcon, LightningIcon, PlugsConnectedIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siZendesk, siZoho, type SimpleIcon } from "simple-icons"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/integrations, recreated from the console in its
 * dark style (each takes the window class from the page; content keeps to
 * the part left visible when the window runs past the stage's right edge).
 * Fictional data (Halden Energy). API paths and payloads are illustrative.
 */

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

function Mark({ icon, letter }: { icon?: SimpleIcon; letter?: string }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white">
      {icon ? (
        <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${icon.hex}` }} aria-hidden>
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="font-mono text-[11px] font-bold text-black">{letter}</span>
      )}
    </span>
  )
}

/** Hero: what's connected. */
export function IntegrationsOverviewScreen({ className }: { className: string }) {
  const apps: { name: string; use: string; icon?: SimpleIcon; letter?: string }[] = [
    { name: "Zoho CRM", use: "Customer records · outcomes written back", icon: siZoho },
    { name: "Freshdesk", use: "Tickets from calls", letter: "F" },
    { name: "Zendesk", use: "Tickets and macros", icon: siZendesk },
    { name: "Google Calendar", use: "Bookings and callbacks", icon: siGooglecalendar },
  ]
  return (
    <UiWindow className={className} title="Settings · integrations" aside={<UiPill live>4 connected</UiPill>}>
      <UiCard className="gap-0 p-1.5">
        {apps.map((a) => (
          <div key={a.name} className="flex items-center gap-3 rounded-md px-3 py-2.5">
            <Mark icon={a.icon} letter={a.letter} />
            <span className="flex flex-col">
              <span className="text-[13px]">{a.name}</span>
              <span className="text-[11px] text-(--ui-muted)">{a.use}</span>
            </span>
            <span className="ml-auto">
              <Ok>Connected</Ok>
            </span>
          </div>
        ))}
      </UiCard>
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: LightningIcon, t: "Your APIs", d: "as skills" },
          { icon: GlobeIcon, t: "Call events", d: "to any URL" },
          { icon: BracketsCurlyIcon, t: "API & MCP", d: "for developers" },
        ].map((x) => (
          <UiCard key={x.t} className="gap-1.5 p-3">
            <x.icon className="size-4 text-(--ui-muted)" />
            <span className="text-[12.5px]">{x.t}</span>
            <span className="text-[11px] text-(--ui-muted)">{x.d}</span>
          </UiCard>
        ))}
      </div>
    </UiWindow>
  )
}

/** Connect anything: an API turned into a skill. */
export function ConnectApiScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="New skill · from your API" aside={<UiPill>Skill</UiPill>}>
      <UiCard>
        <UiLabel>Describe it</UiLabel>
        <span className="rounded-md border border-(--ui-line) px-3 py-2 text-[12.5px]">Look up a customer&apos;s meter readings by account number.</span>
        <span className="flex items-center gap-1.5 text-[11px] text-(--ui-muted)">
          <SparkleIcon weight="fill" className="size-3 text-[oklch(0.72_0.14_295)]" />
          AI wrote the request
        </span>
        <pre className="font-mono text-[11.5px] leading-relaxed text-(--ui-text)/85">
          {`GET https://api.halden.example/meters
    ?account={{context.account}}`}
        </pre>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <PlugsConnectedIcon className="size-4" />
            <span className="font-mono text-[12px]">get_meter_readings</span>
          </span>
          <Ok>Test passed · 0.3s</Ok>
        </div>
        <span className="text-[11px] text-(--ui-muted)">Ready for every Hooman in the workspace</span>
      </UiCard>
    </UiWindow>
  )
}

/** Hooman API: the same actions as the console, in code. */
export function ApiScreen({ className }: { className: string }) {
  const tabs = ["cURL", "Node", "Python"]
  return (
    <UiWindow className={className} title="API reference · start a call" aside={<UiPill>REST</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="flex items-center gap-4 border-b border-(--ui-line) px-3.5 pt-2 text-[11.5px]">
          {tabs.map((t, i) => (
            <span key={t} className={cn("pb-2", i === 0 ? "border-b border-(--ui-text) text-(--ui-text)" : "text-(--ui-muted)")}>
              {t}
            </span>
          ))}
        </div>
        <pre className="p-3.5 font-mono text-[11.5px] leading-[1.7] text-(--ui-text)/90">
          {`curl https://api.hoomanlabs.com/v1/calls \\
  -H "Authorization: Bearer $HOOMAN_KEY" \\
  -d '{ "agent": "ria-billing",
        "phone": "+1 555 0142",
        "context": { "name": "Maya" } }'`}
        </pre>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Response</UiLabel>
          <Ok>201 Created</Ok>
        </div>
        <pre className="font-mono text-[11.5px] leading-relaxed">{`{ "call_id": "call_7Q2", "status": "queued" }`}</pre>
      </UiCard>
    </UiWindow>
  )
}

/** Hooman MCP: an AI assistant building and running a campaign. */
export function McpScreen({ className }: { className: string }) {
  const tools = [
    ["create_campaign", "March reminders · 312 contacts"],
    ["run_test_suite", "12 of 12 passed"],
    ["start_campaign", "Running · 3 slots"],
  ]
  return (
    <UiWindow className={className} title="AI assistant · Hooman MCP" aside={<UiPill live>Connected</UiPill>}>
      <UiCard>
        <UiLabel>You</UiLabel>
        <p className="text-[12.5px]">Set up a reminder campaign for overdue accounts, test it, and start it this morning.</p>
      </UiCard>
      <UiCard>
        <UiLabel>Assistant · using Hooman tools</UiLabel>
        {tools.map(([t, d]) => (
          <div key={t} className="flex items-center gap-3 text-[11.5px]">
            <span className="font-mono">{t}</span>
            <span className="text-(--ui-muted)">{d}</span>
            <span className="ml-auto">
              <Ok>Done</Ok>
            </span>
          </div>
        ))}
        <p className="border-t border-(--ui-line) pt-2.5 text-[12.5px]">Done. The campaign passed all 12 tests and is now calling 312 customers.</p>
      </UiCard>
    </UiWindow>
  )
}
