# Petriflow Documentation

Documentation site for the Petriflow language, built with [VitePress](https://vitepress.dev).

## Prerequisites

- **Node.js** `^22`
- **pnpm** (pinned: `pnpm@12.3.4`, see `package.json`)

## Getting started

```bash
pnpm install
```

## Commands

| Command             | Description                                |
|---------------------|--------------------------------------------|
| `pnpm docs:dev`     | Start the local dev server                 |
| `pnpm docs:build`   | Build the static site to `.vitepress/dist` |
| `pnpm docs:preview` | Preview the built site                     |

## Project layout

- `.vitepress/config.mts` — site configuration (theme, nav, markdown plugins).
- `src/` — Markdown content source (configured via `srcDir: "src"`).
  - `index.md` — landing page.
  - `guides/` — tutorials.
  - `actions/` — Actions API reference, one file per action (`actions.md` aggregates them).
  - `publications/` — research papers.
  - `objects.md`, `examples.md` — language reference and examples.
  - `public/` — static assets (images, videos, downloads), served from the site root.
    - `public/guides/` — tutorial media, referenced as `/guides/<tutorial>/<file>`.

## Notes

- Markdown uses the Catppuccin theme and MathJax (`markdown.math: true`); math uses `$...$` / `$$...$$`.
- Static assets live in `src/public/` and are referenced by URL from the site root (e.g. `src/public/logo.png` →
  `/logo.png`).
- The two legacy doc dirs `_old_docsify/` and `_old_writerside/` at the repo root are abandoned and not part of this
  site.
