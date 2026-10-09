"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { UseCases } from "@/components/sections/use-cases"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { useCases } from "@/content/platform"
import { cn } from "@/lib/utils"

const PANORAMA = "/art/panorama.webp"
const N = useCases.length

/**
 * Use cases as a pinned scroll scene. The section is N screens tall; the
 * view stays pinned while the panorama pans left to right and eases inward,
 * and each use case takes its turn as the large story card. A list of all six
 * shows progress and jumps to any of them. Reduced motion gets the grid.
 */
export function UseCasesScroll() {
  const reduce = usePrefersReducedMotion()
  if (reduce) return <UseCases />
  return <Scene />
}

function Scene() {
  const track = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const [active, setActive] = useState(0)
  const [overflow, setOverflow] = useState(0)

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })

  // How far the image can pan: its width beyond the viewport.
  useEffect(() => {
    const measure = () => {
      const el = img.current
      if (el) setOverflow(Math.max(0, el.offsetWidth - window.innerWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -overflow])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N))))
  })

  const jump = (i: number) => {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const per = (el.offsetHeight - window.innerHeight) / N
    window.scrollTo({ top: top + per * i + per * 0.4, behavior: "smooth" })
  }

  return (
    <Section id="product-use-cases" spacing="none">
      <div ref={track} style={{ height: `${N * 90 + 10}vh` }}>
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* Panorama: pans left to right and eases inward as you scroll. */}
          <motion.div aria-hidden className="absolute inset-y-0 left-0 origin-center" style={{ x, scale }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- sized by height, measured for panning */}
            <img
              ref={img}
              src={PANORAMA}
              alt=""
              onLoad={() => setOverflow(Math.max(0, (img.current?.offsetWidth ?? 0) - window.innerWidth))}
              className="h-svh w-auto max-w-none object-cover"
            />
          </motion.div>
          <span aria-hidden className="absolute inset-0 bg-background/15" />
          <span aria-hidden className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-background/85 to-transparent" />

          <Container className="relative flex h-full flex-col pt-20 pb-8 md:pt-24">
            <div className="flex items-end justify-between gap-6">
              <div className="flex max-w-[40rem] flex-col gap-3">
                <h2 className="text-h2 font-normal">What teams put agents on.</h2>
                <p className="text-body text-ink-secondary">Start with one high-volume call type, then add the next.</p>
              </div>
              <span className="hidden font-mono text-label text-ink-secondary tabular-nums sm:block">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-6 flex min-h-0 flex-1 items-center gap-10 md:mt-10">
              {/* All use cases: progress + jump */}
              <ol className="hidden w-60 shrink-0 flex-col gap-0.5 rounded-lg bg-background/75 p-1.5 shadow-sm backdrop-blur-md lg:flex">
                {useCases.map((u, i) => (
                  <li key={u.title}>
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={i === active ? "step" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-small transition-colors duration-300",
                        i === active ? "bg-foreground text-background" : "text-ink-secondary hover:bg-surface hover:text-foreground"
                      )}
                    >
                      <span className="font-mono text-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {u.title}
                    </button>
                  </li>
                ))}
              </ol>

              {/* The active story */}
              <div className="relative mx-auto flex w-full max-w-[36rem] lg:mr-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    className="flex w-full shadow-[0_30px_80px_-30px_oklch(0_0_0/0.45)]"
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <UseCaseStory useCase={useCases[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile progress */}
            <div className="mt-4 flex justify-center gap-1.5 lg:hidden" aria-hidden>
              {useCases.map((u, i) => (
                <span
                  key={u.title}
                  className={cn("h-1 rounded-full transition-all duration-300", i === active ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30")}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Section>
  )
}
