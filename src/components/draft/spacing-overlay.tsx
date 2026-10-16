"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * Draft-only spacing overlay, drawn while the "Sections" outline is on.
 *
 * - Sections: top and bottom padding as bands, checked against
 *   --section-pad (resolved in that section's context, so a page's roomier
 *   spacing counts). Sections that own their padding (spacing="none", e.g.
 *   heroes) are amber "custom", not red.
 * - Containers: left and right padding, checked against --gutter.
 * - Click any element to inspect it: its box model (margin, padding,
 *   content), its gaps as pink bands (or its nearest flex/grid parent's,
 *   if it has none), and a panel with size, padding, margin, gap, type and
 *   radius, each named by its design-system token or flagged off-scale.
 *   Esc or the panel's close clears it; Alt-click uses the page normally.
 *
 * Matches are tinted; mismatches red with "actual ≠ token". Re-measures on
 * resize, scroll and every second while on.
 */

type State = "ok" | "off" | "custom"
type Band = { key: string; x: number; y: number; w: number; h: number; label: string; state: State; kind: "pad" | "gap"; vertical?: boolean }

const TOL = 0.5

/* -------------------------------------------------------------- tokens */

/** Resolve a CSS token in an element's own context, in px, through a hidden probe. */
function resolve(el: Element, value: string, prop: "paddingTop" | "fontSize" = "paddingTop") {
  const probe = document.createElement("div")
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;height:0;width:0"
  probe.style[prop] = value
  el.appendChild(probe)
  const v = parseFloat(getComputedStyle(probe)[prop]) || 0
  probe.remove()
  return v
}

const NAMED = ["--section-pad", "--section-gap", "--gutter"]
const TYPE = ["--text-display", "--text-h2", "--text-h3", "--text-h4", "--text-body-lg", "--text-body", "--text-small", "--text-label"]
const RADII = [
  ["--radius-sm", "calc(var(--radius) * 0.66)"],
  ["--radius", "var(--radius)"],
  ["--radius-xl", "calc(var(--radius) * 1.33)"],
]

/** Name a spacing value: a named layout token, else the 4px scale step (Tailwind's `4` = 16px), else off-scale. */
function spaceToken(el: Element, px: number): { name: string; ok: boolean } {
  if (px <= TOL) return { name: "0", ok: true }
  for (const t of NAMED) if (Math.abs(resolve(el, `var(${t})`) - px) <= TOL) return { name: t, ok: true }
  const step = px / 4
  if (Math.abs(step - Math.round(step)) * 4 <= TOL) return { name: `space-${Math.round(step)}`, ok: true }
  if (Math.abs(step * 2 - Math.round(step * 2)) * 2 <= TOL) return { name: `space-${(Math.round(step * 2) / 2).toString()}`, ok: true }
  return { name: "off-scale", ok: false }
}

/** Several type tokens can share a size (body and h4 are both 16px), so prefer the one the element's class names. */
function typeToken(el: Element, px: number) {
  const hits = TYPE.filter((t) => Math.abs(resolve(el, `var(${t})`, "fontSize") - px) <= TOL)
  if (!hits.length) return { name: "not a type token", ok: false }
  const own = hits.find((t) => el.classList.contains(t.replace("--", "")))
  return { name: own ?? hits.join(" / "), ok: true }
}

function radiusToken(el: Element, px: number) {
  if (px <= TOL) return { name: "none", ok: true }
  if (px >= 999) return { name: "full", ok: true }
  for (const [name, v] of RADII) if (Math.abs(resolve(el, v) - px) <= TOL) return { name, ok: true }
  return { name: "not a radius token", ok: false }
}

/* ------------------------------------------------------------- measure */

