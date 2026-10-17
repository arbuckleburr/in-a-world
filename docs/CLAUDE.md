# In a World — Entry Point

Read this first, then follow the routing table.

## Concept

"In a World" is a static web app that generates log lines for science
fiction and fantasy movies. Generation is grammar-based (Tracery-style).
Data lives in genre packs so entries and genres can be added over time.

## Reading order

1. This file
2. `STATUS.md` — what is built
3. `NEXT-SESSION.txt` — where the last session stopped
4. `TESTING-OWED.md` — live checks owed (only if NEXT-SESSION points here)

## Routing table

| Need | File |
|---|---|
| Current build state | `STATUS.md` |
| Why a choice was made | `DECISIONS.md` → `decisions/<theme>.md` |
| When something changed | `BUILD-LOG.md` → `build-log/<era>.md` |
| Recurring technical lessons | `standing-rules.md` |
| Resume point | `NEXT-SESSION.txt` |
| Pending live checks | `TESTING-OWED.md` |

## Core principles

- Static site: no backend, runs entirely in the browser.
- Grammar-based generation, not LLM-generated.
- Extensible by data: new entries and new genres are added as data, not code.

## v1 scope

- Genre / sub-genre picker (sci-fi, fantasy, mashups)
- Lock and reroll individual slots
- Favorites (saved locally) and copy to clipboard

## Out of scope (v1)

- Share links
- Seeded / repeatable output
- LLM generation
- User-editable lists in the UI

## Working agreements

- Update `NEXT-SESSION.txt` only when the developer asks.
- Deviating from a documented decision: propose in a new entry and ask first.

## Architecture notes

- Vanilla ES modules, no build step; serve over HTTP (`python3 -m http.server`).
- `js/grammar.js` expander → `js/generator.js` slot/template logic → `js/app.js` UI.
- Data in `packs/` (manifest + one JSON per genre). See `decisions/grammar-and-data.md`.
- Deployed on GitHub Pages: https://arbuckleburr.github.io/in-a-world/
