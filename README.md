# Petriflow

**Petriflow is a next-generation end-to-end low-code language based on Petri nets.**

Petriflow lets you model complete, runnable web applications — workflow, roles, data, and behaviour — as XML process
documents. You model the process in the [Application Builder](https://builder.netgrif.com), deploy it to
the [Application Engine](https://netgrif.com/products/#nae), and interact with its instances (called *cases*) at
runtime.

This repository contains the **authoritative language definition** (the XSD schema) and the **documentation website**.

## Table of contents

- [The Petriflow language](#the-petriflow-language)
- [Repository layout](#repository-layout)
- [The XSD schema](#the-xsd-schema)
- [Documentation site](#documentation-site)
- [Versioning](#versioning)
- [Legacy documentation](#legacy-documentation)
- [Contributing](#contributing)
- [License](#license)

## The Petriflow language

A Petriflow process is composed of four layers:

1. **Workflow** — a place/transition Petri net enriched with reset arcs, inhibitor arcs, and read arcs. Transitions
   represent the tasks of the workflow.
2. **Roles** — define who can execute those tasks.
3. **Data variables** — the attributes of a process instance (case) during its lifecycle. Data variables associated with
   tasks define data fields and generate task forms.
4. **Actions** — pieces of Groovy code that react to events on tasks (assign, finish, cancel) and events on data fields.
   Actions can trigger events and call external functions.

The workflow model, roles, data variables, and the data fields that define task forms are all stored in XML.

## Repository layout

```
petriflow.schema.xsd         # The current, authoritative schema (root)
schemas/                     # Line-ending-normalized copy + versioned snapshots
  petriflow.schema.xsd       #   LF copy of the current schema
  v<version>/petriflow.schema.xsd
docs/                        # VitePress documentation site (see docs/README.md)
  src/                       #   Markdown source
  src/public/                #   Static assets (images, videos, downloads)
CHANGELOG.md                 # Release history (Keep a Changelog format)
CONTRIBUTING.md              # How to contribute
CODE_OF_CONDUCT.md           # Community guidelines
LICENSE.txt                  # Apache 2.0
```

## The XSD schema

`petriflow.schema.xsd` (in the repository root) is the single source of truth for the language. It is
an [XML Schema (XSD)](https://www.w3.org/XML/Schema) document that defines every valid Petriflow process: the top-level
`document` element, transitions, places, arcs, roles, data, mappings, and the various object types.

- The **root** `petriflow.schema.xsd` is the current version (presently `1.1.0`) and uses **CRLF** line endings.
- `schemas/petriflow.schema.xsd` is a **line-ending-normalized (LF)** copy of that same schema, kept content-identical
  for convenient validation tooling.
- `schemas/v<version>/petriflow.schema.xsd` are point-in-time snapshots of each released version.

### Schema instance header

Petriflow documents reference the schema via `xsi:noNamespaceSchemaLocation`:

```xml

<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:noNamespaceSchemaLocation="https://netgrif.github.io/petriflow/petriflow.schema.xsd">
```

## Documentation site

The documentation is a [VitePress](https://vitepress.dev) static site located in `docs/`. It is the only buildable
component in this repository — there is no build, test, or lint tooling at the repository root.

See [`docs/README.md`](docs/README.md) for setup and commands. In short:

```bash
cd docs
pnpm install
pnpm docs:dev        # local dev server
pnpm docs:build      # production build
pnpm docs:preview    # preview the built site
```

The site requires **Node.js ^22** and **pnpm** (pinned to `pnpm@12.3.4`).

## Versioning

- **Schema releases** follow [Semantic Versioning](https://semver.org), using the `version` attribute of the root
  `xs:schema` element and the `schemas/v<version>/` snapshot directory.
- **Changelog** follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) in `CHANGELOG.md`.

To bump the schema version:

1. Update the `version` number in the root `petriflow.schema.xsd`.
2. Keep `schemas/petriflow.schema.xsd` in sync (content-identical, LF line endings).
3. Add a new `schemas/vX.Y.Z/petriflow.schema.xsd` snapshot.

## Legacy documentation

`_old_docsify/` and `_old_writerside/` are abandoned documentation sites from before the migration to VitePress. They
are kept for historical reference only and are not maintained as part of the current documentation.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution process
and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

## Learning more

- [Petriflow Wiki](https://netgrif.atlassian.net/wiki/spaces/PF) — additional background and design notes.
- [Application Builder](https://builder.netgrif.com) — build and model processes in your browser.
- [Application Engine](https://netgrif.com/products/#nae) — deploy and run your processes.

## License

Apache 2.0. See [LICENSE.txt](LICENSE.txt).
