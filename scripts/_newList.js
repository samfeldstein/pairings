const nameInput = document.getElementById("new-list-listName");

nameInput.addEventListener("keydown", function (event) {
  const listName = document.createElement("div");
  const newListContainer = document.getElementById("new-list-container");
  const itemInput = document.getElementById("new-list-item");

  if (event.key === "Enter" && nameInput.value.trim() !== "") {
    listName.classList.add("list-title");
    listName.textContent = nameInput.value.trim();
    newListContainer.prepend(listName);
    nameInput.value = "";
    newListContainer.classList.toggle("hidden");
    nameInput.classList.toggle("hidden");
    itemInput.classList.toggle("hidden");
    itemInput.focus();
  }
});

// On enter, add a new item to the new list
const itemInput = document.getElementById("new-list-item");
const list = document.getElementById("new-list");
const newList = [];

itemInput.onkeydown = function (event) {
  if (event.key === "Enter" && itemInput.value.trim() !== "") {
    const item = document.createElement("li");

    item.textContent = itemInput.value.trim();
    list.appendChild(item);
    newList.push(item.textContent);
    itemInput.value = "";
  }
};

// Save button
const saveButton = document.getElementById("save-new-list");

saveButton.onclick = function (event) {
  event.preventDefault(); // Prevent page refresh
  localStorage.setItem("newList", JSON.stringify(newList));

  // Move to lists section
  // Clear new list container
};

// Save to local storage
// Clear new list container
