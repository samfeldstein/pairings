import { getById, hide, show } from "./_functions.js";

const [
  createListBtn,
  form,
  formListContainer,
  nameInput,
  listNameEl,
  newListContainer,
] = getById(
  "create-list-btn",
  "new-list-form",
  "form-list-container",
  "new-list-name-input",
  "new-list-name",
  "new-list-container"
);

// Create new list
createListBtn.onclick = function (event) {
  hide(this);
  show(form);
  show(nameInput);
  nameInput.focus();
};

// Add new list name
nameInput.onkeydown = function (event) {
  const itemInput = document.getElementById("new-list-item");

  if (event.key === "Enter" && nameInput.value.trim() !== "") {
    // If we don't prevent default, the code in the save button (submit action) runs on "Enter."
    event.preventDefault();
    listNameEl.textContent = nameInput.value.trim();

    show(itemInput);
    itemInput.focus();

    show(newListContainer);
  }
};

// Add new list item
const itemInput = document.getElementById("new-list-item");
const listEl = document.getElementById("new-list");
const listArray = [];

itemInput.onkeydown = function (event) {
  if (event.key === "Enter" && itemInput.value.trim() !== "") {
    // If this isn't here, the code in the save button runs on "Enter."
    event.preventDefault();
    const item = document.createElement("li");

    item.textContent = itemInput.value.trim();
    listEl.appendChild(item);
    listArray.push(item.textContent);
    console.log("LIST ARRAY");
    console.log(listArray);

    itemInput.value = "";

    if (saveButton.classList.contains("hidden")) {
      saveButton.classList.toggle("hidden");
    }
  }
};

// Save new list
const saveButton = document.getElementById("save-new-list");

saveButton.onclick = function (event) {
  event.preventDefault(); // Prevent page refresh
  localStorage.setItem(`${listNameEl.textContent}`, JSON.stringify(listArray));
  console.log("STORED LISTS");
  console.log(localStorage);

  const children = newListContainer.querySelectorAll("*");
  for (const child of children) {
    child.textContent = "";
  }

  form.reset();
  hide(form, itemInput, saveButton);
  // hide(saveButton)
  show(createListBtn);

  formListContainer.classList.toggle("hidden");
  itemInput.classList.toggle("hidden");

  // Show create list button

  // Move to lists section - I don't think this can be done from here? Or maybe it can. But probably not. I think the lists section logic needs to handle it. We can render all lists from local storage there.
  // Clear new list container
};

// Save to local storage
// Clear new list container

// Edit names? In case you mess up?
