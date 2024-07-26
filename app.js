import { saints } from "./lists.js";
import { getRandomElements } from "./functions.js";
import { renderArrayAsList } from "./functions.js";

const saintsListEl = document.querySelector("#saints-list");
const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#reset");
const numberOfStudentsInput = document.querySelector("#number-of-students");
const newSaintInput = document.getElementById("new-saint");
const allSaintsList = document.getElementById("all-saints");
const pairingsHeading = document.getElementById("pairings");

// Generate Pairings
generateBtn.onclick = () => {
  const randomSaints = getRandomElements(saints, numberOfStudentsInput.value);

  pairingsHeading.classList.toggle("hidden");
  renderArrayAsList(randomSaints, saintsListEl);
  generateBtn.disabled = true;
  resetBtn.disabled = false;
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
});

// Add saint
newSaintInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saints.push(newSaintInput.value);
    allSaintsList.innerHTML = "";
    renderArrayAsList(saints.sort(), allSaintsList);
    newSaintInput.value = "";
  }
});

renderArrayAsList(saints.sort(), allSaintsList);

// If a list has already been generated, clear that list before rendering the new one

// If the number entered is greater than the number of array elements, allow duplicates
