import { existsSync } from "node:fs"
import path from "node:path"

/**
 * The painting for an industry (public/art/solutions/<slug>.webp), or
 * undefined until it has been added, so the stage falls back to its painted
 * gradient. Checked at build time (the pages prerender).
 */
export function industryArt(slug: string) {
  const src = `/art/solutions/${slug}.webp`
  return existsSync(path.join(process.cwd(), "public", src)) ? src : undefined
}
