import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { useCases } from "@/content/platform"

const DIR = "art/use-cases"
const EXTS = ["webp", "png", "jpg", "jpeg"]

/** First matching file in public/art/use-cases/, or null (shows a placeholder). */
function findImage(name: string) {
  for (const ext of EXTS) {
    const file = `${DIR}/${name}.${ext}`
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`
  }
  return null
}

/** What teams use agents for: a photo of the moment, the job, and the result it drives. */
export function UseCases() {
  return (
    <Section id="product-use-cases">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">What teams put agents on.</h2>
          <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => {
            const src = findImage(u.image)
            return (
              <li key={u.title} className="flex flex-col gap-2">
                {src ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line">
                    <Image src={src} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <Placeholder label={`Photo: ${u.image}`} className="aspect-[4/3]" />
                )}
                <h3 className="mt-3 text-body font-medium">{u.title}</h3>
                <p className="text-small text-ink-secondary">{u.body}</p>
                <p className="mt-auto pt-1 font-mono text-label text-ink-muted">→ {u.result}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
