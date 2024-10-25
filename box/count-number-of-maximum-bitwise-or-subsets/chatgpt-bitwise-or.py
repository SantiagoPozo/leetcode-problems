def countMaxOrSubsets(nums):
    max_or = 0
    count = 0

    # Calcula el máximo valor de OR posible
    for num in nums:
        max_or |= num

    # Función DFS para recorrer los subconjuntos
    def dfs(index, current_or):
        nonlocal count
        if current_or == max_or:
            count += 2 ** (len(nums) - index)
            return

        if index == len(nums):
            return

        # Incluimos el elemento actual en el OR
        dfs(index + 1, current_or | nums[index])

        # No incluimos el elemento actual
        dfs(index + 1, current_or)

    dfs(0, 0)
    return count

nums = [3, 1]
nums = [7, 7, 7, 7, 7, 7, 7, 7]
print(countMaxOrSubsets(nums))  # Salida esperada: 2