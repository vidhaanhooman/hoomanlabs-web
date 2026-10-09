import { HeroCallCard } from "@/components/sections/hero-call-card"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"

/** The hero scene: the parallax painting with the one call card on it. */
export function HeroScene() {
  return (
    <HeroParallaxStage className="min-h-[46rem] sm:min-h-[44rem] lg:aspect-[16/9] lg:min-h-0">
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 py-8">
        <HeroCallCard />
      </div>
    </HeroParallaxStage>
  )
}
