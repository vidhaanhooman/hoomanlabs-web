"use client"

import { CaretDownIcon, CheckIcon, CopyIcon, LightningIcon, PlayIcon, XIcon } from "@phosphor-icons/react"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { integrationsPage as c } from "@/content/pages/integrations"
import { cn } from "@/lib/utils"
import { MockAction } from "@/components/product/mock-action"

/**
 * The first three sections of /platform/integrations, as product screens
 * like every other product page (the Campaigns upload screen is the model):
 * a window running off the stage's edge that tells one story. Hovering a
 * row on the left highlights its part of the screen.
 *
 * - Connect: the agent's tools, each with when it runs, and this call's use.
 * - Actions: the activity log of your systems' requests; on MCP, a chat
 *   with Claude using Hooman.
 * - Webhooks: the console's "Add call action", with the events it's sent
 *   on and the payload.
 *
 * Sample data; paths and event names illustrative.
 */

const DOCS = "https://docs.hoomanlabs.com"

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

/** A table in the Campaigns screen's style: mono header on raised ground, hairline rows. */
function Table({ cols, grid, rows }: { cols: string[]; grid: string; rows: { key: string; cells: React.ReactNode[]; on: boolean }[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-(--ui-line)">
      <div className={cn("grid gap-3 bg-(--ui-raised) px-3 py-1.5 font-mono text-[10.5px] text-(--ui-muted)", grid)}>
        {cols.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r.key} className={cn("grid items-center gap-3 border-t border-(--ui-line) px-3 py-2 text-[11.5px] transition-opacity duration-300", grid, !r.on && "opacity-35")}>
          {r.cells.map((cell, i) => (
            <span key={i} className="truncate">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

const Mono = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => <span className={cn("font-mono", muted && "text-(--ui-muted)")}>{children}</span>
const lit = (focus: string, ids: string[]) => focus === "all" || ids.includes(focus)

/* ================================================================ connect */

function ToolsScreen({ className, focus }: { className: string; focus: string }) {
  const tools = [
    { id: "before", name: "get_account", when: "Before the call", endpoint: "GET /accounts/{id}" },
    { id: "during", name: "send_payment_link", when: "During the call", endpoint: "POST /payments/link" },
    { id: "workflow", name: "update_crm", when: "After · workflow", endpoint: "PATCH /crm/contacts/{id}" },
  ]
  const used = [
    { id: "before", at: "0:00", text: "Loaded Maya Patel · $86.40 due Friday" },
    { id: "during", at: "1:42", text: "Sent a payment link by SMS" },
    { id: "workflow", at: "4:11", text: "Wrote the outcome: promise to pay" },
  ]
  return (
    <UiWindow className={className} title="Ria · Billing · Tools" aside={<UiPill>api.halden.example</UiPill>}>
      <UiCard>
        <UiLabel>Your API, as tools</UiLabel>
        <Table
          cols={["tool", "runs", "endpoint"]}
          grid="grid-cols-[1.1fr_1fr_1.3fr]"
          rows={tools.map((t) => ({
            key: t.id,
            on: lit(focus, [t.id]),
            cells: [
              <Mono key="n">{t.name}</Mono>,
              t.when,
              <Mono key="e" muted>
                {t.endpoint}
              </Mono>,
            ],
          }))}
        />
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>In this call · Maya Patel</UiLabel>
          <Ok>3 of 3 succeeded</Ok>
        </div>
        {used.map((u) => (
          <span key={u.id} className={cn("flex items-center gap-3 text-[12.5px] transition-opacity duration-300", !lit(focus, [u.id]) && "opacity-35")}>
            <span className="w-8 font-mono text-[11px] text-(--ui-muted)">{u.at}</span>
            {u.text}
          </span>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/* ================================================================ actions */

function ApiLogScreen({ className, focus }: { className: string; focus: string }) {
  if (focus === "mcp") return <McpChatScreen className={className} />
  const log = [
    { id: "api", at: "10:01:58", from: "Halden CRM", req: "POST /v1/calls", status: "201" },
    { id: "api", at: "10:01:59", from: "Halden CRM", req: "POST /v1/campaigns/march/contacts", status: "201" },
    { id: "mcp", at: "10:02:30", from: "Claude · MCP", req: "start_call", status: "200" },
    { id: "api", at: "10:06:20", from: "Halden CRM", req: "GET /v1/calls/call_7Q2", status: "200" },
  ]
  return (
    <UiWindow className={className} title="Developers · Activity" aside={<UiPill live>API and MCP</UiPill>}>
      <UiCard>
        <UiLabel>Requests from your systems</UiLabel>
        <Table
          cols={["time", "from", "action", "status"]}
          grid="grid-cols-[4.5rem_6.5rem_1fr_2.5rem]"
          rows={log.map((l, i) => ({
            key: `${l.at}-${i}`,
            on: lit(focus, [l.id]),
            cells: [
              <Mono key="t" muted>
                {l.at}
              </Mono>,
              l.from,
              <Mono key="r">{l.req}</Mono>,
              <span key="s" className="font-mono text-(--ui-live)">
                {l.status}
              </span>,
            ],
          }))}
        />
      </UiCard>
      <UiCard>
        <UiLabel>POST /v1/calls</UiLabel>
        <pre className="font-mono text-[11.5px] leading-[1.7] text-(--ui-text)/90">{`{ "agent": "ria-billing", "phone": "+1 555 0142" }`}</pre>
        <Ok>201 · call_7Q2 queued, Maya&apos;s phone ringing</Ok>
      </UiCard>
    </UiWindow>
  )
}

/** MCP, as a chat: you ask Claude in plain words, it uses Hooman's tools and reports back. */
function McpChatScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Claude · Hooman MCP" aside={<UiPill live>Connected</UiPill>}>
      <div className="flex flex-1 flex-col gap-3 text-[12.5px] leading-snug">
        <p className="max-w-[78%] self-end rounded-2xl rounded-br-md bg-(--ui-text) px-3.5 py-2 text-(--ui-bg)">Call Maya Patel about her overdue March bill. Use the billing agent.</p>
        <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-(--ui-raised) px-3.5 py-2">I&apos;ll start the call with Ria, your billing agent.</p>
        <span className="flex items-center gap-2 self-start rounded-full border border-(--ui-line) bg-(--ui-panel) py-1 pr-3 pl-1.5 text-[11.5px]">
          <span className="grid size-5 place-items-center rounded-full bg-(--warn)/18">
            <LightningIcon weight="fill" className="size-3 text-(--warn-fg)" />
          </span>
          Used Hooman · <span className="font-mono">start_call</span>
          <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
        </span>
        <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-(--ui-raised) px-3.5 py-2">Ria is calling Maya now. I&apos;ll share the outcome here when the call ends.</p>
        <div className="flex max-w-[85%] flex-col gap-1.5 self-start rounded-2xl rounded-bl-md bg-(--ui-raised) px-3.5 py-2.5">
          <span>The call ended after 4:11. Maya agreed to pay on Friday.</span>
          <span className="flex items-center gap-3 rounded-lg border border-(--ui-line) bg-(--ui-panel) px-3 py-2 text-[11.5px]">
            <span className="text-(--ui-muted)">Outcome</span>
            Promise to pay · Fri 7 Mar
            <span className="ml-auto">
              <Ok>Saved</Ok>
            </span>
          </span>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl border border-(--ui-line) bg-(--ui-panel) px-3.5 py-2.5 text-[12px] text-(--ui-muted)">
          Reply to Claude…
          <span className="ml-auto grid size-6 place-items-center rounded-md bg-(--ui-raised) text-(--ui-text)">↑</span>
        </div>
      </div>
    </UiWindow>
  )
}

/* =============================================================== webhooks */

/**
 * Webhooks, as the console's "Add call action" (for recall): API / Code /
 * Presets tabs, the API request (method, URL, Params / Headers / Body /
 * Settings, Import cURL and Test), the events it's sent on, the payload
 * with its variables, and the variables table. The hovered row lights the
 * events and the payload lines it's about. Variable names illustrative.
 */
const PAYLOAD: { line: string; kind?: string }[] = [
  { line: "{" },
  { line: '  "event": "${event}",', kind: "call" },
  { line: '  "agent": "${agent}",' },
  { line: '  "callInfo": {' },
  { line: '    "from": "${callInfo.from}",' },
  { line: '    "to": "${callInfo.to}",' },
  { line: '    "transfer": {', kind: "transfer" },
  { line: '      "status": "${callInfo.transfer.status}",', kind: "transfer" },
  { line: '      "initiatedAt": "${callInfo.transfer.initiatedAt}"', kind: "transfer" },
  { line: "    }", kind: "transfer" },
  { line: "  }," },
  { line: '  "captured": "${captured}",', kind: "mid" },
  { line: '  "summary": "${summary}"', kind: "call" },
  { line: "}" },
]
const EVENTS = [
  { name: "call.started", kind: "call" },
  { name: "call.mid_call", kind: "mid" },
  { name: "transfer.*", kind: "transfer" },
  { name: "call.ended", kind: "call" },
]

/** A JSON line, keys in blue and ${variables} in the accent, like the console. */
function JsonLine({ line }: { line: string }) {
  const m = line.match(/^(\s*)"([^"]+)":\s*(.*)$/)
  if (!m) return <span className="text-(--ui-muted)">{line}</span>
  const [, pad, key, rest] = m
  return (
    <span>
      {pad}
      <span className="text-[#82aaff]">&quot;{key}&quot;</span>
      <span className="text-(--ui-muted)">: </span>
      <span className={rest.startsWith('"') ? "text-[#89ddff]" : "text-(--ui-muted)"}>{rest}</span>
    </span>
  )
}

function WebhookScreen({ className, focus }: { className: string; focus: string }) {
  const on = (kind?: string) => focus === "all" || !kind || kind === focus
  return (
    <div aria-hidden className={cn("ui-dark flex flex-col overflow-hidden text-[12px] leading-[1.5]", className)}>
      {/* Modal header and tabs */}
      <div className="flex items-center px-5 pt-4 pr-[22%]">
        <span className="text-[15px]">Add call action</span>
        <XIcon className="ml-auto size-4 text-(--ui-muted)" />
      </div>
      <div className="flex gap-5 border-b border-(--ui-line) px-5 pt-3 pr-[22%] text-[12.5px]">
        {["API", "Code", "Presets"].map((t, i) => (
          <span key={t} className={cn("pb-2", i === 0 ? "border-b-2 border-(--ui-text) text-(--ui-text)" : "text-(--ui-muted)")}>
            {t}
          </span>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 p-4 pr-[22%]">
        {/* API request */}
        <div className="flex flex-col gap-3 rounded-lg border border-(--ui-line) p-3.5">
          <div className="flex items-start justify-between gap-2">
            <span className="flex flex-col leading-tight">
              <span className="text-[13px]">API Request</span>
              <span className="text-[11px] text-(--ui-muted)">Leave the body empty to send the full call payload.</span>
            </span>
            <span className="flex shrink-0 gap-1">
              <span className="rounded-md bg-(--ui-raised) px-2 py-1 text-[11px]">Import cURL</span>
              <MockAction done="200 OK" className="gap-1 rounded-md bg-(--ui-text) px-2 py-1 text-[11px] text-(--ui-bg)">
                <PlayIcon weight="fill" className="size-2.5" />
                Test
              </MockAction>
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="flex items-center gap-1 rounded-md bg-(--ui-raised) px-2 py-1.5 font-mono text-[11px]">
              POST
              <CaretDownIcon className="size-3 text-(--ui-muted)" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md bg-(--ui-raised) px-2 py-1.5 font-mono text-[11px]">https://hooks.halden.example/hooman</span>
          </div>
          <div className="flex gap-3 border-b border-(--ui-line) text-[11.5px]">
            {["Params", "Headers", "Body", "Settings"].map((t, i) => (
              <span key={t} className={cn("pb-1.5", i === 0 ? "border-b-2 border-(--ui-text)" : "text-(--ui-muted)")}>
                {t}
              </span>
            ))}
          </div>
          <span className="grid grid-cols-2 gap-1.5 text-[11px] text-(--ui-muted)">
            <span className="rounded-md bg-(--ui-raised) px-2 py-1.5">key</span>
            <span className="rounded-md bg-(--ui-raised) px-2 py-1.5">value</span>
          </span>
          <div className="flex flex-col gap-1.5 border-t border-(--ui-line) pt-3">
            <span className="text-[11px] text-(--ui-muted)">Sent on</span>
            <span className="flex flex-wrap gap-1.5">
              {EVENTS.map((e) => (
                <span key={e.name} className={cn("flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] transition-opacity duration-300", "bg-(--ui-raised)", !on(e.kind) && "opacity-35")}>
                  <CheckIcon weight="bold" className="size-2.5 text-(--ui-live)" />
                  {e.name}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Payload and variables */}
        <div className="flex min-w-0 flex-col gap-3">
          <div className="rounded-lg border border-(--ui-line) p-3.5">
            <span className="flex items-center justify-between">
              <span className="text-[13px]">Payload</span>
              <CopyIcon className="size-3.5 text-(--ui-muted)" />
            </span>
            <pre className="mt-2 font-mono text-[10.5px] leading-[1.65]">
              {PAYLOAD.map((p, i) => (
                <span key={i} className={cn("block overflow-hidden text-ellipsis whitespace-pre transition-opacity duration-300", !on(p.kind) && "opacity-30")}>
                  <JsonLine line={p.line} />
                </span>
              ))}
            </pre>
          </div>
          <span className="font-mono text-[10px] tracking-wide text-(--ui-muted) uppercase">Available variables</span>
          <div className="overflow-hidden rounded-lg border border-(--ui-line) text-[11px]">
            {[
              ["${event}", "Started, mid-call, transfer or ended"],
              ["${callInfo.from}", "Source number."],
              ["${summary}", "Summary, when the call ends."],
            ].map(([v, d]) => (
              <span key={v} className="grid grid-cols-[1fr_1.2fr] gap-2 border-b border-(--ui-line) px-3 py-1.5 last:border-0">
                <span className="truncate">{v}</span>
                <span className="truncate text-(--ui-muted)">{d}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================================= panels */

export function IntegrationPanels() {
  const { connect, actions, webhooks } = c.sections
  return (
    <>
      <ProductPanel id="integrations-connect" {...connect} link="Read about tools" linkHref={DOCS} screen={(cls, f) => <ToolsScreen className={cls} focus={f} />} />
      <ProductPanel id="integrations-actions" {...actions} link="Read the API reference" linkHref={DOCS} media="start" screen={(cls, f) => <ApiLogScreen className={cls} focus={f} />} />
      <ProductPanel id="integrations-webhooks" {...webhooks} link="Read about webhooks" linkHref={DOCS} screen={(cls, f) => <WebhookScreen className={cls} focus={f} />} />
    </>
  )
}
