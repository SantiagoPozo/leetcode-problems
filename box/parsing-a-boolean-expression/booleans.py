# This is a solution by Copilot.

class Solution:
  def parseBoolExpr(self, expression: str) -> bool:
    stack = []
    for char in expression:
      if char == ')':
        elements = []
        while stack[-1] != '(':
          elements.append(stack.pop())
        stack.pop()
        operator = stack.pop()
        if operator == '!':
          stack.append('t' if 'f' in elements else 'f')
        elif operator == '&':
          stack.append('t' if 'f' not in elements else 'f')
        else:
          stack.append('t' if 't' in elements else 'f')
      elif char != ',':
        stack.append(char)
    return stack[0] == 't'

expression = "|(&(t,f,t),!(f))"
print(Solution().parseBoolExpr(expression))  # Expected output: false 

expression = "|(&(t,t,t),!(f))"
print(Solution().parseBoolExpr(expression))  # Expected output: true
