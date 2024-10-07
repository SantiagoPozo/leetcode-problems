class Node {
  constructor(count) {
    this.count = count;
    this.keys = new Set();
    this.prev = null;
    this.next = null;
  }
}

class AllOne {
  constructor() {
    this.map = new Map(); // Map to track keys and their corresponding nodes
    this.head = new Node(0); // Dummy head for the doubly linked list
    this.tail = new Node(0); // Dummy tail for the doubly linked list
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * @param {string} key
   * @return {void}
   */
  inc(key) {
    if (this.map.has(key)) {
      const currentNode = this.map.get(key);
      const nextNode = currentNode.next;

      // Remove the key from the current node
      currentNode.keys.delete(key);

      // If nextNode does not have count = currentNode.count + 1, insert new node
      if (nextNode === this.tail || nextNode.count !== currentNode.count + 1) {
        const newNode = new Node(currentNode.count + 1);
        this.insertNodeAfter(currentNode, newNode);
      }

      // Move key to the next node
      this.map.set(key, currentNode.next);
      currentNode.next.keys.add(key);

      // Remove the current node if it becomes empty
      if (currentNode.keys.size === 0) {
        this.removeNode(currentNode);
      }
    } else {
      // If key doesn't exist, insert it into the first node after head
      if (this.head.next === this.tail || this.head.next.count !== 1) {
        const newNode = new Node(1);
        this.insertNodeAfter(this.head, newNode);
      }
      this.head.next.keys.add(key);
      this.map.set(key, this.head.next);
    }
  }

  /**
   * @param {string} key
   * @return {void}
   */
  dec(key) {
    if (!this.map.has(key)) return;

    const currentNode = this.map.get(key);
    const prevNode = currentNode.prev;

    // Remove the key from the current node
    currentNode.keys.delete(key);

    if (currentNode.count > 1) {
      // If prevNode does not have count = currentNode.count - 1, insert new node
      if (prevNode === this.head || prevNode.count !== currentNode.count - 1) {
        const newNode = new Node(currentNode.count - 1);
        this.insertNodeAfter(prevNode, newNode);
      }

      // Move key to the previous node
      this.map.set(key, currentNode.prev);
      currentNode.prev.keys.add(key);
    } else {
      // If count becomes 0, remove the key from the map
      this.map.delete(key);
    }

    // Remove the current node if it becomes empty
    if (currentNode.keys.size === 0) {
      this.removeNode(currentNode);
    }
  }

  /**
   * @return {string}
   */
  getMaxKey() {
    if (this.tail.prev === this.head) return ""; // No elements
    return [...this.tail.prev.keys][0]; // Return any key from the last node
  }

  /**
   * @return {string}
   */
  getMinKey() {
    if (this.head.next === this.tail) return ""; // No elements
    return [...this.head.next.keys][0]; // Return any key from the first node
  }

  /**
   * Helper method to insert a node after a given node
   * @param {Node} node
   * @param {Node} newNode
   */
  insertNodeAfter(node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    node.next.prev = newNode;
    node.next = newNode;
  }

  /**
   * Helper method to remove a node from the linked list
   * @param {Node} node
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}

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
