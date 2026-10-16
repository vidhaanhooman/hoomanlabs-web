import { InfoIcon } from "@phosphor-icons/react/dist/ssr"

import { anchor, type Block } from "@/content/blog"

/** A post's content blocks, typeset for reading. `h2`s carry ids for the table of contents. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-body-lg leading-[1.75] text-ink-secondary">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>
          case "h2":
            return (
              <h2 key={i} id={anchor(b.text)} className="mt-6 scroll-mt-24 text-h3 font-normal text-foreground">
                {b.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-h4 font-normal text-foreground">
                {b.text}
              </h3>
            )
          case "list":
            return (
              <ul key={i} className="flex list-disc flex-col gap-2 pl-6 marker:text-ink-muted">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )
          case "quote":
            return (
              <figure key={i} className="my-2 border-l-2 border-foreground pl-6">
                <blockquote className="text-h4 leading-snug font-normal text-foreground">“{b.text}”</blockquote>
                {b.by && <figcaption className="mt-2 text-small text-ink-muted">{b.by}</figcaption>}
              </figure>
            )
          case "callout":
            return (
              <p key={i} className="flex gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-small text-ink-secondary">
                <InfoIcon className="mt-0.5 size-4 shrink-0" />
                {b.text}
              </p>
            )
          case "code":
            return (
              <pre key={i} className="ui-dark overflow-x-auto rounded-lg px-5 py-4 font-mono text-[13px] leading-relaxed">
                <code>{b.text}</code>
              </pre>
            )
        }
      })}
    </div>
  )
}
