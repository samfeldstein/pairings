import { getRandomElements } from "./functions.js";
import { renderArrayAsList } from "./functions.js";

// Lets can't be reassigned when imported
let saints = [
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

const saintsListEl = document.querySelector("#saints-list");
const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#reset");
const numberOfStudentsInput = document.querySelector("#number-of-students");
const newSaintInput = document.getElementById("new-saint");
const allSaintsList = document.getElementById("all-saints-list");
const pairingsHeading = document.getElementById("pairings");
const localSaints = JSON.parse(localStorage.getItem("saints"));
const removeSaintBtn = document.getElementById("remove-saint");
const saintToRemove = document.getElementById("saint-to-remove");
const addSaintBtn = document.getElementById("add-saint");
const allSaintsBtn = document.getElementById("all-saints-btn")
const allSaintsSection = document.getElementById("all-saints")

allSaintsBtn.addEventListener("click", event => {
allSaintsSection.classList.toggle("hidden")
})

// Generate random saints list
generateBtn.onclick = () => {
  if (!numberOfStudentsInput.value) {
    return;
  }

  const randomSaints = getRandomElements(saints, numberOfStudentsInput.value);

  pairingsHeading.classList.toggle("hidden");
  renderArrayAsList(randomSaints, saintsListEl);
  generateBtn.disabled = true;
  resetBtn.disabled = false;
  numberOfStudentsInput.value = "";
  numberOfStudentsInput.disabled = true;
};

numberOfStudentsInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateBtn.click();
  }
});

// Reset
resetBtn.addEventListener("click", (event) => {
  saintsListEl.innerHTML = "";
  pairingsHeading.classList.toggle("hidden");
  generateBtn.disabled = false;
  resetBtn.disabled = true;
  numberOfStudentsInput.disabled = false;
});

// Add saint
addSaintBtn.addEventListener("click", (event) => {
  if (!newSaintInput.value) {
    return;
  }

  saints.push(newSaintInput.value);
  saints.sort(); // Sort the saints array alphabetically
  localStorage.setItem("saints", JSON.stringify(saints));
  allSaintsList.innerHTML = "";
  renderArrayAsList(saints, allSaintsList); // Render the sorted saints array
  newSaintInput.value = "";
});

newSaintInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addSaintBtn.click();
  }
});

// Remove saint
removeSaintBtn.addEventListener("click", (event) => {
  if (!saintToRemove.value) {
    return;
  }
  removeSaint(saintToRemove.value);
});

saintToRemove.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    removeSaintBtn.click();
  }
});

function removeSaint(saint) {
  const index = saints.indexOf(saint);
  saints.splice(index, 1);
  localStorage.setItem("saints", JSON.stringify(saints));
  allSaintsList.innerHTML = "";
  renderArrayAsList(saints, allSaintsList); // Render the sorted saints array
  saintToRemove.value = "";
}

if (localSaints) {
  saints = localSaints;
}

renderArrayAsList(saints.sort(), allSaintsList);

// If the number entered is greater than the number of array elements, allow duplicates
