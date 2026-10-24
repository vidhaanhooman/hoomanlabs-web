/**
 * Sanity: where the blog's posts live (project zqtjnm8g, dataset
 * production). The dataset is public, so reads need no token. Queries go
 * straight to the HTTP API (not the CDN): Next caches the results itself
 * and a webhook refreshes them on publish (see app/api/revalidate).
 *
 * The project ID and dataset aren't secrets; they can be overridden with
 * SANITY_PROJECT_ID / SANITY_DATASET (e.g. a staging dataset).
 */

export const SANITY = {
  projectId: process.env.SANITY_PROJECT_ID || "zqtjnm8g",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
}

/** Run a GROQ query. Throws on a failed request so callers can fall back. */
export async function sanityQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const url = new URL(`https://${SANITY.projectId}.api.sanity.io/v${SANITY.apiVersion}/data/query/${SANITY.dataset}`)
  url.searchParams.set("query", query)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v))
  // Only published documents (drafts aren't readable without a token anyway).
  url.searchParams.set("perspective", "published")
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${res.statusText}`)
  const json = (await res.json()) as { result: T }
  return json.result
}

/** A Sanity image reference, as stored in documents. */
export type SanityImage = { asset?: { _ref?: string }; alt?: string; caption?: string }

/**
 * The CDN URL for an image reference ("image-<id>-<w>x<h>-<ext>"), with its
 * size, so next/image can lay it out. Returns null for a missing image.
 */
export function imageFrom(img: SanityImage | null | undefined) {
  const ref = img?.asset?._ref
  const m = ref?.match(/^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/)
  if (!m) return null
  const [, id, w, h, ext] = m
  return {
    // The original file: next/image resizes it (and the allowed-image pattern has no query string).
    src: `https://cdn.sanity.io/images/${SANITY.projectId}/${SANITY.dataset}/${id}-${w}x${h}.${ext}`,
    width: Number(w),
    height: Number(h),
    alt: img?.alt ?? "",
    caption: img?.caption,
  }
}
