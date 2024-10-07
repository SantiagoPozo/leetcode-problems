/**
 * @param {s} s
 * @return {s}
 */

// this is gpt solution using KMP
var shortestPalindrome = function (s) {
  const rev_s = s.split("").reverse().join("");
  const l = s.length;
  const new_s = s + "#" + rev_s;
  console.log("***", new_s, "***");

  const table = new Array(new_s.length).fill(0);
  let j = undefined;
  for (let i = 1; i < new_s.length; i++) {
    console.log("==== iteración:", i, `. ${new_s[i]}`);
    º;
    console.log("Valor inicial de j:", j);
    j = table[i - 1];
    console.log("valor de j:", j);
    while (j > 0 && new_s[i] !== new_s[j]) {
      j = table[j - 1];
      console.log("valor de j:", j);
    }

    if (new_s[i] === new_s[j]) {
      table[i] = j + 1;
    }
  }
  console.log(table);
  return rev_s.slice(0, l - table[new_s.length - 1]) + s;
};

let input = "aacecaaa",
  expected = "aaacecaaa";

// printResult(input, expected);

input = "aacecaaa";
expected = "aaacecaaa";

function printResult(f, inp, exp) {
  const res = f(inp);
  console.log("output:", res);
  console.log("expect:", exp, res === exp);
}

printResult(shortestPalindrome, input, expected);

/* 
// To slow. O(n^2). Time limit exceeded.
var shortestPalindrome = function (s) {
  const l = s.length;
  if (s.length < 2) return s;
  let prefix = "";
  for (let i = 0; i < l; i++) {
    const sub = s.slice(0, l - i);
    if (isPalindrome(sub)) {
      return prefix + (s[l - i] || "") + s;
    } else {
      prefix = prefix + (s[l - i] || "");
    }
  }
};

const isPalindrome = (str) => {
  const len = str.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (str[i] !== str[len - i - 1]) return false;
  }
  return true;
};
 */
