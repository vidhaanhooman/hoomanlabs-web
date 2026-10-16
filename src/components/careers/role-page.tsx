import Link from "next/link"
import { ArrowLeftIcon, CheckIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { buttonVariants } from "@/components/ui/button"
import { APPLY_EMAIL, careersPage, type Role } from "@/content/careers"
import { cn } from "@/lib/utils"

/**
 * /careers/[slug]: one role. The header (team, title, location, type and
 * Apply), then the role in a reading column beside a sticky apply panel,
 * and the hiring process. Applications go by email for now (APPLY_EMAIL,
 * TO CONFIRM), with the role in the subject.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

const applyHref = (r: Role) => `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Application: ${r.title}`)}`

export function RolePage({ role }: { role: Role }) {
  const meta = [role.team, role.location, role.type]
  return (
    <div style={ROOMY}>
      <Section id="role-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <p className="reveal text-small text-ink-muted">
            <Link href="/careers" className="hover:text-foreground">
              Careers
            </Link>{" "}
            / {role.team}
          </p>
          <h1 className="reveal mt-3 text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {role.title}
          </h1>
          <div className="reveal mt-5 flex flex-wrap items-center gap-2" style={{ "--i": 2 } as React.CSSProperties}>
            {meta.map((m) => (
              <span key={m} className="rounded-full border border-line px-3 py-1 text-small text-ink-secondary">
                {m}
              </span>
            ))}
          </div>
          <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--i": 3 } as React.CSSProperties}>
            <a href={applyHref(role)} className={buttonVariants()}>
              Apply for this role
            </a>
            <Link href="/careers#careers-roles" className="inline-flex items-center gap-1.5 text-small text-ink-secondary hover:text-foreground">
              <ArrowLeftIcon className="size-3.5" />
              All open roles
            </Link>
          </div>
        </Container>
      </Section>

      <Section id="role-body">
        <Container className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <article className="flex max-w-[44rem] flex-col gap-12">
            <p className="text-h4 leading-relaxed font-normal">{role.intro}</p>
            {role.sections.map((s) => (
              <section key={s.title} className="flex flex-col gap-5">
                <h2 className="text-h3 font-normal">{s.title}</h2>
                <ul className="flex flex-col gap-3">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-body text-ink-secondary">
                      <CheckIcon weight="bold" className="mt-1.5 size-3.5 shrink-0 text-foreground" />
                      {it}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </article>

          {/* Apply */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-6">
              <span className="flex flex-col gap-1">
                <span className="text-body">{role.title}</span>
                <span className="text-small text-ink-muted">{meta.join(" · ")}</span>
              </span>
              <p className="text-small text-ink-secondary">Send your portfolio and a few lines about the work you&apos;re proudest of. We reply to everyone.</p>
              <a href={applyHref(role)} className={cn(buttonVariants(), "w-full")}>
                <EnvelopeSimpleIcon />
                Apply by email
              </a>
              <span className="text-label text-ink-muted">{APPLY_EMAIL}</span>
            </div>
          </aside>
        </Container>
      </Section>

      <Section id="role-process">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <span className="font-mono text-label text-ink-muted">Hiring process</span>
            <h2 className="text-h2 font-normal">What happens after you apply.</h2>
          </div>
          <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {careersPage.process.map((p, i) => (
              <li key={p.step} className="relative flex flex-col gap-2 border-t border-line pt-5">
                <span className="absolute -top-[5px] left-0 size-2.5 rounded-full border-2 border-background bg-foreground" />
                <span className="font-mono text-label text-ink-muted">Step {i + 1}</span>
                <span className="text-body">{p.step}</span>
                <span className="text-small text-ink-secondary">{p.body}</span>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-xl bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex flex-col gap-1">
              <span className="text-h4 font-normal">Sound like you?</span>
              <span className="text-small text-ink-secondary">We&apos;d love to see your work.</span>
            </span>
            <a href={applyHref(role)} className={buttonVariants()}>
              Apply for this role
            </a>
          </div>
        </Container>
      </Section>
    </div>
  )
}
