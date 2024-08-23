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
    summary.textContent = list.name;
    detailsEl.appendChild(summary);

    const listEl = document.createElement("ul");
    listEl.id = list.name.toLowerCase();

    const listName = document.createElement("h3");
    listName.textContent = list.name;

    listEl.appendChild(listName);
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
