/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.capacity = k + 1;
  this.queue = new Array(this.capacity);
  this.front = 0;
  this.rear = 0;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.isFull()) return false;
  this.front = (this.front - 1 + this.capacity) % this.capacity;
  this.queue[this.front] = value;
  return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull()) return false;
  this.queue[this.rear] = value;
  this.rear = (this.rear + 1) % this.capacity;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.front = (this.front + 1) % this.capacity;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false;
  this.rear = (this.rear - 1 + this.capacity) % this.capacity;
  return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (this.isEmpty()) return -1;
  return this.queue[this.front];
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (this.isEmpty()) return -1;
  return this.queue[(this.rear - 1 + this.capacity) % this.capacity];
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.front === this.rear;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return (this.rear + 1) % this.capacity === this.front;
};

// Your MyCircularDeque object will be instantiated and called as such:
var obj = new MyCircularDeque(3);
const p0 = obj.insertLast(1);
console.log(obj);
const p1 = obj.insertLast(2);
console.log(obj);
const p2 = obj.insertFront(3);
const p3 = obj.insertFront(4);
const p4 = obj.getRear();
console.log(obj);
const p5 = obj.isFull();
const p6 = obj.deleteLast();
const p7 = obj.insertFront(4);
const p8 = obj.getFront();

console.log(p0, p1, p2, p3, p4, p5, p6, p7, p8);
