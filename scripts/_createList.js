import {
  getById,
  createElement,
  onEnter,
  hide,
  show,
  sortObjects,
} from "./_functions.js";
import { allLists, renderAllLists } from "./_allLists.js";

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

// Create list button logic
createListBtn.onclick = function () {
  hide(this);
  show(form);
  nameInput.focus();
};

// If the item input is hidden, meaning you haven't entered a name yet, hide the name input when you click elsewhere
nameInput.onblur = function () {
  // If you tab through instead of hitting enter, name will still be saved
  listNameEl.textContent = nameInput.value;
};

// Enter list name
onEnter(nameInput, function () {
  show(form);
  itemInput.focus();
});

// Enter list items
onEnter(itemInput, function () {
  const [itemEl, itemText, deleteBtn] = createElement("li", "div", "button");

  // Delete button props
  Object.assign(deleteBtn, {
    classList: ["delete-item"],
    type: "button",
    textContent: "Delete",
  });

  // Delete button logic
  deleteBtn.onclick = function () {
    itemEl.remove();
  };

  // Add item text content, append it and delete button to the li
  itemText.textContent = itemInput.value;
  itemEl.appendChild(itemText);
  itemEl.appendChild(deleteBtn);

  // Add li to ul
  listEl.appendChild(itemEl);

  // Show save button
  show(saveButton, newListContainer);

  // Clear the input
  itemInput.value = "";
});

// Save button logic
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
  hide(form, newListContainer, this);
  show(createListBtn);

  // Sort all lists
  // If this isn't here, lists aren't sorted for rendering as options
  sortObjects(allLists, "name");

  // Render all lists
  renderAllLists();
};