function measurePads(out: Band[]) {
  const sx = window.scrollX
  const sy = window.scrollY
  document.querySelectorAll<HTMLElement>("[data-section]").forEach((sec) => {
    const r = sec.getBoundingClientRect()
    if (!r.height) return
    const cs = getComputedStyle(sec)
    const want = resolve(sec, "var(--section-pad)")
    const custom = sec.dataset.spacing === "none"
    ;(["Top", "Bottom"] as const).forEach((side) => {
      const px = parseFloat(cs[`padding${side}`]) || 0
      if (!px && custom) return
      const ok = Math.abs(px - want) <= TOL
      out.push({
        key: `${sec.id}-${side}`,
        x: r.left + sx,
        y: (side === "Top" ? r.top : r.bottom - px) + sy,
        w: r.width,
        h: Math.max(px, 2),
        label: ok ? `${Math.round(px)}` : custom ? `${Math.round(px)} custom` : `${Math.round(px)} ≠ ${Math.round(want)} --section-pad`,
        state: ok ? "ok" : custom ? "custom" : "off",
        kind: "pad",
      })
    })
  })
  document.querySelectorAll<HTMLElement>("[data-container]").forEach((box, i) => {
    const r = box.getBoundingClientRect()
    if (!r.height || !r.width) return
    const cs = getComputedStyle(box)
    const want = resolve(box, "var(--gutter)")
    ;(["Left", "Right"] as const).forEach((side) => {
      const px = parseFloat(cs[`padding${side}`]) || 0
      const ok = Math.abs(px - want) <= TOL
      out.push({
        key: `c${i}-${side}`,
        x: (side === "Left" ? r.left : r.right - px) + sx,
        y: r.top + sy,
        w: Math.max(px, 2),
        h: r.height,
        label: ok ? `${Math.round(px)}` : `${Math.round(px)} ≠ ${Math.round(want)} --gutter`,
        state: ok ? "ok" : "off",
        kind: "pad",
        vertical: true,
      })
    })
  })
}

/** The element whose gaps to show: the picked one if it lays out with a gap, else its nearest parent that does. */
function gapOwner(el: HTMLElement | null) {
  for (let n = el; n && !n.matches("body"); n = n.parentElement) {
    const cs = getComputedStyle(n)
    if (/flex|grid/.test(cs.display) && ((parseFloat(cs.rowGap) || 0) || (parseFloat(cs.columnGap) || 0)) && n.children.length > 1) return n
  }
  return null
}

/** Flex and grid gaps between the visible children of one element. */
function measureGaps(out: Band[], el: HTMLElement | null) {
  const sx = window.scrollX
  const sy = window.scrollY
  const seen = new Set<string>()
  if (el) {
    const cs = getComputedStyle(el)
    const rg = parseFloat(cs.rowGap) || 0
    const cg = parseFloat(cs.columnGap) || 0
    const box = el.getBoundingClientRect()

    const kids = [...el.children]
      .filter((k) => {
        const s = getComputedStyle(k)
        return s.display !== "none" && s.position !== "absolute" && s.position !== "fixed"
      })
      .map((k) => k.getBoundingClientRect())
      .filter((r) => r.width && r.height)

    for (let i = 0; i < kids.length - 1; i++) {
      const a = kids[i]
      const b = kids[i + 1]
      let band: Omit<Band, "key" | "label" | "state" | "kind"> | null = null
      let px = 0
      let gap = 0
      if (cg && b.left >= a.right - 1 && b.top < a.bottom && b.bottom > a.top) {
        px = b.left - a.right
        gap = cg
        band = { x: a.right + sx, y: Math.min(a.top, b.top) + sy, w: px, h: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top), vertical: true }
      } else if (rg && b.top >= a.bottom - 1) {
        px = b.top - a.bottom
        gap = rg
        band = { x: box.left + sx, y: a.bottom + sy, w: box.width, h: px }
      }
      if (!band || px < 1) continue
      const key = `g${Math.round(band.x)}-${Math.round(band.y)}-${Math.round(band.w)}-${Math.round(band.h)}`
      if (seen.has(key)) continue
      seen.add(key)
      // Label the CSS gap; extra space (auto margins, justify) shows as "+N".
      const t = spaceToken(el, gap)
      const extra = Math.round(px - gap)
      const label = `${Math.round(gap)}${extra > 1 ? ` +${extra}` : ""}${t.ok ? "" : " off-scale"}`
      out.push({ ...band, key, label, state: t.ok ? "ok" : "off", kind: "gap" })
    }
  }
}

/* ------------------------------------------------------------ inspector */

type Box = { m: number[]; p: number[]; r: DOMRect }
type Row = { k: string; v: string; token?: string; ok?: boolean }

function sides(cs: CSSStyleDeclaration, prop: "padding" | "margin") {
  return (["Top", "Right", "Bottom", "Left"] as const).map((s) => parseFloat(cs[`${prop}${s}`]) || 0)
}

