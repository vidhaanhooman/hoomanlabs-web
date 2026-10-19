"use client"

import { ArrowRightIcon, CheckIcon, HeadsetIcon, SparkleIcon } from "@phosphor-icons/react"

import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { cn } from "@/lib/utils"

/**
 * The /platform/human-ai hero: a large console on the backdrop (the mesh
 * gradient until a photo is chosen). Left, Ria's call with Maya reaching
 * the moment a person is needed; right, the handoff as Priya receives it,
 * with the summary and details, then the call's QA and what the AI learns.
 * Static. Sample data (Halden Energy).
 */

const DESIGN_W = 1100
const DESIGN_H = 560

const TURNS: [string, string, boolean?][] = [
  ["Maya", "There's a $15 late fee on my March bill, but I paid on time."],
  ["Ria", "I can see the payment on the 3rd. Let me get someone who can remove the fee."],
  ["Maya", "Thank you."],
  ["Ria", "Connecting you to Priya on our billing team now. She has all the details.", true],
]

export function HumanAiConsole() {
  return (
    <HeroConsole image="/art/product/human-ai-backdrop.webp" designW={DESIGN_W} designH={DESIGN_H}>
      <div className={CONSOLE}>
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line) px-5">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-1">Maya Patel · Billing line</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">
            <span className="size-1.5 rounded-full bg-(--ui-live)" />
            Handed to Priya · 2:43
          </span>
        </div>

        <div className="grid flex-1 grid-cols-[1.2fr_1fr]">
          {/* The AI's side of the call */}
          <div className="flex flex-col gap-3 border-r border-(--ui-line) p-6">
            <span className="flex items-center gap-2 text-[12px] text-(--ui-muted)">
              <SparkleIcon weight="fill" className="size-3.5 text-(--var)" />
              Ria · AI
            </span>
            {TURNS.map(([who, text, handoff], i) => (
              <div key={i} className={cn("flex max-w-[86%] flex-col rounded-lg border px-3.5 py-2", who === "Maya" ? "self-end border-(--ui-line) bg-(--ui-raised)" : "self-start border-(--ui-line) bg-(--ui-panel)", handoff && "border-white/30")}>
                <span className="text-[11px] text-(--ui-muted)">{who}</span>
                <span className="text-[13px]">{text}</span>
              </div>
            ))}
            <span className="mt-auto flex items-center gap-2 self-start rounded-full bg-(--ui-raised) px-3 py-1.5 text-[12px]">
              <ArrowRightIcon className="size-3.5" />
              Warm handoff · inside office hours
            </span>
          </div>

          {/* What the person receives */}
          <div className="flex flex-col gap-4 p-6">
            <span className="flex items-center gap-2 text-[12px] text-(--ui-muted)">
              <HeadsetIcon className="size-3.5" />
              Priya Shah · Billing team
            </span>
            <div className="flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-4">
              <span className="text-[11px] text-(--ui-muted)">Summary from Ria</span>
              <span className="text-[13px]">Paid on 3 March, charged a $15 late fee. Wants it removed.</span>
              <div className="mt-1 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1 text-[12px]">
                {[
                  ["account", "HLD-482913"],
                  ["reason", "Disputes a late fee"],
                  ["sentiment", "Frustrated → calmer"],
                ].map(([k, v]) => (
                  <span key={k} className="contents">
                    <span className="font-mono text-[11px] text-(--ui-muted)">{k}</span>
                    <span>{v}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-4 text-[12.5px]">
              {[
                ["Fee removed by Priya", "4:10"],
                ["Scored with the same QA", "Pass"],
                ["Saved for the AI to learn from", "Scenario"],
              ].map(([k, v]) => (
                <span key={k} className="flex items-center gap-2">
                  <CheckIcon weight="bold" className="size-3.5 text-(--ui-live)" />
                  {k}
                  <span className="ml-auto text-[11.5px] text-(--ui-muted)">{v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
