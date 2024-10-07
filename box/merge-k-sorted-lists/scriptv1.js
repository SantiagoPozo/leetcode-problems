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
  console.log(" ======================== ");
  if (!lists || lists.length === 0) return null;

  for (let i = 1; i < lists.length; i++) {
    // inserta cada nodo de list[1] en list[0] usando insertNode
    let head = lists[i];
    if (!head) continue;
    while (head) {
      let next = head.next;
      lists[0] = insertNode(lists[0], head);
      head = next;
    }
    console.log(JSON.stringify(lists[0]));
  }
  return lists[0];
}

function insertNode(list, node) {
  if (!list || node.value < list.value) {
    // Inserta al principio si es necesario
    node.next = list;
    return node;
  }

  let head = list;
  while (head.next && head.next.value > node.value) {
    // Buscar el lugar correcto para insertar
    head = head.next;
  }

  // Inserta el nodo en la posición correcta
  node.next = head.next;
  head.next = node;

  return list; // Devuelve la lista actualizada
}
