/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
//  Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const splitListToParts = function (head, k) {
  let l = 0;
  let node = head;
  while (node) {
    l++;
    node = node.next;
  }
  const avarageLength = l / k;
  const numOfPartsLonger = l % k;
  const parts = [];
  for (let i = 0; i < k; i++) {
    let part = new ListNode();
    let partHead = part;
    for (let j = 0; j <= avarageLength + (i < numOfPartsLonger ? 0 : -1); j++) {
      part.next = new ListNode(head.val);
      part = part.next;
      head = head.next;
    }
    parts.push(partHead.next);
  }
  return parts;
};
