import { DeckFrame } from "@/components/sales-deck/deck-frame"
import { storyA } from "@/components/sales-deck/story-a"
import { storyB } from "@/components/sales-deck/story-b"

/**
 * The sales deck (/sales-deck for Story B, /sales-deck/a for Story A), built
 * from the content doc "HoomanLabs Sales Deck: Slide-by-Slide Content" in the
 * website's style. Slides are 1920 × 1080; Download PDF exports one per page.
 */
export function SalesDeck({ story }: { story: "a" | "b" }) {
  return <DeckFrame story={story}>{story === "a" ? storyA() : storyB()}</DeckFrame>
}
