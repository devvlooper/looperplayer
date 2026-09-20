# Looper Player — Website

Landing page for **Looper Player**, an offline music player built for Android & Linux.
A fully static, single-page site: hero, a Mobile / Desktop screenshot showcase, and a footer.

## Tech stack

- [Vite 8](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (design tokens in `@theme`)
- Self-hosted fonts via `@fontsource-variable` (Manrope for the headline, DM Sans for everything else)
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## Getting started

**Requirements:** Node.js `^20.19` or `>=22.12` (a Vite 8 requirement) and npm.

```bash
npm install
npm run dev        # dev server with hot reload → http://localhost:5173
```

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server                                                |
| `npm run build`   | Type-check (`tsc -b`) and build the production site into `dist/`    |
| `npm run preview` | Serve the production build locally                                  |
| `npm run lint`    | Lint the source with oxlint                                         |
| `npm run assets`  | Regenerate optimized images — see [Images](#images--regenerating-assets) |

## Before you ship: set the links

Every external link and the shared copy live in **[`src/config.ts`](src/config.ts)**.
The links are currently `#` placeholders. Replace them with the real destinations:

| Key             | Used by                                                       |
| --------------- | ------------------------------------------------------------- |
| `playStore`     | "Get it on Google Play" button (header) and **Download Now**  |
| `linuxDownload` | Linux (penguin) button in the header                          |
| `github`        | The **10K+** badge, and the footer's *Features* and *GitHub* links |
| `issues`        | Footer → *Report An Issue*                                    |
| `contribute`    | Footer → *Contribute*                                         |
| `privacy`       | Footer → *Privacy Policy*                                     |
| `licenses`      | Footer → *Legal* and *Licenses*                               |

Full `http(s)` links open in a new tab (`rel="noreferrer"`); `#` links stay on the page.
The footer's *Screenshots* and *Download* links scroll to the showcase and the hero buttons.

`COPY` in the same file holds the headline, subheading, and the badge text (`10K+`) — update the
badge to the real number when you have it.

## Project structure

```
.
├── index.html                 # entry HTML: title, meta description, Open Graph tags, favicon
├── public/favicon.png
├── scripts/prep-assets.sh     # image pipeline (see below)
└── src/
    ├── main.tsx, App.tsx      # app shell
    ├── index.css              # Tailwind, design tokens, hero glow, animations
    ├── config.ts              # links + shared copy
    ├── assets/                # optimized logo, decoration, and device mockups (committed)
    └── components/
        ├── Header.tsx         # floating, sticky nav pill with Linux + Google Play buttons
        ├── Hero.tsx           # headline + subheading
        ├── CtaRow.tsx         # 10K+ badge and Download Now
        ├── ShowcaseTabs.tsx   # Mobile / Desktop toggle (accessible tablist)
        ├── DesktopShowcase.tsx
        ├── MobileCarousel.tsx # looping, centered carousel of the four phone screens
        ├── FloatingMarks.tsx  # faint floating logo shards behind the showcase
        ├── Footer.tsx
        ├── Logo.tsx
        └── icons/             # Google Play and Play + GitHub badge icons as inline SVG
```

## Design notes

- **Tokens** (`src/index.css`, `@theme`): page background `#151515`, logo lime `#C0E200`,
  badge lime `#D8FF00`, olive surfaces `#1E2015`, footer card `#181818` — all sampled from the design file.
- **Hero glow:** two stacked radial gradients, least-squares fitted to pixels sampled from the design.
  Radii are in `vw`, so the glow scales with the viewport.
- **Fonts:** the headline is Manrope ExtraBold, the closest match to the design's display face by
  x-height and width metrics (not an exact match); body text is DM Sans.
- **Showcase:** Desktop is selected by default, as in the design. On phones (< 640px) the Mobile tab
  is selected first. The carousel loops and supports arrow buttons, dots, swipe/drag, and ← / → keys.
- **Accessibility:** proper `tablist` / `tabpanel` roles, carousel and slide semantics with a polite
  live region, visible focus rings, and `prefers-reduced-motion` support (animations are disabled).
- **Responsive:** built from the 1440px design and fluid down to phone widths with no horizontal scroll.
- **Deliberate deviation:** the design's footer reads "Icenses"; it is rendered as "Licenses".

## Images & regenerating assets

The optimized images in `src/assets/` and `public/favicon.png` are **committed**, so you can run and
build the site without doing anything here.

The original design files live in a local `design/` folder that is **git-ignored** (it isn't part of
this repo). Only regenerate assets if you have those originals, placed in `design/` with these names:

| Source file(s) in `design/`                          | Output                          |
| ---------------------------------------------------- | ------------------------------- |
| `iPhone 17 - 474 1.png` (the desktop mockup)         | `src/assets/desktop.webp`       |
| `Group 67664.png` / `67665.png` / `67666.png` / `67667.png` | `phone-home` / `phone-lyrics` / `phone-player` / `phone-library` `.webp` |
| `Mask group.png`                                     | `src/assets/logo.png`, `public/favicon.png` |
| `Mask group (2).png`                                 | `src/assets/deco.png`           |
| `Vector.png`                                         | `src/assets/linux.png`          |

```bash
npm run assets     # requires ImageMagick 7 (the `magick` command) with WebP support
```

Why the crop step exists: the source mockup PNGs carry a large baked-in shadow and the devices sit
off-center in their canvases. The script crops each to the device silhouette, removes the leftover
shadow alpha (otherwise it shows as a faint hard-edged rectangle), and converts to WebP. The site
draws its own shadow with CSS.

## Deployment

The site is static: run `npm run build` and serve the `dist/` folder from any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, …). Build command: `npm run build`;
output directory: `dist`.

If you host under a sub-path such as `https://<user>.github.io/<repo>/`, set the base path in
`vite.config.ts` first:

```ts
export default defineConfig({
  base: '/<repo>/',
  plugins: [react(), tailwindcss()],
})
```

## License

No license has been chosen yet. Add a `LICENSE` file (and point the `licenses` link in
`src/config.ts` at it) before accepting contributions.
