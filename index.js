function add(...numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}

function substract(...numbers) {
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

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+": return add(firstNumber, secondNumber);
    case "-": return substract(firstNumber, secondNumber);
    case "*": return multiply(firstNumber, secondNumber);
    case "/": return divide(firstNumber, secondNumber);
    default: throw new Error("Uknow operator");
  }
}


const calculatorContainer = document.querySelector("#calculator-container");
const display = document.querySelector("#display");
const buttonsContainer = document.querySelector("#buttons-container");
const buttons = document.querySelectorAll(".button");

let operator = "";
let firstNumber = 0;
let secondNumber = 0;

buttonsContainer.addEventListener("click", evnt => {
  const targetedButton = event.target;
})
