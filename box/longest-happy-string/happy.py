class Solution(object):
  def longestDiverseString(self, a, b, c):
    """
    :type a: int
    :type b: int
    :type c: int
    :rtype: str
    """
    if a == b and b == c: return "abc"*a
    s = ""
    counts = [[a, "a"], [b, "b"], [c, "c"]]
    counts.sort(reverse=True, key = lambda x: x[0])

    while True:
      if counts[0][0] == 0:
        return s
      
      if ( counts[0][0] >= 2 * (counts[1][0] + counts[2][0])):
        base = 2*counts[0][1] + counts[1][1] + 2 * counts[0][1] + counts[2][1]
        s += counts[2][0] * base
        counts[0][0] -= 4*counts[2][0]
        counts[1][0] -= counts[2][0]
        counts[2][0] = 0

      else:
        if counts[0][0] >= (counts[1][0] + counts[2][0])








    while a >= 0 and b >= 0 and c >= 0:

      if a == b and b == c:
        if (counter_a == 2):
          add_s = "bca"*a
        else:  
          add_s = "abc"*a
        return s + add_s

      if a >= b and a >= c:
        if counter_a < 2:
          s += "a"
          a -= 1
          counter_a += 1
          counter_b = 0
          counter_c = 0       
        else:
          #counter_a = 2, counter_b =0, counter_c = 0
          if b == 0 and c == 0: return s
          if b >= c and b > 0:
            s += "b"
            b -= 1
            counter_b = 1
            counter_c = 0
          else:
            if c > 0:  
              s += "c"
              c -= 1
              counter_b = 0
              counter_c = 1

          counter_a = 0
        continue
      
    return s


def prove(Solution):
  [a, b, c] = [1, 11, 3]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))

  # [a, b, c] = [3, 11, 1]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))

  [a, b, c] = [3, 1 ,11]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))

  [a, b, c] = [3, 3, 3]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))

  [a, b, c] = [0, 0, 0]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))

  [a, b, c] = [0, 0, 1000]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))

  [a, b, c] = [1, 1, 7]
  print ("a ->", a, "|| b ->", b, "|| c ->", c)
  print(Solution().longestDiverseString( a, b ,c))
prove(Solution)