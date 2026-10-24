import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr"

import type { PostAside as Aside } from "@/content/blog"

/**
 * The panel beside a customer story or use case: the company's facts and
 * results (stories) or the post's call to action (use cases). It sits at
 * the top of the post's side rail, above the table of contents.
 */
export function PostAside({ aside }: { aside: Aside }) {
  const host = aside.website?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
  const external = !!aside.cta && /^https?:\/\//.test(aside.cta.href)

  return (
    <div className="flex flex-col gap-6 text-small">
      {!!aside.results.length && (
        <ul className="flex flex-col gap-4">
          {aside.results.map((r, i) => (
            <li key={i} className="flex flex-col gap-1">
              <span className="text-h3 font-normal text-foreground">{r.value}</span>
              <span className="text-ink-secondary">{r.label}</span>
            </li>
          ))}
        </ul>
      )}
      {(aside.about || aside.company) && (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-label text-ink-muted">About {aside.company ?? "the company"}</span>
          {aside.about && <p className="text-ink-secondary">{aside.about}</p>}
        </div>
      )}
      {!!aside.facts.length && (
        <dl className="flex flex-col gap-3 border-t border-line pt-4">
          {aside.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <dt className="text-label text-ink-muted">{f.label}</dt>
              <dd className="text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {aside.website && host && (
        <a href={aside.website} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1 text-ink-secondary hover:text-foreground">
          {host}
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      )}
      {aside.cta && (
        <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
          {aside.cta.text && <p className="text-foreground">{aside.cta.text}</p>}
          <Link
            href={aside.cta.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex w-fit items-center gap-1 rounded-full bg-foreground px-3.5 py-1.5 text-background transition-opacity hover:opacity-90"
          >
            {aside.cta.label}
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
