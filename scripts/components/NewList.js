class NewList extends HTMLUlElement {
  constructor() {
    super();

    this.addEventListener("click", this.handleClick);
  }

  handleClick() {}
}

// Define the custom button element
customElements.define("new-list", NewList, { extends: "ul" });
