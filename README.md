# SAMIOR × ORACOL Storefront

A Vite + React single-page storefront.

## What was fixed

The original `index.jsx` embedded 7 product photos as base64 data URIs
directly inside the `IMGS` object. Each of those lines was 13,000–25,000
characters long on a single line. That's what was breaking the build/runtime
("returnReact is not defined" was a symptom of the bundler/parser
mis-tokenizing those massive lines, not a real missing import).

Fix applied:
- Decoded the 7 base64 strings back into real `.jpg` files, now in
  `public/images/`.
- `IMGS` now holds plain string paths (e.g. `/images/skull_black.jpg`)
  instead of inline base64 — every other line of the component is
  byte-for-byte identical to your original file.
- Wrapped the component in a proper Vite project (`index.html`,
  `src/main.jsx`, `package.json`, `vite.config.js`) so it builds cleanly
  on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

Push this folder to a Git repo and import it in Vercel, or run:

```bash
npm i -g vercel
vercel
```

Vercel auto-detects Vite: build command `vite build`, output directory
`dist`. No extra configuration needed.

## Project structure

```
index.html          entry HTML, mounts #root
src/main.jsx         React root, renders <App />
src/App.jsx           your storefront component (cleaned)
public/images/*.jpg   the 7 product photos (previously inline base64)
package.json
vite.config.js
```
# new-oracol
