export const PSEUDOCODE = {
    bubble: [
        "for i from 0 to n-1",                  // 0
        "  for j from 0 to n-i-2",              // 1
        "    if arr[j] > arr[j+1]",             // 2
        "      swap arr[j] and arr[j+1]",       // 3
    ],

    selection: [
        "for i from 0 to n-1",                  // 0
        "  min = i",                            // 1
        "  for j from i+1 to n-1",              // 2
        "    if arr[j] < arr[min]",             // 3
        "      min = j",                        // 4
        "  swap arr[i] and arr[min]",           // 5
    ],

    insertion: [
        "for i from 1 to n-1",                  // 0
        "  key = arr[i]",                       // 1
        "  j = i - 1",                          // 2
        "  while j >= 0 and arr[j] > key",      // 3
        "    arr[j+1] = arr[j]",                // 4
        "    j--",                              // 5
        "  arr[j+1] = key",                     // 6
    ],

    merge: [
        "if l >= r return",                     // 0
        "mid = (l + r) / 2",                   // 1
        "sort(l, mid)",                         // 2
        "sort(mid+1, r)",                       // 3
        "merge(l, mid, r)",                     // 4

        // merge procedure
        "while i < left.length and j < right.length", // 5
        "  if left[i] <= right[j]",             // 6
        "    arr[k] = left[i]",                 // 7
        "  else",                               // 8
        "    arr[k] = right[j]",                // 9
        "copy remaining left",                  // 10
        "copy remaining right",                 // 11
    ],

    quick: [
        "if low < high",                        // 0
        "pivot = arr[high]",                    // 1
        "i = low",                              // 2
        "for j from low to high-1",             // 3
        "  if arr[j] < pivot",                  // 4
        "    swap arr[i] and arr[j]",           // 5
        "    i++",                              // 6
        "swap arr[i] and arr[high]",            // 7
        "return i",                             // 8
    ],

    linear: [
        "for i from 0 to n-1",                  // 0
        "  if arr[i] == target",                // 1
        "    return i",                         // 2
        "return -1",                            // 3
    ],

    binary: [
        "low = 0, high = n-1",                  // 0
        "while low <= high",                    // 1
        "  mid = (low + high) / 2",             // 2
        "  if arr[mid] == target",              // 3
        "    return mid",                       // 4
        "  else if arr[mid] < target",          // 5
        "    low = mid + 1",                    // 6
        "  else",                               // 7
        "    high = mid - 1",                   // 8
        "return -1",                            // 9
    ],

    bfs: [
        "initialize queue",                     // 0
        "mark start visited",                   // 1
        "enqueue start",                        // 2
        "while queue not empty",                // 3
        "  node = dequeue",                    // 4
        "  for each neighbor",                 // 5
        "    if not visited",                  // 6
        "      mark visited",                  // 7
        "      enqueue neighbor",              // 8
    ],

    dfs: [
        "push start to stack",        // 0
        "mark start visited",         // 1
        "while stack not empty",      // 2
        "  node = pop()",             // 3
        "  for each neighbor",        // 4
        "    if not visited",         // 5
        "      mark visited",         // 6
        "      push neighbor",        // 7
    ],

    dijkstra: [
        "initialize distances",                // 0
        "set start distance = 0",              // 1
        "while unvisited not empty",           // 2
        "  pick node with smallest distance",  // 3
        "  for each neighbor",                 // 4
        "    if new distance is shorter",      // 5
        "      update distance",               // 6
    ],
};