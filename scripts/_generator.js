// Select two lists
// Return both, shuffled and matched up

import { show, getById, renderArrayAsUl, shuffleArray } from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab elements
const [container, renderedLists, form, firstSelect, secondSelect, generateBtn] =
  getById(
    "pairings-container",
    "rendered-lists",
    "generator-form",
    "first-select",
    "second-select",
    "generate"
  );

// Prevent page reload on submit
form.addEventListener("submit", (event) => event.preventDefault());

// Generate logic
generateBtn.onclick = function () {
  if (form.checkValidity() === true) {
    // If rendered lists exist, get rid of em. This lets the user generate as many times in a row as they want.
    if (renderedLists) {
      renderedLists.innerHTML = "";
    }

    renderSelectedList(firstSelect, secondSelect);
    show(container);
  }
};

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

export function renderOptions() {
  // As with allLists, clearing the whole thing is probably not the best way to do this
  renderedLists.innerHTML = "";
  // Add a default option
  const defaultOption = `<option value="">--Choose list--</option>`;
  firstSelect.innerHTML = defaultOption;
  secondSelect.innerHTML = defaultOption;
  // Render saved lists as options
  for (let list of allLists) {
    const option = `<option>${list.name}</option>`;
    firstSelect.innerHTML += option;
    secondSelect.innerHTML += option;
  }
}