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
const rootArray = [5, 8, 9, 2, 1, 3, 7, 4, 6];
const k = 2;
const root = arrayToBinaryTree(rootArray);

// Aquí puedes llamar a tu función kthLargestLevelSum(root, k) para probar el entorno
console.log(root);
