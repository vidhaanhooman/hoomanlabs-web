"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Faq } from "@/components/product-page/faq"
import { NextStep } from "@/components/product-page/page-bits"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { ctas } from "@/content/draft"
import { pricingPage as c, type Currency } from "@/content/pricing"
import { cn } from "@/lib/utils"

/**
 * /pricing: the hero (free credits, with an INR / USD toggle), the two plans
 * side by side (Pay as you go, Enterprise), the comparison table, what the
 * platform includes, the pricing FAQ (with FAQPage structured data) and the
 * Book a demo. The only call to action is Book a demo.
 */

const ROOMY = {
  "--section-gap": "clamp(3.5rem, 2.5rem + 3.5vw, 6rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-full bg-surface p-1">
      {(["INR", "USD"] as Currency[]).map((cur) => (
        <button
          key={cur}
          type="button"
          role="radio"
          aria-checked={value === cur}
          onClick={() => onChange(cur)}
          className={cn(
            "cursor-pointer rounded-full px-4 py-1.5 text-small transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === cur ? "bg-background text-foreground shadow-[0_1px_2px_oklch(0.2_0_0/0.08)]" : "text-ink-secondary hover:text-foreground",
          )}
        >
          {cur === "INR" ? "₹ INR" : "$ USD"}
        </button>
      ))}
    </div>
  )
}

export function PricingPage() {
  const [cur, setCur] = useState<Currency>("INR")
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }

  return (
    <div style={ROOMY}>
      {/* The hero: free credits, with the currency toggle */}
      <Section id="pricing-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container className="flex flex-col items-center text-center">
          <p className="reveal text-small text-ink-muted">{c.crumb}</p>
          <h1 className="reveal mt-3 max-w-[18ch] text-display font-normal text-balance" style={{ "--i": 1 } as React.CSSProperties}>
            {c.title(cur)}
          </h1>
          <p className="reveal mt-5 max-w-[52ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
            {c.line}
          </p>
          <div className="reveal mt-8" style={{ "--i": 3 } as React.CSSProperties}>
            <CurrencyToggle value={cur} onChange={setCur} />
          </div>
        </Container>
      </Section>

      {/* The two plans */}
      <Section id="pricing-plans" spacing="tight">
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {c.plans.map((p) => {
              const price = p.price(cur)
              const featured = p.id === "enterprise"
              return (
                <li key={p.id} className={cn("flex flex-col gap-8 rounded-md p-7 sm:p-9", featured ? "bg-foreground text-background" : "border border-line bg-background")}>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-h3 font-normal">{p.name}</h2>
                    <p className={cn("text-body", featured ? "opacity-70" : "text-ink-secondary")}>{p.for}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-display leading-none font-normal tabular-nums">{price.big}</span>
                      <span className={cn("text-body", featured ? "opacity-70" : "text-ink-secondary")}>{price.small}</span>
                    </span>
                    <span className={cn("text-small", featured ? "opacity-60" : "text-ink-muted")}>{p.after}</span>
                  </div>
                  <Link data-demo href={ctas.demo.href} className={cn(buttonVariants({ variant: featured ? "secondary" : "default" }), "w-full")}>
                    {ctas.demo.label}
                  </Link>
                  <ul className={cn("flex flex-col gap-3 border-t pt-6", featured ? "border-background/20" : "border-line")}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-body">
                        <CheckIcon aria-hidden weight="bold" className={cn("mt-1 size-4 shrink-0", featured ? "text-background" : "text-(--ok)")} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {p.more && (
                    <Link href={p.more.href} className="mt-auto inline-flex items-center gap-1.5 text-small underline-offset-4 hover:underline">
                      {p.more.label}
                      <ArrowRightIcon aria-hidden className="size-3.5" />
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* Compare plans: the heading sits in the table's corner; Enterprise is a tinted column; the demo closes it */}
      <Section id="pricing-compare">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[30%] sm:w-[28%]" />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr className="align-bottom">
                  <th scope="col" className="pr-6 pb-6 font-normal">
                    <h2 className="text-h2 font-normal">{c.compare.title}</h2>
                    <p className="mt-2 text-body text-ink-secondary">{c.compare.line}</p>
                  </th>
                  {c.plans.map((p) => {
                    const price = p.price(cur)
                    return (
                      <th key={p.id} scope="col" className={cn("px-6 pt-7 pb-6 font-normal", p.id === "enterprise" && "rounded-t-md bg-surface")}>
                        <span className="block text-h4 font-normal text-foreground">{p.name}</span>
                        <span className="mt-1 block text-small text-ink-muted">
                          {price.big} {price.small}
                        </span>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {c.compare.rows.map((r) => {
                  const payg = r.payg(cur)
                  return (
                    <tr key={r.k}>
                      <th scope="row" className="border-t border-line py-5 pr-6 text-body font-normal text-ink-secondary">
                        {r.k}
                      </th>
                      <td className={cn("border-t border-line px-6 py-5 text-body", payg === "—" && "text-ink-muted")}>{payg}</td>
                      <td className="border-t border-line bg-surface px-6 py-5 text-body">{r.ent()}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="border-t border-line" />
                  <td className="border-t border-line px-6 pt-6 pb-2">
                    <Link data-demo href={ctas.demo.href} className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                      {ctas.demo.label}
                    </Link>
                  </td>
                  <td className="rounded-b-md border-t border-line bg-surface px-6 pt-6 pb-7">
                    <Link data-demo href={ctas.demo.href} className={cn(buttonVariants(), "w-full")}>
                      {ctas.demo.label}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* What the platform includes */}
      <Section id="pricing-included" spacing="tight">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">{c.included.title}</h2>
            <p className="text-body-lg text-ink-secondary">{c.included.line}</p>
          </div>
        </Container>
      </Section>
      <NextStep id="pricing-platform" related={c.included.pages} />

      <Faq id="pricing-faq" title="Pricing questions." items={c.faq} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <TwoWayCta />
    </div>
  )
}
