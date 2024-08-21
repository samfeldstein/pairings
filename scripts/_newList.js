// Create new list
const createListBtn = document.getElementById("create-list-btn");
const form = document.getElementById("new-list-form");

createListBtn.onclick = function (event) {
  form.classList.toggle("hidden");
  const newListName = document.getElementById("new-list-name-input");
  this.classList.toggle("hidden");
  newListName.focus();
};

// Add new list name
const nameInput = document.getElementById("new-list-name-input");
const listNameEl = document.getElementById("new-list-name");
const newListContainer = document.getElementById("new-list-container");

nameInput.onkeydown = function (event) {
  const itemInput = document.getElementById("new-list-item");

  if (event.key === "Enter" && nameInput.value.trim() !== "") {
    // If this isn't here, the code in the save button runs on "Enter."
    event.preventDefault();
    listNameEl.textContent = nameInput.value.trim();
    nameInput.value = "";
    newListContainer.classList.toggle("hidden");
    nameInput.classList.toggle("hidden");
    itemInput.classList.toggle("hidden");
    itemInput.focus();
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
  }
};

// Save new list
const saveButton = document.getElementById("save-new-list");

saveButton.onclick = function (event) {
  event.preventDefault(); // Prevent page refresh

  // Save new list array to local storage
  // Seems to be saving before I click. Possibly need to prevent the form's default behavior?
  // *Update: I tried prevent form's default submit behavior, and no dice. I also tried prevent the input's submit behavior.
  localStorage.setItem(`${listNameEl.textContent}`, JSON.stringify(listArray));
  console.log("Is this thing on?");

  // Move to lists section
  // Clear new list container
};

// Save to local storage
// Clear new list container
