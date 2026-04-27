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
};