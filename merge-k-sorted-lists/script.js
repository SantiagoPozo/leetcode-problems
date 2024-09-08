// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
  if (!lists.length) return null;

  // Helper function to merge two sorted lists
  function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;

    while (l1 !== null && l2 !== null) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    if (l1 !== null) current.next = l1;
    if (l2 !== null) current.next = l2;

    return dummy.next;
  }

  while (lists.length > 1) {
    let mergedLists = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(l1, l2));
    }
    lists = mergedLists;
  }

  return lists[0];
}

// Helper function to convert array to ListNode
function arrayToList(arr) {
  let dummy = new ListNode(0);
  let current = dummy;
  arr.forEach((val) => {
    current.next = new ListNode(val);
    current = current.next;
  });
  return dummy.next;
}

// Helper function to convert ListNode to array
function listToArray(list) {
  let result = [];
  while (list) {
    result.push(list.val);
    list = list.next;
  }
  return result;
}
