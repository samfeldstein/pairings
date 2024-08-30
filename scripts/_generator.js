// Select two lists
// Return both, shuffled and matched up

import { getById } from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab elements
const [form, firstSelect, secondSelect, generateBtn, resetBtn] = getById(
  "generator-form",
  "first-select",
  "second-select",
  "generate",
  "reset"
);

// Prevent page reload
form.addEventListener("submit", (event) => event.preventDefault());

// Render options
for (let list of allLists) {
  const option = `<option>${list.name}</option>`;
  firstSelect.innerHTML += option;
  secondSelect.innerHTML += option;
}

// Generate button
generateBtn.onclick = function () {
  
};

// When a list is selected, the name property is used to find the list
// Find the object in allLists that matches. Use this or self to grab the list property?
firstSelect.addEventListener("change", () => {
  const selectedList = allLists.find((list) => list.name === firstSelect.value);
  console.log(selectedList.list);
});

secondSelect.addEventListener("change", () => {
  const selectedList = allLists.find((list) => list.name === secondSelect.value);
  console.log(selectedList.list);
});
// The array is shuffled
// A document fragment of the list is built, to prepare for rendering
// The list is rendered but not displayed

// GENERATE PAIRINGS
// On click, display rendered lists
// Justify the left one right

// Could be useful: https://www.smashingmagazine.com/2024/08/generating-unique-random-numbers-javascript-using-sets/
