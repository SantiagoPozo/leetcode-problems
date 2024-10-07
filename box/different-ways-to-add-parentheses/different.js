/**
 * @param {string} expression
 * @return {number[]}
 */
function parseExpression(expression) {
  let arr = [];
  let num = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === "+" || char === "-" || char === "*") {
      arr.push(parseInt(num)); // Añadir el número acumulado al array
      arr.push(char); // Añadir el operador al array
      num = ""; // Reiniciar el acumulador de números
    } else {
      num += char; // Acumular dígitos del número
    }
  }

  arr.push(parseInt(num)); // Añadir el último número
  return arr;
}

function diffWaysToCompute(expression) {
  let parsedExpression = parseExpression(expression);

  console.log("resultado como array:", parsedExpression);
  return compute(parsedExpression);
}

function compute(arr) {
  let result = [];

  for (let i = 1; i < arr.length; i += 2) {
    // Recorremos solo los operadores (posiciones impares)
    let operator = arr[i];
    let left = compute(arr.slice(0, i)); // Recursivamente calcular la parte izquierda
    let right = compute(arr.slice(i + 1)); // Recursivamente calcular la parte derecha

    for (let l of left) {
      for (let r of right) {
        if (operator === "+") result.push(l + r);
        else if (operator === "-") result.push(l - r);
        else if (operator === "*") result.push(l * r);
      }
    }
  }

  if (result.length === 0) return [arr[0]]; // Caso base: si no hay operadores, retornar el número
  return result;
}

/* 
var diffWaysToCompute = function (expression) {
  let result = [];
  for (let i = 0; i < expression.length; i++) {
    let c = expression[i];
    if (c === "+" || c === "-" || c === "*") {
      let left = diffWaysToCompute(expression.substring(0, i));
      let right = diffWaysToCompute(expression.substring(i + 1));
      for (let l of left) {
        for (let r of right) {
          if (c === "+") result.push(l + r);
          else if (c === "-") result.push(l - r);
          else if (c === "*") result.push(l * r);
        }
      }
    }
  }

  if (result.length === 0) result.push(parseInt(expression));
  return result;
};
*/
console.log(diffWaysToCompute("23-1-1"));
console.log(diffWaysToCompute("2*3-4*5"));

var permute = function (nums) {
  var result = [];
  var backtrack = (i, nums) => {
    if (i === nums.length) {
      result.push(nums.slice());
      return;
    }
    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      backtrack(i + 1, nums);
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  };
  backtrack(0, nums);
  console.log(result);
  return result;
};
permute([1, 2, 3]);
