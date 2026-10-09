# Hero parallax artwork: ChatGPT prompts (end to end)

Copy-paste each prompt below into **one ChatGPT conversation** (image
generation on), in order. Every prompt is complete: style, composition and
rules are already written in. Nothing to fill in.

- **Prompt 1** makes the full scene (the master).
- **Prompts 2 to 7** each pull one depth layer out of that master, so the
  layers line up.

When done, put the 6 layer files in `public/hero/parallax/` and tell Claude
**"parallax art is in"**. Claude handles resizing, 16:9 cropping, compression
and wiring.

---

## Prompt 1. Master scene → save as `00-master.png`

```
Create a wide landscape illustration in landscape orientation, 1536 x 1024.

STYLE: soft gouache painting with visible brush texture and subtle paper grain, muted natural palette (soft blue-grey sky, warm pale sun, sage and olive greens, dusty earth tones), calm early-morning light with gentle atmospheric haze, distant shapes lighter and cooler than near shapes, no hard outlines, quiet and contemplative mood, fine-art quality.

SCENE: a quiet, wide valley at dawn, seen from a slightly elevated viewpoint. From back to front: a pale sky with a low, soft sun on the right third; three or four long, thin horizontal clouds; a distant mountain ridge running across the full width; rolling mid-ground hills; a near grassy slope; and a darker foreground strip of grass and small wild plants along the very bottom edge.

COMPOSITION: the centre of the image must stay calm and open (mostly sky and soft hill shapes) because a product screenshot will cover the middle 80% of the width on the website. Put the most interesting shapes near the left and right edges, in the top band and along the bottom strip. Keep clear, readable separation between each depth band (sky, clouds, ridge, hills, slope, foreground) so it can be cut into layers.

DO NOT INCLUDE: text, letters, numbers, logos, watermarks, people, animals, faces, buildings, roads, vehicles, neon, glow effects, lens flare, purple or blue sci-fi gradients, frames or borders.
```

Iterate on this one until you love it (*"make the ridge more dramatic on the
left"*, *"calmer centre"*, etc.). **Everything after depends on it.**
Download it as `00-master.png`.

---

## Prompt 2 → `01-sky.png` (furthest back, not transparent)

```
Using the previous master image as the exact reference, recreate ONLY the sky layer, landscape 1536 x 1024.

Keep the sky gradient and the sun in exactly the same position, size and colour. Remove the clouds, mountain ridge, hills, slope and grass, and continue the sky naturally into the areas where they were, so the entire canvas is sky from top to bottom (the lower part can fade slightly warmer and hazier, as sky near a horizon does).

STYLE (unchanged): soft gouache painting with visible brush texture and subtle paper grain, muted natural palette, calm early-morning light, gentle haze, no hard outlines.

DO NOT INCLUDE: clouds, land, text, logos, borders.
```

---

## Prompt 3 → `02-clouds.png`

```
Using the master image as the exact reference, extract ONLY the clouds, landscape 1536 x 1024.

Keep every cloud in exactly the same position, size, shape and colour as in the master. Everything else must be fully transparent: output a PNG with a real alpha channel (no white fill, no checkerboard pattern).

STYLE (unchanged): soft gouache painting with visible brush texture, muted palette, soft edges, no hard outlines.

DO NOT INCLUDE: sky colour, sun, land, text, logos, borders.
```

---

## Prompt 4 → `03-ridge.png`

```
Using the master image as the exact reference, extract ONLY the distant mountain ridge, landscape 1536 x 1024.

Keep the ridge in exactly the same position, height and silhouette, spanning the full width edge to edge. Extend the ridge's body downward so it continues about 15% of the canvas height below where it was hidden behind the hills (this prevents gaps when layers move). Everything else must be fully transparent: PNG with a real alpha channel (no white fill, no checkerboard).

STYLE (unchanged): soft gouache painting, distant and hazy, lighter and cooler than the nearer layers, no hard outlines.

DO NOT INCLUDE: sky, sun, clouds, hills, grass, text, logos, borders.
```

---

## Prompt 5 → `04-hills.png`

```
Using the master image as the exact reference, extract ONLY the rolling mid-ground hills, landscape 1536 x 1024.

Keep the hills in exactly the same position and silhouette, spanning the full width. Extend them downward all the way to the bottom edge of the canvas so no gap shows behind the nearer layers. Everything else must be fully transparent: PNG with a real alpha channel (no white fill, no checkerboard).

STYLE (unchanged): soft gouache painting with visible brush texture, muted sage and olive greens, gentle haze, no hard outlines.

DO NOT INCLUDE: sky, sun, clouds, mountain ridge, foreground grass, text, logos, borders.
```

---

## Prompt 6 → `05-slope.png`

```
Using the master image as the exact reference, extract ONLY the near grassy slope, landscape 1536 x 1024.

Keep the slope in exactly the same position and silhouette, spanning the full width. Extend it downward all the way to the bottom edge of the canvas. Everything else must be fully transparent: PNG with a real alpha channel (no white fill, no checkerboard).

STYLE (unchanged): soft gouache painting, richer and slightly warmer greens than the hills, visible brush texture, no hard outlines.

DO NOT INCLUDE: sky, sun, clouds, ridge, hills, the dark foreground grass strip, text, logos, borders.
```

---

## Prompt 7 → `06-foreground.png` (nearest)

```
Using the master image as the exact reference, extract ONLY the dark foreground strip of grass and small wild plants along the bottom edge, landscape 1536 x 1024.

Keep it in exactly the same position and shape, spanning the full width. Make the top edge of the grass slightly uneven and natural, with a few taller blades and seed heads near the left and right corners. Everything else must be fully transparent: PNG with a real alpha channel (no white fill, no checkerboard).

STYLE (unchanged): soft gouache painting, the darkest and most saturated layer, crisp but still painterly brush marks.

DO NOT INCLUDE: sky, sun, clouds, ridge, hills, slope, text, logos, borders.
```

---

## Fix-up prompts (use if needed)

**Background isn't transparent:**
```
Regenerate the same image with a real transparent background (PNG with alpha channel). Not white, not a checkerboard pattern drawn into the image.
```

**Layer moved or changed shape:**
```
Match the master image exactly. Same position, same scale, same silhouette. Do not redraw or move anything; only remove the other elements and make them transparent.
```

**Style drifted:**
```
Keep the exact same gouache style, palette and brush texture as the master image. Only the content should change, not the look.
```

---

## Check before sending

- [ ] 6 layer files: `01-sky.png`, `02-clouds.png`, `03-ridge.png`,
      `04-hills.png`, `05-slope.png`, `06-foreground.png` (plus `00-master.png`)
- [ ] All landscape, same size
- [ ] `02` to `06` have **real** transparency
- [ ] Stacked in order they roughly rebuild the master (Claude can nudge alignment)
- [ ] Each layer extends below where the layer in front of it starts (no gaps)
- [ ] Centre stays calm; the interest is at the edges
- [ ] No text, people, logos or borders anywhere

Drop them in `public/hero/parallax/` and tell Claude **"parallax art is in"**.
