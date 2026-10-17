# In a World — Entry Point

Read this first, then follow the routing table.

## Concept

"In a World" is a static web app that generates movie log lines across
genres (currently nine packs: science fiction, fantasy, noir, period drama,
romantic comedy, spy thriller, horror). Generation is grammar-based
(Tracery-style). Data lives in genre packs so entries and genres can be added
over time. Live: https://arbuckleburr.github.io/in-a-world/

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

- Genre picker: Random (all packs, default) plus each pack, alphabetical
- Lock and reroll individual slots
- Favorites (saved locally) and copy to clipboard

## Out of scope (v1)

- Share links
- Seeded / repeatable output
- LLM generation
- User-editable lists in the UI

## Adding content

- More entries: append strings to a slot array in `packs/<genre>.json`.
- New genre: new pack file + one entry `{file, name, genre}` in `packs/manifest.json`; the picker sorts and lists it automatically.
- Slot grammar contract (entries must read correctly inside every template):
  - protagonist / antagonist: noun phrase with an article ("a disgraced fleet admiral")
  - flaw: participial or relative phrase ("haunted by...", "who trusts no one")
  - event: present-tense clause, no leading "when" ("a ghost ship drifts into port")
  - goal: bare infinitive, no time words (before/until/when/while/after)
  - stakes: clause, no "before"
  - keep pronouns neutral (they/their); `#rule#` values after a/an must not change the article
- After editing a pack, render every template against every pack and check for leftover `{}`/`#` (see standing-rules).

## Working agreements

- Update `NEXT-SESSION.txt` only when the developer asks.
- Deviating from a documented decision: propose in a new entry and ask first.

## Architecture notes

- Vanilla ES modules, no build step; serve over HTTP (`python3 -m http.server`).
- `js/grammar.js` expander → `js/generator.js` slot/template logic → `js/app.js` UI.
- Data in `packs/` (manifest + one JSON per genre). See `decisions/grammar-and-data.md`.
- Deployed on GitHub Pages: https://arbuckleburr.github.io/in-a-world/
