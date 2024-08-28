import { createElement, getById, onEnter } from "./_functions.js";

// Assign All Lists. Check local storage first
export const allLists = JSON.parse(localStorage.getItem("All Lists")) || [];

// All lists ul
const [listOfLists] = getById("list-of-lists");

// Render all lists on page load
renderAllLists();

// Also, this is doing way too much work. Need to refactor
// Also, createDocumentFragment might be useful here
export function renderAllLists() {
  // Prevent duplicates
  listOfLists.innerHTML = "";

  for (let list of allLists) {
    // Create some elements
    const [detailsEl, summary, newItemInput, deleteBtn] =
      createElement("details", "summary", "input", "button");

    // Add a placeholder to the new item input
    newItemInput.placeholder = "Add list item";

    // Add text to summary
    summary.textContent = list.name;

    // Define delete button 
    Object.assign(deleteBtn, {
      classList: ["delete-item"],
      type: "button",
      textContent: "Delete List",
    });

    // Create document fragment (this method is better for performance, I've heard)
    const fragment = document.createDocumentFragment();

    // Append the elements to the DocumentFragment
    fragment.appendChild(summary);
    fragment.appendChild(newItemInput);
    fragment.appendChild(deleteBtn);

    // Append the DocumentFragment to the parent element in the DOM
    detailsEl.appendChild(fragment);

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
    // Create fragment might be useful here
    listOfLists.appendChild(detailsEl);
  }
}
