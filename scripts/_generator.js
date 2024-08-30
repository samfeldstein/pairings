// Select two lists
// Return both, shuffled and matched up

import { show, getById, renderArrayAsUl } from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab elements
const [
  section,
  renderedLists,
  form,
  firstSelect,
  secondSelect,
  generateBtn,
  resetBtn,
] = getById(
  "generator-section",
  "rendered-lists",
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

// When a list is selected, the name property is used to find the list
firstSelect.addEventListener("change", () => {
  const selectedList = allLists.find((list) => list.name === firstSelect.value);
  // Good. Now hide this in a div, then generate button displays it
  renderedLists.appendChild(renderArrayAsUl(selectedList.list));
});

secondSelect.addEventListener("change", () => {
  const selectedList = allLists.find(
    (list) => list.name === secondSelect.value
  );
  return selectedList.list;
});

generateBtn.onclick = function () {
  show(renderedLists);
};

// shuffle the lists
//combine them into a single list
// Render that list

// The array is shuffled
// A document fragment of the list is built, to prepare for rendering
// The list is rendered but not displayed

// GENERATE PAIRINGS
// On click, display rendered lists
// Justify the left one right

// Could be useful: https://www.smashingmagazine.com/2024/08/generating-unique-random-numbers-javascript-using-sets/
