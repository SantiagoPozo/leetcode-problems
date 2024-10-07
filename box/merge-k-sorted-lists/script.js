/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  let dummy = new ListNode(0);
  let current = dummy;

  // Initialize an array to keep track of current nodes in each list
  let pointers = lists.slice();

  // Loop until all pointers have no nodes remaining
  let stillSomething = true;
  while (stillSomething) {
    stillSomething = false;
    let minVal = Infinity;

    // Find the minimum value among the current nodes of all lists
    for (let i = 0; i < pointers.length; i++) {
      if (pointers[i] !== null) {
        stillSomething = true; // At least one list still has elements
        if (pointers[i].val < minVal) {
          minVal = pointers[i].val; // Directly compare to find the minimum value
        }
      }
    }

    if (!stillSomething) break;

    // Add nodes with the minimum value to the result list and advance in those lists
    for (let i = 0; i < pointers.length; i++) {
      if (pointers[i] !== null && pointers[i].val === minVal) {
        current.next = new ListNode(minVal);
        current = current.next;
        pointers[i] = pointers[i].next; // Advance to the next node in this list
      }
    }
  }

  return dummy.next; // Return the merged list, skipping the dummy head
}
