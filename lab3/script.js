function getIntegerInput(promptMessage) {
  let userInput;
  let integerValue;
  let isValid = false;

  while (!isValid) {
    userInput = prompt(promptMessage);

    if (userInput === null) {
      return null;
    }

    const trimmedInput = userInput.trim();

    if (trimmedInput === "") {
      alert("Input cannot be empty. Please enter a whole number.");
      continue;
    }

    integerValue = parseInt(trimmedInput, 10);

    if (!isNaN(integerValue) && String(integerValue) === trimmedInput) {
      isValid = true;
      return integerValue;
    } else {
      alert(
        "Invalid input. Please enter a valid whole number (e.g., 10, -5, not 3.14 or 'hello').",
      );
    }
  }
}

function getFloatInput(promptMessage) {
  let userInput;
  let numberValue;
  let isValid = false;

  while (!isValid) {
    userInput = prompt(promptMessage);

    if (userInput === null) {
      return null;
    }

    const trimmedInput = userInput.trim();

    if (trimmedInput === "") {
      alert("Input cannot be empty. Please enter a whole number.");
      continue;
    }

    numberValue = parseFloat(trimmedInput, 10);

    if (!isNaN(numberValue) && String(numberValue) === userInput) {
      isValid = true;
      return numberValue;
    } else {
      alert("Invalid input. Please enter a number (can be decimal).");
    }
  }
}

function getOperatorInput(validOperators, promptMessage) {
  let userInput;
  let trimmedInput;
  let isValid = false;

  const operatorsDisplay = validOperators.join(", ");

  while (!isValid) {
    userInput = prompt(`${promptMessage} (${operatorsDisplay}):`);

    if (userInput === null) {
      console.log("Input cancelled by user.");
      return null;
    }

    trimmedInput = userInput.trim();

    if (trimmedInput === "") {
      alert(
        "Input cannot be empty. Please enter one of the allowed operators.",
      );
      continue;
    }

    if (validOperators.includes(trimmedInput)) {
      isValid = true;
      return trimmedInput;
    } else {
      alert(
        `Invalid operator. Please enter one of the following: ${operatorsDisplay}`,
      );
    }
  }
}

let numberOfCalculations = getIntegerInput(
  "How many calculations would you like to perform?",
);

let currentCalculation = 0;

const OPERATORS = ["+", "-", "*", "/"];
while (currentCalculation < numberOfCalculations) {
  const firstNumber = getFloatInput("Enter the first number:");
  const operator = getOperatorInput(OPERATORS, "Enter an operator");
  const secondNumber = getFloatInput("Enter the second number:");

  if (firstNumber === null || operator === null || secondNumber === null) {
    currentCalculation++;
    continue;
  }

  switch (operator) {
    case "+":
      alert(`Result: ${firstNumber + secondNumber}`);
      break;

    case "-":
      alert(`Result: ${firstNumber - secondNumber}`);
      break;

    case "*":
      alert(`Result: ${firstNumber * secondNumber}`);
      break;

    case "/":
      if (secondNumber === 0) {
        alert("Cannot divide by 0");
        break;
      }
      alert(`Result: ${firstNumber / secondNumber}`);
      break;
  }
  currentCalculation++;
}
