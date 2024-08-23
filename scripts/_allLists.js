import { getById, renderArrayAsList } from "./_functions.js";

const [allListsEl] = getById("all-lists");
console.log(allListsEl);

export const allLists = JSON.parse(localStorage.getItem("All Lists")) || [];

function renderAllLists(array, listEl) {
  for (let list of array) {
    console.log(list);
    const listItem = document.createElement("li");
    const listTitle = document.createElement("h3");
    listTitle.textContent = list.name;
    listItem.appendChild(listTitle);
    listEl.appendChild(listItem);
  }
}

renderAllLists(allLists, allListsEl);
