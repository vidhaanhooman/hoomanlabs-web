import { revalidateTag } from "next/cache"
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook"

/**
 * Sanity → site: a webhook calls this on publish, update or delete of a
 * blog post, and the blog's cache tag is refreshed (the list, the post and
 * RSS). The request must carry Sanity's signature, made with the secret in
 * SANITY_REVALIDATE_SECRET (set the same secret on the webhook in Sanity).
 * Stale pages are served once while the fresh ones build.
 */

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return Response.json({ ok: false, error: "Webhook secret isn't configured" }, { status: 500 })

  // Verify against the raw body, exactly as Sanity signed it.
  const body = await req.text()
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? ""
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ ok: false, error: "Invalid signature" }, { status: 401 })
  }

  let slug: string | undefined
  try {
    const doc = JSON.parse(body) as { slug?: string | { current?: string } }
    slug = typeof doc.slug === "string" ? doc.slug : doc.slug?.current
  } catch {}

  revalidateTag("blog", "max")
  if (slug) revalidateTag(`blog:${slug}`, "max")
  return Response.json({ ok: true, revalidated: slug ? ["blog", `blog:${slug}`] : ["blog"] })
}
