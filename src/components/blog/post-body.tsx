import Image from "next/image"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import { PortableText, type PortableTextBlockComponent, type PortableTextComponents } from "@portabletext/react"

import { anchor, blockText, headingTags, type PortableBlock } from "@/content/blog"
import { imageFrom, type SanityImage } from "@/lib/sanity"

/**
 * A post's body (Sanity Portable Text), typeset for reading. Heading levels
 * are relative to the post (see headingTags): its sections render as h2s
 * with ids for the table of contents, lower levels as h3 and h4. Supports
 * bold, italic, code and links, bullet and numbered lists, quotes, images
 * with captions and audio clips, plus the blocks lib/blog.ts builds for
 * stories and use cases: a summary panel, a pull quote and FAQs.
 */

type Audio = { url?: string; caption?: string }
type Summary = { lead?: string; points?: string[] }
type PullQuote = { text?: string; author?: string }
type Faqs = { faqs?: { _key?: string; question?: string; answer?: string }[] }

const HEADING: Record<"h2" | "h3" | "h4", string> = {
  h2: "mt-6 scroll-mt-24 text-h3 font-normal text-foreground",
  h3: "mt-2 text-h4 font-normal text-foreground",
  h4: "mt-1 text-body-lg font-medium text-foreground",
}

/** A heading block rendered at the tag the post's level map gives it. */
const heading = (tag: "h2" | "h3" | "h4"): PortableTextBlockComponent =>
  function Heading({ children, value }) {
    const Tag = tag
    return (
      <Tag id={tag === "h2" ? anchor(blockText(value as PortableBlock)) : undefined} className={HEADING[tag]}>
        {children}
      </Tag>
    )
  }

const HEADINGS = { h2: heading("h2"), h3: heading("h3"), h4: heading("h4") }

const BLOCKS: Record<string, PortableTextBlockComponent> = {
  normal: ({ children }) => <p>{children}</p>,
  blockquote: ({ children }) => (
    <figure className="my-2 border-l-2 border-foreground pl-6">
      <blockquote className="text-h4 leading-snug font-normal text-foreground">{children}</blockquote>
    </figure>
  ),
}

const components: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-ink-muted">{children}</ul>,
    number: ({ children }) => <ol className="flex list-decimal flex-col gap-2 pl-6 marker:text-ink-muted">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>,
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? "#"
      const external = /^https?:\/\//.test(href) && !href.includes("hoomanlabs.com")
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-foreground underline underline-offset-4 hover:decoration-2">
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const img = imageFrom(value as SanityImage)
      if (!img) return null
      return (
        <figure className="my-2 flex flex-col gap-2">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 44rem, 100vw" className="h-auto w-full rounded-lg border border-line bg-surface" />
          {img.caption && img.caption !== img.alt && <figcaption className="text-small text-ink-muted">{img.caption}</figcaption>}
        </figure>
      )
    },
    audioEmbed: ({ value }) => {
      const a = value as Audio
      if (!a.url) return null
      return (
        <figure className="my-2 flex flex-col gap-2 rounded-lg border border-line bg-surface p-4">
          <audio controls preload="none" src={a.url} className="w-full">
            <a href={a.url}>Listen to the recording</a>
          </audio>
          {a.caption && <figcaption className="text-small text-ink-muted">{a.caption}</figcaption>}
        </figure>
      )
    },
    summary: ({ value }) => {
      const s = value as Summary
      return (
        <div className="flex flex-col gap-4 rounded-lg bg-surface p-6">
          <span className="font-mono text-label text-ink-muted">In short</span>
          {s.lead && <p className="text-foreground">{s.lead}</p>}
          {!!s.points?.length && (
            <ul className="flex list-disc flex-col gap-2 pl-6 text-body marker:text-ink-muted">
              {s.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      )
    },
    pullQuote: ({ value }) => {
      const q = value as PullQuote
      if (!q.text) return null
      return (
        <figure className="my-2 flex flex-col gap-4 border-l-2 border-foreground pl-6">
          <blockquote className="text-h4 leading-snug font-normal text-foreground">“{q.text}”</blockquote>
          {q.author && <figcaption className="text-small text-ink-muted">{q.author}</figcaption>}
        </figure>
      )
    },
    faqList: ({ value }) => {
      const faqs = ((value as Faqs).faqs ?? []).filter((f) => f.question)
      return (
        <div className="flex flex-col border-t border-line">
          {faqs.map((f, i) => (
            <details key={f._key ?? i} className="group border-b border-line py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-foreground [&::-webkit-details-marker]:hidden">
                {f.question}
                <PlusIcon className="size-4 shrink-0 text-ink-muted transition-transform group-open:rotate-45" />
              </summary>
              {f.answer && <p className="mt-3 text-body">{f.answer}</p>}
            </details>
          ))}
        </div>
      )
    },
  },
}

export function PostBody({ blocks }: { blocks: PortableBlock[] }) {
  const tags = headingTags(blocks)
  const levels = Object.fromEntries(["h1", "h2", "h3", "h4"].map((s) => [s, HEADINGS[tags[s] ?? "h4"]]))
  return (
    <div className="flex flex-col gap-6 text-body-lg leading-[1.75] text-ink-secondary">
      <PortableText value={blocks as Parameters<typeof PortableText>[0]["value"]} components={{ ...components, block: { ...BLOCKS, ...levels } }} />
    </div>
  )
}
