# AGENTS.md

## What this repo is

Petriflow language specification + its documentation website. Two real deliverables, no application code:

1. **The XSD schema** (`petriflow.schema.xsd`) — the authoritative language definition.
2. **The docs site** (VitePress, source in `docs/src/`).

Everything else at root (`CHANGELOG.md`, `CONTRIBUTING.md`, etc.) is standard repo metadata.

## No build/test/lint at the root

There is no build system, test suite, or linter for the repo root, and no CI workflow (`.github/` does not exist). The
only buildable component is the docs site.

## Docs site

- Lives in `docs/`, managed with **pnpm** (see `packageManager` pin: pnpm@12.3.4) and **Node ^22**.
- Commands (run from `docs/`):
    - `pnpm docs:dev` — local dev server
    - `pnpm docs:build` — build to `docs/.vitepress/dist`
    - `pnpm docs:preview` — preview the built site
- Source root is `docs/src/` (config sets `srcDir: "src"`), configured in `docs/.vitepress/config.mts`.
- Doc content layout: `src/guides/` (tutorials), `src/actions/` (Actions API reference, one file per action),
  `src/publications/`, plus `index.md`, `objects.md`, `examples.md`.
- Static assets go in `docs/src/public/`.
- Markdown uses Catppuccin theme and MathJax (`markdown.math: true`); math uses `$...$`/`$$...$$`.

## Ignore the legacy doc dirs

`_old_docsify/` and `_old_writerside/` are abandoned prior doc sites (recent migration to VitePress). Do not edit or
treat them as current. `docs/src/_coverpage.md` is a stale docsify leftover.

## XSD schema versioning

- `petriflow.schema.xsd` (root) is the **current** version (presently `1.1.0`). It uses CRLF line endings.
- `schemas/petriflow.schema.xsd` is a line-ending-normalized (LF) copy of the same current schema.
- `schemas/v<version>/petriflow.schema.xsd` are point-in-time snapshots.
- To bump the version: update the version number in the root schema, keep `schemas/petriflow.schema.xsd` in sync
  (content-identical, LF), and add a new `schemas/vX.Y.Z/` snapshot.
