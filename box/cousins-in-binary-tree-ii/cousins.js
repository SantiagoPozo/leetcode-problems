/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

var replaceValueInTree = function (root) {
  const sums = [];

  const calculateSums = (node, level) => {
    if (level > 1) sums[level] = (sums[level] || 0) + node.val;
    if (node.left) calculateSums(node.left, level + 1);
    if (node.right) calculateSums(node.right, level + 1);
  };
  calculateSums(root, 0);

  const modifyTree = (node, level) => {
    // From level 1, we modify level 2.
    let sum = 0;
    if (node.left) sum += node.left.val;
    if (node.right) sum += node.right.val;
    // prettier-ignore
    // console.log("level:", level, "|| watching level:", level + 1, "|| sum:", sum);

    if (node.left) {
      node.left.val = sums[level + 1] - sum;
      modifyTree(node.left, level + 1);
    }
    if (node.right) {
      node.right.val = sums[level + 1] - sum;
      modifyTree(node.right, level + 1);
    }
  };
  modifyTree(root, 0);
  root.val = 0;
  if (root.left) root.left.val = 0;
  if (root.right) root.right.val = 0;

  return root;
};

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

let root = [5, 4, 9, 1, 10, null, 7];
console.log("root:", replaceValueInTree(arrayToBinaryTree(root)));
