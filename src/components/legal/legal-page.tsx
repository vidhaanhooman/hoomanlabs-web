import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { anchor } from "@/content/blog"
import type { Block, PolicySection } from "@/content/privacy"

/**
 * A legal document (Privacy Policy, Terms of Service): only the text as
 * provided, its numbered sections from "1. Introduction" on, in one reading
 * column; nothing is added around it (no title, date or contents list). Web addresses and emails in the
 * text become links; links to hoomanlabs.com stay on the site.
 */

const LINK = /(https?:\/\/[^\s),]+|[\w.+-]+@[\w-]+\.[\w.]+)/g

function Linked({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK).map((part, i) => {
        if (i % 2 === 0) return part
        const email = part.includes("@") && !part.startsWith("http")
        const href = email ? `mailto:${part}` : part.replace(/^https?:\/\/(www\.)?hoomanlabs\.com/, "") || "/"
        const external = !email && !href.startsWith("/")
        return (
          <a key={i} href={href} className="break-words text-foreground underline underline-offset-4 hover:no-underline" {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {part}
          </a>
        )
      })}
    </>
  )
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          <Linked text={b.text} />
        </p>
      )
    case "h3":
      return <h3 className="mt-3 text-h4 font-normal text-foreground">{b.text}</h3>
    case "list":
      return (
        <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-ink-muted">
          {b.items.map((it, i) => (
            <li key={i}>
              {it.term && <span className="text-foreground">{it.term}: </span>}
              <Linked text={it.text} />
            </li>
          ))}
        </ul>
      )
    case "table":
      return (
        <div className="overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[32rem] table-fixed text-left text-small">
            <thead className="bg-surface text-ink-muted">
              <tr>
                {b.head.map((h, i) => (
                  <th key={h} className={["w-16", "w-36", "w-44", ""][i] + " px-3 py-2.5 font-normal"}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]} className="border-t border-line">
                  {r.map((cell, i) => (
                    <td key={i} className="px-3 py-2.5 align-top [&_a]:break-all">
                      <Linked text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "address":
      return (
        <address className="flex flex-col rounded-md bg-surface px-5 py-4 not-italic">
          {b.lines.map((l, i) => (
            <span key={l} className={i === 0 ? "text-foreground" : undefined}>
              <Linked text={l} />
            </span>
          ))}
        </address>
      )
  }
}

export function LegalPage({ id, sections }: { id: "privacy" | "terms"; sections: PolicySection[] }) {
  return (
    <Section id={`${id}-body`} className="pt-10 md:pt-16">
      <Container className="max-w-[44rem]">
        <article className="flex flex-col gap-12">
          {sections.map((s) => (
            <section key={s.title} className="flex scroll-mt-24 flex-col gap-4 text-body text-ink-secondary" id={anchor(s.title)}>
              <h2 className="text-h3 font-normal text-foreground">{s.title}</h2>
              {s.blocks.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </section>
          ))}
        </article>
      </Container>
    </Section>
  )
}
