/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
const minBitFlips = function (start, goal) {
  let s = start.toString(2);
  let g = goal.toString(2);
  let S = s.length;
  let G = g.length;
  if (S < G) s = "0".repeat(G - S) + s;
  else g = "0".repeat(S - G) + g;

  let M = Math.max(S, G);
  let flips = 0;

  for (let i = M - 1; i >= 0; i--) {
    if (s[i] !== g[i]) {
      flips++;
    }
  }
  return flips;
};

// 57.25%; 63.77%.

/*
// Solución de la comunidad. Solución muy rápida.
  var minBitFlips = function (start, goal) {
  let startBits = start.toString(2);
  let goalBits = goal.toString(2);

  while (startBits.length !== goalBits.length) {
    if (startBits.length > goalBits.length) goalBits = `0${goalBits}`;
    else if (goalBits.length > startBits.length) startBits = `0${startBits}`;
  }

  let bitFlips = 0;

  for (let i = 0; i < startBits.length; i++) {
    if (startBits[i] !== goalBits[i]) bitFlips++;
  }

  return bitFlips;
}; */
function minimumBitFlips(start, goal) {
  // Implementación de la función que calcula el mínimo de flips de bits
  let xor = start ^ goal; // XOR de ambos números resalta los bits que son diferentes
  let count = 0;
  while (xor > 0) {
    count += xor & 1; // Cuenta los bits que son diferentes
    xor >>= 1; // Desplaza a la derecha
  }
  return count;

  // falla con número grande. ¿Por qué?
}
