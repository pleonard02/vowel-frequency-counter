// vowel families
const VOWEL_FAMILIES = {
  a: ["a", "á", "à", "â", "ä", "ã", "å", "ā", "ă", "ą", "æ"],
  e: ["e", "é", "è", "ê", "ë", "ē", "ĕ", "ė", "ę", "ě"],
  i: ["i", "í", "ì", "î", "ï", "ī", "ĭ", "į", "ı"],
  o: ["o", "ó", "ò", "ô", "ö", "õ", "ō", "ŏ", "ő", "ø", "œ"],
  u: ["u", "ú", "ù", "û", "ü", "ū", "ŭ", "ů", "ű", "ų"],
  y: ["y", "ý", "ÿ", "ŷ"],
};

// build quick lookup maps
const FAMILY_BY_CHAR = (() => {
  const map = new Map();
  for (const [base, chars] of Object.entries(VOWEL_FAMILIES)) {
    for (const ch of chars) {
      map.set(ch, base);
      map.set(ch.toUpperCase(), base); // include uppercase characters
    }
  }
  return map;
})();

const DISTINCT_SET = new Set([...FAMILY_BY_CHAR.keys()]);

function initFreq(keys) {
  const obj = {};
  for (const k of keys) obj[k] = 0;
  return obj;
}

/**
 * Count vowels with switchable modes.
 * @param {string} text
 * @param {Object} opts
 * @param {'english'|'family'|'distinct'} opts.mode
 * @param {boolean} [opts.includeY=false] include Y/y (and its accents) as vowel(s)
 * @param {boolean} [opts.caseSensitive=false] if true, distinct mode keeps case separate
 * @returns {{ freq: Record<string, number>, total: number, top: string[] }}
 */
function countVowels(
  text,
  { mode = "family", includeY = false, caseSensitive = false } = {}
) {
  let symbols, classify;

  if (mode === "english") {
    const base = includeY
      ? ["a", "e", "i", "o", "u", "y"]
      : ["a", "e", "i", "o", "u"];
    symbols = new Set([...base, ...base.map((c) => c.toUpperCase())]);
    classify = (ch) => {
      const c = caseSensitive ? ch : ch.toLowerCase();
      return base.includes(c) ? (caseSensitive ? ch : c) : null;
    };
  } else if (mode === "family") {
    const families = Object.keys(VOWEL_FAMILIES).filter(
      (f) => includeY || f !== "y"
    );
    symbols = new Set(families);
    classify = (ch) => {
      const fam = FAMILY_BY_CHAR.get(ch);
      if (!fam) return null;
      if (fam === "y" && !includeY) return null;
      return fam;
    };
  } else if (mode === "distinct") {
    const baseFamilies = includeY
      ? Object.keys(VOWEL_FAMILIES)
      : Object.keys(VOWEL_FAMILIES).filter((f) => f !== "y");

    const allChars = baseFamilies.flatMap((f) => {
      const chars = VOWEL_FAMILIES[f];
      return caseSensitive
        ? [...chars, ...chars.map((c) => c.toUpperCase())]
        : [
            ...new Set(
              chars
                .flatMap((c) => [c, c.toUpperCase()])
                .map((x) => x.toLowerCase())
            ),
          ];
    });

    symbols = new Set(allChars);
    classify = (ch) => {
      if (!DISTINCT_SET.has(ch) && !DISTINCT_SET.has(ch.toLowerCase()))
        return null;
      return caseSensitive ? ch : ch.toLowerCase();
    };
  } else {
    throw new Error("Unknown mode");
  }

  const freq = initFreq(symbols);
  let total = 0;

  for (const ch of text) {
    const key = classify(ch);
    if (key != null && key in freq) {
      freq[key]++;
      total++;
    }
  }

  const values = Object.values(freq);
  const max = values.length ? Math.max(...values) : 0;
  const top = Object.entries(freq)
    .filter(([, n]) => n === max && n > 0)
    .map(([k]) => k);

  return { freq, total, top };
}

window.countVowels = countVowels;
