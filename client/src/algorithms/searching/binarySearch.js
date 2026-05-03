import { STEP_TYPES } from "../../utils/stepTypes";

export function binarySearch(arr, target) {
    const steps = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        steps.push({ type: STEP_TYPES.VISIT, index: mid, line: 2 });

        steps.push({ type: STEP_TYPES.COMPARE, i: mid, j: -1, line: 3 });

        if (arr[mid] === target) {
            steps.push({ type: STEP_TYPES.FOUND, index: mid, line: 4 });
            return steps;
        }

        if (arr[mid] < target) {
            steps.push({ line: 6 }); // low update
            left = mid + 1;
        } else {
            steps.push({ line: 8 }); // high update
            right = mid - 1;
        }
    }

    return steps;
}