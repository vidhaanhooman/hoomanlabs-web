import { ChatCircleIcon, GlobeIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr"

import { Label, Pill, ScreenBar, ScreenShell } from "@/components/product/ui-bits"
import { cn } from "@/lib/utils"

/**
 * One customer, one conversation across channels: a call, a WhatsApp follow
 * up and a web chat, all handled by the same agent with the same context.
 * Fictional demo data.
 */

const THREAD = [
  { channel: "Phone", Icon: PhoneIcon, when: "Mon 10:02", who: "agent", text: "Your refund is approved. I'll send the details on WhatsApp." },
  { channel: "WhatsApp", Icon: WhatsappLogoIcon, when: "Mon 10:04", who: "agent", text: "Refund of ₹2,400 approved. It reaches your account in 2–3 days." },
  { channel: "WhatsApp", Icon: WhatsappLogoIcon, when: "Wed 18:40", who: "user", text: "It hasn't arrived yet?" },
  { channel: "Web chat", Icon: GlobeIcon, when: "Wed 18:41", who: "agent", text: "It was sent today at 2pm, reference RF-8831. It should show by tomorrow." },
] as const

export function OmnichannelScreen({ className }: { className?: string }) {
  return (
    <ScreenShell className={className}>
      <ScreenBar>
        <span className="font-medium">Priya Raman</span>
        <Pill tone="live">Same agent · 3 channels</Pill>
        <span className="ml-auto hidden items-center gap-2 text-(--ui-muted) @md:flex">
          <PhoneIcon className="size-3.5" />
          <WhatsappLogoIcon className="size-3.5" />
          <ChatCircleIcon className="size-3.5" />
        </span>
      </ScreenBar>
      <ol className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
        {THREAD.map((m, i) => (
          <li key={i} className={cn("flex flex-col gap-1", m.who === "user" ? "items-end" : "items-start")}>
            <Label className="flex items-center gap-1.5">
              <m.Icon className="size-3" />
              {m.channel} · {m.when}
            </Label>
            <span
              className={cn(
                "max-w-[85%] rounded-md px-3 py-2",
                m.who === "user" ? "bg-(--ui-text) text-(--ui-bg)" : "bg-(--ui-raised) text-(--ui-text)"
              )}
            >
              {m.text}
            </span>
          </li>
        ))}
      </ol>
      <div className="border-t border-(--ui-line) px-4 py-2.5">
        <Label>Context carried over: order #4471, refund RF-8831, language English</Label>
      </div>
    </ScreenShell>
  )
}
