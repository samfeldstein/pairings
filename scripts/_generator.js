// Select two lists
// Return both, shuffled and matched up

import { show, getById, renderArrayAsUl, shuffleArray } from "./_functions.js";
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

// Render lists
function renderSelectedList(selectElement) {
  const selectedList = allLists.find(
    (list) => list.name === selectElement.value
  );
  console.log(selectedList.list);
  shuffleArray(selectedList.list);
  console.log(selectedList.list);

  renderedLists.appendChild(renderArrayAsUl(selectedList.list));
}

firstSelect.addEventListener("change", () => {
  renderSelectedList(firstSelect);
});

secondSelect.addEventListener("change", () => {
  renderSelectedList(secondSelect);
});

// Generate lists
generateBtn.onclick = function () {
  if (form.checkValidity() === true) {
    show(container);
  }
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
