import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

import { Cover } from "@/components/blog/cover";
import { PostBody } from "@/components/blog/post-body";
import { PostAside } from "@/components/blog/post-aside";
import { PostCard } from "@/components/blog/post-card";
import { Toc } from "@/components/blog/toc";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { formatDate, tocHeadings, type Post } from "@/content/blog";

/**
 * /blog/[slug]: the header (topic, title, excerpt, author, date, reading
 * time) over the cover, then the text with a side rail (the table of
 * contents and copy-link; a story's company panel above them), all on one
 * frame so every edge lines up, and related posts (same topic first). Content comes from Sanity (lib/blog.ts).
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties;

// One frame for the whole post: the header, cover, side rail + text and
// related posts share its left and right edges (rail 11rem + gap 3rem + text 44rem).
const FRAME = "mx-auto w-full max-w-[58rem]";

export function PostPage({ post, posts }: { post: Post; posts: Post[] }) {
  const headings = tocHeadings(post.body);
  const related = [
    ...posts.filter(
      (p) => p.slug !== post.slug && p.category === post.category,
    ),
    ...posts.filter(
      (p) => p.slug !== post.slug && p.category !== post.category,
    ),
  ].slice(0, 3);

  return (
    <div style={ROOMY}>
      <Section
        id="post-hero"
        spacing="none"
        className="pt-10 pb-(--section-pad) md:pt-16"
      >
        <Container>
          <div className={FRAME}>
            <p className="reveal flex items-center gap-2 text-small text-ink-muted">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <ArrowLeftIcon className="size-3.5" />
                Blog
              </Link>
              <span aria-hidden>/</span>
              {post.category}
            </p>
            <h1
              className="reveal mt-4 text-display font-normal text-balance"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {post.title}
            </h1>
            <p
              className="reveal mt-5 max-w-[44rem] text-body-lg text-ink-secondary"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {post.excerpt}
            </p>
            <div
              className="reveal mt-8 flex items-center gap-3 text-small"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-full bg-surface text-label"
              >
                {post.author.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="flex flex-col leading-tight">
                <span>{post.author.name}</span>
                <span className="text-ink-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                  {post.minutes} min read
                </span>
              </span>
            </div>
          </div>
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <Cover post={post} size="hero" className={FRAME} />
        </Container>
      </Section>

      <Section id="post-body">
        <Container>
          <div
            className={`${FRAME} grid gap-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-12`}
          >
            {/* The rail: a story's company panel, then the table of contents, which stays in view while reading. */}
            <aside className="flex flex-col gap-10">
              {post.aside && <PostAside aside={post.aside} />}
              <div className="lg:sticky lg:top-24">
                <Toc headings={headings} />
              </div>
            </aside>
            <article className="min-w-0">
              <PostBody blocks={post.body ?? []} />
            </article>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section id="post-related">
          <Container>
            <div className={FRAME}>
              <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-line pt-10">
                <h2 className="text-h2 font-normal">Keep reading.</h2>
                <Link
                  href="/blog"
                  className="text-small text-ink-secondary hover:text-foreground"
                >
                  All posts →
                </Link>
              </div>
              <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
