import { saints } from "./lists.js";
import { getRandomElements } from "./functions.js";
import { renderArrayAsList } from "./functions.js";

const saintsListEl = document.querySelector("#saints-list");
const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#reset");
const numberOfStudentsInput = document.querySelector("#number-of-students");

generateBtn.onclick = () => {
  const randomSaints = getRandomElements(saints, numberOfStudentsInput.value);

  renderArrayAsList(randomSaints, saintsListEl);
};

numberOfStudentsInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateBtn.click();
  }
});

resetBtn.addEventListener("click", (event) => {
  saintsListEl.innerHTML = "";
});