function inspect(el: HTMLElement): { box: Box; rows: Row[]; title: string; where: string } {
  const cs = getComputedStyle(el)
  const p = sides(cs, "padding")
  const m = sides(cs, "margin")
  const r = el.getBoundingClientRect()
  const rows: Row[] = []
  const four = (label: string, v: number[]) => {
    const uniq = [...new Set(v)]
    if (uniq.length === 1) {
      const t = spaceToken(el, uniq[0])
      rows.push({ k: label, v: `${Math.round(uniq[0])}`, token: t.name, ok: t.ok })
    } else {
      const ts = v.map((x) => spaceToken(el, x))
      rows.push({ k: label, v: v.map((x) => Math.round(x)).join(" "), token: ts.map((t) => t.name).join(" · "), ok: ts.every((t) => t.ok) })
    }
  }
  rows.push({ k: "Size", v: `${Math.round(r.width)} × ${Math.round(r.height)}` })
  four("Padding", p)
  four("Margin", m)
  if (/flex|grid/.test(cs.display)) {
    const rg = parseFloat(cs.rowGap) || 0
    const cg = parseFloat(cs.columnGap) || 0
    const t = spaceToken(el, rg || cg)
    rows.push({ k: rg === cg || !cg || !rg ? "Gap" : "Gap (row · col)", v: rg === cg || !cg || !rg ? `${Math.round(rg || cg)}` : `${Math.round(rg)} · ${Math.round(cg)}`, token: t.name, ok: rg === cg || !cg || !rg ? t.ok : t.ok && spaceToken(el, cg).ok })
    rows.push({ k: "Layout", v: `${cs.display}${cs.display.includes("flex") ? ` · ${cs.flexDirection}` : ""}` })
  }
  const fs = parseFloat(cs.fontSize)
  if (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent?.trim())) {
    const t = typeToken(el, fs)
    rows.push({ k: "Type", v: `${Math.round(fs * 10) / 10} / ${cs.lineHeight === "normal" ? "normal" : Math.round(parseFloat(cs.lineHeight))} · ${cs.fontWeight}`, token: t.name, ok: t.ok })
  }
  const rad = parseFloat(cs.borderTopLeftRadius) || 0
  if (rad) {
    const t = radiusToken(el, rad)
    rows.push({ k: "Radius", v: `${Math.round(rad)}`, token: t.name, ok: t.ok })
  }
  const sec = el.closest<HTMLElement>("[data-section]")
  const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 3).join(" ") : ""
  return { box: { m, p, r }, rows, title: `${el.tagName.toLowerCase()}${cls ? `.${cls.replace(/ /g, ".")}` : ""}`, where: sec?.id ?? "outside a section" }
}

/* ---------------------------------------------------------- font hover */

const COLORS = ["--foreground", "--ink-secondary", "--ink-muted", "--background", "--success", "--ai"]
const WEIGHT: Record<string, string> = { "300": "Light", "400": "Regular", "500": "Medium", "600": "Semibold", "700": "Bold" }

function colorToken(el: Element, color: string) {
  const probe = document.createElement("span")
  probe.style.cssText = "position:absolute;visibility:hidden"
  el.appendChild(probe)
  let hit: string | null = null
  for (const t of COLORS) {
    probe.style.color = `var(${t}, rgb(1, 2, 3))`
    if (getComputedStyle(probe).color === color) {
      hit = t
      break
    }
  }
  probe.remove()
  return hit
}

/** True when the element holds text of its own (not only through children). */
const ownsText = (el: Element) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent?.trim())

type Font = { r: DOMRect; token: { name: string; ok: boolean }; size: number; line: string; weight: string; tracking: string; family: string; color: string; colorToken: string | null; sample: string }

function readFont(el: HTMLElement): Font {
  const cs = getComputedStyle(el)
  const size = parseFloat(cs.fontSize)
  const lh = cs.lineHeight === "normal" ? "normal" : `${Math.round(parseFloat(cs.lineHeight))}px · ${(parseFloat(cs.lineHeight) / size).toFixed(2)}`
  const ls = cs.letterSpacing === "normal" ? "0" : `${(parseFloat(cs.letterSpacing) / size).toFixed(3).replace(/\.?0+$/, "")}em`
  return {
    r: el.getBoundingClientRect(),
    token: typeToken(el, size),
    size,
    line: lh,
    weight: `${cs.fontWeight} ${WEIGHT[cs.fontWeight] ?? ""}`.trim(),
    tracking: ls,
    family: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
    color: cs.color,
    colorToken: colorToken(el, cs.color),
    sample: (el.textContent ?? "").trim().slice(0, 28),
  }
}

