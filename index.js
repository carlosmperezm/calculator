function add(...numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}

function rest(...numbers) {
  return numbers.reduce((total, current) => total - current);
}


function multiply(...numbers) {
  return numbers.reduce((total, current) => total * current, 1);
}

function divide(...numbers) {
  return numbers.reduce((total, current) => total / current);
}

function validateNumbers(...numbers) {
  for (let number of numbers)
    if (typeof number != "number") return false;
  return true;
}


const calculatorContainer = document.querySelector("#calculator-container");
const display = document.querySelector("#display");
const buttonsContainer = document.querySelector("#buttons-container");
const buttons = document.querySelectorAll(".button");

