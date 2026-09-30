const display = document.querySelector("#display");

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? null : a / b; }

function operate(op, a, b) {
  switch (op) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return b;
  }
}

function formatNumber(number) {
  if (!Number.isFinite(number)) return "Error";
  const rounded = Math.round((number + Number.EPSILON) * 1e12) / 1e12;
  return String(rounded);
}

function inputNumber(number) {
  if (display.textContent === "Error" || waitingForSecondOperand) {
    display.textContent = number;
    waitingForSecondOperand = false;
    return;
  }
  display.textContent =
    display.textContent === "0" ? number : display.textContent + number;
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    display.textContent = "0.";
    waitingForSecondOperand = false;
    return;
  }
  if (!display.textContent.includes(".")) display.textContent += ".";
}

function chooseOperator(nextOperator) {
  const inputValue = Number(display.textContent);
  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(operator, firstOperand, inputValue);
    if (result === null) {
      display.textContent = "Error";
      firstOperand = null;
      operator = null;
      return;
    }
    display.textContent = formatNumber(result);
    firstOperand = result;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
}

function calculate() {
  if (operator === null || firstOperand === null || waitingForSecondOperand) return;

  const secondOperand = Number(display.textContent);
  const result = operate(operator, firstOperand, secondOperand);

  if (result === null) {
    display.textContent = "Error";
  } else {
    display.textContent = formatNumber(result);
  }

  firstOperand = null;
  operator = null;
  waitingForSecondOperand = true;
}

function clearCalculator() {
  display.textContent = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

function backspace() {
  if (waitingForSecondOperand || display.textContent === "Error") return;
  display.textContent = display.textContent.length > 1
    ? display.textContent.slice(0, -1)
    : "0";
}

document.querySelectorAll("[data-number]").forEach(button => {
  button.addEventListener("click", () => inputNumber(button.dataset.number));
});

document.querySelectorAll("[data-operator]").forEach(button => {
  button.addEventListener("click", () => chooseOperator(button.dataset.operator));
});

document.querySelector('[data-action="decimal"]').addEventListener("click", inputDecimal);
document.querySelector('[data-action="equals"]').addEventListener("click", calculate);
document.querySelector('[data-action="clear"]').addEventListener("click", clearCalculator);
document.querySelector('[data-action="backspace"]').addEventListener("click", backspace);

document.addEventListener("keydown", event => {
  if (/^[0-9]$/.test(event.key)) inputNumber(event.key);
  else if (["+", "-", "*", "/"].includes(event.key)) chooseOperator(event.key);
  else if (event.key === ".") inputDecimal();
  else if (event.key === "Enter" || event.key === "=") calculate();
  else if (event.key === "Escape") clearCalculator();
  else if (event.key === "Backspace") backspace();
});
