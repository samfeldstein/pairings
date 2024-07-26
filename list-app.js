import { saints } from "./lists.js";
import { getRandomElements } from "./functions.js";

const saintsList = document.querySelector("#saints-list");
const chooseBtn = document.querySelector("#choose");
const numberOfStudentsInput = document.querySelector("#number-of-students");

let numberOfStudents = 0;

chooseBtn.onclick = () => {
  numberOfStudents = numberOfStudentsInput.value;
  const list = getRandomElements(saints, numberOfStudents);
  for (let saint of list) {
    saintsList.innerHTML += `<li>${saint}</li>`;
  }
};
