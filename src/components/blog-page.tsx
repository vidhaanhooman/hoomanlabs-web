import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Cover } from "@/components/blog/cover"
import { PostMeta } from "@/components/blog/post-card"
import { PostGrid } from "@/components/blog/post-grid"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { blogPage as c, postHref, type Post } from "@/content/blog"

/**
 * /blog: the header, the latest post as a feature (cover on the left, its
 * title, line and meta on the right with the button at the foot), then the
 * topic chips and every other post in a paged three-column grid. Posts come from Sanity (lib/blog.ts),
 * newest first.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function BlogPage({ posts }: { posts: Post[] }) {
  const [featured] = posts

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
            <Link href={postHref(featured.slug)} className="group grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
              <Cover post={featured} size="feature" />
              <span className="flex flex-col gap-4 border-t border-line pt-6">
                <span className="text-h2 font-normal group-hover:underline group-hover:underline-offset-4">{featured.title}</span>
                <span className="text-body text-ink-secondary">{featured.excerpt}</span>
                <PostMeta post={featured} />
                <span className={buttonVariants({ className: "mt-4 w-fit lg:mt-auto" })}>
                  Read the post
                  <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </Container>
        </Section>
      )}

      <Section id="blog-posts" className="pb-(--section-gap)">
        <Container>
          <PostGrid posts={posts} featured={featured?.slug} />
        </Container>
      </Section>
    </div>
  )
}
