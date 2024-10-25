/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function (root1, root2) {
  // If both nodes are null, they are equivalent
  if (!root1 && !root2) return true;
  // If only one of them is null, they can't be equivalent
  if (!root1 || !root2) return false;
  // If the values of the current nodes don't match, they can't be equivalent
  if (root1.val !== root2.val) return false;

  // Check if children are directly equivalent or flipped equivalent
  const direct =
    flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
  const flipped =
    flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);

  return direct || flipped;
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

/*prettier-ignore-start*/
let root1 = [1, 2, 3, 4, 5, 6, null, null, null, 7, 8];
//prettier-ignore
let root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7];
let expected = true;
console.log(flipEquiv(root1, root2), " === ", expected);
/*prettier-ignore-end*/
root1 = [];
root2 = [];
expected = true;
console.log(
  flipEquiv(arrayToBinaryTree(root1), arrayToBinaryTree(root2)),
  " === ",
  expected
);
