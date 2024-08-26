import { getById } from "./_functions.js";

// Check local storage first
export const allLists = JSON.parse(localStorage.getItem("All Lists")) || [];

// All lists section
const [allListsSection] = getById("all-lists-section");

// Render all lists on page load
renderAllLists();

// Exported for use in _newList
export function renderAllLists() {
  // Render all lists
  for (let list of allLists) {
    const detailsEl = document.createElement("details");
    const summary = document.createElement("summary");
    const deleteBtn = document.createElement("button");

    Object.assign(deleteBtn, {
      classList: ["delete-item"],
      type: "button",
      textContent: "Delete",
    });

    summary.textContent = list.name;
    summary.appendChild(deleteBtn);
    detailsEl.appendChild(summary);

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
    listEl.id = list.name.toLowerCase(); // Account for mutli-word names

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
