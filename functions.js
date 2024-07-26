export function getRandomElements(array, number) {
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