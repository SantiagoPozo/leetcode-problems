const dividePlayers = function (skill) {
  const len = skill.length;
  const sum = (2 * skill.reduce((a, b) => a + b, 0)) / len;

  if (!Number.isInteger(sum)) return -1;

  const debt = new Map();
  let totalDebt = 0;

  let chemistrySum = 0;
  for (i = 0; i < len; i++) {
    const mainKey = skill[i];
    const mainValue = debt.get(mainKey);
    const pair = sum - mainKey;

    if (mainValue !== undefined && mainValue > 0) {
      debt.set(mainKey, mainValue - 1);
      totalDebt--;
      chemistrySum += mainKey * (sum - mainKey);
      continue;
    } else {
      debt.set(pair, (debt.get(pair) || 0) + 1);
      totalDebt++;
    }
    if (totalDebt > len - i - 1) return -1;
  }

  for (let value of debt.values()) if (value !== 0) return -1;

  return chemistrySum;
};

let skill = [3, 2, 5, 1, 3, 4];
console.log(dividePlayers(skill));

skill = [3, 4];
console.log(dividePlayers(skill));

skill = [1, 1, 2, 3];
console.log(dividePlayers(skill));
