import Link from "next/link"
import { ArrowRightIcon, RssSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { Cover } from "@/components/blog/cover"
import { PostMeta } from "@/components/blog/post-card"
import { PostGrid } from "@/components/blog/post-grid"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { blogPage as c, postHref, posts } from "@/content/blog"

/**
 * /blog: the latest post as a wide feature, then every other post in a grid
 * with topic chips, and a quiet subscribe strip (RSS now; the email
 * newsletter is marked as coming). Posts come from content/blog.ts
 * (placeholders until real posts are written).
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  const [featured, ...rest] = sorted

  return (
    <div style={ROOMY}>
      <Section id="blog-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <p className="reveal text-small text-ink-muted">Blog</p>
          <h1 className="reveal mt-3 max-w-[20ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {c.title}
          </h1>
          <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
            {c.line}
          </p>
        </Container>
      </Section>

      {featured && (
        <Section id="blog-featured">
          <Container>
            <Link href={postHref(featured.slug)} className="group grid gap-8 rounded-xl border border-line p-3 transition-colors hover:border-line-strong lg:grid-cols-[1.3fr_1fr] lg:gap-12">
              <Cover post={featured} size="feature" />
              <span className="flex flex-col justify-center gap-4 px-3 pb-4 lg:py-8 lg:pr-8 lg:pl-0">
                <span className="font-mono text-label text-ink-muted">Latest</span>
                <span className="text-h2 font-normal group-hover:underline group-hover:underline-offset-4">{featured.title}</span>
                <span className="text-body text-ink-secondary">{featured.excerpt}</span>
                <PostMeta post={featured} />
                <span className="mt-2 inline-flex items-center gap-1 text-small font-medium">
                  Read the post
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </Container>
        </Section>
      )}

      <Section id="blog-posts">
        <Container>
          <div className="mb-8 flex flex-col gap-3">
            <span className="font-mono text-label text-ink-muted">All posts</span>
            <h2 className="text-h2 font-normal">Everything we&apos;ve written.</h2>
          </div>
          <PostGrid posts={rest} />
        </Container>
      </Section>

      <Section id="blog-newsletter">
        <Container>
          <div className="flex flex-col gap-6 rounded-xl bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <span className="flex max-w-[34rem] flex-col gap-2">
              <span className="text-h3 font-normal">Get new posts as they land.</span>
              <span className="text-small text-ink-secondary">Follow along by RSS. An email newsletter is coming soon.</span>
            </span>
            <a href="/blog/rss.xml" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-background px-4 py-2 text-small transition-colors hover:bg-placeholder">
              <RssSimpleIcon className="size-4" />
              Subscribe by RSS
            </a>
          </div>
        </Container>
      </Section>
    </div>
  )
}
