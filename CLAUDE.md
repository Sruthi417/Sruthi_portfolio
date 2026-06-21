@AGENTS.md

# Project Summary

**portfolio-site** is a personal portfolio website built with **Next.js 16** (App Router) and **React 19**, written in a mix of TypeScript (app shell) and JSX (components). It is an early-stage scaffold: currently only the **hero section** is implemented, rendered full-screen on the home page.

## Tech stack
- **Next.js 16.2.9** (App Router) + **React 19.2.4** — note: this Next version has breaking changes vs. older releases; always check `node_modules/next/dist/docs/` before writing framework code (see [AGENTS.md](AGENTS.md)).
- **TypeScript** for the app shell (`layout.tsx`, `page.tsx`, configs).
- **Styling**: hybrid — global CSS ([src/app/globals.css](src/app/globals.css)) + **Sass/SCSS** per-component (BEM-style class names), with **Tailwind CSS v4** wired up via PostCSS but not yet used in components.
- **motion** (Framer Motion successor) is installed for animation but not yet used.
- Fonts: Geist Sans / Geist Mono via `next/font/google`.

## Structure
- [src/app/layout.tsx](src/app/layout.tsx) — root layout; loads fonts + global CSS. Metadata is still the default "Create Next App" (TODO: update).
- [src/app/page.tsx](src/app/page.tsx) — home page; renders `<Hero />` (imported via relative path because the `@/*` alias in [tsconfig.json](tsconfig.json) maps to the project root, not `src/`).
- [src/components/hero/Hero.jsx](src/components/hero/Hero.jsx) + [Hero.scss](src/components/hero/Hero.scss) — the hero section.
- [public/](public/) — media assets (see below).

## Hero section (the only feature so far)
A full-viewport (`100dvh`) background-only hero — no navbar, text, or controls — composed of three stacked layers:
1. **Video background** (`z-0`): a looping sky video that plays forward then in reverse (a "boomerang"). Because browsers can't reliably play video in reverse, the boomerang is **baked into the asset** (`hero-loop.mp4`) so a plain `loop` attribute plays it smoothly with zero JS. Black letterbox bars from the source were cropped out, and the clip is slowed to ~0.8× speed.
2. **Person image** (`z-1`): `herome-tall.png`, a figure (girl with laptop on a wall) on a transparent canvas, anchored bottom-right.
3. **White fog** (`z-2`): a bottom gradient overlay fading the wall into white, matching the design reference.

The wall and the figure are **separate layers** (`wall.png` + `girl.png`) sharing the same scale/position, so the girl can be resized independently of the wall. Tuned via CSS custom properties on `.hero` (`--figure-width` = wall scale, `--figure-top` = vertical position, `--girl-scale` = girl-only size, e.g. `0.9` = 10% smaller). Both layers are **top-anchored** so the tall wall just hangs into the fog; the girl is `scale()`d about her seat (`transform-origin: 74.8% 51%`) so she shrinks but stays glued to the wall edge.

## Assets ([public/](public/))
- `hero-video.mp4` — original source sky clip (master). `hero-loop.mp4` — **used**: derived boomerang (cropped bars + forward+reverse + slowed).
- `herome.png` — original figure+wall cutout (master). `herome-tall.png` — intermediate: wall stretched taller (1672×1841).
- `wall.png` — **used**: `herome-tall.png` with the girl inpainted out (wall-only).
- `girl.png` — **used**: `herome.png` with the wall flood-filled away (girl-only, transparent).

Derived assets were generated with `ffmpeg` (`ffmpeg-static`, installed temporarily) and the layer split with **`sharp`** via [separate.cjs](separate.cjs) (flood-fill wall removal + directional-dilation inpaint). `sharp` is available transitively (via Next) — not a direct dependency. Re-run with `node separate.cjs` to regenerate `wall.png`/`girl.png`.

## Scripts
- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`)

## Current state / next steps
- Only the hero exists; no navbar, sections (work/about/resume), routing, or content yet.
- `layout.tsx` metadata is still boilerplate.
- Tailwind and `motion` are installed but unused — decide whether to adopt them or keep the SCSS-only approach.
