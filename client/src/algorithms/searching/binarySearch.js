import { STEP_TYPES } from "../../utils/stepTypes";

export function binarySearch(arr, target) {
    const steps = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // highlight mid
        steps.push({
            type: STEP_TYPES.VISIT,
            index: mid,
        });

        // compare
        steps.push({
            type: STEP_TYPES.COMPARE,
            i: mid,
            j: -1,
        });

        if (arr[mid] === target) {
            steps.push({
                type: STEP_TYPES.FOUND,
                index: mid,
            });
            return steps;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return steps;
}