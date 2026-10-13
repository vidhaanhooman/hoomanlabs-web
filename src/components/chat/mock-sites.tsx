import { CalendarBlankIcon, LightningIcon, MagnifyingGlassIcon, ShoppingBagIcon, StarIcon } from "@phosphor-icons/react"

import type { SiteId } from "@/components/chat/sites"
import { cn } from "@/lib/utils"

/**
 * Example customer websites for the chat playground, drawn in the site's own
 * tokens (so they follow light and dark) with each brand's accent. `compact`
 * is the phone layout. Decorative: the chat widget sits on top.
 */

type Props = { accent: string; compact: boolean }

function Nav({ brand, links, accent, compact, icon }: { brand: string; links: string[]; accent: string; compact: boolean; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6 border-b border-line px-5 py-3.5 sm:px-8">
      <span className="flex items-center gap-2 text-body font-medium">
        <span className="size-5 rounded-md" style={{ background: accent }} />
        {brand}
      </span>
      {!compact && (
        <span className="flex gap-5 text-small text-ink-secondary">
          {links.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
      )}
      <span className="ml-auto flex items-center gap-3 text-ink-secondary">{icon}</span>
    </div>
  )
}

const Btn = ({ accent, children, ghost = false }: { accent: string; children: React.ReactNode; ghost?: boolean }) => (
  <span
    className={cn("inline-flex h-10 w-fit items-center rounded-full px-5 text-small font-medium", ghost && "border")}
    style={ghost ? { borderColor: accent, color: accent } : { background: accent, color: "white" }}
  >
    {children}
  </span>
)

function EnergySite({ accent, compact }: Props) {
  return (
    <div aria-hidden className="flex flex-col">
      <Nav brand="Halden Energy" links={["Tariffs", "Moving home", "Help"]} accent={accent} compact={compact} icon={<span className="text-small">My account</span>} />
      <div className={cn("grid gap-6 p-5 sm:p-8", !compact && "grid-cols-[1.3fr_1fr] items-center gap-10")}>
        <div className="flex flex-col gap-4">
          <span className="text-label" style={{ color: accent }}>
            100% renewable electricity
          </span>
          <span className={cn("font-normal", compact ? "text-h3" : "text-h2")}>Your energy, simply managed.</span>
          <span className="text-small text-ink-secondary">See your usage, pay your bill and change your plan, any time.</span>
          <span className="flex gap-2">
            <Btn accent={accent}>Pay my bill</Btn>
            {!compact && (
              <Btn accent={accent} ghost>
                Compare tariffs
              </Btn>
            )}
          </span>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5">
          <span className="text-label text-ink-muted">Account · HLD-482913</span>
          <span className="text-h3 font-normal">₹2,850</span>
          <span className="text-small text-ink-secondary">Due 4 March · Green Fixed 12m</span>
          <span className="flex h-16 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 85, 58, 66, 52, 44, 60, 72].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 11 ? accent : "var(--line-strong)" }} />
            ))}
          </span>
        </div>
      </div>
      {!compact && (
        <div className="grid grid-cols-3 gap-4 px-8 pb-8">
          {[
            ["Green Fixed 12m", "₹7.20 / kWh"],
            ["Flex Saver", "₹6.80 / kWh"],
            ["EV Night", "₹4.50 / kWh at night"],
          ].map(([n, p]) => (
            <div key={n} className="flex flex-col gap-1 rounded-xl border border-line p-4">
              <LightningIcon weight="fill" className="size-4" style={{ color: accent }} />
              <span className="pt-2 text-small font-medium">{n}</span>
              <span className="text-label text-ink-muted">{p}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StoreSite({ accent, compact }: Props) {
  const products = [
    { n: "Trail Runner 2", p: "₹4,299", tone: "oklch(0.86 0.05 45)" },
    { n: "Everyday Tee", p: "₹899", tone: "oklch(0.88 0.03 250)" },
    { n: "Steel Bottle", p: "₹899", tone: "oklch(0.87 0.04 155)" },
    { n: "Daypack 18L", p: "₹2,499", tone: "oklch(0.85 0.03 80)" },
  ]
  return (
    <div aria-hidden className="flex flex-col">
      <Nav
        brand="Kestrel"
        links={["New in", "Running", "Outdoor", "Sale"]}
        accent={accent}
        compact={compact}
        icon={
          <>
            <MagnifyingGlassIcon className="size-4" />
            <ShoppingBagIcon className="size-4" />
          </>
        }
      />
      <div className="mx-5 mt-5 flex items-center justify-between rounded-xl px-6 py-5 sm:mx-8" style={{ background: accent, color: "white" }}>
        <span className="flex flex-col gap-1">
          <span className="text-label opacity-85">Spring sale</span>
          <span className={cn("font-normal", compact ? "text-h4" : "text-h3")}>Up to 30% off running</span>
        </span>
        {!compact && <span className="rounded-full bg-white px-4 py-2 text-small font-medium" style={{ color: accent }}>Shop now</span>}
      </div>
      <div className={cn("grid gap-4 p-5 sm:p-8", compact ? "grid-cols-2" : "grid-cols-4")}>
        {products.map((p) => (
          <div key={p.n} className="flex flex-col gap-2">
            <span className="aspect-[4/5] rounded-xl" style={{ background: p.tone }} />
            <span className="text-small">{p.n}</span>
            <span className="flex items-center justify-between text-label text-ink-muted">
              {p.p}
              <span className="flex items-center gap-0.5">
                <StarIcon weight="fill" className="size-3" style={{ color: accent }} />
                4.7
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClinicSite({ accent, compact }: Props) {
  const doctors = [
    { n: "Dr. Kavya Mehta", s: "General physician", slot: "Tomorrow, 10:30 am" },
    { n: "Dr. Arjun Rao", s: "Dermatologist", slot: "Thu, 3:00 pm" },
    { n: "Dr. Neha Iyer", s: "Paediatrician", slot: "Fri, 11:00 am" },
  ]
  return (
    <div aria-hidden className="flex flex-col">
      <Nav brand="Northfield Clinics" links={["Doctors", "Clinics", "Health checks"]} accent={accent} compact={compact} icon={<span className="text-small">Sign in</span>} />
      <div className="flex flex-col gap-4 p-5 sm:p-8">
        <span className={cn("max-w-md font-normal", compact ? "text-h3" : "text-h2")}>Care that fits around your day.</span>
        <div className={cn("flex gap-2 rounded-xl border border-line bg-surface p-2", compact && "flex-col")}>
          <span className="flex flex-1 items-center gap-2 rounded-lg bg-background px-3 py-2.5 text-small text-ink-muted">
            <MagnifyingGlassIcon className="size-4" />
            Doctor, speciality or clinic
          </span>
          <span className="flex items-center gap-2 rounded-lg bg-background px-3 py-2.5 text-small text-ink-muted">
            <CalendarBlankIcon className="size-4" />
            Any date
          </span>
          <Btn accent={accent}>Find a slot</Btn>
        </div>
      </div>
      <div className={cn("grid gap-4 px-5 pb-8 sm:px-8", compact ? "grid-cols-1" : "grid-cols-3")}>
        {doctors.slice(0, compact ? 2 : 3).map((d) => (
          <div key={d.n} className="flex items-center gap-3 rounded-xl border border-line p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full text-small text-white" style={{ background: accent }}>
              {d.n.split(" ")[1].charAt(0)}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-small font-medium">{d.n}</span>
              <span className="text-label text-ink-muted">{d.s}</span>
              <span className="text-label" style={{ color: accent }}>
                {d.slot}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MockSite({ site, accent, compact }: { site: SiteId; accent: string; compact: boolean }) {
  if (site === "store") return <StoreSite accent={accent} compact={compact} />
  if (site === "clinic") return <ClinicSite accent={accent} compact={compact} />
  return <EnergySite accent={accent} compact={compact} />
}
