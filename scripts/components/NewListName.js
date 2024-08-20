class NewListName extends HTMLInputElement {
  constructor() {
    super();

    this.addEventListener("keydown", function (event) {
      const name = document.createElement("div");
      const newListContainer = document.getElementById("new-list-container");
      const newItemInput = document.getElementById("new-list-item");

      if (event.key === "Enter" && this.value.trim() !== "") {
        name.classList.add("list-title");
        name.textContent = this.value.trim();
        newListContainer.prepend(name);
        this.value = "";
        newListContainer.classList.toggle("hidden");
        this.classList.toggle("hidden");
        newItemInput.classList.toggle("hidden");
      }
    });
  }
}

// Define the custom button element
customElements.define("new-list-name", NewListName, { extends: "input" });
