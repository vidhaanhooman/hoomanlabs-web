/**
 * Shared class recipes for patterns used in more than one place. /brand
 * renders from these, so the reference and the site can't drift apart.
 */

/** Stage behind a product screen: a soft grey a step below the panel, framed by a hairline. */
export const STAGE = "relative overflow-hidden rounded-md border border-line bg-placeholder"

/**
 * A dark product screen that runs past the stage's right and bottom edges,
 * as if the app is open. Pair with STAGE and a `.ui-dark` screen. The shadow
 * stays tight so the stage around it stays clean.
 */
export const SCREEN_BLEED =
  "absolute top-[8%] -bottom-[6%] left-[7%] w-[118%] rounded-tl-lg border border-black/10 shadow-[0_1px_2px_oklch(0.2_0_0/0.12),0_6px_12px_-6px_oklch(0.2_0_0/0.2),-4px_0_10px_-6px_oklch(0.2_0_0/0.12)]"
