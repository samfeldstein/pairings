const saintsList = document.querySelector("#saints-list");
const chooseBtn = document.querySelector("#choose");
const numberOfStudentsInput = document.querySelector("#number-of-students");

let numberOfStudents = 0;

numberOfStudentsInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    numberOfStudents = numberOfStudentsInput.value;
    const list = getRandomElements(saints, numberOfStudents);
    for (let saint of list) {
      saintsList.innerHTML += `<li>${saint}</li>`;
    }
  }
});

const saints = [
  "Joan of Arc",
  "Thomas Aquinas",
  "Edith Stein",
  "Saint Nikolas",
  "Saint Francis of Assisi",
  "Saint Teresa of Avila",
  "Saint Augustine",
  "Saint Therese of Lisieux",
  "Saint John Paul II",
  "Saint Patrick",
  "Saint Catherine of Siena",
  "Saint Francis Xavier",
  "Saint Ignatius of Loyola",
  "Saint Bernadette",
  "Saint Joseph",
  "Saint Mary Magdalene",
  "Saint Peter",
  "Saint Paul",
  "Saint Matthew",
  "Saint Mark",
  "Saint Luke",
  "Saint John",
  "Saint James",
  "Saint Jude",
  "Saint Andrew",
  "Saint Bartholomew",
  "Saint Philip",
  "Saint Simon",
  "Saint Matthias",
  "Saint Stephen",
];

// FUNCTIONS
function getRandomElements(array, number) {
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
