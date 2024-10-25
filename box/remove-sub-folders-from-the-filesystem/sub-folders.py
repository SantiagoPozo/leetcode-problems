from typing import List

class Solution:
  def removeSubfolders(self, folder: List[str]) -> List[str]:
    folder_set = set(folder)
    result = set(folder)

    i = 0
    for f in folder:
      fo = f[1:]
      fo = fo.split("/")
      fo.pop()
      superf = ""
      for e in fo:
        superf = superf + "/" + e
        append = True
        if superf in folder_set:
          result.discard(f)
    return list(result)

# Runtime: 91ms Beats 75,35% O (n * m) where n is the number of folders
# and m is the maximum depth of a folder
# Memory: 31.35MB Beats 75,15% O (n) where n is the number of folders
  
# Test Cases
sol = Solution()

folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
print("folder:", folder)
print("Result:", sol.removeSubfolders(folder)) # ["/a","/c/d","/c/f"]

folder = ["/a","/a/b/c","/a/b/d"]
print("folder:", folder)
print("Result:", sol.removeSubfolders(folder)) # ["/a"]

folder = ["/a/b/c","/a/b/ca","/a/b/d"]
print("folder:", folder)
print("Result:", sol.removeSubfolders(folder)) # ["/a/b/c","/a/b/ca","/a/b/d"]




