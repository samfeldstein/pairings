import {
  createElements,
  getById,
  onEnter,
  sortObjects,
  appendChildren,
  removeFromArray,
  createElement,
} from "./_functions.js";
import { renderOptions } from "./_generator.js";

const exampleLists = [
  {
    name: "Students",
    list: ["Alyssa Rivera", "Jake Thompson", "Zachary Patel"],
  },
  {
    name: "Saints",
    list: [
      "Saint Francis of Assisi",
      "Saint Teresa of Ávila",
      "Saint Thomas Aquinas",
    ],
  },
];

// Grab allLists from local storage
export const allLists =
  JSON.parse(localStorage.getItem("All Lists")) || exampleLists;
// Grab some elements
const [listOfLists] = getById(
  "list-of-lists",
  "rendered-lists",
  "first-select",
  "second-select"
);

// Render all lists on page load
renderAllLists();

// Render all lists
export function renderAllLists() {
  // Clear the whole thing first to prevent duplicates (definitely not the most efficient way to do this)
  listOfLists.innerHTML = "";

  // Sort allLists by name
  // This is inside this function because renderAllLists is called elsewhere, and we want to make sure it's sorted every time
  sortObjects(allLists, "name");

  // Loop through every object in allLists and turn each one into a details element
  for (let list of allLists) {
    // Create some elements
    const [detailsEl, summary, newItemInput, listEl] = createElements(
      "details",
      "summary",
      "input",
      "ul"
    );

    // Create button to delete lists
    const deleteListButton = createElement("button", {
      type: "button",
      classList: ["delete list"],
      textContent: "Delete List",
    });

    // Delete list button logic
    deleteListButton.onclick = function () {
      removeFromArray(allLists, list);
      localStorage.setItem("All Lists", JSON.stringify(allLists));
      renderAllLists();
    };

    summary.textContent = list.name;

    // Add a placeholder to the new item input
    newItemInput.placeholder = "Add list item";

    // Render loop through the list array in each object
    for (let item of list.list.sort()) {
      const [itemEl, itemText] = createElements("li", "div");

      const deleteItemBtn = createElement("button", {
        type: "button",
        classList: ["delete item"],
        textContent: "Delete Item",
      });

      // Delete list item button logic
      deleteItemBtn.onclick = function () {
        itemEl.remove();
        removeFromArray(list.list, item);
        localStorage.setItem("All Lists", JSON.stringify(allLists));
        renderOptions();
      };

      // Build li element
      itemText.textContent = item;
      itemEl.appendChild(deleteItemBtn);
      itemEl.appendChild(itemText);
      // Add li to ul element
      listEl.appendChild(itemEl);
    }

    appendChildren(detailsEl, [
      summary,
      newItemInput,
      listEl,
      deleteListButton,
    ]);
    listOfLists.appendChild(detailsEl);

    // Add new items to the list
    onEnter(newItemInput, function () {
      // Update list array
      // (List is the key in the list object(stored in allLists), and also the parameter in this loop. A bit confusing.)
      list.list.push(newItemInput.value);

      // Creat li element
      const itemEl = document.createElement("li");
      itemEl.textContent = newItemInput.value;
      // Add the li to the ul
      listEl.appendChild(itemEl);
      // Clear the input
      newItemInput.value = "";
      // Update allLists in local storage
      localStorage.setItem("All Lists", JSON.stringify(allLists));
    });
  }

  renderOptions();
}
