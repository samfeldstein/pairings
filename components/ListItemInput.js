class ListItemInput extends HTMLButtonElement {
  constructor() {
    super();

    // Attach an event listener for the 'click' event
    this.addEventListener("keydown", this.handleKeydown);
  }

  // Method to handle the click event
  handleKeydown() {
    console.log("You added an item to the list!");

    // Example: Dynamically create a list and append it to the body
    const ul = document.createElement("ul");
    ul.innerHTML = `
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    `;
    document.body.appendChild(ul);
  }

  // Optional: Cleanup event listeners if needed
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
}

// Define the custom button element
customElements.define("create-list-btn", CreateListBtn, { extends: "button" });
