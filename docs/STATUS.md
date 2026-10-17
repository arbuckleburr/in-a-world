# Status

## Built

- Live on GitHub Pages: https://arbuckleburr.github.io/in-a-world/ (push to main redeploys)
- Genre picker: Random (default) + 9 packs, alphabetical: Cyberpunk, Dark Fantasy, English Period Drama, High Fantasy, Horror, Noir, Romantic Comedy, Space Opera, Spy Thriller
- Six-slot generator; 52–57 entries per slot per pack; 10 shared sentence templates plus 2 per newer pack
- Lock by clicking a phrase in the log line (or slot checkbox); per-slot Reroll; Roll the film
- Favorites (localStorage), Copy (Clipboard API + execCommand fallback)
- Movie-trailer styling: dark, Bebas Neue titles, serif non-italic log line over translucent quote marks

## Tested

- Node: 30,000 renders across all templates and packs, no leftover placeholders
- Browser pane (local and live site): picker contents/order, lock, reroll, favorites save + dedupe, no console errors
- Live site: all files return 200

## Not tested

- Copy in the developer's own browser; mobile layout; other browsers

## Not built (out of scope so far)

- Share links, seeded/repeatable output, LLM generation, in-UI list editing
