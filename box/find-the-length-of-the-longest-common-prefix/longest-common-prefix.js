class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.maxLength = 0; // Almacenamos la longitud máxima en el Trie
  }

  // Método para insertar un número en el Trie, convertido a cadena
  insert(number) {
    let node = this.root;
    const digits = number.toString(); // Convertimos el número a string
    this.maxLength = Math.max(this.maxLength, digits.length); // Actualizamos la longitud máxima

    for (let digit of digits) {
      if (!node.children[digit]) {
        node.children[digit] = new TrieNode();
      }
      node = node.children[digit];
    }
    node.isEndOfWord = true;
  }

  // Método que retorna la longitud del prefijo común entre el Trie y un número dado
  bestLen(number) {
    let node = this.root;
    const digits = number.toString();
    let prefixLength = 0;

    for (let digit of digits) {
      if (!node.children[digit]) return prefixLength;
      node = node.children[digit];
      prefixLength++;
    }

    return prefixLength;
  }
}

const longestCommonPrefix = function (arr1, arr2) {
  let trie = new Trie();

  // Insertamos todos los números de arr1 convertidos a cadenas
  for (let num of arr1) trie.insert(num);

  let max = 0;
  // Para cada número en arr2, buscamos el prefijo común más largo con el Trie
  for (let num of arr2) {
    // Condición: Solo procesamos números cuya longitud es al menos max
    if (num.toString().length > max) {
      const len = trie.bestLen(num);
      if (len === this.maxLength) return len;
      if (len > max) max = len;
    }
  }

  return max;
};
let arr = [1120, 1150, 1175, 23, 6];
let brr = [1124, 1300, 231, 24];
console.log("Respuesta final:");
console.log(longestCommonPrefix(arr, brr));

arr = [1000];
brr = [1, 10, 100];
console.log("Respuesta final:");
console.log(longestCommonPrefix(arr, brr));

arr = [1, 10, 100];
brr = [1000];
console.log("Respuesta final:");
console.log(longestCommonPrefix(arr, brr));
