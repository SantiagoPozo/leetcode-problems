import math
#
#
# This solution is based on the observation that the string is symetric
class Solution:
    def findKthBit(self, n: int, k: int) -> str:

        begining = [None, 0, 1, 1, 1]
        if k <= 4: return str(begining[k])  
        simetry = 0
        
        while k > 4:
            logas = math.log2(k)
            if logas.is_integer(): return str(simetry ^ 1)
            prev_center = round(2 ** math.floor(logas))
            k = 2 * prev_center - k
            simetry = 1 - simetry
        
        return str(simetry ^ begining[k])


# test cases to validate the solution
solution = Solution()

# print(solution.findKthBit(0, 24))

s = ""
for  m in range(1,40):
  s += str(solution.findKthBit(30, m))
print("ph", s)

            
        