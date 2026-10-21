import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { pad, StageHeader } from "@/components/sections/product-stage-list";
import { PhoneCallIcon, WebhooksLogoIcon } from "@phosphor-icons/react/dist/ssr";
import {
  siCaldotcom,
  siCalendly,
  siGooglecalendar,
  siModelcontextprotocol,
  siZendesk,
  siZoho,
  type SimpleIcon,
} from "simple-icons";

import { tools } from "@/content/platform";
import { cn } from "@/lib/utils";

/** Tools & Integrations: numbered items, then integration groups . */
export function ToolsIntegrations({
  start,
  productName,
}: {
  start: number;
  productName: string;
}) {
  const end = start + tools.items.length - 1;
  return (
    <Section id="product-tools" className="scroll-mt-32 lg:scroll-mt-16">
      <Container>
        <StageHeader
          productName={productName}
          label={tools.label}
          range={`${pad(start)}–${pad(end)}`}
          headline={tools.headline}
          body={tools.body}
        />

        <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {tools.items.map((it, i) => (
            <li
              key={it.title}
              className="flex flex-col gap-2 border-t border-line pt-4"
            >
              <span className="font-mono text-label text-ink-muted tabular-nums">
                {pad(start + i)}
              </span>
              <h3 className="text-body font-medium">{it.title}</h3>
              <p className="max-w-[48ch] text-small text-ink-secondary">
                {it.body}
              </p>
            </li>
          ))}
        </ol>

        <IntegrationGroups className="mt-12" />
      </Container>
    </Section>
  );
}

/** Brand marks in their own colours (simple-icons, CC0). Keys match `logo` in content. */
export const LOGOS: Record<string, SimpleIcon> = {
  zendesk: siZendesk,
  zoho: siZoho,
  googlecalendar: siGooglecalendar,
  calendly: siCalendly,
  caldotcom: siCaldotcom,
  mcp: siModelcontextprotocol,
};

/** Plain icons for items that aren't a brand. */
const ICONS = { sip: PhoneCallIcon, webhooks: WebhooksLogoIcon };

/** Integration groups as logo + name rows. Also used on the homepage. */
export function IntegrationGroups({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4",
        className,
      )}
    >
      {tools.groups.map((g) => (
        <div key={g.label} className="flex flex-col gap-3">
          <h3 className="border-b border-line pb-3 text-small font-medium">
            {g.label}
          </h3>
          <ul className="flex flex-col gap-1">
            {g.items.map((x) => {
              const icon = x.logo ? LOGOS[x.logo] : undefined;
              const Plain = x.icon ? ICONS[x.icon] : undefined;
              return (
                <li
                  key={x.name}
                  className="flex h-10 items-center gap-3 text-small text-ink-secondary"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-background">
                    {icon ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4"
                        style={{ fill: `#${icon.hex}` }}
                        aria-hidden
                      >
                        <path d={icon.path} />
                      </svg>
                    ) : x.file ? (
                      <Image src={`/logos/integrations/${x.file}`} alt="" width={20} height={20} unoptimized className={cn("size-5 object-contain", x.file.endsWith(".jpg") && "rounded-full")} />
                    ) : Plain ? (
                      <Plain aria-hidden className="size-4 text-foreground" />
                    ) : (
                      <span className="text-label font-medium text-foreground">
                        {x.name.slice(0, 1)}
                      </span>
                    )}
                  </span>
                  {x.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
