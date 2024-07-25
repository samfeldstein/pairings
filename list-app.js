const output = document.querySelector("#output");
const chooseBtn = document.querySelector("#choose");

const students = ["Bart", "Marge", "Maggie"];
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
  "Saint Bernadette"
];

function shuffleArray(array) {
  for (let length = array.length - 1; length > 0; length--) {
    const randomIndex = Math.floor(Math.random() * (length + 1));
    [array[length], array[randomIndex]] = [array[randomIndex], array[length]];
  }
  return array;
}

chooseBtn.onclick = () => {
  shuffleArray(saints);
  console.log(saints);
};

// We want to generate the entire list at once, so we need to loop through the students array and call the function for each student
