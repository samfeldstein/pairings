// Create new list
const createListBtn = document.getElementById("create-list-btn");

createListBtn.onclick = function (event) {
  const newListForm = document.getElementById("new-list-form");
  newListForm.classList.toggle("hidden");
  const newListName = document.getElementById("new-list-name-input");
  this.classList.toggle("hidden");
  newListName.focus();
};

// Add new list name
const nameInput = document.getElementById("new-list-name-input");
const listNameEl = document.getElementById("new-list-name");

nameInput.addEventListener("keydown", function (event) {
  const newListContainer = document.getElementById("new-list-container");
  const itemInput = document.getElementById("new-list-item");

  if (event.key === "Enter" && nameInput.value.trim() !== "") {
    listNameEl.textContent = nameInput.value.trim();
    nameInput.value = "";
    newListContainer.classList.toggle("hidden");
    nameInput.classList.toggle("hidden");
    itemInput.classList.toggle("hidden");
    itemInput.focus();
  }
});

// Add new list item
const itemInput = document.getElementById("new-list-item");
const listEl = document.getElementById("new-list");
const listArray = [];

itemInput.onkeydown = function (event) {
  if (event.key === "Enter" && itemInput.value.trim() !== "") {
    const item = document.createElement("li");

    item.textContent = itemInput.value.trim();
    listEl.appendChild(item);
    listArray.push(item.textContent);
    console.log("LIST ARRAY");
    console.log(listArray);

    itemInput.value = "";
  }
};

// Save new list
const saveButton = document.getElementById("save-new-list");

saveButton.onclick = function (event) {
  event.preventDefault(); // Prevent page refresh

  // Save new list array to local storage
  // Seems to be saving before I click. Possibly need to prevent the form's default behavior?
  localStorage.setItem(`${listNameEl.textContent}`, JSON.stringify(listArray));

  // Move to lists section
  // Clear new list container
};

// Save to local storage
// Clear new list container
