// Get element by id
export function getById(...ids) {
  return ids.map((id) => document.getElementById(id));
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

// Render array as list
export function renderArrayAsList(array, list) {
  for (let element of array) {
    list.innerHTML += `<li>${element}</li>`;
  }
}
