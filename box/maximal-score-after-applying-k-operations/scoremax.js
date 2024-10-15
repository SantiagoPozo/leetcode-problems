var maxKelements = function (nums, k) {
  // Ordenar el array nums en orden descendente
  nums.sort((a, b) => b - a);

  // Inicializar la estructura sortedHeader como un Max Heap usando un array y el método de burbuja hacia arriba
  const sortedHeader = [...nums];

  let score = 0;

  // Bucle principal para el cálculo del score
  while (k > 0 && sortedHeader.length > 0) {
    // Obtener el valor más alto
    let maxValue = sortedHeader.shift(); // Extrae el primer elemento ya que nums está ordenado

    // Añadir al score el valor
    score += maxValue;

    // Reducir k
    k--;

    // Reducir el valor y volver a insertar si es mayor que 1
    let newValue = Math.ceil(maxValue / 3);
    if (newValue > 0) {
      sortedHeader.push(newValue);
      // Reordenar el array en orden descendente después de insertar el nuevo valor
      sortedHeader.sort((a, b) => b - a);
    }
  }

  return score;
};

// test cases

/* prettier-ignore */
let nums = [], k = 0;
(nums = [10, 10, 10, 10, 10]), (k = 5);
console.log("nums:", nums, "|| k:", k);
console.log(maxKelements(nums, k), ". Should be:", 50, "\n");

(nums = [10, 10, 10, 10, 10, 7]), (k = 6);
console.log("nums:", nums, "|| k:", k);
console.log(maxKelements(nums, k), ". Should be:", 57, "\n");

(nums = [1, 2, 3, 4, 5, 5, 2, 2, 1]), (k = 6);
console.log("nums:", nums, "|| k:", k);
console.log(maxKelements(nums, k), ". Should be:", 57, "\n");

// prettier-ignore
(nums = [1, 10, 3, 3, 3]), (k = 3);
console.log("nums:", nums, "|| k:", k);
console.log(maxKelements(nums, k), ". Should be:", 17, "\n");

// prettier-ignore
(nums = [564960737]), (k = 1);
console.time("maxKelements");
result = maxKelements(nums, k);
console.timeEnd("maxKelements");
console.log(maxKelements(nums, k), ". Should be:", 564960737, "\n");

/* 
// It is not fast enought
var maxKelements = function (nums, k) {
  function incrementNumMultiplicity(num, times = 1) {
    // Find the correct position to insert the number using binary search
    let left = 0;
    let right = map.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (map[mid][0] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Insert the number at the correct position or increment its count if it already exists
    if (map[left] && map[left][0] === num && times >= 1) {
      map[left][1] += times;
    } else if (!(map[left] && map[left][0] === num)) {
      map.splice(left, 0, [num, times]);
    }
    if (num > 3) incrementNumMultiplicity(Math.ceil(num / 3), 0);
  }

  let map = [[1, Infinity]];
  for (const element of nums) {
    incrementNumMultiplicity(element);
  }
  // console.log("Initial map:", map);

  const trueMap = new Map();
  for (i = map.length - 1; i >= 0; i--) {
    const value = map[i][0];
    const multiplicity = map[i][1];
    trueMap.set(value, multiplicity);
  }

  // console.log("Initial true Map\n", trueMap);

  let score = 0;

  for (element of trueMap) {
    let increment = element[0];
    const multiplicity = element[1];
    // console.log(increment, multiplicity);

    const times = Math.min(k, multiplicity);
    score += times * increment;
    if (times === k) return score;

    // times === multiplicity
    k -= times;
    if (increment > 3) {
      increment = Math.ceil(increment / 3);
      trueMap.set(increment, trueMap.get(increment) + times);
      // console.log("Nuevo estado trueMap\n", trueMap);
    }
  }

  return score;
}; */
/* 
// 
var maxKelements = function (nums, k) {
  let map = [];
  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = (map[nums[i]] || 0) + 1;
  }

  console.log(map);
  let score = 0;
  while (k > 0) {
    increment = map.length - 1;
    score += increment;
    if (k === 1) break;
    console.log("\nincrement:", increment, "score:", score);

    if (map[increment] === 1) {
      do {
        map.pop();
      } while (map[map.length - 1] === undefined && map.length >= 0);
    } else map[increment]--;

    increment = Math.ceil(increment / 3);
    map[increment] = (map[increment] || 0) + 1;
    k--;
    console.log(map);
  }
  return score;
};
 */
