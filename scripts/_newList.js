import { getById, onEnter, hide, show } from "./_functions.js";

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
  hide(this);
  show(createListBtn);
});

onEnter(nameInput, function () {
  listNameEl.textContent = nameInput.value.trim();
  show(itemInput);
  itemInput.focus();
  show(newListContainer);
});

// Add new list item
const listArray = [];

onEnter(itemInput, function () {
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
});

// Save new list
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
  hide(form, itemInput, this);
  show(createListBtn);
};

// Edit names? In case you mess up?
