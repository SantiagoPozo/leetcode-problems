/**
 * @param {number} maxSize
 */
class CustomStack {
  constructor(maxSize) {
    this.stack = [];
    this.maxSize = maxSize;
  }
  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    if (this.stack.length < this.maxSize) this.stack.push(x);
  }
  /**
   * @return {number}
   */
  pop() {
    if (this.stack.length > 0) return this.stack.pop();
    else return -1;
  }
  /**
   * @param {number} k
   * @param {number} val
   * @return {void}
   */
  increment(k, val) {
    for (let i = 0; i < Math.min(k, this.stack.length); i++) {
      this.stack[i] = this.stack[i] + val;
    }
  }
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */

const stk = new CustomStack(3); // Stack is Empty []
stk.push(1); // stack becomes [1]
stk.push(2); // stack becomes [1, 2]
console.log(stk.stack);
console.log(stk.pop()); // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2); // stack becomes [1, 2]
stk.push(3); // stack becomes [1, 2, 3]
console.log(stk.stack);
stk.push(4); // stack still [1, 2, 3], Do not add another elements as size is 4
console.log(stk.stack);
stk.increment(5, 100); // stack becomes [101, 102, 103]
console.log(stk.stack);
stk.increment(2, 100); // stack becomes [201, 202, 103]
console.log(stk.stack);
console.log(stk.pop()); // return 103 --> Return top of the stack 103, stack becomes [201, 202]
console.log(stk.stack);
console.log(stk.pop()); // return 202 --> Return top of the stack 202, stack becomes [201]
console.log(stk.pop()); // return 201 --> Return top of the stack 201, stack becomes []
console.log(stk.stack);
console.log(stk.pop()); // return -1 --> Stack is empty return -1.
