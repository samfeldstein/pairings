class CreateListBtn extends HTMLButtonElement {
  constructor() {
    super();

    // Attach an event listener for the 'click' event
    this.addEventListener("click", this.handleClick);
  }

  handleClick() {
    const newListName = document.getElementById("new-list-name");
    this.classList.toggle("hidden");
    newListName.classList.toggle("hidden");
    newListName.focus();
    // Also create a NewList component
  }
}

// Define the custom button element
customElements.define("create-list-btn", CreateListBtn, { extends: "button" });
