import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Painted background for an illustration tile, so every tile reads as a small
 * piece of the hero painting. Uses a dedicated painting at
 * public/art/<dir>/<name>.(webp|png|jpg) if one exists; otherwise a crop of
 * one of the existing gouache paintings. Slightly blurred and washed so the
 * UI on top stays the focus.
 */

export type Painting = { src: string; position: string }

const EXTS = ["webp", "png", "jpg", "jpeg"]

function findArt(dir: string, name: string) {
  for (const ext of EXTS) {
    const file = dir ? `art/${dir}/${name}.${ext}` : `art/${name}.${ext}`
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`
  }
  return null
}

/** Where this tile sits in a grid that shares one panorama. */
export type Slice = { cols: number; rows: number; col: number; row: number }

const WASH = <span aria-hidden className="absolute inset-0 -z-10 bg-background/25" />

export function TileBackdrop({
  painting,
  art,
  slice,
  className,
}: {
  /** Crop of an existing painting: image path and object-position. */
  painting: Painting
  /** Dedicated painting that replaces the crop: [folder under public/art, name]. */
  art?: [string, string]
  /**
   * Slice of public/art/panorama.(webp|png|jpg), if it exists: the grid shows
   * one continuous landscape, each tile its own cell. Wins over `painting`.
   */
  slice?: Slice
  className?: string
}) {
  const panorama = slice ? findArt("", "panorama") : null
  if (slice && panorama) {
    const x = slice.cols > 1 ? (slice.col / (slice.cols - 1)) * 100 : 50
    const y = slice.rows > 1 ? (slice.row / (slice.rows - 1)) * 100 : 50
    return (
      <>
        <span
          aria-hidden
          className={cn("absolute inset-0 -z-20 bg-no-repeat blur-[2px]", className)}
          style={{
            backgroundImage: `url(${panorama})`,
            backgroundSize: `${slice.cols * 100}% auto`,
            backgroundPosition: `${x}% ${y}%`,
          }}
        />
        {WASH}
      </>
    )
  }

  const own = art ? findArt(art[0], art[1]) : null
  return (
    <>
      <Image
        src={own ?? painting.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className={cn("-z-20 object-cover blur-[2px]", !own && "scale-125", className)}
        style={own ? undefined : { objectPosition: painting.position, transformOrigin: painting.position }}
      />
      {/* Soft wash: the painting becomes atmosphere, not detail. */}
      {WASH}
    </>
  )
}
