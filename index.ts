function add(...numbers: number[]): number {
  return numbers.reduce((total, current) => total + current, 0);
}

function subtract(...numbers: number[]): number {
  return numbers.reduce((total, current) => total - current);
}

function multiply(...numbers: number[]): number {
  return numbers.reduce((total, current) => total * current, 1);
}

function divide(...numbers: number[]): number {
  return numbers.reduce((total, current) => total / current);
}

function operate(
  firstNumber: number,
  operator: string,
  secondNumber: number,
): number | string {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/": {
      if (secondNumber === 0) {
        return "LOL";
      }
      return divide(firstNumber, secondNumber);
    }
    default:
      throw new Error("Unknown operator");
  }
}

function updateDisplay(component: HTMLElement, value: string = ""): void {
  if (value.toString().length >= 10) {
    value = value.slice(0, 11);
  }
  component.textContent = value;
}

const calculatorContainer: HTMLElement = document.querySelector(
  "#calculator-container",
);
const display: HTMLElement = document.querySelector("#display");
const historyDisplay: HTMLElement = display.querySelector("#history");
const userInputDisplay: HTMLElement = display.querySelector("#user-input");
const buttonsContainer: HTMLElement =
  document.querySelector("#buttons-container");
const buttons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".button");

const NUMBER_OR_DOT_REGEX: RegExp = /\d|\./;
const OPERATOR_REGEX: RegExp = /\+|-|\*|\//;
const EQUAL_OPERATOR: string = "=";
const AC: string = "AC";
const BACKSPACE: string = "BACKSPACE";
const DOT: string = ".";
const ENTER: string = "ENTER";
const ESCAPE: string = "ESCAPE";

let operator: string = "";
let firstNumber: number = 0;
let secondNumber: number = 0;

document.body.addEventListener("keydown", (event): void => {
  if (
    event.key.toUpperCase() === DOT &&
    (firstNumber.toString().includes(DOT) ||
      secondNumber.toString().includes(DOT))
  )
    return;

  if (event.key.match(NUMBER_OR_DOT_REGEX) && !operator) {
    firstNumber
      ? (firstNumber += Number(event.key))
      : (firstNumber = Number(event.key));
    updateDisplay(userInputDisplay, String(firstNumber));
  } else if (event.key.match(OPERATOR_REGEX) && !secondNumber) {
    operator = event.key;
    updateDisplay(historyDisplay, firstNumber + operator);
    updateDisplay(userInputDisplay, "0");
  } else if (event.key.match(NUMBER_OR_DOT_REGEX) && operator) {
    secondNumber
      ? (secondNumber += Number(event.key))
      : (secondNumber = Number(event.key));
    updateDisplay(userInputDisplay, String(secondNumber));
  } else if (event.key.toUpperCase() == BACKSPACE) {
    if (firstNumber && !operator) {
      if (firstNumber.toString().length >= 10)
        firstNumber = Number(firstNumber.toString().slice(0, 10));
      firstNumber = Number(
        firstNumber.toString().slice(0, firstNumber.toString().length - 1),
      );
      updateDisplay(userInputDisplay, firstNumber.toString());
    } else if (operator && !secondNumber) {
      operator = "";
      updateDisplay(historyDisplay);
      updateDisplay(userInputDisplay, firstNumber.toString());
    } else if (operator && secondNumber) {
      if (secondNumber.toString().length >= 10)
        secondNumber = Number(secondNumber.toString().slice(0, 10));
      secondNumber = Number(
        secondNumber.toString().slice(0, secondNumber.toString().length - 1),
      );
      updateDisplay(userInputDisplay, secondNumber.toString());
    }
  } else if (event.key.toUpperCase() == ENTER && secondNumber) {
    updateDisplay(historyDisplay, firstNumber + operator + secondNumber);
    const result: string | number = operate(
      Number(firstNumber),
      operator,
      Number(secondNumber),
    );
    updateDisplay(userInputDisplay, result.toString());

    firstNumber = Number(result);
    operator = "";
    secondNumber = 0;
  } else if (event.key.toUpperCase() == ESCAPE) {
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    updateDisplay(userInputDisplay, "0");
    updateDisplay(historyDisplay);
  }

  console.log(event.key, typeof event.key);
});

buttonsContainer.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) {
    throw new Error("Event' Target is not and HTML element");
  }
  const targetedButton = event.target;
  const targetedButtonText = event.target.textContent;
  let result: number | string = 0;

  if (targetedButton.tagName != "BUTTON") return;

  if (
    targetedButtonText === DOT &&
    (firstNumber.toString().includes(DOT) ||
      secondNumber.toString().includes(DOT))
  )
    return;

  if (targetedButtonText.match(NUMBER_OR_DOT_REGEX) && !operator) {
    firstNumber
      ? (firstNumber += Number(targetedButtonText))
      : (firstNumber = Number(targetedButtonText));
    updateDisplay(userInputDisplay, firstNumber.toString());
  } else if (
    firstNumber &&
    targetedButtonText.match(OPERATOR_REGEX) &&
    !secondNumber
  ) {
    operator = targetedButtonText;
    updateDisplay(historyDisplay, firstNumber + operator);
    updateDisplay(userInputDisplay, "0");
  } else if (
    firstNumber &&
    targetedButtonText.match(OPERATOR_REGEX) &&
    secondNumber
  ) {
    firstNumber = Number(
      operate(Number(firstNumber), operator, Number(secondNumber)),
    );
    operator = targetedButtonText;
    secondNumber = 0;
    updateDisplay(historyDisplay, firstNumber + operator);
    updateDisplay(userInputDisplay, "0");
  } else if (operator && targetedButtonText.match(NUMBER_OR_DOT_REGEX)) {
    secondNumber
      ? (secondNumber += Number(targetedButtonText))
      : (secondNumber = Number(targetedButtonText));
    updateDisplay(userInputDisplay, secondNumber.toString());
  } else if (targetedButtonText.match(EQUAL_OPERATOR) && secondNumber) {
    updateDisplay(historyDisplay, firstNumber + operator + secondNumber);
    result = operate(
      Number(firstNumber),
      operator,
      Number(secondNumber),
    ).toString();
    updateDisplay(userInputDisplay, result);

    firstNumber = Number(result);
    operator = "";
    secondNumber = 0;
  } else if (targetedButtonText == AC) {
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    updateDisplay(userInputDisplay, "0");
    updateDisplay(historyDisplay);
  } else if (targetedButtonText == BACKSPACE) {
    if (firstNumber && !operator) {
      if (firstNumber.toString().length >= 10)
        firstNumber = Number(firstNumber.toString().slice(0, 10));
      firstNumber = Number(
        firstNumber.toString().slice(0, firstNumber.toString().length - 1),
      );
      updateDisplay(userInputDisplay, firstNumber.toString());
    } else if (operator && !secondNumber) {
      operator = "";
      updateDisplay(historyDisplay);
      updateDisplay(userInputDisplay, firstNumber.toString());
    } else if (operator && secondNumber) {
      if (secondNumber.toString().length >= 10)
        secondNumber = Number(secondNumber.toString().slice(0, 10));
      secondNumber = Number(
        secondNumber.toString().slice(0, secondNumber.toString().length - 1),
      );
      updateDisplay(userInputDisplay, secondNumber.toString());
    }
  }
});
