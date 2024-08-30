// Select two lists
// Return both, shuffled and matched up

import { getById } from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab select elements
const [firstSelect, secondSelect] = getById("first-select", "second-select");

for (let list of allLists) {
  const options = `<option>${list.name}</option>`;
  firstSelect.innerHTML += options;
  secondSelect.innerHTML += options;
}

// Loop through allLists, wrap each list name in an option element (document fragment?)
// Append fragment to both selects
// When a list is selected, the name property is used to find the list
// The array is shuffled
// A document fragment of the list is built, to prepare for rendering
// The list is rendered but not displayed

// GENERATE PAIRINGS
// On click, display rendered lists
// Justify the left one right

// Could be useful: https://www.smashingmagazine.com/2024/08/generating-unique-random-numbers-javascript-using-sets/
