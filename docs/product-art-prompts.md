# Product page heroes: backdrop image prompt (v6)

How to use: paste the master prompt once into a new ChatGPT chat. It replies
with the first image; type "next" for each of the rest. Save each as `.webp`
named as listed (`public/art/product/<page>-backdrop.webp`) and send it over.
Each image sits behind the page's large product console, which covers the
middle, so only the top band and the left and right edges show. They are
given a slow drift and film grain on the site.

---

## Master prompt (paste once)

```
You are generating a series of 8 wide background images for a software company's product pages. A large software window will sit on top of each image and cover its middle, so each image is only seen around the edges. Follow these rules for every image:

STYLE: Cinematic 35mm film photograph, real places, not fantasy. Dusk or early-morning light. Heavy natural film grain, slightly faded warm colours, gentle halation on highlights, soft atmospheric haze.

COMPOSITION: Wide 16:9, landscape only. The most colourful part (sunset glow, lit clouds) runs along the TOP 25% of the frame. The strongest shapes (ridges, cliffs, trees, rocks) sit at the far LEFT and far RIGHT edges. The CENTRE is calm and low in detail (haze, mist, water, soft sky), because it will be covered. No single central subject.

PALETTE: Muted teal-blue and slate skies, peach, amber and rose light, deep blue-grey shadows. Keep each image a little different in colour so the series doesn't feel repetitive.

NEVER INCLUDE: people, animals, vehicles, buildings, roads, readable text, letters, numbers, logos, watermarks, frames or borders.

THE SERIES (one image per message, in this order):
1. Agents: a red-rock canyon at sunrise, tall sandstone walls at the left and right edges, soft haze filling the open canyon in the centre.
2. Voice: a coastline at dusk, dark sea cliffs on the left and right edges, calm misty ocean in the centre, a soft rose sky along the top.
3. Workflows: terraced green hills in morning fog, layered rows fading into haze, the first warm light catching the hilltops at the top.
4. Campaigns: wide desert dunes at golden hour, long shadows on the dunes at the edges, a smooth pale sand-and-haze centre, a peach sky.
5. Integrations: a still mountain lake at dawn, pine-covered slopes at both edges, glassy water and mist in the centre, a teal-to-amber sky.
6. Testing: a misty pine forest at first light, tall dark trunks at the left and right edges, soft fog and light rays in the centre.
7. AI QA: a glacier valley under a clear cold dusk, ice and rock walls at the edges, a smooth snowfield and haze in the centre, a pale amber band along the top.
8. Post-call analysis: rolling grassland hills at the end of the day, a lone ridge line at each edge, soft blurred grass and haze in the centre, warm amber clouds along the top.

Generate image 1 now. After each image, wait. When I say "next", generate the next one. If I say "redo", regenerate the same one with the same rules.
```

---

## File names

| # | Page | Save as |
|---|------|---------|
| 1 | Agents | `agents-backdrop.webp` |
| 2 | Voice | `voice-backdrop.webp` |
| 3 | Workflows | `workflows-backdrop.webp` |
| 4 | Campaigns | `campaigns-backdrop.webp` |
| 5 | Integrations & API | `integrations-backdrop.webp` |
| 6 | Testing | `testing-backdrop.webp` |
| 7 | AI QA | `ai-qa-backdrop.webp` |
| 8 | Post-call analysis | `post-call-backdrop.webp` |

Channels already uses `channels-mountains.webp`.

## If an image comes back wrong

- Interesting part in the middle: "Redo, keep the centre calm and empty; put the ridges and detail at the far left and right edges."
- Sunset too low: "Redo, move the sunset glow and lit clouds to the top 25% of the frame."
- Too sharp or clean: "Redo with heavier film grain, softer focus and more faded colours."
- Comes back as a thin panorama with blurred bars above and below: "Redo as a full-frame 16:9 photo filling the whole canvas, no bars or padding." (Panoramas still work; they are cropped to the sharp band.)
- Text, a person or a building appears: "Redo with no people, buildings, text or watermark anywhere."
