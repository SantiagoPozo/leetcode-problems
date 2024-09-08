/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function (head, root) {
  if (!root) return false;
  return (
    dfs(head, root) || isSubPath(head, root.left) || isSubPath(head, root.right)
  );

  function dfs(node, tree) {
    if (!node) return true;
    if (!tree) return false;
    return (
      node.val === tree.val &&
      (dfs(node.next, tree.left) || dfs(node.next, tree.right))
    );
  }
};
