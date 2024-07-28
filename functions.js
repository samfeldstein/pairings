// Get a specified number of random elements from an array
export function getRandomElements(array, number) {
  // If number is higher than array, enters an infinite loop. This solution isn't ideal, but at least the app doesn't break. Will work on it.
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
