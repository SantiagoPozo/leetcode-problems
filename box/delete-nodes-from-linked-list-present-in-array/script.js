/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  const uniqueNums = new Set(nums);
  let dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;
  while (current.next !== null) {
    if (uniqueNums.has(current.next.val)) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return dummy.next;
};
