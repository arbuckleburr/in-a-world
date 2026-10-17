# Standing Rules

Each line: rule — pointer to source entry.

- Pack entries must follow the slot grammar contract (article NPs, bare-infinitive goals, etc.) — decisions/grammar-and-data.md "Six slots"
- Goals must not contain before/until/when/while/after; stakes must not contain "before" — grammar-and-data "Packs hold 50+ entries"
- Keep pack text pronoun-neutral — grammar-and-data "English Period Drama and Romantic Comedy packs"
- After any pack or template edit, render every template against every pack and check for leftover `{}` / `#` — build-log/01-setup.md (node render checks)
- Always test over HTTP (localhost), never file:// — packs load via fetch; `0.0.0.0` is not a secure context for the Clipboard API — decisions/architecture-and-process.md, persistence-and-favorites.md
- Genre picker is built and sorted in code from the manifest; don't hand-order options — ui-and-interaction.md "Picker sorted alphabetically"
- Don't edit past decision/build-log text: add a new entry and a blockquote pointer — docs skill
