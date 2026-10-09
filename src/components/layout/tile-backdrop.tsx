import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Painted background for an illustration tile, so every tile reads as a small
 * piece of the hero painting. Uses a dedicated painting at
 * public/art/<dir>/<name>.(webp|png|jpg) if one exists; otherwise a crop of
 * one of the existing gouache paintings.
 */

export type Painting = { src: string; position: string }

const EXTS = ["webp", "png", "jpg", "jpeg"]

function findArt(dir: string, name: string) {
  for (const ext of EXTS) {
    const file = `art/${dir}/${name}.${ext}`
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`
  }
  return null
}

export function TileBackdrop({
  painting,
  art,
  className,
}: {
  /** Crop of an existing painting: image path and object-position. */
  painting: Painting
  /** Dedicated painting that replaces the crop: [folder under public/art, name]. */
  art?: [string, string]
  className?: string
}) {
  const own = art ? findArt(art[0], art[1]) : null
  return (
    <Image
      src={own ?? painting.src}
      alt=""
      fill
      sizes="(min-width: 1024px) 560px, 100vw"
      className={cn("-z-10 object-cover", !own && "scale-125", className)}
      style={own ? undefined : { objectPosition: painting.position, transformOrigin: painting.position }}
    />
  )
}
