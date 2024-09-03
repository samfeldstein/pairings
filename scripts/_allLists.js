import { createElement, getById, onEnter, sortObjects } from "./_functions.js";

// Grab allLists from local storage
export const allLists = JSON.parse(localStorage.getItem("All Lists")) || [];
// Grab the All Lists ul
const [listOfLists] = getById("list-of-lists");

// Sort allLists by name
sortObjects(allLists, "name");

// Render all lists on page load
renderAllLists();

// Render all lists
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

    // Render list items from the list prop of the object
    for (let item of list.list) {
      const [itemEl, itemText, deleteBtn] = createElement(
        "li",
        "div",
        "button"
      );

      // Define elsewhere?
      // Delete button properties
      Object.assign(deleteBtn, {
        classList: ["delete-item"],
        type: "button",
        textContent: "Delete Item",
      });

      // Delete button logic
      // This can be defined elsewhere?
      deleteBtn.onclick = function () {
        itemEl.remove();
        const index = list.list.indexOf(item);
        list.list.splice(index, 1);
        console.log(list.list);
        localStorage.setItem("All Lists", JSON.stringify(allLists));
      };

      itemText.textContent = item;

      itemEl.appendChild(itemText);
      itemEl.appendChild(deleteBtn);
      // Add li to ul
      listEl.appendChild(itemEl);
    }

    // Build details element

    const [container] = createElement("div");

    container.classList.add("flex", "space-between");
    container.appendChild(newItemInput);
    container.appendChild(deleteListBtn);

    detailsEl.appendChild(summary);
    detailsEl.appendChild(container);
    detailsEl.appendChild(listEl);

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
