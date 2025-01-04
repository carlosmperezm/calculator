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
}

const calculatorContainer = document.querySelector("#calculator-container");
const display = document.querySelector("#display");
const historyDisplay = display.querySelector("#history");
const userInputDisplay = display.querySelector("#user-input");
const buttonsContainer = document.querySelector("#buttons-container");
const buttons = document.querySelectorAll(".button");

const DECIMAL_NUMBER_REGEX = /\d|\./;
const OPERATOR_REGEX = /\+|-|\*|\//;
const EQUAL_OPERATOR_REGEX = /=/;

let operator = "";
let firstNumber = 0;
let secondNumber = 0;

buttonsContainer.addEventListener("click", evnt => {
  const targetedButton = evnt.target;
  const targetedButtonText = evnt.target.textContent;
  let result = 0;

  if (targetedButton.tagName != "BUTTON") return;


  if (targetedButtonText.match(DECIMAL_NUMBER_REGEX) && !operator) {
    firstNumber ? firstNumber += targetedButtonText : firstNumber = targetedButtonText;
    updateDisplay(userInputDisplay, firstNumber);
  }
  else if (firstNumber && targetedButtonText.match(OPERATOR_REGEX)) {
    operator = targetedButtonText;
    updateDisplay(historyDisplay, firstNumber + operator)
  }
  else if (operator && targetedButtonText.match(DECIMAL_NUMBER_REGEX)) {
    secondNumber ? secondNumber += targetedButtonText : secondNumber = targetedButtonText;
    updateDisplay(userInputDisplay, secondNumber);
  }
  else if (targetedButtonText.match(EQUAL_OPERATOR_REGEX) && secondNumber) {
    updateDisplay(historyDisplay, firstNumber + operator + secondNumber);
    result = operate(Number(firstNumber), operator, Number(secondNumber));
    updateDisplay(userInputDisplay, result);

    firstNumber = result;
    operator = "";
    secondNumber = 0;
  }
  else {
    console.log("not a number")
  }
})
