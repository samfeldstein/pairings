// Select two lists
// Return both, shuffled and matched up

import {
  hide,
  show,
  getById,
  renderArrayAsUl,
  shuffleArray,
} from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab elements
const [
  container,
  renderedLists,
  form,
  firstSelect,
  secondSelect,
  generateBtn,
  resetBtn,
] = getById(
  "pairings-container",
  "rendered-lists",
  "generator-form",
  "first-select",
  "second-select",
  "generate",
  "reset"
);

// Prevent page reload on submit
form.addEventListener("submit", (event) => event.preventDefault());

// Generate logic
generateBtn.onclick = function () {
  if (form.checkValidity() === true) {
    renderSelectedList(firstSelect, secondSelect);
    show(container);
    this.disabled = true;
    resetBtn.disabled = false;
  }
};

// Reset logic
// Form.reset() doesn't work here for some reason
resetBtn.onclick = function () {
  // Reset the form
  firstSelect.selectedIndex = 0;
  secondSelect.selectedIndex = 0;
  // Clear and hide rendered list container
  renderedLists.innerHTML = "";
  hide(container);
  // Enable the generate button
  generateBtn.disabled = false;
  // Disable the reset button
  this.disabled = true;
};

// Could be useful: https://www.smashingmagazine.com/2024/08/generating-unique-random-numbers-javascript-using-sets/

// Render lists
function renderSelectedList(...selectElements) {
  // Loop through select elements
  for (let selectElement of selectElements) {
    // Match list.name to the selected value
    const selectedList = allLists.find(
      (list) => list.name === selectElement.value
    );
    // Shuffle the array
    shuffleArray(selectedList.list);
    // Add the list name as the first li
    const listName = document.createElement("div");
    listName.textContent = selectedList.name;

    const renderedList = renderArrayAsUl(selectedList.list);
    renderedList.prepend(listName);
    renderedLists.appendChild(renderedList);
  }
}
