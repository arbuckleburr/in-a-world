// Minimal Tracery-style expander. Written in-house rather than vendoring
// Tracery: we only need #symbol# expansion and a capitalize modifier, and
// this avoids pulling third-party code into the repo.
//
// Rules map a symbol name to an array of candidate strings; candidates may
// themselves contain #symbols#, which are expanded recursively.

export function pick(list, rng = Math.random) {
  return list[Math.floor(rng() * list.length)];
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const SYMBOL = /#([a-zA-Z_]+)(?:\.([a-zA-Z]+))?#/g;
const MAX_DEPTH = 10; // guards against a pack author writing a cyclic rule

export function expand(text, rules, rng = Math.random, depth = 0) {
  if (depth > MAX_DEPTH) throw new Error(`Grammar too deep expanding: ${text}`);
  return text.replace(SYMBOL, (_, name, modifier) => {
    const options = rules[name];
    if (!options) throw new Error(`Unknown grammar symbol: #${name}#`);
    let result = expand(pick(options, rng), rules, rng, depth + 1);
    if (modifier === "capitalize") result = capitalize(result);
    return result;
  });
}
