import { getById, onEnter } from "./_functions.js";

// Assign All Lists. Check local storage first
export const allLists = JSON.parse(localStorage.getItem("All Lists")) || [];

// All lists section
const [allListsSection] = getById("all-lists-section");

// Render all lists on page load
renderAllLists();

// Exported for use in _newList
// Also, this is doing way too much work. Need to refactor 
// Also, createDocumentFragment might be useful here 
export function renderAllLists() {
  for (let list of allLists) {
    const detailsEl = document.createElement("details");
    const summary = document.createElement("summary");
    const editBtn = document.createElement("button");

    Object.assign(editBtn, {
      classList: ["edit-btn"],
      type: "button",
      textContent: "Edit",
    });

    const newItemInput = document.createElement("input");
    newItemInput.placeholder = "Add list item";
    const deleteBtn = document.createElement("button");

    Object.assign(deleteBtn, {
      classList: ["delete-item"],
      type: "button",
      textContent: "Delete List",
    });

    summary.textContent = list.name;
    summary.appendChild(editBtn);
    detailsEl.appendChild(summary);
    detailsEl.appendChild(newItemInput);

    editBtn.onclick = function () {
      detailsEl.setAttribute("open", "");
      detailsEl.appendChild(deleteBtn);
    };

    onEnter(newItemInput, function () {
      // Create list element
      const itemEl = document.createElement("li");
      // Give it some content
      itemEl.textContent = newItemInput.value.trim();

      // Add the list item to the list
      listEl.appendChild(itemEl);

      newItemInput.value = "";
    });

    deleteBtn.onclick = function () {
      detailsEl.remove();
      // Remove from local storage
      const index = allLists.findIndex((item) => item.name === list.name);
      if (index !== -1) {
        allLists.splice(index, 1);
        localStorage.setItem("All Lists", JSON.stringify(allLists));
      }
      console.log(localStorage);
    };

    const listEl = document.createElement("ul");
    listEl.id = list.name.toLowerCase(); // Need to account for mutli-word names

    detailsEl.appendChild(listEl);

    // Render stored arrays as lists
    for (let item of list.list) {
      const listItem = document.createElement("li");

      listItem.textContent = item;
      listEl.appendChild(listItem);
    }

    allListsSection.appendChild(detailsEl);
  }
}
