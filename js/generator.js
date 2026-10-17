// Log line assembly. A log line is a sentence template filled with named
// slots. Each slot is expanded on its own so the UI can lock or reroll one
// slot without disturbing the others.

import { expand, pick, capitalize } from "./grammar.js";

export const SLOTS = [
  { key: "protagonist", label: "Protagonist" },
  { key: "flaw", label: "Flaw" },
  { key: "event", label: "Inciting event" },
  { key: "goal", label: "Goal" },
  { key: "antagonist", label: "Antagonist" },
  { key: "stakes", label: "Stakes" },
];

// Merge several packs into one pool. A single pack is just a pool of one;
// "mashup" modes pass in many. Rules with the same name are concatenated.
// Sentence templates are shared across all packs (packs/templates.json); a
// pack may still add its own under "templates" for genre-specific phrasing.
export function mergePacks(packs, sharedTemplates = []) {
  const pool = { slots: {}, rules: {}, templates: [...sharedTemplates] };
  for (const pack of packs) {
    for (const [key, list] of Object.entries(pack.slots)) {
      pool.slots[key] = (pool.slots[key] || []).concat(list);
    }
    for (const [key, list] of Object.entries(pack.rules || {})) {
      pool.rules[key] = (pool.rules[key] || []).concat(list);
    }
    pool.templates.push(...(pack.templates || []));
  }
  return pool;
}

export function rollSlot(pool, key, rng = Math.random) {
  return expand(pick(pool.slots[key], rng), pool.rules, rng);
}

export function rollTemplate(pool, rng = Math.random) {
  return pick(pool.templates, rng);
}

// Split a template into parts so the UI can make each slot phrase clickable.
// Parts are {text} for fixed words or {text, slot} for a filled slot.
export function renderParts(template, values) {
  const parts = [];
  let last = 0;
  for (const m of template.matchAll(/\{([a-z]+)\}/g)) {
    if (m.index > last) parts.push({ text: template.slice(last, m.index) });
    parts.push({ text: values[m[1]], slot: m[1] });
    last = m.index + m[0].length;
  }
  if (last < template.length) parts.push({ text: template.slice(last) });
  // Capitalize the start of the line and the start of any later sentence.
  parts.forEach((part, i) => {
    if (i === 0 || /[.!?]\s*$/.test(parts[i - 1].text)) part.text = capitalize(part.text);
  });
  return parts;
}

export function render(template, values) {
  return renderParts(template, values).map((p) => p.text).join("");
}
