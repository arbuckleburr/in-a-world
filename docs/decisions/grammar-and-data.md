# Decisions — Grammar and Data

## 2026-10-17 — Grammar-based generation (Tracery-style)
Status: active
- Nested rules produce sentence variety; no LLM, works offline.
- Why: developer's choice over flat templates, LLM, or hybrid.

## 2026-10-17 — Extensibility = data entries + genre packs
Status: active
- Expansion means adding entries to lists and adding new genres/sub-genres as packs.
- Out of v1: users adding their own lists in the UI.

## 2026-10-17 — No seeded output in v1
Status: active
- Not requested; dropped with share links.

## 2026-10-17 — Pack format: one JSON per genre + manifest
Status: partly superseded
- packs/manifest.json lists {file, name, genre}; genre is "scifi" or "fantasy".
- Pack: {templates[], rules{}, slots{}}. Templates use {slot}; entries may use #rule#.
- New genre = new pack file + manifest line; picker builds itself from manifest.
- Mashups (Anything / Any Sci-Fi / Any Fantasy) merge pools by concatenation.
> Genre values are now free-form metadata (scifi, fantasy, noir, period, romcom, thriller, horror), and the picker no longer builds "Any genre" options; see ui-and-interaction "Random plus individual packs only". Templates now live in packs/templates.json; see "Packs hold 50+ entries".


## 2026-10-17 — Six slots
Status: partly superseded
- protagonist, flaw, event, goal, antagonist, stakes.
- Grammar contract: protagonist/antagonist = noun phrase with article; flaw = participial/relative phrase; event = present-tense clause; goal = bare infinitive; stakes = clause.
- Two templates per pack in v1.
> Template count superseded: 10 shared templates plus per-pack extras; see "Packs hold 50+ entries per slot".


## 2026-10-17 — Packs hold 50+ entries per slot; templates shared
Status: active
- Each pack has 50+ entries per slot (currently 51–57 across all nine packs).
- Templates moved out of packs into packs/templates.json (10 shapes, incl. multi-sentence). Packs may still add their own via "templates".
- Template rules: every template uses all six slots; a sentence-start slot gets auto-capitalized (renderParts).
- Goal entries must not contain before/until/when/while/after (templates already add a time clause). Fixes the double "before" bug.
- Entries must fit the slot grammar contract (see "Six slots"). Rule values used after "a"/"an" must not change the article.
- Supersedes "Two templates per pack in v1" (partly superseded).

## 2026-10-17 — Noir pack; genre labels live in the manifest
Status: partly superseded
- packs/noir.json: 51–56 entries per slot, classic 1940s detective noir. Genre id "noir".
- Manifest gained "genres" {id: label}. Picker shows "Any <genre>" only for genres with 2+ packs, so a single-pack genre (noir) appears once.
- "Anything" now includes noir. New genre = add id to manifest "genres" + pack with that genre.
> Manifest "genres" labels and "Any <genre>" options were removed; see ui-and-interaction "Random plus individual packs only".


## 2026-10-17 — English Period Drama and Romantic Comedy packs
Status: active
- packs/english-period-drama.json (genre "period"), packs/romantic-comedy.json (genre "romcom"); 52–57 entries per slot.
- Each carries 2 pack-level templates with gentler phrasing; shared templates still apply, so some lines read as action-style parody (e.g. a dowager "grows stronger"). Accepted.
- Manifest "genres" gained period + romcom. Site is no longer sci-fi/fantasy only; tagline now "A log line generator for the movies".
- Pack text kept pronoun-neutral (they/their); fixed descriptions only where the character is clearly specified.

## 2026-10-17 — Spy Thriller and Horror packs
Status: partly superseded
- packs/spy-thriller.json, packs/horror.json; 52–57 entries per slot; 2 pack-level templates each.
- Same slot grammar contract and time-word ban on goals/stakes (the build check also flags "before" in stakes).
- Picker order follows manifest order: Space Opera, Cyberpunk, High Fantasy, Dark Fantasy, Noir, English Period Drama, Romantic Comedy, Spy Thriller, Horror.
> Picker order bullet superseded: packs sorted alphabetically; see ui-and-interaction "Picker sorted alphabetically".
