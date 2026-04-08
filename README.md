# Busition Demo

Pre-launch interactive website for Busition, the shuttle operations platform that connects Driver, Mate, and Console around one live operating flow.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript

## Run

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
npm run start
```

## Structure

- `src/app/`: app entry, layout, and page
- `src/components/`: brand, hero, and interactive demo components
- `src/lib/`: scenario and demo data
- `planning/`: business plan and visual planning materials used as product reference

## Notes

- The public site is fully in English
- `planning/` keeps the original strategy and design references
- The interactive demo includes both live operations playback and route-planning preview
