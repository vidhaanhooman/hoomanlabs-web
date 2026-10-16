/**
 * Shared hero card styles. A plain module (not "use client") so both server
 * and client components get the class strings; hero-console.tsx re-exports
 * them for existing imports.
 */

/** The console window's own frame: dark, rounded, lifted off the backdrop. */
export const CONSOLE = "ui-dark flex size-full flex-col overflow-hidden rounded-xl border border-black/20 text-[13px] leading-[1.5] shadow-[0_40px_90px_-30px_oklch(0.2_0.04_40/0.65)]"
/**
 * A single dark card floating on the backdrop, for heroes that show one
 * object (a player, a graph, a phone) rather than a whole app window. Add
 * padding and size per use. FROSTED is the lighter, see-through variant for
 * small supporting cards around it.
 */
export const HERO_CARD = "ui-dark overflow-hidden rounded-2xl border border-white/10 text-[13px] leading-[1.5] shadow-[0_40px_90px_-30px_oklch(0.2_0.04_40/0.65)]"
export const FROSTED = "overflow-hidden rounded-xl border border-white/15 bg-[oklch(0.16_0.005_260/0.62)] text-[12.5px] leading-[1.5] text-white shadow-[0_24px_60px_-24px_oklch(0.1_0.02_60/0.7)] backdrop-blur-md"
