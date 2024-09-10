// Get element by id
export function getById(...ids) {
  return ids.map((id) => document.getElementById(id));
}

// On enter, do something
export function onEnter(element, callback) {
  element.addEventListener("keydown", function (event) {
    // Prevent early form submission
    if (event.key === "Enter") {
      event.preventDefault();

      if (element.value.trim() !== "") {
        // Trim the value (must reassign it)
        element.value = element.value.trim();

        callback(event);
      }
    }
  });
}

// Hide element
export function hide(...elements) {
  for (let element of elements) {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }
}

// Show element
export function show(...elements) {
  for (let element of elements) {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    }
  }
}

// Get a specified number of random elements from an array
export function getRandomElements(array, number) {
  // If number is higher than array, enters an infinite loop. This solution isn't ideal, but at least the app doesn't break.
  if (number > array.length) {
    number = array.length;
  }

  const randomElements = [];

  while (randomElements.length < number) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];

    if (!randomElements.includes(randomElement)) {
      randomElements.push(randomElement);
    }
  }

  return randomElements;
}

export function renderArrayAsUl(array) {
  const ul = document.createElement("ul");
  for (let item of array) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}

// Shuffle array
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Sort an array of objects
export function sortObjects(object, prop) {
  object.sort(function (a, b) {
    // Bracket notation needed here because otherwise it looks for a property called "prop"
    // b[prop] must be a string
    return a[prop].localeCompare(b[prop]);
  });
}

// Append mutliple children to an element
export function appendChildren(parent, children) {
  for (let child of children) {
    parent.appendChild(child);
  }
}

// Delete an item from an array
export function removeFromArray(array, item) {
  const index = array.indexOf(item);
  array.splice(index, 1);
}

// Create createElement
export function createElement(tag, props) {
  const element = document.createElement(tag);

  // "props" is an object
  Object.assign(element, props);

  return element;
}

export function createElements(...tags) {
  return tags.map((tag) => document.createElement(tag));
}
