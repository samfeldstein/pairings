class CreateListBtn extends HTMLButtonElement {
  constructor() {
    super();

    // Attach an event listener for the 'click' event
    this.addEventListener("click", this.handleClick);
  }

  // Method to handle the click event
  handleClick() {
    console.log("Button clicked! Creating a list...");

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
