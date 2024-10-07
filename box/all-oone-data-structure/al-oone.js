var AllOne = function () {
  this.map = new Map();
  this.maxString = "";
  this.minString = "";
  this.maxValue = 0;
  this.minValue = 0;
};

/**
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) {
  const value = (this.map.get(key) || 0) + 1;
  this.map.set(key, value);

  // Update maxValue and maxString
  if (value > this.maxValue) {
    this.maxValue = value;
    this.maxString = key;
  }
};

/**
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function (key) {
  const value = this.map.get(key) - 1;
  if (value > 0) {
    this.map.set(key, value);

    // If the decremented key was the minimum and its new value is > 1, update minValue and minString
    if (key === this.minString && value > 1) {
      this.minValue = value;
      this.minString = key;
    }
  } else {
    this.map.delete(key);
  }

  // If the map is empty, reset the minValue and maxValue
  if (this.map.size === 0) {
    this.minValue = 0;
    this.maxValue = 0;
    this.minString = "";
    this.maxString = "";
  } else if (key === this.minString && value === 0) {
    // If the deleted key was the minimum, find the new minimum
    this.getMinKey();
  }
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {
  let maxKey = "";
  let maxValue = 0;

  // Iterate over the map to find the key with the highest value
  for (const [key, value] of this.map.entries()) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }

  this.maxValue = maxValue;
  this.maxString = maxKey;
  return maxKey;
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {
  let minKey = "";
  let minValue = Infinity;

  // Iterate over the map to find the key with the lowest value
  for (const [key, value] of this.map.entries()) {
    if (value < minValue) {
      minValue = value;
      minKey = key;
    }
  }

  this.minValue = minValue;
  this.minString = minKey;
  return minKey;
};

// Test example
const allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
console.log(allOne.getMaxKey()); // returns "hello"
console.log(allOne.getMinKey()); // returns "hello"
allOne.inc("leet");
console.log(allOne.getMaxKey()); // returns "hello"
console.log(allOne.getMinKey()); // returns "leet"
allOne.dec("leet");
console.log(allOne.getMinKey()); // returns "hello"
