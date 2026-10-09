# Backdrop artwork: ideas and ChatGPT prompts

Every grey "Backdrop" area on the site, with a scene idea and a ready-to-paste
prompt. All of them belong to **one painted world**: the same gouache style as
the hero valley, at different places and times of day. Each scene quietly
echoes what its section is about.

When done, drop files in `public/art/backdrops/` with the names below and tell
Claude **"backdrops are in"**. Claude handles cropping, compression and wiring.

---

## How to use

- Use **one ChatGPT conversation** for all prompts, and upload the hero master
  (`public/hero/parallax/00-master.png`) once at the start with:
  *"This is the style reference for every image I ask for in this chat. Match its
  gouache texture, brushwork, palette softness and light."*
- Generate each prompt below. They are complete; nothing to fill in.
- Size: ChatGPT's **1536 x 1024 (landscape)** works for every slot. Claude crops
  to each slot's exact shape.
- For final quality, upscale 2x to 3x before sending (Topaz, Magnific, Upscayl or
  Photoshop Super Resolution). Not required for review.

### Composition rule (applies to every backdrop)

A dark product window covers the **middle of every backdrop** (about 85% of the
width and 80% of the height). Only the **edges** show: a band along the top, the
left and right sides, and a strip along the bottom. So:

- Keep the centre calm and simple (sky, soft field, haze).
- Put recognisable shapes at the edges: horizon lines, trees, rooftops, clouds.
- The bottom strip and top band are the most visible areas.

### Things to avoid in every image

Text, letters, numbers, logos, watermarks, people, faces, animals in focus,
cars, neon, glow effects, lens flare, purple or blue sci-fi gradients,
borders or frames.

---

## Slot list

| # | Where | File name | Scene | Why this scene |
|---|---|---|---|---|
| 1 | Home: Build panel | `home-build.png` | Valley, mid-morning, mist lifting off a river | Building: things taking shape as the fog clears |
| 2 | Home: Test panel | `home-test.png` | Patchwork farmland seen from above, cloud shadows moving across neat rows of fields | Testing: order, rows, scenarios side by side |
| 3 | /voice-ai: hero | `voice-hero.png` | Same valley at dusk, scattered farmhouse windows lit | Always on the line, day into night |
| 4 | /voice-ai: feature 1 (voices) | `voice-f1.png` | Wind moving through tall grass on a hillside, long golden light | Voice: something you can almost hear |
| 5 | /voice-ai: feature 2 (actions) | `voice-f2.png` | Old stone bridge over a stream, early evening | Connecting: actions that link systems |
| 6 | /chat-agents: hero | `chat-hero.png` | Small coastal harbour town at soft morning light, calm sea | Many small conversations, one shared place |
| 7 | /chat-agents: feature 1 (channels) | `chat-f1.png` | Three paths meeting at a hilltop, wildflowers | One agent, many channels |
| 8 | /chat-agents: feature 2 (knowledge) | `chat-f2.png` | Quiet library-like stone barn with open doors onto a meadow | Grounded in your knowledge |
| 9 | /qa: hero | `qa-hero.png` | Terraced hillside vineyard in clear afternoon light | Structure, precision, every row checked |
| 10 | /qa: feature 1 (personas) | `qa-f1.png` | Varied trees along a ridge: oak, pine, birch, each distinct | Different personas, each with character |
| 11 | /qa: feature 2 (scenarios) | `qa-f2.png` | Orchard in neat rows after rain, puddles reflecting sky | Repeatable runs, clean results |
| 12 | Home: Company panel | `company.jpg` | **Real team photo, not AI** (see brief at the end) | Real people build this |

---

## Prompts

Each prompt starts with the same style block so results stay consistent.

### 1. `home-build.png`: Build panel

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette (soft blue-grey sky, warm pale light, sage and olive greens, dusty earth tones), gentle atmospheric haze, distant shapes lighter and cooler than near shapes, no hard outlines, calm and contemplative, fine-art quality. Match the attached style reference.

SCENE: a wide river valley at mid-morning. Mist is lifting off a slow river and drifting between low hills; sunlight is breaking through from the upper left. A line of willow trees follows the river on the left edge; a soft hillside with a few hedgerows rises on the right edge; a band of pale sky with thin clouds across the top; a strip of meadow grass and small wildflowers along the bottom.

