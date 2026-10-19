import { BookOpenTextIcon, CheckIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr"

import { Halftone } from "@/components/layout/halftone"
import { cn } from "@/lib/utils"

/**
 * Everything an agent needs (/lab/v3), in the use-case card pattern: a grey
 * stage with a dot texture and one small product card on it (dark and light
 * alternate), then an outcome title, the feature name in mono and one line.
 * A zig-zag on a four-column rhythm keeps every edge aligned; the prompt and
 * post-call get the wide cards. Static. Sample content (fictional Halden
 * Energy billing agent).
 */

/** Graphite dark, as on the use-case cards. */
const DARK = "dark graphite"

type Item = {
  title: string
  label: string
  body: string
  focus: string
  dark: boolean
  wide?: boolean
  Visual: () => React.ReactNode
}

/* ------------------------------------------------------------ pieces */

function Snip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-line-strong bg-linear-to-b from-surface to-background to-40% p-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.07),0_14px_32px_-14px_oklch(0_0_0/0.35)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function Row({ k, v, className }: { k: React.ReactNode; v: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 border-t border-line py-1.5 first:border-0", className)}>
      <span className="text-ink-muted">{k}</span>
      <span className="truncate">{v}</span>
    </div>
  )
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-foreground/[0.07] px-1 py-px font-mono text-[10.5px] text-foreground/85">{children}</span>
)

function Done({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-0.5 text-[10px] text-background">
      <CheckIcon weight="bold" className="size-2.5" />
      {children}
    </span>
  )
}

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-2 py-0.5 text-[10.5px] text-ink-secondary", className)}>{children}</span>
}

