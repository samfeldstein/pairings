import { getById, createElement, onEnter, hide, show } from "./_functions.js";
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

// Press the button to create a new list
createListBtn.onclick = function () {
  hide(this);
  show(form, nameInput);
  nameInput.focus();
};

// If you unfocus the name input without hitting enter, hide the input and show the create button
nameInput.onblur = function () {
  if (itemInput.classList.contains("hidden")) {
    hide(this);
    show(createListBtn);
  }
};

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

  // Add item text content, append it along and delete button to the li element
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
  const listArray = divsArray.map((div) => div.textContent);

  console.log("NEW LIST");
  console.log(listArray);

  // Add list to allLists
  // This could probably be split into two functions
  createListObject(`${listNameEl.textContent}`, listArray);

  // Clear the list container
  const children = newListContainer.querySelectorAll("*");
  for (const child of children) {
    child.textContent = "";
  }

  // Rest everything
  form.reset();
  hide(form, itemInput, this);
  show(createListBtn);

  // Render all lists
  // There's probably a way to += this? Which would be way more efficient
  renderAllLists();
};

// Functions
// Maybe should be split into two functions
function createListObject(name, list) {
  allLists.push({ name: name, list: list });
  console.log("ALL LISTS");
  console.log(allLists);

  localStorage.setItem("All Lists", JSON.stringify(allLists));
  console.log("STORED LISTS");
  console.log(localStorage);
}
