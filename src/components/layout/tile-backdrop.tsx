import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Background for an illustration tile. If a painting exists at
 * public/art/<dir>/<name>.(webp|png|jpg) it is used; otherwise a soft colour
 * field: the tone's base, a deeper glow from one corner, and a halftone dot
 * grid in the deep tone fading out from the same corner.
 */

export type Tone = "sage" | "ochre" | "terracotta" | "sky" | "lavender" | "sand"

const EXTS = ["webp", "png", "jpg", "jpeg"]

function findArt(dir: string, name: string) {
  for (const ext of EXTS) {
    const file = `art/${dir}/${name}.${ext}`
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`
  }
  return null
}

export function TileBackdrop({
  tone,
  focus,
  art,
  className,
}: {
  tone: Tone
  /** CSS position of the glow and densest dots, e.g. "15% 20%". */
  focus: string
  /** Optional painting: [folder under public/art, file name without extension]. */
  art?: [string, string]
  className?: string
}) {
  const src = art ? findArt(art[0], art[1]) : null
  if (src)
    return (
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className={cn("-z-10 object-cover", className)} />
    )

  const deep = `var(--tone-${tone}-deep)`
  const mask = `radial-gradient(ellipse 75% 85% at ${focus}, black 0%, transparent 100%)`
  return (
    <span aria-hidden className={cn("absolute inset-0 -z-10", className)} style={{ background: `var(--tone-${tone})` }}>
      <span
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 80% 90% at ${focus}, color-mix(in oklch, ${deep} 55%, transparent), transparent 70%)` }}
      />
      <span
        className="absolute inset-0 bg-size-[7px_7px] opacity-70"
        style={{
          backgroundImage: `radial-gradient(circle, ${deep} 0.9px, transparent 1.1px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </span>
  )
}
