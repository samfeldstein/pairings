// Select two lists
// Return both, shuffled and matched up

import { show, getById, renderArrayAsUl, shuffleArray } from "./_functions.js";
import { allLists } from "./_allLists.js";

// Grab elements
const [renderedLists, form, firstSelect, secondSelect, generateBtn] = getById(
  "rendered-lists",
  "generator-form",
  "first-select",
  "second-select",
  "generate"
);

// Prevent page reload on submit
form.addEventListener("submit", (event) => event.preventDefault());

// Generate button logic
generateBtn.onclick = function () {
  if (form.checkValidity() === true) {
    // If rendered lists exist, get rid of em. This lets the user generate as many times in a row as they want.
    if (renderedLists) {
      renderedLists.innerHTML = "";
    }

    // Render lists
    renderPairings(firstSelect, secondSelect);

    // Show the section
    show(renderedLists);
    
  }
};

// Render lists
function renderPairings(...selectElements) {
  const selectedLists = [];
  const pairings = [];

  // Loop through select elements
  for (let selectElement of selectElements) {
    // Match list.name to the selected value to find the array
    const selectedList = allLists.find(
      (list) => list.name === selectElement.value
    );
    // Shuffle the array
    shuffleArray(selectedList.list);

    // Add the selected lists to an array
    selectedLists.push(selectedList.list);
  }

  // Return pairings as an array
  let i = 0;
  while (i < selectedLists[0].length && i < selectedLists[1].length) {
    pairings.push(`${selectedLists[0][i]}, ${selectedLists[1][i]}`);
    i++;
  }

  // Render pairings
  const renderedList = renderArrayAsUl(pairings);
  renderedLists.appendChild(renderedList);
}

export function renderOptions() {
  // As with allLists, clearing the whole thing is probably not the best way to do this
  renderedLists.innerHTML = "";
  // Add a default option
  const defaultOption = `<option value="">--</option>`;
  firstSelect.innerHTML = defaultOption;
  secondSelect.innerHTML = defaultOption;
  // Render saved lists as options
  for (let list of allLists) {
    const option = `<option>${list.name}</option>`;
    firstSelect.innerHTML += option;
    secondSelect.innerHTML += option;
  }
}
