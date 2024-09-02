import { getById, createElement, onEnter, hide, show } from "./_functions.js";
import { allLists, renderAllLists } from "./_allLists.js";
import { renderOptions } from "./_generator.js";

const [
  createListBtn,
  form,
  nameInput,
  listNameEl,
  newListContainer,
  itemInput,
  listEl,
  saveButton,
] = getById(
  "create-list-btn",
  "new-list-form",
  "new-list-name-input",
  "new-list-name",
  "new-list-container",
  "new-list-item",
  "new-list",
  "save-new-list"
);

// Press the button to create a new list
createListBtn.onclick = function () {
  hide(this);
  show(form, nameInput);
  nameInput.focus();
};

// If you unfocus the name input without hitting enter, hide the input and show the create button
// As is, code run if you click the save button. We'd solved this earlier by hiding the save button until you enter a name or item, but that was proving challenging on its own.
// nameInput.onblur = function () {
//   if (itemInput.classList.contains("hidden")) {
//     hide(form);
//     show(createListBtn);
//   }
// };

// Enter list name
onEnter(nameInput, function () {
  listNameEl.textContent = nameInput.value;
  show(newListContainer);
  show(itemInput);
  itemInput.focus();
});

// Enter list items
onEnter(itemInput, function () {
  const [itemEl, itemText, deleteBtn] = createElement("li", "div", "button");

  // Delete button functions
  Object.assign(deleteBtn, {
    classList: ["delete-item"],
    type: "button",
    textContent: "Delete",
  });

  deleteBtn.onclick = function () {
    itemEl.remove();
  };

  // Add item text content, append it and delete button to the li element
  itemText.textContent = itemInput.value;
  itemEl.appendChild(itemText);
  itemEl.appendChild(deleteBtn);

  // Add li to ul
  listEl.appendChild(itemEl);

  // Clear the input
  itemInput.value = "";
});

// Save new list
saveButton.onclick = function (event) {
  event.preventDefault(); // Prevent page refresh

  // Prevent adding empty lists
  if (!listEl.innerHTML) {
    alert("Error: List empty, nothing to save");
    return;
  }

  // Grab list item text and turn into an array
  const childDivs = listEl.querySelectorAll("div");
  const divsArray = [...childDivs];
  const listItemStrings = divsArray.map((div) => div.textContent);

  // Turn the list into an object
  const listObject = {
    name: listNameEl.textContent,
    list: listItemStrings,
  };

  // Add object to all list array
  allLists.push(listObject);

  // Store all lists array locally
  localStorage.setItem("All Lists", JSON.stringify(allLists));

  // Clear the list container
  const children = newListContainer.querySelectorAll("*");
  for (const child of children) {
    child.textContent = "";
  }

  // Reset the form
  form.reset();
  hide(form, itemInput, newListContainer);
  show(createListBtn);

  // Render generator options
  renderOptions();

  // Render all lists
  renderAllLists();
};
