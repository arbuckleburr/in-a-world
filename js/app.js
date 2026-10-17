import { SLOTS, mergePacks, rollSlot, rollTemplate, render, renderParts } from "./generator.js";

const FAVORITES_KEY = "in-a-world:favorites";

const els = {
  genre: document.getElementById("genre"),
  generate: document.getElementById("generate"),
  logline: document.getElementById("logline"),
  copy: document.getElementById("copy"),
  favorite: document.getElementById("favorite"),
  status: document.getElementById("status"),
  slots: document.getElementById("slots"),
  favorites: document.getElementById("favorites"),
  noFavorites: document.getElementById("no-favorites"),
};

const state = {
  manifest: [],
  templates: [],
  packs: new Map(), // file -> parsed pack
  pool: null,
  template: "",
  values: {},
  locked: new Set(),
};

// ---- pack loading -------------------------------------------------------

async function loadPacks() {
  const manifest = await (await fetch("packs/manifest.json")).json();
  state.manifest = manifest.packs;
  state.templates = (await (await fetch("packs/templates.json")).json()).templates;
  await Promise.all(
    state.manifest.map(async (entry) => {
      const pack = await (await fetch(`packs/${entry.file}`)).json();
      state.packs.set(entry.file, pack);
    })
  );
}

// Genre options are built from the manifest, so adding a pack to the
// manifest is all that is needed for it to appear in the picker. Random stays
// first (the default); packs are sorted alphabetically regardless of manifest order.
function buildGenreOptions() {
  const options = [
    { value: "all", label: "Random" },
    ...[...state.manifest]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p) => ({ value: `pack:${p.file}`, label: p.name })),
  ];
  for (const o of options) {
    const opt = document.createElement("option");
    opt.value = o.value;
    opt.textContent = o.label;
    els.genre.append(opt);
  }
}

function selectedPacks() {
  const [kind, id] = els.genre.value.split(":");
  const entries = state.manifest.filter((p) => kind !== "pack" || p.file === id);
  return entries.map((p) => state.packs.get(p.file));
}

// ---- generation ---------------------------------------------------------

function rebuildPool() {
  state.pool = mergePacks(selectedPacks(), state.templates);
}

function generateAll() {
  state.template = rollTemplate(state.pool);
  for (const { key } of SLOTS) {
    if (!state.locked.has(key) || !state.values[key]) {
      state.values[key] = rollSlot(state.pool, key);
    }
  }
  draw();
}

function rerollSlot(key) {
  state.values[key] = rollSlot(state.pool, key);
  draw();
}

// ---- rendering ----------------------------------------------------------

function currentLine() {
  return render(state.template, state.values);
}

function toggleLock(key) {
  state.locked.has(key) ? state.locked.delete(key) : state.locked.add(key);
  draw();
}

// Slot phrases in the sentence are buttons: click to lock/unlock in place.
function drawLogline() {
  els.logline.replaceChildren(
    ...renderParts(state.template, state.values).map((part) => {
      if (!part.slot) return document.createTextNode(part.text);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot-word";
      btn.textContent = part.text;
      const locked = state.locked.has(part.slot);
      btn.setAttribute("aria-pressed", String(locked));
      btn.title = locked ? "Locked. Click to unlock." : "Click to lock.";
      btn.addEventListener("click", () => toggleLock(part.slot));
      return btn;
    })
  );
}

function draw() {
  drawLogline();
  els.slots.replaceChildren(...SLOTS.map(slotRow));
}

function slotRow({ key, label }) {
  const li = document.createElement("li");

  const name = document.createElement("span");
  name.className = "slot-label";
  name.textContent = label;

  const value = document.createElement("span");
  value.textContent = state.values[key];

  const lockLabel = document.createElement("label");
  lockLabel.className = "slot-lock";
  const lock = document.createElement("input");
  lock.type = "checkbox";
  lock.checked = state.locked.has(key);
  lock.addEventListener("change", () => toggleLock(key));
  lockLabel.append(lock, "Lock");

  const reroll = document.createElement("button");
  reroll.type = "button";
  reroll.textContent = "Reroll";
  reroll.disabled = state.locked.has(key);
  reroll.addEventListener("click", () => rerollSlot(key));

  li.append(name, value, lockLabel, reroll);
  return li;
}

// ---- favorites ----------------------------------------------------------

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  } catch {
    flash("Could not save: browser storage is unavailable.");
  }
}

function drawFavorites() {
  const list = loadFavorites();
  els.noFavorites.hidden = list.length > 0;
  els.favorites.replaceChildren(
    ...list.map((line, i) => {
      const li = document.createElement("li");
      const text = document.createElement("span");
      text.textContent = line;

      const actions = document.createElement("span");
      actions.className = "fav-actions";
      const copy = document.createElement("button");
      copy.type = "button";
      copy.textContent = "Copy";
      copy.addEventListener("click", () => copyText(line));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => {
        saveFavorites(loadFavorites().filter((_, j) => j !== i));
        drawFavorites();
      });
      actions.append(copy, remove);

      li.append(text, actions);
      return li;
    })
  );
}

function addFavorite() {
  const line = currentLine();
  const list = loadFavorites();
  if (list.includes(line)) return flash("Already in favorites.");
  saveFavorites([line, ...list]);
  drawFavorites();
  flash("Saved.");
}

// ---- misc ---------------------------------------------------------------

let flashTimer;
function flash(message) {
  els.status.textContent = message;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => (els.status.textContent = ""), 2500);
}

// The async Clipboard API only works in secure contexts and can be denied by
// permissions policy; fall back to a hidden textarea + execCommand.
function legacyCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  try {
    return document.execCommand("copy");
  } finally {
    area.remove();
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return flash("Copied.");
  } catch {
    // fall through to legacy path
  }
  flash(legacyCopy(text) ? "Copied." : "Copy failed. Select the text and copy manually.");
}

// ---- boot ---------------------------------------------------------------

els.genre.addEventListener("change", () => {
  rebuildPool();
  // Locked slots keep their value even across a genre change; the rest reroll.
  generateAll();
});
els.generate.addEventListener("click", () => generateAll());
els.copy.addEventListener("click", () => copyText(currentLine()));
els.favorite.addEventListener("click", addFavorite);

try {
  await loadPacks();
  buildGenreOptions();
  rebuildPool();
  generateAll();
  drawFavorites();
} catch (err) {
  els.logline.textContent =
    "Could not load genre packs. Serve this folder over HTTP (e.g. python3 -m http.server) instead of opening the file directly.";
  console.error(err);
}
