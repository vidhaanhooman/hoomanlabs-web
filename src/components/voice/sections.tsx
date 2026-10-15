import { CheckIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { voicePage as c } from "@/content/pages/voice"

/**
 * Sections of /platform/voice in the homepage's language, like Agents and
 * Workflows: the trio (step-level tuning and failover).
 */

function Ok() {
  return <CheckIcon weight="bold" className="size-3.5 shrink-0 text-[oklch(0.55_0.13_150)]" />
}

/* -------------------------------------------------------------------- trio */

const INSET = "flex flex-1 flex-col overflow-hidden rounded-md border border-line bg-background text-small"

function Head({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-2 border-b border-line px-4">
      {left}
      {right && <span className="ml-auto text-label text-ink-muted">{right}</span>}
    </div>
  )
}
function Line({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
      {children}
      {right && <span className="ml-auto text-label text-ink-muted">{right}</span>}
    </div>
  )
}
function Foot({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-3 bg-surface px-4 py-2.5 text-label text-ink-secondary">
      <span>{left}</span>
      <span className="text-foreground">{right}</span>
    </div>
  )
}

function StepTuning() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Billing flow</span>} right="Per step" />
      <Line right="Fast model">
        <span className="font-mono text-label">small_talk</span>
      </Line>
      <Line right="Careful model">
        <span className="font-mono text-label">take_payment</span>
      </Line>
      <Line right="Patient turns">
        <span className="font-mono text-label">card_number</span>
      </Line>
      <Foot left="Voice" right="Same voice throughout" />
    </div>
  )
}

function Failover() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Voice provider</span>} right="Live call" />
      <Line right="Timed out">
        <WarningIcon weight="fill" className="size-3.5 shrink-0 text-[oklch(0.7_0.14_70)]" />
        Primary voice engine
      </Line>
      <Line right="0.3s">
        <Ok />
        Switched to backup
      </Line>
      <Line>
        <Ok />
        Call kept going
      </Line>
      <Foot left="Failover" right="Automatic" />
    </div>
  )
}

function SttFailover() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Transcription</span>} right="Per language" />
      <Line right="Primary">Transcription engine A</Line>
      <Line right="Backup">Transcription engine B</Line>
      <Line>Switches if a provider goes down</Line>
      <Foot left="Status" right="In progress" />
    </div>
  )
}

const VISUALS = [StepTuning, Failover, SttFailover]

export function VoiceTrio() {
  return (
    <Section id="voice-trio">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{c.trio.title}</h2>
          <p className="text-body text-ink-secondary">{c.trio.line}</p>
        </div>
        <ul className="mt-10 grid gap-3 lg:grid-cols-3">
          {c.trio.items.map((it, i) => {
            const Visual = VISUALS[i]
            return (
              <li key={it.id} className="flex">
                <Panel className="flex w-full flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="flex items-center gap-2 text-h4 font-normal">
                      {it.title}
                      {"soon" in it && it.soon && <span className="rounded-full border border-line-strong px-2 py-px text-[11px] text-ink-muted">Coming soon</span>}
                    </h3>
                    <p className="min-h-[3em] text-small text-ink-secondary">{it.body}</p>
                  </div>
                  <Visual />
                </Panel>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
