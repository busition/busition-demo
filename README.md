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

## Notes

- The public site is fully in English
- The interactive demo includes both live operations playback and route-planning preview

## License

The software source code in this repository is licensed under `AGPL-3.0-only`. See [LICENSE](./LICENSE).

If you modify this project and let users interact with it over a network, `AGPL-3.0-only` requires you to make the corresponding source available to those users.

## Brand And Asset Rights

`Busition`, the Busition logos, brand graphics, product illustrations, and preview images are not licensed under `AGPL-3.0-only` unless a file explicitly says otherwise.

See:

- [RIGHTS-RESERVED.md](./RIGHTS-RESERVED.md)
- [TRADEMARKS.md](./TRADEMARKS.md)
