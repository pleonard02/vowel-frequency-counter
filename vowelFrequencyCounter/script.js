// script.js

document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const normalizeAccentsCheckbox = document.getElementById("normalizeAccents");
  const caseInsensitiveCheckbox = document.getElementById("caseInsensitive");
  const countButton = document.getElementById("countButton");

  const resultsSection = document.getElementById("resultsSection");
  const summaryText = document.getElementById("summaryText");

  // Row elements for each vowel family
  const rowMap = {
    a: document.getElementById("aFamily"),
    e: document.getElementById("eFamily"),
    i: document.getElementById("iFamily"),
    o: document.getElementById("oFamily"),
    u: document.getElementById("uFamily"),
    y: document.getElementById("yFamily"),
  };

  // Make sure each row has two cells: [label, count]
  const countCellMap = {};

  for (const [family, row] of Object.entries(rowMap)) {
    if (!row) continue;

    // Clear whatever is inside (e.g. just "A")
    row.innerHTML = "";

    const labelCell = document.createElement("td");
    labelCell.textContent = family.toUpperCase();

    const countCell = document.createElement("td");
    countCell.textContent = "0";

    row.appendChild(labelCell);
    row.appendChild(countCell);

    countCellMap[family] = countCell;
  }

  countButton.addEventListener("click", () => {
    const text = textInput.value || "";

    // If "Treat accented vowels as their base" is on → use "family" mode
    // If off → use "english" mode (plain a/e/i/o/u/y only)
    const mode = normalizeAccentsCheckbox.checked ? "family" : "english";

    // "Case Insensitive" checked means caseSensitive = false
    const caseSensitive = !caseInsensitiveCheckbox.checked;

    // we want Y included because you have a Y row
    const includeY = true;

    // countVowels is now global from vowelFrequencyCounter.js
    const { freq, total, top } = window.countVowels(text, {
      mode,
      includeY,
      caseSensitive,
    });

    // Update table counts
    for (const family of ["a", "e", "i", "o", "u", "y"]) {
      const cell = countCellMap[family];
      if (!cell) continue;

      const value = freq[family] ?? 0;
      cell.textContent = value;
    }

    // Update summary text
    if (total === 0) {
      summaryText.textContent = "No vowels found in the text.";
    } else {
      const topPart =
        top && top.length ? ` Top vowel(s): ${top.join(", ")}.` : "";

      summaryText.textContent = `Total vowels counted: ${total}.${topPart}`;
    }

    resultsSection.hidden = false;
  });
});
