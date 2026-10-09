import { createCn } from "cn/config"

/**
 * Class merger that knows our custom type scale (globals.css @theme).
 * Without this, `text-small` is mistaken for a colour and silently removes
 * classes like `text-primary-foreground` when merged.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h2", "h3", "h4", "body-lg", "body", "small", "label"] },
      ],
    },
  },
})
