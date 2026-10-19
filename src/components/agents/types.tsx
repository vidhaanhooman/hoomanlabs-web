import { ChatCircleIcon, MegaphoneIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { agentsPage as c } from "@/content/pages/agents"

/**
 * The three agent types (Voice, Chat, Broadcast), in the homepage platform
 * cards' style: name, line, and a light inset showing one at work. Sample
 * data (Halden Energy, Ria).
 */

const ICON = { voice: PhoneIcon, chat: ChatCircleIcon, broadcast: MegaphoneIcon }

function Inset({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden className="mt-auto flex flex-col overflow-hidden rounded-md border border-line bg-background text-small">
      {children}
    </div>
  )
}

function Head({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 text-label text-ink-muted">
      <span>{k}</span>
      {v}
    </div>
  )
}

const Live = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center gap-1.5 text-foreground">
    <span className="size-1.5 rounded-full bg-(--ok)" />
    {children}
  </span>
)

function VoiceInset() {
  return (
    <Inset>
      <Head k="Inbound · Maya Patel" v={<Live>0:42</Live>} />
      <div className="flex flex-col gap-1.5 px-3 py-2.5">
        <span>
          <span className="text-ink-muted">Ria: </span>Your bill is $62.10. Shall I take the payment now?
        </span>
        <span className="text-ink-secondary">
          <span className="text-ink-muted">Maya: </span>Yes, please.
        </span>
      </div>
    </Inset>
  )
}

function ChatInset() {
  return (
    <Inset>
      <Head k="WhatsApp · Priya Shah" v={<span>19:12</span>} />
      <div className="flex flex-col gap-1.5 px-3 py-2.5">
        <span className="max-w-[85%] self-start rounded-xl rounded-bl-sm bg-surface px-2.5 py-1.5">Your bill of $48.20 is due Friday. Want a payment link?</span>
        <span className="max-w-[85%] self-end rounded-xl rounded-br-sm bg-foreground px-2.5 py-1.5 text-background">Yes please.</span>
      </div>
    </Inset>
  )
}

function BroadcastInset() {
  return (
    <Inset>
      <Head k="Bill due reminder" v={<Live>Running</Live>} />
      <div className="flex flex-col gap-2 px-3 py-2.5">
        <span className="flex items-baseline justify-between">
          <span>842 of 1,240 reached</span>
          <span className="font-mono text-label text-ink-muted tabular-nums">68%</span>
        </span>
        <span className="h-1.5 rounded-full bg-surface">
          <span className="block h-full w-[68%] rounded-full bg-foreground/70" />
        </span>
        <span className="text-label text-ink-muted">“Hi, this is Halden Energy. Your bill is due on Friday…”</span>
      </div>
    </Inset>
  )
}

const INSET = { voice: VoiceInset, chat: ChatInset, broadcast: BroadcastInset }

export function AgentTypes() {
  const { label, title, items } = c.types
  return (
    <Section id="agents-types">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
        </div>
        <ul className="mt-10 grid gap-3 lg:grid-cols-3">
          {items.map((t) => {
            const Icon = ICON[t.id as keyof typeof ICON]
            const Shot = INSET[t.id as keyof typeof INSET]
            return (
              <li key={t.id} className="flex min-w-0">
                <Panel className="flex w-full flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2">
                      <Icon className="size-4 text-ink-secondary" />
                      <h3 className="text-h4 font-normal">{t.name}</h3>
                    </span>
                    <p className="text-small text-ink-secondary">{t.body}</p>
                  </div>
                  <Shot />
                </Panel>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
