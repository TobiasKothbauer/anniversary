# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `anniversary/` directory:

```bash
npm run dev      # start dev server (Vite, localhost:5173)
npm run build    # type-check (tsc) then bundle to dist/
npm run preview  # serve the dist/ build locally
```

No test suite. Type-check alone: `npx tsc --noEmit`.

## Stack

React 18 + TypeScript, Vite, Tailwind CSS v3, Framer Motion. No router — single-page app.

## Architecture

**Single customization file:** `src/data/memories.ts` is the only file that needs editing for content changes. It exports:
- `siteConfig` — names, cities, timezones, hero text, distance label
- `memories` — array of `Memory` objects (photos, captions, secret notes, hidden easter egg)
- `loveNote` — closing prose section above the letter button
- `surpriseLetter` — text of the modal letter

**Component layout (top to bottom on the page):**
1. `Hero` — full-screen opening section
2. `MemoryWall` — CSS-columns masonry grid of `MemoryCard`s; hidden card unlocks after 3 opened
3. `DistanceBridge` — live dual-clock section (reads `siteConfig` timezones)
4. `LoveNote` — prose section + button that opens `LetterModal`
5. `GalleryModal` / `LetterModal` — full-screen overlays, managed by `AnimatePresence` in `App.tsx`

**Easter egg flow:** `App.tsx` tracks `openedCount`; `MemoryWall` reveals the `hidden: true` memory once count ≥ 3. Secret notes inside galleries appear only when the user clicks the ✦ button at the end of the photo sequence.

**Images:** Place photos in `public/images/` and reference as `/images/filename.jpg` in `memories.ts`. Placeholder seeds use `picsum.photos`.

**Tailwind theme:** Custom colors (`cream`, `cream-dark`, `charcoal`, `charcoal-light`, `gold`) and `font-serif` are defined in `tailwind.config.js`.