function Wave({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex h-3.5 items-end gap-[2px]", className)}>
      {[5, 10, 7, 12, 6, 9, 4].map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-current" style={{ height: h }} />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------ visuals */

function PreCall() {
  return (
    <div className="flex w-64 flex-col items-start gap-2">
      <Pill>Before the first ring · 140 ms</Pill>
      <Snip className="w-full">
        <span className="pb-1 font-medium">Maya Patel</span>
        <Row k={<Code>context.account</Code>} v="HE-48213" />
        <Row k={<Code>context.balance</Code>} v="$86.40" />
        <Row k={<Code>context.dueDate</Code>} v="4 Mar" />
        <Row k={<Code>context.lastCall</Code>} v="Meter reading" />
      </Snip>
    </div>
  )
}

const CEL_LINES: [string, string][][] = [
  [["{{ ", "op"], ["context.balance", "var"], [" > 0 && !", "op"], ["context.promiseToPay", "var"], [" ?", "op"]],
  [['  """Offer to take the payment now with ', "str"], ["[take_payment]", "tool"], [".", "str"]],
  [['  If they can\'t pay in full, offer a plan."""', "str"]],
  [['  : """Confirm nothing is owed.""" ', "str"], ["}}", "op"]],
]
const TONE: Record<string, string> = {
  op: "text-(--var)",
  var: "text-(--data)",
  tool: "text-(--tool)",
  str: "text-foreground/85",
}

function Prompt() {
  return (
    <Snip className="w-[min(100%,32rem)] gap-2.5 p-4">
      <div className="flex items-center gap-2 text-[11px]">
        <span className="rounded-md bg-foreground/[0.08] px-2 py-0.5">Preview</span>
        <span className="text-ink-muted">Text</span>
        <span className="ml-auto text-ink-muted">Billing assistant · v5</span>
      </div>
      <span className="font-medium">Conversation flow</span>
      <p className="text-ink-secondary">
        2. If they mention a charge they don&rsquo;t recognise, check it with <Code>[get_payments]</Code>.
      </p>
      <p className="text-ink-secondary">3. Otherwise, follow the instructions for this account&rsquo;s status:</p>
      <div className="relative rounded-md bg-(--var)/10 px-3 py-2.5 font-mono text-[11px] leading-[1.7] ring-1 ring-(--var)/25">
        {CEL_LINES.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap sm:whitespace-pre">
            {line.map(([t, k], j) => (
              <span key={j} className={TONE[k]}>
                {t}
              </span>
            ))}
          </div>
        ))}
        <span className="absolute -top-2.5 right-2.5">
          <Done>Valid CEL</Done>
        </span>
      </div>
    </Snip>
  )
}

function Knowledge() {
  return (
    <Snip className="w-64 gap-2">
      <span className="self-end rounded-md bg-foreground px-2.5 py-1 text-background">How long do refunds take?</span>
      <p>Duplicate-charge refunds reach the card in 3 to 5 working days.</p>
      <Pill className="w-fit">
        <BookOpenTextIcon className="size-3" />
        Refund policy · §3
      </Pill>
    </Snip>
  )
}

function Tools() {
  return (
    <Snip className="w-60">
      <Row
        k={
          <span className="flex items-center gap-1.5 text-foreground">
            <LightningIcon weight="fill" className="size-3" />
            <Code>take_payment</Code>
          </span>
        }
        v={<Done>200 OK</Done>}
      />
      <Row k={<Code>create_ticket</Code>} v={<span className="text-ink-muted">ready</span>} />
      <Row k={<Code>send_sms</Code>} v={<span className="text-ink-muted">ready</span>} />
    </Snip>
  )
}

function Voice() {
  return (
    <div className="flex w-60 flex-col items-start gap-2">
      <Snip className="w-full">
        <div className="flex items-center gap-2.5 pb-1.5">
          <span className="flex flex-1 flex-col">
            <span className="font-medium">Ria</span>
            <span className="text-ink-muted">Warm · en-GB</span>
          </span>
          <Wave />
        </div>
        <Row k="Turn detection" v={<Done>On</Done>} />
        <Row k="Noise reduction" v={<Done>On</Done>} />
      </Snip>
      <div className="flex flex-wrap gap-1">
        {["English", "Hindi", "Spanish", "+27"].map((l) => (
          <Pill key={l}>{l}</Pill>
        ))}
      </div>
    </div>
  )
}

function PostCall() {
  return (
    <Snip className="grid w-[min(100%,32rem)] gap-4 p-4 sm:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-1.5">
        <span className="text-ink-muted">Summary</span>
        <p>Double charge on 4 March confirmed. Refund needs approval, so a ticket was raised and the reference texted.</p>
        <div className="flex flex-wrap gap-1 pt-1">
          <Pill>intent: duplicate charge</Pill>
          <Pill>sentiment: calm</Pill>
        </div>
      </div>
      <div className="flex flex-col">
        {[
          ["CRM updated", "HubSpot"],
          ["Ticket created", "#TCK-2291"],
          ["SMS sent", "reference"],
          ["Webhook", "200"],
        ].map(([t, d]) => (
          <div key={t} className="flex items-center gap-2 border-t border-line py-1.5 first:border-0">
            <span className="grid size-3.5 place-items-center rounded-full bg-foreground text-background">
              <CheckIcon weight="bold" className="size-2" />
            </span>
            <span className="flex-1">{t}</span>
            <span className="font-mono text-[10.5px] text-ink-muted">{d}</span>
          </div>
        ))}
      </div>
    </Snip>
  )
}

function Qa() {
  return (
    <Snip className="w-56 gap-2">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[1.75rem] leading-none tabular-nums">4.6</span>
        <span className="text-ink-muted">/ 5 this call</span>
      </div>
      {[
        ["Resolved", 96],
        ["Tone", 90],
        ["Compliance", 88],
      ].map(([k, v]) => (
        <div key={k} className="flex items-center gap-2">
          <span className="w-20 text-ink-muted">{k}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <span className="block h-full rounded-full bg-foreground" style={{ width: `${v}%` }} />
          </span>
        </div>
      ))}
    </Snip>
  )
}

/* ------------------------------------------------------------ grid */

/* Zig-zag on a 4-column rhythm; dark and light alternate so no two dark stages touch. */
const ITEMS: Item[] = [
  { title: "Knows the caller before hello", label: "Pre-call context", body: "CRM and billing are looked up before the first ring.", focus: "15% 20%", dark: false, Visual: PreCall },
  { title: "Write the job, not a flowchart", label: "Prompt & conditions", body: "Plain language, with variables, tools and conditions written right inside it.", focus: "85% 15%", dark: true, wide: true, Visual: Prompt },
  { title: "Answers you can trace", label: "Knowledge base", body: "Every answer cited from your own documents.", focus: "20% 85%", dark: true, Visual: Knowledge },
  { title: "Does the work mid-call", label: "Tools", body: "Payments, tickets and messages, on your own systems.", focus: "50% 0%", dark: false, Visual: Tools },
  { title: "Sounds like your best agent", label: "Voice & languages", body: "30 languages, with natural turn-taking and noise reduction.", focus: "100% 50%", dark: true, Visual: Voice },
  { title: "Follow-up done before you look", label: "Post-call", body: "Fields extracted, a summary written and your systems updated after goodbye.", focus: "80% 85%", dark: false, wide: true, Visual: PostCall },
  { title: "Every call scored", label: "QA", body: "Scored against your rubric, with alerts when quality drops.", focus: "15% 50%", dark: true, Visual: Qa },
]

export function AgentBento() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      {ITEMS.map(({ title, label, body, focus, dark, wide, Visual }) => (
        <li key={label} className={cn("flex min-w-0", wide ? "md:col-span-2 lg:col-span-8" : "lg:col-span-4")}>
          <article className="flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-background">
            <div aria-hidden className="relative isolate flex h-72 items-center justify-center overflow-hidden bg-surface p-6">
              <Halftone focus={focus} />
              <div className={cn("flex w-full justify-center text-[12px] leading-snug text-foreground", dark && DARK)}>
                <Visual />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 border-t border-line p-5">
              <p className="text-h4 font-normal">{title}</p>
              <h3 className="font-mono text-label text-ink-muted">{label}</h3>
              <p className="text-small text-ink-secondary">{body}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
