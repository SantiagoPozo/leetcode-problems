/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function (boxes) {
  let score = 0;
  let newBoxes = [];

  const removeTrivialBoxes = (boxes) => {
    const sections = {};
    for (let i = 0; i < boxes.length; i++) {
      if (i === 0 || boxes[i] !== boxes[i - 1]) {
        //empezamos nueva sección
        if (!sections[boxes[i]]) sections[boxes[i]] = { count: 0, row: 0 };
        sections[boxes[i]]["count"] = sections[boxes[i]]["count"] + 1;
      }
      sections[boxes[i]]["row"] = sections[boxes[i]]["row"] + 1;
    }

    const newBoxes = [];
    let sectionScored = false;
    for (let i = 0; i < boxes.length; i++) {
      if (i === 0 || boxes[i] !== boxes[i - 1]) sectionScored = false;

      if (sections[boxes[i]]["count"] > 1) newBoxes.push(boxes[i]);
      else if (!sectionScored) {
        score = score + sections[boxes[i]]["row"] * sections[boxes[i]]["row"];
        sectionScored = true;
      }
    }
    if (newBoxes.length < boxes.length) return removeTrivialBoxes(newBoxes);

    return [score, newBoxes];
  };
  [score, newBoxes] = removeTrivialBoxes(boxes);

  // dynamic programming and memoization
  const memo = {};
  const removeBoxes = (boxes) => {
    const key = boxes.join("");
    if (memo[key]) return memo[key];

    let maxScore = 0;
    let i = 0;
    while (i < boxes.length) {
      let j = i;
      while (j < boxes.length && boxes[j] === boxes[i]) j++;
      const newBoxes = boxes.slice(0, i).concat(boxes.slice(j));
      const newScore = (j - i) * (j - i) + removeBoxes(newBoxes);
      maxScore = Math.max(maxScore, newScore);
      i = j;
    }
    memo[key] = maxScore;
    return maxScore;
  };

  score = score + removeBoxes(newBoxes);
  return score;
};

const boxes = [1, 6, 2, 2, 3, 2, 5, 5, 6, 5];
console.log("result:", removeBoxes(boxes));

// cases in objecto
const cases = [
  {
    boxes: [1, 3, 2, 2, 2, 3, 4, 3, 1],
    expected: 23,
  },
  {
    boxes: [1, 1, 1],
    expected: 9,
  },
  {
    boxes: [1],
    expected: 1,
  },
  {
    boxes: [1, 2, 3],
    expected: 3,
  },
  {
    boxes: [1, 2, 3, 1],
    expected: 6,
  },
];

// test cases
cases.forEach((c, i) => {
  console.time(`Test case ${i}`);
  const result = removeBoxes(c.boxes);
  console.timeEnd(`Test case ${i}`);
  console.log(
    result === c.expected
      ? `Test case ${i} is Passed`
      : `Test case ${i} is Failed`
  );
});