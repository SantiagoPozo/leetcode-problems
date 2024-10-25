"""This is my second leetcode problem solved using python. 
Runtime: 16 ms , Beats: 40.63% :(
Memory: 11.77MB, Beats: 8.12%  :(
But :), i did it.
"""
class Solution(object):

  def maximumSwap(self, num):
    """
      :type num: int
      :rtype: int
      """
    s = [int(digit) for digit in str(num)]

    if (len(s) <= 1):
      return num

    first_appearance = {}
    last_appearance = {}
    firsts = []
    lasts = []

    for index, value in enumerate(s):
      if value not in first_appearance and int(value) < 9:
        first_appearance[value] = index
        firsts.append([value, index])

      rev_index = len(s) - 1 - index
      rev_value = s[rev_index]
      if rev_value not in last_appearance and int(rev_value) > 0:
        lasts.append([rev_value, rev_index])
        last_appearance[rev_value] = rev_index

    lasts.sort(reverse=True, key=lambda x: x[0])

    for [l_digit, l_index] in firsts:
      for [r_digit, r_index] in lasts:
        if int(l_digit) >= int(r_digit):
          break
        if r_digit > l_digit and r_index > l_index:
          s[l_index], s[r_index] = r_digit, l_digit
          return int("".join(map(str, s)))

    return num


# 7532785, 2736, 9973,
tests = [[7532785, 8532775], [2736, 7236] , [9973, 9973 ], [98368, 98863]]
for output_and_expected in tests:
  print("\n", output_and_expected[0])
  print(f'Answer: {Solution().maximumSwap(output_and_expected[0]): 10}'
        f'|| Expected: {output_and_expected[1]}')
