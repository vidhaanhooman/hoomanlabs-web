# HoomanLabs site (draft)

Mock marketing page we iterate on section by section, then lock.

```bash
npm run dev        # http://localhost:3000 (or -- -p 3100)
npm run lint
npm run typecheck
npm run build
```

## How drafting works

- **Section order and status** live in `src/content/sections.ts`. Each section is
  `"draft"` or `"locked"`. Locked sections are not edited unless set back to draft.
- **All placeholder copy** lives in `src/content/draft.ts`. It is length-correct
  stand-in text, not final copy.
- **"Sections: off/on"** (bottom-right) outlines every section with its name and
  status, so feedback can say "Build panel: …". It disappears once every section
  is locked.
- Grey blocks are **placeholders** labelled with what goes there and its ratio.

## System (black & white phase)

- Tokens: `src/app/globals.css`. Colour is added later by changing tokens there,
  never with one-off classes.
- Type: Geist + Geist Mono via `next/font`. Scale: `text-display`, `text-h2..h4`,
  `text-body-lg`, `text-body`, `text-small`, `text-label`.
- Shape rule: controls are fully rounded, containers use `--radius` (6px).
- Layout: 1300px container (Cursor's width), one section gap `--section-gap` (40px phone to 64px desktop).
- Motion: one hero entrance (CSS, reduced-motion safe), press scale 0.97 on
  buttons, Emil Kowalski easing curves.
- `cn` comes from `@/lib/utils`, which registers the custom type scale. Code
  added with `shadcn add` imports `cn` from `"cn"`, so repoint it to `@/lib/utils`.

## Routes

| Route | What |
|---|---|
| `/` | Home draft |
| `/voice-ai`, `/chat-agents`, `/qa`, `/telephony` | Product pages, one shared template (`src/components/product-page.tsx`), copy in `src/content/products.ts` |

Product pages are reached from the "Product" menu in the nav and the footer's Product column.

## Layout map (Cursor-based)

| # | Section | Layout |
|---|---|---|
| 1 | Hero | Left headline + 2 CTAs, product frame on backdrop, full width |
| 2 | Logos | 6 logo slots |
| 3 | Build panel | Boxed split: copy 1/3, product 2/3 |
| 4 | Test panel | Boxed split, mirrored |
| 5 | Deploy + Measure | Two panels, 7/5 |
| 6 | Testimonials | Centred title, 3×2 grid (swipe row on mobile) |
| 7 | Platform | Bento: 1 tall + 2 stacked |
| 8 | Trust | Hairline band: statement + badge slots |
| 9 | Changelog | 4 compact cards |
| 10 | Company | Boxed split: statement + team photo |
| 11 | Final CTA | Centred title + CTAs |
| – | Footer | Placeholder, awaiting reference |

## Demo callback ("Get this call on your phone")

The listen section posts to `src/app/api/callback/route.ts`, which creates a
task on the HoomanLabs API (`POST /routes/v1/tasks/`) so the demo agent for
the chosen use case calls the visitor back.

1. Copy `.env.example` to `.env.local` and fill in the token, campaign id and
   one agent id per use case. These are server-only and never reach the browser.
2. Restart `npm run dev`.

Without these values the button shows "Demo calls aren't switched on yet."
Guards: consent checkbox, honeypot field and a loose limit of 20 requests per
IP per hour (repeat calls to the same number are allowed; in-memory; use a shared store such as Redis plus a
bot check such as Turnstile before high-traffic launch).
