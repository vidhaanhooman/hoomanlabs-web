"use client"

import { useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"
import { CalendarBlankIcon, ChatTextIcon, CheckIcon, FileTextIcon, LightningIcon, PhoneTransferIcon, UserIcon, type Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { agentsPage as c } from "@/content/pages/agents"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * "What a Hooman can do on a call", pinned on large screens: the section
 * holds still while you scroll through it, the list steps through each
 * action and the call beside it shows that action happening. Clicking an
 * action scrolls to it. Below lg (and for reduced motion) it's a plain list,
 * each action with its call. Sample data (Maya Patel, Ria, Halden Energy).
 */

const ITEMS = c.canDo.items
const N = ITEMS.length

type Moment = { lines: [string, string][]; chip: { icon: Icon; text: string; ok?: string }; header?: string }

const MOMENTS: Record<string, Moment> = {
  answer: {
    lines: [
      ["Caller", "If I switch plans, do I get a refund?"],
      ["Ria", "Yes. Within 14 days the exit fee is waived, and any credit is refunded."],
    ],
    chip: { icon: FileTextIcon, text: "Refund policy.pdf · section 3" },
  },
  pay: {
    lines: [
      ["Caller", "Can I just pay the $86.40 now?"],
      ["Ria", "Done. It's paid and your receipt is on its way."],
    ],
    chip: { icon: LightningIcon, text: "take_payment", ok: "1.2s" },
  },
  book: {
    lines: [
      ["Caller", "Could someone call me back on Thursday?"],
      ["Ria", "Booked for Thursday at 10:30. You'll get a text the day before."],
    ],
    chip: { icon: CalendarBlankIcon, text: "book_callback · Google Calendar", ok: "Booked" },
  },
  update: {
    lines: [
      ["Caller", "I'll pay on the 4th, after payday."],
      ["Ria", "Noted. I've set a reminder for the 3rd."],
    ],
    chip: { icon: UserIcon, text: "update_record · Zoho CRM", ok: "Promise to pay · 4 March" },
  },
  handoff: {
    lines: [
      ["Caller", "I'd rather speak to someone about the reading."],
      ["Ria", "Of course. I'm connecting you to Priya; she has the details."],
    ],
    chip: { icon: PhoneTransferIcon, text: "Transfer to billing · summary sent", ok: "Ringing" },
  },
  follow: {
    header: "Call ended · 3:42",
    lines: [],
    chip: { icon: ChatTextIcon, text: "Receipt sent by SMS", ok: "Sent" },
  },
}

function CallCard({ id }: { id: string }) {
  const m = MOMENTS[id]
  return (
    <div className="ui-dark flex w-full max-w-[26rem] flex-col overflow-hidden rounded-xl border border-black/10 text-[13px] leading-[1.55] shadow-[0_24px_60px_-28px_oklch(0.2_0.02_260/0.55)]">
      <div className="flex items-center justify-between border-b border-(--ui-line) px-4 py-3 text-[12px] text-(--ui-muted)">
        <span>{m.header ?? "Live call · Maya Patel"}</span>
        {!m.header && (
          <span className="flex items-center gap-1.5 text-(--ui-text)">
            <span className="size-1.5 rounded-full bg-(--ui-live)" />
            00:42
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-4">
        {m.lines.map(([who, t]) => (
          <p key={t}>
            <span className="mr-2 font-mono text-[10px] tracking-wide text-(--ui-muted) uppercase">{who}</span>
            <span className={who === "Caller" ? "text-(--ui-text)/75" : ""}>{t}</span>
          </p>
        ))}
        {id === "follow" &&
          ["Receipt sent by SMS", "Summary posted to #billing-team", "CRM record updated"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <CheckIcon weight="bold" className="size-3.5 text-(--ui-live)" />
              {t}
            </span>
          ))}
        {id !== "follow" && (
          <span className="flex items-center gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) px-3 py-2 text-[12px]">
            <m.chip.icon weight="fill" className="size-3.5 shrink-0 text-[oklch(0.82_0.12_80)]" />
            <span className="truncate font-mono text-[11.5px]">{m.chip.text}</span>
            {m.chip.ok && (
              <span className="ml-auto flex shrink-0 items-center gap-1 text-(--ui-live)">
                <CheckIcon weight="bold" className="size-3" />
                {m.chip.ok}
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export function CanDo() {
  const reduce = usePrefersReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N)))))

  // Jump the page to the part of the track that shows action i.
  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (span * (i + 0.5)) / N, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <Section id="agents-can-do" spacing="none">
      {/* Pinned version (lg up, motion allowed) */}
      {!reduce && (
        <div ref={track} className="hidden h-[440vh] lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <Container className="grid w-full grid-cols-[1fr_1.15fr] items-center gap-16">
              <div className="flex flex-col gap-8">
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="text-h2 font-normal">{c.canDo.title}</h2>
                  <span className="font-mono text-label whitespace-nowrap text-ink-muted tabular-nums">
                    0{active + 1} / 0{N}
                  </span>
                </div>
                <ol className="flex flex-col border-t border-line">
                  {ITEMS.map((it, i) => (
                    <li key={it.id} className="border-b border-line">
                      <button type="button" onClick={() => go(i)} className="flex w-full cursor-pointer flex-col gap-1 py-3.5 text-left">
                        <span className={cn("text-h3 font-normal transition-colors duration-300", i === active ? "text-foreground" : "text-ink-muted")}>{it.title}</span>
                        <span
                          className={cn(
                            "grid text-small text-ink-secondary transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out)",
                            i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <span className="overflow-hidden">{it.body}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <Panel className="p-3">
                <div className={cn(STAGE, "grid aspect-[5/4] place-items-center p-10")}>
                  {ITEMS.map((it, i) => (
                    <div
                      key={it.id}
                      aria-hidden={i !== active}
                      className={cn(
                        "col-start-1 row-start-1 flex w-full justify-center transition-[opacity,translate] duration-500 ease-(--ease-out)",
                        i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                      )}
                    >
                      <CallCard id={it.id} />
                    </div>
                  ))}
                </div>
              </Panel>
            </Container>
          </div>
        </div>
      )}

      {/* Plain version: below lg, or with reduced motion */}
      <div className={cn("py-(--section-pad)", !reduce && "lg:hidden")}>
        <Container>
          <h2 className="text-h2 font-normal">{c.canDo.title}</h2>
          <ol className="mt-10 grid gap-3 md:grid-cols-2">
            {ITEMS.map((it) => (
              <li key={it.id} className="flex">
                <Panel className="flex w-full flex-col gap-5 p-3">
                  <div className={cn(STAGE, "flex justify-center p-5")}>
                    <CallCard id={it.id} />
                  </div>
                  <div className="flex flex-col gap-1 px-3 pb-3">
                    <h3 className="text-h4 font-normal">{it.title}</h3>
                    <p className="text-small text-ink-secondary">{it.body}</p>
                  </div>
                </Panel>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </Section>
  )
}
