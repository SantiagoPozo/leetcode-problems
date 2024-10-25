# After many hours, I didn't manage to fix the code. 
# I presented a very good solution from chatgpt. (beats 100%).

class Solution(object):
  def countMaxOrSubsets(self, nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    bw = 0
    for num in nums: bw |= num
    
    count = 0 # This is going to be the answer.
    bw_dict = {}
    seeds_set = set()

    # Crear el nodo raíz del árbol
    root = NodoTree(nums, None)
    stack = [root]

    # Recorrer el árbol usando un stack (iterativamente)
    while stack:
      current_node = stack.pop()

      # Determinar el valor de incremento del nodo actual
      if current_node.is_seed == False and current_node.bw == bw:
        current_node.increment = 1
      elif current_node.is_seed == True:
        current_node.increment = current_node.calculate_increment(nums)
      else:
        current_node.increment = 0

      # Incrementar el contador global si procede
      count += current_node.increment

      # Determinar si este nodo es un "end_of_line"
      if current_node.is_seed or current_node.bw < bw or len([x for x in current_node.lista if x != '_']) == 1:
        current_node.end_of_line = True

      # Si es un end_of_line, se continúa construyendo el árbol
      if current_node.end_of_line:
        for idx in range(len(current_node.lista)):
          if current_node.lista[idx] != '_':
            new_node = NodoTree(current_node.lista[:], idx)
            stack.append(new_node)

class NodoTree:
  def __init__(self, lista, removed):
    self.end_of_line = False  # Por defecto, es False
    self.increment = 0  # Por defecto, vale 0
    # Convertimos el elemento en el índice 'removed' en '_'
    self.lista = lista[:]
    if removed is not None:
      self.lista[removed] = '_'
    self.unique_elements = set(num for num in self.lista if num != '_')
    self.bw = self.calculate_bw(self.unique_elements)
    self.is_seed = self.check_if_seed(nums, bw)
    self.removed = removed
  
  def calculate_bw(self, elements):
    global bw_dict
    # Comprobamos si el conjunto ya está en el diccionario
    elements_frozenset = frozenset(elements)
    if elements_frozenset in bw_dict:
      return bw_dict[elements_frozenset]
    
    # Si no está, calculamos el valor y lo almacenamos
    bw = 0
    for num in elements:
      bw |= num
    bw_dict[elements_frozenset] = bw
    return bw
  
  def check_if_seed(self, nums, bw):
    global seeds_set, count
    # Comprobamos si la lista ya está en seeds_set
    elements_tuple = tuple(sorted(self.lista))
    if elements_tuple in seeds_set:
      return True
    
    # Comprobamos si el bw de la lista es igual al valor objetivo
    if self.bw != bw:
      return False
    
    # Verificamos si la lista incluye todas las apariciones 
    # de los elementos en nums
    nums_count = {num: nums.count(num) for num in self.unique_elements}
    for num in self.unique_elements:
      if self.lista.count(num) < nums_count[num]:
        return False
    
    # Añadimos la lista a seeds_set si pasa todas las verificaciones
    seeds_set.add(elements_tuple)
    
    # Incrementamos count utilizando calculate_increment
    count += self.calculate_increment(nums)
    
    return True
  
  def calculate_increment(self, nums):
    # Creamos un diccionario que cuenta cuántas veces aparece cada elemento en la lista
    multiplicity_dict = {num: self.lista.count(num) for num in self.unique_elements}
    
    # Calculamos el incremento como el producto de (2^multiplicidad - 1) para cada elemento
    increment = 1
    for count in multiplicity_dict.values():
      increment *= (2 ** count) - 1 
    return increment


if __name__ == '__main__':
  s = Solution()
  print(s.countMaxOrSubsets([3, 2, 1, 5]))