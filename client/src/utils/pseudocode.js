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
};