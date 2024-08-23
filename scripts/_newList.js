import { getById, onEnter, hide, show } from "./_functions.js";
import { allLists } from "./_allLists.js";

const [
  createListBtn,
  form,
  formListContainer,
  nameInput,
  listNameEl,
  newListContainer,
  itemInput,
  listEl,
  saveButton,
] = getById(
  "create-list-btn",
  "new-list-form",
  "form-list-container",
  "new-list-name-input",
  "new-list-name",
  "new-list-container",
  "new-list-item",
  "new-list",
  "save-new-list"
);

// Create new list
createListBtn.onclick = function (event) {
  hide(this);
  show(form);
  show(nameInput);
  nameInput.focus();
};

// Add new list name
nameInput.addEventListener("blur", function () {
  if (itemInput.classList.contains("hidden")) {
    hide(this);
    show(createListBtn);
  }
});

onEnter(nameInput, function () {
  listNameEl.textContent = nameInput.value.trim(); // Use this instead of nameInput?
  show(itemInput);
  itemInput.focus();
  show(newListContainer);
});

onEnter(itemInput, function () {
  const itemEl = document.createElement("li");
  const item = document.createElement("div");
  const deleteBtn = document.createElement("button");

  Object.assign(deleteBtn, {
    classList: ["delete-item"],
    type: "button",
    textContent: "Delete",
  });

  deleteBtn.onclick = function () {
    itemEl.remove();
  };

  item.textContent = itemInput.value.trim();
  itemEl.appendChild(item);
  itemEl.appendChild(deleteBtn);

  // Render the list item
  listEl.appendChild(itemEl);
  // listArray.push(itemInput.value);
  // console.log("LIST ARRAY");
  // console.log(listArray);

  itemInput.value = "";

  show(saveButton);
});

// Save new list
saveButton.onclick = function (event) {
  event.preventDefault(); // Prevent page refresh

  // Turn list items into an array
  const childDivs = listEl.querySelectorAll("div");
  const divsArray = [...childDivs];
  const listArray = divsArray.map((div) => div.textContent);

  console.log("NEW LIST");
  console.log(listArray);

  // Add list to allLists
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
};

// Functions
function createListObject(name, list) {
  allLists.push({ name: name, list: list });
  console.log("ALL LISTS");
  console.log(allLists);

  localStorage.setItem("All Lists", JSON.stringify(allLists));
  console.log("STORED LISTS");
  console.log(localStorage);
}
