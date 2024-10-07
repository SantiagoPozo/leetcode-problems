// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var insertGreatestCommonDivisors = function (head) {
  let node1 = head;
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
  while (node1.next) {
    let node2 = node1.next;
    let newNode = new ListNode(gcd(node1.val, node2.val), node2);
    node1.next = newNode;
    node1 = node2;
  }
  return head;
};
