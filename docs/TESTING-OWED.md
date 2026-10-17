# Testing Owed

- Copy button: click Copy on the log line and on a favorite, paste elsewhere. Expect exact text. (Clipboard API needs https or localhost.)
- Mobile layout: open at phone width. Expect slot rows to stack, no horizontal scroll.
- Fonts: with network on, title should render in Bebas Neue; offline it falls back to Impact/sans-serif.
- Run locally: `python3 -m http.server` in repo root, open http://localhost:8000.
