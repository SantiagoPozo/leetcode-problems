var minAddToMakeValid = function (s) {
  if (s.length <= 1) return s.length;
  if (s == "()") return 0;
  if (s == "((" || s == "))") return 2;
  if (s == ")(") return 4;
  let result = 0;

  // RULES
  const rule1 = (str) => {
    if (str.length === 0) return "1,1";
    // str is a string formed by numbers and comas: "2,3,3,2"
    // extract the firs number and the last number wihtout using arrays:
    const first = Number(str.slice(0, str.indexOf(","))) + 1;
    const last = Number(str.slice(str.lastIndexOf(",") + 1)) + 1;

    return (
      first +
      "," +
      str.slice(str.indexOf(",") + 1, str.lastIndexOf(",") + 1) +
      last
    );
  };

  const rule2 = (str1, str2) => {
    if (str1.length === 0) return rule1(str2);
    if (str2.length === 0) return rule1(str1);

    const first = Number(str1.slice(0, str1.indexOf(","))) + 1;
    const last = Number(str2.slice(str2.lastIndexOf(",") + 1)) + 1;

    return (
      first +
      "," +
      str1.slice(str1.indexOf(",") + 1) +
      "," +
      str2.slice(0, str2.lastIndexOf(",")) +
      "," +
      last
    );
  };

  const produceFamily = function (level) {
    const family = [];
    // level 0
    const set0 = new Set();
    set0.add("");
    family[0] = set0;
    for (let i = 1; i <= level; i++) {
      const set = new Set();
      // lets create the family i
      for (str of family[i - 1]) {
        set.add(rule1(str));
      }

      for (let k = 1; k <= i - 2; k++)
        for (strb of family[i - k - 1]) {
          if (i - k - 1 === 0) continue;
          for (strc of family[k]) {
            set.add(rule2(strb, strc));
          }
        }
      console.log("level", i, ":", set);
      family[i] = set;
    }
    return family;
  };

  // const level = 6;
  // console.log("Family to level", level);
  // produceFamily(level);

  const makeSkeleton = (str) => {
    console.log("\n str: ", str);
    if (str === "") return [];

    const skeleton = [];
    let l = 0;
    let r = 0;

    // Repairing start and end (str.length > 2)
    if (str[str.length - 1] === "(") {
      result = result + 2;
      str = str + "))";
    } else if (str.slice(str.length - 2) === "()") {
      result = result + 1;
      str = str + ")";
    }

    if (str.slice(0, 2) === "()") {
      result = result + 1;
      str = "(" + str;
    } else if (str[0] === ")") {
      result = result + 2;
      str = "((" + str;
    }
    console.log("Repaired string's extrems:", str);

    for (let k = 0; k < str.length; k++) {
      // console.log("k:", k);
      if (r === 0) {
        if (str[k] === "(") l++;
        else {
          r = 1;
        }
        // console.log("l: ", l, ",", r, ":r");
      } else {
        // r > 0
        if (str[k] === "(" || k === str.length - 1) {
          // console.log("actualización:");
          // console.log("l: ", l, ",", r, ":r");
          skeleton.push(l);
          if (k === str.length - 1) r++;
          skeleton.push(r);
          r = 0;
          l = 1;
        } else {
          if (l > 2 && k !== 0 && k !== str.length - 1) {
            l--;
          } else {
            r++;
          }
        }
        // console.log("l: ", l, ",", r, ":r");
      }
    }
    console.log(skeleton);
    return skeleton;
  };
  const arr = makeSkeleton(s);
  let sum = 0;
  for (let k = 0; k < arr.length / 2; k++) {
    sum = sum + Math.abs(arr[2 * k] - arr[2 * k + 1]);
  }
  return sum;
};

// console.log(minAddToMakeValid("((()))"));
// console.log(minAddToMakeValid("(()))"));
// console.log(minAddToMakeValid("()))"));
// console.log(minAddToMakeValid(")))"));

// console.log(minAddToMakeValid("((("));
// console.log(minAddToMakeValid("((()"));
// console.log(minAddToMakeValid("((())"));

console.log(minAddToMakeValid("((())("));
console.log(minAddToMakeValid("))()((())(("));
console.log(minAddToMakeValid("((((((((()))))))"));
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
  let open = 0;
  let add = 0;

  for (let char of s) {
    if (char === "(") open++;
    else {
      if (open > 0) open--;
      else add++;
    }
  }
  return open + add;
};
