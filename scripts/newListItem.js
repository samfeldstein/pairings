// On enter, add a new item to the new list
const input = document.getElementById("new-list-item");
const list = document.getElementById("new-list");

input.onkeydown = function (event) {
  const item = document.createElement("li");
  if (event.key === "Enter" && input.value.trim() !== "") {
    item.textContent = input.value.trim();
    list.appendChild(item);
  }
};
