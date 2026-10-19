import {
  CalendarBlankIcon,
  ChatTextIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  LightningIcon,
  PhoneCallIcon,
  PlayIcon,
  ShieldCheckIcon,
  SlackLogoIcon,
  SparkleIcon,
  TicketIcon,
  UserIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"
import { MockAction } from "@/components/product/mock-action"

/**
 * Screens for /platform/workflows, recreated from the console's workflow
 * builder in its dark style (each takes the window class from the page; the
 * content keeps to the part left visible when the window runs past the
 * stage's right edge). Fictional Halden Energy data.
 */

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

/** Triggers, and the call events sent to your systems. */
export function TriggerScreen({ className }: { className: string }) {
  const triggers: { icon: Icon; name: string; detail: string; on?: boolean }[] = [
    { icon: PhoneCallIcon, name: "Call ends", detail: "call.ended · Billing agent", on: true },
    { icon: GlobeIcon, name: "Webhook", detail: "POST /hooks/missed-payment" },
    { icon: LightningIcon, name: "Your app", detail: "Run via API" },
    { icon: ClockIcon, name: "Schedule", detail: "Weekdays · 9:00" },
  ]
  const events = [
    ["10:02:11", "call.started"],
    ["10:02:14", "call.connected"],
    ["10:05:46", "call.transferred"],
    ["10:06:02", "call.ended"],
  ]
  return (
    <UiWindow className={className} title="after_billing_call" aside={<UiPill>Trigger</UiPill>}>
      <UiCard>
        <UiLabel>Start this workflow when</UiLabel>
        {triggers.map((t) => (
          <div key={t.name} className={cn("flex items-center gap-3 rounded-md px-2 py-2", t.on && "bg-(--ui-raised)")}>
            <t.icon className={cn("size-4", t.on ? "text-(--ui-text)" : "text-(--ui-muted)")} />
            <span className="w-24">{t.name}</span>
            <span className="font-mono text-[11px] text-(--ui-muted)">{t.detail}</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <UiLabel>Call events · to your CRM</UiLabel>
        {events.map(([time, e]) => (
          <div key={e} className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-(--ui-muted)">{time}</span>
            <span>{e}</span>
            <span className="ml-auto">
              <Ok>200</Ok>
            </span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** An AI step: the conversation in, clean structured data out. */
export function AiStepScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="classify_outcome" aside={<UiPill>AI step</UiPill>}>
      <UiCard>
        <UiLabel>Input · transcript</UiLabel>
        <p className="text-[12.5px] text-(--ui-text)/75">&ldquo;I can&apos;t pay it all today. I get paid on the 3rd, so I&apos;ll clear it on the 4th, I promise.&rdquo;</p>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Output · structured</UiLabel>
          <Ok>0.6s</Ok>
        </div>
        <pre className="font-mono text-[11.5px] leading-relaxed">
          {`{
  "outcome":      "promise_to_pay",
  "pay_by":       "2026-03-04",
  "amount":       86.40,
  "needs_person": false
}`}
        </pre>
      </UiCard>
    </UiWindow>
  )
}

/** Connect anything: an API request from a fixed IP. */
export function HttpStepScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="update_crm" aside={<UiPill>API request</UiPill>}>
      <UiCard>
        <div className="flex items-center gap-2 font-mono text-[11.5px]">
          <span className="rounded bg-(--ui-raised) px-1.5 py-0.5 text-(--ok-fg)">POST</span>
          <span className="truncate">https://crm.halden.example/v2/notes</span>
        </div>
        <span className="flex items-center gap-2 text-[11px] text-(--ui-muted)">
          <ShieldCheckIcon className="size-3.5 text-(--ui-text)" />
          Static IP <span className="font-mono text-(--ui-text)">34.93.102.18</span> · on your allow-list
        </span>
      </UiCard>
      <UiCard>
        <UiLabel>Body</UiLabel>
        <pre className="font-mono text-[11.5px] leading-relaxed">
          {`{ "account": "HLD-482913",
  "outcome": "{{classify_outcome.outcome}}",
  "pay_by":  "{{classify_outcome.pay_by}}" }`}
        </pre>
      </UiCard>
      <div className="flex items-center gap-3 px-1">
        <Ok>201 Created · 0.4s</Ok>
      </div>
    </UiWindow>
  )
}

/** Ready-made steps. */
export function PresetsScreen({ className }: { className: string }) {
  const presets: { icon: Icon; name: string; tag: string }[] = [
    { icon: ChatTextIcon, name: "Send SMS", tag: "Messaging" },
    { icon: WhatsappLogoIcon, name: "Send WhatsApp message", tag: "Messaging" },
    { icon: UserIcon, name: "Update Zoho CRM record", tag: "CRM" },
    { icon: TicketIcon, name: "Create Zendesk ticket", tag: "Support" },
    { icon: CalendarBlankIcon, name: "Book Google Calendar slot", tag: "Calendar" },
    { icon: SlackLogoIcon, name: "Post to Slack", tag: "Team" },
  ]
  return (
    <UiWindow className={className} title="Add step" aside={<UiPill>Ready-made</UiPill>}>
      <UiCard className="gap-0 p-1.5">
        {presets.map((p, i) => (
          <div key={p.name} className={cn("flex items-center gap-3 rounded-md px-2.5 py-2.5", i === 0 && "bg-(--ui-raised)")}>
            <span className="grid size-7 place-items-center rounded-md bg-(--ui-raised)">
              <p.icon className="size-3.5" />
            </span>
            <span>{p.name}</span>
            <span className="ml-auto text-[11px] text-(--ui-muted)">{p.tag}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** A code step, with AI writing it. */
export function CodeStepScreen({ className }: { className: string }) {
  const lines = [
    "// Days until the promised payment",
    "const due = new Date(input.pay_by)",
    "const days = Math.ceil((due - Date.now()) / 864e5)",
    "",
    "return {",
    "  remind_on: days > 1 ? \"day_before\" : \"today\",",
    "  amount: `$${input.amount.toFixed(2)}`,",
    "}",
  ]
  return (
    <UiWindow className={className} title="plan_reminder" aside={<UiPill>Code</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="flex items-center gap-2 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span className="rounded-[3px] bg-(--warn) px-1 font-mono text-[9px] font-bold text-black">JS</span>
          JavaScript
          <span className="ml-auto flex items-center gap-1.5 rounded-md bg-(--ui-raised) px-2 py-0.5 text-(--ui-text)">
            <SparkleIcon weight="fill" className="size-3 text-(--var)" />
            Write with AI
          </span>
        </div>
        <pre className="p-3.5 font-mono text-[11.5px] leading-[1.7]">
          {lines.map((l, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-4 text-right text-(--ui-muted)">{i + 1}</span>
              <span className={l.startsWith("//") ? "text-(--ui-muted)" : ""}>{l || " "}</span>
            </div>
          ))}
        </pre>
      </UiCard>
    </UiWindow>
  )
}

/** Build & test: one step run on its own with sample data. */
export function TestStepScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Test step · update_crm" aside={<UiPill live>Passed</UiPill>}>
      <UiCard>
        <UiLabel>Sample input</UiLabel>
        <pre className="font-mono text-[11.5px] leading-relaxed text-(--ui-text)/85">
          {`{ "outcome": "promise_to_pay", "pay_by": "2026-03-04" }`}
        </pre>
        <span className="flex items-center gap-2">
          <MockAction done="Ran · 200 in 240ms" className="rounded-md bg-(--ui-text) px-2.5 py-1 text-[12px] text-(--ui-bg)">
            <PlayIcon weight="fill" className="size-3" />
            Run step
          </MockAction>
          <span className="rounded-md border border-(--ui-line) px-2.5 py-1 text-[12px]">Set as start</span>
        </span>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Result</UiLabel>
          <Ok>201 · 0.4s</Ok>
        </div>
        <pre className="font-mono text-[11.5px] leading-relaxed">{`{ "note_id": "N-77Q2", "status": "saved" }`}</pre>
      </UiCard>
      <span className="flex items-center gap-1.5 px-1 text-[11px] text-(--ui-muted)">
        <SparkleIcon weight="fill" className="size-3 text-(--var)" />
        Request written by AI from &ldquo;save the outcome as a note on the account&rdquo;
      </span>
    </UiWindow>
  )
}
