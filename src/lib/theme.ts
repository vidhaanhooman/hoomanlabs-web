/**
 * Light/dark theme. Dark mode is the `.dark` class on <html>, which swaps
 * the grey scale every token resolves against. The choice is kept in
 * localStorage under THEME_KEY; with none saved, the page is light.
 */
export const THEME_KEY = "theme"

/** Runs in <head> before paint, so a saved dark choice never flashes light. */
export const THEME_SCRIPT = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}`
