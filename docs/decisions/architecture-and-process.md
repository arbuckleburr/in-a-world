# Decisions — Architecture and Process

## 2026-10-17 — Static web app, no backend
Status: active
- Runs fully in the browser; hostable on any static host.
- Why: developer's choice; simplest to host and extend.

## 2026-10-17 — Handoff notes only on request
Status: active
- `NEXT-SESSION.txt` updated only when the developer asks.
- Why: developer's choice.

## 2026-10-17 — Project name "In a World"
Status: active
- Display name is "In a World"; repo/folder is `in-a-world`.

## 2026-10-17 — Vanilla HTML/CSS/JS, ES modules, no build step
Status: active
- Files: index.html, css/, js/, packs/. Needs HTTP to load packs (fetch); file:// fails.
- Why: simplest to host on GitHub Pages and to extend.

## 2026-10-17 — Host on GitHub Pages
Status: active
- Deployment not yet set up.

## 2026-10-17 — Own Tracery-style expander instead of vendoring Tracery
Status: active
- js/grammar.js: #symbol# expansion + .capitalize, depth-capped.
- Why: needs are tiny; avoids downloading third-party code.
- Deviates from the "use Tracery itself" proposal the developer approved. Revisit if richer Tracery features are wanted.

## 2026-10-17 — Deployed on GitHub Pages
Status: active
- Live at https://arbuckleburr.github.io/in-a-world/ (set up by developer from main).
- Supersedes "Deployment not yet set up" under the Host on GitHub Pages entry. Push to main redeploys.
