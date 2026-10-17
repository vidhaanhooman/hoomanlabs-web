import { CheckIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

import { Wordmark } from "@/components/layout/wordmark"
import { CONSOLE } from "@/lib/hero-styles"
import { cn } from "@/lib/utils"

/**
 * The bare layout for sign in and onboarding (no site header or footer):
 * an earthy film photo on the left in a rounded card with a product console
 * centred on it, like the product heroes;
 * the form on the right with the logo above it. The photo hides below lg.
 * Placeholder photo until a dedicated one is made. Fictional data.
 */
export function AuthShell({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="relative hidden p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-2xl border border-line">
          <Image src="/art/product/agents-backdrop.webp" alt="" fill priority sizes="50vw" className="object-cover dark:brightness-[0.82]" />
          <div className="absolute inset-x-[7%] top-1/2 h-[26rem] max-h-[70%] -translate-y-1/2">
            <AuthConsole />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="HoomanLabs home" className="rounded-sm">
            <Wordmark />
          </Link>
          {aside}
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-[24rem]">{children}</div>
        </div>
      </div>
    </div>
  )
}

const LINES: ["Ria" | "Maya", string][] = [
  ["Ria", "Hi, this is Ria from Halden Energy. Am I speaking with Maya?"],
  ["Maya", "Yes. I'd like to pay my bill."],
  ["Ria", "Your bill is $62.10. Shall I take your card number?"],
  ["Maya", "Sure, it's four, two, seven, one…"],
  ["Ria", "Got all 16 digits, thank you. And the expiry date?"],
]

/** A live conversation in the console: the transcript and what the agent has done so far. */
function AuthConsole() {
  return (
    <div aria-hidden className={CONSOLE}>
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line) px-5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/10" />
          ))}
        </span>
        <span className="ml-1">Ria · Billing</span>
        <span className="ml-4 flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">
          <span className="size-1.5 rounded-full bg-(--ui-live)" />
          Live · Maya Patel · 0:38
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3 border-r border-(--ui-line) p-5">
          <span className="flex items-center gap-2 text-[12px] text-(--ui-muted)">
            <PhoneIcon className="size-3.5" />
            Inbound · +1 555 0142
          </span>
          {LINES.map(([who, line], i) => (
            <div
              key={i}
              className={cn("max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug", who === "Maya" ? "self-end rounded-br-md bg-(--ui-text) text-(--ui-bg)" : "self-start rounded-bl-md bg-(--ui-raised)")}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-5 text-[12px]">
          <span className="text-(--ui-muted)">Done so far</span>
          {["Verified caller", "get_balance · $62.10", "Card number captured"].map((x) => (
            <span key={x} className="flex items-center gap-2 rounded-md bg-(--ui-raised)/70 px-2.5 py-2">
              <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
              {x}
            </span>
          ))}
          <span className="flex items-center gap-2 rounded-md border border-dashed border-(--ui-line) px-2.5 py-2 text-(--ui-muted)">
            <span className="size-1.5 animate-pulse rounded-full bg-(--ui-live)" />
            take_payment
          </span>
        </div>
      </div>
    </div>
  )
}