/* -------------------------------------------------------------- render */

const TONE: Record<State, string> = {
  ok: "bg-[oklch(0.65_0.15_250/0.14)] text-[oklch(0.45_0.15_250)]",
  off: "bg-[oklch(0.63_0.22_25/0.22)] text-[oklch(0.5_0.22_25)] outline outline-1 outline-[oklch(0.63_0.22_25)]",
  custom: "bg-[oklch(0.78_0.15_75/0.2)] text-[oklch(0.5_0.12_70)]",
}
const GAP_TONE: Record<State, string> = {
  ok: "bg-[repeating-linear-gradient(45deg,oklch(0.68_0.2_350/0.22)_0_3px,transparent_3px_6px)] text-[oklch(0.5_0.2_350)]",
  off: TONE.off,
  custom: TONE.custom,
}

export function SpacingOverlay({ onCount }: { onCount: (n: number) => void }) {
  const [bands, setBands] = useState<Band[]>([])
  const [picked, setPicked] = useState<HTMLElement | null>(null)
  const [info, setInfo] = useState<ReturnType<typeof inspect> | null>(null)
  const [font, setFont] = useState<Font | null>(null)

  // Hover: font details for any element with its own text.
  useEffect(() => {
    let raf = 0
    let last: Element | null = null
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const t = document.elementFromPoint(e.clientX, e.clientY)
        if (t === last) return
        last = t
        if (!(t instanceof HTMLElement) || t.closest("[data-spacing-overlay], [data-outline-toggle]") || !ownsText(t)) return setFont(null)
        setFont(readFont(t))
      })
    }
    const onLeave = () => setFont(null)
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("scroll", onLeave, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("scroll", onLeave)
    }
  }, [])

  const run = useCallback(() => {
    const out: Band[] = []
    measurePads(out)
    onCount(out.filter((b) => b.state === "off").length)
    measureGaps(out, picked && picked.isConnected ? gapOwner(picked) : null)
    setBands(out)
    setInfo(picked && picked.isConnected ? inspect(picked) : null)
  }, [onCount, picked])

  useEffect(() => {
    const raf = requestAnimationFrame(run)
    const t = setInterval(run, 1000)
    let pending = 0
    const onScroll = () => {
      cancelAnimationFrame(pending)
      pending = requestAnimationFrame(run)
    }
    window.addEventListener("resize", run)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(pending)
      clearInterval(t)
      window.removeEventListener("resize", run)
      window.removeEventListener("scroll", onScroll)
    }
  }, [run])

  useEffect(() => () => onCount(0), [onCount])

  // Click to inspect (Alt-click passes through to the page).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.altKey) return
      const t = e.target as HTMLElement
      if (!t || t.closest("[data-spacing-overlay], [data-outline-toggle]")) return
      e.preventDefault()
      e.stopPropagation()
      setPicked(t)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPicked(null)
    document.addEventListener("click", onClick, true)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const sx = typeof window === "undefined" ? 0 : window.scrollX
  const sy = typeof window === "undefined" ? 0 : window.scrollY

  return (
    <div data-spacing-overlay>
      {font && <FontCard f={font} />}
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 z-40 w-full">
        {bands.map((b) => (
          <span
            key={b.key}
            className={`absolute flex items-center justify-center font-mono text-[10px] leading-none ${(b.kind === "gap" ? GAP_TONE : TONE)[b.state]}`}
            style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
          >
            {(b.vertical ? b.w >= 10 && b.h >= 24 : b.h >= 10 && b.w >= 24) && <span className={b.vertical ? "[writing-mode:vertical-rl]" : ""}>{b.label}</span>}
          </span>
        ))}

        {/* The picked element's box model: margin, padding, content */}
        {info && (
          <>
            <span
              className="absolute bg-[oklch(0.8_0.14_60/0.35)]"
              style={{
                left: info.box.r.left + sx - info.box.m[3],
                top: info.box.r.top + sy - info.box.m[0],
                width: info.box.r.width + info.box.m[1] + info.box.m[3],
                height: info.box.r.height + info.box.m[0] + info.box.m[2],
              }}
            />
            <span
              className="absolute bg-[oklch(0.78_0.15_145/0.4)] outline outline-1 outline-[oklch(0.55_0.15_145)]"
              style={{ left: info.box.r.left + sx, top: info.box.r.top + sy, width: info.box.r.width, height: info.box.r.height }}
            />
            <span
              className="absolute bg-[oklch(0.7_0.12_240/0.45)]"
              style={{
                left: info.box.r.left + sx + info.box.p[3],
                top: info.box.r.top + sy + info.box.p[0],
                width: Math.max(0, info.box.r.width - info.box.p[1] - info.box.p[3]),
                height: Math.max(0, info.box.r.height - info.box.p[0] - info.box.p[2]),
              }}
            />
          </>
        )}
      </div>

      {info && (
        <div className="fixed right-4 bottom-4 z-50 w-[22rem] overflow-hidden rounded-lg border border-line-strong bg-background font-mono text-[11.5px] text-foreground shadow-[0_20px_50px_-20px_oklch(0.2_0_0/0.45)]">
          <div className="flex items-start gap-2 border-b border-line px-3 py-2.5">
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{info.title}</span>
              <span className="text-ink-muted">in {info.where}</span>
            </span>
            <button type="button" onClick={() => setPicked(null)} className="ml-auto shrink-0 rounded px-1.5 text-ink-muted hover:text-foreground">
              Esc
            </button>
          </div>
          <dl className="flex flex-col px-3 py-1.5">
            {info.rows.map((row) => (
              <div key={row.k} className="grid grid-cols-[6.5rem_1fr] gap-2 py-1">
                <dt className="text-ink-muted">{row.k}</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2">
                  <span>{row.v}</span>
                  {row.token && <span className={row.ok ? "text-[oklch(0.5_0.13_150)]" : "rounded bg-[oklch(0.63_0.22_25)] px-1 text-white"}>{row.token}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3 border-t border-line px-3 py-2 text-[10.5px] text-ink-muted">
            <span className="flex items-center gap-1">
              <span className="size-2 bg-[oklch(0.8_0.14_60/0.6)]" />
              margin
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 bg-[oklch(0.78_0.15_145/0.7)]" />
              padding
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 bg-[oklch(0.7_0.12_240/0.7)]" />
              content
            </span>
            <span className="ml-auto">Alt-click: use page</span>
          </div>
        </div>
      )}
    </div>
  )
}

/** The hover card: the text outlined, and its type details beside it. */
function FontCard({ f }: { f: Font }) {
  const W = 260
  const below = f.r.top < 190
  const left = Math.min(Math.max(8, f.r.left), window.innerWidth - W - 8)
  const top = below ? f.r.bottom + 8 : f.r.top - 8
  const rows: [string, React.ReactNode][] = [
    ["Size", `${Math.round(f.size * 10) / 10}px`],
    ["Line", f.line],
    ["Weight", f.weight],
    ["Tracking", f.tracking],
    ["Family", f.family],
    [
      "Colour",
      <span key="c" className="flex items-center gap-1.5">
        <span className="size-3 rounded-[3px] ring-1 ring-white/25" style={{ background: f.color }} />
        {f.colorToken ?? <span className="text-[oklch(0.75_0.18_25)]">not a colour token</span>}
      </span>,
    ],
  ]
  return (
    <>
      <span aria-hidden className="pointer-events-none fixed z-[60] rounded-[3px] outline outline-1 outline-[oklch(0.68_0.2_350)] outline-offset-1" style={{ left: f.r.left, top: f.r.top, width: f.r.width, height: f.r.height }} />
      <div
        aria-hidden
        className="pointer-events-none fixed z-[60] overflow-hidden rounded-xl bg-[oklch(0.2_0.005_260)] text-[11.5px] text-white shadow-[0_18px_40px_-16px_oklch(0.1_0_0/0.6)] ring-1 ring-white/10"
        style={{ left, top, width: W, transform: below ? undefined : "translateY(-100%)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3.5 py-2.5">
          <span className={f.token.ok ? "font-mono text-[12px]" : "rounded bg-[oklch(0.63_0.22_25)] px-1.5 font-mono text-[12px]"}>{f.token.name}</span>
          <span className="truncate text-[15px] leading-none text-white/85" style={{ fontWeight: Number(f.weight.split(" ")[0]) }}>
            Aa
          </span>
        </div>
        <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 px-3.5 py-3">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-white/50">{k}</dt>
              <dd className="truncate tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        {f.sample && <p className="truncate border-t border-white/10 px-3.5 py-2 text-white/45">“{f.sample}”</p>}
      </div>
    </>
  )
}