COMPOSITION: the centre of the image must stay calm and open (mist and soft field only) because a dark product window will cover the middle 85% of the width and 80% of the height. Put the recognisable shapes along the left and right edges, the top band and the bottom strip.

DO NOT INCLUDE: text, letters, numbers, logos, watermarks, people, animals, buildings, vehicles, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 2. `home-test.png`: Test panel

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette, gentle haze, no hard outlines, calm and contemplative, fine-art quality. Match the attached style reference.

SCENE: patchwork farmland seen from a high hillside: neat rectangular fields in slightly different greens and ochres, separated by thin hedgerows, stretching to the horizon. Large soft cloud shadows drift across some fields. Hedgerow trees and the edge of the hillside frame the left and right edges; pale sky with long clouds across the top; a strip of hillside grass along the bottom.

COMPOSITION: keep the centre calm (soft, evenly toned fields) because a dark product window will cover the middle 85% of the width and 80% of the height. The field pattern and hedgerows should be most visible at the edges and along the top and bottom.

DO NOT INCLUDE: text, letters, numbers, logos, watermarks, people, animals, farm machinery, roads, vehicles, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 3. `voice-hero.png`: Voice AI page hero

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette shifting to dusk (dusty blue and lavender-grey sky, warm amber light low on the horizon), gentle haze, no hard outlines, quiet and contemplative, fine-art quality. Match the attached style reference.

SCENE: the same kind of wide valley at dusk. A few scattered farmhouses on the far hillsides, each with one or two small warm-lit windows, as if someone is still on the line. A dark tree line along the left edge; a hillside with two lit farmhouses on the right edge; the first faint stars in the deep sky across the top band; a strip of dark meadow grass along the bottom.

COMPOSITION: keep the centre calm (open evening sky and soft dark hills) because a dark product window will cover the middle 85% of the width and 80% of the height. Lit windows and tree silhouettes should sit near the edges.

