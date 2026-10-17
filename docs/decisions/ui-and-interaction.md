# Decisions — UI and Interaction

## 2026-10-17 — v1 interactions
Status: active
- Genre / sub-genre picker.
- Lock and reroll individual slots (e.g. keep protagonist, reroll antagonist).

## 2026-10-17 — Lock persists across genre change
Status: active
- A locked slot keeps its value when the genre changes, so mashup lines can result. Unlocked slots reroll. Revisit if confusing.
- "Generate all" rerolls template + unlocked slots; per-slot Reroll disabled while locked.

## 2026-10-17 — Lock by clicking the phrase in the log line
Status: active
- Slot phrases in the sentence are buttons (aria-pressed); click toggles lock. Slot-list checkbox remains as a second control.
- Why: developer could not find the lock; the slot list below the fold was not discoverable.

## 2026-10-17 — Movie-trailer aesthetic, dark only
Status: active
- Near-black bg with warm spotlight, Bebas Neue titles, Libre Baskerville italic log line in a letterboxed "screen", gold accent.
- Fonts via Google Fonts link with system fallbacks (Impact/Georgia).
- No light theme; supersedes any earlier light-theme plan. Button renamed "Roll the film".

## 2026-10-17 — Log line and favorites in sans-serif, not italic
Status: active
- Inter (Google Fonts, system-ui fallback), weight 500. Titles stay Bebas Neue; other text stays Libre Baskerville.
- Why: developer found the italic serif hard to read. Supersedes the italic serif log line in the trailer-aesthetic entry (partly superseded).

## 2026-10-17 — Log line back to serif (non-italic) with quote marks behind
Status: active
- Libre Baskerville, normal style. Large translucent gold “ ” (::before/::after on .screen, opacity .13, alt-text-empty) behind the text.
- Supersedes the sans-serif/Inter entry above (Inter removed from the font link). The earlier italic serif is also not restored.

## 2026-10-17 — Picker: "Random" plus individual packs only
Status: active
- "Anything" renamed "Random" (still draws from every pack). "Any Science Fiction" / "Any Fantasy" removed.
- Supersedes the "Any <genre>" picker behavior in grammar-and-data "Noir pack" entry. Manifest "genres" labels removed as unused; per-pack "genre" field kept as metadata.

## 2026-10-17 — Picker sorted alphabetically, Random first
Status: active
- Packs sorted by name in code (localeCompare), so manifest order no longer matters; Random stays first and is the default.
- Supersedes the "picker order follows manifest order" note in grammar-and-data (Spy Thriller/Horror entry).
