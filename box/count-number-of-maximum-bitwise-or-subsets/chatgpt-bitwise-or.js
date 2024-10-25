/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let maxOr = 0;
  let count = 0;

  // Calcula el máximo valor de OR posible
  for (let num of nums) maxOr |= num;

  // Función DFS para recorrer los subconjuntos
  function dfs(index, currentOr) {
    if (currentOr === maxOr) {
      count += 2 ** (nums.length - index);
      return;
    }

    if (index === nums.length) return;

    // Incluimos el elemento actual en el OR
    dfs(index + 1, currentOr | nums[index]);

    // No incluimos el elemento actual
    dfs(index + 1, currentOr);
  }

  dfs(0, 0);
  return count;
};

console.log([3, 1], countMaxOrSubsets([3, 1])); // Output 2
console.log([2, 2, 2], countMaxOrSubsets([2, 2, 2])); // Output 7
console.log([3, 2, 1, 5], countMaxOrSubsets([3, 2, 1, 5])); // Output 6
console.log([9, 9, 9, 9, 9, 9, 9], countMaxOrSubsets([9, 9, 9, 9, 9, 9, 9])); // Output 127
