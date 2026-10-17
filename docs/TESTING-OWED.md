# Testing Owed

- Copy: on the live site, click Copy on the log line and on a favorite, paste elsewhere. Expect exact text and "Copied.".
- Mobile layout: open the live site at phone width. Expect slot rows to stack, quote marks visible but not overlapping text, no horizontal scroll.
- Fonts: with network on, title in Bebas Neue and log line in Libre Baskerville; offline they fall back to Impact / Georgia.
- After a deploy: hard-refresh (Ctrl+Shift+R); Pages and browsers can serve cached CSS/JS for a minute or two.
- Run locally: `python3 -m http.server` in repo root, open http://localhost:8000 (not 0.0.0.0).
