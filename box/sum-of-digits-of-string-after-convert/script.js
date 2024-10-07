var getLucky = function (s, k) {
  const array = s
    .split("")
    .map((char) => (char.charCodeAt(0) - 96).toString())
    .join("")
    .split("")
    .map(Number);
  return sumOfDigits(array, k);
};

function sumOfDigits(array, k) {
  let sum = array.reduce((acc, digit) => acc + digit, 0);
  if (k === 1 || sum < 10) return sum;
  return sumOfDigits(sum.toString().split("").map(Number), k - 1);
}

//

/* const getLucky = function (s, k) {
  if (k === 0)
    return s
      .split("")
      .map((char) => char.charCodeAt(0) - 96)
      .join("");

  const charMap = {};
  for (let i = 0; i < s.length; i++) {
    charMap[s[i]] = ((charMap[s[i]] || 0) + 1) % 10;
  }

  let result = 0;
  for (const key in charMap) {
    console.log(
      "letra: ",
      key,
      "| valor: ",
      (key.charCodeAt(0) - 96) % 9 || 9,
      "| veces: ",
      charMap[key],
      "| total: ",
      ((key.charCodeAt(0) - 96) % 9 || 9) * charMap[key]
    );
    result += ((key.charCodeAt(0) - 96) % 9 || 9) * charMap[key];
  }
  // Now I have the k = 1 transformation.

  function sumOfDigits(array, k) {
    let sum = array.reduce((acc, digit) => acc + digit, 0);
    if (k === 1 || sum < 10) return sum;
    return sumOfDigits(sum.toString().split("").map(Number), k - 1);
  }

  if (k === 1) return result;

  return sumOfDigits(result.toString().split("").map(Number), k - 1);
}; */

// Falla.
