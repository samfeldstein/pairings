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
  }

  // Optional: Clean up event listeners if needed
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
}

// Define the custom button element
customElements.define("create-list-btn", CreateListBtn, { extends: "button" });
