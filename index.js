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

function updateDisplay(component, value) {
  component.textContent = value;
  console.log(value);
}

const calculatorContainer = document.querySelector("#calculator-container");
const display = document.querySelector("#display");
const history = display.querySelector("#history");
const userInputDisplay = display.querySelector("#user-input");
const buttonsContainer = document.querySelector("#buttons-container");
const buttons = document.querySelectorAll(".button");

const NUMBER_OR_DOT_REGEX = /\d|./g;

let operator = "";
let firstNumber = 0;
let secondNumber = 0;

buttonsContainer.addEventListener("click", evnt => {
  const targetedButton = evnt.target;
  const targetedButtonText = evnt.target.textContent;
  console.log(targetedButton);


  if (targetedButtonText.match(NUMBER_OR_DOT_REGEX))
    firstNumber += targetedButtonText;
  updateDisplay(userInputDisplay, firstNumber);
})
