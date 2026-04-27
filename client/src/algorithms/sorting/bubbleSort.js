import { STEP_TYPES } from "../../utils/stepTypes";

export function bubbleSort(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {

            // compare
            steps.push({
                type: STEP_TYPES.COMPARE,
                i: j,
                j: j + 1,
                line: 2, // "if arr[j] > arr[j+1]"
            });

            if (a[j] > a[j + 1]) {
                // swap in array
                [a[j], a[j + 1]] = [a[j + 1], a[j]];

                // record swap
                steps.push({
                    type: STEP_TYPES.SWAP,
                    i: j,
                    j: j + 1,
                    line: 3, // "swap arr[j] and arr[j+1]"
                });
            }
        }
    }

    return steps;
}