function add() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (total, current) { return total + current; }, 0);
}
function subtract() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (total, current) { return total - current; });
}
function multiply() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (total, current) { return total * current; }, 1);
}
function divide() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (total, current) { return total / current; });
}
function operate(firstNumber, operator, secondNumber) {
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
function updateDisplay(component, value) {
    if (value === void 0) { value = ""; }
    if (value.toString().length >= 10) {
        value = value.slice(0, 11);
    }
    component.textContent = value;
}
var calculatorContainer = document.querySelector("#calculator-container");
var display = document.querySelector("#display");
var historyDisplay = display.querySelector("#history");
var userInputDisplay = display.querySelector("#user-input");
var buttonsContainer = document.querySelector("#buttons-container");
var buttons = document.querySelectorAll(".button");
var NUMBER_OR_DOT_REGEX = /\d|\./;
var OPERATOR_REGEX = /\+|-|\*|\//;
var EQUAL_OPERATOR = "=";
var AC = "AC";
var BACKSPACE = "BACKSPACE";
var DOT = ".";
var ENTER = "ENTER";
var ESCAPE = "ESCAPE";
var operator = "";
var firstNumber = 0;
var secondNumber = 0;
document.body.addEventListener("keydown", function (event) {
    if (event.key.toUpperCase() === DOT &&
        (firstNumber.toString().includes(DOT) ||
            secondNumber.toString().includes(DOT)))
        return;
    if (event.key.match(NUMBER_OR_DOT_REGEX) && !operator) {
        firstNumber
            ? (firstNumber += Number(event.key))
            : (firstNumber = Number(event.key));
        updateDisplay(userInputDisplay, String(firstNumber));
    }
    else if (event.key.match(OPERATOR_REGEX) && !secondNumber) {
        operator = event.key;
        updateDisplay(historyDisplay, firstNumber + operator);
        updateDisplay(userInputDisplay, "0");
    }
    else if (event.key.match(NUMBER_OR_DOT_REGEX) && operator) {
        secondNumber
            ? (secondNumber += Number(event.key))
            : (secondNumber = Number(event.key));
        updateDisplay(userInputDisplay, String(secondNumber));
    }
    else if (event.key.toUpperCase() == BACKSPACE) {
        if (firstNumber && !operator) {
            if (firstNumber.toString().length >= 10)
                firstNumber = Number(firstNumber.toString().slice(0, 10));
            firstNumber = Number(firstNumber.toString().slice(0, firstNumber.toString().length - 1));
            updateDisplay(userInputDisplay, firstNumber.toString());
        }
        else if (operator && !secondNumber) {
            operator = "";
            updateDisplay(historyDisplay);
            updateDisplay(userInputDisplay, firstNumber.toString());
        }
        else if (operator && secondNumber) {
            if (secondNumber.toString().length >= 10)
                secondNumber = Number(secondNumber.toString().slice(0, 10));
            secondNumber = Number(secondNumber.toString().slice(0, secondNumber.toString().length - 1));
            updateDisplay(userInputDisplay, secondNumber.toString());
        }
    }
    else if (event.key.toUpperCase() == ENTER && secondNumber) {
        updateDisplay(historyDisplay, firstNumber + operator + secondNumber);
        var result = operate(Number(firstNumber), operator, Number(secondNumber));
        updateDisplay(userInputDisplay, result.toString());
        firstNumber = Number(result);
        operator = "";
        secondNumber = 0;
    }
    else if (event.key.toUpperCase() == ESCAPE) {
        firstNumber = 0;
        operator = "";
        secondNumber = 0;
        updateDisplay(userInputDisplay, "0");
        updateDisplay(historyDisplay);
    }
    console.log(event.key, typeof event.key);
});
buttonsContainer.addEventListener("click", function (event) {
    if (!(event.target instanceof HTMLElement)) {
        throw new Error("Event' Target is not and HTML element");
    }
    var targetedButton = event.target;
    var targetedButtonText = event.target.textContent;
    var result = 0;
    if (targetedButton.tagName != "BUTTON")
        return;
    if (targetedButtonText === DOT &&
        (firstNumber.toString().includes(DOT) ||
            secondNumber.toString().includes(DOT)))
        return;
    if (targetedButtonText.match(NUMBER_OR_DOT_REGEX) && !operator) {
        firstNumber
            ? (firstNumber += Number(targetedButtonText))
            : (firstNumber = Number(targetedButtonText));
        updateDisplay(userInputDisplay, firstNumber.toString());
    }
    else if (firstNumber &&
        targetedButtonText.match(OPERATOR_REGEX) &&
        !secondNumber) {
        operator = targetedButtonText;
        updateDisplay(historyDisplay, firstNumber + operator);
        updateDisplay(userInputDisplay, "0");
    }
    else if (firstNumber &&
        targetedButtonText.match(OPERATOR_REGEX) &&
        secondNumber) {
        firstNumber = Number(operate(Number(firstNumber), operator, Number(secondNumber)));
        operator = targetedButtonText;
        secondNumber = 0;
        updateDisplay(historyDisplay, firstNumber + operator);
        updateDisplay(userInputDisplay, "0");
    }
    else if (operator && targetedButtonText.match(NUMBER_OR_DOT_REGEX)) {
        secondNumber
            ? (secondNumber += Number(targetedButtonText))
            : (secondNumber = Number(targetedButtonText));
        updateDisplay(userInputDisplay, secondNumber.toString());
    }
    else if (targetedButtonText.match(EQUAL_OPERATOR) && secondNumber) {
        updateDisplay(historyDisplay, firstNumber + operator + secondNumber);
        result = operate(Number(firstNumber), operator, Number(secondNumber)).toString();
        updateDisplay(userInputDisplay, result);
        firstNumber = Number(result);
        operator = "";
        secondNumber = 0;
    }
    else if (targetedButtonText == AC) {
        firstNumber = 0;
        operator = "";
        secondNumber = 0;
        updateDisplay(userInputDisplay, "0");
        updateDisplay(historyDisplay);
    }
    else if (targetedButtonText == BACKSPACE) {
        if (firstNumber && !operator) {
            if (firstNumber.toString().length >= 10)
                firstNumber = Number(firstNumber.toString().slice(0, 10));
            firstNumber = Number(firstNumber.toString().slice(0, firstNumber.toString().length - 1));
            updateDisplay(userInputDisplay, firstNumber.toString());
        }
        else if (operator && !secondNumber) {
            operator = "";
            updateDisplay(historyDisplay);
            updateDisplay(userInputDisplay, firstNumber.toString());
        }
        else if (operator && secondNumber) {
            if (secondNumber.toString().length >= 10)
                secondNumber = Number(secondNumber.toString().slice(0, 10));
            secondNumber = Number(secondNumber.toString().slice(0, secondNumber.toString().length - 1));
            updateDisplay(userInputDisplay, secondNumber.toString());
        }
    }
});
