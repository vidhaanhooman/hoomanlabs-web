import Image from "next/image"

import { cn } from "@/lib/utils"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import type { SectionId } from "@/content/sections"

/** Window position inside the backdrop; shared by placeholders and real screens. */
const WINDOW_CLASS = "absolute inset-x-[7%] top-[9%] bottom-[12%]"

/**
 * Cursor's boxed split panel: copy in one third, framed product in two thirds.
 * `media` sets which side the visual sits on at desktop. On mobile the copy
 * always comes first, visual below.
 */
export function FeaturePanel({
  id,
  title,
  body,
  link,
  linkHref = "#",
  visual,
  screen,
  backdrop,
  softBackdrop = false,
  media = "end",
}: {
  id: SectionId
  title: string
  body: string
  link: string
  linkHref?: string
  visual: string
  /** Optional recreated product screen; receives the window geometry classes. */
  screen?: (className: string) => React.ReactNode
  /** Artwork behind the window (public path). Grey placeholder when absent. */
  backdrop?: string
  /** Blur and wash the artwork so a busy screen on top stays the focus. */
  softBackdrop?: boolean
  media?: "start" | "end"
}) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <Panel className="grid items-center gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:gap-0 lg:p-3">
          <div
            className={cn(
              "flex flex-col gap-5 px-2 pt-4 sm:px-4 lg:px-10 lg:py-10",
              media === "start" && "lg:order-2"
            )}
          >
            <h2 className="text-h3 font-normal">
              {title}
              <span className="block text-ink-secondary">{body}</span>
            </h2>
            <TextLink href={linkHref}>{link}</TextLink>
          </div>
          <Placeholder
            label={backdrop ? "" : "Backdrop"}
            className={cn("aspect-[4/3] lg:col-span-2 lg:aspect-[16/11]", media === "start" && "lg:order-1")}
          >
            {backdrop ? (
              <Image
                src={backdrop}
                alt=""
                fill
                sizes="(min-width: 1300px) 860px, (min-width: 1024px) 66vw, 100vw"
                className={cn("object-cover", softBackdrop && "scale-105 blur-[2.5px]")}
              />
            ) : null}
            {backdrop && softBackdrop ? <span aria-hidden className="absolute inset-0 bg-background/20" /> : null}
            {screen ? (
              screen(
                `${WINDOW_CLASS} z-10 rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0.03_150/0.55)]`
              )
            ) : (
              <Placeholder variant="frame" label={visual} className={`${WINDOW_CLASS} z-10`} />
            )}
          </Placeholder>
        </Panel>
      </Container>
    </Section>
  )
}
