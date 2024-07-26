import { saints } from "./lists.js";
import { getRandomElements } from "./functions.js";
import { renderArrayAsList } from "./functions.js";

const saintsListEl = document.querySelector("#saints-list");
const chooseBtn = document.querySelector("#choose-button");
const numberOfStudentsInput = document.querySelector("#number-of-students");

chooseBtn.onclick = () => {
  const randomSaints = getRandomElements(saints, numberOfStudentsInput.value);

  renderArrayAsList(randomSaints, saintsListEl);
};

numberOfStudentsInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    chooseBtn.click();
  }
});
