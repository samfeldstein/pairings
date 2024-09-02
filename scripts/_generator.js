// Select two lists
// Return both, shuffled and matched up

import {
  hide,
  show,
  getById,
  renderArrayAsUl,
  shuffleArray,
  createElement,
} from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab elements
const [
  section,
  container,
  renderedLists,
  form,
  firstSelect,
  secondSelect,
  generateBtn,
  resetBtn,
] = getById(
  "generator-section",
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

// Render options on page load
renderOptions();

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
  this.disabled = true;
};

// Could be useful: https://www.smashingmagazine.com/2024/08/generating-unique-random-numbers-javascript-using-sets/

// Render options
export function renderOptions() {
  // As with allLists, clearing the whole thing is probably not the best way to do this
  renderedLists.innerHTML = "";
  // Add a default option
  const defaultOption = `<option value="">--Choose list--</option>`;
  firstSelect.innerHTML = defaultOption;
  secondSelect.innerHTML = defaultOption;
  // Rendered saved lists as options
  for (let list of allLists) {
    const option = `<option>${list.name}</option>`;
    firstSelect.innerHTML += option;
    secondSelect.innerHTML += option;
  }
}

// Render lists
function renderSelectedList(...selectElements) {
  for (let selectElement of selectElements) {
    const selectedList = allLists.find(
      (list) => list.name === selectElement.value
    );
    shuffleArray(selectedList.list);

    selectedList.list.unshift(`${selectedList.name}`);

    renderedLists.appendChild(renderArrayAsUl(selectedList.list));
  }
}
