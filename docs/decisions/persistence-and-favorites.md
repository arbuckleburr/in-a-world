# Decisions — Persistence and Favorites

## 2026-10-17 — Favorites and copy; no share links
Status: active
- v1 has save-to-favorites and copy to clipboard.
- Share links excluded by developer.

## 2026-10-17 — Favorites in localStorage
Status: active
- Key in-a-world:favorites, JSON array of rendered line strings; duplicates rejected.

## 2026-10-17 — Copy: Clipboard API with execCommand fallback
Status: active
- navigator.clipboard first; hidden-textarea execCommand("copy") if it throws; message if both fail.
- Why: developer reported "copy failed"; async API needs secure context + user gesture.
