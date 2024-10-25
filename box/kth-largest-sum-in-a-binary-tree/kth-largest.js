/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
  const sum_levels = [];
  function traverseTree(node, level) {
    sum_levels[level] = (sum_levels[level] || 0) + node.val;
    if (node.left) traverseTree(node.left, level + 1);
    if (node.right) traverseTree(node.right, level + 1);
  }
  traverseTree(root, 0);
  sum_levels.sort((a, b) => b - a);
  return sum_levels[k - 1] || -1;
};

// Definición del nodo del árbol
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Función para convertir un array en un árbol binario
function arrayToBinaryTree(arr) {
  if (arr.length === 0) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (i < arr.length) {
    const currentNode = queue.shift();

    if (i < arr.length && arr[i] !== null) {
      currentNode.left = new TreeNode(arr[i]);
      queue.push(currentNode.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      currentNode.right = new TreeNode(arr[i]);
      queue.push(currentNode.right);
    }
    i++;
  }

  return root;
}

// Ejemplo de uso con los datos dados
let rootArray = [5, 8, 9, 2, 1, 3, 7, 4, 6];
// Aquí puedes llamar a tu función kthLargestLevelSum(root, k) para probar el entorno
let k = 2;

rootArray = [5, 8, 9, 2, 1, 3, 7];
k = 4;
const root = arrayToBinaryTree(rootArray);
console.log(kthLargestLevelSum(root, k));
