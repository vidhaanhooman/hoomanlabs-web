import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Panel } from "@/components/layout/panel";
import { Placeholder } from "@/components/layout/placeholder";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { TextLink } from "@/components/layout/text-link";
import { StageScreen } from "@/components/product/stage-screen";
import { FeaturePanel } from "@/components/sections/feature-panel";
import { FinalCta } from "@/components/sections/final-cta";
import { ProductResources } from "@/components/sections/product-resources";
import { ProductStageBento } from "@/components/sections/product-stage-bento";
import { ProductStageList } from "@/components/sections/product-stage-list";
import { StageIndex } from "@/components/sections/stage-index";
import { FRAME_CLASS, STAGE_CLASS } from "@/components/sections/hero";
import { ctas } from "@/content/draft";
import type { Product } from "@/content/products";

/** Hero painting for the lab variant (placeholder until a dedicated one is made). */
const HERO_ART = "/art/backdrops/home-build.png";

/**
 * Shared product page template (/voice-ai, /chat-agents, /qa, /telephony).
 * Top to bottom: hero, then EITHER the product's lifecycle stages (Build /
 * Ship / Improve) OR the generic split, mirrored split, wide panel and "How it
 * works", then a single quote and the closing CTA.
 */
export function ProductPage({
  product,
  variant = "default",
}: {
  product: Product;
  /** "fin": lab variant from FIN_REVIEW.md (lighter numbered stages, light UI,
   *  sticky stage index, blur reveal, highlighted quote, Talk-to-agent wired). */
  variant?: "default" | "fin";
}) {
  const [first, second, third] = product.features;
  const fin = variant === "fin";
  const reveal = fin ? "reveal-blur" : "reveal";
  const talkHref = fin ? "/#listen" : ctas.talk.href;
  const starts = (product.stages ?? []).map((_, i, all) =>
    all.slice(0, i).reduce((n, st) => n + st.items.length, 1),
  );

  return (
    <>
      {/* Hero */}
      <Section
        id="product-hero"
        spacing="none"
        className="pt-16 pb-(--section-pad) md:pt-24"
      >
        <Container>
          <p className={`${reveal} text-small text-ink-muted`}>
            {product.name}
          </p>
          <h1
            className={`${reveal} mt-3 max-w-[26ch] text-display font-normal`}
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {product.headline}
          </h1>
          <p
            className={`${reveal} mt-5 max-w-[52ch] text-body-lg text-ink-secondary`}
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {product.subhead}
          </p>
          <div
            className={`${reveal} mt-8 flex flex-wrap gap-2`}
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
            <Link
              href={talkHref}
              className={buttonVariants({ variant: "secondary" })}
            >
              {ctas.talk.label}
            </Link>
          </div>
          <div
            className={`${reveal} mt-12 md:mt-16`}
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {fin && product.stages ? (
              /* The one painted moment on the page; stages below stay plain. */
              <div
                className={`relative isolate overflow-hidden rounded-md ${STAGE_CLASS}`}
              >
                <Image
                  src={HERO_ART}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1300px) 1300px, 100vw"
                  className="-z-10 object-cover"
                />
                <StageScreen
                  visual="campaign"
                  light
                  className={FRAME_CLASS}
                />
              </div>
            ) : (
              <Placeholder
                label="Backdrop: art or colour field"
                className={STAGE_CLASS}
              >
                <Placeholder
                  variant="frame"
                  label={product.heroVisual}
                  className={FRAME_CLASS}
                />
              </Placeholder>
            )}
          </div>
        </Container>
      </Section>

      {product.stages ? (
        /* Lifecycle stages (e.g. Voice AI): one big image + small cards each */
        fin ? (
          <>
            {product.stages.map((stage, i) => (
              <ProductStageList
                key={stage.id}
                stage={stage}
                start={starts[i]}
                productName={product.name}
              />
            ))}
            <StageIndex
              stages={product.stages.map((st) => ({
                id: st.id,
                label: st.label,
              }))}
            />
          </>
        ) : (
          product.stages.map((stage) => (
            <ProductStageBento key={stage.id} stage={stage} />
          ))
        )
      ) : (
        <>
          {/* Features 1 and 2: split, then mirrored split */}
          <FeaturePanel id="product-feature-1" {...first} media="end" />
          <FeaturePanel id="product-feature-2" {...second} media="start" />

          {/* Feature 3: wide panel, copy above a 21:9 visual */}
          <Section id="product-feature-3" spacing="tight">
            <Container>
              <Panel className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-5">
                  <h2 className="max-w-[48ch] text-h3 font-normal">
                    {third.title}
                    <span className="block text-ink-secondary">
                      {third.body}
                    </span>
                  </h2>
                  <TextLink href="#">{third.link}</TextLink>
                </div>
                <Placeholder
                  variant="frame"
                  label={third.visual}
                  className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
                />
              </Panel>
            </Container>
          </Section>

          {/* How it works: three verb-led columns, no step numbers */}
          <Section id="product-how">
            <Container>
              <SectionHeader title="How it works" />
              <ol className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-10">
                {product.how.map((step) => (
                  <li key={step.verb} className="flex flex-col gap-2">
                    <h3 className="text-h4 font-medium">{step.verb}</h3>
                    <p className="max-w-[40ch] text-small text-ink-secondary">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Container>
          </Section>
        </>
      )}

      {/* Proof: one quote, large */}
      <Section id="product-proof" spacing="tight">
        <Container>
          <Panel className="px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
            <figure className="flex max-w-[56ch] flex-col gap-8">
              <blockquote className="text-h3 font-normal">
                Customer quote about {product.name}. One to three lines on{" "}
                {fin ? (
                  <mark className="bg-line px-0.5 text-foreground">
                    a real, measurable result.
                  </mark>
                ) : (
                  "a real, measurable result."
                )}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Placeholder
                  label=""
                  className="size-10 shrink-0 rounded-full"
                />
                <span className="flex flex-col">
                  <span className="text-small font-medium">Name</span>
                  <span className="text-small text-ink-muted">
                    Role, Company
                  </span>
                </span>
              </figcaption>
            </figure>
          </Panel>
        </Container>
      </Section>

      {product.resources && <ProductResources resources={product.resources} />}

      <FinalCta id="product-cta" title={product.ctaTitle} />
    </>
  );
}
