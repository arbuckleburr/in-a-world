# Build Log — 01 Setup

## 2026-10-17
- cloned arbuckleburr/in-a-world into empty folder (was empty repo, no commits)
- created docs/ skeleton per commenting skill
- spec written into docs/CLAUDE.md and decisions/
- renamed decisions/persistence-and-sharing.md → persistence-and-favorites.md (share dropped)
- code: none yet; committed: no
> superseded by later entries (v1 built same day; committed in c168ed8)
- built v1: grammar.js, generator.js, app.js, index.html, style.css, 4 packs (space-opera, cyberpunk, high-fantasy, dark-fantasy)
- tested: node smoke (all packs expand, 200 rolls/slot); browser: lock, reroll, genre change, favorites dedupe, localStorage
- live-tested: no (copy-to-clipboard, mobile layout, light theme)
- committed: no; GitHub Pages: not set up
- fix: lock moved into log line (clickable phrases); copy gets execCommand fallback
- tested: click-lock survives Generate all; real-click Copy in browser pane = "Copied."; scripted click copy fails (no user gesture) — expected
- open: user's original copy failure cause unconfirmed (file:// vs http, browser?)
- known wording issue: goal "...before dawn" + "before {stakes}" gives double "before" in some lines
> resolved: goals now banned from time words; see decisions/grammar-and-data.md "Packs hold 50+ entries per slot"
- live-tested: no (user's browser)
- content: 24 slot lists expanded to 50–54 entries each; built from text lists, JSON regenerated (build script not kept in repo)
- templates: 10 shared in packs/templates.json; fixed three awkward shapes; sentence-start capitalization added
- restyle: movie-trailer look (index.html, css/style.css rewritten)
- tested: node 15000 renders (all templates x packs, singles + mashup), no leftover {} or #; browser pane screenshot ok, no console errors
- live-tested: no (user's browser, mobile)
- committed: no
- fix: log line + favorites now Inter sans, no italic
- added noir pack (6 slots, 51–56 each); manifest "genres" labels; picker derives "Any X" options
- tested: node 18000 renders ok incl. noir-only; browser: picker lists Noir, noir line renders
- committed: no
- added english-period-drama + romantic-comedy packs; tagline generalized; Inter removed
- log line: Libre Baskerville normal; quote marks behind via CSS pseudo-elements
- tested: node 21000 renders ok; browser: picker lists 9 packs, romcom line renders, computed style normal serif; screenshot ok
- committed: no
- picker: Anything→Random; Any Sci-Fi/Any Fantasy removed; manifest genres labels removed; noir event 'found near #place#'
- added spy-thriller + horror packs (9 packs total); tested: node render check; horror goal 'before' fixed in JSON
- picker: packs sorted alphabetically in app.js, Random first; verified in browser pane
- live: GitHub Pages site verified (all files 200, 10 picker options, no console errors); Copy over https is now a secure context
- committed + pushed: c168ed8 (app, 9 packs, docs) and 70c6201 (docs: Pages deployment) to arbuckleburr/in-a-world main
- docs audit: refreshed CLAUDE.md (concept, picker, "Adding content" contract), STATUS.md, TESTING-OWED.md, NEXT-SESSION.txt, standing-rules.md; added supersede flags/pointers in decisions
- docs audit: committed + pushed
