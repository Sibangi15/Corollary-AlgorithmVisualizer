export const PSEUDOCODE = {
    bubble: [
        "for i from 0 to n-1",
        "  for j from 0 to n-i-1",
        "    if arr[j] > arr[j+1]",
        "      swap arr[j] and arr[j+1]",
    ],

    selection: [
        "for i from 0 to n-1",
        "  min = i",
        "  for j from i+1 to n",
        "    if arr[j] < arr[min]",
        "      min = j",
        "  swap arr[i] and arr[min]",
    ],

    insertion: [
        "for i from 1 to n-1",
        "  key = arr[i]",
        "  j = i - 1",
        "  while j >= 0 and arr[j] > key",
        "    arr[j+1] = arr[j]",
        "    j--",
        "  arr[j+1] = key",
    ],

    merge: [
        "if left < right",
        "  mid = (left + right) / 2",
        "  mergeSort(left, mid)",
        "  mergeSort(mid+1, right)",
        "  merge(left, mid, right)",
    ],

    quick: [
        "if low < high",
        "  pivotIndex = partition(low, high)",
        "  quickSort(low, pivotIndex-1)",
        "  quickSort(pivotIndex+1, high)",
    ],

    linear: [
        "for i from 0 to n-1",
        "  if arr[i] == target",
        "    return i",
        "return -1",
    ],

    binary: [
        "low = 0, high = n-1",
        "while low <= high",
        "  mid = (low + high) / 2",
        "  if arr[mid] == target return mid",
        "  else if arr[mid] < target low = mid + 1",
        "  else high = mid - 1",
        "return -1",
    ],

    bfs: [
        "create empty queue",                 // 0
        "mark start as visited",              // 1
        "enqueue start",                     // 2
        "while queue is not empty",          // 3
        "  node = dequeue",                 // 4
        "  for each neighbor of node",      // 5
        "    if neighbor not visited",      // 6
        "      mark neighbor visited",      // 7
        "      enqueue neighbor",           // 8
    ],

    dfs: [
        "mark node as visited",              // 0
        "for each neighbor of node",         // 1
        "  if neighbor not visited",         // 2
        "    dfs(neighbor)",                 // 3
    ],

    dijkstra: [
        "initialize dist array with infinity",   // 0
        "dist[start] = 0",                       // 1
        "create min priority queue",             // 2
        "push (0, start) into queue",            // 3
        "while queue is not empty",              // 4
        "  (dist, node) = extract min",          // 5
        "  for each neighbor of node",           // 6
        "    if new distance < current distance",// 7
        "      update distance",                 // 8
        "      push to queue",                   // 9
    ],
};