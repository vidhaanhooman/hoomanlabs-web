import { existsSync } from "node:fs"
import path from "node:path"

/** A public image path if the file exists, else undefined (the stage then shows its painted gradient). Checked at build time. */
const ifExists = (src: string) => (existsSync(path.join(process.cwd(), "public", src)) ? src : undefined)

/** The industry's photo (public/art/solutions/<slug>.webp). */
export const industryArt = (slug: string) => ifExists(`/art/solutions/${slug}.webp`)

/** The photo for one of an industry's moments (public/art/solutions/<slug>-<n>.webp), else its industry photo. */
export const momentArt = (slug: string, n: number) => ifExists(`/art/solutions/${slug}-${n}.webp`) ?? industryArt(slug)
