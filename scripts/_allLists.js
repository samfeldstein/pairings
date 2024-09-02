import { createElement, getById, onEnter } from "./_functions.js";

// Assign All Lists. Check local storage first
export const allLists = JSON.parse(localStorage.getItem("All Lists")) || [];

allLists.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

console.log(allLists);

// All lists ul
const [listOfLists] = getById("list-of-lists");

// Render all lists on page load
renderAllLists();

export function renderAllLists() {
  // Prevent duplicates (definitely not the most efficient way to do this)
  listOfLists.innerHTML = "";

  // Loop through every object in allLists
  for (let list of allLists) {
    // Create some elements
    const [detailsEl, summary, newItemInput, deleteListBtn, listEl] =
      createElement("details", "summary", "input", "button", "ul");

    // Add text to summary
    summary.textContent = list.name;

    // Give each list an id
    listEl.id = list.name.toLowerCase(); // Need to account for multi-word names

    // Add a placeholder to the new item input
    newItemInput.placeholder = "Add list item";

    // Render list items from the list array of the list object
    for (let item of list.list) {
      // Create li
      const listItem = document.createElement("li");
      // li text = list array element
      listItem.textContent = item;
      // Add li to ul
      listEl.appendChild(listItem);
    }

    // Build details
    // Create document fragment (this method is better for performance, I've heard)
    const fragment = document.createDocumentFragment();
    // Append the elements to the DocumentFragment
    // Refactor this the same way you did getById
    fragment.appendChild(summary);
    fragment.appendChild(newItemInput);
    fragment.appendChild(deleteListBtn);
    fragment.appendChild(listEl);
    // Append fragment to details
    detailsEl.appendChild(fragment);

    // Add new items to the list
    onEnter(newItemInput, function () {
      // Update list array
      // (List is the key in the list object(stored in allLists), and also the parameter in this loop. A bit confusing.)
      list.list.push(newItemInput.value);

      // Create li
      const itemEl = document.createElement("li");
      // Give it some content
      itemEl.textContent = newItemInput.value;
      // Add the list item to the list
      listEl.appendChild(itemEl);
      // Clear the input
      newItemInput.value = "";
      // Update allLists in local storage
      localStorage.setItem("All Lists", JSON.stringify(allLists));
    });

    // Delete button
    Object.assign(deleteListBtn, {
      classList: ["delete-item"],
      type: "button",
      textContent: "Delete List",
    });
    deleteListBtn.onclick = function () {
      detailsEl.remove();
      // Remove from local storage
      const index = allLists.findIndex((item) => item.name === list.name);
      if (index !== -1) {
        allLists.splice(index, 1);
        localStorage.setItem("All Lists", JSON.stringify(allLists));
      }
      console.log(localStorage);
    };

    // Create fragment might be useful here
    listOfLists.appendChild(detailsEl);
  }
}
