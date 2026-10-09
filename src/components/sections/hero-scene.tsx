"use client"

import { useState } from "react"

import { HeroCall } from "@/components/sections/hero-call"
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage"
import { SamplePlayer } from "@/components/sections/sample-player"
import { useCaseCalls } from "@/content/demo-calls"

/**
 * The hero scene: the parallax painting with the call box in the middle and a
 * glass sample player above it.
 */
export function HeroScene() {
  const [useCase, setUseCase] = useState(0)
  return (
    <HeroParallaxStage className="min-h-[36rem] sm:aspect-[16/10] sm:min-h-0 lg:aspect-[16/8]">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4">
        <SamplePlayer call={useCaseCalls[useCase]} />
        <HeroCall glass onUseCase={setUseCase} />
      </div>
    </HeroParallaxStage>
  )
}