DO NOT INCLUDE: text, letters, numbers, logos, people, animals, street lights, cars, neon, glow effects beyond small warm window light, lens flare, sci-fi gradients, borders or frames.
```

### 4. `voice-f1.png`: Voice AI, feature 1 (voices)

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette with warm golden late-afternoon light, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: wind moving through tall seed-headed grass on a rolling hillside; the grass bends in soft waves, catching long golden light. A single tree leans in the wind at the right edge; distant soft hills and a pale sky across the top band; the most detailed grass along the bottom strip and left edge.

COMPOSITION: keep the centre calm (soft blurred grass and haze) because a dark product window will cover the middle 85% of the width and 80% of the height.

DO NOT INCLUDE: text, letters, numbers, logos, people, animals, buildings, fences, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 5. `voice-f2.png`: Voice AI, feature 2 (actions)

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette with early-evening light, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: an old arched stone bridge crossing a narrow stream in a wooded valley, early evening. The bridge's arch and stonework are visible at the left edge; overhanging trees and ferns along the right edge; soft evening sky through branches across the top band; stream water and pebbles along the bottom strip.

COMPOSITION: keep the centre calm (soft water and haze) because a dark product window will cover the middle 85% of the width and 80% of the height. The bridge must sit at the left edge, not in the centre.

DO NOT INCLUDE: text, letters, numbers, logos, people, animals, houses, roads, vehicles, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 6. `chat-hero.png`: Chat agents page hero

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted coastal palette (pale blue-grey sea and sky, chalky whites, weathered ochres), soft morning light, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: a small coastal harbour town in soft morning light. Clustered white and ochre houses climb the hill along the left edge; a stone harbour wall with a few small moored boats along the right edge; a calm sea and pale sky across the top band; harbour water with gentle reflections along the bottom strip.

COMPOSITION: keep the centre calm (open calm water and sky) because a dark product window will cover the middle 85% of the width and 80% of the height.

DO NOT INCLUDE: text, letters, numbers, signs, logos, people, animals, cars, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 7. `chat-f1.png`: Chat agents, feature 1 (channels)

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette, bright soft daylight, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: three narrow footpaths winding up a grassy hill from different directions and meeting near the top, with patches of wildflowers. One path enters from the bottom-left corner, one from the bottom-right corner, one curves in from the right edge; soft sky with light clouds across the top band.

COMPOSITION: keep the centre calm (soft hilltop grass) because a dark product window will cover the middle 85% of the width and 80% of the height. The three paths must be visible near the edges and bottom strip.

DO NOT INCLUDE: text, letters, numbers, signposts, logos, people, animals, buildings, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 8. `chat-f2.png`: Chat agents, feature 2 (knowledge)

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette, warm soft daylight, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: an old stone barn with wide open doors at the left edge, warm light inside showing stacked shelves of hay bales like a library; a meadow stretching away to the right with a few trees at the right edge; pale sky across the top band; meadow grass and a dirt track along the bottom strip.

COMPOSITION: keep the centre calm (open meadow and haze) because a dark product window will cover the middle 85% of the width and 80% of the height. The barn sits at the left edge only.

DO NOT INCLUDE: text, letters, numbers, signs, logos, people, animals, vehicles, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 9. `qa-hero.png`: QA page hero

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette with clear afternoon light, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: a terraced hillside vineyard in clear afternoon light; precise curved rows of vines follow the contour of the hill. The steepest, most detailed terraces sit along the left and right edges; distant hills and a pale sky across the top band; the nearest vine row and a dry stone wall along the bottom strip.

COMPOSITION: keep the centre calm (soft distant terraces and haze) because a dark product window will cover the middle 85% of the width and 80% of the height.

DO NOT INCLUDE: text, letters, numbers, logos, people, animals, buildings, machinery, vehicles, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 10. `qa-f1.png`: QA, feature 1 (personas)

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette, soft daylight, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: a grassy ridge with a loose line of very different single trees, each with its own character: a broad oak, a tall pine, a slender birch, a wind-bent hawthorn, a round beech. The most distinct trees stand at the left and right edges; soft sky across the top band; ridge grass along the bottom strip.

COMPOSITION: keep the centre calm (open sky and soft ridge) because a dark product window will cover the middle 85% of the width and 80% of the height.

DO NOT INCLUDE: text, letters, numbers, logos, people, animals, buildings, fences, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

### 11. `qa-f2.png`: QA, feature 2 (scenarios)

```
Landscape illustration, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted fresh palette just after rain, clean soft light, gentle haze, no hard outlines, fine-art quality. Match the attached style reference.

SCENE: an orchard planted in neat straight rows just after rain; small puddles between the rows reflect a clearing sky. The nearest rows and trunks line the left and right edges; clearing sky with breaking clouds across the top band; wet grass and puddles along the bottom strip.

COMPOSITION: keep the centre calm (soft receding rows and haze) because a dark product window will cover the middle 85% of the width and 80% of the height.

DO NOT INCLUDE: text, letters, numbers, logos, people, animals, buildings, ladders, vehicles, neon, glow, lens flare, sci-fi gradients, borders or frames.
```

---

## 12. Company panel: real photo brief (not AI)

This slot says "the people behind it", so it should be a **real photograph of
the HoomanLabs team**. An AI image of fake people would undercut trust.

- **Shot:** 3 to 6 people mid-conversation around a table or whiteboard,
  natural, not posed at the camera.
- **Light:** soft daylight from a window; no flash.
- **Frame:** landscape 16:10, people on the left or right two-thirds (the copy
  sits beside it), some negative space.
- **Look:** slightly warm grade, shallow depth of field, matches the painted
  world's calm tone. Colour or black and white both work.
- **Deliver:** at least 2400 px wide, as `public/art/backdrops/company.jpg`.

If a team shoot isn't possible yet, use a painted interior instead (prompt on
request) and swap in the real photo later.

---

## Check before sending

- [ ] Files named as in the slot list, in `public/art/backdrops/`
- [ ] All landscape; the centre of each is calm
- [ ] Interesting shapes at the edges, top band and bottom strip
- [ ] Same gouache look across all images (compare side by side)
- [ ] No text, people, logos or borders anywhere
