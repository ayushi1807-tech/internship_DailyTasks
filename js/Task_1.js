<<<<<<< HEAD
// JavaScript Calculator using js Object+function+Loop

const calculator = {
  add: function(num1, num2) {
    return num1 + num2;
  },
  subtract: function(num1, num2) {
    return num1 - num2;
  },
  multiply: function(num1, num2) {
    return num1 * num2;
  },
  divide: function(num1, num2) {
    if (num2 === 0) {
      return "Cannot divide by zero";
    }
    return a / b;
  }
};

while (true) {
  let num1 = Number(prompt("Enter first number:"));
  let operator = prompt("Enter operator (+, -, *, /):");
  let num2 = Number(prompt("Enter second number:"));
  let result;

  if (operator === "+") {
    result = calculator.add(num1, num2);
  } else if (operator === "-") {
    result = calculator.subtract(num1, num2);
  } else if (operator === "*") {
    result = calculator.multiply(num1, num2);
  } else if (operator === "/") {
    result = calculator.divide(num1, num2);
  } else {
    result = "Invalid operator!";
  }

  alert("Result: " + result);

  let again = prompt("Type 'no' to stop, or press OK to continue:");
  if (again === "no" || "NO") break;
}












=======
// JavaScript Calculator using js Object+function+Loop

const calculator = {
  add: function(num1, num2) {
    return num1 + num2;
  },
  subtract: function(num1, num2) {
    return num1 - num2;
  },
  multiply: function(num1, num2) {
    return num1 * num2;
  },
  divide: function(num1, num2) {
    if (num2 === 0) {
      return "Cannot divide by zero";
    }
    return a / b;
  }
};

while (true) {
  let num1 = Number(prompt("Enter first number:"));
  let operator = prompt("Enter operator (+, -, *, /):");
  let num2 = Number(prompt("Enter second number:"));
  let result;

  if (operator === "+") {
    result = calculator.add(num1, num2);
  } else if (operator === "-") {
    result = calculator.subtract(num1, num2);
  } else if (operator === "*") {
    result = calculator.multiply(num1, num2);
  } else if (operator === "/") {
    result = calculator.divide(num1, num2);
  } else {
    result = "Invalid operator!";
  }

  alert("Result: " + result);

  let again = prompt("Type 'no' to stop, or press OK to continue:");
  if (again === "no" || "NO") break;
}




>>>>>>> 530b2c5f7a52b10563d30a7eac0f4dfe70d3d3d2
